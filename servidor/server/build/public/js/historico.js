//const pool = require('../../config/database');

    
$(document).ready(function () {
    var search = $("#autor").val();
    $('#buscar').on("click", function () {
        search = $("#autor").val();
        //$("#id2").text('Escoja una calificación para el libro de: '+"nuevooooooooo" );
        $.ajax({
            type: "get",
            url: "/libautor/"+search,
            dataType: "json",
            success: function (response) {
                $("#autorlib").text('Los Libros De: '+search );
                $("#id2").text("Escoja una calificación para el libro de "+search); 
                //$("#isbn").attr("id");
                 $("#resp").empty();
               $.each(response, function (indexInArray, valueOfElement) { 
                let tr = $("<tr></tr>")
                let ind = $("<td></td>").text(indexInArray+1);
                let autores = $("<td></td>").text(response[indexInArray].autores.replace("-",", "))
                let isbn =  $("<td></td>").text(response[indexInArray].isbn);                 
                let libro =  $("<td></td>").text(response[indexInArray].titulo);
                let calif = $("<td></td>").text(response[indexInArray].calificacion_promedio);
                let n = $("<td></td>");
                //let button= $("<button id='calificar' class='btn btn-info'  data-toggle='modal' data-target='#exampleModalCenter' >Calificar</button>");
                let bt=$("<button id='calif' class='btn btn-info' data-toggle='modal' data-target='#exampleModalCenter' >Calificar</button>")
                //let bt=$("<button id='score' class='btn btn-info'>Verificar</button>") 
                $("#calif").attr("id",response[indexInArray].isbn);

                n.append(bt);
                tr.append(ind)
                tr.append(libro);
                tr.append(autores);
                tr.append(isbn);
                tr.append(calif);
                tr.append(n);

                $("#resp").append(tr);
               });
               
                
            }
        });
    });
    


    /*
    $('#save').on("click", function () { 
   

        console.log(search);
        

    });*/
    

    
    $('#save').on("click", function() {
        alert("Calificación guardada correctamente");
        $("#exampleModalCenter").modal("toggle");
    });
    


    /*
    $("#calif").click(function(){
        //Ponemos la clase rojo
    });
    */

    /*
    $('.modal').on("click", function () {
        console.log(this.id);
        
    });*/



    $('#score').on("click", function () {
        search = $("#autor").val();
        //$("#id2").text('Escoja una calificación para el libro de: '+"nuevooooooooo" );
        console.log("Run");
    });


    $('body').on('click', '.btn-info', function(){
        //alert($(this).attr('id'))

        

        /*
        let id =$(this).attr("id");
        let user="Usuario 2";
        let a= {"usuario":user, "libro":id};
        let rows = pool.query("INSERT INTO calificacion SET ?",a);
        */
        console.log("ISBN del libro a calificar:",$(this).attr('id'));
        console.log("Nombre del autor",search);
      })




}); 