/*
* Autor: Daira Calzada Pérez
* Fecha: 2026-02-17
* Descripciónn: Función para contar palabras en una lista de textos, ignorando mayúsculas, acentos y signos de puntuación. Devuelve una lista de sub-listas con el formato: [palabra, cantidad].
*/

function cuentaPalabras(listaDeTextos) {
    let resultado = [];

    // Tablas de normalización 
    const origen = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZÁÉÍÓÚÜáéíóúü";
    const destino = "abcdefghijklmnñopqrstuvwxyzaeiouuaeiouu";

    // Definimos qué caracteres NO son letras 
    const ignorar = ",.!¡¿?_";

    for (let t = 0; t < listaDeTextos.length; t++) {
        let texto = listaDeTextos[t];
        let palabraActual = "";

        for (let i = 0; i <= texto.length; i++) {
            let caracter = texto[i];

            //Normalización del carácter (si existe)
            let caracterLimpio = "";
            if (i < texto.length) {
                let esSigno = false;
                for (let s = 0; s < ignorar.length; s++) {
                    if (caracter === ignorar[s]) { esSigno = true; break; }
                }

                if (!esSigno) {
                    caracterLimpio = caracter;
                    for (let j = 0; j < origen.length; j++) {
                        if (caracter === origen[j]) {
                            caracterLimpio = destino[j];
                            break;
                        }
                    }
                }
            }

            // Si el carácter es un espacio o llegamos al final del string, procesamos la palabra
            if (caracterLimpio === " " || i === texto.length) {
                if (palabraActual !== "") {

                    // Buscar si la palabra ya está en el resultado
                    let encontrada = false;
                    for (let k = 0; k < resultado.length; k++) {
                        if (resultado[k][0] === palabraActual) {
                            resultado[k][1]++;
                            encontrada = true;
                            break;
                        }
                    }

                    //Si es nueva, agregarla
                    if (!encontrada) {
                        resultado.push([palabraActual, 1]);
                    }

                    palabraActual = ""; // siguiente palabra
                }
            } else if (caracterLimpio !== "") {
                // Vamos construyendo la palabra letra por letra
                palabraActual += caracterLimpio;
            }
        }
    }

    return resultado;
}

// Ejemplo de uso
const lista = [
    'Hola, cómo estás!',
    'gana dinero, gana desde casa.',
    'Hola, ¿puedes llamar a casa ahora?',
    'Hola, ¿te puedo llamar mañana a casa?'
];

console.log(cuentaPalabras(lista));