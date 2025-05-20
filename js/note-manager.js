import { CONFIG } from './game-config.js';

export function createNote(col, top) {
	const game = document.body;
	let note = document.createElement('div');
	let noteBottom = document.documentElement.clientHeight + top + 100;

	note.style.position = 'absolute';
	note.style.border = 'solid 1px black';
	note.style.borderRadius = '40px';
	note.style.width = '40px';
	note.style.height = '40px';
	note.style.bottom = noteBottom + 'px';
	note.style.left = CONFIG.columns[col] + 2.5 + 'px';

	let noteClass = 'col' + col;
	note.classList.add(noteClass);
	note.classList.add('note');
	game.appendChild(note);

	let move = setInterval(() => {
		noteBottom -= CONFIG.noteSpeed;
		if (note.classList.contains('remove')) {
			note.remove();
			clearInterval(move);
		}
		if (noteBottom < -50) {
			note.remove();
			clearInterval(move);
			document.dispatchEvent(new CustomEvent('noteMissed'));
		} else {
			note.style.bottom = noteBottom + 'px';
		}
	}, CONFIG.frameWait);
}

export function checkNoteHit(noteList) {
	let miss = true;
	for (let i = 0; i < noteList.length; i++) {
		let position = parseInt(noteList[i].style.bottom);
		if (position > -40 && position < 40) {
			noteList[i].classList.add('remove');
			miss = false;
		}
	}
	return !miss;
}
