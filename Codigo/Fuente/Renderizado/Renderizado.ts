import { Forma } from "../GeometriaPlana/Formas.js";
import { Vector } from "../GeometriaPlana/Vector.js";
import { Punto } from "../GeometriaPlana/Punto.js";
import { Dibujante } from "./Dibujante.js";

/**MÓDULO DE RENDERIZADO        
 * Extiende las funciones de Dibujante.         
 * Permite trabajar con conjuntos de formas y sobre el canvas.          
 * Se instancia usando el canvas.
 */

export class Renderizado extends Dibujante {
    canvas: HTMLCanvasElement;
    private _anchoCanvas: number = 500;
    private _altoCanvas: number = 500;
    private _colorFondo: string = 'black';
    constructor(canvas: HTMLCanvasElement) {
        super(canvas.getContext("2d")!);
        this.canvas = canvas;
        this.canvas.style.backgroundColor = this._colorFondo;
        this.canvas.width = this._anchoCanvas;
        this.canvas.height = this._altoCanvas;
    }

    /**Retorna la medida horizontal del canvas.*/
    get anchoCanvas(): number {
        return this._anchoCanvas;
    }

    /**Retorna la media vertical del canvas. */
    get altoCanvas(): number {
        return this._altoCanvas;
    }

    /**Retorna un punto ubicado en el centro del canvas.*/
    get centroCanvas(): Punto {
        return { x: this.anchoCanvas / 2, y: this.altoCanvas / 2 };
    }

    /**Retorna el color del canvas.*/
    get colorCanvas(): string {
        return this._colorFondo
    }

    /**Modifica la medida horizontal del canvas.*/
    set anchoCanvas(ancho: number) {
        this._anchoCanvas = ancho;
        this.canvas.width = this._anchoCanvas;
    }

    /**Modifica la medida vertical del canvas. */
    set altoCanvas(alto: number) {
        this._altoCanvas = alto;
        this.canvas.height = this._altoCanvas;
    }

    /**Modifica el color del canvas.*/
    set colorCanvas(color: string) {
        this._colorFondo = color;
        this.canvas.style.backgroundColor = this._colorFondo;
    }

    /**Retorna una instancia de renderizado usando como parámetro el id de un canvas presente en el documento HTML. */
    static crearPorIdCanvas(idCanvas: string): Renderizado {
        const CANVAS: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById(idCanvas);
        let nuevoRenderizador: Renderizado = new Renderizado(CANVAS);
        return nuevoRenderizador;
    }

    /**Traza un conjunto de formas.*/
    trazarFormas(formas: Forma[]): void {
        for (let forma of formas) {
            forma.trazar(this);
        }
    }

    /**Rellena un conjunto de formas.*/
    rellenarFormas(formas: Forma[]): void {
        for (let forma of formas) {
            forma.rellenar(this);
        }
    }

    /**Rellena y/o traza, según el caso, un conjunto de formas.*/
    renderizarFormas(formas: Forma[]): void {
        for (let forma of formas) {
            if (forma.trazada) {
                this.trazar(forma)
                // forma.trazar(this);
            }
            if (forma.rellenada) {
                this.rellenar(forma)
                // forma.rellenar(this);
            }
        }
    }

    /**Borra el contenido del canvas.       
     * Si se especifica opacidad, pinta el canvas completo usando como color el atributo colorCanvas y con la opacidad especificada.
     */
    limpiarCanvas(opacidad?: number): void {
        if (opacidad != undefined) {
            this.context.globalAlpha = opacidad;
            this.context.fillStyle = this._colorFondo;
            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
            this.context.globalAlpha = this.estiloForma.opacidad!;
        }
        else {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    }

    /**Traza las normales de una forma geométrica.*/
    trazarNormales(forma: Forma): void {
        forma.normales.forEach((normal) => {
            let normalTrazable: Vector = Vector.clonar(normal);
            normalTrazable.origen = Vector.suma(forma.posicion, Vector.escalar(Vector.normalizar(normal), forma.apotema));
            this.trazarVector(normalTrazable)
        })
    }
}