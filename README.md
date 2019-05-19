# CLI Dice Game - Code Along

We'll build an interactive CLI for playing a dice game.

## Requirements
* Node >= 10
* An IDE or text editor you're happy using.
* An internet connection (for npm downloads).

## Presentation
To go along with this repo: https://docs.google.com/presentation/d/1CuXuc9-akRitDGNkvB-fH2wUQTvgbaGxxBm-07u3fyE/edit?usp=sharing

## Tech
We'll use the following NPM libraries:

* inquirer - To power the interactive elements
* Axios - To make web requests to http://roll.diceapi.com

Both of these libraries return promises so the code will be  a little simpler to read if we use [async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) added in ES2017.

## Proposed game rules

* A number of players take in turns to roll dice.
* A player chooses how many dice they want to roll.
* If they roll any 6s and the player is out.
* At the end of the round any player who falls 25 points behind the leader is out.
* Repeat until only one player is left. This player wins.
