var today = new Date().toISOString().slice(0,10);

var getUserName = function() {
    var uName= localStorage.getItem('name');
    if(uName) {
        $('#welcome').text(`Welcome back ${uName}!`)
        $('#first_name').val(uName);
    } 
}

var blastoff = function(event) {
    event.preventDefault();
    
    var name = $('#first_name').val();
    // make sure this if statement check that the user has entered a name and selected an option!!!!!!!
    if(name) {
        console.log(name);
        localStorage.setItem('name', name);
    } else {
        $('#error-card').show();
        return;
    }

    $('#welcome-card').remove();
    getSpaceInfo();
    $('#info-card').show();
};

var closeError = function(event) {
    event.preventDefault();
    $('#error-card').css('display', 'none');
}

var getSpaceInfo  = function() {
    fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=8mtv2mUNhRq4AdcG3eLJYaGFiJyctDairkAmuZoa`)
    .then(function(res) {
        return res.json();
    }) 
    .then(nasaInfo => {
    asteroids(nasaInfo)
    })
    .then (function(){
        fetch('https://api.spacexdata.com/v4/rockets')
        .then(function(res) {
            return res.json();
        }) 
        .then(spacexInfo => {
            showUserRocket(spacexInfo);
            console.log(spacexInfo);
        })
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
    var rocketNumber;
    console.log(trait);
    if (trait === 'something'){
    }
    rocketNumber = spacexInfo[2];

    $('#rocket-name').text(rocketNumber.name);

    var rocket = $('#rocket');
    
    rocket.attr('src', rocketNumber.flickr_images[3]);
    rocket.css('border-radius', '5px');
    rocket.css('max-width', '30vw');
    rocket.css('min-width', '300px');
    rocket.css('margin', '20px');
    
    var rocketInfo = $('#rocket-info');

    var infoDiv = $('<div></div>');
    infoDiv.attr('class', 'row');

    var infoListDiv = $('<div></div>');
    infoListDiv.attr('class', 'col s4 right-align');
  
    var infoListDiv2 = $('<div></div>');
    infoListDiv2.attr('class', 'offset-s4 col s4 left-align');
  

    var infoList = $('<ul></ul>');
    infoList.css('list-decoration', 'none');

    var engines = $('<li></li>');
    engines.text(`Engines: ${rocketNumber.engines.number}`);
    infoList.append(engines);

    var stages = $('<li></li>');
    stages.text(`Stages: ${rocketNumber.stages}`);
    infoList.append(stages);

    var mass = $('<li></li>');
    var num = rocketNumber.mass.lb;
    mass.text(`Mass: ${num} lbs.`);
    infoList.append(mass);

    var infoList2 = $('<ul></ul>');
    infoList2.css('list-decoration', 'none');

    var diameter = $('<li></li>');
    diameter.text(`Diameter: ${rocketNumber.diameter.feet} ft.`);
    infoList2.append(diameter);

    var height = $('<li></li>');
    height.text(`Height: ${rocketNumber.height.feet} ft.`);
    infoList2.append(height);

    var successRate = $('<li></li>');
    successRate.text(`Success Rate: ${rocketNumber.success_rate_pct} %`);
    infoList2.append(successRate);

    

    infoListDiv.append(infoList);

    infoListDiv2.append(infoList2);

    infoDiv.append(infoListDiv);
    infoDiv.append(infoListDiv2);

    rocketInfo.append(infoDiv);
    

};

var goAgain = function(event) {
    event.preventDefault();

}

//https://api.nasa.gov/insight_weather/?api_key=8mtv2mUNhRq4AdcG3eLJYaGFiJyctDairkAmuZoa&feedtype=json&ver=1.0

$('#findbtn').on('click', blastoff);
$('#close-error').on('click', closeError);
getUserName();