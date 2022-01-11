$(document).ready(function () {
    //$('#generate_creature_form input').on('change', function() {
        //alert($('input[name=radioName]:checked', '#myForm').val()+ " dfg "); 
        //alert($("#generate_creature_form input[type='radio']:checked").val())
     //});


     $("#generate_creature_button").click(function () {
        generateRandomCreature();
    });

    $("#generate_encounter_button").click(function () {
        generateRandomEncounter();
    });
});

function generateRandomCreature(){
    let selected = $("#generate_creature_form input[type='radio']:checked").val();
    if (selected != null)
        alert(selected)
}

function generateRandomEncounter(){
    let selected = $("#generate_encounter_form input[type='radio']:checked").val();
    if (selected != null)
        alert(selected)
}