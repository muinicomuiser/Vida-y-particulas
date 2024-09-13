import { Cuerpo } from "./Cuerpo.js";
import { Vector } from "../GeometriaPlana/Vector.js";
import { Geometria } from "../Utiles/Geometria.js";

//Momento lineal, movimiento acelerado, momento angular, energía cinética y potencial.

export class Cinematica {

    /**Retorna un vector velocidad de un cuerpo que colisiona con una superficie.*/
    static reboteSimple(cuerpo: Cuerpo, normal: Vector): Vector {
        let vectorRebotado: Vector = cuerpo.velocidad;
        if (Vector.anguloVectores(vectorRebotado, normal) > Geometria.PI_MEDIO) {
            vectorRebotado = Vector.invertir(vectorRebotado);
        }
        return Vector.rotar(vectorRebotado, (Vector.angulo(normal) - Vector.angulo(vectorRebotado)) * 2)
    }


    /**Retorna en un arreglo las velocidades finales después de un choque elástico entre dos cuerpos.*/
    static reboteElastico(cuerpoUno: Cuerpo, cuerpoDos: Cuerpo): Vector[] {
        return [Cinematica.velocidadUnoFinal(cuerpoUno, cuerpoDos), Cinematica.velocidadDosFinal(cuerpoUno, cuerpoDos)]
    }

    private static velocidadUnoFinal(cuerpoUno: Cuerpo, cuerpoDos: Cuerpo): Vector {
        const velUnoInicial: Vector = cuerpoUno.velocidad;
        const divisionMasas: number = (2 * cuerpoDos.masa) / (cuerpoUno.masa + cuerpoDos.masa);
        const restaVelocidades: Vector = Vector.resta(cuerpoDos.velocidad, cuerpoUno.velocidad);
        const restaPosiciones: Vector = Vector.resta(cuerpoDos.posicion, cuerpoUno.posicion);
        const puntoVelocidadesPosiciones: number = Vector.punto(restaVelocidades, restaPosiciones);
        const moduloPosicionesCuadrado: number = restaPosiciones.magnitud ** 2;
        const velUnoFinal: Vector = Vector.suma(velUnoInicial, Vector.escalar(restaPosiciones, divisionMasas * puntoVelocidadesPosiciones / moduloPosicionesCuadrado));
        return velUnoFinal;
    }

    private static velocidadDosFinal(cuerpoUno: Cuerpo, cuerpoDos: Cuerpo): Vector {
        const velDosInicial: Vector = cuerpoDos.velocidad;
        const divisionMasas: number = (2 * cuerpoUno.masa) / (cuerpoUno.masa + cuerpoDos.masa);
        const restaVelocidades: Vector = Vector.resta(cuerpoUno.velocidad, cuerpoDos.velocidad);
        const restaPosiciones: Vector = Vector.resta(cuerpoUno.posicion, cuerpoDos.posicion);
        const puntoVelocidadesPosiciones: number = Vector.punto(restaVelocidades, restaPosiciones);
        const moduloPosicionesCuadrado: number = restaPosiciones.magnitud ** 2;
        const velDosFinal: Vector = Vector.suma(velDosInicial, Vector.escalar(restaPosiciones, divisionMasas * puntoVelocidadesPosiciones / moduloPosicionesCuadrado));
        return velDosFinal;
    }
}