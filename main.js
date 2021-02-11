var botones = Array.from(document.querySelectorAll(".boton"));
var nombreUsuario = ["Cristian", "Manuel", "Roberto"];
//alert(nombreUsuario[1]);
var numeroTelefono = ["922926254", "954595476", "954121553"];
var celularN, configuracion;

var fondos = document.getElementsByClassName("cuerpo");
fondos[0].style.backgroundImage = "url('images/fondo2.jpeg')";
fondos[1].style.backgroundImage = "url('images/fondo1.jpeg')";
fondos[2].style.backgroundImage = "url('images/fondo3.jpeg')";

for (let i in botones) {
    document.getElementsByClassName("boton")[i].setAttribute("onclick", "clicM(" + i + ")");
}

function clicM(tipo) {

    var celular = tipo;
    var otraClase = "tipo" + tipo;

    var contenidoMensaje = document.getElementsByClassName("mensaje")[celular];
    var chat = document.getElementsByClassName("chat")[celular];

    var divMensaje = document.createElement("div");
    var divCabezaMensaje = document.createElement("div");
    var spanTelefono = document.createElement("span");
    var spanNombre = document.createElement("span");
    var elemento = document.createElement("p");

    var contenido = document.createTextNode(contenidoMensaje.value);

    divMensaje.setAttribute("class", "MensajePropio " + otraClase);

    //Me sirve para ubicar el primer mensaje y colocarlo despues dentro del chat
    var arribaDe = document.getElementsByClassName(otraClase)[0];

    //Ordenar y colocar los elementos donde correspondan
    spanTelefono.appendChild(document.createTextNode(numeroTelefono[celular]));
    spanNombre.appendChild(document.createTextNode(nombreUsuario[celular]));
    divCabezaMensaje.appendChild(spanTelefono);
    divCabezaMensaje.appendChild(spanNombre);

    spanTelefono.setAttribute("class", "spanNumeroTelefono" + celular);
    spanNombre.setAttribute("class", "spanNombreUsuario" + celular);

    elemento.appendChild(divCabezaMensaje);
    elemento.appendChild(contenido);
    divMensaje.appendChild(elemento);

    chat.insertBefore(divMensaje, arribaDe);

    mensajeAOtro(celular);

    contenidoMensaje.value = "";

    chat.scrollTop = chat.scrollHeight

    event.preventDefault();
}

function mensajeAOtro(celular) {

    for (let i in botones) {

        if (i != celular) {
            var divMensaje = document.createElement("div");
            var element = document.createElement("p");
            var divCabezaMensaje = document.createElement("div");
            var spanTelefono = document.createElement("span");
            var spanNombre = document.createElement("span");

            spanTelefono.setAttribute("class", "spanNumeroTelefono" + celular);
            spanNombre.setAttribute("class", "spanNombreUsuario" + celular);

            var otraClase = "tipo" + i;

            var chatLista = document.getElementsByClassName("chat")[i];
            divMensaje.setAttribute("class", "MensajeOtro " + otraClase);

            var arribaDe = document.getElementsByClassName(otraClase)[0];

            spanTelefono.appendChild(document.createTextNode(numeroTelefono[celular]));
            spanNombre.appendChild(document.createTextNode(nombreUsuario[celular]));
            divCabezaMensaje.appendChild(spanTelefono);
            divCabezaMensaje.appendChild(spanNombre);
            element.appendChild(divCabezaMensaje);
            element.appendChild(document.createTextNode(document.getElementsByClassName("mensaje")[celular].value));
            divMensaje.appendChild(element);

            chatLista.insertBefore(divMensaje, arribaDe);
        }
        event.preventDefault();
    }
}

function headerFormulario(placeHolderMensaje, celular) {
    var headerF = document.createElement("div");
    var regresar = document.createElement("a");
    var ingresarNuevoDato = document.createElement("input");
    var confirmar = document.createElement("a");

    ingresarNuevoDato.setAttribute("type", "'text'"),
    ingresarNuevoDato.setAttribute("placeholder", placeHolderMensaje),
    ingresarNuevoDato.setAttribute("class", "ingresoDato" + celular);

    headerF.setAttribute("class", "headerContenedor" + celular);
    regresar.setAttribute("class", "volverAtras");
    regresar.setAttribute("onclick", "funcionVolverAtras(" + celular + ")");
    confirmar.setAttribute("class", "confirmar");
    confirmar.setAttribute("onclick", "confirmacion(" + celularN + ", " + configuracion + ")");

    confirmar.appendChild(document.createTextNode("Confirmar"));
    regresar.appendChild(document.createTextNode("←"));

    headerF.appendChild(regresar);
    headerF.appendChild(ingresarNuevoDato);
    headerF.appendChild(confirmar);

    document.getElementsByClassName("cabeza")[celular].appendChild(headerF);

    document.getElementsByClassName("cabeza")[celular].style.overflow = "hidden";
}

function funcionVolverAtras(celular) {
    var padre = document.getElementsByClassName("cabeza")[celular];
    padre.removeChild(document.querySelectorAll(".headerContenedor" + celular)[0]);
    document.getElementsByClassName("cabeza")[celular].style.overflow = "visible";
}

function CambioInformacion(configuracionN) {

    var mensajeText = "";

    if (configuracionN == 1) {
        mensajeText = "Ingrese un nombre de grupo";
    } else if (configuracionN == 2) {
        mensajeText = "Ingrese un numero telefonico";
    } else if (configuracionN == 3) {
        mensajeText = "Ingrese un nombre de usuario";
    }

    configuracion = configuracionN;
    headerFormulario(mensajeText, celularN);
}

function confirmacion(celular, configuracion) {

    var datos = document.querySelector(".ingresoDato" + celular);

    if (configuracion == 1) {
        document.querySelectorAll(".tituloGrupo")[0].innerHTML = datos.value;
        document.querySelectorAll(".tituloGrupo")[1].innerHTML = datos.value;
        document.querySelectorAll(".tituloGrupo")[2].innerHTML = datos.value;
    } else if (configuracion == 2) {
        var mensajes = document.querySelectorAll(".spanNumeroTelefono" + celular);

        numeroTelefono[celular] = datos.value;

        for (var index = 0; index < mensajes.length; index++) {
            mensajes[index].innerHTML = datos.value;
        }

    } else if (configuracion == 3) {

        var mensajes = document.querySelectorAll(".spanNombreUsuario" + celular);

        nombreUsuario[celular] = datos.value;

        for (var index = 0; index < mensajes.length; index++) {
            mensajes[index].innerHTML = datos.value;
        }

    }

    funcionVolverAtras(celular);
}