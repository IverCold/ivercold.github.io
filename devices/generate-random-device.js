const pathToCyphers = "Cyphers_Official_Books.json";
const pathToArtefacts = "Artefacts_Official_Books.json";
const pathToOddities = "Oddities_Official_Books.json";

let cyphersJson;
let artefactsJson;
let odditiesJson;

$(document).ready(function () {
    loadDevicesJsonSync(pathToOddities, loadOddities);
    loadDevicesJsonSync(pathToCyphers, loadCyphers);
    loadDevicesJsonSync(pathToArtefacts, loadArtefacts);

    $("#generate_oddity").click(function () {
        generateRandomOddity();
    });

    $("#generate_cypher").click(function () {
        generateRandomCypher();
    });

    $("#generate_artefact").click(function () {
        generateRandomArtefact();
    });

});

// abstract function
function loadDevicesJsonSync(pathToXML, loadingFunction) {
    $.get({
        url: pathToXML,
        type: "get",
        async: false,
        dataType: 'json',
        success: function (data) {
            loadingFunction(data);
        }
    });
}

function loadOddities(data) {
    odditiesJson = data;
}

function loadCyphers(data) {
    cyphersJson = data;
}

function loadArtefacts(data) {
    artefactsJson = data;
}



function generateRandomCypher() {
    let randomDevice = getRandomDevice(cyphersJson);

    let html = "<div class=\"device-block\">";
    html += encloseDeviceProperty("Name", randomDevice.Name);

    html += combineLevelProperty(randomDevice);

    html += encloseDeviceProperty("Usable", randomDevice.Usable);
    html += encloseDeviceProperty("Wearable", randomDevice.Wearable);
    html += encloseDeviceProperty("Internal", randomDevice.Internal);

    html += encloseDeviceProperty("Effect", randomDevice.Effect);
    if (randomDevice.RollTable != null)
        html += makeRollTable(randomDevice);
    
    html += encloseDeviceProperty("Source", randomDevice.Source);
    html += "</div>";
    $("#generated-items").prepend(html);
}

function generateRandomArtefact() {
    let randomDevice = getRandomDevice(artefactsJson);

    let html = "<div class=\"device-block\">";
    html += encloseDeviceProperty("Name", randomDevice.Name);
    html += encloseDeviceProperty("Form", randomDevice.Form);
    html += combineLevelProperty(randomDevice);

    html += encloseDeviceProperty("Effect", randomDevice.Effect);
    if (randomDevice.RollTable != null)
        html += makeRollTable(randomDevice);

    html += encloseDeviceProperty("Depletion", randomDevice.Depletion);
    html += encloseDeviceProperty("Source", randomDevice.Source);
    html += "</div>";
    $("#generated-items").prepend(html);
}

function generateRandomOddity() {
    let randomDevice = getRandomDevice(odditiesJson);

    let html = "<div class=\"device-block\">";
    html += encloseDeviceProperty("Description", randomDevice.Description);
    html += encloseDeviceProperty("Source", randomDevice.Source);
    html += "</div>";
    $("#generated-items").prepend(html);
}

function combineLevelProperty(randomDevice){
    let levelFormula = randomDevice.Level;

    if (levelFormula.indexOf("d") == -1)
        return `<div><b>Level:</b> ${levelFormula}</div>`;

    let baseDice = 6;
    if (levelFormula[2] != '6') baseDice = 10;
    
    let iteratorStart = 3;
    if (baseDice == 10) iteratorStart = 4;
    
    if (iteratorStart == levelFormula.length){
        return `<div><b>Level:</b> ${getRandomInt(baseDice) + 1} [${levelFormula}]</div>`;
    }

    let termString = "";
    for(let i = iteratorStart; i < levelFormula.length; i++){
        if (levelFormula[i] == "+" || levelFormula[i] == " ")
            continue;
        else termString += levelFormula[i];
    }

    var term = Number(termString);
    return `<div><b>Level:</b> ${getRandomInt(baseDice) + 1 + term} [${levelFormula}]</div>`;
}

function getRandomDevice(jsonData) {
    var index = getRandomInt(jsonData.length);
    return jsonData[index];
}

function encloseDeviceProperty(name, value) {
    if (value == null || value == "") return "";
    else return `<div><b>${name}:</b> ${value}</div>`;
}

function makeRollTable(randomDevice) {
    let resultList = '<b>RollTable</b>:'
    resultList += '<ul>';
    randomDevice.RollTable.RollTableRows.forEach(function(element) {
        resultList += '<li>' + element.Roll + ': ' + element.Result + '</li>';
    });
    resultList += '</ul>';
    return resultList;
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
