const pathToCreatures = "creatures.xml";
const pathToEncounters = "encounters.xml";

let creaturesXml;
let encountersXml;

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
function loadData(pathToXml, loadingFunction) {
    $.get({
        url: pathToXml,
        type: 'get',
        async: false,
        dataType: 'xml',
        success: function (data) {
            loadingFunction(data);
        }
    })
}

function loadCreaturesData(xmlData) {
    creaturesArray = xmlData;
}
function loadEncountersData(xmlData) {
    encountersArray = xmlData;
}

/* Creature Generating */
function generateRandomCreature() {
    let selectedTerrain = $("#generate_creature_form input[type='radio']:checked").val();
    if (selectedTerrain == null) return;

    var allCount = $(creaturesArray).find('Creature').length;

    let selector = 'Creature > ' + selectedTerrain + ':contains("true")';
    var filteredCreatures = $(creaturesArray).find(selector).parent();
    let filteredCount = filteredCreatures.length;
    let randomIndex = getRandomInt(filteredCount);
    let randomCreature = $(filteredCreatures).eq(randomIndex);

    let html = "";
    html += "Name: " + randomCreature.find('Name').text() + '<br>';
    html += "Source: " + randomCreature.find('Source').text() + '<br><br>';
    html += "AllCreaturesCount: " + allCount + " creatures.<br>";
    html += "Choosen from: " + filteredCount + " creatures.<br>";
    $('#creature').html(html);
}

/* Encounter Generating */
function generateRandomEncounter() {
    let selectedTerrain = $("#generate_encounter_form input[type='radio']:checked").val();
    if (selectedTerrain == null) return;

    var allCount = $(encountersArray).find('Encounter').length;

    let selector = 'Encounter > ' + selectedTerrain + ':contains("true")';
    var filteredEncounters = $(encountersArray).find(selector).parent();
    let filteredCount = filteredEncounters.length;
    let randomIndex = getRandomInt(filteredCount);
    let randomEncounter = $(filteredEncounters).eq(randomIndex);

    let html = "";
    html += "Description: " + randomEncounter.find('Description').text() + '<br>';
    html += 'PictureId: ' + randomEncounter.find('Id').text() + '<br><br>';
    html += "AllEncountersCount: " + allCount + " encounters.<br>";
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
