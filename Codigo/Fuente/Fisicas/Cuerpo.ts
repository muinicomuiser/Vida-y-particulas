/**
        =============================================
                 * MÓDULO DE CUERPOS *
        =============================================
        Trabaja usando objetos de tipo Forma.

        Crea cuerpos geométricos con masa y densidad.

        Contiene métodos para mover según velocidad y aceleración.

 */

import { Forma } from "../GeometriaPlana/Formas.js";
import { Vector } from "../GeometriaPlana/Vector.js";
import { Geometria } from "../Utiles/Geometria.js";
import { Dibujante } from "../Renderizado/Dibujante.js";
import { OpcionesControlesCuerpo } from "./OpcionesControlesCuerpo.js";
import { OpcionesCuerpo } from "./OpcionesCuerpo.js";
import { OpcionesForma } from "../GeometriaPlana/OpcionesForma.js";
//TAREAS
//Una propiedad que defina si es necesario actualizar la posición y la rotación.
//Un solo método para aplicar transformar y actualizar transformaciones
//Buscar un modo de anclar un vértice a otro vector. Así se puede acoplar un ala a otro cuerpo. Método anclar(vector)


/**MÓDULO DE CUERPOS    
 * Trabaja usando objetos de tipo Forma.
 */
export class Cuerpo extends Forma {

    protected _velocidad: Vector = Vector.cero();

    protected _aceleracion: Vector = Vector.cero();

    /**Determina si el cuerpo rotará o no según la dirección y sentido de su velocidad.*/
    rotarSegunVelocidad: boolean = false;
    /**Propiedad útil para determinar si un cuerpo será controlado por el usuario.*/
    controlable: boolean = false;
    /**Determina si un cuerpo se moverá o no producto de la interacción con otros cuerpos.*/
    fijo: boolean = false;

    masa: number = 1;

    densidad: number = 1;
    /**Propiedades para activar y desactivar acciones relacionadas con el control del movimiento de cuerpos por parte del usuario.*/
    controles: OpcionesControlesCuerpo = {
        arriba: false,
        abajo: false,
        izquierda: false,
        derecha: false,
        rotarIzquierda: false,
        rotarDerecha: false,
        rapidez: 1,
        anguloRotacion: Geometria.PI_MEDIO / 30
    }

    private constructor() {
        super();
    }

    /**Retorna una copia del vector velocidad.*/
    get velocidad(): Vector {
        return Vector.clonar(this._velocidad)
    }

    /**Retorna una copia del vector aceleración.*/
    get aceleracion(): Vector {
        return Vector.clonar(this._aceleracion);
    }

    /**Retorna el conjunto de vértices después de */
    get verticesTransformados(): Vector[] {
        if (this.rotarSegunVelocidad == true) {
            this.transformacionAnterior.rotacion = this._transformacion.rotacion
            this.rotacion = Vector.angulo(this._velocidad) - Vector.angulo(this._vertices[0]);
            return super.verticesTransformados;
        }
        return super.verticesTransformados;
    }

    /**Retorna una copia del vector velocidad.*/
    set velocidad(velocidad: Vector) {
        this._velocidad = Vector.clonar(velocidad);
    }

    /**Retorna una copia del vector aceleración. */
    set aceleracion(aceleracion: Vector) {
        this._aceleracion = Vector.clonar(aceleracion);
    }


    /**Retorna un cuerpo geométrico regular.     
     * El radio corresponde a la distancia entre el centro y cualquiera de sus vértices.*/
    static poligono(x: number, y: number, lados: number, radio: number, opciones?: OpcionesCuerpo) {
        let poliForma: Forma = super.poligono(x, y, lados, radio);
        let poligono: Cuerpo = Cuerpo.cuerpoSegunForma(poliForma);
        if (opciones) {
            poligono.aplicarOpciones(opciones)
        }
        return poligono;
    }


