import { Composicion, Cuerpo, Entorno, Fuerza, Geometria, Grabador, Matematica, Renderizado, Vector } from "./Fuente/mui.js";

const COMPO: Composicion = Composicion.crearConIDCanvas('canvas');
const RENDER: Renderizado = COMPO.render;
COMPO.tamanoCanvas(1080, 1080);

const ENTORNO: Entorno = Entorno.crearEntornoCanvas(RENDER.canvas)

//COLORES
const ColorAzules: string = Renderizado.colorHSL(200, 100, 40)
const ColorRojas: string = Renderizado.colorHSL(0, 100, 40)
const ColorAmarillas: string = Renderizado.colorHSL(60, 100, 90)

//PARTICULAS
const RADIO_AZULES: number = 6;
const NUMERO_AZULES: number = 100;

const RADIO_AMARILLAS: number = 6;
const NUMERO_AMARILLAS: number = 100;

const RADIO_ROJAS: number = 6;
const NUMERO_ROJAS: number = 50;

//PARTICULAS AMARILLAS
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
    ParticulasAmarillas.push(Amarilla);
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
    ParticulasRojas.push(Roja);
}

//PARTICULAS AZULES

const COLOR_AZULES: string = ColorAzules
const ParticulasAzules: Cuerpo[] = []
for (let i: number = 0; i < NUMERO_AZULES; i++) {
    const AleatorioX: number = Matematica.aleatorioEntero(1, RENDER.anchoCanvas)
    const AleatorioY: number = Matematica.aleatorioEntero(1, RENDER.altoCanvas)
    const Azul: Cuerpo = Cuerpo.circunferencia(AleatorioX, AleatorioY, RADIO_AZULES);
    Azul.estiloGrafico = {
        colorRelleno: COLOR_AZULES,
        trazada: false,
    }
    ParticulasAzules.push(Azul);
}

//MAGNITUD INTERACCIONES
const RojaRoja: number = -0.5;
const RojaAzul: number = 0.2;
const RojaAmarilla: number = 0.3;

const AzulAzul: number = 0.1;
const AzulRoja: number = -0.1;
const AzulAmarillo: number = 0.5;

const AmarilloAmarillo: number = 0.5;
const AmarilloAzul: number = 0.2;
const AmarilloRojo: number = -1;

//FUNCIONES INTERACCIONES
const DINSTANCIA_INTERACCION: number = 250;
const DISTANCIA_REPELER_MISMO_COLOR: number = 40;
const MAGNITUD_REPELER_MISMO_COLOR: number = 0.5
const MAGNITUD_VELOCIDAD_MAXIMA: number = 1;

//Reiniciar Aceleraciones
function reiniciarAceleracion(...particulas: Cuerpo[]) {
    particulas.forEach((particula) => particula.aceleracion = Vector.cero())
}

//Mismo Color
function interaccionMismoColor(Particulas: Cuerpo[], magnitud: number, magnitudRepeler: number) {
    for (let i: number = 0; i < Particulas.length - 1; i++) {
        for (let j: number = i + 1; j < Particulas.length; j++) {
            if (Geometria.distanciaEntrePuntos(Particulas[i].posicion, Particulas[j].posicion) < DINSTANCIA_INTERACCION) {
                if (Geometria.distanciaEntrePuntos(Particulas[i].posicion, Particulas[j].posicion) < DISTANCIA_REPELER_MISMO_COLOR) {
                    let aceleracion: Vector = Fuerza.repeler(Particulas[i], Particulas[j], magnitudRepeler)
                    Particulas[i].aceleracion = Vector.suma(Particulas[i].aceleracion, aceleracion)
                    Particulas[j].aceleracion = Vector.suma(Particulas[j].aceleracion, Vector.invertir(aceleracion))
                }
                else {
                    let aceleracion: Vector = magnitud > 0 ? Fuerza.atraer(Particulas[i], Particulas[j], magnitud) : Fuerza.repeler(Particulas[i], Particulas[j], Math.abs(magnitud))
                    Particulas[i].aceleracion = Vector.suma(Particulas[i].aceleracion, aceleracion)
                    Particulas[j].aceleracion = Vector.suma(Particulas[j].aceleracion, Vector.invertir(aceleracion))
                }

            }
        }
    }
}

