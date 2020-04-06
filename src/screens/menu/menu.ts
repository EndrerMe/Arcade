// Vendors
import * as PIXI from 'pixi.js';
import { Subject } from 'rxjs';
import {Howl} from 'howler';

// Services
import { LoaderService } from 'shared/services';
import { SwitchScreen } from 'screens';

export class Menu extends SwitchScreen {
    // public isGameStart: Subject<{name: string, isComplite: boolean}> = new Subject();
    // private buttons: Array<{name: string, button: PIXI.Text}> = [];
    // private loaderService: LoaderService;
    // private backgroundMusic: Howl;
    public scene: HTMLElement;

    constructor(
        app: PIXI.Application,
        scene: HTMLElement,
    ) {
        super(app);
        this.scene = scene;
    }

    public init(): void {

    }

    // public screenSetup(): void {
    //     this.loaderService = new LoaderService(this.app);
    //     this.loaderService.loadMenuAssets();
    //     this.loaderService.isCompliteMenu.subscribe((res) => {
    //         if (res) {
    //             const redRect = new PIXI.Graphics();
    //             redRect.beginFill(0xc9c9c9);
    //             redRect.drawRect(0, 0, this.app.view.width, this.app.view.height);
                
    //             this.menuScreen.addChild(redRect);
    //             this.menuScreenTitle();
    //             // this.buttonsMenuScreen();
    //             // this.initMusic();
    //         }
    //     })
    // }

    // private menuScreenTitle(): void {
    //     const text = new PIXI.Text('Arcade Game!');
    //     text.anchor.set(0.5);
    //     text.x = this.app.view.width / 2;
    //     text.y = 100;
    //     text.style = new PIXI.TextStyle({
    //         fill: 0x000000,
    //         fontSize: 40,
    //         fontFamily: 'Arial',
    //         fontStyle: 'bold',
    //     });

    //     this.menuScreen.addChild(text);
    // }

    // private buttonsMenuScreen(): void {
    //     const start = new PIXI.Text('Start Game!');
    //     start.anchor.set(0.5);
    //     start.x = this.app.view.width / 2;
    //     start.y = this.app.view.height / 2;
    //     start.buttonMode = true;
    //     start.interactive = true;
    //     start.style = new PIXI.TextStyle({
    //         fill: 0x000000,
    //         fontSize: 30,
    //         fontFamily: 'Arial',
    //         fontStyle: 'bold',
    //     })

    //     start
    //     .on('pointerover', (e): void => {
    //         this.onButtonOver(e, {name: 'start'})
    //     })
    //     .on('pointerout', (e): void => {
    //         this.onButtonOut(e, {name: 'start'})
    //     })
    //     .on('pointerdown', (): void => {
    //         this.startGame();
    //     });

    //     this.buttons.push({
    //         name: 'start',
    //         button: start,
    //     });
    //     this.menuScreen.addChild(start);
    // }

    // private initMusic(): void {
    //     this.backgroundMusic = new Howl({
    //         src: [this.app.loader.resources.background_music.url],
    //         volume: 0.4,
    //         loop: true,
    //     });

    //     // this.backgroundMusic.play();
    // }

    // private startGame(): void {
    //     this.backgroundMusic.stop();
    //     this.loaderService.loadGameAssets();
    //     this.loaderService.isCompliteMain.subscribe((res: boolean) => {
    //         if (res) {
    //             this.isGameStart.next({name: 'start', isComplite: true})
    //         }
    //     })
    // }

    // private onButtonOut(e, name: {name: string}): void {
    //     this.changeButtonFontSize(name.name, 30)
    // }

    // private onButtonOver = (e: any, name: {name: string}): void => {
    //     this.changeButtonFontSize(name.name, 35)
    // }

    // private changeButtonFontSize(name: string, size: number): void {
    //     let button: PIXI.Text;

    //     for (let i = 0; i < this.buttons.length; i++) {
    //         if (this.buttons[i].name === name) {
    //             button = this.buttons[i].button;
    //             continue;
    //         }
    //     }

    //     button.style.fontSize = size;
    // }
}