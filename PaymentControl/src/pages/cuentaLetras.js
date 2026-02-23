/*
* Autor: Daira Calzada Pérez
* Fecha: 2026-02-17
* Descripciónn: Función para contar letras en un texto, ignorando mayúsculas, acentos y espacios. Devuelve una lista de sub-listas con el formato: [letra, cantidad].
*/


function cuentaLetras(texto) {
    let resultado = [];

    // Definimos las equivalencias

    const origen = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZÁÉÍÓÚÜáéíóúü";
    const destino = "abcdefghijklmnñopqrstuvwxyzaeiouuaeiouu";

    for (let i = 0; i < texto.length; i++) {
        let caracter = texto[i];

        // Normalizamos
        for (let j = 0; j < origen.length; j++) {
            if (caracter === origen[j]) {
                caracter = destino[j];
                break; // Ya lo encontramos, no hace falta seguir buscando en la tabla
            }
        }

        //Ignorar espacios en blanco
        if (caracter === " ") {
            continue;
        }

        // Contamos los resultados
        let encontrado = false;
        for (let k = 0; k < resultado.length; k++) {
            if (resultado[k][0] === caracter) {
                resultado[k][1]++;
                encontrado = true;
                break;
            }
        }

        //Si no existe en 'resultado', lo agregamos como nueva sub-lista
        if (!encontrado) {
            resultado.push([caracter, 1]);
        }
    }

    return resultado;
}

// Ejemplo de prueba con mayúsculas acentuadas
const miTexto = "Últimamente Árbol Órgano";
console.log(cuentaLetras(miTexto));