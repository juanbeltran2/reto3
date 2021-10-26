/* Guardar Registro */
function registrarDescripcion(){
    let newCat = {
        name:$("#txtnameCat").val(),
        description:$("#txtDescriptionCat").val()
        };
      
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(newCat),
        
        url:"http://152.67.45.211:81/api/Category/save",
       
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
function detCategory(){    
    $.ajax({
        url:'http://152.67.45.211:81/api/Category/all',
        type: "GET",
        dataType: "json",
        success: function(respuesta){
            console.log(respuesta);
            
            $("#listado").empty();
            pintarListadoCategory(respuesta);         
        }
    });
}

function pintarListadoCategory(respuesta){
    let myTable=` <br>
                <table table-hover table-condensed table-bordered align="center">
                    <thead style="color:#fff;background-color:#337ab7;border-color:#2e6da4">
                        <tr align="center">
                            <th>ID</th>
                            <th>NOMBRE</th>
                            <th>DESCRIPCION</th>
                        </tr> </thead> `;      
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr align='center' style= 'border-color:#337ab7'> ";
        myTable +="<td>"+respuesta[i].id+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#listado").html(myTable);
}