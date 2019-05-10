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
    console.log(`${player.name} it's your turn`);
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
    game = moveToNextPlayer(game);
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