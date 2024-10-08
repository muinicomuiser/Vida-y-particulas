/**
 * Inicio Quadtree
 */

import { Punto } from "../GeometriaPlana/Punto.js";
import { Forma } from "../GeometriaPlana/Formas.js"
import { Dibujante } from "../Renderizado/Dibujante.js";
import { Geometria } from "../Utiles/Geometria.js";
import { OpcionesForma } from "../GeometriaPlana/OpcionesForma.js";
import { Vector } from "../GeometriaPlana/Vector.js";
import { OpcionesGraficasForma } from "../Renderizado/OpcionesGraficasForma.js";
import { Interaccion } from "./Interaccion.js";
import { Cuerpo, Matematica } from "../mui.js";

export class QuadTree {
    subDividido: boolean = false;
    puntos: Punto[] = [];
    puntosRepetidos: Punto[] = [];
    x: number;
    y: number;
    ancho: number;
    alto: number;
    capacidad: number;
    subDivisiones: QuadTree[] = [];
    contorno: Forma;
    identificador: number = 1;
    constructor(x: number, y: number, ancho: number, alto: number, capacidad: number = 4) {
        this.x = x;
        this.y = y;
        this.ancho = ancho;
        this.alto = alto;
        this.capacidad = capacidad;
        this.contorno = this.formaCuadrante();
    }

    /**Agrega un punto a un QuadTree. Si al agregar el punto se sobrepasa la capacidad del QuadTree, se subdivide en cuatro QuadTrees nuevos. */
    insertarPunto(punto: Punto, contenido?: Forma): boolean {
        let puntoInsertado: Punto = contenido != undefined ? { x: punto.x, y: punto.y, contenido: contenido } : punto;
        if (puntoInsertado.id == undefined) {
            puntoInsertado.id = this.identificador;
            this.identificador++
        }
        if (this.comprobarInsercion(puntoInsertado)) {
            if (this.buscarPuntoRepetido(puntoInsertado)) {
                console.log('Repetido')
                return true
                // this.puntosRepetidos.push(puntoInsertado)
            }
            if (this.puntos.length < this.capacidad) {
                this.puntos.push(puntoInsertado)
                return true;
            }
            else {
                if (!this.subDividido) {
                    let quadSurEste: QuadTree = new QuadTree(this.x + this.ancho / 2, this.y + this.alto / 2, this.ancho / 2, this.alto / 2, this.capacidad)
                    let quadSurOeste: QuadTree = new QuadTree(this.x, this.y + this.alto / 2, this.ancho / 2, this.alto / 2, this.capacidad)
                    let quadNorOeste: QuadTree = new QuadTree(this.x, this.y, this.ancho / 2, this.alto / 2, this.capacidad)
                    let quadNorEste: QuadTree = new QuadTree(this.x + this.ancho / 2, this.y, this.ancho / 2, this.alto / 2, this.capacidad)
                    this.subDivisiones.push(quadSurEste, quadSurOeste, quadNorOeste, quadNorEste)
                    this.puntos.forEach(puntoGuardado => {
                        quadSurEste.insertarPunto(puntoGuardado);
                        quadSurOeste.insertarPunto(puntoGuardado);
                        quadNorOeste.insertarPunto(puntoGuardado);
                        quadNorEste.insertarPunto(puntoGuardado);
                    })
                    // this.puntosRepetidos.forEach(puntoGuardado => {
                    //     quadSurEste.insertarPunto(puntoGuardado);
                    //     quadSurOeste.insertarPunto(puntoGuardado);
                    //     quadNorOeste.insertarPunto(puntoGuardado);
                    //     quadNorEste.insertarPunto(puntoGuardado);
                    // })
                    this.subDividido = true;
                    return true
                }
                else {
                    this.subDivisiones[0].insertarPunto(puntoInsertado)
                    this.subDivisiones[1].insertarPunto(puntoInsertado)
                    this.subDivisiones[2].insertarPunto(puntoInsertado)
                    this.subDivisiones[3].insertarPunto(puntoInsertado)
                    return true;
                }
            }
        }
        return false;
    }

