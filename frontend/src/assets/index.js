// this is for the Electron version of this application
// import { ipcRenderer } from 'electron';

export const applyTheme = () => {
	const userDataString = window.localStorage.getItem('user-data');
	const userData = JSON.parse(userDataString)
	if(userData && userData?.theme) {
		userData && userData.theme === 'main' ? main() : userData.theme === 'darkmode' ? darkmode() : blue();
	}
}

export const main = () => {
  const body = document.getElementById("body");
  window.localStorage.setItem('user-data', JSON.stringify({ theme: "main" }));
  body.className = "";
  body.classList.add("main");
  // this is for the Electron version of this application
  // ipcRenderer.send('SAVE_USER_THEME', {
  //   theme: 'main'
  // });
};

export const darkmode = () => {
  const body = document.getElementById("body");
  window.localStorage.setItem('user-data', JSON.stringify({ theme: "darkmode" }));
  body.className = "";
  body.classList.add("darkmode");
  // this is for the Electron version of this application
  // ipcRenderer.send('SAVE_USER_THEME', {
  // 	theme: 'darkmode'
  // });
};

export const blue = () => {
  const body = document.getElementById("body");
  window.localStorage.setItem('user-data', JSON.stringify({ theme: "blue" }));
  body.className = "";
  body.classList.add("blue");
  // this is for the Electron version of this application
  // ipcRenderer.send('SAVE_USER_THEME', {
  // 	theme: 'blue'
  // });
};
