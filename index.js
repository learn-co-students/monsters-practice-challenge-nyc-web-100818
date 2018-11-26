document.addEventListener("DOMContentLoaded", function(e){
  let monstersArray = [];
  const monstersContainer = document.getElementById('monster-container');
  let page = 1;
  init();

  function displayMonsters(page){
    monstersContainer.innerHTML = ""
    let end = page * 50
    let start = end - 50

    for (start; start < end; start++){
      monstersContainer.innerHTML +=
      `<div>
        <h2>${monstersArray[start].name}</h2>
        <h3>${monstersArray[start].age}</h3>
        <p>${monstersArray[start].description}</p>
      </div>`
    }
  };

  function nextPage(){
    ++page;
    displayMonsters(page)
  }

  function prevPage(){
    --page;
    displayMonsters(page)
  }

  document.getElementById('forward').addEventListener('click', function(){
    let temp = (page*50)-49
    if (monstersArray[temp] !== undefined){
      nextPage();
    }
    else{
      alert("Wow! Slow down buddy! No monsters here.")
    }
  });

  document.getElementById('back').addEventListener('click', function(){
    if (page === 1){
      alert("Wow! Slow down buddy! No monsters here.")
    }else {
      prevPage()
    }
  });

  document.addEventListener('submit', function(event){
    event.preventDefault();
    let name = event.target.name.value
    let age = event.target.age.value
    let description = event.target.description.value
    createMonster(name, age, description)
    .then(function(response){
      // console.log(response);
      init();
    })
  })

  function createMonster(name, age, description) {
    console.log(`in createMonster() ${name}, ${age}, ${description}`);
    return fetch('http://localhost:3000/monsters', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', //sending to the server
        'Accept': 'application/json' //back from the server
      },
      body: JSON.stringify({
        name: name,
        age: age,
        description: description
      })
    })
  }

  function init(){
    fetch("http://localhost:3000/monsters", {method: "GET"})
    .then(response => response.json())
    .then(d => {
      monstersArray = d
      displayMonsters(page)
    })
  }


})
