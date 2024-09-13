//REPENSAR ESTA CLASE


import { Cuerpo } from "./Cuerpo.js";
import { Forma } from "../GeometriaPlana/Formas.js";
import { Vector } from "../GeometriaPlana/Vector.js";
import { Interaccion } from "../Interaccion/Interaccion.js";

export class Contenedor {
    cuerpo: Cuerpo;
    cuerposContenidos: Cuerpo[] = []
    constructor(cuerpo: Cuerpo) {
        this.cuerpo = cuerpo;
        this.cuerpo.fijo = true;
    }

    get normales(): Vector[] {
        return Vector.clonarConjunto(this.cuerpo.normales)
    }

    static crearContenedor(cuerpo: Cuerpo): Contenedor {
        return new Contenedor(cuerpo);
    }

    /**Agrega cuerpos al conjunto de cuerpos que estarán dentro del contenedor.*/
    agregarCuerposContenidos(...cuerpos: Cuerpo[]) {
        this.cuerposContenidos.push(...cuerpos)
    }

    rebotarConBorde() {
        Interaccion.reboteCircunferenciasConEntorno(this.cuerposContenidos, this.cuerpo)
    }

    mover(): void {
        this.cuerpo.mover()
    }
}