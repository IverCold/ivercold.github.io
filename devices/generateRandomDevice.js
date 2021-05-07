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

    let html = "";
    html += encloseDeviceProperty(randomDevice, 'Name');
    html += encloseDeviceProperty(randomDevice, 'Level');
    
    html += encloseDeviceProperty(randomDevice, 'Usable');
    html += encloseDeviceProperty(randomDevice, 'Wearable');
    html += encloseDeviceProperty(randomDevice, 'Internal');
    
    html += encloseDeviceProperty(randomDevice, 'Effect');
    html += encloseDeviceProperty(randomDevice, 'RollTable');
    html += encloseDeviceProperty(randomDevice, 'Source');
    $("#cypher_description").html(html);
}

function generateRandomArtefact() {
    let randomDevice = getRandomDevice(artefactsXml, 'Artefact');

    let html = "";
    html += encloseDeviceProperty(randomDevice, 'Name');
    html += encloseDeviceProperty(randomDevice, 'Level');   
    html += encloseDeviceProperty(randomDevice, 'Form');
    
    html += encloseDeviceProperty(randomDevice, 'Effect');
    html += encloseDeviceProperty(randomDevice, 'RollTable');
    html += encloseDeviceProperty(randomDevice, 'Depletion');
    html += encloseDeviceProperty(randomDevice, 'Source');
    $("#artefact_description").html(html);
}

function generateRandomOddity() {
    let randomDevice = getRandomDevice(odditiesXml, 'Oddity');

    let html = "";
    html += encloseDeviceProperty(randomDevice, 'Description');
    html += encloseDeviceProperty(randomDevice, 'Source');
    $("#oddity_description").html(html);
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