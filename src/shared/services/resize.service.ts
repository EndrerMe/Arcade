export class Resize {
    constructor(
    ) { }

    public static resizeScene(canvas) {
        const origin = {
            width: 1280,
            height: 720,
        };
        const saveZone = origin.width * 0.20;
        const ratio = origin.height / origin.width;
        const clientWidth = window.innerWidth;
        const clientHeight = window.innerHeight;
        const width = clientHeight / ratio; 
        const left = (width - window.innerWidth) / 2;
        
        if ((origin.width - saveZone) < clientWidth) {
            canvas.width = width;
            canvas.height = clientHeight;
            canvas.view.style.left = `-${left}px`
        } else {
            canvas.view.style.width = `${clientWidth}px`;
            canvas.view.style.left = `0px`
        }

        // canvas.resize(Math.ceil(origin.width / ratio), Math.ceil(origin.height / ratio));

        // const clientWidth = window.innerWidth;
        // const clientHeight = window.innerHeight;
        // const width = clientHeight / ratio;
        // const left = ~~(window.innerWidth - width) / 2;
        // canvas.view.width = width;    
        // canvas.view.style.width = `${width}px`
        // canvas.view.style.left = `${left}px`
    }
}