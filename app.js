function $(nodo) {
    return document.querySelector(nodo)
}

const $containCard = $(".contain-cards")
const $paginaActual = $(".pagina-actual")
const $nextPage = $("#next-page")
const $previousPage = $("#previous-page")
const $initPage = $("#init-page")
const $lastPage = $("#last-page")
const $filterTodos = $("#filter-todos")
const $filterFamale = $("#filter-female")
const $filterMale = $("#filter-male")
const $filterGenderless = $("#filter-genderless")
const $filterUnknown = $("#filter-unknown")


let page = 1
let totalCharacters;
let totalPage;
let AllCharacters;

window.onload =  async () => {
    load(1)
}

async function load (page) {
    if(page == 1) {
        $previousPage.classList.add(`desactived`)
        $initPage.classList.add(`desactived`)
    } else {
        $previousPage.classList.remove(`desactived`)
        $initPage.classList.remove(`desactived`)
    }

    if(page > 41) {
        $nextPage.classList.add(`desactived`)
        $lastPage.classList.add(`desactived`)
    } else {
        $nextPage.classList.remove(`desactived`)
        $lastPage.classList.remove(`desactived`)
    }


    fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
    .then(results => results.json())
    .then(data => {
        totalCharacters = data.info.count;
        totalPage = totalCharacters / 42
        AllCharacters = data.results
        $paginaActual.innerHTML = `Pagina Actual ${page}`
        paintCards(data.results)
    })
}


$nextPage.onclick = nextPage 
$previousPage.onclick = previousPage
$initPage.onclick = initPage
$lastPage.onclick = lastPage
$filterFamale.onclick = filterFamale
$filterMale.onclick = filterMale
$filterTodos.onclick = filterTodos
$filterGenderless.onclick = filterGenderless
$filterUnknown.onclick = filterUnknown


function nextPage () {
    if(page < 42) {
        page = page += 1;
        load(page)
    }
}

function previousPage () {   
    if(page > 1) {
        page = page -= 1
        load(page)
    }
}

function initPage () {
   if(page !== 1) {
        page = 1
        load(page) 
    }   
}

function lastPage () {
    if(page = 42) {
        page = 42
        load(page)
    }
}

function filterFamale () {
    let nuevoArray = []
    AllCharacters.forEach(character => {
        if(character.gender === "Female")
        nuevoArray.push(character)
    })
    paintCards(nuevoArray)
}

function filterMale () {
    let nuevoArray = []
    AllCharacters.forEach(character => {
        if(character.gender === "Male")
        nuevoArray.push(character)
    })
    paintCards(nuevoArray)
}

function filterTodos () {    
    paintCards(AllCharacters)
}

function filterGenderless () {
    let nuevoArray = []
    AllCharacters.forEach(character => {
        if(character.gender === "Genderless")
        nuevoArray.push(character)
    })
    paintCards(nuevoArray)
}

function filterUnknown () {
    let nuevoArray = []
    AllCharacters.forEach(character => {
        if(character.gender === "unknown")
        nuevoArray.push(character)
    })
    paintCards(nuevoArray)
}


function paintCards (characterPainter) {
    $containCard.innerHTML = ""
    characterPainter.forEach(character => {
            $containCard.innerHTML += `<div class="box">
                <img src=${character.image} alt=${character.name} />
                <div class="character">
                    <p>Nombre: ${character.name}</p>
                    <p>Genero: ${character.gender}</p>
                    <p>Species: ${character.species}</p>
                    <p>Status: ${character.status}</p>
                    <p>Origin: ${character.origin.name}</p>
                    <p>Location: ${character.location.name}</p>                    
                </div>
                <div class="more">
                    <a href="#">Ver mas...</a>
                </div>
            </div> `
     });
}