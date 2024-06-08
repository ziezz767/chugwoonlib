// public/js/home.js
'use strict';

const title = document.querySelector('#title');

function showSignIn() {
  location.href = 'sign-in'
}

function init() {
  title.addEventListener('click', showSignIn);
}

init();