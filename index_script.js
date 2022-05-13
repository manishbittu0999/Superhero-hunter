//trigger function to get data on each keyup event in input
document.getElementById('hero-name').onkeyup = getData;

//hero id
let heroId = 0;

//function to get data;

function getData(){

    var val = document.getElementById('hero-name').value;
    var list = document.getElementById('auto-complete');
    clearList();


    var xhrRequest = new XMLHttpRequest();

    //handling http request

    xhrRequest.onload = function(){
        var result = JSON.parse(xhrRequest.response);

        //getting all the available data

        var name = result.results;

        if(name == null){
            clearList();
            console.log('Not Fount');
        }
        else{
            for(var i of name)
            {
                //creating individual list item and appending it
                var li = document.createElement('li');
                li.innerText = i.name;
                li.id = i.id;
                li.classList.add('list-group-item');
                li.addEventListener('click', function(){
                    heroId = this.id;
                    document.getElementById('hero-name').value = this.innerText;
                    clearList();

                    //brings the focus to input

                    document.getElementById('hero-name').focus();
                    return;
                });

                var ul = document.getElementById('auto-complete').appendChild(li);
            }
        }
    }


    //xmlRequest

    xhrRequest.open('get', 'https://www.superheroapi.com/api.php/3328323083897178/search/'+val);
    xhrRequest.send();

}


//handling enter key event


document.getElementById('hero-name').addEventListener('keydown', function(ev){
    if(ev.keyCode == 13){
        if(heroId == 0){
            alert('No Hero fount! Try selecting the hero from the list');

        }
        else{
            showHero();
        }
    }
});



//function to clear the list items from the list

function clearList(){

    var list = document.getElementById('auto-complete');

    while(list.hasChildNodes())
    {
        list.removeChild(list.firstChild);
    }
}


//on clicking search button
document.getElementById('btn-search').addEventListener('click', showHero);


function showHero(){
    var name = document.getElementById('hero-name').value;

    if(name == ""){
        alert("Enter the name to be searched");
    }
    else if(heroId == 0){
        alert("No hero found! Try selecting the hero from the list");
    }
    else{
        window.open('superhero.html?id='+heroId,'blank');
    }
}


//on clicking my favourite button
document.getElementById('btn-favourite').addEventListener('click', function(){
    window.location.assign('favourite.html');
})