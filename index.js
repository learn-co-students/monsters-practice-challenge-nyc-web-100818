document.addEventListener('DOMContentLoaded', (e) => {
  // DOM ELEMENTS
  const monsterCont = document.getElementById('monster-container')
  const createForm = document.getElementById('create-monster')
  const forwardBtn = document.getElementById('forward')
  const backBtn = document.getElementById('back')
  // VARIABLES
  const first50url = 'http://localhost:3000/monsters/?_limit=50'
  const second50url = 'http://localhost:3000/monsters/?_limit=50&_page=2'
  const allMonstersUrl = 'http://localhost:3000/monsters'
  // FETCHES / EVENT LISTENERS
  firstFetchandShow()

    // event listener for the form
  createForm.addEventListener('submit', (e) =>{
    e.preventDefault() // forms will try to post so we must preventDefault
    // capture the user inputs (VALUES of the input element) to send in the post / optimistically render
    let name = document.getElementById('name-input').value
    let age = document.getElementById('age-input').value
    let bio = document.getElementById('bio-input').value
    // Optimistically Render the new monster
    monsterCont.innerHTML += `<h1>${name}</h1>
                    <h3>Age: ${age}</h3>
                    <p>Bio: ${bio}</p>`

    fetch(allMonstersUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        "name": name,
        "age": age,
        "description": bio
      })
    }) // end fetch
  }) // form event listener

  forwardBtn.addEventListener('click', (e)=> {
    fetch(second50url, { method: 'GET' })
      .then(r => r.json())
      .then(next50Objects => {
        next50Objects.forEach((monsterObject) => {
          monsterCont.innerHTML += `<h1>${monsterObject.name}</h1>
                                    <h3>Age: ${monsterObject.age}</h3>
                                    <p>Bio: ${monsterObject.description}</p>`
        })
      })
  })

  backBtn.addEventListener('click', (e) => {
    firstFetchandShow()
  })

    // **************** HELPERS *********************
  function firstFetchandShow() {
    fetch(first50url, { method: 'GET' }) // get is default
      .then(r => r.json())
      .then(arrayOf50MonsterObjects => {
        // find element to which u r going to append the render data
        let jsonAsHtml = arrayOf50MonsterObjects.map((monsterObject) => {
          return `<h1>${monsterObject.name}</h1>
                  <h3>Age: ${monsterObject.age}</h3>
                  <p>Bio: ${monsterObject.description}</p>`
        })
        monsterCont.innerHTML = jsonAsHtml.join('')
      })
  }

}) // end of DOMContentLoaded
