/**
 * MÓDULO MATEMÁTICO EN ESPAÑOL
 * Reducido. Contiene solo funciones útiles de números aleatorios.
 */
export class Matematica {

    /**Retorna un número aleatorio entre dos números.*/
    static aleatorio(min: number, max: number): number {
        let rango: number = max - min;
        return (Math.random() * rango) + min;
    }


    /**Retorna un número aleatorio entero entre dos números, ambos incluídos.*/
    static aleatorioEntero(min: number, max: number): number {
        let rango: number = 1 + max - min;
        return Math.trunc((Math.random() * rango) + min);
    }

    static compararNumeros(numeroUno: number, numeroDos: number, epsilon: number = Number.EPSILON): boolean {
        return (Math.abs(numeroUno - numeroDos) < epsilon)
    }
}
