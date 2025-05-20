import { CONFIG } from './game-config.js';
import { createNote } from './note-manager.js';

class GameUI {
	constructor() {
		this.game = document.body;
		this.noteStreak = 0;
		this.noteScore = 0;
		this.highScore = 0;
		this.setupUI();
		this.setupColumns();
		this.startUpdateLoop();
	}

	setupUI() {
		this.highScoreElement = document.createElement('div');
		this.highScoreElement.innerHTML =
			'Highscore: ' + this.highScore + ' points';
		this.highScoreElement.style.fontSize = '2em';
		this.game.appendChild(this.highScoreElement);

		this.scoreElement = document.createElement('div');
		this.scoreElement.innerHTML = this.noteScore + ' points';
		this.scoreElement.style.fontSize = '2em';
		this.game.appendChild(this.scoreElement);

		this.streakElement = document.createElement('div');
		this.streakElement.innerHTML = this.noteStreak;
		this.streakElement.style.fontSize = '2em';
		this.game.appendChild(this.streakElement);

		this.helpElement = document.createElement('div');
		this.helpElement.innerHTML = 'Press S to start';
		this.helpElement.style.fontSize = '2em';
		this.game.appendChild(this.helpElement);
	}

	setupColumns() {
		for (let col in CONFIG.columns) {
			this.createColumn(col);
			this.createButton(col);
		}
	}

	createColumn(col) {
		let colElement = document.createElement('div');
		colElement.style.border = 'solid 1px black';
		colElement.style.position = 'absolute';
		colElement.style.left = CONFIG.columns[col] + 'px';
		colElement.style.top = '0px';
		colElement.style.height = document.documentElement.clientHeight + 'px';
		colElement.style.width = '45px';
		this.game.appendChild(colElement);
	}

	createButton(col) {
		let btnElement = document.createElement('div');
		btnElement.style.border = 'solid 1px black';
		btnElement.style.position = 'absolute';
		btnElement.style.left = CONFIG.columns[col] + 'px';
		btnElement.style.bottom = '0px';
		btnElement.style.borderRadius = '40px';
		btnElement.style.height = '45px';
		btnElement.style.width = '45px';
		btnElement.id = col;

		let textElement = document.createElement('p');
		textElement.innerHTML = col;
		textElement.style.position = 'relative';
		textElement.style.left = '16px';
		textElement.style.top = '-2px';
		btnElement.appendChild(textElement);

		this.setupButtonAnimation(btnElement);
		this.game.appendChild(btnElement);
	}

	setupButtonAnimation(btnElement) {
		setInterval(() => {
			let btnIndex = parseInt(btnElement.style.zIndex);
			if (btnIndex > 100) {
				btnElement.style.zIndex = btnIndex -= 1;
				btnElement.style.backgroundColor = '#000000';
			} else {
				btnElement.style.backgroundColor = 'transparent';
			}
		}, CONFIG.frameWait);
	}

	startUpdateLoop() {
		setInterval(() => {
			if (this.noteScore > this.highScore) {
				this.highScore = this.noteScore;
			}
			this.scoreElement.innerHTML = this.noteScore + ' points';
			this.streakElement.innerHTML = this.noteStreak + ' note streak!';
			this.highScoreElement.innerHTML =
				'Highscore: ' + this.highScore + ' points';
		}, CONFIG.frameWait);
	}

	startNewGame(amount) {
		this.noteScore = 0;
		this.noteStreak = 0;
		let noteString = '';
		for (let i = 0; i < amount; i++) {
			noteString += Math.floor(Math.random() * 4 + 1);
		}
		for (let i = 0; i < noteString.length; i++) {
			let col = parseInt(noteString[i]);
			createNote(CONFIG.numToCol[col], i * CONFIG.baseDistance);
		}
	}

	updateScore(hit) {
		if (hit) {
			this.noteScore += this.noteStreak;
			this.noteStreak += 1;
		} else {
			this.noteStreak = 0;
		}
	}
}

export default GameUI;
