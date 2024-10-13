import { QuadTree } from "./Fuente/Interaccion/QuadTree.js";
import { Composicion, Cuerpo, Entorno, Fuerza, Geometria, Grabador, ManejadorEventos, Matematica, Punto, Renderizado, Vector } from "./Fuente/mui.js";

const COMPO: Composicion = Composicion.crearConIDCanvas('canvas');
const RENDER: Renderizado = COMPO.render;
COMPO.tamanoCanvas(800, 800);
RENDER.colorCanvas = Renderizado.colorHSL(250, 50, 0)
const ENTORNO: Entorno = Entorno.crearEntornoCanvas(RENDER.canvas)

//COLORES
const ColorRojas: string = Renderizado.colorHSL(0, 100, 50)
const ColorAmarillas: string = Renderizado.colorHSL(45, 90, 90)

//PARTICULAS
const RADIO_AMARILLAS: number = 4;
const NUMERO_AMARILLAS: number = 400;

const RADIO_ROJAS: number = 4;
const NUMERO_ROJAS: number = 150;

//PARTICULAS AMARILLAS
let IdentificadorParticula: number = 1;
const COLOR_AMARILLAS: string = ColorAmarillas
const ParticulasAmarillas: Cuerpo[] = []
for (let i: number = 0; i < NUMERO_AMARILLAS; i++) {
    const AleatorioX: number = Matematica.aleatorioEntero(1, RENDER.anchoCanvas)
    const AleatorioY: number = Matematica.aleatorioEntero(1, RENDER.altoCanvas)
    const Amarilla: Cuerpo = Cuerpo.circunferencia(AleatorioX, AleatorioY, RADIO_AMARILLAS);
    Amarilla.estiloGrafico = {
        colorRelleno: COLOR_AMARILLAS,
        trazada: false,
    }
    Amarilla.id = IdentificadorParticula;
    ParticulasAmarillas.push(Amarilla);
    IdentificadorParticula++;
}

//PARTICULAS ROJAS
const COLOR_ROJAS: string = ColorRojas
const ParticulasRojas: Cuerpo[] = []
for (let i: number = 0; i < NUMERO_ROJAS; i++) {
    const AleatorioX: number = Matematica.aleatorioEntero(1, RENDER.anchoCanvas)
    const AleatorioY: number = Matematica.aleatorioEntero(1, RENDER.altoCanvas)
    const Roja: Cuerpo = Cuerpo.circunferencia(AleatorioX, AleatorioY, RADIO_ROJAS);
    Roja.estiloGrafico = {
        colorRelleno: COLOR_ROJAS,
        trazada: false,
    }
    Roja.id = IdentificadorParticula;
    ParticulasRojas.push(Roja);
    IdentificadorParticula++;
}


//MAGNITUD INTERACCIONES
const RojaRoja: number = 0.0001;
const RojaAmarilla: number = 0.002;

const AmarilloAmarillo: number = 0.0008;
const AmarilloRojo: number = -0.006;

//FUNCIONES INTERACCIONES
const DISTANCIA_INTERACCION: number = 100;
const DISTANCIA_REPELER_MISMO_COLOR: number = 8;
const MAGNITUD_REPELER_MISMO_COLOR: number = 0.3;
const MAGNITUD_VELOCIDAD_MAXIMA: number = 1;

//INTEGRACIÓN DE CUERPOS A COMPOSICIÓN
COMPO.agregarCuerpos(...ParticulasRojas, ...ParticulasAmarillas)
COMPO.entorno = ENTORNO;
COMPO.entorno.agregarCuerposContenidos(...ParticulasRojas, ...ParticulasAmarillas)


