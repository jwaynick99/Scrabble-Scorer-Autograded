// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

let vowels = ["a", "e", "i", "o", "u"];

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've name //
// don't change the names or your program won't work as expected. //

function initialPrompt(scorerPrompt) {
   let word = input.question("Let's play some scrabble!\n\nEnter a word: ")
   return word;
};

let newPointStructure = transform(oldPointStructure);

function simpleScorer(word){
   
   let score = 0;
   for (letter in word) {
      score++
   }
   return score;
}
function vowelBonusScorer(word){
   
   let score = 0
   for (letter in word) {
      if (vowels.includes(word[letter].toLowerCase())){
        score = score + 3;
      } else {
         score++;
      }
   }
   return score;
}

function scrabbleScorer(word){
   let score = 0;
   newPointStructure[" "] = 0
   for (letter in word) {
     for (const number in newPointStructure) {
 
       if (word[letter].toLowerCase() === number){
         score += newPointStructure[number]
       }
 
     }
   }
   
   return score;
 }

 let simpleScore = {
   name: "Simple Scorer",
   description: "Each letter is worth 1 point.",
   scorerFunction: simpleScorer
 }

 let bonusVowels = {
   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction: vowelBonusScorer
 }

 let scrabble = {
   name: "Scrabble",
   description: "The traditional scoring algorithm.",
   scorerFunction: scrabbleScorer
 }



const scoringAlgorithms = [simpleScore, bonusVowels, scrabble];

function scorerPrompt(algorithms) {
   let choice = Number(input.question("Which scoring algorithm would you like to use? \n\n0 - Simple: One point per character\n1 - Vowel Bonus: Vowels are worth 3 points\n2 - Scrabble: Uses scrabble point system\nEnter 0, 1, or 2: "))

   while (choice < -0 || choice > 2){
      choice = Number(input.question("\nInvalid input, please choose 0, 1, or 2: "))
   }
   return algorithms[choice];
}

function transform(oldStructure) {
   let newObject = {}
   for (items in oldStructure){
      for (letter in oldPointStructure[items]) {
         newObject[oldPointStructure[items][letter].toLowerCase()] = Number(items)
      }
   }
   return newObject;
};


function runProgram() {
   let word = initialPrompt();
   let scorer = scorerPrompt(scoringAlgorithms);
   console.log("\nScore for '" + word + "': " + scorer.scorerFunction(word));
   
}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
