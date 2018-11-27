
const monsterContainer = document.getElementById('monster-container');
const forwardButton = document.getElementById('forward');
const backButton = document.getElementById('back');
const monsterForm = document.getElementById('new-monster-form');
const monsterName = document.getElementById('new-monster-name');
const monsterDescription = document.getElementById('new-monster-description');
const monsterAge = document.getElementById('new-monster-age');

document.addEventListener('DOMContentLoaded', () => {
  loadPage(getMonsters(1));
  forwardButton.dataset.id = 1;
})
// forward button
document.addEventListener('click', (event) => {
  if (event.target.id == 'forward') {
    if (forwardButton.dataset.id < 21) {
      monsterContainer.innerHTML = "";
      forwardButton.dataset.id++;
      let page = forwardButton.dataset.id;
      console.log(page);
      loadPage(getMonsters(page));
    } else {
      window.alert("No More Monsters")
    }
  }
})
// back button
document.addEventListener('click', (event) => {
  if (event.target.id == 'back') {
    if (forwardButton.dataset.id > 1) {
      monsterContainer.innerHTML = "";
      forwardButton.dataset.id--;
      let page = forwardButton.dataset.id;
      console.log(page);
      loadPage(getMonsters(page));
    } else {
      window.alert("No Previous Monsters");
    }
  }
})
// create new monster
document.addEventListener('submit', (event) => {
  event.preventDefault()
  newMonster(monsterName.value, monsterAge.value, monsterDescription.value)
  .then(response => response.json())
  .then(monster => {
    let newMonster = new Monster(monster);
    monsterForm.reset()
  })
})
