//Junta los cuerpos, interacciones, entorno, casos límite y renderizado.
//Debería estar acá la creación de canvas y contexto??

import { Contenedor } from "../Fisicas/Contenedor.js";
import { Cuerpo } from "../Fisicas/Cuerpo.js";
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
    private _entorno: Entorno | undefined = undefined;
    fps: number = 60;
    usarfpsNativos: boolean = false;
    tick: number = 50;
    animar: boolean = true;


    private constructor(canvas?: HTMLCanvasElement, idCanvas?: string) {
        if (canvas) {
            this.render = Renderizado.crearConCanvas(canvas);
        }
        else {
            this.render = Renderizado.crearConIdCanvas(idCanvas!);
        }
    }

    set entorno(entorno: Entorno) {
        this._entorno = entorno;
    }

    get entorno(): Entorno {
        return this._entorno!;
    }

    /**Retorna un objeto de tipo Composicion a partir del id de un canvas.*/
    static crearConIDCanvas(idCanvas: string): Composicion {
        const nuevaCompo: Composicion = new Composicion(undefined, idCanvas)
        return nuevaCompo;
    }

    /**Retorna un objeto de tipo Composicion a partir de un canvas.*/
    static crearConCanvas(canvas: HTMLCanvasElement): Composicion {
        const nuevaCompo: Composicion = new Composicion(canvas);
        return nuevaCompo;
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

    /**Actualiza la posición del conjunto de cuerpos sumando la velocidad instantánea a la posición.*/
    moverCuerpos() {
        this.cuerpos.forEach((cuerpo) => cuerpo.mover())
    }

    /**Calcula la colisión entre los cuerpos de la composición y resuelve sus choques como choques elásticos.*/
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

    /**Crea un loop para ejecutar dos funciones, una asociada a la duración de cada tick y otra a los fps.          
     * El atributo .tick permite cambiar su duración en milisegundos.       
     * La propiedad .fps permite ajustar su número.         
     */
    animacion(funcionCalcular: () => void, funcionRenderizar: () => void): void {
        let tiempoCalculo: Tiempo = new Tiempo()
        let tiempoFrame: Tiempo = new Tiempo()

        const funcionAnimar = () => {
            if (this.animar && !this.usarfpsNativos) {
                tiempoCalculo.iterarPorSegundo(funcionCalcular, 1000 / this.tick)
                tiempoFrame.iterarPorSegundo(funcionRenderizar, this.fps)
            } else if (this.animar && this.usarfpsNativos) {
                tiempoCalculo.iterarPorSegundo(funcionCalcular, 1000 / this.tick)
                funcionRenderizar();
            }
            requestAnimationFrame(funcionAnimar)
        }
        funcionAnimar()
    }


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