import { checkNoteHit } from './note-manager.js';

class InputHandler {
	constructor(gameUI) {
		this.gameUI = gameUI;
		this.setupButtons();
		this.setupKeyboardListeners();
	}

	setupButtons() {
		this.buttons = {
			D: document.getElementById('D'),
			F: document.getElementById('F'),
			J: document.getElementById('J'),
			K: document.getElementById('K'),
		};
	}

	setupKeyboardListeners() {
		document.addEventListener('keydown', (e) => {
			switch (e.key) {
				case 'd':
					this.handleKeyPress('D');
					break;
				case 'f':
					this.handleKeyPress('F');
					break;
				case 'j':
					this.handleKeyPress('J');
					break;
				case 'k':
					this.handleKeyPress('K');
					break;
				case 's':
					if (document.getElementsByClassName('note').length == 0) {
						this.gameUI.startNewGame(100);
					}
					break;
			}
		});

		document.addEventListener('noteMissed', () => {
			this.gameUI.updateScore(false);
		});
	}

	handleKeyPress(column) {
		const btn = this.buttons[column];
		btn.style.zIndex = 105;
		const notes = document.getElementsByClassName('col' + column);
		const hit = checkNoteHit(notes);
		this.gameUI.updateScore(hit);
	}
}

export default InputHandler;
