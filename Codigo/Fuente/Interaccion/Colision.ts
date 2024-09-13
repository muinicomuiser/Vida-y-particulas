import { Forma } from "../GeometriaPlana/Formas.js";
import { TipoFormas } from "../GeometriaPlana/TipoFormas.js";
import { Vector } from "../GeometriaPlana/Vector.js";
import { Geometria } from "../Utiles/Geometria.js";
/**
        =============================================
                 * MÓDULO DE COLISIONES *
        =============================================
        Trabaja usando objetos de tipo Forma.

        Usa el Teorema de ejes de separación (SAT) para detectar colisiones.

 */
/**MÓDULO DE COLISIONES         
 * Trabaja usando objetos de tipo Forma.        
 * Usa el Teorema de ejes de separación (SAT) para detectar colisiones.     
*/
export class Colision {

    static get iteraciones(): number {
        return 4;
    }

    /**Detecta colisiones usando el teorema SAT entre formas de tipo circunferencia y/o polígono.      
     * Retorna true si detecta una colisión.        
     * Retorna false si no detecta colisión.        
    */
    static detectar(formaUno: Forma, formaDos: Forma): boolean {
        //Pondré acá la detección de la distancia límite de colisión
        if (Geometria.distanciaEntrePuntos(formaUno.posicion, formaDos.posicion) <= (formaUno.radio + formaDos.radio) * 1.05) {
            if (formaUno.tipo == TipoFormas.poligono && formaDos.tipo == TipoFormas.poligono) {
                return Colision.poligonos(formaUno, formaDos);
            }
            else if (formaUno.tipo == TipoFormas.circunferencia && formaDos.tipo == TipoFormas.poligono) {
                return Colision.circunferenciaPoligono(formaUno, formaDos);
            }
            else if (formaUno.tipo == TipoFormas.poligono && formaDos.tipo == TipoFormas.circunferencia) {
                return Colision.circunferenciaPoligono(formaDos, formaUno);
            }
            else {
                return Colision.circunferencias(formaUno, formaDos);
            }
        }
        return false
    }


    /**Detecta la intersección entre dos circunferencias.             
     * Retorna true si hay intersección.        
     * Retorna false si no hay intersección.        
     * Compara la distancia entre ambos centros con la suma de sus radios.
     */
    static circunferencias(circunferenciaUno: Forma, circunferenciaDos: Forma): boolean {
        let sumaRadios: number = circunferenciaUno.radioTransformado + circunferenciaDos.radioTransformado;
        let distanciaCentros: number = Geometria.distanciaEntrePuntos(circunferenciaUno.posicion, circunferenciaDos.posicion);
        if (distanciaCentros > sumaRadios) {
            return false
        }
        return true;
    }


    /**Detecta la colisión entre dos polígonos.             
     * Retorna true si hay colisión.        
     * Retorna false si no hay colisión.        
     * Usa el teorema SAT. Proyecta los vértices sobre las normales de las caras de ambos polígonos y busca ejes de separación. 
     */
    static poligonos(poligonoUno: Forma, poligonoDos: Forma): boolean {
        for (let normal of poligonoUno.normales) {

            /**Búsqueda de proyecciones mínimas y máximas de los vértices de los polígonos sobre las normales del polígono uno.*/
            let menorUno: number = Colision.proyeccionMenor(poligonoUno.verticesTransformados, normal);
            let mayorUno: number = Colision.proyeccionMayor(poligonoUno.verticesTransformados, normal);
            let menorDos: number = Colision.proyeccionMenor(poligonoDos.verticesTransformados, normal);
            let mayorDos: number = Colision.proyeccionMayor(poligonoDos.verticesTransformados, normal);

            /**Comparación. Si se encuentra una separación, retorna false.*/
            if (menorUno > mayorDos || mayorUno < menorDos) {
                return false;
            }
        }
        for (let normal of poligonoDos.normales) {

            /**Búsqueda de proyecciones mínimas y máximas de los vértices de los polígonos sobre las normales del polígono uno.*/
            let menorUno: number = Colision.proyeccionMenor(poligonoUno.verticesTransformados, normal);
            let mayorUno: number = Colision.proyeccionMayor(poligonoUno.verticesTransformados, normal);
            let menorDos: number = Colision.proyeccionMenor(poligonoDos.verticesTransformados, normal);
            let mayorDos: number = Colision.proyeccionMayor(poligonoDos.verticesTransformados, normal);

            /**Comparación. Si se encuentra una separación, retorna false.*/
            if (menorUno > mayorDos || mayorUno < menorDos) {
                return false;
            }
        }
        return true;
    }


    /**Detecta la colisión entre una circunferencia y un polígono.             
     * Retorna true si hay colisión.        
     * Retorna false si no hay colisión.        
     * Usa el teorema SAT. Proyecta los vértices del polígono y dos puntos de la circunferencia sobre las normales de las caras del polígono y busca ejes de separación. 
     */
    static circunferenciaPoligono(circunferencia: Forma, poligono: Forma): boolean {
        for (let normal of poligono.normales) {

            /**Búsqueda de proyecciones mínimas y máximas de los vértices de los polígonos sobre las normales del polígono uno.*/
            let menorPoli: number = Colision.proyeccionMenor(poligono.verticesTransformados, normal);
            let mayorPoli: number = Colision.proyeccionMayor(poligono.verticesTransformados, normal);
            let menorCirc: number = Vector.proyeccion(circunferencia.posicion, normal) - circunferencia.radioTransformado;
            let mayorCirc: number = Vector.proyeccion(circunferencia.posicion, normal) + circunferencia.radioTransformado;

            /**Comparación. Si se encuentra una separación, retorna false.*/
            if (menorPoli > mayorCirc || mayorPoli < menorCirc) {
                return false;
            }
        }
        return true;
    }


