# Useful snippets

## Npm installs
```bash
npm install inquirer
npm install axios
```

## imports
```javascript
const inquirer = require("inquirer");
const axios = require("axios");
```

## define an async function
```javascript
const run = async () => {
    return "something";
};
```

## ask for a number using inquirer
```javascript
let {someNumber} = await inquirer.prompt([
    {
        name: "someNumber",
        type: "number",
        message: "How number?",
        validate: (input) => isNaN(input) ? "you must enter a number" : true,
    },
]);
```

## fetch some dice from the api
```javascript
return axios.get(`http://roll.diceapi.com/json/${numberOfDice}d6`)
    .then(result => result.data.dice)
    .then(dice => dice.map(d => d.value));
```
