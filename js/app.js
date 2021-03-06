// Variables
var scores, 
		roundScore, 
		activePlayer, 
		gamePlaying,
		lastDice1,
		lastDice2;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {
	if (gamePlaying) {
			document.getElementById('name-0').textContent = 'Player 1';
			document.getElementById('name-1').textContent = 'Player 2';

			// 1. Random number
			var dice1 		= Math.floor(Math.random() * 6) + 1;
			var dice2 		= Math.floor(Math.random() * 6) + 1;

			// 2. Display the result
			hideDice();
			document.getElementById('dice1').src = 'dice-' + dice1 + '.png';
			document.getElementById('dice2').src = 'dice-' + dice2 + '.png';

			// 3. Update the round score IF the rolled number was NOT a 1
			if (dice1 === 6 && lastDice1 === 6 || dice2 === 6 && lastDice2 === 6) {
					// Player looses score
					scores[activePlayer] = 0;
					document.querySelector('#score-' + activePlayer).textContent = '0';
					document.getElementById('name-' + activePlayer).innerHTML = '<strong>2 times 6!</strong>';
					nextPlayer();
			} else if (dice1 !== 1 && dice2 !== 1) {
					// Add score
					roundScore += dice1 + dice2; 
					document.querySelector('#current-' + activePlayer).textContent = roundScore;
			} else {
					// Next player
					document.getElementById('name-' + activePlayer).innerHTML = '<strong>Rolled a 1!</strong>';
					nextPlayer();
			}

			lastDice1 = dice1;
			lastDice2 = dice2;
	}
});


document.querySelector('.btn-hold').addEventListener('click', function() {
	if (gamePlaying) {
		// Add CURRENT score to GLOBAL score
		scores[activePlayer] += roundScore;

		// Update the UI
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

		var input = document.getElementById('score-field').value;
		var winScore;

		// Undefined, 0, null or '' are COERCED to FALSE
		// Anything else is COERCED to TRUE
		if (input) {
				winScore = input;
		}	else {
				winScore = 100;
		}

		// Check if player won the game
		if (scores[activePlayer] >= winScore) {
				document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
				document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
				document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
				hideDice();
				gamePlaying = false;
		} else {
				// Next Player
				nextPlayer();
		}
	}
});

document.querySelector('.btn-new').addEventListener('click', init);


// Functions
function init() {
	scores = [0,0];
	activePlayer = 0;
	roundScore = 0;
	gamePlaying = true;

	hideDice();
	document.getElementById('score-0').textContent = '0';
	document.getElementById('score-1').textContent = '0';
	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';
	document.getElementById('name-0').textContent = 'Player 1';
	document.getElementById('name-1').textContent = 'Player 2';
	document.querySelector('.player-0-panel').classList.remove('winner');
	document.querySelector('.player-1-panel').classList.remove('winner');
	document.querySelector('.player-0-panel').classList.remove('active');
	document.querySelector('.player-1-panel').classList.remove('active');
	document.querySelector('.player-0-panel').classList.add('active');
}


function nextPlayer() {
	activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
	roundScore = 0;

	document.getElementById('current-0').textContent = '0';
	document.getElementById('current-1').textContent = '0';

	document.querySelector('.player-0-panel').classList.toggle('active');
	document.querySelector('.player-1-panel').classList.toggle('active');

	hideDice();
}

function hideDice() {
	document.getElementById('dice1').style.display = 'none';
	document.getElementById('dice2').style.display = 'none';
}

/*
Challenges

Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the 
next player's turn. (Hint: Always save the previous dice roll in a separate variable).

2. Add an input field to the HTML where players can set the winning score, so that they 
can change the predefined score of 100. (Hint: you can read that value with the .value() 
property in JavaScript. This is a good opportunity to use google to figure this out).

3. Add another dice to the game, so that there are 2 dices now. The player looses his
current score when one of them is a 1. (Hint: you will need CSS position the second
dice, so take a look at the CSS code for the first one).
*/