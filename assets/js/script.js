var today = new Date().toISOString().slice(0,10);

var getUserName = function() {
    var uName= localStorage.getItem('name');
    if(uName) {
        $('#welcome').text(`Welcome back ${uName}!`)
    } 
    // grab name from form input once blastoff button is clicked
   
    // set name to local storage to be able to be used later and for page reload once user has already entered name
    
}

var blastoff = function(event) {
    event.preventDefault();
    
    var name = $('#first_name').val();

    if(name) {
        console.log(name);
        localStorage.setItem('name', name);
    } else {
        alert('Must Enter Name!');
        return;
    }

    $('#welcome-card').remove();
    getSpaceInfo();
    $('#info-card').show();
};

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
    var watchOut = $('<h4></h4>');
    watchOut.css('color', '#ff5757')
    watchOut.text(`Look out! There will be ${numberOfAsteroids} asteroids on your journey to Mars!`)
    $('#asteroid-info').append(watchOut);
    
};

var showUserRocket = function(spacexInfo) {
    // create if statement to check which option the user clicked and which rocket to render
    var trait = document.getElementById('trait-input');
    
    console.log(trait);
    if (trait === 'something'){
        var rocketNumber = spacexInfo[1];
    }

    $('#rocket-name').text(spacexInfo[1].name);
    var rocket = $('#rocket');
    var rocketInfo = $('#rocket-info');

    rocket.attr('src', spacexInfo[1].flickr_images[3]);
    rocket.css('border-radius', '5px');
    rocket.css('width', '30vw');
    rocket.css('margin', '20px');

    var info = $('<h6></h6>');
    if (spacexInfo[1].stages > 1) {
        info.text(`${spacexInfo[1].name} is a ${spacexInfo[1].stages} stage rocket! In Stage 1 there are ${spacexInfo[1].first_stage.engines}. In Stage 2 there `);
    } else {

    }

    rocketInfo.append(info);
    


};

// create blastoff button eent listener 
// have a back button to go select new rocket --- make sure user name will show when going back to select new rocket


//https://api.nasa.gov/insight_weather/?api_key=8mtv2mUNhRq4AdcG3eLJYaGFiJyctDairkAmuZoa&feedtype=json&ver=1.0

$('#findbtn').on('click', blastoff);
getUserName();