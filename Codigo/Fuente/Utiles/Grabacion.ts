/**Clase que permite capturar lo que se proyecte en un canvas. */
export class Grabador {
    constructor() { }

    /**Graba la animación de un canvas en formato .avi y asocia la grabación a un link de descarga en el documento HTML.        
     * Permite definir la duración de la grabación, en milisegundos, el número de FPS y la id del <anchor> HTML que iniciará la descarga.     
     * Si no se define un elemento <anchor>, el método creará uno.
     */
    static grabarCanvas(canvas: HTMLCanvasElement, milisegundos: number, fps: number, anchor?: string) {
        let chunks: BlobPart[] = []
        let videoStream = canvas.captureStream(fps);
        let mediaRecorder = new MediaRecorder(videoStream);
        mediaRecorder.ondataavailable = function (e) {
            chunks.push(e.data);
        };

        mediaRecorder.start();
        setTimeout(function () { mediaRecorder.stop(); }, milisegundos);

        mediaRecorder.onstop = function (e) {
            let blob = new Blob(chunks, { 'type': 'video/avi' });
            chunks = [];
            let videoURL = URL.createObjectURL(blob);
            let link: HTMLAnchorElement;
            if (anchor) {
                link = <HTMLAnchorElement>document.getElementById(anchor);
            }
            else {
                link = document.createElement("a");
                link.style.color = 'skyblue'
                link.innerHTML = 'Descargar'
            }
            link.href = videoURL;
            link.download = "Captura Canvas";
        }
    }
}