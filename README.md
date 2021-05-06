# Shrewdness
Welcome to the GitHub Repository for my App Academy Capstone Solo Project. The goal of this project is to be a Full Stack Group Chat Application. I will be implementing the Electron Framework to create a native MacOS and Windows application. All this using a NODEjs backend, PostgreSQL database, and a React/Redux front end, styled with CSS and SCSS.

## Here are some of the features I'd like to highlight

<img align="right" alt="splash page gif" src="https://github.com/CalebAmes/CalebAmes/blob/main/splashCapture.gif">

### Splash Page

Location of source code:
- frontend/src/assets/views/Splash

Files:
- index.js
- Splash.scss

Features:
- 10 independently animated SVGs
- 2 animated text blocks
- 3 full with divs with gradient backgrounds
- ONLY accessible when the user is logged out

Highlights:
- Using the linear gradient in the 3 divs
  - the blue div has a very subtle gradient that makes it look a lot nicer
  - the second the third divs have reversed gradients that makes them look like one div
- This page has 12 unique animations

<br />

### User Auth

<img alt="auth demo gif" width="640px" height="400px" src="https://github.com/CalebAmes/CalebAmes/blob/main/authCapture.gif">

Features:
- Modals for login and signup forms
- Demo login button
- Error Handling
- Drag and drop for uploading a profile picture on signup
- Animation for form coming on screen

Highlights:
- I wanted to be able to switch between login and signup forms and I wanted the form the user is opening to layer on top of the current form. But I didn't want the forms to keep layering if you keep switching back and forth. So I pass in a prop telling the modal whether was opened from the dropdown button OR the other form. If it came the dropdown, it opens the other form over itself, but if it was opened from the other form and is currently on top of the other modal, when you push the button to switch to the other form it closes itself to reveal the form below it RATHER than opening the other form over itself. 
  - TL:DR Play with the register and signup buttons when you click login and again when you click sign up

<br />

### Themes

<img alt="theme demo gif" width="640px" height="400px" src="https://github.com/CalebAmes/CalebAmes/blob/main/themeCapture.gif">

This works by setting default values in CSS:
```
:root {
	--bg: #fff;
	--hover: #efefef;
	--highlight: #beee62;
	--bars: #483c46;
	--color-main: #000;
	--color-secondary: #483c46;
	--color-accent: #f4743b;
	--font-size: 14px;
	--border-radius: 4px;
	--speed: 500ms;
	--border: 1px solid rgba(0, 0, 0, 0.2);
	--nav-size: 48px;
}

.main {
	--bg: #fff;
	--hover: #efefef;
	--highlight: #beee62;
	--bars: #483c46;
	--color-main: #000;
	--color-secondary: #483c46;
	--color-accent: #f4743b;
}

.darkmode {
	--bg: #1b263b;
	--hover: #415a77;
	--highlight: #0d1b2a;
	--bars: #483c46;
	--color-main: #e0e1dd;
	--color-secondary: #483c46;
	--color-accent: #f4743b;
}

.blue {
	--bg: #2374ab;
	--hover: #231651;
	--highlight: #d6fff6;
	--bars: #4dccbd;
	--color-main: #000;
	--color-secondary: #fff;
	--color-accent: #ff8484;
}
```
<br />

Then changing the class on the index.html body element with the class of the theme you want

```
export const main = () => {
	const body = document.getElementById('body');
	body.className = '';
	body.classList.add('main');
};

export const darkmode = () => {
	const body = document.getElementById('body');
	body.className = '';
	body.classList.add('darkmode');
};

export const blue = () => {
	const body = document.getElementById('body');
	body.className = '';
	body.classList.add('blue');
};

```

<br />

### Instant Messaging with Sockets and AWS integration for media
* #### Plus live updating and deleting for a users posts

<img alt="chat demo gif" width="640px" height="400px" src="https://github.com/CalebAmes/CalebAmes/blob/main/chatCapture.gif">

<br />

This was actually pretty complex to get everything working how I wanted and reliably. I am debating adding a detailed write up here about it. For now feel free to dig into/fork my repo and/or message me about it 🚀

### Autocomplete using a trie data structure

<img alt="autocomplete gif" width="640px" height="160px" src="https://github.com/CalebAmes/CalebAmes/blob/main/autocompleteCapture.gif">

Source Code:
- frontend/src/assets/services/autoComplete.js

The way this works is very similar to the autocomplete on your cellphone. It uses a trie data sturcture which is basically a tree. When you navigate to a chatroom it calls a function that seeds an array of the 3000 most commonly used english words into the trie. This makes nodes for every letter in our tree and when you type in a letter it treverses the tree and returns the possible words left based on the letters entered so far.

###### Here is a visualization that might help you conceptualize

<img alt="trie data structure" width="440px" height="330px" src="https://github.com/CalebAmes/CalebAmes/blob/main/TrieDataStructureImpl.png">

<br />
<br />

### Well, that's all I have time to detail in this readme at the moment. I'll be adding more when I have the time. For now, thanks for checking out my project and feel free to reach out to me if you have any questions or want to collaborate (links in my profile readme). Have a nice day ⚡️