//Distinto Color
function interaccionDinstintoColor(ParticulasUno: Cuerpo[], ParticulasDos: Cuerpo[], magnitud: number) {
    for (let i: number = 0; i < ParticulasUno.length; i++) {
        for (let j: number = 0; j < ParticulasDos.length; j++) {
            if (Geometria.distanciaEntrePuntos(ParticulasUno[i].posicion, ParticulasDos[j].posicion) < DINSTANCIA_INTERACCION) {
                let aceleracion: Vector = magnitud > 0 ? Fuerza.atraer(ParticulasUno[i], ParticulasDos[j], magnitud) : Fuerza.repeler(ParticulasUno[i], ParticulasDos[j], Math.abs(magnitud))
                ParticulasUno[i].aceleracion = Vector.suma(ParticulasUno[i].aceleracion, aceleracion)
            }
        }
    }
}


//INTEGRACIÓN DE CUERPOS A COMPOSICIÓN
COMPO.agregarCuerpos(...ParticulasAmarillas,)
COMPO.agregarCuerpos(...ParticulasRojas)
// COMPO.agregarCuerpos(...ParticulasAzules)
COMPO.entorno = ENTORNO;
COMPO.entorno.agregarCuerposContenidos(...ParticulasAmarillas)
COMPO.entorno.agregarCuerposContenidos(...ParticulasRojas)
// COMPO.entorno.agregarCuerposContenidos(...ParticulasAzules)

//EJECUCIÓN DE INTERACCIONES
function interaccionParticulas() {
    reiniciarAceleracion(...ParticulasAmarillas)
    reiniciarAceleracion(...ParticulasRojas)
    // reiniciarAceleracion(...ParticulasAzules)

    //Mismo Color
    interaccionMismoColor(ParticulasAmarillas, AmarilloAmarillo, MAGNITUD_REPELER_MISMO_COLOR)
    interaccionMismoColor(ParticulasRojas, RojaRoja, MAGNITUD_REPELER_MISMO_COLOR)
    // interaccionMismoColor(ParticulasAzules, AzulAzul, MAGNITUD_REPELER_MISMO_COLOR)

    //Distinto Color
    interaccionDinstintoColor(ParticulasAmarillas, ParticulasRojas, AmarilloRojo)
    // interaccionDinstintoColor(ParticulasAmarillas, ParticulasAzules, AmarilloAzul)
    interaccionDinstintoColor(ParticulasRojas, ParticulasAmarillas, RojaAmarilla)
    // interaccionDinstintoColor(ParticulasRojas, ParticulasAzules, RojaAzul)
    // interaccionDinstintoColor(ParticulasAzules, ParticulasRojas, AzulRoja)
    // interaccionDinstintoColor(ParticulasAzules, ParticulasAmarillas, AzulAmarillo)

}

//NUEVO CUADRO
function nuevoCuadro() {

    RENDER.limpiarCanvas()
    interaccionParticulas()
    // COMPO.bordesEntornoInfinitos(ENTORNO)
    COMPO.entorno.rebotarCircunferenciasConBorde()
    COMPO.contactoSimpleCuerpos()
    COMPO.limitarVelocidad(MAGNITUD_VELOCIDAD_MAXIMA)
    COMPO.moverCuerpos()
    COMPO.renderizarCuerpos()
}

//GRABAR
// Grabador.grabarCanvas(RENDER.canvas, 50000, 60, 'descarga')
//ANIMAR
// COMPO.animacion(() => {
//     nuevoCuadro()
// })