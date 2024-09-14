//Junta los cuerpos, interacciones, entorno, casos límite y renderizado.
//Debería estar acá la creación de canvas y contexto??

import { Contenedor } from "../Fisicas/Contenedor.js";
import { Cuerpo } from "../Fisicas/Cuerpo.js";
// import { Cuadricula, Entorno, Forma, Interaccion, Renderizado } from "../mui.js";
import { Cuadricula } from "../Cuadricula/Cuadricula.js";
import { Entorno } from "../Interaccion/Entorno.js";
import { Forma } from "../GeometriaPlana/Formas.js";
import { Interaccion } from "../Interaccion/Interaccion.js";
import { Renderizado } from "../Renderizado/Renderizado.js";
import { Tiempo } from "./Tiempo.js";
import { Restriccion } from "../Interaccion/Restriccion.js"

export class Composicion {

    /**Herramienta renderizadora.*/
    render: Renderizado;
    /**Conjunto de cuerpos sobre los que trabaja la composición.*/
    cuerpos: Cuerpo[] = []
    /**Conjunto de formas sobre las que trabaja la composición.*/
    formas: Forma[] = [];
    cuadricula!: Cuadricula;
    tiempo!: Tiempo;
    contenedores: Contenedor[] = [];
    entorno!: Entorno;
    fps: number = 60;
    tick: number = 50;
    animar: boolean = true;


    constructor(idCanvas: string) {
        this.render = Renderizado.crearPorIdCanvas(idCanvas);
    }

    /**Define el ancho y el alto del canvas, en pixeles. */
    tamanoCanvas(ancho: number, alto: number) {
        this.render.anchoCanvas = ancho;
        this.render.altoCanvas = alto;
    }

    /**Agrega cuerpos al conjunto de cuerpos manipulados por la composición. */
    agregarCuerpos(...cuerpos: Cuerpo[]): void {
        this.cuerpos.push(...cuerpos);
    }

    /**Actualiza la posición de un conjunto de cuerpos sumando la velocidad instantanea a la posición.*/
    actualizarMovimientoCuerpos() {
        this.cuerpos.forEach((cuerpo) => cuerpo.mover())
    }

    /**Calcula la colisión entre los cuerpos de la composición y resuelve sus choques como choques eslásticos.*/
    reboteElasticoCuerpos() {
        Interaccion.reboteEntreCuerpos(this.cuerpos)
    }

    /**Calcula la colisión entre los cuerpos de la composición y evita que los cuerpos se solapen.*/
    contactoSimpleCuerpos() {
        Interaccion.contactoSimple(this.cuerpos)
    }

    /**Método gráfico. Pinta el interior de los cuerpos de la composición en el canvas.*/
    rellenarCuerpos() {
        this.render.rellenarFormas(this.cuerpos)
    }

    /**Método gráfico. Traza los cuerpos de la composición en el canvas.*/
    trazarCuerpos() {
        this.render.trazarFormas(this.cuerpos)
    }

    /**Método gráfico. Pinta y/o rellena los cuerpos de la composición, según lo definido para cada cuerpo.*/
    renderizarCuerpos() {
        this.render.renderizarFormas(this.cuerpos)
    }

    /**Método gráfico. Pinta y/o rellena las formas de la composición, según lo definido para cada forma.*/
    renderizarFormas() {
        this.render.renderizarFormas(this.formas)
    }


    animacion(funcionCalcular: () => void, funcionRenderizar: () => void, ajustarFPS: boolean = true): void {
        let tiempoCalculo: Tiempo = new Tiempo()
        let tiempoFrame: Tiempo = new Tiempo()

        const funcionAnimar = () => {
            if (this.animar && ajustarFPS) {
                tiempoCalculo.iterarPorSegundo(funcionCalcular, 1000 / this.tick)
                tiempoFrame.iterarPorSegundo(funcionRenderizar, this.fps)
            } else if (this.animar && !ajustarFPS) {
                tiempoCalculo.iterarPorSegundo(funcionCalcular, 1000 / this.tick)
                funcionRenderizar();
            }
            requestAnimationFrame(funcionAnimar)
        }
        funcionAnimar()
    }
    // animacion(funcion: () => void): void {
    //     let tiempo: Tiempo = new Tiempo()
    //     const funcionAnimar = () => {
    //         let fps: number = this.fps;
    //         if (this.animar) {
    //             tiempo.iterarPorSegundo(funcion, fps)
    //         }

    //         requestAnimationFrame(funcionAnimar)
    //     }
    //     funcionAnimar()
    // }

    bordesEntornoInfinitos(entorno: Entorno) {
        this.cuerpos.forEach((cuerpo) => {
            cuerpo.posicion = entorno.envolverBorde(cuerpo.posicion)
        })
    }

    limitarVelocidad(magnitudVelMaxima: number) {
        this.cuerpos.forEach((cuerpo) => {
            cuerpo.velocidad = Restriccion.limitarVelocidad(cuerpo, magnitudVelMaxima)
        })
    }
}