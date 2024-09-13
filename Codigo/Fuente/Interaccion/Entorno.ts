
//Fricción, bordes, gravedad

import { Contenedor } from "../Fisicas/Contenedor.js";
import { Cuerpo } from "../Fisicas/Cuerpo.js";
import { Vector } from "../GeometriaPlana/Vector.js";
import { Interaccion } from "./Interaccion.js";

export class Entorno extends Contenedor {
    private canvas: HTMLCanvasElement;
    private alto: number;
    private ancho: number;
    constructor(canvas: HTMLCanvasElement, cuerpo: Cuerpo) {
        super(cuerpo)
        this.canvas = canvas;
        this.alto = this.canvas.height;
        this.ancho = this.canvas.width;
        this.cuerpo.fijo = true;
    }

    get normales(): Vector[] {
        return Vector.clonarConjunto(this.cuerpo.normales)
    }

    /**Crea un entorno con un cuerpo del tamaño del canvas.         
     * Un entorno funciona como un cuerpo contenedor.
     */
    static crearEntornoCanvas(canvas: HTMLCanvasElement): Entorno {
        let cuerpoEntorno = Cuerpo.poligonoSegunVertices([Vector.crear(canvas.width, canvas.height), Vector.crear(0, canvas.height), Vector.crear(0, 0), Vector.crear(canvas.width, 0)]);
        return new Entorno(canvas, cuerpoEntorno)
    }

    /**Mueve un vector que ha excedido las coordenadas de alguno de los bordes al borde opuesto.        
     * Convierte al entorno en un entorno infinito.
    */
    envolverBorde(vector: Vector): Vector {
        let x: number = vector.x;
        let y: number = vector.y;
        if (x > this.ancho) {
            x -= this.ancho
        }
        if (x < 0) {
            x += this.ancho
        }
        if (y > this.alto) {
            y -= this.alto
        }
        if (y < 0) {
            y += this.alto
        }
        return Vector.crear(x, y)
    }

    colisionConBorde(...cuerpos: Cuerpo[]): Cuerpo[] {
        return Interaccion.reboteCircunferenciasConEntorno(cuerpos, this.cuerpo)
    }
}