// Vendors
import { Subject } from 'rxjs';

// Screens
import { SwitchScreen } from 'screens/switchScreen/switchScreen';

export class Menu extends SwitchScreen {
    private buttons: Array<{name: string, button: PIXI.Text}> = [];
    public scene: HTMLElement;
    public isSettingsOn: Subject<boolean> = new Subject();

    constructor(
        app: PIXI.Application,
        scene: HTMLElement,
    ) {
        super(app);
        this.scene = scene;
    }

    public init(): void {
        this.initMenu();
        this.screenOptions();
        this.initLoader();
    }

    public screenOptions(): void {
        const menuGraphicts = new PIXI.Graphics();
        menuGraphicts.beginFill(0xc9c9c9);
        menuGraphicts.drawRect(0, 0, this.app.view.width, this.app.view.height);
        
        this.menuScreen.addChild(menuGraphicts);
        this.menuScreenTitle();
        this.buttonsMenuScreen();
    }

    private menuScreenTitle(): void {
        const text = new PIXI.Text('Arcade Game!');
        text.anchor.set(0.5);
        text.x = this.app.view.width / 2;
        text.y = 100;
        text.style = new PIXI.TextStyle({
            fill: 0x000000,
            fontSize: 40,
            fontFamily: 'Arial',
            fontStyle: 'bold',
        });

        this.menuScreen.addChild(text);
    }

    private buttonsMenuScreen(): void {
        const start = new PIXI.Text('Start Game!');
        start.anchor.set(0.5);
        start.x = this.app.view.width / 2;
        start.y = this.app.view.height / 2;
        start.buttonMode = true;
        start.interactive = true;
        start.style = new PIXI.TextStyle({
            fill: 0x000000,
            fontSize: 30,
            fontFamily: 'Arial',
            fontStyle: 'bold',
        })

        start
        .on('pointerover', (e): void => {
            this.onButtonOver(e, {name: 'start'})
        })
        .on('pointerout', (e): void => {
            this.onButtonOut(e, {name: 'start'})
        })
        .on('pointerdown', (): void => {
            this.startGame();
        });

        this.buttons.push({
            name: 'start',
            button: start,
        });
        this.menuScreen.addChild(start);
    }

    private startGame(): void {
        this.isSettingsOn.next(true);
        this.isSettingsOn.next(false);
    }

    private onButtonOut(e, name: {name: string}): void {
        this.changeButtonFontSize(name.name, 30)
    }

    private onButtonOver = (e: any, name: {name: string}): void => {
        this.changeButtonFontSize(name.name, 35)
    }

    private changeButtonFontSize(name: string, size: number): void {
        let button: PIXI.Text;

        for (let i = 0; i < this.buttons.length; i++) {
            if (this.buttons[i].name === name) {
                button = this.buttons[i].button;
                continue;
            }
        }

        button.style.fontSize = size;
    }
}