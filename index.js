document.addEventListener('DOMContentLoaded', () => {
    console.log('%c help im trapped in a loaded browzer!', 'color: yellow')

    const fetchData = (page) => fetch(`http://localhost:3000/monsters/?_limit=50&_page=${page}`)
    
    const monsterDiv = document.getElementById('monster-container')
    const monsterForm = document.getElementById('create-monster')
    const backBtn = document.getElementById('back')
    const fwdBtn = document.getElementById('forward')

    fetchData(1)
        .then(res => res.json())
        .then(monsterJson => {
            console.table(monsterJson)
            renderPage(monsterJson)
        })
            
    



    function renderMonster(monster){
        return `
        <div data-div-id='${monster.id}'>
            <center><h3><u>${monster.name}</u></h3></center>
            <p>⚜️<b><u>Age</b></u>:     ${monster.age}</p>
            <p>⚜️<b><u>Key facts</b></u>:<br>${monster.description}</p>
        </div>
        <hr>
        `
    }

    function renderPage(monsters){
        monsterDiv.innerHTML = monsters.map(renderMonster).join('')
    }

        monsterForm.innerHTML = `
        <form>
            Name: <input type='text' id='name' name='name' placeholder='name here!!!' value=''><br>
            Age: <input type='text' id='age' name='age' placeholder='age hurr!!!' value=''><br>
            Description: <input type='text-area' id='description' name='description' placeholder='faxx here' value=''>
            <br><input type='submit' value='CREATE'>
        </form>
        `


    monsterForm.addEventListener('submit', e => {
        e.preventDefault()

        let name = e.target.name.value
        let age = e.target.age.value
        let description = e.target.description.value
    
        fetch('http://localhost:3000/monsters/', {
            method: 'POST',
            headers: {
                'Content-Type': 
                'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name, age, description
            })
        })

    })

    fwdBtn.addEventListener('click', e => {
        fetchData(2)
            .then(res => res.json())
            .then(nextPageJson => renderPage(nextPageJson))
    })

    backBtn.addEventListener('click', e => {
        fetchData(1)
            .then(res => res.json())
            .then(previousPageJson => renderPage(previousPageJson))
    })

})
