// MONSTERS Practice

// ***Deliverables
// TODO On page load, show first 50 monsters with name,age and description
// TODO Above the list of monsters, a form to create a new monster. Name,age and description form fields and 'Create Monsters Button'. On click the button should add the monster to the list and save it to the API(backend)
// TODO At bottom, a button that loads the next 50 monsters and show them

// ***************DOM Elements***********
const monsterContainer = document.querySelector("#monster-container");
const createMonsterForm = document.querySelector("#create-monster");
const backButton = document.querySelector("#back");
const fowardButton = document.querySelector("#forward");
let allMonsters = [];

// **********GLOBAL VARIABLES*********
const first50URL = "http://localhost:3000/monsters/?_limit=50";
const allMonstersURL = "http://localhost:3000/monsters";

// *************FUNCTIONS*****************
document.addEventListener("DOMContentLoaded", function() {
  console.log("Welcome to Monstr Inc.");
  getMonsters();
  createMonster();
});

const getMonsters = function() {
  fetch(first50URL)
    .then(r => {
      console.log("Fetching first 50 monsters");
      return r.json();
    })
    .then(parsedMonsters => {
      allMonsters = parsedMonsters;
      console.table(parsedMonsters);
      monsterContainer.innerHTML = renderMonsters(parsedMonsters);
    });
};

const createMonster = function(e) {
  createMonsterForm.addEventListener("submit", e => {
    e.preventDefault;
    let nameInput = document.querySelector("#name-input").value;
    let ageInput = document.querySelector("#age-input").value;
    let descriptionInput = document.querySelector("#description-input").value;
    fetch(allMonstersURL, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "name": nameInput,
        "age": ageInput,
        "description": descriptionInput
      })
    });
    alert(`${nameInput} has been added to the Monster Database`)
    // monsterContainer.innerHTML += `<div class="monster-card"">
    //         <h3>Name : ${nameInput}</h3>
    //         <h3>Age : ${ageInput}</h3>
    //         <h3>Description:
    //         <p>${descriptionInput}</p>
    //         </h3>
    //       </div>`;
  });
};

// *************HELPER FUNCTIONS***************

const renderMonsters = function(monsterArray) {
  return monsterArray
    .map(function(monster) {
      return `<div class="monster-card" data-id="${monster.id}">
            <h3>Name : ${monster.name}</h3>
            <h3>Age : ${monster.age}</h3>
            <h3>Description:
            <p>${monster.description}</p>
            </h3>
          </div>`;
    })
    .join("");
};
