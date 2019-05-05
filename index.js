const inquirer = require("inquirer");

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

const run = async () => {
    console.log("Hello. Let's play a game of dice.");
    let game = await setupGame();
    while (game.players.length > 1) {

    }
    let winner = game.players.pop();
    console.log(`${winner.name} has won!`)
};

run();