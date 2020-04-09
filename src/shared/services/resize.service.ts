export class Resize {
    constructor(
    ) {}

    public static resizeScene(canvas): void {
        const height = window.innerHeight;
        const proportionBasic = 720 / 1280;
        const width = height / proportionBasic;
        const left = (width - window.innerWidth) / 2;
        console.log(width)
        canvas.width = width;
        canvas.height = height;
    }
}