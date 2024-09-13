/**
        =============================================
                * MÓDULO DE TRANSFORMACIONES *
        =============================================
        Trabaja sobre conjuntos de vectores.

        Almacena las transformaciones como atributos.

        Siempre retorna copias nuevas de los conjuntos de vectores ingresados.

 */

import { Vector } from "./Vector.js";

/**Aplica transformaciones de escala, rotación y desplazamiento sobre arreglos de vectores.        
 * Siempre retorna copias nuevas de los arreglos.       
 * Almacena en sus atributos los valores de las transformaciones que aplica.
 */
export class Transformacion {
    escala: number;
    rotacion: number;
    posicion: Vector;
    constructor(x: number = 0, y: number = 0, rotacion: number = 0, escala: number = 1) {
        this.escala = escala;
        this.rotacion = rotacion;
        this.posicion = Vector.crear(x, y);
    }

    /**Retorna el arreglo de vectores resultante de aplicar las transformaciones de escala, rotación y desplazamiento
     * sobre un arreglo de vectores de entrada.     
     * Permite aumentar puntualmente la rotación en un ángulo específico sin modificar la propiedad de rotación de la transformación.*/
    transformarConjuntoVectores(vectores: Vector[]): Vector[] {
        let vectoresTransformados: Vector[] = Vector.clonarConjunto(vectores);
        vectoresTransformados = this.aplicarEscalaVectores(vectoresTransformados);
        vectoresTransformados = this.aplicarRotacionVectores(vectoresTransformados);
        vectoresTransformados = this.aplicarDesplazamientoVectores(vectoresTransformados);
        return vectoresTransformados;
    }

    /**Escala cada uno de los vectores del arreglo ingresado y los retorna en un arreglo nuevo.*/
    aplicarEscalaVectores(vectores: Vector[]): Vector[] {
        let vectoresEscalados: Vector[] = [];
        for (let vector of vectores) {
            let vectorEscalado: Vector = Vector.escalar(vector, this.escala);
            vectoresEscalados.push(vectorEscalado);
        }
        return vectoresEscalados;
    }

    /**Desplaza cada uno de los vectores del arreglo ingresado y los retorna en un arreglo nuevo.*/
    aplicarDesplazamientoVectores(vectores: Vector[]): Vector[] {
        let vectoresDesplazados: Vector[] = [];
        for (let vector of vectores) {
            let x: number = vector.x + this.posicion.x;
            let y: number = vector.y + this.posicion.y;
            vectoresDesplazados.push(Vector.crear(x, y));
        }
        return vectoresDesplazados;
    }

    /**Rota cada uno de los vectores del arreglo ingresado según el ángulo de rotación almacenado y los retorna en un arreglo nuevo.   
    */
    aplicarRotacionVectores(vectores: Vector[]): Vector[] {
        let vectoresRotados: Vector[] = [];
        for (let vector of vectores) {
            let x: number = vector.x * Math.cos(this.rotacion) - vector.y * Math.sin(this.rotacion);
            let y: number = vector.x * Math.sin(this.rotacion) + vector.y * Math.cos(this.rotacion);
            vectoresRotados.push(Vector.crear(x, y));
        }
        return vectoresRotados;
    }

    /**Rota cada uno de los vectores de un arreglo según el ángulo ingresado y los retorna en un arreglo nuevo.   
    */
    static rotarVectores(vectores: Vector[], angulo: number): Vector[] {
        let vectoresRotados: Vector[] = [];
        for (let vector of vectores) {
            let x: number = vector.x * Math.cos(angulo) - vector.y * Math.sin(angulo);
            let y: number = vector.x * Math.sin(angulo) + vector.y * Math.cos(angulo);
            vectoresRotados.push(Vector.crear(x, y));
        }
        return vectoresRotados;
    }

    /**Retorna una copia de la transformación.*/
    clonarTransformación(): Transformacion {
        return new Transformacion(this.posicion.x, this.posicion.y, this.rotacion, this.escala)
    }
}