//PREGUNTAS TOTALES DEL JUEGO//

const TOTAL_PREGUNTAS = 10;

//valirable encargada del conteo de respuestas acertadas

var cantidadAcertadas = 0;

//variable que controla la pregunta actual y esta imicia en -1 por que la primero inicia en 0

var numPreguntaActual = -1;

//para saber si la pregunta ya fue respondida 0 si 1 no
//para lo que uso este array con la cantidad de 0 segun
//la cantidad de de preguntas existentes

var estadoPreguntas= [0,0,0,0,0,0,0,0,0,0];

//BASE DE DATOS  DE PREGUNTAS
const  bd_juego = [
    {
        id: 'A',
        pregunta: "¿Método en JavaScript para mostrar un mensaje emergente en el navegador?",
        respuesta: "alert"
    },
    {
        id: 'B',
        pregunta: "¿Qué propiedad de CSS se usa para cambiar el color de fondo de un elemento?",
        respuesta: "background-color"
    },
    {
        id: 'C',
        pregunta: "¿Lenguaje utilizado para dar estilo a las páginas web?",
        respuesta: "css"
    },
    {
        id: 'D',
        pregunta: "¿Cómo se llama el método en JavaScript para eliminar un elemento de un array?",
        respuesta: "delete"
    },
    {
        id: 'E',
        pregunta: "¿Cómo se llama el evento en JavaScript que se activa cuando un usuario presiona una tecla en el teclado?",
        respuesta: "event"
    },
    {
        id: 'F',
        pregunta: "¿Qué propiedad de CSS se usa para definir el tamaño de la fuente?",
        respuesta: "font-size"
    },
    {
        id: 'G',
        pregunta: "¿Cómo se llama el método de JavaScript que se utiliza para obtener un elemento HTML por su ID?",
        respuesta:  "getelementbyid"
    },
    {
        id: 'H',
        pregunta:"Lenguaje de programacion usado para maquetacion de paginas web",
        respuesta: "html"
    },
    {
        id: 'I',
        pregunta: "¿Etiqueta HTML usada para insertar una imagen?",
        respuesta: "img"
    },
    {
        id: 'J',
        pregunta: "¿En qué lenguaje se puede usar la función 'getElementById'?",
        respuesta: "javascript"
    }
]
//CONTROL DEL TIEMPO//

const timer = document.getElementById("tiempo");

//TIEMPO DE JUEGO EN SEGUNDOS
const tiempo_del_juego = 60;
//VARIABLE DEL TIEMPO RESTANTE
let timeleft = tiempo_del_juego;
//VARIABLE CONTADOR DEL TIEMPO
var countdown;
//Letras de la A a la J aleatoriamente//

const container = document.querySelector(".container");
for (let i=1; i <= TOTAL_PREGUNTAS; i++) {
    const circle = document.createElement("div");
    circle.classList.add("circle");
    circle.textContent = String.fromCharCode(i + 96);
    circle.id = String.fromCharCode(i + 96).toUpperCase();
    container.appendChild(circle);

    const angle = ((i- 1) /  TOTAL_PREGUNTAS) * Math.PI * 2 - (Math.PI/2);
    const x = Math.round(95 + 120 * Math.cos(angle));
    const y = Math.round(95 + 120 * Math.sin(angle));
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
}

//COMENZAR//

var comenzar =  document.getElementById('comenzar');
comenzar.addEventListener("click", function(event ){
    document.getElementById("pantallainicial").style.display = "none";
    document.getElementById("pantallajuego").style.display = "block";

    //LARGAR TIEMPO//
    largarTiempo();
    //COLOCAR PREGUNTAS//
    cargarPregunta();
});

function largarTiempo(){
    countdown = setInterval(()=>{
        //resta de segundos al tiempo que resta
        timeleft--;
        //actualizacion del texto del cronometro con el tiempo que resta
        timer.innerText = timeleft;
        //si el tiempo llega a 0 detener el cronometro
        if(timeleft<0){
            clearInterval(countdown);
            mostrarPantallaFinal();
        }
    }, 1000);
}

//funcion de cargar las preguntas

