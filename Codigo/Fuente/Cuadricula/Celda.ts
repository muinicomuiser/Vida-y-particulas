import { Dibujante } from "../Renderizado/Dibujante.js";
import { Vector } from "../GeometriaPlana/Vector.js";

export class Celda {
    posicion: Vector;
    tamano: number;
    color: string;
    estado: number;
    distanciaVecindad: number = 1;
    posicionVecinos: Vector[] = []  //Podría ser un arreglo de tuplas [vector vecino, distancia];

    constructor(posicionX: number, posicionY: number, tamano: number, estado: number = 1, color: string = '') {
        this.posicion = Vector.crear(posicionX, posicionY);
        this.tamano = tamano;
        this.color = color;
        this.estado = estado;
    }

    get x(): number {
        return this.posicion.x;
    }
    get y(): number {
        return this.posicion.y;
    }

    /**Retorna un vector con el área de las casillar que comprenden la vecindad de Moore de la celda, según su distancia de vecindad.       
     * Ejemplo: el vector (-1, 1) representa a todas las cuadrículas en las posiciones entre (x-1, y-1) y (x+1, y+1) con respecto a la celda.
    */
    get vecindad(): Vector {
        return Vector.crear(-this.distanciaVecindad, this.distanciaVecindad)
    }

    rellenar(dibujante: Dibujante): void {
        dibujante.rellenarCelda(this);
    }
}

// Distancia. Métrica máxima. Distancia vecindad
// En matemáticas, la distancia de Chebyshov (o métrica máxima, o métrica L∞) es una métrica1​ definida en un espacio
// vectorial donde la distancia entre dos puntos (representados por sus vectores) es la mayor de sus diferencias a lo
// largo de cualquiera de sus dimensiones coordenadas.

// Número de celdas de la vecindad de Moore
// (2r + 1)2 - 1
// Siendo r la distancia métrica.