$(document).ready(function () {
    
    $('#buscar').on("click", function () {
        let search = $("#autor").val();
        $.ajax({
            type: "get",
            url: "/libautor/"+search,
            dataType: "json",
            success: function (response) {
                $("#autorlib").text('Los Libros De: '+search );
                
                 $("#resp").empty();
               $.each(response, function (indexInArray, valueOfElement) { 
                let tr = $("<tr></tr>")
                let ind = $("<td></td>").text(indexInArray+1);
                let autores = $("<td></td>").text(response[indexInArray].autores.replace("-",", "))
                let libro =  $("<td></td>").text(response[indexInArray].titulo);
                let calif = $("<td></td>").text(response[indexInArray].calificacion_promedio);
                tr.append(ind)
                tr.append(libro);
                tr.append(autores);
                tr.append(calif);
                $("#resp").append(tr);
               });
               
                
            }
        });
    });
    
});