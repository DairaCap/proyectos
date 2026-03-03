#include <stdio.h>

/*
 * @ Author: Daira Aimé Calzada Pérez
 * @ Date: 2026-02-26
 * @ Description: Función del Autómata que acepta sólo palabras con 
 * todas las bocales en el orden correcto. Usa una Matriz de Transición 
 * para un proceso mas cercano al funcionamiento. 
 */

int analizar_palabra(const char *palabra) {
    // 0:Inicio, 1:A, 2:E, 3:I, 4:O, 5:U(Final), 6:Error
    int tabla[7][5] = {
        {1, 6, 6, 6, 6}, // E0: Esperando 'a'
        {1, 2, 6, 6, 6}, // E1: Ya tiene 'a', espera 'e'
        {6, 2, 3, 6, 6}, // E2: Ya tiene 'e', espera 'i'
        {6, 6, 3, 4, 6}, // E3: Ya tiene 'i', espera 'o'
        {6, 6, 6, 4, 5}, // E4: Ya tiene 'o', espera 'u'
        {6, 6, 6, 6, 5}, // E5: ACEPTADO, permite más 'u'
        {6, 6, 6, 6, 6}  // E6: RECHAZADO
    };

    int estado = 0;
    int i = 0;

    while (palabra[i] != '\0' && palabra[i] != '\n') {
        char c = palabra[i];
        if (c >= 'A' && c <= 'Z') c += 32;

        int col = -1;
        if      (c == 'a') col = 0;
        else if (c == 'e') col = 1;
        else if (c == 'i') col = 2;
        else if (c == 'o') col = 3;
        else if (c == 'u') col = 4;

        if (col != -1) {
            estado = tabla[estado][col];
        }
        if (estado == 6) break;
        i++;
    }
    return (estado == 5);
}

int main() {
    char entrada[100];
    char opcion;

    do {
        printf("\n======================================\n");
        printf("   AUTOMATA ANALIZADOR DE PALABRAS\n");
        printf("======================================\n");
        printf("Escribe una palabra: ");
        
        // Capturar palabra
        if (fgets(entrada, sizeof(entrada), stdin)) {
            if (analizar_palabra(entrada)) {
                printf("\n>> RESULTADO: PALABRA ACEPTADA\n");
            } else {
                printf("\n>> RESULTADO: PALABRA RECHAZADA\n");
            }
        }

        // Preguntar si desea continuar
        printf("\n¿Quieres procesar otra palabra? (s/n): ");
        scanf(" %c", &opcion); // El espacio antes de %c limpia el salto de línea anterior
        
        // Limpiar el búfer de entrada para la próxima palabra
        while (getchar() != '\n'); 

    } while (opcion == 's' || opcion == 'S');

    printf("\nSaliendo del programa... ¡Hasta luego!\n");
    return 0;
}