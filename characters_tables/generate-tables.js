const pathToDescriptors = "descriptors.json";
const pathToFocuses = "focuses.json";

const descriptorsTableSelector = "#descriptors-table";
const focusesTableSelector = "#focuses-table";

let jsonArray;

$(document).ready(function () {
    if ($(descriptorsTableSelector).length) {
        loadTableDataJsonSync(pathToDescriptors);
        generateTableFromJSON(descriptorsTableSelector);
        setTableStylesForDescriptors();
    }

    if ($(focusesTableSelector).length) {
        loadTableDataJsonSync(pathToFocuses);
        generateTableFromJSON(focusesTableSelector);
        setTableStylesForFocuses();
    }
})

function loadTableDataJsonSync(pathToJSON) {
    $.get({
        url: pathToJSON,
        type: "get",
        async: false,
        dataType: 'json',
        success: function (data) {
            jsonArray = data;
        }
    });
}

// Main unified function for Descriptors, Focuses and Types abilities
function generateTableFromJSON(tableSelector) {
    var columns = addColumnHeadersFromFirstElement(jsonArray, tableSelector);
    for (var i = 0; i < jsonArray.length; i++) {
        addRowFromElement(tableSelector, jsonArray[i], columns);
    }
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

function addRowFromElement(tableSelector, elem, columns) {
    var row$ = $('<tr/>');

    for (var colIndex = 0; colIndex < columns.length; colIndex++) {
        var trValue = "";
        var curProp = elem[columns[colIndex]];

        if (curProp != null) {
            if (curProp.constructor === Array) {
                for (let i = 0; i < curProp.length; i++) {
                    if (i != 0) trValue += "<br><br>";
                    let curElem = curProp[i];
                    if (curElem.Name) {
                        trValue += "<b>" + curElem.Name;
                        if (curElem.Pool && curElem.Cost 
                            && curElem.Pool.length > 0 && curElem.Cost.length > 0) {
                            trValue += " (" + curElem.Cost + " " + curElem.Pool + " ";
                            if (curElem.Cost == "1")
                                trValue += "point";
                            else
                                trValue += "points";
                            trValue += ")";
                        }
                        trValue += ":</b> ";
                    }
                    trValue += curElem.Description;
                }
            } else {
                trValue = curProp;
            }
        }

        row$.append($('<td/>').html(trValue));
    }

    $(tableSelector).append(row$);
}

function setTableStylesForDescriptors() {
    setWidthForColumn('Flavor', 400);
    setWidthForColumn('Pools', 140);
    setWidthForColumn('Other', 300);
}

function setTableStylesForFocuses() {
    $(focusesTableSelector).attr("style", "min-width: 4500px");
    setWidthForColumn('Name', 100);
    setWidthForColumn('Source', 60);
    setWidthForColumn('Flavor', 400);
    setWidthForColumn('Connection', 300);
    setWidthForColumn('Additional', 400);
    setWidthForColumn('Minor-Major Effects', 400);
    setWidthForColumn('Tier 1', 400);
    setWidthForColumn('Tier 2', 400);
    setWidthForColumn('Tier 3 (choose one)', 400);
    setWidthForColumn('Tier 4', 400);
    setWidthForColumn('Tier 5', 400);
    setWidthForColumn('Tier 6 (choose one)', 400);
}

function setWidthForColumn(name, width) {
    $("th:contains('" + name + "')").attr("style", "width: " + width + "px");
}

//#region code from stackoverflow
// Builds the HTML Table out of any JSON with simple fields.
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
// Need to do union of keys from all records as some records may not contain all records.
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
//#endregion