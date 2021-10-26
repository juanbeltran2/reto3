$(document).ready(function(){

    $("#show1").on('click', function() {
        $("#creacionCategoria").show();
        $("#creacionFinca").hide();
        $("#creacionCliente").hide();
        $("#creacionMessage").hide();
        $("#creacionReservation").hide();
        return false;
        });

    $("#show2").on('click', function() {
        $("#creacionFinca").show();
        $("#creacionCategoria").hide();
        $("#creacionCliente").hide();
        $("#creacionMessage").hide();
        $("#creacionReservation").hide();
        return false;
        });

    $("#show3").on('click', function() {
        $("#creacionCliente").show();
        $("#creacionFinca").hide();
        $("#creacionCategoria").hide();
        $("#creacionMessage").hide();
        $("#creacionReservation").hide();
        return false;
        });

    $("#show4").on('click', function() {
        $("#creacionMessage").show();
        $("#creacionCliente").hide();
        $("#creacionFinca").hide();
        $("#creacionCategoria").hide();
        $("#creacionReservation").hide();
        return false;
        });

    $("#show5").on('click', function() {
        $("#creacionReservation").show();
        $("#creacionMessage").hide();
        $("#creacionCliente").hide();
        $("#creacionFinca").hide();
        $("#creacionCategoria").hide();
        return false;
        });

});