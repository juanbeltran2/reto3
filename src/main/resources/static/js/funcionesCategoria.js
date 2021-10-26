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
        
        url:"http://localhost:81/api/Category/save",
       
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
        url:'http://localhost:81/api/Category/all',
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
                            <th colspan="2">ACCIONES</th>
                        </tr> </thead> `;      
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr align='center' style= 'border-color:#337ab7'> ";
        myTable +="<td>"+respuesta[i].id+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable += "<td><button onclick='eliminarCategory("+respuesta[i].id+")'>Eliminar</button></td>";
        myTable += "<td><button onclick='UpCategoryEspefifica("+respuesta[i].id+")'>Actualizar</button></td>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#listado").html(myTable);
    $("#editCategory").show();
    $("#editFarm").hide();
    $("#editClient").hide();
    $("#editMessage").hide();
}

function eliminarCategory(idF){
    let mydata={
        id:idF
    }
    let dataToSend = JSON.stringify(mydata);
    $.ajax({
        url:'http://localhost:81/api/Category/'+idF,
        type:"DELETE",
        data: dataToSend,
        contentType:"application/JSON",
        dataType:'json',
        success:function(respuesta){
            alert("Registro Eliminado con éxito!");
            detCategory();
        }
    });
}

function UpCategoryEspefifica(idItem){   
    $.ajax({
        url:'http://localhost:81/api/Category/'+idItem,
        type: "GET",
        dataType: "json",
        success: function(respuesta){
            $("#txtidFincaU").val(respuesta.id);
            $("#txtnameCatU").val(respuesta.name);
            $("#txtDescriptionCatU").val(respuesta.description);
        }
    });
}

function actualizarCat(){
    let myData= {
        id: $("#txtidFincaU").val(),
        name:$("#txtnameCatU").val(),
        description:$("#txtDescriptionCatU").val()
    };
    
    let dataToSend = JSON.stringify(myData);

    $.ajax({
        url:'http://localhost:81/api/Category/update',
        type:"PUT",
        data: dataToSend,
        contentType:"application/JSON",
        //dataType:'json',
        success:function(respuesta){
            alert("Registro actualizado con éxito!");
            $("#txtidFincaU").val("");
            $("#txtnameCatU").val("");                       
            detCategory();
        },error: function (xhr, status) {
            alert("Error peticion PUT... " + status );
        }
    });
}