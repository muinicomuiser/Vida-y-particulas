
export interface OpcionesGraficasForma {

    /**Color de trazado de la forma.*/
    colorTrazo?: string,
    /**Color de relleno de la forma.*/
    colorRelleno?: string,
    /**Escala de la forma. Por defecto: 1.*/
    trazada?: boolean,
    /**Determina si la forma debe ser rellenada.*/
    rellenada?: boolean,
    /**Determina el ancho de la línea trazada.*/
    grosorTrazo?: number,
    /**Determina la opacidad con que es graficada la forma. */
    opacidad?: number,
}