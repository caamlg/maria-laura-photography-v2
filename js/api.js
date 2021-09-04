$(() => {
     let mailUsuario = 'test';

    $('#btnEnviar').on('click', (e) => {
        e.preventDefault();
        let error = "";
        $('#incompleto').css("visibility", "hidden");
        $('#mailError').css("visibility", "hidden");
        if ($('#mailContacto').val() === "") {
            $('#incompleto').css("visibility", "visible");
            error = "error";
        }
        else {
            mailUsuario = $('#mailContacto').val()
            let URLGET = {
                "url": "https://api.eva.pingutil.com/email?email=" + mailUsuario,
                "method": "GET",
                "timeout": 0,
            };
            $.ajax(URLGET).done(function (response) {
                console.log(response);
                if (response.data.deliverable === false) {
                    $('#mailError').css("visibility", "visible");
                    error = "mail";
                }
            });
        }
        if (($('#nombreContacto').val() === "" || $('#telefonoContacto').val() === "" || !$('#aceptarCompartir').is(':checked')) && error === "") {
            $('#incompleto').css("visibility", "visible");
            error = "error";
        }
    });
});