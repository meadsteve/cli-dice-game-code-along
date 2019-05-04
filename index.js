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
    return players
};

const run = async () => {
    console.log("Hello. Let's play a game of liar's dice.");
    let players = await setupGame();
    console.log(players);
};

run();