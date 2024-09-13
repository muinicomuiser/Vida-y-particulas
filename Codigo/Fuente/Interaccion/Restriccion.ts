import { Cuerpo } from "../Fisicas/Cuerpo.js";
import { Vector } from "../GeometriaPlana/Vector.js";

export class Restriccion{
    static limitarVelocidad(cuerpo: Cuerpo, limite: number): Vector{
        let magnitudVel: number = cuerpo.velocidad.magnitud;
        if(magnitudVel > limite){  
            let velNormalizado: Vector = Vector.normalizar(cuerpo.velocidad)
            return Vector.escalar(velNormalizado, limite);
        }
        return cuerpo.velocidad;
    }

    /**Retorna un vector de aceleracion escalado de tal manera que al sumarlo a la velocidad del cuerpo, la magnitud 
     * de la velocidad no supere el límite ingresado.*/
    static limitarAceleracionSegunVelocidad(cuerpo: Cuerpo, limiteVelocidad: number): Vector{
        let magnitudVelocidad: number = cuerpo.velocidad.magnitud;
        let magnitudAceleracion: number = cuerpo.aceleracion.magnitud;
        if(magnitudAceleracion != 0 && magnitudVelocidad != 0){
            if(magnitudVelocidad + magnitudAceleracion > limiteVelocidad){  
                let razonAceleracion: number = magnitudAceleracion/(magnitudAceleracion + magnitudVelocidad);
                let aceleracionNormalizada: Vector = Vector.normalizar(cuerpo.aceleracion)
                let aceleracionEscalada: Vector = Vector.escalar(aceleracionNormalizada, razonAceleracion*limiteVelocidad)
                return aceleracionEscalada;
            }            
        }
        return cuerpo.aceleracion;
    }
}