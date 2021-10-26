/* Guardar Registro */
function registrarClient(){
    let newCat = {
        name:$("#txtNameClient").val(),
        age:$("#txtAgeClient").val(),
        email:$("#txtEmailClient").val(),
        password:$("#txtPassClient").val()
        };
      //console.log(newCat)
        $.ajax({
        type:'POST',
        contentType: "application/json; charset=utf-8",
        dataType: 'JSON',
        data: JSON.stringify(newCat),
        
        url:"http://localhost:81/api/Client/save",
       
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
function detClient(){    
    $.ajax({
        url:'http://localhost:81/api/Client/all',
        type: "GET",
        dataType: "json",
        success: function(respuesta){
            console.log(respuesta);            
            $("#listado").empty();
            pintarListadoClient(respuesta);         
        }
    });
}

function pintarListadoClient(respuesta){
    let myTable=` <br>
                <table table-hover table-condensed table-bordered align="center">
                    <thead style="color:#fff;background-color:#337ab7;border-color:#2e6da4">
                        <tr align="center">
                            <th>ID</th>
                            <th>NAME</th>
                            <th>AGE</th>
                            <th>E-MAIL</th>
                            <th>PASSWORD</th>
                            <th colspan="2">ACCIONES</th>
                        </tr> </thead> `;      
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr align='center' style= 'border-color:#337ab7'> ";
        myTable +="<td>"+respuesta[i].idClient+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].age+"</td>";
        myTable+="<td>"+respuesta[i].email+"</td>";
        myTable+="<td>"+respuesta[i].password+"</td>";
        myTable += "<td><button onclick='eliminarClient("+respuesta[i].idClient+")'>Eliminar</button></td>";
        myTable += "<td><button onclick='UpClientEspecifico("+respuesta[i].idClient+")'>Actualizar</button></td>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#listado").html(myTable);
    $("#editClient").show();
    $("#editCategory").hide();
    $("#editFarm").hide();
    $("#editMessage").hide();
}

function eliminarClient(idF){
    let mydata={
        id:idF
    }
    let dataToSend = JSON.stringify(mydata);
    $.ajax({
        url:'http://localhost:81/api/Client/'+idF,
        type:"DELETE",
        data: dataToSend,
        contentType:"application/JSON",
        dataType:'json',
        success:function(respuesta){
            alert("Registro Eliminado con éxito!");
            detClient();
        }
    });
}

function UpClientEspecifico(idItem){   
    $.ajax({
        url:'http://localhost:81/api/Client/'+idItem,
        type: "GET",
        dataType: "json",
        success: function(respuesta){
            $("#txtidClientU").val(respuesta.idClient);
            $("#txtNameClientU").val(respuesta.name);
            $("#txtAgeClientU").val(respuesta.age);
            $("#txtEmailClientU").val(respuesta.email);
            $("#txtPassClientU").val(respuesta.password);
        }
    });
}

function actualizarClient(){
    let myData= {
        idClient: $("#txtidClientU").val(),
        name:$("#txtNameClientU").val(),
        age:$("#txtAgeClientU").val(),
        email:$("#txtEmailClientU").val(),
        password:$("#txtPassClientU").val()
    };
    
    let dataToSend = JSON.stringify(myData);

    $.ajax({
        url:'http://localhost:81/api/Client/update',
        type:"PUT",
        data: dataToSend,
        contentType:"application/JSON",
        //dataType:'json',
        success:function(respuesta){
            alert("Registro actualizado con éxito!");
            $("#txtidClientU").val("");
            $("#txtNameClientU").val("");
            $("#txtAgeClientU").val("");
            $("#txtEmailClientU").val("");
            $("#txtPassClientU").val("");                    
            detClient();
        },error: function (xhr, status) {
            alert("Error peticion PUT... " + status );
        }
    });
}