//EJECUCIÓN DE INTERACCIONES
function interaccionEnRango(particula: Cuerpo, otraParticula: Cuerpo): void {
    let magnitudInteraccion: number;
    let mismoColor: boolean = false;
    if (particula.id != otraParticula.id && Geometria.distanciaEntrePuntos(particula.posicion, otraParticula.posicion) < DISTANCIA_INTERACCION) {
        if (particula.colorRelleno == COLOR_ROJAS && otraParticula.colorRelleno == COLOR_ROJAS) {
            magnitudInteraccion = RojaRoja;
            mismoColor = true;
        }
        else if (particula.colorRelleno == COLOR_AMARILLAS && otraParticula.colorRelleno == COLOR_AMARILLAS) {
            magnitudInteraccion = AmarilloAmarillo;
            mismoColor = true;
        }
        else if (particula.colorRelleno == COLOR_ROJAS && otraParticula.colorRelleno == COLOR_AMARILLAS) {
            magnitudInteraccion = RojaAmarilla;
        }
        else {
            magnitudInteraccion = AmarilloRojo;

        }
        if (mismoColor) {
            if (Geometria.distanciaEntrePuntos(particula.posicion, otraParticula.posicion) < DISTANCIA_REPELER_MISMO_COLOR) {
                let aceleracionCercana: Vector = Fuerza.repeler(particula, otraParticula, MAGNITUD_REPELER_MISMO_COLOR)
                particula.aceleracion = Vector.suma(particula.aceleracion, aceleracionCercana)
            }
            else {
                let aceleracion: Vector = magnitudInteraccion > 0 ? Fuerza.atraer(particula, otraParticula, magnitudInteraccion) : Fuerza.repeler(particula, otraParticula, Math.abs(magnitudInteraccion))
                particula.aceleracion = Vector.suma(particula.aceleracion, aceleracion)
            }
        }
        else {
            let aceleracion: Vector = magnitudInteraccion > 0 ? Fuerza.atraer(particula, otraParticula, magnitudInteraccion) : Fuerza.repeler(particula, otraParticula, Math.abs(magnitudInteraccion))
            particula.aceleracion = Vector.suma(particula.aceleracion, aceleracion)
        }
    }
}

//NUEVO CUADRO
COMPO.tick = 10;
COMPO.fps = 3;
COMPO.usarfpsNativos = true;

//GRABAR
// Grabador.grabarCanvas(RENDER.canvas, 120000, 20, 'descarga')
let contadorCalculos: number = 1;
let tiempoInicio: number = Date.now()
//ANIMAR
COMPO.animacion(() => {
    let tiempoActual: number = Date.now()
    let Quad: QuadTree = new QuadTree(0, 0, RENDER.anchoCanvas, RENDER.altoCanvas, 10);
    COMPO.cuerpos.forEach(cuerpo => Quad.insertarPunto(cuerpo.posicion, cuerpo));
    COMPO.cuerpos.forEach(cuerpo => {
        cuerpo.aceleracion = Vector.cero()
        // cuerpo.aceleracion = Vector.escalar(cuerpo.aceleracion, 0.8)
        let puntosEnRango: Punto[] = Quad.puntosEnRango(cuerpo.posicion.x - DISTANCIA_INTERACCION, cuerpo.posicion.x + DISTANCIA_INTERACCION, cuerpo.posicion.y - DISTANCIA_INTERACCION, cuerpo.posicion.y + DISTANCIA_INTERACCION);
        for (let punto of puntosEnRango) {
            if (punto.contenido instanceof Cuerpo) {
                interaccionEnRango(cuerpo, punto.contenido)
            }
        }
    })
    Quad.colisionCuerpos()
    COMPO.entorno.rebotarCircunferenciasConBorde()
    // COMPO.bordesEntornoInfinitos(COMPO.entorno)
    COMPO.limitarVelocidad(MAGNITUD_VELOCIDAD_MAXIMA)
    COMPO.moverCuerpos()
    // Quad.colisionCuerpos()
    console.log((Date.now() - tiempoActual))
    // console.log((Date.now() - tiempoInicio) / contadorCalculos)
    // contadorCalculos++
    // if (contadorCalculos > 100) {
    //     console.log('------------------------------------------')
    //     contadorCalculos = 1
    //     tiempoInicio = Date.now()
    // }
}, () => {
    RENDER.limpiarCanvas();
    COMPO.renderizarCuerpos();
})

ManejadorEventos.mouseEnCanvas('click', COMPO.render.canvas, () => COMPO.animar = !COMPO.animar)