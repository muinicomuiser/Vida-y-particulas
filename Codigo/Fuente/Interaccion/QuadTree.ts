/**
 * Inicio Quadtree
 */

import { Cuerpo } from "../Fisicas/Cuerpo.js";
import { Forma } from "../GeometriaPlana/Formas.js";
import { Punto } from "../GeometriaPlana/Punto.js";
import { Dibujante } from "../Renderizado/Dibujante.js";
import { OpcionesGraficasForma } from "../Renderizado/OpcionesGraficasForma.js";
import { Matematica } from "../Utiles/Matematica.js";
import { Interaccion } from "./Interaccion.js";


export class QuadTree {
    x: number;
    y: number;
    ancho: number;
    alto: number;
    capacidad: number;
    capacidadEspecifica: number;
    puntos: Punto[] = [];
    private idPunto: number = 1;
    private subDividido: boolean = false;
    private subDivisiones: QuadTree[] = [];
    private niveles: number;
    longitudMinima: number;
    private longitudMenor: number;
    contorno: Forma;
    constructor(x: number, y: number, ancho: number, alto: number, capacidad: number = 4, niveles: number = 7) {
        this.x = x;
        this.y = y;
        this.ancho = ancho;
        this.alto = alto;
        this.capacidad = capacidad;
        this.capacidadEspecifica = capacidad;
        this.longitudMenor = this.ancho < this.alto ? this.ancho : this.alto;
        this.niveles = niveles;
        this.longitudMinima = Math.ceil(this.longitudMenor / (2 ** niveles));
        this.contorno = this.formaCuadrante();
    }

    /**Agrega un punto a un QuadTree. Si al agregar el punto se sobrepasa la capacidad del QuadTree, se subdivide en cuatro QuadTrees nuevos. */
    insertarPunto(punto: Punto, contenido?: Forma): boolean {
        if (contenido != undefined && punto.contenido == undefined) punto.contenido = contenido;
        if (punto.id == 0) {
            punto.id = this.idPunto;
            this.idPunto++
        }
        if (this.validarInsercion(punto)) {
            if (this.verificarPuntoRepetido(punto)) {
                this.puntos.push(punto)
                this.capacidadEspecifica++;
                return true
            }
            if (this.puntos.length < this.capacidadEspecifica || this.longitudMenor <= this.longitudMinima) {
                this.puntos.push(punto)
                return true;
            }
            else {
                if (!this.subDividido) {
                    this.crearSubdivisiones()
                    this.puntos.forEach(puntoGuardado => this.insertarEnSubdivisiones(puntoGuardado))
                    this.insertarEnSubdivisiones(punto)
                    this.subDividido = true;
                    return true
                }
                else {
                    this.insertarEnSubdivisiones(punto)
                    return true;
                }
            }
        }
        return false;
    }

    private crearSubdivisiones() {
        let quadSurEste: QuadTree = new QuadTree(this.x + this.ancho / 2, this.y + this.alto / 2, this.ancho / 2, this.alto / 2, this.capacidad, this.niveles - 1)
        let quadSurOeste: QuadTree = new QuadTree(this.x, this.y + this.alto / 2, this.ancho / 2, this.alto / 2, this.capacidad, this.niveles - 1)
        let quadNorOeste: QuadTree = new QuadTree(this.x, this.y, this.ancho / 2, this.alto / 2, this.capacidad, this.niveles - 1)
        let quadNorEste: QuadTree = new QuadTree(this.x + this.ancho / 2, this.y, this.ancho / 2, this.alto / 2, this.capacidad, this.niveles - 1)
        this.subDivisiones.push(quadSurEste, quadSurOeste, quadNorOeste, quadNorEste)
    }

    private insertarEnSubdivisiones(punto: Punto) {
        this.subDivisiones.forEach(subdivision => subdivision.insertarPunto(punto))
    }

    private validarInsercion(punto: Punto): boolean {
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

    private verificarPuntoRepetido(punto: Punto): boolean {
        let coincidencia: boolean = false;
        this.puntos.forEach((puntoGuardado) => {
            if (Matematica.compararNumeros(punto.x, puntoGuardado.x) && Matematica.compararNumeros(punto.y, puntoGuardado.y)) {
                coincidencia = true;
                return;
            }
        })
        return coincidencia
    }

    puntosEnRango(limiteIzquierda: number, limiteDerecha: number, limiteSuperior: number, limiteInferior: number, arregloPuntos: Punto[] = []): Punto[] {
        let PuntosDentroDelRango: Punto[] = arregloPuntos;
        if (this.x <= limiteDerecha && this.x + this.ancho >= limiteIzquierda && this.y <= limiteInferior && this.y + this.alto >= limiteSuperior) {
            if (this.x >= limiteIzquierda && this.x + this.ancho <= limiteDerecha && this.y >= limiteSuperior && this.y + this.alto <= limiteInferior) {
                this.puntos.forEach(punto => {
                    if (punto.id != undefined) {
                        if (PuntosDentroDelRango.findIndex(puntoEnRango => punto.id == puntoEnRango.id) < 0) {
                            PuntosDentroDelRango.push(punto)
                        }
                    }
                    else {
                        PuntosDentroDelRango.push(punto)
                    }
                })
            }
            else {
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
            }

            if (this.subDivisiones.length > 0) {
                this.subDivisiones.forEach(subdivision => {
                    subdivision.puntosEnRango(limiteIzquierda, limiteDerecha, limiteSuperior, limiteInferior, PuntosDentroDelRango)
                })
            }
        }
        return PuntosDentroDelRango;
    }

    contactoSimpleCuerpos(): void {
        if (!this.subDividido) {
            if (this.puntos.length > 1) {
                let cuerpos: Cuerpo[] = []
                this.puntos.forEach(punto => {
                    if (punto.contenido instanceof Cuerpo) {
                        cuerpos.push(punto.contenido)
                    }
                })
                Interaccion.contactoSimple(cuerpos)
            }
        }
        else {
            this.subDivisiones.forEach(subdivision => subdivision.contactoSimpleCuerpos())
        }
    }
}