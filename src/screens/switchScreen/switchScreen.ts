// Vendors
import * as PIXI from 'pixi.js';

export abstract class SwitchScreen {
    public menuScreen: PIXI.Container;
    public mainScreen: PIXI.Container;
    public app: PIXI.Application

    constructor(
       app: PIXI.Application
    ) {
        this.app = app;
    }

    // public initMenu(): void {
    //     this.menuScreen = new PIXI.Container();
    //     this.app.stage.addChild(this.menuScreen);
    // }

    // public initScreens(): void {
    //     this.menuScreen = new PIXI.Container();
    //     this.mainScreen = new PIXI.Container();

    //     this.mainScreen.visible = false;

    //     this.app.stage.addChild(this.menuScreen);
    //     this.app.stage.addChild(this.mainScreen);

    //     this.menu = new Menu(this.app, this.menuScreen);
    //     this.menu.screenSetup();

    //     this.watchButtonPress();
    // }

    // private watchButtonPress(): void {
    //     this.menu.isGameStart.subscribe((res: {name: string}) => {
    //         if (res && res.name === 'start') {
    //             this.main = new Main(this.app, this.mainScreen, this.scene);
    //             this.main.init();
    //             this.menuScreen.visible = false;
    //             this.mainScreen.visible = true;
    //         }
    //     })
    // }
}