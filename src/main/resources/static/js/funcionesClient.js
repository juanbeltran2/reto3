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
        
        url:"http://152.67.45.211:81/api/Client/save",
       
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
        url:'http://152.67.45.211:81/api/Client/all',
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
                        </tr> </thead> `;      
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr align='center' style= 'border-color:#337ab7'> ";
        myTable +="<td>"+respuesta[i].idClient+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].age+"</td>";
        myTable+="<td>"+respuesta[i].email+"</td>";
        myTable+="<td>"+respuesta[i].password+"</td>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#listado").html(myTable);
}