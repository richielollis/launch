var userData = {};

var today = new Date().toISOString().slice(0,10);
userData.day = today;

var userName = function(event) {
    event.preventDefault();
    userData = JSON.parse(localStorage.getItem('name'));
    if(userData && userData.hasOwnProperty('name')) {
        // append name to header
        $('#span').text('Hey')
    } else {
        // grab name from form input once blastoff button is clicked
        var name = $('.validate').val();
        localStorage.setItem('name', name);
        // set name to local storage to be able to be used later and for page reload once user has already entered name
    }

    $('#card').remove();
    getSpaceInfo();
}

var getSpaceInfo  = function() {
    fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=8mtv2mUNhRq4AdcG3eLJYaGFiJyctDairkAmuZoa`)
    .then(function(res) {
    //  console.log(res)
        return res.json();
    }) 
    .then(nasaInfo => {
    asteroids(nasaInfo)
    console.log(nasaInfo)
    })
    
    fetch('https://api.spacexdata.com/v4/rockets')
    .then(function(res) {
        // console.log(res)
        return res.json();
    }) 
    .then(spacexInfo => {
        showUserRocket(spacexInfo);
        console.log(spacexInfo);
    })
    .catch(function(error) {
         console.log(error);
    })
};

var asteroids = function(nasaInfo) {
    var numberOfAsteroids = nasaInfo.element_count;
    console.log(numberOfAsteroids);
    // display how many asteroids the astronaut may encounter on their journey to mars 

    
};


var body = $('body');

var showUserRocket = function(spacexInfo) {
    // create if statement to check which option the user clicked and which rocket to render
    var rocket = $('<img>');
    rocket.attr('src', spacexInfo[1].flickr_images[0]);
    rocket.css('width', '30vw');
    rocket.css('margin', '20px');
    body.append(rocket);

};

// create blastoff button eent listener 
// when blastoff button hit .remove() welcome card and append new card with name, rocket img and rocket info, and asteroids 
// have a back button to go select new rocket --- make sure user name will show when going back to select new rocket


//https://api.nasa.gov/insight_weather/?api_key=8mtv2mUNhRq4AdcG3eLJYaGFiJyctDairkAmuZoa&feedtype=json&ver=1.0

$('button').on('click', userName);