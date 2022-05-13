//Accessing the hero
var xhrRequest = new XMLHttpRequest();

//accessing the hero id from currect window object
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var heroId = urlParams.get('id');
let heroObject = null;
xhrRequest.onload = function(){
    var result = JSON.parse(xhrRequest.response);
    //getting all the available data
    var names = result;
    heroObject = names;
    fillHeroData(heroObject);
    document.getElementById('hero-image').attributes.src = heroObject.image.url;
}

xhrRequest.open('get', 'https://www.superheroapi.com/api.php/3328323083897178/'+heroId);
xhrRequest.send();

//function to fill all the super hero data

function fillHeroData(data){
    var img = document.getElementById('hero-image');
    img.setAttribute('src', data.image.url);
    document.getElementById('hero-name').innerText = data.name;
    var powers = data.powerstats;
    AddPowers(powers);
    var otherNames = data.biography.aliases;
    aliases(otherNames);
    biography(data.biography);
    var connections = data.connections["group-affiliation"];
    document.getElementById('connections').innerText = 'Connections : ' +connections;
    var publisher = document.createElement('span');
    publisher.innerText = data.biography.publisher;
    publisher.style.fontFamily = 'sans-serif';
    publisher.style.fontSize = '1.3rem';
    document.getElementById('additional-info').appendChild(publisher);

}


//function to show biography
function biography(bio){
    console.log(bio);
    for(const [key, value] of Object.entries(bio)){
        var p = document.createElement('p');
        p.innerText = `${key}: ${value}`;
        p.style.textTransform = 'capitalize';
        document.getElementById('occupation').appendChild(p);
    }
}


//function to show other names of a hero
function aliases(otherNames){
    for(let i = 0; i < otherNames.length; i++){
        var span = document.createElement('span');
        if(otherNames.length == 1){
            span.innerText = ' ( '+ otherNames[i]+' )';
            span.style.textTransform = 'Capitalize';
            document.getElementById('aliases').appendChild(span);
            break;
        }
        if(i == 0){
            span.innerText = ' ( '+ otherNames[i]+' , ';
        }
        else if(i == otherNames.length - 1){
            span.innerText = otherNames[i]+' ) ';
        }
        else{
            span.innerText = otherNames[i]+' , ';
        }

        span.style.textTransform = 'Capitalize';
        document.getElementById('aliases').appendChild(span);
    }
}


//Adding stats of the hero
function AddPowers(powers){
    //Traversing through powers

    for(const [key, value] of Object.entries(powers)){
        var p = document.createElement('p');
        p.innerText = `${key}: ${value}`;
        p.classList.add('details');
        document.getElementById('hero-details').appendChild(p);
    }
}

//function to show toast message
document.getElementById('btn-add-favourite').addEventListener('click', addToFavourites);
function showToastMessage(added){
    var message;
    if(added){
        message = "Added your SuperHero to Favourites Successfully";
    }
    else{
        message = "Supehero already added";
    }
    var elem = document.getElementById('msg-container');
    elem.innerText = message;
    elem.style.display = 'block';
    setTimeout(function(){
        elem.style.display = 'none';
    }, 1300);
}


//function to add the superhero
function addToFavourites(){
    let heroName = heroObject.name;
    let heroImage = heroObject.image;
    var hero = {
        id:heroId,
        name:heroName,
        image:heroImage.url
    }


    //accessing and psuhing data from and to local storage
    var storedNames = JSON.parse(localStorage.getItem("names") || "[]");

    if(storedNames == null){
        var names = [];
        names.push(hero);
        window.localStorage.setItem("names", JSON.stringigy(names));
        showToastMessage(true);
    }
    else{
        var res = containsObject(heroId, storedNames);
        console.log(res);
        if(!res){
            storedNames.push(hero);
            window.localStorage.setItem("names", JSON.stringify(storedNames));
            showToastMessage(true);
        }
        else{
            showToastMessage(false);
        }
    }

    console.log(storedNames);

}


//function to check if hero already added

function containsObject(id, list){
    for(let i = 0; i < list.length; i++){
        if(list[i].id == id){
            return true;
        }
    }
    return false;
}

//on clicking my favourite buttom
document.getElementById('btn-favourite').addEventListener('click', function(){
    window.location.assign('favourite.html');
});


