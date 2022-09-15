document.addEventListener('DOMContentLoaded', function(){
    darkMode();
});

function darkMode(){
    //Toma el tema por defecto del sistema del usuario
    const preferDarkMode = window.matchMedia('(prefers-color-scheme: dark)'); 

    //Permite gregar o quitar la clse de dark-mode en scss segun el tema por defecto del sistema operativo del usuario
    if(preferDarkMode.matches){
        document.body.classList.add('dark-mode'); //Selecciona todo el documento y le agrega la clase
    }
    else{
        document.body.classList.remove('dark-mode'); //Remueve la clase de dark-mode
    }

    /* Este código me permite colocar el modo oscuro automaticamente si el usuario lo habilita
     en su computadora */
     preferDarkMode.addEventListener('change', function (){ //Esto automaticamente coloca el color predeterminado
        if (preferDarkMode.matches) {
            document.body.classList.add('dark-mode');
        }
        else{
            document.body.classList.remove('dark-mode');
        }
    });

    const botonDarkMode = document.querySelector(".btn-darkMode");
      //Agregando o quitando el modo oscuro
      botonDarkMode.addEventListener('click', function(){
        document.body.classList.toggle("dark-mode");
    });
}

'use strict'

// var btnAdd = document.getElementById('addPalabra');
// var btnNuevo = document.getElementById('nuevoJuego');
var resultado = document.querySelector(".resultado");
var intentosDiv = document.querySelector(".intentos");
var palabras = ['CONSOLA', 'PLATAFORMA', 'ALURA', 'JAVASCRIPT', 'HTML', 'CHALLENGE'];
var adivina = document.querySelector('.adivina');
var letras = document.querySelector('.letras')
var palabraAdivinar = [];

// var newWord = document.querySelector(".input-palabra").value;
var imagen = document.querySelector('.guillotina')
var malas = document.querySelector('.malas');
var palabraMostrar = [];
var entrada = document.querySelector('.entrada');

var juego = null; //Guardamos valor actual
var finalizado = false;
malas.innerHTML = '';

//Tomamos las letras que el usuario ingresa    
window.onkeyup = function adivinarLetra(evento){
    var btnNuevo = document.getElementById("btnNuevo");
    var letra = evento.key;
    letra = letra.toUpperCase();
    letra = entrada;
    if(/[^A-ZÑ]/.test(letra)){
        return;
    }
    adivinar(juego, letra);

    var estado = juego.estado;
    if(estado === 8 && !finalizado){ //Si completo la palabra y no se completo el muñeco muestra ganado
        // window.onkeypress == null;
        malas.innerHTML = `<h1 class="gana">¡Felicidades, ganaste!</h1>`;
        finalizado == true;

    }else if(estado === 1 && !finalizado){  //Si completo el muñeco antes de finalizar la palabra le muestra perdido
        let palabra = juego.palabra; //guarda la palabra mostrada
        malas.innerHTML = `<h1 class="mala">¡Fin del juego. Era ${palabra}!</h1>`;
        // alert('¡Oh no, perdiste!. La palabra era: ' + palabra)
        finalizado == true;
        
    }
    dibujar(juego);
}



//Obtejo para los elementos del html
var html = {
    hombre: document.getElementById('ahorcado'),
    adivina: document.querySelector('.adivina'),
    errado: document.querySelector('.errado')
}


function dibujar(juego){
    //imagen segun el estado del dibujo
    var elemento;
    elemento = html.hombre;
    var estado = juego.estado;
    if(estado === 8){
        estado = juego.previo; 
    }
        elemento.src = `public/img/0${estado}.png`; //Muestra la imagen

    // elemento = html.adivina;

    //Letras a adivinar
    let word = juego.palabra;
    var adivinado = juego.adivinado;
    elemento = html.adivina;

    elemento.innerHTML = ' ';
    for(let letra of word) {
        let span = document.createElement('span'); //
        span.classList.add('letra'); 

        let txt = document.createTextNode('');
        if(adivinado.has(letra)){ //Debemos colocar has cuando trabajamos con conjuntos (new Set())
            txt.nodeValue = letra;
        }
        span.setAttribute('class', 'letra adivinada'); //Le colocamos la clase para ser modificada
        span.appendChild(txt);
        elemento.appendChild(span); //Muestra las letras en la etiqueta span
    }

    //Mostramos las letras erradas
    var errado = juego.errado ;
    elemento = html.errado;
    elemento.innerHTML = ' '; //Eliminamos los datos
    for(let letra of errado){
        let span = document.createElement('span');
        let txt = document.createTextNode(letra);
        span.setAttribute('class', 'letra errada');
        span.appendChild(txt);
        elemento.appendChild(span);
    }
}


