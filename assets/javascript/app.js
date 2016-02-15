$(document).ready(function() {
    $('ul.regions').hide();

    $('.open-regions').click(function() {
        $('ul.regions').fadeToggle();

        var text = $(this).val();
        $(this).val(text == "Prikaži regije" ? "Zapri regije" : "Prikaži regije");
    });
});