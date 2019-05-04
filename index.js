const inquirer = require("inquirer");

const run = async () => {
    console.log("Hello. Let's play a game of liar's dice.");
    let answers = await inquirer.prompt([
        {
            name: "playerCount",
            type: "number",
            message: "How many players are there?",
            validate: (input) => isNaN(input) ? "you must enter a number" : true,
        },
    ]);
    console.log(answers);
};

run();