const pathToOddities = "Oddities_Official_Books.xml";
const pathToCyphers = "Cyphers_Official_Books.xml";
const pathToArtefacts = "Artefacts_Official_Books.xml";

let odditiesXml;

$(document).ready(function () {
    loadDevicesXmlSync(pathToOddities, loadOdditiesXml);

    $("#generate_oddity").click(function () {
        generateRandomOddity();
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

function generateRandomOddity() {
    var randomDevice = getRandomDevice(odditiesXml, 'Oddity');

    var html = "";
    var description = randomDevice.find('Description').html();
    var source = randomDevice.find('Source').text();
    html += "<label>Description: " + description + "</label><br>";
    html += "<label>Source: " + source + "<label><br>";
    $("#oddity_description").html(html);

}

function getRandomDevice(xmlData, deviceTypeName) {
    var count = $(xmlData).find(deviceTypeName).length;
    var index = getRandomInt(count);

    var randomDevice = $(xmlData).find(deviceTypeName).eq(index);
    return randomDevice;
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