//Adivinar la palabra
function adivinar(juego, letra){
    var estado = juego.estado;
    //Si ya perdimos o ganamos no continua el juego
    if (estado === 1 || estado === 8){
        return;
    }

    var adivinado = juego.adivinado;
    var errado = juego.errado;
    //Al adivinar la letra o errarla, seguimos
    if(adivinado.has(letra) || errado.has(letra)){ //has letra
        return;
    }
    var palabra = juego.palabra;
    var letras = juego.letras;
    //Si la letra pertenece a la palabra
    if(letras.has(letra)){
         //Agregamos a la lista de letras adivinadas
        adivinado.add(letra);
        //Actualizamos las letras adivinadas
        juego.restante--;
        if(juego.restante === 0){

            juego.previo = juego.estado;
            juego.estado = 8;
        }
    }else{
        //Si a errado en una letra la agregamos al arreglo de letras malas y avanzamos en el dibujo del ahorcado
        juego.estado--; //Le disminuimos porque el valor lo empezamos en 7
        errado.add(letra);
    }
}



//funcion agregar nueva palabra
function agregarPalabra(){
        var newWord = document.querySelector(".input-palabra").value;
        const expres = /[\s\d.*+\-¿?^$@{}´\u00E0-\u00FC'()|[\]\\]/gu.test(newWord); //Expresion regular áéíóú-ÁÉÍÓÚ, quita acentos
    if(newWord.length > 8 || newWord == ''){
        alert("Ingrese una palabra sin acento y 8 letras maximo");
    }  
    else{ 
            if(expres == true){   
                    //Se añaden las letras validas
                    alert('Escriba una palabra válida o sin acentos');
    
            }else{
                    
                    //Quitamos el acento
                    var sinAcento = newWord.normalize("NFD").replace(/[\u0300-\u036f]/g, "") //Quita los acentos
                    location.href = "nuevoJuego.html"; //Redireccionamos
                    sessionStorage.setItem("palabra", sinAcento.toUpperCase()); //Guardamos la palabra con sessionStorage
            }
        }
    }

  var nuevaPalabra = sessionStorage.getItem("palabra"); //Llamamos el valor que contiene el key se sessionStorage
  //Removes el null del arreglo, para que no de error
    if(nuevaPalabra == null){
        sessionStorage.removeItem('palabra');
    }else{
        palabras.push(nuevaPalabra); //Agrega la palbra si no es null
    }  

//Elige una palabra aleatoria
function palabraAleatoria(){ 
    var aleatoria = (Math.floor(Math.random() * palabras.length));
    return palabras[aleatoria];
}

//Ejecuta la funcion que inicia el juego
function nuevoJuego(){
    entrada.value = '';
    malas.innerHTML = '';
    var palabra = palabraAleatoria();
    
    juego = {}; //Emepzamos como un objeto vacio
    juego.palabra = palabra; //Le asignamos el  valor de la palabra segun la palabra aleatoria
    juego.estado = 7; //Nuestro valor inicia en 7
    juego.adivinado = new Set(); //Crea un nuevo grupo para guardar las letras adivinadas
    juego.errado = new Set();//Crea un nuevo grupo para guardar las letras erradas
    finalizado = false; //El valor de finalizado inicia en false
    var letras = new Set();
    for(let letra of palabra){
        letras.add(letra);
    }
    juego.letras = letras;
    juego.restante = letras.size; //Toma el tamaño 
    dibujar(juego);
}
nuevoJuego();