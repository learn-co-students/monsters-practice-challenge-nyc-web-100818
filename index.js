document.addEventListener('DOMContentLoaded', () => {
  /*******************  DOM ELEMENTS ******************/
  const monsterContainer = document.getElementById('monster-container')
  const monsterForm = document.getElementById('monster-form')
  // console.log(monsterForm);
  // const nameField = document.getElementById('name')
  // console.log(nameField.value);
  /*******************  VARIABLES ******************/
  const monstersLimit50 = "http://localhost:3000/monsters/?_limit=50"
  const allMonsters = "http://localhost:3000/monsters"
  /*******************  FETCHES & EVENT LISTENERS ******************/
  // fetch to show first 50 monsters on page load:
  fetch(monstersLimit50, { method: "GET" }) // defaults to GET
    .then(r => r.json())
    .then(arrayOf50MonsterObjects => {
      arrayOf50MonsterObjects.forEach((monsterObj) => {
        // console.log(monsterObj);
        monsterContainer.innerHTML += `<ul>
        <h2>${monsterObj.name}</h2>
        Age: ${Math.floor(parseFloat(monsterObj.age))} years old <br><br>
        Bio: ${monsterObj.description}
        </ul>`
      })
    })

    // fetch to post to monsters the created monster ON THE FORM SUBMIT EVENT
    monsterForm.addEventListener('submit', (e) => {
      // console.log(e);
      e.preventDefault() // prevent default action - stops submit post from happening -- allows us 2 find event
      // POST fetch call - body HAS to be a string and u need headers
      // update everywhere!...
        // do another fetch using data from the form --> updates backend
        // also have 2 update the DOM

      let newName = document.getElementById("name").value
      let newAge = document.getElementById("age").value
      let newDescription = document.getElementById("description").value

      // debugger

      fetch(allMonsters,
        {
          method: 'POST', // update the API, this will create
          headers: {
                "Content-Type": "application/json", // datatype we're sending to server
                Accept: "application/json" // datatype we want back
          },
          // body MUST be stringified so db can correctly handle it
            // needs to have the things u want 2 post
          body: JSON.stringify({
            "name": newName, // can also do key of name:
            "age": newAge,
            "description": newDescription
          })
        })
        // .then((r) => {
        //   console.log(r);
        //   return r.json() // need to go back to json()
        // })
        .then(r => r.json())
        .then((parsedJSON) => {
          // console.log(parsedJSON);
          monsterContainer.innerHTML += `<ul>
          <h2>${parsedJSON.name}</h2>
          Age: ${Math.floor(parseFloat(parsedJSON.age))} years old <br><br>
          Bio: ${parsedJSON.description}
          </ul>`

        })
        event.target.reset()

    }) // end monsterform eventlistener


}) // end of DOMContentLoaded
