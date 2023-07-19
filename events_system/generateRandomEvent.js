const pathToCreatures = "creatures.json";
const pathToEncounters = "encounters.json";

let creaturesArray;
let encountersArray;

$(document).ready(function () {
    loadData(pathToCreatures, loadCreaturesData);
    loadData(pathToEncounters, loadEncountersData);

    $("#rolld20_button").click(function () {
        $("#d20result").html(getRandomIntInclusive(1, 20));
    });

    $("#rolld20_for4phases").click(function () {
        $("#morning").html(getRandomIntInclusive(1, 20));
        $("#midday").html(getRandomIntInclusive(1, 20));
        $("#evening").html(getRandomIntInclusive(1, 20));
        $("#night").html(getRandomIntInclusive(1, 20));
    });

    $("#generate_creature_button").click(function () {
        generateRandomCreature();
    });

    $("#generate_encounter_button").click(function () {
        generateRandomEncounter();
    });
});

/* XML Loading */
function loadData(pathToJson, loadingFunction) {
    $.get({
        url: pathToJson,
        type: 'get',
        async: false,
        dataType: 'json',
        success: function (data) {
            loadingFunction(data);
        }
    })
}

function loadCreaturesData(data) {
    creaturesArray = data;
}
function loadEncountersData(data) {
    encountersArray = data;
}

/* Creature Generating */
function generateRandomCreature() {
    let selectedTerrain = $("#generate_creature_form input[type='radio']:checked").val();
    if (selectedTerrain == null) return;

    let filteredCreatures;
    switch(selectedTerrain){
        case 'RuinsUnderground':
            filteredCreatures = creaturesArray.filter(c => c.RuinsUnderground === true);
            break;
        case 'PlainsHills':
            filteredCreatures = creaturesArray.filter(c => c.PlainsHills === true);
            break;
        case 'Desert':
            filteredCreatures = creaturesArray.filter(c => c.Desert === true);
            break;
        case 'Woods':
            filteredCreatures = creaturesArray.filter(c => c.Woods === true);
            break;
        case 'Mountains':
            filteredCreatures = creaturesArray.filter(c => c.Mountains === true);
            break;
        case 'Swamp':
            filteredCreatures = creaturesArray.filter(c => c.Swamp === true);
            break;
        case 'Dimensions':
            filteredCreatures = creaturesArray.filter(c => c.Dimensions === true);
            break;
        case 'Water':
            filteredCreatures = creaturesArray.filter(c => c.Water === true);
            break;
    }
    let filteredCount = filteredCreatures.length;
    if (filteredCount == 0) {
        $('#creature').html('No creatures found');
        return;
    }
    let randomIndex = getRandomInt(filteredCount);
    let randomCreature = filteredCreatures[randomIndex];

    let html = "";
    html += "Name: " + randomCreature.Name + '<br>';
    html += "Source: " + randomCreature.Source + '<br><br>';
    html += "AllCreaturesCount: " + creaturesArray.length + " creatures.<br>";
    html += "Choosen from: " + filteredCount + " creatures.<br>";
    $('#creature').html(html);
}

/* Encounter Generating */
function generateRandomEncounter() {
    let selectedTerrain = $("#generate_encounter_form input[type='radio']:checked").val();
    if (selectedTerrain == null) return;

    let filteredEncounters;
    switch(selectedTerrain){
        case 'PlainsHills':
            filteredEncounters = encountersArray.filter(c => c.PlainsHills === true);
            break;
        case 'Desert':
            filteredEncounters = encountersArray.filter(c => c.Desert === true);
            break;
        case 'Woods':
            filteredEncounters = encountersArray.filter(c => c.Woods === true);
            break;
        case 'Mountains':
            filteredEncounters = encountersArray.filter(c => c.Mountains === true);
            break;
        case 'Swamp':
            filteredEncounters = encountersArray.filter(c => c.Swamp === true);
            break;
        case 'Camp':
            filteredEncounters = encountersArray.filter(c => c.Camp === true);
            break;
    }
    let filteredCount = filteredEncounters.length;
    if (filteredCount == 0) {
        $('#creature').html('No encounters found');
        return;
    }
    let randomIndex = getRandomInt(filteredCount);
    let randomEncounter = filteredEncounters[randomIndex];

    let html = "";
    html += "Description: " + randomEncounter.Description + '<br>';
    html += 'PictureId: ' + randomEncounter.Id + '<br><br>';
    html += "AllEncountersCount: " + encountersArray.length + " encounters.<br>";
    html += "Choosen from: " + filteredCount + " encounters.<br>";
    $('#encounter').html(html);
}

// Get a number from 0 to max-1
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Both the maximum and the minimum are inclusive
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}
