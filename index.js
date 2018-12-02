document.addEventListener('DOMContentLoaded', function(){


  //url to show first 50 monsters
  let first50monsters = 'http://localhost:3000/monsters/?_limit=50'
  //url to page 2 to show next 50 monsters
	let second50monsters = 'http://localhost:3000/monsters/?_limit=50&_page=2'

  //ref to monster container
  monsterContainer = document.getElementById('monster-container');

  //ref to create form
  let createForm = document.getElementById('create-monster');

  //ref to forward button
  let forwardBtn = document.getElementById('forward');

  //ref to back button
  let backBtn = document.getElementById('back');


  //render firsdt 50 monsters to page
  fetch(first50monsters)
  .then(response => response.json())
  .then(monsterJSONData => {
    console.log(monsterJSONData);
    monsterContainer.innerHTML = '';
    monsterJSONData.forEach(monster =>
       monsterContainer.innerHTML += `
      <div>
        <h1>${monster.name}</h1>
        <p>${monster.age}</p>
        <p>${monster.description}</p>
      </div>
      `)
  })

  //create monster form event listener
  createForm.addEventListener('submit', function(event){
    event.preventDefault();
    let newName = event.target.name.value;
    let newAge = event.target.age.value;
    let newDescription = event.target.description.value;

    fetch(`http://localhost:3000/monsters`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        "name": newName,
        "age": newAge,
        "description": newDescription
      })
    })
  })

  //render next 50 monsters when forward button is clicked
  forwardBtn.addEventListener('click', function(event){
    fetch(second50monsters)
    .then(response => response.json())
    .then(next50MonstersJSON => {
      console.log(next50MonstersJSON);
      monsterContainer.innerHTML = '';
      next50MonstersJSON.forEach(monster =>
         monsterContainer.innerHTML += `
        <div>
          <h1>${monster.name}</h1>
          <p>${monster.age}</p>
          <p>${monster.description}</p>
        </div>
        `)
    })
  })

  back.addEventListener('click', function(event){
    fetch(first50monsters)
    .then(response => response.json())
    .then(monsterJSONData => {
      console.log(monsterJSONData);
      monsterContainer.innerHTML = '';
      monsterJSONData.forEach(monster =>
         monsterContainer.innerHTML += `
        <div>
          <h1>${monster.name}</h1>
          <p>${monster.age}</p>
          <p>${monster.description}</p>
        </div>
        `)
    })
  })



});
