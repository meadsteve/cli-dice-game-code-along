const inquirer = require("inquirer");
const axios = require("axios");

const setupGame = async () => {
    let {playerCount} = await inquirer.prompt([
        {
            name: "playerCount",
            type: "number",
            message: "How many players are there?",
            validate: (input) => isNaN(input) ? "you must enter a number" : true,
        },
    ]);

    let players = [];
    for (let i = 1; i <= playerCount; i++) {
        let player = await inquirer.prompt([
            {
                name: "name",
                type: "input",
                message: `Player ${i} name?`,
            },
        ]);
        player.score = 0;
        players.push(player)
    }
    return {
        players: players,
        active_player_index: 0
    }
};

const getCurrentPlayer = (game) => {
    return game.players[game.active_player_index];
};

const addPointsToCurrentPlayer = (game, points) => {
    game.players[game.active_player_index].score += points;
    return game;
};

const removeActivePlayer = (game) => {
    game.players.splice(game.active_player_index, 1);
    return game;
};

const moveToNextPlayer = (game) => {
    game.active_player_index = (game.active_player_index + 1) % game.players.length;
    return game;
};

const rollDice = async (numberOfDice) => {
    return axios.get(`http://roll.diceapi.com/json/${numberOfDice}d6`)
        .then(result => result.data.dice)
        .then(dice => dice.map(d => d.value));
};

const takeTurn = async (game) => {
    const player = getCurrentPlayer(game);
    console.log(`${player.name} it's your turn. You have ${player.score} points`);
    const {numberOfDice} = await inquirer.prompt([
        {
            name: "numberOfDice",
            type: "number",
            message: "How many dice would you like to roll?",
            validate: (input) => isNaN(input) ? "you must enter a number" : true,
        },
    ]);

    console.log(`You wanted to roll ${numberOfDice}`);

    const result = await rollDice(numberOfDice);
    console.log(result);

    if (result.some(d => d === 6)) {
        console.log("Sorry :-( you rolled a 6. You're out");
        game = removeActivePlayer(game);
    } else {
        const points = result.reduce((total, x) => total + x);
        game = addPointsToCurrentPlayer(game, points);
        game = moveToNextPlayer(game);
    }

    return game;
};

const run = async () => {
    console.log("Hello. Let's play a game of dice.");
    let game = await setupGame();
    while (game.players.length > 1) {
        game = await takeTurn(game);
    }
    let winner = game.players.pop();
    console.log(`${winner.name} has won!`)
};

run();