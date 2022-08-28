// grabs todays date for asteroid count
var today = new Date().toISOString().slice(0,10);

// grabs user name if it already exists in localStorage 
var getUserName = function() {
    var uName = localStorage.getItem('name');
    // if user name in localStorage, then we change text content in welcome card to reflect that 
    if(uName) {
        $('#welcome').text(`Welcome back ${uName}!`);
        $('#first_name').val(uName);
    } 
};

// when user clicks Blast Off! button, we grab the user name and set it to localStorage and then run getSpaceInfo function
// an error card is thrown if user doesnt input a name 
var blastoff = function(event) {
    event.preventDefault();
    var name = $('#first_name').val();
    if(name) {
        localStorage.setItem('name', name);
        getSpaceInfo();
    } else {
        $('#error-card').show();
        return;
    }
};

// allows user to close error card
var closeError = function(event) {
    event.preventDefault();
    $('#error-card').css('display', 'none');
}

// grabs all info from api's 
var getSpaceInfo  = function() {
    // the date is passed here to grab asteroid info
    fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=8mtv2mUNhRq4AdcG3eLJYaGFiJyctDairkAmuZoa`)
    .then(function(res) {
        return res.json();
    }) 
    .then(nasaInfo => {
    asteroids(nasaInfo);
    })
    // grabs info about the spacex rockets
    .then (function(){
        fetch('https://api.spacexdata.com/v4/rockets')
        .then(function(res) {
            return res.json();
        }) 
        // removes welcome card after getting all the info needed 
        // calls function that shows the users rocket
        .then(spacexInfo => {
            var trait = $('#trait-input :selected').val();
            showUserRocket(spacexInfo, trait);
            $('#welcome-card').remove();
            $('#info-card').show();
        })
    })
    .catch(function(error) {
        alert('Error, please refresh browser or try again later.')
         console.log(error);
    })
};

// grabs asteroid count near earth and displays on rocket card
var asteroids = function(nasaInfo) {
    var numberOfAsteroids = nasaInfo.element_count;
    var watchOut = $('<h4></h4>');
    watchOut.css('color', '#ff5757');
    watchOut.text(`Look out! There will be ${numberOfAsteroids} asteroids on your journey to Mars!`);
    $('#asteroid-info').html('');
    $('#asteroid-info').append(watchOut);
};

// displays rocket card with all info 
var showUserRocket = function(spacexInfo, trait) {
    var rocketNumber = spacexInfo[trait];

    // rocket name
    $('#rocket-name').text(rocketNumber.name);
    // grabs rocket image tag
    var rocket = $('#rocket');
    // randomly picks from the multiple images that the spacex object has for each rocket 
    var num = Math.floor(Math.random()*rocketNumber.flickr_images.length);
    // style the rocket image
    rocket.attr('src', rocketNumber.flickr_images[num]);
    rocket.css('border-radius', '5px');
    rocket.css('max-width', '30vw');
    // rocket.css('min-width', '300px');
    rocket.css('margin', '20px');
    // grabs rocket info div
    var rocketInfo = $('#rocket-info');
    //create two different info lists that can be appended to a list div (1 and 2) and then appened the info div (added for ease of manipulation through materialize css)
    var infoDiv = $('<div></div>');
    infoDiv.attr('class', 'row');

    var infoListDiv = $('<div></div>');
    infoListDiv.attr('class', 'col s5 right-align');
  
    var infoListDiv2 = $('<div></div>');
    infoListDiv2.attr('class', 'offset-s2 col s5 left-align');
  
    var infoList = $('<ul></ul>');
    infoList.css('list-decoration', 'none');
    // grabs number of engines and adds to card
    var engines = $('<li></li>');
    engines.text(`Engines: ${rocketNumber.engines.number}`);
    infoList.append(engines);
    // grabs how many stages rocket is and adds to card
    var stages = $('<li></li>');
    stages.text(`Stages: ${rocketNumber.stages}`);
    infoList.append(stages);
    // grabs rocket mass and adds to card
    var mass = $('<li></li>');
    var num = rocketNumber.mass.lb;
    mass.text(`Mass: ${num.toLocaleString('en-us')} lbs.`);
    infoList.append(mass);
    
    var infoList2 = $('<ul></ul>');
    infoList2.css('list-decoration', 'none');
    // grabs diameter of rocket and adds to card
    var diameter = $('<li></li>');
    diameter.text(`Diameter: ${rocketNumber.diameter.feet} ft.`);
    infoList2.append(diameter);
    // grabs height and adds to card
    var height = $('<li></li>');
    height.text(`Height: ${rocketNumber.height.feet} ft.`);
    infoList2.append(height);
    // grabs success rate and adds to card
    var successRate = $('<li></li>');
    successRate.text(`Success Rate: ${rocketNumber.success_rate_pct} %`);
    infoList2.append(successRate);
    // append everything to its proper div and then add all to card
    infoListDiv.append(infoList);

    infoListDiv2.append(infoList2);

    infoDiv.append(infoListDiv);
    infoDiv.append(infoListDiv2);

    rocketInfo.append(infoDiv);
};

// when user clicks on the logo, this function will clear everything and reset the webpage
var clearLocalStorage = function(event) {
    event.preventDefault();
    localStorage.setItem('name', '');
    location.reload();

};

// event listeners 
$('#findbtn').on('click', blastoff);
$('#close-error').on('click', closeError);
$('#logo-image').on('click', clearLocalStorage);

// calling fucniton to grab user name
getUserName(); 