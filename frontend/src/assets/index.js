// this is for the Electron version of this application
// import { ipcRenderer } from 'electron';


export const main = () => {
	const body = document.getElementById('body');
	body.className = '';
	body.classList.add('main');
	// this is for the Electron version of this application
	// ipcRenderer.send('SAVE_USER_THEME', {
  //   theme: 'main'
  // });

};

export const darkmode = () => {
	const body = document.getElementById('body');
	body.className = '';
	body.classList.add('darkmode');
		// this is for the Electron version of this application
	// ipcRenderer.send('SAVE_USER_THEME', {
	// 	theme: 'darkmode'
	// });

};

export const blue = () => {
	const body = document.getElementById('body');
	body.className = '';
	body.classList.add('blue');
		// this is for the Electron version of this application
	// ipcRenderer.send('SAVE_USER_THEME', {
	// 	theme: 'blue'
	// });

};
