const pathToOddities = "Oddities_Official_Books.xml";
const pathToCyphers = "Cyphers_Official_Books.xml";
const pathToArtefacts = "Artefacts_Official_Books.xml";

let odditiesXml;
let cyphersXml;
let artefactsXml;



$(document).ready(function () {
    loadDevicesXmlSync(pathToOddities, loadOdditiesXml);
    loadDevicesXmlSync(pathToCyphers, loadCyphersXml);
    loadDevicesXmlSync(pathToArtefacts, loadArtefactsXml);

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
function loadDevicesXmlSync(pathToXML, loadingFunction) {
    $.get({
        url: pathToXML,
        type: "get",
        async: false,
        dataType: 'xml',
        success: function (data) {
            loadingFunction(data);
        }
    });
}



function loadOdditiesXml(xmlData) {
    odditiesXml = xmlData;
}

function loadCyphersXml(xmlData) {
    cyphersXml = xmlData;
}

function loadArtefactsXml(xmlData) {
    artefactsXml = xmlData;
}



function generateRandomCypher() {
    let randomDevice = getRandomDevice(cyphersXml, 'Cypher');

    let html = "<div class=\"device-block\">";
    html += encloseDeviceProperty(randomDevice, 'Name');
    html += combineLevelProperty(randomDevice);

    html += encloseDeviceProperty(randomDevice, 'Usable');
    html += encloseDeviceProperty(randomDevice, 'Wearable');
    html += encloseDeviceProperty(randomDevice, 'Internal');

    html += encloseDeviceProperty(randomDevice, 'Effect');
    if (randomDevice.find('RollTable').length)
        html += makeRollTable(randomDevice);
    
        html += encloseDeviceProperty(randomDevice, 'Source');
    html += "</div>";
    $("#generated-items").prepend(html);
}

function generateRandomArtefact() {
    let randomDevice = getRandomDevice(artefactsXml, 'Artefact');

    let html = "<div class=\"device-block\">";
    html += encloseDeviceProperty(randomDevice, 'Name');
    html += encloseDeviceProperty(randomDevice, 'Form');
    html += combineLevelProperty(randomDevice);

    html += encloseDeviceProperty(randomDevice, 'Effect');
    if (randomDevice.find('RollTable').length)
        html += makeRollTable(randomDevice);

    html += encloseDeviceProperty(randomDevice, 'Depletion');
    html += encloseDeviceProperty(randomDevice, 'Source');
    html += "</div>";
    $("#generated-items").prepend(html);
}

function generateRandomOddity() {
    let randomDevice = getRandomDevice(odditiesXml, 'Oddity');

    let html = "<div class=\"device-block\">";
    html += encloseDeviceProperty(randomDevice, 'Description');
    html += encloseDeviceProperty(randomDevice, 'Source');
    html += "</div>";
    $("#generated-items").prepend(html);
}

function combineLevelProperty(randomDevice){
    let levelFormula = randomDevice.find('Level').text();

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

function getRandomDevice(xmlData, deviceTypeName) {
    var count = $(xmlData).find(deviceTypeName).length;
    var index = getRandomInt(count);

    var randomDevice = $(xmlData).find(deviceTypeName).eq(index);
    return randomDevice;
}

function encloseDeviceProperty(deviceXml, propertyName) {
    let text = deviceXml.find(propertyName).text();
    let result = `<div><b>${propertyName}:</b> ${text}</div>`;
    return result;
}

function makeRollTable(xmlElement) {
    let resultList = '<b>RollTable</b>:'
    resultList += '<ul>';
    xmlElement.find('RollTable').find('Row').each(function () {
        resultList += '<li>' + $(this).find('Roll').text() + ': ' + $(this).find('Result').text() + '</li>';
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
