/* Guardar Registro */
function registrarFarm(){
    let newCat = {
        address:$("#txtAddressFarm").val(),
        extension:$("#txtExtensionFarm").val(),
        name:$("#txtNameFarm").val(),
        description:$("#txtDescriptionFarm").val()
        };
      console.log(newCat)
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(newCat),
        
        url:"http://localhost:81/api/Farm/save",
       
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
function detFinca(){    
    $.ajax({
        url:'http://localhost:81/api/Farm/all',
        type: "GET",
        dataType: "json",
        success: function(respuesta){
            console.log(respuesta);            
            $("#listado").empty();
            pintarListadoFinca(respuesta);         
        }
    });
}

function pintarListadoFinca(respuesta){
    let myTable=` <br>
                <table table-hover table-condensed table-bordered align="center">
                    <thead style="color:#fff;background-color:#337ab7;border-color:#2e6da4">
                        <tr align="center">
                            <th>ID</th>
                            <th>NOMBRE</th>
                            <th>ADDRESS</th>
                            <th>EXTENSION</th>
                            <th>DESCRIPTION</th>
                            <th colspan="2">ACCIONES</th>
                        </tr> </thead> `;      
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr align='center' style= 'border-color:#337ab7'> ";
        myTable +="<td>"+respuesta[i].id+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].address+"</td>";
        myTable+="<td>"+respuesta[i].extension+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable += "<td><button onclick='eliminarFarm("+respuesta[i].id+")'>Eliminar</button></td>";
        myTable += "<td><button onclick='UpFarmEspefifica("+respuesta[i].id+")'>Actualizar</button></td>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#listado").html(myTable);
    $("#editFarm").show();
    $("#editCategory").hide();
    $("#editClient").hide();
    $("#editMessage").hide();
}

function eliminarFarm(idF){
    let mydata={
        id:idF
    }
    let dataToSend = JSON.stringify(mydata);
    $.ajax({
        url:'http://localhost:81/api/Farm/'+idF,
        type:"DELETE",
        data: dataToSend,
        contentType:"application/JSON",
        dataType:'json',
        success:function(respuesta){
            alert("Registro Eliminado con éxito!");
            detFinca();
        }
    });
}

function UpFarmEspefifica(idItem){   
    $.ajax({
        url:'http://localhost:81/api/Farm/'+idItem,
        type: "GET",
        dataType: "json",
        success: function(respuesta){
            $("#txtidFarmU").val(respuesta.id);
            $("#txtExtensionFarmU").val(respuesta.extension);
            $("#txtNameFarmU").val(respuesta.name);
            $("#txtDescriptionFarmU").val(respuesta.description);
            $("#txtAddressFarmU").val(respuesta.address);
        }
    });
}

function actualizarFarm(){
    let myData= {
        id: $("#txtidFarmU").val(),
        extension:$("#txtExtensionFarmU").val(),
        name:$("#txtNameFarmU").val(),
        description:$("#txtDescriptionFarmU").val(),
        address:$("#txtAddressFarmU").val()
    };
    
    let dataToSend = JSON.stringify(myData);

    $.ajax({
        url:'http://localhost:81/api/Farm/update',
        type:"PUT",
        data: dataToSend,
        contentType:"application/JSON",
        //dataType:'json',
        success:function(respuesta){
            alert("Registro actualizado con éxito!");
            $("#txtidFarmU").val("");
            $("#txtExtensionFarmU").val("");
            $("#txtNameFarmU").val("");
            $("#txtDescriptionFarmU").val("");
            $("#txtAddressFarmU").val("");                     
            detFinca();
        },error: function (xhr, status) {
            alert("Error peticion PUT... " + status );
        }
    });
}