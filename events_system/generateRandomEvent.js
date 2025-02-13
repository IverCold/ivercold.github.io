const pathToCreatures = "creatures.json";
const pathToEncounters = "encounters.json";
const pathToCampEvents = "camp_events.json"

let creaturesArray;
let encountersArray;
let campEventsArray;

$(document).ready(function () {
    loadData(pathToCreatures, loadCreaturesData);
    loadData(pathToEncounters, loadEncountersData);
    loadData(pathToCampEvents, loadCampEventsData);

    $("#flip_coin").click(function () {
        flipCoin();
    });

    $("#generate_encounter_button").click(function () {
        generateRandomEncounter();
    });

    $("#generate_camp_event_button").click(function () {
        generateRandomCampEvent();
    });

    $("#generate_creature_button").click(function () {
        generateRandomCreature();
    });

    $("#rolld20_button").click(function () {
        $("#d20result").html(getRandomIntInclusive(1, 20));
    });

    $("#rolld20_for4phases").click(function () {
        $("#morning").html(getRandomIntInclusive(1, 20));
        $("#midday").html(getRandomIntInclusive(1, 20));
        $("#evening").html(getRandomIntInclusive(1, 20));
        $("#night").html(getRandomIntInclusive(1, 20));
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
function loadCampEventsData(data) {
    campEventsArray = data;
}

/* Encounter Generating */
function generateRandomEncounter() {
    let isWoodsNoPlains = $('#generate_encounter_form #encounter_woods_only').is(":checked");
    var isPhenomenon = $('#generate_encounter_form #encounter_phenomenon').is(":checked");

    let selectedTerrain = $("#generate_encounter_form input[type='radio']:checked").val();
    if (selectedTerrain == null) return;

    let filteredEncounters = encountersArray;
    if (isPhenomenon) filteredEncounters = encountersArray.filter(x => x.IsPhenomenon)
    switch(selectedTerrain){
        case 'PlainsHills':
            filteredEncounters = filteredEncounters.filter(c => c.PlainsHills);
            break;
        case 'Desert':
            filteredEncounters = filteredEncounters.filter(c => c.Desert);
            break;
        case 'Woods':
            if (isWoodsNoPlains)
                filteredEncounters = filteredEncounters.filter(c => c.Woods && !c.PlainsHills);
            else
                filteredEncounters = filteredEncounters.filter(c => c.Woods);
            break;
        case 'Mountains':
            filteredEncounters = filteredEncounters.filter(c => c.Mountains);
            break;
        case 'Swamp':
            filteredEncounters = filteredEncounters.filter(c => c.Swamp);
            break;
        case 'Camp':
            filteredEncounters = filteredEncounters.filter(c => c.Camp);
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
    html += "<b>Description:</b> " + randomEncounter.Description + '<br><br>';

    html += GetBoolProperty(randomEncounter, "PlainsHills");
    html += GetBoolProperty(randomEncounter, "Desert");
    html += GetBoolProperty(randomEncounter, "Woods");
    html += GetBoolProperty(randomEncounter, "Mountains");
    html += GetBoolProperty(randomEncounter, "Swamp");

    html += "<br><br>Encounters total count: " + encountersArray.length + " encounters.<br>";
    html += "After filter: " + filteredCount + " encounters.<br>";
    $('#encounter').html(html);
}

/* Camp Events Generating */
function generateRandomCampEvent() {
    let isWoodsNoPlains = $('#generate_camp_event_form #camp_woods_only').is(":checked");

    let selectedTerrain = $("#generate_camp_event_form input[type='radio']:checked").val();
    if (selectedTerrain == null) return;

    let filteredCampEvents = campEventsArray;
    switch(selectedTerrain){
        case 'PlainsHills':
            filteredCampEvents = filteredCampEvents.filter(c => c.PlainsHills);
            break;
        case 'Desert':
            filteredCampEvents = filteredCampEvents.filter(c => c.Desert);
            break;
        case 'Woods':
            if (isWoodsNoPlains)
                filteredCampEvents = filteredCampEvents.filter(c => c.Woods && !c.PlainsHills);
            else
                filteredCampEvents = filteredCampEvents.filter(c => c.Woods);
            break;
        case 'Mountains':
            filteredCampEvents = filteredCampEvents.filter(c => c.Mountains);
            break;
        case 'Swamp':
            filteredCampEvents = filteredCampEvents.filter(c => c.Swamp);
            break;
    }
    let filteredCount = filteredCampEvents.length;
    if (filteredCount == 0) {
        $('#creature').html('No encounters found');
        return;
    }
    let randomIndex = getRandomInt(filteredCount);
    let randomCampEvent = filteredCampEvents[randomIndex];

    let html = "";
    html += "<b>Description:</b> " + randomCampEvent.Description + '<br><br>';

    html += GetBoolProperty(randomCampEvent, "PlainsHills");
    html += GetBoolProperty(randomCampEvent, "Desert");
    html += GetBoolProperty(randomCampEvent, "Woods");
    html += GetBoolProperty(randomCampEvent, "Mountains");
    html += GetBoolProperty(randomCampEvent, "Swamp");

    html += "<br><br>Camp events total count: " + campEventsArray.length + " encounters.<br>";
    html += "After filter: " + filteredCount + " encounters.<br>";
    $('#camp_event').html(html);
}

/* Creature Generating */
function generateRandomCreature() {
    let isAllCreatures = $('#generate_encounter_form #all_creatures').is(":checked");
    let selectedTerrain = $("#generate_creature_form input[type='radio']:checked").val();
    if (selectedTerrain == null) return;

    let filteredCreatures = creaturesArray.filter(c => c.UsedInRandom);
    if (isAllCreatures) filteredCreatures = creaturesArray;
    switch(selectedTerrain){
        case 'RuinsUnderground':
            filteredCreatures = filteredCreatures.filter(c => c.RuinsUnderground);
            break;
        case 'PlainsHills':
            filteredCreatures = filteredCreatures.filter(c => c.PlainsHills);
            break;
        case 'Desert':
            filteredCreatures = filteredCreatures.filter(c => c.Desert);
            break;
        case 'Woods':
            filteredCreatures = filteredCreatures.filter(c => c.Woods);
            break;
        case 'Mountains':
            filteredCreatures = filteredCreatures.filter(c => c.Mountains);
            break;
        case 'Swamp':
            filteredCreatures = filteredCreatures.filter(c => c.Swamp);
            break;
        case 'Dimensions':
            filteredCreatures = filteredCreatures.filter(c => c.Dimensions);
            break;
        case 'Water':
            filteredCreatures = filteredCreatures.filter(c => c.Water);
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
    html += "<b>Name:</b> " + randomCreature.Name + '<br>';
    html += "<b>Source:</b> " + randomCreature.Source + '<br><br>';

    html += GetBoolProperty(randomCreature, "RuinsUnderground");
    html += GetBoolProperty(randomCreature, "PlainsHills");
    html += GetBoolProperty(randomCreature, "Desert") + "<br>";
    html += GetBoolProperty(randomCreature, "Woods");
    html += GetBoolProperty(randomCreature, "Mountains");
    html += GetBoolProperty(randomCreature, "Swamp") + "<br>";
    html += GetBoolProperty(randomCreature, "Dimensions");
    html += GetBoolProperty(randomCreature, "Water");

    html += "<br><br>Creatures total count: " + creaturesArray.length + " creatures.<br>";
    html += "Filtered count: " + filteredCount + " creatures.<br>";
    $('#creature').html(html);
}

function GetBoolProperty(obj, propName) {
    return `<b>${propName}:</b> ${YesNo(obj[propName])} | `;
}

function YesNo(isTrue) {
    return isTrue ? '✅' : '⬜';
}

function flipCoin() {
    let result = getRandomIntInclusive(1,2);
    if (result == 1)
        $("#coin_result").append(" | Positive");
    else
        $("#coin_result").append(" | Negative");
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
