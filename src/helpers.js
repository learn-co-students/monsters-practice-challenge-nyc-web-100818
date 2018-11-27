
const getMonsters = (page) => {
  return fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
         .then(response => response.json())
}

const renderMonster = (monster) => {
  return `<div>
            <h2> ${monster.name} </h2>
            <p> ${monster.description} </p>
            <p> ${monster.age} </p>
          </div>`
}

const loadPage = (promise) => {
  promise.then(monsters => {
    for (let i = 0; i < 50; i++) {
      let newMonster = new Monster(monsters[i]);
      monsterContainer.innerHTML += renderMonster(newMonster);
    }
  })
}

const newMonster = (name, age, description) => {
  return fetch(`http://localhost:3000/monsters/`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      name: name,
      age: age,
      description: description
    })
  })
}