    comprobarInsercion(punto: Punto): boolean {
        if (punto.contenido) {
            if ((punto.x + punto.contenido.radio >= this.x && punto.x - punto.contenido.radio <= this.x + this.ancho)
                && (punto.y + punto.contenido.radio >= this.y && punto.y - punto.contenido.radio <= this.y + this.alto)) {
                return true;
            }
            return false
        }
        else {
            if (punto.x >= this.x && punto.x <= this.x + this.ancho && punto.y >= this.y && punto.y <= this.y + this.alto) {
                return true;
            }
            return false
        }
    }

    trazar(dibujante: Dibujante, opciones?: OpcionesGraficasForma) {
        if (opciones) {
            this.contorno.estiloGrafico = opciones;
        }
        this.contorno.trazar(dibujante)
        if (this.subDivisiones.length > 0) {
            this.subDivisiones.forEach(sub => sub.trazar(dibujante, opciones))
        }
    }

    private formaCuadrante(): Forma {
        const centroX: number = this.x + (this.ancho / 2)
        const centroY: number = this.y + (this.alto / 2)

        return Forma.rectangulo(centroX, centroY, this.ancho, this.alto)
    }

    private buscarPuntoRepetido(punto: Punto): boolean {
        let coincidencia: boolean = false;
        this.puntos.forEach((puntoGuardado) => {
            if (Matematica.compararNumeros(punto.x, puntoGuardado.x) && Matematica.compararNumeros(punto.y, puntoGuardado.y)) {
                console.log('repetido')
                coincidencia = true
            }
            // if (punto.x == puntoGuardado.x && punto.y == puntoGuardado.y) {
            //     coincidencia = true
            // }
        })
        return coincidencia
    }

    puntosEnRango(limiteIzquierda: number, limiteDerecha: number, limiteSuperior: number, limiteInferior: number, arregloPuntos: Punto[] = []): Punto[] {
        let PuntosDentroDelRango: Punto[] = arregloPuntos;
        this.puntos.forEach(punto => {
            if (punto.x >= limiteIzquierda && punto.x <= limiteDerecha && punto.y >= limiteSuperior && punto.y <= limiteInferior) {
                if (punto.id != undefined) {
                    if (PuntosDentroDelRango.findIndex(puntoEnRango => punto.id == puntoEnRango.id) < 0) {
                        PuntosDentroDelRango.push(punto)
                    }
                }
                else {
                    PuntosDentroDelRango.push(punto)
                }
            }
        })
        this.puntosRepetidos.forEach(punto => {
            if (punto.x >= limiteIzquierda && punto.x <= limiteDerecha && punto.y >= limiteSuperior && punto.y <= limiteInferior) {
                if (punto.id != undefined) {
                    if (PuntosDentroDelRango.findIndex(puntoEnRango => punto.id == puntoEnRango.id) < 0) {
                        PuntosDentroDelRango.push(punto)
                    }
                }
                else {
                    PuntosDentroDelRango.push(punto)
                }
            }
        })
        if (this.subDivisiones.length > 0) {
            this.subDivisiones.forEach(subdivision => {
                subdivision.puntosEnRango(limiteIzquierda, limiteDerecha, limiteSuperior, limiteInferior, PuntosDentroDelRango)
                // PuntosDentroDelRango.push(...subdivision.puntosEnRango(limiteIzquierda, limiteDerecha, limiteSuperior, limiteInferior))
            })
        }
        return PuntosDentroDelRango;
    }

    // puntosEnRangoRadial(radio: number): Punto[] {

    // }

    colisionCuerpos(): void {
        if (!this.subDividido) {
            if (this.puntos.length > 1) {
                let cuerpos: Cuerpo[] = []
                this.puntos.forEach(punto => {
                    if (punto.contenido instanceof Cuerpo) {
                        cuerpos.push(punto.contenido)
                    }
                })
                this.puntosRepetidos.forEach(punto => {
                    if (punto.contenido instanceof Cuerpo) {
                        cuerpos.push(punto.contenido)
                    }
                })
                Interaccion.contactoSimple(cuerpos)
            }
        }
        else {
            this.subDivisiones.forEach(subdivision => subdivision.colisionCuerpos())
        }
    }
}