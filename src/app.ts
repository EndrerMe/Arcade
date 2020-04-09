// Vendors
import * as PIXI from 'pixi.js';
//@ts-ignore
global.PIXI = PIXI;
// Screens
import { Main } from 'screens';

// Scss
import 'app.scss'

class App {
    constructor() {
        this.init();
    }

    private init(): void {
        new Main();
    }
}

new App();