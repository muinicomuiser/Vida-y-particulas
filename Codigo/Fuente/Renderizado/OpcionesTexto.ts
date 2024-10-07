export interface OpcionesGraficasTexto {

    tamano?: number,
    /**Opciones: 'center', 'end', 'left', 'right', 'start' */
    alineacion?: CanvasTextAlign,
    fuente?: string,
    /**Valor de opacidad, entre 0 y 1.*/
    opacidad?: number,
    color?: string,
}