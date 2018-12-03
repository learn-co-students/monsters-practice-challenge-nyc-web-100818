 document.addEventListener('DOMContentLoaded', function(event) {
  console.log('DOM Content Loaded');

  const createMonsterDiv = document.querySelector('#create-monster')
  const editMonsterDiv = document.querySelector('#edit-monster')
  const monsterContainer = document.querySelector('#monster-container')
  const backButton = document.querySelector('#back')
  const forwardButton = document.querySelector('#forward')
  const divForEachMonster = document.createElement('div')
  const createFormId = document.querySelector('#new-monster-form')
  const editMonsterButton = document.querySelectorAll("#edit-monster-button")
  const editMonsterForm = document.querySelector("#edit-monster-form")
  const editNameInputValue = document.querySelector('#edit-monster-name')
  const editDescriptionInputValue = document.querySelector('#edit-monster-description')
  const editAgeInputValue = document.querySelector('#edit-monster-age')

  let allData = []


   // TODO: pageNum clicks/limits between 1 and page number of the last element
  let pageNum = 1

 fetchMonsterData = () => {
   // console.log(pageNum);
   fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`, {method : 'GET'})
    .then(response => response.json() )
    .then(json => {
      allData = json
      divForEachMonster.innerHTML = ""
      json.forEach(function(monster) {
        monsterContainer.append(divForEachMonster)
        divForEachMonster.innerHTML += `
        <h2>${monster.name}</h2>
        <h4>Age: ${monster.age}</h4>
        <p>Bio: ${monster.description}</p>
        <button id=${monster.id}>Edit</button>`
      }) // json.forEach(function(monster) -- ENDS HERE
    }) // .then json -- ENDS HERE
 } // fetchMonsterData function -- ENDS HERE

 fetchMonsterData()


 document.addEventListener('click', function(event) {
   if (event.target.id == 'forward') {
     console.log('Clicked Forward');
     pageNum += 1
     fetchMonsterData()
   }
   if (event.target.id == 'back') {
     console.log('Clicked Back')
     pageNum -= 1
     fetchMonsterData()
   }
 }) // document.addEventListener('click' -- ENDS HERE

 createFormId.addEventListener('submit', (event) => {
   // Create Monster Form INput Values
   const nameInputValue = event.target.querySelector('#new-monster-name').value
   const descriptionInputValue = event.target.querySelector('#new-monster-description').value
   const ageInputValue = event.target.querySelector('#new-monster-age').value
   event.preventDefault()
   createMonsterData = () => {
     fetch(`http://localhost:3000/monsters/`, {
       method : 'POST',
       headers : {
         "Content-Type": "application/json",
         Accept: "application/json"
       },
       body: JSON.stringify({
        name: nameInputValue,
        age: ageInputValue,
        description: descriptionInputValue
      })
   }) // fetch -- ENDS HERE
   // .then(res => res.json())
   .then(json => {
     console.log(json);
   })
  } // createMonsterData = () => -- ENDS HERE
   createMonsterData()
 }) // createFormId.addEventListener('submit' ENDS HERE

 monsterContainer.addEventListener('click', event => {
   event.preventDefault()
   clickedMonsterId = parseInt(event.target.id)
   targetMonster = allData.find(monster => monster.id === clickedMonsterId);
   editNameInputValue.value = targetMonster.name
   editDescriptionInputValue.value = targetMonster.description
   editAgeInputValue.value = targetMonster.age
   editMonsterForm.id = targetMonster.id
 })

 editMonsterForm.addEventListener('submit', function(event) {
   event.preventDefault();
   monsterId = parseInt(event.target.id);
     fetch(`http://localhost:3000/monsters/${monsterId}`, {
       method : 'PATCH',
       headers : {
         "Content-Type": "application/json",
         Accept: "application/json"
       },
       body: JSON.stringify({
         name: editNameInputValue.value,
         age: editDescriptionInputValue.value,
         description: editAgeInputValue.value
       })
     }) // fetch ENDS HERE
     .then(r => r.json())
     .then(data => {
       showDogData();
     }) // .then json -- ENDS HERE
     event.target.reset();
   })
 }) // document.addEventListener('DOMContentLoaded' -- ENDS HERE