function cargarPregunta(){
    numPreguntaActual++;
    //esto indica que ya no hay preguntas o mas bine si he llegado al final
    if(numPreguntaActual>=TOTAL_PREGUNTAS){
        numPreguntaActual = 0;
    }
    //control para saaber si todavia quedan preguntas por 
    //responder que si en el array hay una en 0
    if(estadoPreguntas.indexOf(0)>=0){
        //buscar que cual esta sin responder mirando el primer 0 del array
        while(estadoPreguntas[numPreguntaActual]==1){
            numPreguntaActual++;
            if(numPreguntaActual>=TOTAL_PREGUNTAS){
                numPreguntaActual = 0;
            }
        }
    

        //BUSQUEDA DE PREGUNTAS EN LA BASE DE DATOS
        document.getElementById("letrapregunta").textContent = bd_juego[numPreguntaActual].id;
        document.getElementById("pregunta").textContent = bd_juego[numPreguntaActual].pregunta;
        var letra = bd_juego[numPreguntaActual].id;
        document.getElementById(letra).classList.add("preguntaactual");
    }
    else{
        //esto pasa si se responden todas las preguntas
        clearInterval(countdown);
        mostrarPantallaFinal();
    }
}

//Evento de deteccion de repuestas y/o movimientos en el input
//y ver si lo ingresado es correcto o no

var respuesta = document.getElementById("respuesta");
respuesta.addEventListener("keyup", function(event){
//detecto si se presiona enter
if (event.keyCode === 13) {
    if (respuesta.value=="") {//si se presiona enter y esta vacio
        alert("Debes ingresar un valor");
        return;
    }

    //Obtener la repuesta

    var txtrespuesta = respuesta.value;
    controlarRespuesta(txtrespuesta.toLowerCase());
}
})
function controlarRespuesta(txtrespuesta){
    //Lo que debe sucedr si la respuesta es correcta
    if (txtrespuesta == bd_juego[numPreguntaActual].respuesta){
        //alert("Respuesta correcta")
        cantidadAcertadas++;

        //actualizo el estado de las preguntas actual a 1 y que  me indique
        //ya fue contestada
        estadoPreguntas[numPreguntaActual] = 1;

        var letra = bd_juego[numPreguntaActual].id;
        document.getElementById(letra).classList.remove("preguntaactual");
        document.getElementById(letra).classList.add("bienrespondida");
    }
    else{
        estadoPreguntas[numPreguntaActual] = 1;
        var letra = bd_juego[numPreguntaActual].id;
        document.getElementById(letra).classList.remove("preguntaactual");
        document.getElementById(letra).classList.add("malrespondida");
    }

    //limpio el input
    respuesta.value = "";
    //cargar la siguiente pregunta
    cargarPregunta();
}

//boton para pasar omitir la pregunta

var pasar  = document.getElementById("pasar");
pasar.addEventListener("click", function(event){
    var letra = bd_juego[numPreguntaActual].id;
    document.getElementById(letra).classList.remove("preguntaactual");

    //cargar la siguiente pregunta
    cargarPregunta();
})

function mostrarPantallaFinal() {
    document.getElementById("acertadas").textContent = cantidadAcertadas;
    document.getElementById("score").textContent = (cantidadAcertadas*100)/10 + "% de acierto";
    document.getElementById("pantallajuego").style.display = "none";
    document.getElementById("pantalla-final").style.display = "block";
}

//PARA RECOMENZAR

var recomenzar = document.getElementById("recomenzar");
recomenzar.addEventListener("click", function(event){
numPreguntaActual = -1;
timeleft = tiempo_del_juego;
timer.innerText = timeleft;
cantidadAcertadas = 0;
var estadoPreguntas= [0,0,0,0,0,0,0,0,0,0];

// quitar clases de los circulos

var circulos = document.getElementsByClassName("circle");
for (i=0; i<circulos.length;i++){
    circulos[i].classList.remove("preguntaactual");
    circulos[i].classList.remove("bienrespondida");
    circulos[i].classList.remove("malrespondida");
}

document.getElementById("pantalla-final").style.display = "none";
document.getElementById("pantallajuego").style.display = "block";
respuesta.value = "";


largarTiempo();
cargarPregunta();
})







