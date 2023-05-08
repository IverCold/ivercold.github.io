const pathToAbilities_Glaive = "types_abilities_glaive.json";

const tableSelectorGlaive = "#glaive-table";

let jsonObject;

$(document).ready(function () {
    if ($(tableSelectorGlaive).length) {
        loadTableDataJsonSync(pathToAbilities_Glaive);
        generateTableFromJSON(tableSelectorGlaive);
        setTableStyles(tableSelectorGlaive); // identical for all ability tables
    }
})

function loadTableDataJsonSync(pathToJSON) {
    $.get({
        url: pathToJSON,
        type: "get",
        async: false,
        dataType: 'json',
        success: function (data) {
            jsonObject = data;
        }
    });
}

// Main unified function for Descriptors, Focuses and Types abilities
function generateTableFromJSON(tableSelector) {
    addColumnHeadersFromFirstElement(jsonObject, tableSelector);

    // max table height without auto row
    let maxOptionsHeight = 0;
    for (let key in jsonObject) {
        if (jsonObject[key].option.length > maxOptionsHeight)
            maxOptionsHeight = jsonObject[key].option.length;
    }

    for (let i = 0; i < maxOptionsHeight + 1; i++) {
        var row$ = $('<tr/>');
        // add auto options to the row
        if (i == 0) {
            row$.append($('<td/>').html('auto'));
            for (let key in jsonObject) {
                trAutoValue = "";
                let arrayAuto = jsonObject[key].auto;
                let trValue = addCellOfAbilities(arrayAuto, row$);
                row$.append($('<td/>').html(trValue));
            }
        }
        // add single element of options array to the row
        if (i != 0) {
            row$.append($('<td/>').html('option'));
            for (let key in jsonObject) {
                if (jsonObject[key].option[i - 1] != null) {
                    let trValue = getSingleAbility(jsonObject[key].option[i - 1]);
                    row$.append($('<td/>').html(trValue));
                }
                else
                    row$.append('<td/>');
            }
        }
        $(tableSelector).append(row$);
    }
}

// Add a header to the table and return the set of columns.
// Uses only the first row for keys.
function addColumnHeadersFromFirstElement(jsonObject, tableSelector) {
    var columnSet = [];
    var headerTr$ = $('<tr/>');

    columnSet.push("Type");
    headerTr$.append($('<th/>').html("Type"));

    for (var key in jsonObject) {
        columnSet.push(key);
        headerTr$.append($('<th/>').html(key));
    }

    $(tableSelector).append(headerTr$);

    return columnSet;
}

function addCellOfAbilities(arrayOfAbilities) {
    let trValue = "";
    for (let i = 0; i < arrayOfAbilities.length; i++) {
        if (i != 0) trValue += "<br><br>";
        let curElem = arrayOfAbilities[i];
        trValue += getSingleAbility(curElem);
    }
    return trValue;
}

function getSingleAbility(curElem) {
    let singleAbility = "";
    if (curElem.Name) {
        singleAbility += "<b>" + curElem.Name;
        if (curElem.Pool && curElem.Cost
            && curElem.Pool.length > 0 && curElem.Cost.length > 0) {
            singleAbility += " (" + curElem.Cost + " " + curElem.Pool + " ";
            if (curElem.Cost == "1")
                singleAbility += "point";
            else
                singleAbility += "points";
            singleAbility += ")";
        }
        singleAbility += ":</b> ";
    }
    singleAbility += curElem.Description;
    return singleAbility;
}

function setTableStyles(tableSelector) {
    $(tableSelector).attr("style", "min-width: 3500px");
    setWidthForColumn('Type', 60);
    setWidthForColumn('Tier 1', 500);
    setWidthForColumn('Tier 2', 400);
    setWidthForColumn('Tier 3', 400);
    setWidthForColumn('Tier 4', 400);
    setWidthForColumn('Tier 5', 400);
    setWidthForColumn('Tier 6', 400);
}

function setWidthForColumn(name, width) {
    $("th:contains('" + name + "')").attr("style", "width: " + width + "px");
}
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