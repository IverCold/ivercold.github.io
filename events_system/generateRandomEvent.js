const pathToCreatures = "creatures.xml";
const pathToEncounters = "encounters.xml";

let creaturesXml;
let encountersXml;

$(document).ready(function () {
     loadXml(pathToCreatures, loadCreaturesXml);
     loadXml(pathToEncounters, loadEncountersXml);

     $("#generate_creature_button").click(function () {
         generateRandomCreature();
    });

    $("#generate_encounter_button").click(function () {
        generateRandomEncounter();
    });
});

/* XML Loading */
function loadXml(pathToXml, loadingFunction){
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

function loadCreaturesXml(xmlData){
    creaturesXml = xmlData;
}
function loadEncountersXml(xmlData){
    encountersXml = xmlData;
}

/* Creature Generating */
function generateRandomCreature(){
    let selectedTerrain = $("#generate_creature_form input[type='radio']:checked").val();
    if (selectedTerrain == null) return;

    let selector = 'Creature > ' + selectedTerrain + ':contains("true")';
    var filteredCreatures = $(creaturesXml).find(selector).parent();
    let filteredCount = filteredCreatures.length;
    let randomIndex = getRandomInt(filteredCount);
    let randomCreature = $(filteredCreatures).eq(randomIndex);

    let html = "";
    html += "AllCreaturesCount: " + allCount + " creatures.<br>";
    html += "Choosen from: " + filteredCount + " creatures.<br>";
    html += "Name: " + randomCreature.find('Name').text();
    html += '<br>';
    html += "Source: " + randomCreature.find('Source').text();
    $('#creature').html(html);
}

/* Encounter Generating */
function generateRandomEncounter(){
    let selected = $("#generate_encounter_form input[type='radio']:checked").val();
    if (selected != null)
        alert(selected)
}

// Get a number from 0 to max-1
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}