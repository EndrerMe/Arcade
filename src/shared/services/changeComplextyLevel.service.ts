import { ReplaySubject  } from 'rxjs';

export class ChangeComplexityLevel {
    public static newComplexityLevel: ReplaySubject<number> = new ReplaySubject()
    private static graphics: PIXI.Graphics[] = [];

    public static changeLevel(level: number, graphics: PIXI.Graphics, container: PIXI.Container): void {
        const containerChildren: PIXI.Container[] = container.children as PIXI.Container[];
        if (this.graphics.length === 0) {
            for (let i = 0; i < containerChildren.length; i++) {
                if (containerChildren[i].name === 'complexity_text_container') {
                    const offGraphics = containerChildren[i].getChildByName('complexity_text_graphics') as PIXI.Graphics;
                    offGraphics.visible = false;
                    this.graphics.push(offGraphics);
                }
            }
        } else {
            for (let i = 0; i < this.graphics.length; i++) {
                this.graphics[i].visible = false;
            }
        }
        graphics.visible = true;
        this.newComplexityLevel.next(level)
    }
}