    /**Retorna un cuerpo geométrico regular.     
     * El radio corresponde a la distancia entre el centro y cualquiera de sus vértices.*/
    static poligonoSegunVertices(vertices: Vector[], opciones?: OpcionesCuerpo) {
        let poliForma: Forma = super.poligonoSegunVertices(vertices);
        let poligono: Cuerpo = Cuerpo.cuerpoSegunForma(poliForma);
        if (opciones) {
            poligono.aplicarOpciones(opciones)
        }
        return poligono;
    }

    /**Retorna un cuerpo rectangular.*/
    static rectangulo(x: number, y: number, base: number, altura: number, opciones?: OpcionesCuerpo) {
        let rectForma: Forma = super.rectangulo(x, y, base, altura);
        let rectangulo: Cuerpo = Cuerpo.cuerpoSegunForma(rectForma);
        if (opciones) {
            rectangulo.aplicarOpciones(opciones)
        }
        return rectangulo;
    }


    /**Retorna un cuerpo con forma de circunferencia.*/
    static circunferencia(x: number, y: number, radio: number, opciones?: OpcionesCuerpo): Cuerpo {
        let circuloForma: Forma = super.circunferencia(x, y, radio);
        let circunferencia: Cuerpo = Cuerpo.cuerpoSegunForma(circuloForma);
        if (opciones) {
            circunferencia.aplicarOpciones(opciones)
        }
        return circunferencia;
    }

    /**Método auxiliar. Crea un cuerpo base a partir de una forma.*/
    private static cuerpoSegunForma(forma: Forma): Cuerpo {
        let cuerpo: Cuerpo = new Cuerpo();
        cuerpo.vertices = forma.vertices;
        cuerpo.transformacion = forma.transformacion;
        cuerpo.lados = forma.lados;
        cuerpo.radio = forma.radio;
        cuerpo.tipo = forma.tipo;
        return cuerpo;
    }

    /**Aplicación de la opciones definidas al crear un cuerpo nuevo.*/
    protected aplicarOpciones(opciones: OpcionesCuerpo): void {
        super.aplicarOpciones(opciones)
        if (opciones.masa) {
            this.masa = opciones.masa;
        }
        if (opciones.densidad) {
            this.densidad = opciones.densidad;
        }
        if (opciones.fijo != undefined) {
            this.fijo = opciones.fijo;
        }
        if (opciones.rotarSegunVelocidad != undefined) {
            this.rotarSegunVelocidad = opciones.rotarSegunVelocidad;
        }
        if (opciones.controlable != undefined) {
            this.controlable = opciones.controlable!
        }
    }

    /**Suma la velocidad y la aceleración a la posición.*/
    public mover(): void {
        if (!this.fijo) {
            this._velocidad = Vector.suma(this._velocidad, this._aceleracion);
            this.posicion = Vector.suma(this.posicion, this._velocidad);
        }
    }

    /**Traza el vector velocidad del cuerpo a partir de su centro.*/
    public trazarVelocidad(dibujante: Dibujante): void {
        let vectorVelocidad: Vector = Vector.clonar(this._velocidad);
        vectorVelocidad = Vector.escalar(Vector.normalizar(vectorVelocidad), this.radio);
        vectorVelocidad.origen = this._transformacion.posicion;
        dibujante.trazarVector(vectorVelocidad);
    }


    /**Aplica las transformaciones definidas para cada evento (de teclado, mouse u otro) sobre el cuerpo.*/
    public ejecutarControles() {
        if (this.controles.arriba) {
            this.posicion = Vector.suma(this.posicion, Vector.escalar(Vector.normalizar(this.normales[0]), this.controles.rapidez))
        }
        if (this.controles.abajo) {
            this.posicion = Vector.suma(this.posicion, Vector.escalar(Vector.normalizar(this.normales[0]), -this.controles.rapidez))
        }
        if (this.controles.izquierda) {
            this.posicion = Vector.suma(this.posicion, Vector.izquierda(this.controles.rapidez))
        }
        if (this.controles.derecha) {
            this.posicion = Vector.suma(this.posicion, Vector.derecha(this.controles.rapidez))
        }
        if (this.controles.rotarIzquierda) {
            this.rotacion -= this.controles.anguloRotacion
        }
        if (this.controles.rotarDerecha) {
            this.rotacion += this.controles.anguloRotacion
        }
    }
}