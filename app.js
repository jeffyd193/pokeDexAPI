
//Dom elements connecting to a class
var mainScreen = document.querySelector('.main-screen');
var pokeName = document.querySelector('.poke-name');
var pokeId = document.querySelector('.poke-id');
var pokeFrontImage = document.querySelector('.poke-front-image');
var pokeBackImage = document.querySelector('.poke-back-image');
var pokeTypeOne = document.querySelector('.poke-type-one');
var pokeTypeTwo = document.querySelector('.poke-type-two');
var pokeWeight = document.querySelector('.poke-weight');
var pokeHeight = document.querySelector('.poke-height');
var pokeListItems = document.querySelectorAll('.list-item');
var leftButton = document.querySelector('.left-button');
var rightButton = document.querySelector('.right-button');


//constants and variables
var preUrl = null;
var nextUrl = null;
var TYPES = [
    'normal', 'fighting', 'flying',
    'poision', 'ground', 'rock',
    'bug', 'ghost', 'steel',
    'fire', 'water', 'grass',
    'electric', 'psychic', 'ice', 
    'dragon', 'dark', 'fairy'
];


//functions
var resetScreen = () => {
    mainScreen.classList.remove('hide');
    for (const type of TYPES){
        mainScreen.classList.remove(type)
    }
}

var capitalize = (str) => str[0].toUpperCase() + str.substr(1);



var fetchPokeList = (url) => {
    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data)
        var { results, previous, next } = data;
        prevUrl = previous;
        nextUrl = next;

        for(var i = 0; i <pokeListItems.length; i++){
            const pokeListItem = pokeListItems[i];
            const resultData = results[i];
           

            if(resultData){
                const { name, url } = resultData;
                var urlArray = url.split('/');
                var id = urlArray[urlArray.length - 2];
                pokeListItem.textContent = id + '. ' + capitalize(name);
            } else{ 
                pokeListItem.textContent = '';
            }
        }

    });
};

var fetchPokeData = id => {
    console.log("js is connected")
fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    .then(res => res.json())
    .then(data => {

        resetScreen();

        //types
        const dataTypes = data['types'];
        const dataFirstType = dataTypes[0];
        const dataSecondType = dataTypes[1];
        pokeTypeOne.textContent = capitalize(dataFirstType['type']['name'])
        if(dataSecondType){
            pokeTypeTwo.textContent = capitalize(dataSecondType['type']['name'])
        } else {

            pokeTypeTwo.classList.add('hide')
            pokeTypeTwo.textContent = '';
        }
        //this added the class list by matching the name of the css classes
        //with the same name of the data name in the api so the dataFirstType['type']['name']
        // is the same exact name as the class in the css documents with a corresponding color
        mainScreen.classList.add(dataFirstType['type']['name']);

        //Pokemon info and data
        
        pokeName.textContent = capitalize(data['name']);
        //this padStart says i want the string 3 long and if it isn't add 0 you can 
        //put anything here but you must keep it below the count of the first integer
        //like i can put hi but not hello or i can put 69 but not 4200
        pokeId.textContent = "#" + data['id'].toString().padStart(3, '0');
        pokeWeight.textContent = data['weight'];
        pokeHeight.textContent = data['height']
 
        
        pokeBackImage.src = data['sprites']['back_default'] || '';
        pokeFrontImage.src = data['sprites']['front_shiny'] || '';

    });


}

var handleLeftButtonClick = () => {
    if(prevUrl) {
        fetchPokeList(prevUrl)
    }
}

var handleRightButtonClick = () => {
    if(nextUrl) {
        fetchPokeList(nextUrl)
    }
}

var handleListItemClick = (e) => {
    var listItem = e.target;
    if(!e.target){
        return listItem;
    }
    var id = listItem.textContent.split('.')[0];
    fetchPokeData(id)
    console.log(id)
};


//a fetched api for the left side


//api for the right side


fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20')
    .then(res => res.json())
    .then(data => {
        console.log(data)
        var { results, previous, next } = data;
        prevUrl = previous;
        nextUrl = next;

        for(var i = 0; i <pokeListItems.length; i++){
            const pokeListItem = pokeListItems[i];
            const resultData = results[i];
           

            if(resultData){
                const { name, url } = resultData;
                var urlArray = url.split('/');
                var id = urlArray[urlArray.length - 2];
                pokeListItem.textContent = id + '. ' + capitalize(name);
            } else{ 
                pokeListItem.textContent = '';
            }
        }

    });

    //event listener

    leftButton.addEventListener('click', handleLeftButtonClick);
    rightButton.addEventListener('click', handleRightButtonClick);
    for(var pokeListItem of pokeListItems) {
        pokeListItem.addEventListener('click', handleListItemClick);
    }

    fetchPokeList('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20')