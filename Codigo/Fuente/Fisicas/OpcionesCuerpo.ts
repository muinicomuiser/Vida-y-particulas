import { OpcionesForma } from "../GeometriaPlana/OpcionesForma.js";
import { Vector } from "../GeometriaPlana/Vector.js";

export interface OpcionesCuerpo extends OpcionesForma {

    /**Determina si el cuerpo rotará ajustándose al ángulo del vector velocidad.*/
    rotarSegunVelocidad?: boolean,
    /**Determina si el cuerpo permanecerá o no estático al colisionar con otro cuerpo.*/
    fijo?: boolean,
    /**El valor de la masa del cuerpo.*/
    masa?: number,
    /**El valor de la densidad del cuerpo.*/
    densidad?: number,
    /**Si el cuerpo se verá afectado por eventos de teclado o mouse.*/
    controlable?: boolean,

}