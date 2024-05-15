const pathToCyphers = "Cyphers_Ru.json";
const pathToArtefacts = "Artefacts_Ru.json";
const pathToOddities = "Oddities_Ru.json";
const improvedEdge = 5;

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
    html += encloseDeviceProperty("НазваниеEng", randomDevice.Name);
    html += encloseDeviceProperty("Название", randomDevice.NameRu);

    let baseDiceResult = getRandomInt(6) + 1;
    let deviceLevel = getDeviceLevel(randomDevice.Level, baseDiceResult);
    html += encloseDeviceProperty("Уровень", `${deviceLevel} [${randomDevice.Level}]`);

    html += encloseDeviceProperty("Форма", randomDevice.Forms[getRandomInt(randomDevice.Forms.length)]);

    let parsedEffect = parseEffect(randomDevice.Effect, deviceLevel, baseDiceResult);
    html += encloseDeviceProperty("Эффект", parsedEffect);

    if (randomDevice.RollTable != null) {
        let rollTableRows = randomDevice.RollTable.RollTableRows;
        if (rollTableRows[rollTableRows.length - 1].Roll.includes("–00")) {
            html += encloseDeviceProperty("RollTable d100", getRandomInt(100) + 1);
        }
        html += makeRollTable(rollTableRows);
    }
    
    html += encloseDeviceProperty('Категории', randomDevice.Categories)
    html += encloseDeviceProperty("Источник", randomDevice.Source);
    html += "</div>";
    $("#generated-items").prepend(html);
}

function generateRandomArtefact() {
    let randomDevice = getRandomDevice(artefactsJson);

    let html = "<div class=\"device-block\">";
    html += encloseDeviceProperty("НазваниеEng", randomDevice.Name);
    html += encloseDeviceProperty("Название", randomDevice.NameRu);
    
    let baseDiceResult = getRandomInt(6) + 1;
    let deviceLevel = getDeviceLevel(randomDevice.Level, baseDiceResult);
    html += encloseDeviceProperty("Уровень", `${deviceLevel} [${randomDevice.Level}]`);
    html += encloseDeviceProperty("Форма", randomDevice.Form);

    let parsedEffect = parseEffect(randomDevice.Effect, deviceLevel, baseDiceResult);
    html += encloseDeviceProperty("Эффект", parsedEffect);
    
    if (randomDevice.RollTable != null)
        html += makeRollTable(randomDevice);

    html += encloseDeviceProperty("Истощение", randomDevice.Depletion);
    html += encloseDeviceProperty('Категории', randomDevice.Categories)
    html += encloseDeviceProperty("Источник", randomDevice.Source);
    html += "</div>";
    $("#generated-items").prepend(html);
}

function generateRandomOddity() {
    let randomDevice = getRandomDevice(odditiesJson);

    let html = "<div class=\"device-block\">";
    html += encloseDeviceProperty("Описание", randomDevice.Description);
    html += encloseDeviceProperty("Источник", randomDevice.Source);
    html += "</div>";
    $("#generated-items").prepend(html);
}

function getDeviceLevel(levelFormula, baseDiceResult) {
    if (levelFormula.indexOf("d") == -1)
        return levelFormula;
    let iteratorStart = 3;

    if (iteratorStart == levelFormula.length)
        return baseDiceResult;

    let termString = "";
    for(let i = iteratorStart; i < levelFormula.length; i++){
        if (levelFormula[i] == "+" || levelFormula[i] == " ")
            continue;
        else termString += levelFormula[i];
    }

    return baseDiceResult + Number(termString);
}

function parseEffect(effectString, deviceLevel, baseDiceResult) {
    effectString = effectString.replace("[DeviceLevel]", deviceLevel);

    let multiplyMatches = effectString.match(/\[DeviceLevel [x]+ \d+\]/g);
    if (multiplyMatches != null) {
        for (let i = 0; i < multiplyMatches.length; i++) {
            const element = multiplyMatches[i];
            let numberStr = element.substring(element.indexOf("x") + 1, element.length - 1);
            let result = Number(numberStr) * deviceLevel;
            effectString = effectString.replace(element, result);
        }
    }

    let divisionMatches = effectString.match(/\[DeviceLevel [\/]+ \d+\]/g);
    if (divisionMatches != null) {
        for (let i = 0; i < divisionMatches.length; i++) {
            const element = divisionMatches[i];
            let numberStr = element.substring(element.indexOf("/") + 1, element.length - 1);
            let result = deviceLevel / Number(numberStr);
            effectString = effectString.replace(element, Math.ceil(result));
        }
    }

    let enpoweredMatches = effectString.match(/{[^|]+\|[^}]+}/g);
    if (enpoweredMatches != null) {
        for (let i = 0; i < enpoweredMatches.length; i++) {
            const element = enpoweredMatches[i];
            let result = "";
            if (baseDiceResult < improvedEdge) {
                result = element.substring(1, element.indexOf("|"));
            }
            else {
                result = element.substring(element.indexOf("|") + 1, element.length - 1);
            }
            effectString = effectString.replace(element, result);
        }
    }

    return effectString;
}

function getRandomDevice(jsonData) {
    var index = getRandomInt(jsonData.length);
    return jsonData[index];
}

function encloseDeviceProperty(name, value) {
    if (value == null || value == "") return "";
    else return `<div><b>${name}:</b> ${value}</div>`;
}

function makeRollTable(rollTableRows) {
    let resultList = '<b>RollTable</b>:'
    resultList += '<ul>';
    rollTableRows.forEach(function(element) {
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
