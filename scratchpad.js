function getMonsters() {
  fetch(`http://localhost:3000/monsters/?_limit=50_page=1`)
    .then(r => r.json())
    .then(parsedMonsters => {
      console.table(parsedMonsters);
      return parsedMonsters;
    });
}

getMonsters();
