(function () {
    'use strict';

    /**MÓDULO DE GEOMETRÍA EN ESPAÑOL
     * Útilitario para mui.js
     * Incluye métodos de conversión de grados y distancia entre puntos.
     */
    class Geometria {
        /**Retorna el doble del valor de PI.*/
        static get DOS_PI() {
            return Math.PI * 2;
        }
        /**Retorna la mitad del valor de PI.*/
        static get PI_MEDIO() {
            return Math.PI / 2;
        }
        //GRADOS  
        /**Transforma grados sexagesimales a radianes.*/
        static gradoARadian(grado) {
            return (grado / 180) * Math.PI;
        }
        /**Transfoma radianes a grados sexagesimales.*/
        static radianAGrado(rad) {
            return (rad / Math.PI) * 180;
        }
        //PITAGÓRICA
        /**Retorna la longitud de la hipotenusa según la longitud de los dos catetos ingresados.*/
        static hipotenusa(cateto1, cateto2) {
            return Math.pow((Math.pow(cateto1, 2) + Math.pow(cateto2, 2)), (1 / 2));
        }
        /**Retorna la longitud de un cateto según la longitud de la hipotenusa y del otro cateto.*/
        static cateto(hipotenusa, cateto) {
            return Math.pow((Math.pow(hipotenusa, 2) - Math.pow(cateto, 2)), (1 / 2));
        }
        //COORDENADAS
        /**Retorna el valor de la distancia entre dos puntos de un plano cartesiano.*/
        static distanciaEntrePuntos(puntoUno, puntoDos) {
            return this.hipotenusa(puntoDos.x - puntoUno.x, puntoDos.y - puntoUno.y);
        }
        /**Retorna el punto medio entre dos puntos de un plano cartesiano.*/
        static puntoMedio(puntoUno, puntoDos) {
            return { x: (puntoUno.x / 2 + puntoDos.x / 2), y: (puntoUno.y / 2, +puntoDos.y / 2) };
        }
    }

    //POR REVISAR
    class Vector {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.origen = { x: 0, y: 0 };
            this.id = 0;
        }
        get magnitud() {
            return Vector.magnitud(this);
        }
        get angulo() {
            return Vector.angulo(this);
        }
        static magnitud(vector) {
            return Math.pow((Math.pow(vector.x, 2) + Math.pow(vector.y, 2)), (1 / 2));
        }
        //REVISARRRRRRRRRRRRRRRR
        static angulo(vector) {
            if (vector.x == 0 && vector.y == 0) {
                return 0;
            }
            else if (vector.y > 0 && vector.x == 0) {
                return Geometria.PI_MEDIO;
            }
            else if (vector.y < 0 && vector.x == 0) {
                return (3 / 2) * Math.PI;
            }
            else {
                if (vector.y > 0 && vector.x > 0) {
                    return Math.atan(vector.y / vector.x);
                }
                else if (vector.y > 0 && vector.x < 0) {
                    return Math.acos(vector.x / Vector.magnitud(vector));
                }
                else if (vector.y < 0 && vector.x < 0) {
                    return Math.PI - Math.asin(vector.y / Vector.magnitud(vector));
                }
                return Geometria.DOS_PI - Math.acos(vector.x / Vector.magnitud(vector));
            }
        }
        static cero() {
            return new Vector(0, 0);
        }
        static arriba(escalar) {
            if (escalar) {
                return new Vector(0, -1 * escalar);
            }
            return new Vector(0, -1);
        }
        static abajo(escalar) {
            if (escalar) {
                return new Vector(0, 1 * escalar);
            }
            return new Vector(0, 1);
        }
        static izquierda(escalar) {
            if (escalar) {
                return new Vector(-1 * escalar, 0);
            }
            return new Vector(-1, 0);
        }
        static derecha(escalar) {
            if (escalar) {
                return new Vector(1 * escalar, 0);
            }
            return new Vector(1, 0);
        }
        /**Retorna un vector nuevo a partir de las componentes x e y ingresadas.*/
        static crear(x, y) {
            return new Vector(x, y);
        }
        /**Retorna un vector nuevo que va desde un punto origen a un punto extremo.*/
        static segunPuntos(origen, extremo) {
            let vector = new Vector(extremo.x - origen.x, extremo.y - origen.y);
            return vector;
        }
        /**Retorna una copia del vector.*/
        static clonar(vector) {
            let x = vector.x;
            let y = vector.y;
            return new Vector(x, y);
        }
        /**Retorna la suma de dos vectores como un vector nuevo.*/
        static suma(vectorUno, vectorDos) {
            let vectorSuma = new Vector((vectorUno.x + vectorDos.x), (vectorUno.y + vectorDos.y));
            return vectorSuma;
        }
        /**Retorna la resta de dos vectores como un vector nuevo.*/
        static resta(vectorUno, vectorDos) {
            let vectorResta = new Vector((vectorUno.x - vectorDos.x), (vectorUno.y - vectorDos.y));
            return vectorResta;
        }
        /**Retorna un vector nuevo resultante de multiplicar las componentes de un vector por un escalar.*/
        static escalar(vector, escalar) {
            let vectorEscalado = new Vector((vector.x * escalar), (vector.y * escalar));
            return vectorEscalado;
        }
        /**Retorna una copia del vector ingresado con magnitud 1.*/
        static normalizar(vector) {
            return new Vector(vector.x / vector.magnitud, vector.y / vector.magnitud);
        }
        /**Retorna un vector resultante de invertir la dirección del vector ingresado.*/
        static invertir(vector) {
            return new Vector(-vector.x, -vector.y);
        }
        /**Retorna el vector normal de un segmento formado por dos vectores.
         * El ángulo de la normal va en sentido antihorario según la dirección del primer al segundo vector.
         * (Según la inverción de ejes de las coordenadas de JS, donde los ángulos crecen en sentido horario).
        */
        static normal(vectorUno, vectorDos) {
            let vectorSegmento = Vector.segunPuntos(vectorUno, vectorDos);
            return Vector.rotar(vectorSegmento, -Geometria.PI_MEDIO);
        }
        /**Retorna el producto punto, o escalar, entre dos vectore.*/
        static punto(vectorUno, vectorDos) {
            return (vectorUno.x * vectorDos.x) + (vectorUno.y * vectorDos.y);
        }
        /**Retorna el módulo del producto cruz, o vectorial, entre dos vectores de 2 dimensiones.*/
        static cruz(vectorUno, vectorDos) {
            return vectorUno.x * vectorDos.y - vectorUno.y * vectorDos.x;
        }
        /**Retorna el valor de la proyección de un vector sobre un eje representado por otro vector.*/
        static proyeccion(vectorUno, vectorEje) {
            return (Vector.punto(vectorUno, vectorEje) / Vector.magnitud(vectorEje));
        }
        /**Retorna el valor del ángulo entre dos vectores.*/
        static anguloVectores(vectorUno, vectorDos) {
            let punto = Vector.punto(vectorUno, vectorDos);
            let magnitudes = vectorUno.magnitud * vectorDos.magnitud;
            return Math.acos(punto / magnitudes);
        }
        /**Retorna una copia de un conjunto de vectores.*/
        static clonarConjunto(vectores) {
            let conjuntoCopia = [];
            for (let vector of vectores) {
                conjuntoCopia.push(Vector.clonar(vector));
            }
            return conjuntoCopia;
        }
        /**Retorna un vector nuevo a partir de un vector rotado.*/
        static rotar(vector, angulo) {
            let x = (Math.cos(angulo) * vector.x) - (Math.sin(angulo) * vector.y);
            let y = (Math.sin(angulo) * vector.x) + (Math.cos(angulo) * vector.y);
            return new Vector(x, y);
        }
    }

    /**
            =============================================
                    * MÓDULO DE TRANSFORMACIONES *
            =============================================
            Trabaja sobre conjuntos de vectores.

            Almacena las transformaciones como atributos.

            Siempre retorna copias nuevas de los conjuntos de vectores ingresados.

     */
    /**Aplica transformaciones de escala, rotación y desplazamiento sobre arreglos de vectores.
     * Siempre retorna copias nuevas de los arreglos.
     * Almacena en sus atributos los valores de las transformaciones que aplica.
     */
    class Transformacion {
        constructor(x = 0, y = 0, rotacion = 0, escala = 1) {
            this.escala = escala;
            this.rotacion = rotacion;
            this.posicion = Vector.crear(x, y);
        }
        /**Retorna el arreglo de vectores resultante de aplicar las transformaciones de escala, rotación y desplazamiento
         * sobre un arreglo de vectores de entrada.
         * Permite aumentar puntualmente la rotación en un ángulo específico sin modificar la propiedad de rotación de la transformación.*/
        transformarConjuntoVectores(vectores) {
            let vectoresTransformados = Vector.clonarConjunto(vectores);
            vectoresTransformados = this.aplicarEscalaVectores(vectoresTransformados);
            vectoresTransformados = this.aplicarRotacionVectores(vectoresTransformados);
            vectoresTransformados = this.aplicarDesplazamientoVectores(vectoresTransformados);
            return vectoresTransformados;
        }
        /**Escala cada uno de los vectores del arreglo ingresado y los retorna en un arreglo nuevo.*/
        aplicarEscalaVectores(vectores) {
            let vectoresEscalados = [];
            for (let vector of vectores) {
                let vectorEscalado = Vector.escalar(vector, this.escala);
                vectoresEscalados.push(vectorEscalado);
            }
            return vectoresEscalados;
        }
        /**Desplaza cada uno de los vectores del arreglo ingresado y los retorna en un arreglo nuevo.*/
        aplicarDesplazamientoVectores(vectores) {
            let vectoresDesplazados = [];
            for (let vector of vectores) {
                let x = vector.x + this.posicion.x;
                let y = vector.y + this.posicion.y;
                vectoresDesplazados.push(Vector.crear(x, y));
            }
            return vectoresDesplazados;
        }
        /**Rota cada uno de los vectores del arreglo ingresado según el ángulo de rotación almacenado y los retorna en un arreglo nuevo.
        */
        aplicarRotacionVectores(vectores) {
            let vectoresRotados = [];
            for (let vector of vectores) {
                let x = vector.x * Math.cos(this.rotacion) - vector.y * Math.sin(this.rotacion);
                let y = vector.x * Math.sin(this.rotacion) + vector.y * Math.cos(this.rotacion);
                vectoresRotados.push(Vector.crear(x, y));
            }
            return vectoresRotados;
        }
        /**Rota cada uno de los vectores de un arreglo según el ángulo ingresado y los retorna en un arreglo nuevo.
        */
        static rotarVectores(vectores, angulo) {
            let vectoresRotados = [];
            for (let vector of vectores) {
                let x = vector.x * Math.cos(angulo) - vector.y * Math.sin(angulo);
                let y = vector.x * Math.sin(angulo) + vector.y * Math.cos(angulo);
                vectoresRotados.push(Vector.crear(x, y));
            }
            return vectoresRotados;
        }
        /**Retorna una copia de la transformación.*/
        clonarTransformación() {
            return new Transformacion(this.posicion.x, this.posicion.y, this.rotacion, this.escala);
        }
    }

    var TipoFormas;
    (function (TipoFormas) {
        TipoFormas["circunferencia"] = "circunferencia";
        TipoFormas["poligono"] = "poligono";
        TipoFormas["linea"] = "linea";
        TipoFormas["vector"] = "vector";
    })(TipoFormas || (TipoFormas = {}));

    //POR INTEGRAR
    // Para una forma personalizada, ya sea abierta o cerrada, agregar un método para calcular su radio o su centro
    // Función de reflejar
    // SUMAR FORMAS
    //Agregar propiedad de vértices transformados, normales rotadas y apotema, para no estar calculándolo en cada momento,
    //ademas de una propiedad que avise cuando haya que aplicar la transformación.
    /**MÓDULO FORMA
     * Instancias de formas geométricas.
     * Permite cambiar su posición, rotar, escalar, crear formas básicas y personalizadas, y dibujarlas.
     */
    class Forma {
        constructor() {
            this._vertices = [];
            this._verticesTransformados = [];
            this._transformacion = new Transformacion();
            this.verticesTransformadosAnteriores = [];
            this.transformacionAnterior = new Transformacion();
            this.transformar = true;
            this.radio = 0;
            this.lados = 0;
            this.tipo = TipoFormas.poligono;
            /**Determina si la forma debe ser trazada al renderizar.*/
            this.trazada = true;
            /**Determina si la forma debe ser rellenada al renderizar.*/
            this.rellenada = true;
        }
        /**Retorna el valor del radio con la transformación de escala aplicada.*/
        get radioTransformado() {
            let radioTransformado = this.radio * this._transformacion.escala;
            return radioTransformado;
        }
        /**Retorna una copia de la transformación de la forma.*/
        get transformacion() {
            return new Transformacion(this._transformacion.posicion.x, this._transformacion.posicion.y, this._transformacion.rotacion, this._transformacion.escala);
        }
        /**Retorna una copia del vector de la posición después de aplicar las transformaciones.*/
        get posicion() {
            let posicion = Vector.clonar(this._transformacion.posicion);
            return posicion;
        }
        /**Retorna una copia del vector de la posición antes de aplicar las transformaciones.*/
        get posicionAnterior() {
            let posicion = Vector.clonar(this.transformacionAnterior.posicion);
            return posicion;
        }
        /**Retorna el ángulo de rotación actual de la forma.*/
        get rotacion() {
            return this._transformacion.rotacion;
        }
        /**Retorna el valor de la escala de la forma.*/
        get escala() {
            return this._transformacion.escala;
        }
        /**Retorna una copia del arreglo de vértices sin transformaciones.*/
        get vertices() {
            return Vector.clonarConjunto(this._vertices);
        }
        /**Retorna una copia del arreglo de vértices después de aplicar las transformaciones de escala, rotación y desplazamiento.*/
        get verticesTransformados() {
            if (this.transformar) {
                this.verticesTransformadosAnteriores = Vector.clonarConjunto(this._verticesTransformados);
                this.transformarVertices();
            }
            return Vector.clonarConjunto(this._verticesTransformados);
        }
        /**Retorna el conjunto de vectores normales de cada arista del polígono.
         * El orden de las aristas es en sentido horario.
        */
        get normales() {
            let normales = [];
            for (let i = 0; i < this.verticesTransformados.length; i++) {
                if (i != this.verticesTransformados.length - 1) {
                    let normal = Vector.normal(this.verticesTransformados[i], this.verticesTransformados[i + 1]);
                    normales.push(normal);
                }
                else {
                    let normal = Vector.normal(this.verticesTransformados[i], this.verticesTransformados[0]);
                    normales.push(normal);
                }
            }
            return normales;
        }
        /**Retorna la distancia entre el centro del polígono y el punto más cercano de sus aristas.*/
        get apotema() {
            if (this.tipo == TipoFormas.circunferencia) {
                return this.radioTransformado;
            }
            return Math.cos(Math.PI / this.lados) * this.radio;
        }
        /**Reemplaza la transformación de la forma.*/
        set transformacion(transformacion) {
            this.transformar = true;
            this.transformacionAnterior = this._transformacion.clonarTransformación();
            this._transformacion = transformacion;
        }
        /**Reemplaza el vector posición de la forma.*/
        set posicion(nuevaPosicion) {
            this.transformar = true;
            this.transformacionAnterior.posicion = this._transformacion.posicion;
            this._transformacion.posicion = Vector.clonar(nuevaPosicion);
        }
        /**Modifica el valor de la rotación de la figura con respecto a su forma sin transformaciones.*/
        set rotacion(rotacion) {
            this.transformar = true;
            this.transformacionAnterior.rotacion = this._transformacion.rotacion;
            this._transformacion.rotacion = rotacion;
        }
        /**Reemplaza el valor de la escala de la forma.*/
        set escala(nuevaEscala) {
            this.transformar = true;
            this.transformacionAnterior.escala = this._transformacion.escala;
            this._transformacion.escala = nuevaEscala;
        }
        /**Reemplaza el conjunto de vértices base de la forma.*/
        set vertices(vertices) {
            this._vertices = Vector.clonarConjunto(vertices);
        }
        /**Permite modificar las opciones gráficas con la interfaz OpcionesGraficasForma*/
        set estiloGrafico(opciones) {
            this.aplicarOpciones(opciones);
        }
        /**Inicia los vértices de la forma creada.*/
        crearVertices() {
            if (this.lados == 0) {
                return [];
            }
            let theta = Geometria.DOS_PI / this.lados;
            let offset = theta * 0.5;
            let nVertices = [];
            for (let i = 0; i < this.lados; i++) {
                let angulo = offset + (i * theta);
                let xx = Math.cos(angulo) * this.radio;
                let yy = Math.sin(angulo) * this.radio;
                let vertice = Vector.crear(xx, yy);
                nVertices.push(vertice);
            }
            return nVertices;
        }
        ////////Agregar control de errores para índices mayores al número de vértices
        moverVertice(indice, punto) {
            this._vertices[indice] = Vector.crear(punto.x, punto.y);
        }
        /**Retorna una forma de tipo polígono. El radio es el valor de la distancia entre el centro y cualquiera de sus vértices.*/
        static poligono(x, y, lados, radio, opciones) {
            let nuevoPoligono = new Forma();
            nuevoPoligono.lados = lados;
            nuevoPoligono.radio = radio;
            nuevoPoligono.vertices = nuevoPoligono.crearVertices();
            nuevoPoligono.tipo = TipoFormas.poligono;
            if (opciones) {
                nuevoPoligono.aplicarOpciones(opciones);
            }
            nuevoPoligono.iniciarTransformacion(x, y);
            return nuevoPoligono;
        }
        /**Retorna una forma de tipo circunferencia. */
        static circunferencia(x, y, radio, opciones) {
            let nuevaCircunferencia = new Forma();
            nuevaCircunferencia.radio = radio;
            let lados = 10 + Math.trunc(radio / 10);
            if (lados % 2 == 1) {
                lados++;
            }
            if (lados > 30) {
                lados = 30;
            }
            nuevaCircunferencia.lados = lados;
            nuevaCircunferencia.vertices = nuevaCircunferencia.crearVertices();
            nuevaCircunferencia.tipo = TipoFormas.circunferencia;
            if (opciones) {
                nuevaCircunferencia.aplicarOpciones(opciones);
            }
            nuevaCircunferencia.iniciarTransformacion(x, y);
            return nuevaCircunferencia;
        }
        /**Retorna una forma de tipo rectángulo. El radio es el valor de la distancia entre el centro y cualquiera de sus vértices.*/
        static rectangulo(x, y, base, altura, opciones) {
            let rectangulo = new Forma();
            rectangulo.lados = 4;
            rectangulo.radio = Geometria.hipotenusa(base * 0.5, altura * 0.5);
            let ver1 = Vector.crear(base / 2, altura / 2);
            let ver2 = Vector.crear(-base / 2, altura / 2);
            let ver3 = Vector.crear(-base / 2, -altura / 2);
            let ver4 = Vector.crear(base / 2, -altura / 2);
            rectangulo.vertices = [ver1, ver2, ver3, ver4];
            rectangulo.tipo = TipoFormas.poligono;
            if (opciones) {
                rectangulo.aplicarOpciones(opciones);
            }
            rectangulo.iniciarTransformacion(x, y);
            return rectangulo;
        }
        /**Crea una recta centrada en la posición ingresada.*/
        static recta(puntoUno, puntoDos, opciones) {
            let linea = new Forma();
            linea.lados = 1;
            linea.radio = Geometria.distanciaEntrePuntos(puntoUno, puntoDos) / 2;
            let centro = Vector.crear(puntoUno.x / 2 + puntoDos.x / 2, puntoUno.y / 2 + puntoDos.y / 2);
            linea.vertices = [Vector.crear(puntoUno.x - centro.x, puntoUno.y - centro.y), Vector.crear(puntoDos.x - centro.x, puntoDos.y - centro.y)];
            linea.tipo = TipoFormas.linea;
            if (opciones) {
                linea.aplicarOpciones(opciones);
            }
            linea.iniciarTransformacion(centro.x, centro.y);
            return linea;
        }
        /**
         * Crea un conjunto de rectas a partir de un grupo de vértices.
         * Calcula el centro de los vértices y centra el trazo en la posición ingresada.
         */
        static trazo(vertices, opciones) {
            let centro = Vector.crear(0, 0);
            let trazo = new Forma();
            let verticesTrazo = [];
            vertices.forEach((vertice) => centro = Vector.suma(centro, Vector.escalar(vertice, 1 / vertices.length)));
            vertices.forEach((vertice) => verticesTrazo.push(Vector.resta(vertice, centro)));
            trazo.vertices = verticesTrazo;
            trazo.lados = vertices.length - 1;
            trazo.tipo = TipoFormas.linea;
            if (opciones) {
                trazo.aplicarOpciones(opciones);
            }
            trazo.iniciarTransformacion(centro.x, centro.y);
            return trazo;
        }
        /**
         * Crea un polígono a partir de un grupo de vértices.
         * Calcula el centro de los vértices ingresados y lo asigna a su posición.
         */
        static poligonoSegunVertices(vertices, opciones) {
            let centro = Vector.crear(0, 0);
            let poligono = new Forma();
            let verticesPoligono = [];
            vertices.forEach((vertice) => centro = Vector.suma(centro, Vector.escalar(vertice, 1 / vertices.length)));
            vertices.forEach((vertice) => verticesPoligono.push(Vector.resta(vertice, centro)));
            poligono.vertices = verticesPoligono;
            poligono.lados = vertices.length - 1;
            poligono.tipo = TipoFormas.poligono;
            if (opciones) {
                poligono.aplicarOpciones(opciones);
            }
            poligono.iniciarTransformacion(centro.x, centro.y);
            return poligono;
        }
        /**Crea una transformación nueva para formas nuevas, con la posición ingresada.*/
        iniciarTransformacion(x, y) {
            this._transformacion.posicion = Vector.crear(x, y);
            this.transformacionAnterior = this._transformacion.clonarTransformación();
        }
        /**Aplicación de la opciones definidas al crear una forma nueva.*/
        aplicarOpciones(opciones) {
            if (opciones.colorTrazo) {
                this.colorTrazo = opciones.colorTrazo;
            }
            if (opciones.colorRelleno) {
                this.colorRelleno = opciones.colorRelleno;
            }
            if (opciones.trazada != undefined) {
                this.trazada = opciones.trazada;
            }
            if (opciones.rellenada != undefined) {
                this.rellenada = opciones.rellenada;
            }
            if (opciones.grosorTrazo) {
                this.grosorTrazo = opciones.grosorTrazo;
            }
            if (opciones.escala) {
                this.escala = opciones.escala;
            }
            if (opciones.rotacion) {
                this.rotacion = opciones.rotacion;
            }
        }
        /**Actualiza el conjunto de vectores transformados.*/
        transformarVertices() {
            this.verticesTransformadosAnteriores = Vector.clonarConjunto(this._verticesTransformados);
            this._verticesTransformados = this._transformacion.transformarConjuntoVectores(this._vertices);
            this.transformar = false;
        }
        /**Retorna una copia de la forma como una forma nueva.*/
        clonar() {
            const clonForma = new Forma();
            clonForma.vertices = this.vertices;
            clonForma.transformacion = this.transformacion;
            clonForma.lados = this.lados;
            clonForma.radio = this.radio;
            clonForma.tipo = this.tipo;
            clonForma.colorRelleno = this.colorRelleno;
            clonForma.colorTrazo = this.colorTrazo;
            clonForma.rellenada = this.rellenada;
            clonForma.trazada = this.trazada;
            clonForma.grosorTrazo = this.grosorTrazo;
            clonForma.opacidad = this.opacidad;
            clonForma.iniciarTransformacion(this.posicion.x, this.posicion.y);
            return clonForma;
        }
        /**Suma el ángulo ingresado al ángulo de rotación de la forma.*/
        rotar(angulo) {
            this.transformacionAnterior.rotacion = this._transformacion.rotacion;
            this._transformacion.rotacion += angulo;
            this.transformar = true;
        }
        /**Suma el vector ingresado al vector de posición de la forma.*/
        desplazar(vector) {
            this.transformacionAnterior.posicion = this._transformacion.posicion;
            this._transformacion.posicion = Vector.suma(this._transformacion.posicion, vector);
        }
        /**Rota la forma alrededor del punto (0, 0)*/
        rotarSegunOrigen(angulo) {
            this.transformacionAnterior.posicion = this._transformacion.posicion;
            this._transformacion.posicion = Vector.rotar(this._transformacion.posicion, angulo);
        }
        /**rota la forma alrededor del punto ingresado.*/
        rotarSegunPunto(punto, angulo) {
            let vectorAcomodador = Vector.crear(punto.x, punto.y);
            this.transformacionAnterior.posicion = this._transformacion.posicion;
            this._transformacion.posicion = Vector.resta(this._transformacion.posicion, vectorAcomodador);
            this.rotarSegunOrigen(angulo);
            this._transformacion.posicion = Vector.suma(this._transformacion.posicion, vectorAcomodador);
        }
        /**Traza el contorno de la forma. Usa una instancia de la clase Dibujante o Renderizado.*/
        trazar(dibujante) {
            dibujante.trazar(this);
        }
        /**Rellena el interior de la forma. Usa una instancia de la clase Dibujante o Renderizado.*/
        rellenar(dibujante) {
            dibujante.rellenar(this);
        }
    }

    /**
            =============================================
                     * MÓDULO DE CUERPOS *
            =============================================
            Trabaja usando objetos de tipo Forma.

            Crea cuerpos geométricos con masa y densidad.

            Contiene métodos para mover según velocidad y aceleración.

     */
    //TAREAS
    //Una propiedad que defina si es necesario actualizar la posición y la rotación.
    //Un solo método para aplicar transformar y actualizar transformaciones
    //Buscar un modo de anclar un vértice a otro vector. Así se puede acoplar un ala a otro cuerpo. Método anclar(vector)
    /**MÓDULO DE CUERPOS
     * Trabaja usando objetos de tipo Forma.
     */
    class Cuerpo extends Forma {
        constructor() {
            super();
            this._velocidad = Vector.cero();
            this._aceleracion = Vector.cero();
            /**Determina si el cuerpo rotará o no según la dirección y sentido de su velocidad.*/
            this.rotarSegunVelocidad = false;
            /**Propiedad útil para determinar si un cuerpo será controlado por el usuario.*/
            this.controlable = false;
            /**Determina si un cuerpo se moverá o no producto de la interacción con otros cuerpos.*/
            this.fijo = false;
            this.masa = 1;
            this.densidad = 1;
            /**Propiedades para activar y desactivar acciones relacionadas con el control del movimiento de cuerpos por parte del usuario.*/
            this.controles = {
                arriba: false,
                abajo: false,
                izquierda: false,
                derecha: false,
                rotarIzquierda: false,
                rotarDerecha: false,
                rapidez: 1,
                anguloRotacion: Geometria.PI_MEDIO / 30
            };
        }
        /**Retorna una copia del vector velocidad.*/
        get velocidad() {
            return Vector.clonar(this._velocidad);
        }
        /**Retorna una copia del vector aceleración.*/
        get aceleracion() {
            return Vector.clonar(this._aceleracion);
        }
        get verticesTransformados() {
            if (this.rotarSegunVelocidad == true) {
                this.transformacionAnterior.rotacion = this._transformacion.rotacion;
                this.rotacion = Vector.angulo(this._velocidad) - Vector.angulo(this._vertices[0]);
                return super.verticesTransformados;
            }
            return super.verticesTransformados;
        }
        /**Modifica el vector velocidad.*/
        set velocidad(velocidad) {
            this._velocidad = Vector.clonar(velocidad);
        }
        /**Modifica el vector aceleración.*/
        set aceleracion(aceleracion) {
            this._aceleracion = Vector.clonar(aceleracion);
        }
        /**Retorna un cuerpo geométrico regular.
         * El radio corresponde a la distancia entre el centro y cualquiera de sus vértices.*/
        static poligono(x, y, lados, radio, opciones) {
            let poliForma = super.poligono(x, y, lados, radio);
            let poligono = Cuerpo.cuerpoSegunForma(poliForma);
            if (opciones) {
                poligono.aplicarOpciones(opciones);
            }
            return poligono;
        }
        /**Retorna un cuerpo geométrico regular.
         * El radio corresponde a la distancia entre el centro y cualquiera de sus vértices.*/
        static poligonoSegunVertices(vertices, opciones) {
            let poliForma = super.poligonoSegunVertices(vertices);
            let poligono = Cuerpo.cuerpoSegunForma(poliForma);
            if (opciones) {
                poligono.aplicarOpciones(opciones);
            }
            return poligono;
        }
        /**Retorna un cuerpo rectangular.*/
        static rectangulo(x, y, base, altura, opciones) {
            let rectForma = super.rectangulo(x, y, base, altura);
            let rectangulo = Cuerpo.cuerpoSegunForma(rectForma);
            if (opciones) {
                rectangulo.aplicarOpciones(opciones);
            }
            return rectangulo;
        }
        /**Retorna un cuerpo con forma de circunferencia.*/
        static circunferencia(x, y, radio, opciones) {
            let circuloForma = super.circunferencia(x, y, radio);
            let circunferencia = Cuerpo.cuerpoSegunForma(circuloForma);
            if (opciones) {
                circunferencia.aplicarOpciones(opciones);
            }
            return circunferencia;
        }
        /**Método auxiliar. Crea un cuerpo base a partir de una forma.*/
        static cuerpoSegunForma(forma) {
            let cuerpo = new Cuerpo();
            cuerpo.vertices = forma.vertices;
            cuerpo.transformacion = forma.transformacion;
            cuerpo.lados = forma.lados;
            cuerpo.radio = forma.radio;
            cuerpo.tipo = forma.tipo;
            return cuerpo;
        }
        /**Aplicación de la opciones definidas al crear un cuerpo nuevo.*/
        aplicarOpciones(opciones) {
            super.aplicarOpciones(opciones);
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
                this.controlable = opciones.controlable;
            }
        }
        /**Retorna una copia del cuerpo como un cuerpo nuevo.*/
        clonar() {
            const formaClonada = super.clonar();
            const cuerpoClonado = Cuerpo.cuerpoSegunForma(formaClonada);
            cuerpoClonado.masa = this.masa;
            cuerpoClonado.densidad = this.densidad;
            cuerpoClonado.fijo = this.fijo;
            cuerpoClonado.rotarSegunVelocidad = this.rotarSegunVelocidad;
            cuerpoClonado.controlable = this.controlable;
            return cuerpoClonado;
        }
        /**Suma la aceleración a la velocidad y la velocidad a la posición.*/
        mover() {
            if (!this.fijo) {
                this._velocidad = Vector.suma(this._velocidad, this._aceleracion);
                this.posicion = Vector.suma(this.posicion, this._velocidad);
            }
        }
        /**Traza el vector velocidad del cuerpo a partir de su centro.*/
        trazarVelocidad(dibujante) {
            let vectorVelocidad = Vector.clonar(this._velocidad);
            vectorVelocidad = Vector.escalar(Vector.normalizar(vectorVelocidad), this.radio);
            vectorVelocidad.origen = this._transformacion.posicion;
            dibujante.trazarVector(vectorVelocidad);
        }
        /**Aplica las transformaciones definidas para cada evento (de teclado, mouse u otro) sobre el cuerpo.*/
        usarControles() {
            if (this.controles.arriba) {
                this.posicion = Vector.suma(this.posicion, Vector.escalar(Vector.normalizar(this.normales[0]), this.controles.rapidez));
            }
            if (this.controles.abajo) {
                this.posicion = Vector.suma(this.posicion, Vector.escalar(Vector.normalizar(this.normales[0]), -this.controles.rapidez));
            }
            if (this.controles.izquierda) {
                this.posicion = Vector.suma(this.posicion, Vector.izquierda(this.controles.rapidez));
            }
            if (this.controles.derecha) {
                this.posicion = Vector.suma(this.posicion, Vector.derecha(this.controles.rapidez));
            }
            if (this.controles.rotarIzquierda) {
                this.rotacion -= this.controles.anguloRotacion;
            }
            if (this.controles.rotarDerecha) {
                this.rotacion += this.controles.anguloRotacion;
            }
        }
    }

    /**
     * MÓDULO MATEMÁTICO EN ESPAÑOL
     * Reducido. Contiene solo funciones útiles de números aleatorios.
     */
    class Matematica {
        /**Retorna un número aleatorio entre dos números.*/
        static aleatorio(min, max) {
            let rango = max - min;
            return (Math.random() * rango) + min;
        }
        /**Retorna un número aleatorio entero entre dos números, ambos incluídos.*/
        static aleatorioEntero(min, max) {
            let rango = 1 + max - min;
            return Math.trunc((Math.random() * rango) + min);
        }
        static compararNumeros(numeroUno, numeroDos, epsilon = Number.EPSILON) {
            return (Math.abs(numeroUno - numeroDos) < epsilon);
        }
    }

    //Momento lineal, movimiento acelerado, momento angular, energía cinética y potencial.
    class Cinematica {
        /**Retorna un vector velocidad de un cuerpo que colisiona con una superficie.*/
        static reboteSimple(cuerpo, normal) {
            let vectorRebotado = cuerpo.velocidad;
            if (Vector.anguloVectores(vectorRebotado, normal) > Geometria.PI_MEDIO) {
                vectorRebotado = Vector.invertir(vectorRebotado);
            }
            return Vector.rotar(vectorRebotado, (Vector.angulo(normal) - Vector.angulo(vectorRebotado)) * 2);
        }
        /**Retorna en un arreglo las velocidades finales después de un choque elástico entre dos cuerpos.*/
        static reboteElastico(cuerpoUno, cuerpoDos) {
            return [Cinematica.velocidadUnoFinal(cuerpoUno, cuerpoDos), Cinematica.velocidadDosFinal(cuerpoUno, cuerpoDos)];
        }
        static velocidadUnoFinal(cuerpoUno, cuerpoDos) {
            const velUnoInicial = cuerpoUno.velocidad;
            const divisionMasas = (2 * cuerpoDos.masa) / (cuerpoUno.masa + cuerpoDos.masa);
            const restaVelocidades = Vector.resta(cuerpoDos.velocidad, cuerpoUno.velocidad);
            const restaPosiciones = Vector.resta(cuerpoDos.posicion, cuerpoUno.posicion);
            const puntoVelocidadesPosiciones = Vector.punto(restaVelocidades, restaPosiciones);
            const moduloPosicionesCuadrado = Math.pow(restaPosiciones.magnitud, 2);
            const velUnoFinal = Vector.suma(velUnoInicial, Vector.escalar(restaPosiciones, divisionMasas * puntoVelocidadesPosiciones / moduloPosicionesCuadrado));
            return velUnoFinal;
        }
        static velocidadDosFinal(cuerpoUno, cuerpoDos) {
            const velDosInicial = cuerpoDos.velocidad;
            const divisionMasas = (2 * cuerpoUno.masa) / (cuerpoUno.masa + cuerpoDos.masa);
            const restaVelocidades = Vector.resta(cuerpoUno.velocidad, cuerpoDos.velocidad);
            const restaPosiciones = Vector.resta(cuerpoUno.posicion, cuerpoDos.posicion);
            const puntoVelocidadesPosiciones = Vector.punto(restaVelocidades, restaPosiciones);
            const moduloPosicionesCuadrado = Math.pow(restaPosiciones.magnitud, 2);
            const velDosFinal = Vector.suma(velDosInicial, Vector.escalar(restaPosiciones, divisionMasas * puntoVelocidadesPosiciones / moduloPosicionesCuadrado));
            return velDosFinal;
        }
    }

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
    class Colision {
        static get iteraciones() {
            return 1;
        }
        /**Detecta colisiones usando el teorema SAT entre formas de tipo circunferencia y/o polígono.
         * Retorna true si detecta una colisión.
         * Retorna false si no detecta colisión.
        */
        static detectar(formaUno, formaDos) {
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
            return false;
        }
        /**Detecta la intersección entre dos circunferencias.
         * Retorna true si hay intersección.
         * Retorna false si no hay intersección.
         * Compara la distancia entre ambos centros con la suma de sus radios.
         */
        static circunferencias(circunferenciaUno, circunferenciaDos) {
            let sumaRadios = circunferenciaUno.radioTransformado + circunferenciaDos.radioTransformado;
            let distanciaCentros = Geometria.distanciaEntrePuntos(circunferenciaUno.posicion, circunferenciaDos.posicion);
            if (distanciaCentros > sumaRadios) {
                return false;
            }
            return true;
        }
        /**Detecta la colisión entre dos polígonos.
         * Retorna true si hay colisión.
         * Retorna false si no hay colisión.
         * Usa el teorema SAT. Proyecta los vértices sobre las normales de las caras de ambos polígonos y busca ejes de separación.
         */
        static poligonos(poligonoUno, poligonoDos) {
            for (let normal of poligonoUno.normales) {
                /**Búsqueda de proyecciones mínimas y máximas de los vértices de los polígonos sobre las normales del polígono uno.*/
                let menorUno = Colision.proyeccionMenor(poligonoUno.verticesTransformados, normal);
                let mayorUno = Colision.proyeccionMayor(poligonoUno.verticesTransformados, normal);
                let menorDos = Colision.proyeccionMenor(poligonoDos.verticesTransformados, normal);
                let mayorDos = Colision.proyeccionMayor(poligonoDos.verticesTransformados, normal);
                /**Comparación. Si se encuentra una separación, retorna false.*/
                if (menorUno > mayorDos || mayorUno < menorDos) {
                    return false;
                }
            }
            for (let normal of poligonoDos.normales) {
                /**Búsqueda de proyecciones mínimas y máximas de los vértices de los polígonos sobre las normales del polígono uno.*/
                let menorUno = Colision.proyeccionMenor(poligonoUno.verticesTransformados, normal);
                let mayorUno = Colision.proyeccionMayor(poligonoUno.verticesTransformados, normal);
                let menorDos = Colision.proyeccionMenor(poligonoDos.verticesTransformados, normal);
                let mayorDos = Colision.proyeccionMayor(poligonoDos.verticesTransformados, normal);
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
        static circunferenciaPoligono(circunferencia, poligono) {
            for (let normal of poligono.normales) {
                /**Búsqueda de proyecciones mínimas y máximas de los vértices de los polígonos sobre las normales del polígono uno.*/
                let menorPoli = Colision.proyeccionMenor(poligono.verticesTransformados, normal);
                let mayorPoli = Colision.proyeccionMayor(poligono.verticesTransformados, normal);
                let menorCirc = Vector.proyeccion(circunferencia.posicion, normal) - circunferencia.radioTransformado;
                let mayorCirc = Vector.proyeccion(circunferencia.posicion, normal) + circunferencia.radioTransformado;
                /**Comparación. Si se encuentra una separación, retorna false.*/
                if (menorPoli > mayorCirc || mayorPoli < menorCirc) {
                    return false;
                }
            }
            return true;
        }
        /**Retorna el valor menor entre las proyecciones de un conjunto de vértices sobre un eje representado por un vector normal.*/
        static proyeccionMenor(vertices, normal) {
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
        static proyeccionMayor(vertices, normal) {
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
        static normalesContacto(formaUno, formaDos) {
            let normales = [];
            let normalUno;
            let normalDos;
            let vectorUnoADos = Vector.segunPuntos(formaUno.posicion, formaDos.posicion);
            let vectorDosAUno = Vector.segunPuntos(formaDos.posicion, formaUno.posicion);
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
                normalDos = Vector.clonar(formaDos.normales[0]);
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
        static circunferenciaEntorno(circunferencia, entorno) {
            let distanciaCicunferenciaCentro = Geometria.distanciaEntrePuntos(circunferencia.posicion, entorno.posicion);
            if (distanciaCicunferenciaCentro + circunferencia.radio * 1.2 > entorno.apotema) {
                for (let normal of entorno.normales) {
                    /**Búsqueda de proyecciones mínimas y máximas de los vértices de los polígonos sobre las normales del polígono uno.*/
                    let menorPoli = Colision.proyeccionMenor(entorno.verticesTransformados, normal);
                    let mayorPoli = Colision.proyeccionMayor(entorno.verticesTransformados, normal);
                    let menorCirc = Vector.proyeccion(circunferencia.posicion, normal) - circunferencia.radioTransformado;
                    let mayorCirc = Vector.proyeccion(circunferencia.posicion, normal) + circunferencia.radioTransformado;
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
        static normalContactoConEntorno(forma, entorno) {
            let numeroVertices = entorno.verticesTransformados.length;
            let normalEntorno = entorno.normales[numeroVertices - 1];
            let vectorCentroAForma = Vector.segunPuntos(entorno.posicion, forma.posicion);
            for (let i = 0; i < numeroVertices - 1; i++) {
                let vectorCentroAVerticeUno = Vector.segunPuntos(entorno.posicion, entorno.verticesTransformados[i]);
                let vectorCentroAVerticeDos = Vector.segunPuntos(entorno.posicion, entorno.verticesTransformados[i + 1]);
                let anguloVertices = Vector.anguloVectores(vectorCentroAVerticeDos, vectorCentroAVerticeUno);
                if (Vector.anguloVectores(vectorCentroAForma, vectorCentroAVerticeUno) < anguloVertices
                    && Vector.anguloVectores(vectorCentroAForma, vectorCentroAVerticeDos) < anguloVertices) {
                    normalEntorno = entorno.normales[i];
                }
            }
            return normalEntorno;
        }
    }

    //Interacciones entre cuerpos.
    class Interaccion {
        static get iteraciones() {
            return 2;
        }
        /**Retorna una copia del conjunto de cuerpos con la resolución de rebote para cuerpos que han colisionado.      */
        static reboteEntreCuerpos(cuerpos) {
            for (let iteracion = 0; iteracion < Interaccion.iteraciones; iteracion++) {
                // let cuerposRebotados: Cuerpo[] = [];
                for (let i = 0; i < cuerpos.length - 1; i++) {
                    for (let j = i + 1; j < cuerpos.length; j++) {
                        if (Colision.detectar(cuerpos[i], cuerpos[j])) {
                            let normales = Colision.normalesContacto(cuerpos[i], cuerpos[j]);
                            let velocidadesFinales = Cinematica.reboteElastico(cuerpos[i], cuerpos[j]);
                            cuerpos[i].velocidad = velocidadesFinales[0];
                            cuerpos[j].velocidad = velocidadesFinales[1];
                            // cuerpos[i].velocidad = Cinematica.reboteSimple(cuerpos[i], normales[1])
                            // cuerpos[j].velocidad = Cinematica.reboteSimple(cuerpos[j], normales[0])
                            if (cuerpos[i].fijo) {
                                cuerpos[j].posicion = Vector.suma(cuerpos[j].posicion, Interaccion.resolverSolapamiento(cuerpos[j], cuerpos[i], normales[0]));
                            }
                            else if (cuerpos[j].fijo) {
                                cuerpos[i].posicion = Vector.suma(cuerpos[i].posicion, Interaccion.resolverSolapamiento(cuerpos[i], cuerpos[j], normales[1]));
                            }
                            else {
                                cuerpos[i].posicion = Vector.suma(cuerpos[i].posicion, Interaccion.resolverSolapamiento(cuerpos[i], cuerpos[j], normales[1]));
                                cuerpos[j].posicion = Vector.suma(cuerpos[j].posicion, Interaccion.resolverSolapamiento(cuerpos[j], cuerpos[i], normales[0]));
                            }
                        }
                    }
                    // cuerposRebotados.push(cuerpos[i])
                }
                // cuerposRebotados.push(cuerpos[cuerpos.length - 1])
            }
            return cuerpos;
            // return cuerposRebotados;
        }
        /**Retorna una copia del conjunto de cuerpos con la resolución de contacto sólido para cuerpos que han colisionado.      */
        static contactoSimple(cuerpos) {
            // console.log('Comprobando')
            for (let iteracion = 0; iteracion < Interaccion.iteraciones; iteracion++) {
                // let cuerposRebotados: Cuerpo[] = [];
                for (let i = 0; i < cuerpos.length - 1; i++) {
                    for (let j = i + 1; j < cuerpos.length; j++) {
                        if (Colision.detectar(cuerpos[i], cuerpos[j])) {
                            let normales = Colision.normalesContacto(cuerpos[i], cuerpos[j]);
                            Cinematica.reboteElastico(cuerpos[i], cuerpos[j]);
                            if (cuerpos[i].fijo) {
                                cuerpos[j].posicion = Vector.suma(cuerpos[j].posicion, Interaccion.resolverSolapamiento(cuerpos[j], cuerpos[i], normales[0]));
                            }
                            else if (cuerpos[j].fijo) {
                                cuerpos[i].posicion = Vector.suma(cuerpos[i].posicion, Interaccion.resolverSolapamiento(cuerpos[i], cuerpos[j], normales[1]));
                            }
                            else {
                                cuerpos[i].posicion = Vector.suma(cuerpos[i].posicion, Interaccion.resolverSolapamiento(cuerpos[i], cuerpos[j], normales[1]));
                                cuerpos[j].posicion = Vector.suma(cuerpos[j].posicion, Interaccion.resolverSolapamiento(cuerpos[j], cuerpos[i], normales[0]));
                            }
                        }
                    }
                    // cuerposRebotados.push(cuerpos[i])
                }
                // cuerposRebotados.push(cuerpos[cuerpos.length - 1])
            }
            return cuerpos;
            // return cuerposRebotados;
        }
        static resolverSolapamiento(cuerpoUno, cuerpoDos, normal) {
            let vectorDesplazamiento = Vector.normalizar(normal);
            let solapamiento = (cuerpoDos.radio + cuerpoUno.radio) - Geometria.distanciaEntrePuntos(cuerpoDos.posicion, cuerpoUno.posicion);
            if (cuerpoDos.fijo) {
                vectorDesplazamiento = Vector.escalar(vectorDesplazamiento, solapamiento);
                return vectorDesplazamiento;
            }
            vectorDesplazamiento = Vector.escalar(vectorDesplazamiento, 0.5 * solapamiento);
            return vectorDesplazamiento;
        }
        /**Retorna una copia del conjunto de circunferencias con la resolución de rebote para cuerpos que han colisionado con los bordes de un entorno.      */
        static reboteCircunferenciasConEntorno(circunferencias, entorno) {
            let cuerposRebotados = [];
            for (let i = 0; i < circunferencias.length; i++) {
                let solapamiento = Colision.circunferenciaEntorno(circunferencias[i], entorno);
                if (solapamiento != null) {
                    let normal = Colision.normalContactoConEntorno(circunferencias[i], entorno);
                    let normalInvertida = Vector.invertir(normal);
                    // circunferencias[i].velocidad = Cinematica.reboteElastico(circunferencias[i], entorno)[0]
                    // circunferencias[i].velocidad = Vector.invertir(Cinematica.reboteElastico(circunferencias[i], entorno)[0])
                    circunferencias[i].velocidad = Cinematica.reboteSimple(circunferencias[i], normalInvertida);
                    circunferencias[i].posicion = Vector.suma(circunferencias[i].posicion, Interaccion.resolverSolapamientoEntorno(normalInvertida, solapamiento));
                }
                cuerposRebotados.push(circunferencias[i]);
            }
            return cuerposRebotados;
        }
        static resolverSolapamientoEntorno(normal, solapamiento) {
            let vectorDesplazamiento = Vector.normalizar(normal);
            vectorDesplazamiento = Vector.escalar(vectorDesplazamiento, 1 * solapamiento);
            return vectorDesplazamiento;
        }
    }

    /**
     * Inicio Quadtree
     */
    class QuadTree {
        constructor(x, y, ancho, alto, capacidad = 4, niveles = 7) {
            this.puntos = [];
            this.idPunto = 1;
            this.subDividido = false;
            this.subDivisiones = [];
            this.x = x;
            this.y = y;
            this.ancho = ancho;
            this.alto = alto;
            this.capacidad = capacidad;
            this.capacidadEspecifica = capacidad;
            this.longitudMenor = this.ancho < this.alto ? this.ancho : this.alto;
            this.niveles = niveles;
            this.longitudMinima = Math.ceil(this.longitudMenor / (Math.pow(2, niveles)));
            this.contorno = this.formaCuadrante();
        }
        /**Agrega un punto a un QuadTree. Si al agregar el punto se sobrepasa la capacidad del QuadTree, se subdivide en cuatro QuadTrees nuevos. */
        insertarPunto(punto, contenido) {
            if (contenido != undefined && punto.contenido == undefined)
                punto.contenido = contenido;
            if (punto.id == 0) {
                punto.id = this.idPunto;
                this.idPunto++;
            }
            if (this.validarInsercion(punto)) {
                if (this.verificarPuntoRepetido(punto)) {
                    this.puntos.push(punto);
                    this.capacidadEspecifica++;
                    return true;
                }
                if (this.puntos.length < this.capacidadEspecifica || this.longitudMenor <= this.longitudMinima) {
                    this.puntos.push(punto);
                    return true;
                }
                else {
                    if (!this.subDividido) {
                        this.crearSubdivisiones();
                        this.puntos.forEach(puntoGuardado => this.insertarEnSubdivisiones(puntoGuardado));
                        this.insertarEnSubdivisiones(punto);
                        this.subDividido = true;
                        return true;
                    }
                    else {
                        this.insertarEnSubdivisiones(punto);
                        return true;
                    }
                }
            }
            return false;
        }
        crearSubdivisiones() {
            let quadSurEste = new QuadTree(this.x + this.ancho / 2, this.y + this.alto / 2, this.ancho / 2, this.alto / 2, this.capacidad, this.niveles - 1);
            let quadSurOeste = new QuadTree(this.x, this.y + this.alto / 2, this.ancho / 2, this.alto / 2, this.capacidad, this.niveles - 1);
            let quadNorOeste = new QuadTree(this.x, this.y, this.ancho / 2, this.alto / 2, this.capacidad, this.niveles - 1);
            let quadNorEste = new QuadTree(this.x + this.ancho / 2, this.y, this.ancho / 2, this.alto / 2, this.capacidad, this.niveles - 1);
            this.subDivisiones.push(quadSurEste, quadSurOeste, quadNorOeste, quadNorEste);
        }
        insertarEnSubdivisiones(punto) {
            this.subDivisiones.forEach(subdivision => subdivision.insertarPunto(punto));
        }
        validarInsercion(punto) {
            if (punto.contenido) {
                if ((punto.x + punto.contenido.radio >= this.x && punto.x - punto.contenido.radio <= this.x + this.ancho)
                    && (punto.y + punto.contenido.radio >= this.y && punto.y - punto.contenido.radio <= this.y + this.alto)) {
                    return true;
                }
                return false;
            }
            else {
                if (punto.x >= this.x && punto.x <= this.x + this.ancho && punto.y >= this.y && punto.y <= this.y + this.alto) {
                    return true;
                }
                return false;
            }
        }
        trazar(dibujante, opciones) {
            if (opciones) {
                this.contorno.estiloGrafico = opciones;
            }
            this.contorno.trazar(dibujante);
            if (this.subDivisiones.length > 0) {
                this.subDivisiones.forEach(sub => sub.trazar(dibujante, opciones));
            }
        }
        formaCuadrante() {
            const centroX = this.x + (this.ancho / 2);
            const centroY = this.y + (this.alto / 2);
            return Forma.rectangulo(centroX, centroY, this.ancho, this.alto);
        }
        verificarPuntoRepetido(punto) {
            let coincidencia = false;
            this.puntos.forEach((puntoGuardado) => {
                if (Matematica.compararNumeros(punto.x, puntoGuardado.x) && Matematica.compararNumeros(punto.y, puntoGuardado.y)) {
                    coincidencia = true;
                    return;
                }
            });
            return coincidencia;
        }
        puntosEnRango(limiteIzquierda, limiteDerecha, limiteSuperior, limiteInferior, arregloPuntos = []) {
            let PuntosDentroDelRango = arregloPuntos;
            if (this.x <= limiteDerecha && this.x + this.ancho >= limiteIzquierda && this.y <= limiteInferior && this.y + this.alto >= limiteSuperior) {
                if (this.x >= limiteIzquierda && this.x + this.ancho <= limiteDerecha && this.y >= limiteSuperior && this.y + this.alto <= limiteInferior) {
                    this.puntos.forEach(punto => {
                        if (punto.id != undefined) {
                            if (PuntosDentroDelRango.findIndex(puntoEnRango => punto.id == puntoEnRango.id) < 0) {
                                PuntosDentroDelRango.push(punto);
                            }
                        }
                        else {
                            PuntosDentroDelRango.push(punto);
                        }
                    });
                }
                else {
                    this.puntos.forEach(punto => {
                        if (punto.x >= limiteIzquierda && punto.x <= limiteDerecha && punto.y >= limiteSuperior && punto.y <= limiteInferior) {
                            if (punto.id != undefined) {
                                if (PuntosDentroDelRango.findIndex(puntoEnRango => punto.id == puntoEnRango.id) < 0) {
                                    PuntosDentroDelRango.push(punto);
                                }
                            }
                            else {
                                PuntosDentroDelRango.push(punto);
                            }
                        }
                    });
                }
                if (this.subDivisiones.length > 0) {
                    this.subDivisiones.forEach(subdivision => {
                        subdivision.puntosEnRango(limiteIzquierda, limiteDerecha, limiteSuperior, limiteInferior, PuntosDentroDelRango);
                    });
                }
            }
            return PuntosDentroDelRango;
        }
        contactoSimpleCuerpos() {
            if (!this.subDividido) {
                if (this.puntos.length > 1) {
                    let cuerpos = [];
                    this.puntos.forEach(punto => {
                        if (punto.contenido instanceof Cuerpo) {
                            cuerpos.push(punto.contenido);
                        }
                    });
                    Interaccion.contactoSimple(cuerpos);
                }
            }
            else {
                this.subDivisiones.forEach(subdivision => subdivision.contactoSimpleCuerpos());
            }
        }
    }

    //REPENSAR ESTA CLASE
    class Contenedor {
        constructor(cuerpo) {
            this.cuerposContenidos = [];
            this.cuerpo = cuerpo;
            this.cuerpo.fijo = true;
        }
        /**Retorna el conjunto de vectores normales de cada arista del contenedor. */
        get normales() {
            return Vector.clonarConjunto(this.cuerpo.normales);
        }
        /**Retorna un objeto Contenedor a partir de un cuerpo.*/
        static crearContenedor(cuerpo) {
            return new Contenedor(cuerpo);
        }
        /**Agrega cuerpos al conjunto de cuerpos que estarán dentro del contenedor.*/
        agregarCuerposContenidos(...cuerpos) {
            this.cuerposContenidos.push(...cuerpos);
        }
        rebotarCircunferenciasConBorde() {
            Interaccion.reboteCircunferenciasConEntorno(this.cuerposContenidos, this.cuerpo);
        }
        /**Suma la aceleración a la velocidad y la velocidad a la posición.*/
        mover() {
            this.cuerpo.mover();
        }
    }

    //Fricción, bordes, gravedad
    class Entorno extends Contenedor {
        constructor(canvas, cuerpo) {
            super(cuerpo);
            this.canvas = canvas;
            this.alto = this.canvas.height;
            this.ancho = this.canvas.width;
            this.cuerpo.fijo = true;
        }
        get normales() {
            return Vector.clonarConjunto(this.cuerpo.normales);
        }
        /**Crea un entorno con un cuerpo del tamaño del canvas.
         * Un entorno funciona como un cuerpo contenedor.
         */
        static crearEntornoCanvas(canvas) {
            let cuerpoEntorno = Cuerpo.poligonoSegunVertices([Vector.crear(canvas.width, canvas.height), Vector.crear(0, canvas.height), Vector.crear(0, 0), Vector.crear(canvas.width, 0)]);
            return new Entorno(canvas, cuerpoEntorno);
        }
        /**Mueve un vector que ha excedido las coordenadas de alguno de los bordes al borde opuesto.
         * Convierte al entorno en un entorno infinito.
        */
        envolverBorde(vector) {
            let x = vector.x;
            let y = vector.y;
            if (x > this.ancho) {
                x -= this.ancho;
            }
            if (x < 0) {
                x += this.ancho;
            }
            if (y > this.alto) {
                y -= this.alto;
            }
            if (y < 0) {
                y += this.alto;
            }
            return Vector.crear(x, y);
        }
        colisionConBorde(...cuerpos) {
            return Interaccion.reboteCircunferenciasConEntorno(cuerpos, this.cuerpo);
        }
    }

    class Restriccion {
        /**Limita la magnitud de la velocidad de un cuerpo.
         * Retorna una copia del vector velocidad si se ha modificado su magnitud.
        */
        static limitarVelocidad(cuerpo, limite) {
            let magnitudVel = cuerpo.velocidad.magnitud;
            if (magnitudVel > limite) {
                let velNormalizado = Vector.normalizar(cuerpo.velocidad);
                return Vector.escalar(velNormalizado, limite);
            }
            return cuerpo.velocidad;
        }
        /**Retorna un vector de aceleracion escalado de tal manera que al sumarlo a la velocidad del cuerpo, la magnitud
         * de la velocidad no supere el límite ingresado.*/
        static limitarAceleracionSegunVelocidad(cuerpo, limiteVelocidad) {
            let magnitudVelocidad = cuerpo.velocidad.magnitud;
            let magnitudAceleracion = cuerpo.aceleracion.magnitud;
            if (magnitudAceleracion != 0 && magnitudVelocidad != 0) {
                if (magnitudVelocidad + magnitudAceleracion > limiteVelocidad) {
                    let razonAceleracion = magnitudAceleracion / (magnitudAceleracion + magnitudVelocidad);
                    let aceleracionNormalizada = Vector.normalizar(cuerpo.aceleracion);
                    let aceleracionEscalada = Vector.escalar(aceleracionNormalizada, razonAceleracion * limiteVelocidad);
                    return aceleracionEscalada;
                }
            }
            return cuerpo.aceleracion;
        }
    }

    //Módulo de cálculos físicos
    //Considerar: fricción, gravedad, resortes, torques.
    class Fuerza {
        /**Retorna un vector correspondiente a la aceleración de un cuerpo atraído hacia un cuerpo atractor.
         * TODAVÍA NO HE INCORPORADO LA MASA NI LA DISTANCIA.
        */
        static atraer(cuerpo, atractor, magnitudAtraccion) {
            let vectorAtractor = Vector.segunPuntos(cuerpo.posicion, atractor.posicion);
            vectorAtractor = Vector.normalizar(vectorAtractor);
            vectorAtractor = Vector.escalar(vectorAtractor, magnitudAtraccion);
            return vectorAtractor;
        }
        /**Retorna un vector correspondiente a la aceleración de un cuerpo atraído hacia un vector atractor.
         * TODAVÍA NO HE INCORPORADO LA MASA NI LA DISTANCIA.
        */
        static atraerAVector(cuerpo, atractor, magnitudAtraccion) {
            let vectorAtractor = Vector.segunPuntos(cuerpo.posicion, atractor);
            vectorAtractor = Vector.normalizar(vectorAtractor);
            vectorAtractor = Vector.escalar(vectorAtractor, magnitudAtraccion);
            return vectorAtractor;
        }
        /**Retorna un vector correspondiente a la aceleración de un cuerpo repelido por un cuerpo repulsor.
        * TODAVÍA NO HE INCORPORADO LA MASA NI LA DISTANCIA.
        */
        static repeler(cuerpo, repulsor, magnitudRepulsion) {
            let vectorAtractor = Vector.segunPuntos(repulsor.posicion, cuerpo.posicion);
            vectorAtractor = Vector.normalizar(vectorAtractor);
            vectorAtractor = Vector.escalar(vectorAtractor, magnitudRepulsion);
            return vectorAtractor;
        }
        /**Retorna un vector correspondiente a la aceleración de un cuerpo repelido por un vector repulsor.
        * TODAVÍA NO HE INCORPORADO LA MASA NI LA DISTANCIA.
       */
        static repelerDeVector(cuerpo, repulsor, magnitudRepulsion) {
            let vectorRepulsor = Vector.segunPuntos(repulsor, cuerpo.posicion);
            vectorRepulsor = Vector.normalizar(vectorRepulsor);
            vectorRepulsor = Vector.escalar(vectorRepulsor, magnitudRepulsion);
            return vectorRepulsor;
        }
    }

    /**MÓDULO DE DIBUJO
     * Instancia una herramienta dibujante.
     * Métodos para definir colores hsla y rgba, dibujar objetos tipo Forma y escribir.
     */
    class Dibujante {
        constructor(context) {
            // opcionesCelda:
            /**Opciones del método en que se graficará.
             * 'colorTrazo', 'colorRelleno', 'trazada', 'rellenada', 'grosorTrazo' y 'opacidad'.
            */
            this.estiloForma = {
                colorTrazo: 'blue',
                colorRelleno: "skyblue",
                trazada: true,
                rellenada: true,
                grosorTrazo: 1,
                opacidad: 1,
            };
            /**Opciones de 'color', 'tamano', 'fuente', 'opacidad' y 'alineacion'.*/
            this.estiloTexto = {
                color: "red",
                tamano: 10,
                fuente: "calibri",
                opacidad: 1,
                alineacion: "right"
            };
            /**Opciones del método en que se graficará.
            * 'color' y 'grosorTrazo'.
            */
            this.estiloVector = {
                color: "red",
                grosorTrazo: 1,
            };
            this.context = context;
            this.colorCelda = "blue";
        }
        /**
         * Retorna un string con el color en formato HSL.
         * (hue) recibe grados entre 0 y 360,
         * (saturation) y (lightness) reciben porcentajes.
         */
        static colorHSL(hue, saturation, lightness) {
            return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
        }
        /**
         * Retorna un string con el color en formato HSLA.
         * (hue) recibe grados entre 0 y 360,
         * (saturation) y (lightness) reciben porcentajes, y (alpha)
         * valores entre 0 y 1.
         */
        static colorHSLA(hue, saturation, lightness, alpha) {
            return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
        }
        /**
         * Retorna un string con el color en formato RGB.
         * (red), (green) y (blue) reciben valores entre 0 y 255.
         */
        static colorRGB(red, green, blue) {
            return `rgb(${red}, ${green}, ${blue})`;
        }
        /**
         * Retorna un string con el color en formato RGBA.
         * (red), (green) y (blue) reciben valores entre 0 y 255,
         * y (alpha) valores entre 0 y 1.
         */
        static colorRGBA(red, green, blue, alpha) {
            return `rgba(${red}, ${green}, ${blue}, ${alpha})`;
        }
        recorrerPath(forma) {
            if (forma.tipo == TipoFormas.circunferencia) {
                this.pathCircunferencia(forma);
            }
            else if (forma.tipo == TipoFormas.poligono) {
                this.pathPoligono(forma);
            }
            else if (forma.tipo == TipoFormas.linea || forma.tipo == TipoFormas.vector) {
                this.pathLinea(forma);
            }
        }
        /**Traza en el canvas la forma ingresada como argumento.*/
        trazar(forma) {
            this.recorrerPath(forma);
            if (forma.tipo == TipoFormas.vector) {
                this.context.strokeStyle = this.estiloVector.color;
            }
            else {
                if (forma.colorTrazo) {
                    this.context.strokeStyle = forma.colorTrazo;
                }
                else {
                    this.context.strokeStyle = this.estiloForma.colorTrazo;
                }
                if (forma.opacidad) {
                    this.context.globalAlpha = forma.opacidad;
                }
                else {
                    this.context.globalAlpha = this.estiloForma.opacidad;
                }
                if (forma.grosorTrazo) {
                    this.context.lineWidth = forma.grosorTrazo;
                }
                else {
                    this.context.lineWidth = this.estiloForma.grosorTrazo;
                }
            }
            this.context.stroke();
        }
        /**Rellena en el canvas la forma ingresada como argumento.*/
        rellenar(forma) {
            this.recorrerPath(forma);
            if (forma.opacidad) {
                this.context.globalAlpha = forma.opacidad;
            }
            else {
                this.context.globalAlpha = this.estiloForma.opacidad;
            }
            if (forma.colorRelleno) {
                this.context.fillStyle = forma.colorRelleno;
            }
            else {
                this.context.fillStyle = this.estiloForma.colorRelleno;
            }
            this.context.fill();
        }
        /**Rellena en el canvas la celda ingresada como argumento.*/
        rellenarCelda(celda) {
            this.context.beginPath();
            this.context.clearRect((celda.columna - 1) * celda.tamano, (celda.fila - 1) * celda.tamano, celda.tamano, celda.tamano);
            this.context.globalAlpha = this.estiloForma.opacidad;
            this.context.fillStyle = this.colorCelda;
            if (celda.color) {
                this.context.fillStyle = celda.color;
            }
            this.context.fillRect((celda.columna - 1) * celda.tamano, (celda.fila - 1) * celda.tamano, celda.tamano, celda.tamano);
            this.context.globalAlpha = 1;
        }
        /** Traza en el canvas el vector ingresado como argumento.
         * Usa como color el atributo .estiloVector.color.
         */
        trazarVector(vector) {
            let origen = vector.origen;
            let extremo = { x: vector.origen.x + vector.x, y: vector.origen.y + vector.y };
            this.context.beginPath();
            this.context.moveTo(Math.round(origen.x), Math.round(origen.y));
            this.context.lineTo(Math.round(extremo.x), Math.round(extremo.y));
            this.context.lineWidth = this.estiloVector.grosorTrazo;
            this.context.globalAlpha = this.estiloForma.opacidad;
            this.context.strokeStyle = this.estiloVector.color;
            this.context.stroke();
        }
        /**Rellena un texto en el canvas en la posicion ingresada.
         * Usa como opciones gráficas el atributo .estiloTexto
        */
        escribir(texto, posicionX, posicionY) {
            this.context.textAlign = this.estiloTexto.alineacion;
            this.context.font = `${this.estiloTexto.tamano}px ${this.estiloTexto.fuente}`;
            // this.context.font = `${this.opcionesTexto.grosor} ${this.opcionesTexto.tamano}px ${this.opcionesTexto.fuente}`;
            this.context.globalAlpha = this.estiloTexto.opacidad;
            this.context.fillStyle = this.estiloTexto.color;
            this.context.fillText(texto, posicionX, posicionY);
        }
        /**Método interno.
        * Crea un recorrido para una forma con id "circunferencia", usando el método .arc de la interfaz context.
        */
        pathCircunferencia(forma) {
            this.context.beginPath();
            this.context.arc(Math.round(forma.posicion.x), Math.round(forma.posicion.y), forma.radioTransformado, 0, Geometria.DOS_PI);
        }
        /**Método interno.
        * Crea un recorrido para una forma con id "poligono". Registra líneas entre cada vértice del polígono.
        */
        pathPoligono(forma) {
            this.context.beginPath();
            this.context.moveTo(Math.round(forma.verticesTransformados[0].x), Math.round(forma.verticesTransformados[0].y));
            for (let vertice of forma.verticesTransformados) {
                this.context.lineTo(Math.round(vertice.x), Math.round(vertice.y));
            }
            this.context.closePath();
        }
        /**Método interno.
        * Crea un recorrido para una forma con id "linea". Registra una línea entre los dos vértices.
        */
        pathLinea(forma) {
            this.context.beginPath();
            this.context.moveTo(Math.round(forma.verticesTransformados[0].x), Math.round(forma.verticesTransformados[0].y));
            for (let vertice of forma.verticesTransformados) {
                this.context.lineTo(Math.round(vertice.x), Math.round(vertice.y));
            }
        }
    }

    /**MÓDULO DE RENDERIZADO
     * Extiende las funciones de Dibujante.
     * Permite trabajar con conjuntos de formas y sobre el canvas.
     * Se instancia usando el canvas.
     */
    class Renderizado extends Dibujante {
        constructor(canvas) {
            super(canvas.getContext("2d"));
            this._anchoCanvas = 500;
            this._altoCanvas = 500;
            this._colorFondo = 'black';
            this.canvas = canvas;
            this.canvas.style.backgroundColor = this._colorFondo;
            this.canvas.width = this._anchoCanvas;
            this.canvas.height = this._altoCanvas;
        }
        /**Retorna la medida horizontal del canvas.*/
        get anchoCanvas() {
            return this._anchoCanvas;
        }
        /**Retorna la media vertical del canvas. */
        get altoCanvas() {
            return this._altoCanvas;
        }
        /**Retorna un punto ubicado en el centro del canvas.*/
        get centroCanvas() {
            return { x: this.anchoCanvas / 2, y: this.altoCanvas / 2 };
        }
        /**Retorna el color del canvas.*/
        get colorCanvas() {
            return this._colorFondo;
        }
        /**Modifica la medida horizontal del canvas.*/
        set anchoCanvas(ancho) {
            this._anchoCanvas = ancho;
            this.canvas.width = this._anchoCanvas;
        }
        /**Modifica la medida vertical del canvas. */
        set altoCanvas(alto) {
            this._altoCanvas = alto;
            this.canvas.height = this._altoCanvas;
        }
        /**Modifica el color del canvas.*/
        set colorCanvas(color) {
            this._colorFondo = color;
            this.canvas.style.backgroundColor = this._colorFondo;
        }
        /**Retorna una instancia de renderizado usando como parámetro el id de un canvas presente en el documento HTML. */
        static crearConIdCanvas(idCanvas) {
            const CANVAS = document.getElementById(idCanvas);
            let nuevoRenderizador = new Renderizado(CANVAS);
            return nuevoRenderizador;
        }
        /**Retorna una instancia de renderizado usando como parámetro el canvas presente en el documento HTML. */
        static crearConCanvas(canvas) {
            const nuevoRender = new Renderizado(canvas);
            return nuevoRender;
        }
        /**Traza un conjunto de formas.*/
        trazarFormas(formas) {
            for (let forma of formas) {
                forma.trazar(this);
            }
        }
        /**Rellena un conjunto de formas.*/
        rellenarFormas(formas) {
            for (let forma of formas) {
                forma.rellenar(this);
            }
        }
        /**Rellena y/o traza, según el caso, un conjunto de formas.*/
        renderizarFormas(formas) {
            for (let forma of formas) {
                if (forma.trazada) {
                    this.trazar(forma);
                    // forma.trazar(this);
                }
                if (forma.rellenada) {
                    this.rellenar(forma);
                    // forma.rellenar(this);
                }
            }
        }
        /**Borra el contenido del canvas.
         * Si se especifica opacidad, pinta el canvas completo usando como color el atributo colorCanvas y con la opacidad especificada.
         */
        limpiarCanvas(opacidad) {
            if (opacidad != undefined) {
                this.context.globalAlpha = opacidad;
                this.context.fillStyle = this._colorFondo;
                this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
                this.context.globalAlpha = this.estiloForma.opacidad;
            }
            else {
                this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            }
        }
        /**Traza las normales de una forma geométrica.*/
        trazarNormales(forma) {
            forma.normales.forEach((normal) => {
                let normalTrazable = Vector.clonar(normal);
                normalTrazable.origen = Vector.suma(forma.posicion, Vector.escalar(Vector.normalizar(normal), forma.apotema));
                this.trazarVector(normalTrazable);
            });
        }
    }

    /**Contador de tiempo, en milisegundos.
     * Su propiedad 'activo' se vuelve false cuando ha transcurrido el tiempo ingresado.
    */
    class Temporizador {
        constructor(duracionMilisegundos) {
            this.tiempoInicial = Date.now();
            this.activo = true;
            this.duracion = duracionMilisegundos;
            setTimeout(() => this.activo = false, this.duracion);
        }
        /**Retorna el tiempo, en milisegundos, transcurrido desde la creación del temporizador.*/
        get tiempoTranscurrido() {
            return Date.now() - this.tiempoInicial;
        }
    }

    class Tiempo {
        constructor() {
            this._tiempoInicial = Date.now();
            this.temporizadores = [];
        }
        /**Retorna el número de temporizadores activos.*/
        get numeroTemporizadores() {
            return this.temporizadores.length;
        }
        /**Retorna el momento en milisegundos de la instanciación de este objeto.*/
        get tiempoInicial() {
            return this._tiempoInicial;
        }
        /**Retorna el tiempo en milisegundos transcurrido desde la última vez que se consultó .delta.
         * Si no se lo ha consultado antes, retorna el tiempo transcurrido desde la instanciación del objeto Tiempo.
        */
        get delta() {
            if (!this.tiempoPrevio) {
                this.tiempoPrevio = Date.now();
            }
            this.tiempoActual = Date.now();
            let delta = this.tiempoActual - this.tiempoPrevio;
            this.tiempoPrevio = this.tiempoActual;
            return delta;
        }
        /**Ejecuta una función un número determinado de veces por segundo.*/
        iterarPorSegundo(funcion, numeroIteraciones) {
            const periodo = 1000 / numeroIteraciones;
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
        crearTemporizador(tiempoMilisegundos) {
            const temporizador = new Temporizador(tiempoMilisegundos);
            this.temporizadores.push(temporizador);
            return temporizador;
        }
        /**Elimina del registro de temporizadores aquellos que estén inactivos.*/
        actualizarTemporizadores() {
            let indiceInactivo = this.temporizadores.findIndex((temporizador) => temporizador.activo == false);
            if (indiceInactivo != -1) {
                this.temporizadores.splice(indiceInactivo, 1);
            }
        }
    }

    //Junta los cuerpos, interacciones, entorno, casos límite y renderizado.
    //Debería estar acá la creación de canvas y contexto??
    class Composicion {
        constructor(canvas, idCanvas) {
            /**Conjunto de cuerpos sobre los que trabaja la composición.*/
            this.cuerpos = [];
            /**Conjunto de formas sobre las que trabaja la composición.*/
            this.formas = [];
            this.contenedores = [];
            this._entorno = undefined;
            this.fps = 60;
            this.usarfpsNativos = false;
            this.tick = 50;
            this.animar = true;
            if (canvas) {
                this.render = Renderizado.crearConCanvas(canvas);
            }
            else {
                this.render = Renderizado.crearConIdCanvas(idCanvas);
            }
        }
        set entorno(entorno) {
            this._entorno = entorno;
        }
        get entorno() {
            return this._entorno;
        }
        /**Retorna un objeto de tipo Composicion a partir del id de un canvas.*/
        static crearConIDCanvas(idCanvas) {
            const nuevaCompo = new Composicion(undefined, idCanvas);
            return nuevaCompo;
        }
        /**Retorna un objeto de tipo Composicion a partir de un canvas.*/
        static crearConCanvas(canvas) {
            const nuevaCompo = new Composicion(canvas);
            return nuevaCompo;
        }
        /**Define el ancho y el alto del canvas, en pixeles. */
        tamanoCanvas(ancho, alto) {
            this.render.anchoCanvas = ancho;
            this.render.altoCanvas = alto;
        }
        /**Agrega cuerpos al conjunto de cuerpos manipulados por la composición. */
        agregarCuerpos(...cuerpos) {
            this.cuerpos.push(...cuerpos);
        }
        /**Actualiza la posición del conjunto de cuerpos sumando la velocidad instantánea a la posición.*/
        moverCuerpos() {
            this.cuerpos.forEach((cuerpo) => cuerpo.mover());
        }
        /**Calcula la colisión entre los cuerpos de la composición y resuelve sus choques como choques elásticos.*/
        reboteElasticoCuerpos() {
            Interaccion.reboteEntreCuerpos(this.cuerpos);
        }
        /**Calcula la colisión entre los cuerpos de la composición y evita que los cuerpos se solapen.*/
        contactoSimpleCuerpos() {
            Interaccion.contactoSimple(this.cuerpos);
        }
        /**Método gráfico. Pinta el interior de los cuerpos de la composición en el canvas.*/
        rellenarCuerpos() {
            this.render.rellenarFormas(this.cuerpos);
        }
        /**Método gráfico. Traza los cuerpos de la composición en el canvas.*/
        trazarCuerpos() {
            this.render.trazarFormas(this.cuerpos);
        }
        /**Método gráfico. Pinta y/o rellena los cuerpos de la composición, según lo definido para cada cuerpo.*/
        renderizarCuerpos() {
            this.render.renderizarFormas(this.cuerpos);
        }
        /**Método gráfico. Pinta y/o rellena las formas de la composición, según lo definido para cada forma.*/
        renderizarFormas() {
            this.render.renderizarFormas(this.formas);
        }
        /**Crea un loop para ejecutar dos funciones, una asociada a la duración de cada tick y otra a los fps.
         * El atributo .tick permite cambiar su duración en milisegundos.
         * La propiedad .fps permite ajustar su número.
         */
        animacion(funcionCalcular, funcionRenderizar) {
            let tiempoCalculo = new Tiempo();
            let tiempoFrame = new Tiempo();
            const funcionAnimar = () => {
                if (this.animar && !this.usarfpsNativos) {
                    tiempoCalculo.iterarPorSegundo(funcionCalcular, 1000 / this.tick);
                    tiempoFrame.iterarPorSegundo(funcionRenderizar, this.fps);
                }
                else if (this.animar && this.usarfpsNativos) {
                    tiempoCalculo.iterarPorSegundo(funcionCalcular, 1000 / this.tick);
                    funcionRenderizar();
                }
                requestAnimationFrame(funcionAnimar);
            };
            funcionAnimar();
        }
        bordesEntornoInfinitos(entorno) {
            this.cuerpos.forEach((cuerpo) => {
                cuerpo.posicion = entorno.envolverBorde(cuerpo.posicion);
            });
        }
        limitarVelocidad(magnitudVelMaxima) {
            this.cuerpos.forEach((cuerpo) => {
                cuerpo.velocidad = Restriccion.limitarVelocidad(cuerpo, magnitudVelMaxima);
            });
        }
    }

    //Tengo que integrar un modo de recibir eventos de hardware
    class ManejadorEventos {
        /**Agrega un eventListener para eventos de teclado. Recibe una función callback y opcionalmente un parámetro si la función lo requiere.*/
        static eventoTeclado(tipoEvento, tecla, manejarEvento, parametro) {
            document.addEventListener(tipoEvento, (evento) => {
                if (evento.key == CODIGOSTECLA[tecla]) {
                    manejarEvento(parametro);
                }
            });
        }
        /**Agrega un eventListener para eventos de teclado tipo keyup. Recibe una función callback y opcionalmente un parámetro si la función lo requiere.*/
        static eventoKeyup(tecla, manejarEvento, parametro) {
            ManejadorEventos.eventoTeclado('keyup', tecla, manejarEvento, parametro);
        }
        /**Agrega un eventListener para eventos de teclado tipo keydown. Recibe una función callback y opcionalmente un parámetro si la función lo requiere.*/
        static eventoKeydown(tecla, manejarEvento, parametro) {
            ManejadorEventos.eventoTeclado('keydown', tecla, manejarEvento, parametro);
        }
        /**Agrega un eventListener para eventos de teclado tipo keypress. Recibe una función callback y opcionalmente un parámetro si la función lo requiere.*/
        static eventoKeypress(tecla, manejarEvento, parametro) {
            ManejadorEventos.eventoTeclado('keypress', tecla, manejarEvento, parametro);
        }
        /**Agrega un eventListener para eventos de mouse y para trabajar con las propiedades del evento.
         * Recibe una función callback y opcionalmente un parámetro si la función lo requiere.*/
        static eventoMouseEnCanvas(tipoEvento, canvas, manejarEvento, parametro) {
            canvas.addEventListener(tipoEvento, (evento) => {
                if (parametro != undefined) {
                    manejarEvento(evento, parametro);
                }
                else {
                    manejarEvento(evento, undefined);
                }
            });
        }
        /**Agrega un eventListener para detectar cambios en el mouse, mas no trabaja con el evento.
         * Recibe una función callback y opcionalmente un parámetro si la función lo requiere.*/
        static mouseEnCanvas(tipoEvento, canvas, manejarEvento, parametro) {
            canvas.addEventListener(tipoEvento, () => {
                if (parametro != undefined) {
                    manejarEvento(parametro);
                }
                else {
                    manejarEvento(undefined);
                }
            });
        }
        /**Previene que se activen acciones por defecto al presionar la tecla definida. */
        static anularAccionPorDefecto(tecla) {
            document.addEventListener('keydown', (event) => {
                if (event.key == CODIGOSTECLA[tecla]) {
                    event.preventDefault();
                }
            });
        }
    }
    /**Constante que almacena los códigos de eventos de teclado.*/
    const CODIGOSTECLA = {
        espacio: " ",
        enter: 'Enter',
        arriba: 'ArrowUp',
        abajo: 'ArrowDown',
        izquierda: 'ArrowLeft',
        derecha: 'ArrowRight',
        a: 'a',
        b: 'b',
        c: 'c',
        d: 'd',
        e: 'e',
        f: 'f',
        g: 'g',
        h: 'h',
        i: 'i',
        j: 'j',
        k: 'k',
        l: 'l',
        m: 'm',
        n: 'n',
        ñ: 'ñ',
        o: 'o',
        p: 'p',
        q: 'q',
        r: 'r',
        s: 's',
        t: 't',
        u: 'u',
        v: 'v',
        w: 'w',
        x: 'x',
        y: 'y',
        z: 'z',
        mas: '+',
        menos: '-',
    };

    const COMPO = Composicion.crearConIDCanvas('canvas');
    const RENDER = COMPO.render;
    COMPO.tamanoCanvas(500, 500);
    RENDER.colorCanvas = Renderizado.colorHSL(250, 50, 0);
    const ENTORNO = Entorno.crearEntornoCanvas(RENDER.canvas);
    //COLORES
    const ColorRojas = Renderizado.colorHSL(0, 100, 50);
    const ColorAmarillas = Renderizado.colorHSL(45, 90, 90);
    //PARTICULAS
    const RADIO_AMARILLAS = 3;
    const NUMERO_AMARILLAS = 400;
    const RADIO_ROJAS = 3;
    const NUMERO_ROJAS = 300;
    //PARTICULAS AMARILLAS
    let IdentificadorParticula = 1;
    const COLOR_AMARILLAS = ColorAmarillas;
    const ParticulasAmarillas = [];
    for (let i = 0; i < NUMERO_AMARILLAS; i++) {
        const AleatorioX = Matematica.aleatorioEntero(1, RENDER.anchoCanvas);
        const AleatorioY = Matematica.aleatorioEntero(1, RENDER.altoCanvas);
        const Amarilla = Cuerpo.circunferencia(AleatorioX, AleatorioY, RADIO_AMARILLAS);
        Amarilla.estiloGrafico = {
            colorRelleno: COLOR_AMARILLAS,
            trazada: false,
        };
        Amarilla.id = IdentificadorParticula;
        ParticulasAmarillas.push(Amarilla);
        IdentificadorParticula++;
    }
    //PARTICULAS ROJAS
    const COLOR_ROJAS = ColorRojas;
    const ParticulasRojas = [];
    for (let i = 0; i < NUMERO_ROJAS; i++) {
        const AleatorioX = Matematica.aleatorioEntero(1, RENDER.anchoCanvas);
        const AleatorioY = Matematica.aleatorioEntero(1, RENDER.altoCanvas);
        const Roja = Cuerpo.circunferencia(AleatorioX, AleatorioY, RADIO_ROJAS);
        Roja.estiloGrafico = {
            colorRelleno: COLOR_ROJAS,
            trazada: false,
        };
        Roja.id = IdentificadorParticula;
        ParticulasRojas.push(Roja);
        IdentificadorParticula++;
    }
    //MAGNITUD INTERACCIONES
    const RojaRoja = 0.006;
    const RojaAmarilla = 0.032;
    const AmarilloAmarillo = 0.019;
    const AmarilloRojo = -0.02;
    //FUNCIONES INTERACCIONES
    const DISTANCIA_INTERACCION = 50;
    const DISTANCIA_REPELER = 8;
    const MAGNITUD_REPELER = 0.5;
    //INTEGRACIÓN DE CUERPOS A COMPOSICIÓN
    COMPO.agregarCuerpos(...ParticulasRojas, ...ParticulasAmarillas);
    COMPO.entorno = ENTORNO;
    COMPO.entorno.agregarCuerposContenidos(...ParticulasRojas, ...ParticulasAmarillas);
    //EJECUCIÓN DE INTERACCIONES
    function interaccionEnRango(particula, otraParticula) {
        let interaccionEspecifica;
        let distanciaEntreParticulas = Geometria.distanciaEntrePuntos(particula.posicion, otraParticula.posicion);
        if (particula.id != otraParticula.id && distanciaEntreParticulas < DISTANCIA_INTERACCION) {
            interaccionEspecifica = determinarInteraccion(particula, otraParticula);
            if (distanciaEntreParticulas < DISTANCIA_REPELER) {
                let repulsion = MAGNITUD_REPELER * ((DISTANCIA_REPELER - distanciaEntreParticulas) / DISTANCIA_REPELER);
                let aceleracionCercana = Fuerza.repeler(particula, otraParticula, repulsion);
                particula.aceleracion = Vector.suma(particula.aceleracion, aceleracionCercana);
            }
            else {
                let magnitudInteraccion;
                if (distanciaEntreParticulas < ((DISTANCIA_INTERACCION - DISTANCIA_REPELER) / 2 + DISTANCIA_REPELER)) {
                    magnitudInteraccion = interaccionEspecifica * (distanciaEntreParticulas - DISTANCIA_REPELER) / (DISTANCIA_INTERACCION - DISTANCIA_REPELER);
                }
                else {
                    magnitudInteraccion = interaccionEspecifica * (1 - (distanciaEntreParticulas - DISTANCIA_REPELER) / (DISTANCIA_INTERACCION - DISTANCIA_REPELER));
                }
                let aceleracion = Fuerza.atraer(particula, otraParticula, magnitudInteraccion);
                particula.aceleracion = Vector.suma(particula.aceleracion, aceleracion);
            }
        }
    }
    function determinarInteraccion(particula, otraParticula) {
        if (particula.colorRelleno == COLOR_ROJAS && otraParticula.colorRelleno == COLOR_ROJAS) {
            return RojaRoja;
        }
        else if (particula.colorRelleno == COLOR_AMARILLAS && otraParticula.colorRelleno == COLOR_AMARILLAS) {
            return AmarilloAmarillo;
        }
        else if (particula.colorRelleno == COLOR_ROJAS && otraParticula.colorRelleno == COLOR_AMARILLAS) {
            return RojaAmarilla;
        }
        else {
            return AmarilloRojo;
        }
    }
    //NUEVO CUADRO
    COMPO.tick = 10;
    COMPO.fps = 3;
    COMPO.usarfpsNativos = true;
    //ANIMAR
    COMPO.animacion(() => {
        let Quad = new QuadTree(0, 0, RENDER.anchoCanvas, RENDER.altoCanvas, 10, 5);
        COMPO.cuerpos.forEach(cuerpo => Quad.insertarPunto(cuerpo.posicion, cuerpo));
        COMPO.cuerpos.forEach(cuerpo => {
            cuerpo.aceleracion = Vector.cero();
            cuerpo.velocidad = Vector.suma(cuerpo.velocidad, Vector.crear(Matematica.aleatorio(-0.1, 0.1), Matematica.aleatorio(-0.1, 0.1)));
            let puntosEnRango = Quad.puntosEnRango(cuerpo.posicion.x - DISTANCIA_INTERACCION, cuerpo.posicion.x + DISTANCIA_INTERACCION, cuerpo.posicion.y - DISTANCIA_INTERACCION, cuerpo.posicion.y + DISTANCIA_INTERACCION);
            for (let punto of puntosEnRango) {
                if (punto.contenido instanceof Cuerpo) {
                    interaccionEnRango(cuerpo, punto.contenido);
                }
            }
        });
        Quad.contactoSimpleCuerpos();
        COMPO.moverCuerpos();
        COMPO.entorno.rebotarCircunferenciasConBorde();
        // COMPO.bordesEntornoInfinitos(COMPO.entorno)
        COMPO.cuerpos.forEach(cuerpo => cuerpo.velocidad = Vector.escalar(cuerpo.velocidad, 0.9));
        Quad.contactoSimpleCuerpos();
        // console.log((Date.now() - tiempoActual))
        // console.log((Date.now() - tiempoInicio) / contadorCalculos)
        // contadorCalculos++
        // if (contadorCalculos > 25) {
        //     console.log('------------------------------------------')
        //     contadorCalculos = 1
        //     tiempoInicio = Date.now()
        // }
    }, () => {
        RENDER.limpiarCanvas();
        COMPO.renderizarCuerpos();
    });
    ManejadorEventos.mouseEnCanvas('click', COMPO.render.canvas, () => COMPO.animar = !COMPO.animar);

})();
