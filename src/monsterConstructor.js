const monsterz = [];

class Monster {
  constructor(monster) {
    this.id = monster.id;
    this.age = monster.age;
    this.name = monster.name;
    this.description = monster.description;
    monsterz.push(this);
  };
}
