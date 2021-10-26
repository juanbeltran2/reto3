/* Guardar Registro */
function registrarMessage(){
    let newCat = {
        messageText:$("#txtmessage").val()
        };
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(newCat),
        
        url:"http://localhost:81/api/Message/save",
       
        success:function(response) {
                console.log(response);
            console.log("Se guardo correctamente");
            alert("Se guardo correctamente");
            window.location.reload()    
        },        
        error: function(jqXHR, textStatus, errorThrown) {
                window.location.reload()
            alert("No se guardo correctamente");  
        }
        });
}

/* Mostrar los detalles  */
function detMensaje(){    
    $.ajax({
        url:'http://localhost:81/api/Message/all',
        type: "GET",
        dataType: "json",
        success: function(respuesta){
            console.log(respuesta);            
            $("#listado").empty();
            pintarListadoMessage(respuesta);         
        }
    });
}

function pintarListadoMessage(respuesta){
    let myTable=` <br>
                <table table-hover table-condensed table-bordered align="center">
                    <thead style="color:#fff;background-color:#337ab7;border-color:#2e6da4">
                        <tr align="center">
                            <th>ID</th>
                            <th>MENSAJE</th>     
                            <th colspan="2">ACCIONES</th>                       
                        </tr> </thead> `;      
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr align='center' style= 'border-color:#337ab7'> ";
        myTable +="<td>"+respuesta[i].idMessage+"</td>";
        myTable+="<td>"+respuesta[i].messageText+"</td>";
        myTable += "<td><button onclick='eliminarMessage("+respuesta[i].idMessage+")'>Eliminar</button></td>";
        myTable += "<td><button onclick='UpMessageEspecifico("+respuesta[i].idMessage+")'>Actualizar</button></td>";       
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#listado").html(myTable);
    $("#editMessage").show();
    $("#editClient").hide();
    $("#editCategory").hide();
    $("#editFarm").hide();
}

function eliminarMessage(idF){
    let mydata={
        id:idF
    }
    let dataToSend = JSON.stringify(mydata);
    $.ajax({
        url:'http://localhost:81/api/Message/'+idF,
        type:"DELETE",
        data: dataToSend,
        contentType:"application/JSON",
        dataType:'json',
        success:function(respuesta){
            alert("Registro Eliminado con éxito!");
            detMensaje();
        }
    });
}

function UpMessageEspecifico(idItem){   
    $.ajax({
        url:'http://localhost:81/api/Message/'+idItem,
        type: "GET",
        dataType: "json",
        success: function(respuesta){
            $("#txtidMessageU").val(respuesta.idMessage);
            $("#txtmessageU").val(respuesta.messageText);           
        }
    });
}

function actualizarMessage(){
    let myData= {
        idMessage: $("#txtidMessageU").val(),
        messageText:$("#txtmessageU").val()
    };
    
    let dataToSend = JSON.stringify(myData);

    $.ajax({
        url:'http://localhost:81/api/Message/update',
        type:"PUT",
        data: dataToSend,
        contentType:"application/JSON",
        //dataType:'json',
        success:function(respuesta){
            alert("Registro actualizado con éxito!");
            $("#txtidMessageU").val("");
            $("#txtmessageU").val("");                              
            detMensaje();
        },error: function (xhr, status) {
            alert("Error peticion PUT... " + status );
        }
    });
}