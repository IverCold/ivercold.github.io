const pathToDescriptors = "descriptors.json";
const pathToFocuses = "focuses.json";

let descriptorsJson;
let focusesJson;

$(document).ready(function () {
    if ($("#descriptors-table")) {
        loadTableDataJsonSync(pathToDescriptors, loadDescriptorsJson);
        //buildHtmlTable("#descriptors-table");
        generateDescriptorsTableFromJSON();
    }

    if ($("#focuses-table")) {
        loadTableDataJsonSync(pathToFocuses, loadFocusesJson);
        generateFocusesTableFromJSON();
    }
})

//#region Data loading functions
function loadTableDataJsonSync(pathToJSON, loadingFunction) {
    $.get({
        url: pathToJSON,
        type: "get",
        async: false,
        dataType: 'json',
        success: function (data) {
            loadingFunction(data);
        }
    });
}

function loadDescriptorsJson(jsonData) {
    descriptorsJson = jsonData;
}

function loadFocusesJson(jsonData) {
    focusesJson = jsonData;
}
//#endregion

function generateDescriptorsTableFromJSON() {
    var tableSelector = "#descriptors-table";

    var columns = addColumnHeadersFromFirstElement(descriptorsJson, tableSelector);
    //addDescriptorsHeaders(tableSelector);
    $("th:contains('Flavor')").attr("style", "width: 400px");
    $("th:contains('Pools')").attr("style", "width: 140px");
    $("th:contains('Other')").attr("style", "width: 300px");

    for (var i = 0; i < descriptorsJson.length; i++) {
        // addDescriptorRowFromElement(tableSelector, descriptorsJson[i]);
        addFocusRowFromElement(tableSelector, descriptorsJson[i], columns);
    }
}

function addDescriptorsHeaders(tableSelector) {
    var headerTr$ = $('<tr/>');

    headerTr$.append($('<th/>').html("Name"));
    headerTr$.append($('<th/>').html("Source"));

    var flavorElem = $('<th/>');
    flavorElem.html("Flavor");
    flavorElem.attr("style", "width: 400px");
    headerTr$.append(flavorElem);
    // headerTr$.append($('<th/>').html("Flavor"));

    headerTr$.append($('<th/>').html("Pools"));
    headerTr$.append($('<th/>').html("Skills"));
    headerTr$.append($('<th/>').html("Inabilities"));
    headerTr$.append($('<th/>').html("Other"));
    headerTr$.append($('<th/>').html("Additional Equipment"));

    $(tableSelector).append(headerTr$);
}

function addDescriptorRowFromElement(tableSelector, elem) {
    var row$ = $('<tr/>');
    row$.append($('<td/>').html(elem.Name));
    row$.append($('<td/>').html(elem.Source));
    row$.append($('<td/>').html(elem.Flavor));

    let poolsTr = "";
    for (let i = 0; i < elem.Pools.length; i++) {
        if (i != 0) poolsTr += "<br><br>";
        poolsTr += "<b>" + elem.Pools[i].Name + ":</b> ";
        poolsTr += elem.Pools[i].Value;
    }
    row$.append($('<td/>').html(poolsTr));

    let skillsTr = "";
    for (let i = 0; i < elem.Skills.length; i++) {
        if (i != 0) skillsTr += "<br><br>";
        skillsTr += "<b>Skill:</b> ";  //"<b>" + elem.Skills[i].Name + ":</b> ";
        skillsTr += elem.Skills[i];
    }
    row$.append($('<td/>').html(skillsTr));

    row$.append($('<td/>').html("Inabilities"));
    row$.append($('<td/>').html("Other"));
    row$.append($('<td/>').html(elem.AdditionalEquipment));

    $(tableSelector).append(row$);
}

// Builds the HTML Table out of any JSON.
function buildHtmlTable(tableSelector) {
    var columns = addAllColumnHeaders(descriptorsJson, tableSelector);

    for (var i = 0; i < descriptorsJson.length; i++) {
        var row$ = $('<tr/>');
        for (var colIndex = 0; colIndex < columns.length; colIndex++) {
            var cellValue = descriptorsJson[i][columns[colIndex]];
            if (cellValue == null) cellValue = "";
            row$.append($('<td/>').html(cellValue));
        }
        $(tableSelector).append(row$);
    }
}

// Adds a header row to the table and returns the set of columns.
// Need to do union of keys from all records as some records may not contain
// all records.
function addAllColumnHeaders(jsonArray, tableSelector) {
    var columnSet = [];
    var headerTr$ = $('<tr/>');

    for (var i = 0; i < jsonArray.length; i++) {
        var singleRow = jsonArray[i];
        for (var key in singleRow) {
            if ($.inArray(key, columnSet) == -1) {
                columnSet.push(key);
                headerTr$.append($('<th/>').html(key));
            }
        }
    }
    $(tableSelector).append(headerTr$);

    return columnSet;
}

// Add a header to the table and return the set of columns.
// Uses only the first row for keys.
function addColumnHeadersFromFirstElement(jsonArray, tableSelector) {
    var columnSet = [];
    var headerTr$ = $('<tr/>');

    var firstRow = jsonArray[0];
    for (var key in firstRow) {
        columnSet.push(key);
        headerTr$.append($('<th/>').html(key));
    }

    $(tableSelector).append(headerTr$);

    return columnSet;
}

function generateFocusesTableFromJSON() {
    var tableSelector = "#focuses-table";

    var columns = addColumnHeadersFromFirstElement(focusesJson, tableSelector);
    $(tableSelector).attr("style", "min-width: 4500px");
    /*$("th:contains('Flavor')").attr("style", "width: 400px");
    $("th:contains('Pools')").attr("style", "width: 140px");
    $("th:contains('Other')").attr("style", "width: 300px");*/

    for (var i = 0; i < focusesJson.length; i++) {
        addFocusRowFromElement(tableSelector, focusesJson[i], columns);
    }
}

function addFocusRowFromElement(tableSelector, elem, columns) {
    var row$ = $('<tr/>');

    for (var colIndex = 0; colIndex < columns.length; colIndex++) {
        var trValue = "";
        var curProp = elem[columns[colIndex]];

        if (curProp != null) {
            if (curProp.constructor === Array) {
                for (let i = 0; i < curProp.length; i++) {
                    if (i != 0) trValue += "<br><br>";
                    if (curProp[i].Name) {
                        trValue += "<b>" + curProp[i].Name;
                        if (curProp[i].Pool && curProp[i].Cost) {
                            trValue += " (" + curProp[i].Cost + " " + curProp[i].Pool + " ";
                            if (curProp[i].Cost == "1")
                                trValue += "point";
                            else
                                trValue += "points";
                            trValue += ")";
                        }
                        trValue += ":</b> ";
                    }
                    trValue += curProp[i].Description;
                }
            } else {
                trValue = curProp;
            }
        }

        row$.append($('<td/>').html(trValue));
    }

    $(tableSelector).append(row$);
}