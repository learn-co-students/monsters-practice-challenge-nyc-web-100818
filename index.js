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

   // TODO: pageNum clicks/limits between 1 and page number of the last element
  let pageNum = 1

  const editFormHTML =`
  <form id="edit-monster-form">
  <label for="name">Name: </label>
  <input id="new-monster-name" type="text" name="name"></input>
  <label for="description">Bio: </label>
  <input id="new-monster-description" type="text" name="name"></input>
  <label for="age">Age: </label>
  <input id="new-monster-age" type="text" name="name"></input>
  <input type="submit" name="" value="Edit Monster">`
  editMonsterDiv.innerHTML += editFormHTML

 fetchMonsterData = () => {
   // console.log(pageNum);
   fetch(`http://localhost:3000/monsters/?_limit=50&_page=${pageNum}`, {method : 'GET'})
    .then(response => response.json() )
    .then(json => {
      divForEachMonster.innerHTML = ""
      json.forEach(function(monster) {
        monsterContainer.append(divForEachMonster)
        divForEachMonster.innerHTML += `
        <h2>${monster.name}</h2>
        <h4>Age: ${monster.age}</h4>
        <p>Bio: ${monster.description}</p>
        <button id="edit-monster-button">Edit</button>`
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

 // editMonster.addEventListener("submit", event => {
 //   // 1. DO YOUR DOM MANIPULATION FIRST
 //   // get the values from the form
 //   // find the monster that you clicked on
 //   // rewrite the monster on the dom with the NEW INFORMATION
 //   // 2. WORK WITH YOUR server
 //   // patch request
 //   event.preventDefault()
 //   editFetchedMonsterData = (mosterId) => {
 //      fetch(`http://localhost:3000/monsters/${monsterId}`, {
 //        method : 'PATCH',
 //        headers : {
 //          "Content-Type": "application/json",
 //          Accept: "application/json"
 //        },
 //        body: JSON.stringify({
 //          name: nameInputValue,
 //          age: descriptionInputValue,
 //          description: ageInputValue
 //        })
 //      }) // fetch ENDS HERE
 //    } // .then json -- ENDS HERE
 //  })

 }) // document.addEventListener('DOMContentLoaded' -- ENDS HERE