    /**Retorna el valor menor entre las proyecciones de un conjunto de vértices sobre un eje representado por un vector normal.*/
    private static proyeccionMenor(vertices: Vector[], normal: Vector): number {
        let menor = Vector.proyeccion(vertices[0], normal);

        /**Búsqueda de proyecciones mínimas de los vértices del polígono uno.*/
        for (let vertice of vertices) {
            if (Vector.proyeccion(vertice, normal) < menor) {
                menor = Vector.proyeccion(vertice, normal);
            }
        }
        return menor;
    }


    /**Retorna el valor mayor entre las proyecciones de un conjunto de vértices sobre un eje representado por un vector normal.*/
    private static proyeccionMayor(vertices: Vector[], normal: Vector): number {
        let mayor = Vector.proyeccion(vertices[0], normal);

        /**Búsqueda de proyecciones máximas de los vértices del polígono uno.*/
        for (let vertice of vertices) {
            if (Vector.proyeccion(vertice, normal) > mayor) {
                mayor = Vector.proyeccion(vertice, normal);
            }
        }
        return mayor;
    }

    /**Retorna un arreglo de dos vectores correspondiente a las normales de las caras de contacto entre dos formas.     
     * El primero vector del arreglo corresponde a la normal de la primera forma.
     * El segundo vector del arreglo corresponde a la normal de la segunda forma.
    */
    static normalesContacto(formaUno: Forma, formaDos: Forma): Vector[] {
        let normales: Vector[] = [];
        let normalUno: Vector;
        let normalDos: Vector;
        let vectorUnoADos: Vector = Vector.segunPuntos(formaUno.posicion, formaDos.posicion);
        let vectorDosAUno: Vector = Vector.segunPuntos(formaDos.posicion, formaUno.posicion);
        if (formaUno.tipo == TipoFormas.circunferencia) {
            normalUno = vectorUnoADos;
        }
        else {
            normalUno = Vector.clonar(formaUno.normales[0]);
            for (let normal of formaUno.normales) {
                if (Vector.punto(vectorUnoADos, normal) > Vector.punto(vectorUnoADos, normalUno)) {
                    normalUno = Vector.clonar(normal);
                }
            }
        }
        if (formaDos.tipo == TipoFormas.circunferencia) {
            normalDos = Vector.clonar(vectorDosAUno);
        }
        else {
            normalDos = Vector.clonar(formaDos.normales[0])
            for (let normal of formaDos.normales) {
                if (Vector.punto(vectorDosAUno, normal) > Vector.punto(vectorDosAUno, normalDos)) {
                    normalDos = Vector.clonar(normal);
                }
            }
        }
        normales.push(normalUno);
        normales.push(normalDos);
        return normales;
    }

    /**Detecta la colisión entre una circunferencia y su entorno que la contiene.             
     * Retorna el valor de solapamiento.        
     * Retorna null si no hay colisión.        
     * Usa el teorema SAT. Proyecta los vértices del entorno y dos puntos de la circunferencia sobre las normales de las caras del polígono
     * y verifica si hay proyecciones de la circunferencia mayores a la de los vértices del entorno. 
     */
    static circunferenciaEntorno(circunferencia: Forma, entorno: Forma): number | null {
        let distanciaCicunferenciaCentro: number = Geometria.distanciaEntrePuntos(circunferencia.posicion, entorno.posicion);
        if (distanciaCicunferenciaCentro + circunferencia.radio * 1.2 > entorno.apotema) {
            for (let normal of entorno.normales) {
                /**Búsqueda de proyecciones mínimas y máximas de los vértices de los polígonos sobre las normales del polígono uno.*/
                let menorPoli: number = Colision.proyeccionMenor(entorno.verticesTransformados, normal);
                let mayorPoli: number = Colision.proyeccionMayor(entorno.verticesTransformados, normal);
                let menorCirc: number = Vector.proyeccion(circunferencia.posicion, normal) - circunferencia.radioTransformado;
                let mayorCirc: number = Vector.proyeccion(circunferencia.posicion, normal) + circunferencia.radioTransformado;

                /**Comparación. Si se encuentra una separación, retorna true.*/
                if (menorPoli > menorCirc) {
                    return menorPoli - menorCirc;
                }
                if (mayorPoli < mayorCirc) {
                    return mayorCirc - mayorPoli;
                }
            }
        }
        return null;
    }


    /**Retorna la normal del borde del entorno contra el que ha colisionado una forma.*/
    static normalContactoConEntorno(forma: Forma, entorno: Forma): Vector {
        let numeroVertices: number = entorno.verticesTransformados.length;
        let normalEntorno: Vector = entorno.normales[numeroVertices - 1];
        let vectorCentroAForma: Vector = Vector.segunPuntos(entorno.posicion, forma.posicion);
        for (let i: number = 0; i < numeroVertices - 1; i++) {
            let vectorCentroAVerticeUno: Vector = Vector.segunPuntos(entorno.posicion, entorno.verticesTransformados[i]);
            let vectorCentroAVerticeDos: Vector = Vector.segunPuntos(entorno.posicion, entorno.verticesTransformados[i + 1]);
            let anguloVertices: number = Vector.anguloVectores(vectorCentroAVerticeDos, vectorCentroAVerticeUno);
            if (Vector.anguloVectores(vectorCentroAForma, vectorCentroAVerticeUno) < anguloVertices
                && Vector.anguloVectores(vectorCentroAForma, vectorCentroAVerticeDos) < anguloVertices) {
                normalEntorno = entorno.normales[i];
            }
        }
        return normalEntorno;;
    }
}
