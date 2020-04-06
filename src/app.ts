// Vendors
import * as PIXI from 'pixi.js';

// Screens
import { Menu } from 'screens';

// Scss
import 'app.scss'

class App {
    private scene: HTMLElement = document.getElementById('gameScene');
    public app!: PIXI.Application;

    constructor() {
        this.initApp();
    }

    private initApp(): void {
        this.app = new PIXI.Application({
            width: this.scene.offsetWidth,
            height: this.scene.offsetHeight,
        })
        this.app.stage.interactive = true;

        this.scene.appendChild(this.app.view);
        window.addEventListener('resize', this.resizeScene);
        new Menu(this.app, this.scene).init();
    }

    private resizeScene = (): void => {
        const parent: any = this.app.view.parentNode;
        this.app.renderer.resize(parent.clientWidth, parent.clientHeight);
    }
}

new App();