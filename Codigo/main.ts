import { QuadTree } from "./Fuente/Interaccion/QuadTree.js";
import { Composicion, Cuerpo, Entorno, Fuerza, Geometria, Grabador, ManejadorEventos, Matematica, Punto, Renderizado, Vector } from "./Fuente/mui.js";

const COMPO: Composicion = Composicion.crearConIDCanvas('canvas');
const RENDER: Renderizado = COMPO.render;
COMPO.tamanoCanvas(500, 500);
RENDER.colorCanvas = Renderizado.colorHSL(250, 50, 0)
const ENTORNO: Entorno = Entorno.crearEntornoCanvas(RENDER.canvas)

//COLORES
const ColorRojas: string = Renderizado.colorHSL(0, 100, 50)
const ColorAmarillas: string = Renderizado.colorHSL(45, 90, 90)

//PARTICULAS
const RADIO_AMARILLAS: number = 3;
const NUMERO_AMARILLAS: number = 400;

const RADIO_ROJAS: number = 3;
const NUMERO_ROJAS: number = 300;

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
const RojaRoja: number = 0.006;
const RojaAmarilla: number = 0.032;

const AmarilloAmarillo: number = 0.019;
const AmarilloRojo: number = -0.02;

//FUNCIONES INTERACCIONES
const DISTANCIA_INTERACCION: number = 50;
const DISTANCIA_REPELER: number = 8;
const MAGNITUD_REPELER: number = 0.5;
const MAGNITUD_VELOCIDAD_MAXIMA: number = 1;

//INTEGRACIÓN DE CUERPOS A COMPOSICIÓN
COMPO.agregarCuerpos(...ParticulasRojas, ...ParticulasAmarillas)
COMPO.entorno = ENTORNO;
COMPO.entorno.agregarCuerposContenidos(...ParticulasRojas, ...ParticulasAmarillas)


//EJECUCIÓN DE INTERACCIONES
function interaccionEnRango(particula: Cuerpo, otraParticula: Cuerpo): void {
    let interaccionEspecifica: number;
    let distanciaEntreParticulas: number = Geometria.distanciaEntrePuntos(particula.posicion, otraParticula.posicion)
    if (particula.id != otraParticula.id && distanciaEntreParticulas < DISTANCIA_INTERACCION) {
        interaccionEspecifica = determinarInteraccion(particula, otraParticula)
        if (distanciaEntreParticulas < DISTANCIA_REPELER) {
            let repulsion: number = MAGNITUD_REPELER * ((DISTANCIA_REPELER - distanciaEntreParticulas) / DISTANCIA_REPELER)
            let aceleracionCercana: Vector = Fuerza.repeler(particula, otraParticula, repulsion)
            particula.aceleracion = Vector.suma(particula.aceleracion, aceleracionCercana)
        }
        else {
            let magnitudInteraccion: number;
            if (distanciaEntreParticulas < ((DISTANCIA_INTERACCION - DISTANCIA_REPELER) / 2 + DISTANCIA_REPELER)) {
                magnitudInteraccion = interaccionEspecifica * (distanciaEntreParticulas - DISTANCIA_REPELER) / (DISTANCIA_INTERACCION - DISTANCIA_REPELER)
            }
            else {
                magnitudInteraccion = interaccionEspecifica * (1 - (distanciaEntreParticulas - DISTANCIA_REPELER) / (DISTANCIA_INTERACCION - DISTANCIA_REPELER))
            }
            let aceleracion: Vector = Fuerza.atraer(particula, otraParticula, magnitudInteraccion);
            particula.aceleracion = Vector.suma(particula.aceleracion, aceleracion)
        }
    }
}

function determinarInteraccion(particula: Cuerpo, otraParticula: Cuerpo): number {
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

//GRABAR
// Grabador.grabarCanvas(RENDER.canvas, 120000, 20, 'descarga')
let contadorCalculos: number = 1;
let tiempoInicio: number = Date.now()
//ANIMAR
COMPO.animacion(() => {
    let tiempoActual: number = Date.now()
    let Quad: QuadTree = new QuadTree(0, 0, RENDER.anchoCanvas, RENDER.altoCanvas, 10, 5);
    COMPO.cuerpos.forEach(cuerpo => Quad.insertarPunto(cuerpo.posicion, cuerpo));
    COMPO.cuerpos.forEach(cuerpo => {
        cuerpo.aceleracion = Vector.cero()
        cuerpo.velocidad = Vector.suma(cuerpo.velocidad, Vector.crear(Matematica.aleatorio(-0.1, 0.1), Matematica.aleatorio(-0.1, 0.1)))
        let puntosEnRango: Punto[] = Quad.puntosEnRango(cuerpo.posicion.x - DISTANCIA_INTERACCION, cuerpo.posicion.x + DISTANCIA_INTERACCION, cuerpo.posicion.y - DISTANCIA_INTERACCION, cuerpo.posicion.y + DISTANCIA_INTERACCION);
        for (let punto of puntosEnRango) {
            if (punto.contenido instanceof Cuerpo) {
                interaccionEnRango(cuerpo, punto.contenido)
            }
        }
    })
    Quad.contactoSimpleCuerpos()
    COMPO.moverCuerpos()
    COMPO.entorno.rebotarCircunferenciasConBorde()
    // COMPO.bordesEntornoInfinitos(COMPO.entorno)
    COMPO.cuerpos.forEach(cuerpo => cuerpo.velocidad = Vector.escalar(cuerpo.velocidad, 0.9))
    Quad.contactoSimpleCuerpos()
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
})

ManejadorEventos.mouseEnCanvas('click', COMPO.render.canvas, () => COMPO.animar = !COMPO.animar)