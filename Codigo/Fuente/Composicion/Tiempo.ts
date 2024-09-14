import { Temporizador } from "./Temporizador.js";

export class Tiempo {
    private _tiempoInicial: number = Date.now();
    private tiempoActual?: number;
    private tiempoPrevio?: number;
    private temporizadores: Temporizador[] = []

    constructor() { }

    /**Retorna el número de temporizadores activos.*/
    get numeroTemporizadores(): number {
        return this.temporizadores.length;
    }

    /**Retorna el momento en milisegundos de la instanciación de este objeto.*/
    get tiempoInicial(): number {
        return this._tiempoInicial;
    }

    /**Retorna el tiempo en milisegundos transcurrido desde la última vez que se consultó .delta.         
     * Si no se lo ha consultado antes, retorna el tiempo transcurrido desde la instanciación del objeto Tiempo.        
    */
    get delta(): number {
        if (!this.tiempoPrevio) {
            this.tiempoPrevio = Date.now();
        }
        this.tiempoActual = Date.now();
        let delta: number = this.tiempoActual - this.tiempoPrevio;
        this.tiempoPrevio = this.tiempoActual;
        return delta;
    }

    /**Ejecuta una función un número determinado de veces por segundo.*/
    iterarPorSegundo(funcion: () => void, numeroIteraciones: number): void {
        const periodo: number = 1000 / numeroIteraciones;
        if (!this.tiempoPrevio) {
            this.tiempoPrevio = Date.now();
        }
        this.tiempoActual = Date.now();
        if (this.tiempoActual - this.tiempoPrevio >= periodo) {
            funcion();
            this.tiempoPrevio = this.tiempoActual;
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