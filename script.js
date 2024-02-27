$(document).ready(function(){
    console.log("Hola");

    $(".card").click(function(){
        let nombre = $(this).find("h2").text();
        peticionesAsincrona(nombre);
    });
});

function peticionesAsincrona(nombre){
    $.ajax({
        method: "GET",
        url: `https://swapi.dev/api/people/?search=${nombre}&format=json`
    }).done(function (data) {
        console.log(data);
        if (data.results.length > 0) {
            let personaje = data.results[0];
            let nombreAPI = personaje.name;
            let altura = personaje.height;
            let masa = personaje.mass;
            let colorCabello = personaje.hair_color;
            let colorPiel = personaje.skin_color;
            let colorOjos = personaje.eye_color;
            let añoNacimiento = personaje.birth_year;
            let género = personaje.gender;


            let planetaURL = personaje.homeworld;

            $.ajax({
                method: "GET",
                url: planetaURL
            }).done(function (planeta) {
                let nombrePlaneta = planeta.name;

                $("h3").html(`
                    <strong>Planeta:</strong> ${nombrePlaneta}<br>
                    <strong>Nombre:</strong> ${nombreAPI}<br>
                    <strong>Altura:</strong> ${altura}<br>
                    <strong>Masa:</strong> ${masa}<br>
                    <strong>Color de cabello:</strong> ${colorCabello}<br>
                    <strong>Color de piel:</strong> ${colorPiel}<br>
                    <strong>Color de ojos:</strong> ${colorOjos}<br>
                    <strong>Año de nacimiento:</strong> ${añoNacimiento}<br>
                    <strong>Género:</strong> ${género}<br>
                `);
            }).fail(function () {
                alert("No se pudo obtener la información del planeta");
            });
        } else {
            $("h3").text("Personaje no encontrado");
        }
    }).fail(function () {
        alert("Algo salió mal al obtener la información del personaje");
    });
}
