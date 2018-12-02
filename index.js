// MONSTERS Practice

// ***Deliverables
// TODO On page load, show first 50 monsters with name,age and description
// TODO Above the list of monsters, a form to create a new monster. Name,age and description form fields and 'Create Monsters Button'. On click the button should add the monster to the list and save it to the API(backend)
// TODO At bottom, a button that loads the next 50 monsters and show them

// http://localhost:3000/monsters/?_limit=50

// ***************DOM Elements***********
const monsterContainer = document.querySelector("#monster-container");
const createMonsterForm = document.querySelector("#create-monster");
// **********GLOBAL VARIABLES*********
const allMonstersUrl = "";

// *************FUNCTIONS*****************
const getMonsters = function(page) {
  console.log("Get monsters function");
  fetch(`http://localhost:3000/monsters/?_limit=50_page=${page}`)
    .then(r => r.json())
    .then(parsedMonsters => {
      console.table(parsedMonsters);
      // document.querySelector("#monster-container").innerHTML =
      //   parsedMonsters.name;
    });
};

document.addEventListener("DOMContentLoaded", function() {
  getMonsters();
});

// *************HELPER FUNCTIONS***************
