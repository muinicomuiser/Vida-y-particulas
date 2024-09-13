import { Temporizador } from "./Temporizador.js";

export class Tiempo {
    private tiempoInicial?: number;
    private tiempoActual?: number;
    private temporizadores: Temporizador[] = []

    constructor() { }

    /**Retorna el número de temporizadores activos.*/
    get numeroTemporizadores(): number {
        return this.temporizadores.length;
    }

    /**Ejecuta una función un número determinado de veces por segundo.*/
    iterarPorSegundo(funcion: () => void, numeroIteraciones: number): void {
        const periodo: number = 1000 / numeroIteraciones;
        if (!this.tiempoInicial) {
            this.tiempoInicial = Date.now();
        }
        this.tiempoActual = Date.now();
        if (this.tiempoActual - this.tiempoInicial >= periodo) {
            funcion();
            this.tiempoInicial = this.tiempoActual;
        }
    }

    /**Crea un termporizador nuevo con la duración ingresada y lo agrega a la lista de temporizadores de la composición.*/
    crearTemporizador(tiempoMilisegundos: number): Temporizador {
        const temporizador: Temporizador = new Temporizador(tiempoMilisegundos)
        this.temporizadores.push(temporizador);
        return temporizador
    }

    /**Elimina del registro de temporizadores aquellos que estén inactivos.*/
    actualizarTemporizadores(): void {
        let indiceInactivo: number = this.temporizadores.findIndex((temporizador) => temporizador.activo == false)
        if (indiceInactivo != -1) {
            this.temporizadores.splice(indiceInactivo, 1);
        }
    }

}