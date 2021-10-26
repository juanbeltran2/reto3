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
        
        url:"http://152.67.45.211:81/api/Message/save",
       
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
        url:'http://152.67.45.211:81/api/Message/all',
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
                        </tr> </thead> `;      
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr align='center' style= 'border-color:#337ab7'> ";
        myTable +="<td>"+respuesta[i].idMessage+"</td>";
        myTable+="<td>"+respuesta[i].messageText+"</td>";
       
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#listado").html(myTable);
}