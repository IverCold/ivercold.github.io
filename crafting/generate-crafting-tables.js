const pathToCraftingJson = "crafting_objects.json";

const craftingCostsTableSelector = "#crafting-costs-table";
const craftingSpecTableSelector = "#crafting-specs-table";

let jsonArray;

$(document).ready(function () {
    if ($(craftingCostsTableSelector).length) {
        loadTableDataJsonSync(pathToCraftingJson);
        generateCostsTableFromJSON();
    }
    if ($(craftingSpecTableSelector).length) {
        loadTableDataJsonSync(pathToCraftingJson);
        generateSpecificationsTableFromJSON();
        setTableStylesForSpecs();
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

function generateCostsTableFromJSON() {
    addHeaderRowForCostsTable();
    for (var i = 0; i < jsonArray.length; i++) {
        addCostsRowFromElement(jsonArray[i]);
    }
}

function addHeaderRowForCostsTable() {
    var headerTr$ = $('<tr/>');
    headerTr$.append($('<th/>').html("Kind"));
    headerTr$.append($('<th/>').html("Name"));
    headerTr$.append($('<th/>').html("Min Crafting Lvl"));
    headerTr$.append($('<th/>').html("Parts"));
    headerTr$.append($('<th/>').html("1 Io"));
    headerTr$.append($('<th/>').html("2 Responsive Synth"));
    headerTr$.append($('<th/>').html("3 Apt Clay"));
    headerTr$.append($('<th/>').html("4 Pliable Metal"));
    headerTr$.append($('<th/>').html("5 Mimetic Gel"));
    headerTr$.append($('<th/>').html("6 Amber Crystal"));
    headerTr$.append($('<th/>').html("7 Psiranium"));
    headerTr$.append($('<th/>').html("8 Oraculum"));
    headerTr$.append($('<th/>').html("9 Tamed Iron"));
    headerTr$.append($('<th/>').html("10 Cosmic Foam"));
    $(craftingCostsTableSelector).append(headerTr$);
}

function addCostsRowFromElement(elem) {
    var row$ = $('<tr/>');
    row$.append($('<td/>').html(elem.Kind));
    var nameCell$ = $('<td/>');
    nameCell$.attr('id', GetLowerCaseId(elem.Name));
    nameCell$.html(`<a href=\"crafting_specs_table.html#${GetLowerCaseId(elem.Name)}" target="_blank">${elem.Name}</a>`);
    row$.append(nameCell$);
    row$.append($('<td/>').html(elem.MinCraftingLevel));
    row$.append($('<td/>').html(elem.Parts));
    row$.append($('<td/>').html(GetIotumValue(elem.Iotum.Io)));
    row$.append($('<td/>').html(GetIotumValue(elem.Iotum['Responsive Synth'])));
    row$.append($('<td/>').html(GetIotumValue(elem.Iotum['Apt Clay'])));
    row$.append($('<td/>').html(GetIotumValue(elem.Iotum["Pliable Metal"])));
    row$.append($('<td/>').html(GetIotumValue(elem.Iotum["Mimetic Gel"])));
    row$.append($('<td/>').html(GetIotumValue(elem.Iotum["Amber Crystal"])));
    row$.append($('<td/>').html(GetIotumValue(elem.Iotum["Psiranium"])));
    row$.append($('<td/>').html(GetIotumValue(elem.Iotum["Oraculum"])));
    row$.append($('<td/>').html(GetIotumValue(elem.Iotum["Tamed Iron"])));
    row$.append($('<td/>').html(GetIotumValue(elem.Iotum["Cosmic Foam"])));
    $(craftingCostsTableSelector).append(row$);
}

function GetIotumValue(value) {
    if (value == '0') return '';
    else return value;
}

function generateSpecificationsTableFromJSON() {
    addHeaderRowForSpecsTable();
    for (var i = 0; i < jsonArray.length; i++) {
        addSpecsRowFromElement(jsonArray[i]);
    }
}

function addHeaderRowForSpecsTable() {
    var headerTr$ = $('<tr/>');
    headerTr$.append($('<th/>').html("Kind"));
    headerTr$.append($('<th/>').html("Name"));
    headerTr$.append($('<th/>').html("Specifications"));
    headerTr$.append($('<th/>').html("Modifications"));
    headerTr$.append($('<th/>').html("Depletion"));
    $(craftingSpecTableSelector).append(headerTr$);
}

function addSpecsRowFromElement(elem) {
    var row$ = $('<tr/>');
    row$.append($('<td/>').html(elem.Kind));
    var nameCell$ = $('<td/>');
    nameCell$.attr('id', GetLowerCaseId(elem.Name));
    nameCell$.html(`<a href=\"crafting_costs_table.html#${GetLowerCaseId(elem.Name)}" target="_blank">${elem.Name}</a>`);
    row$.append(nameCell$);
    row$.append($('<td/>').html(elem.Specifications));
    row$.append($('<td/>').html(elem.Modifications));
    row$.append($('<td/>').html(elem.Depletion));
    $(craftingSpecTableSelector).append(row$);
}

function setTableStylesForSpecs() {
    setWidthForColumn('Specifications', '900');
    setWidthForColumn('Modifications', '300');
}

function setWidthForColumn(name, width) {
    $("th:contains('" + name + "')").attr("style", "width: " + width + "px");
}


function GetLowerCaseId(name){
    return name.toLowerCase().replace(' ','-');
}