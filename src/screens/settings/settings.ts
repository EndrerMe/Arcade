// Vendors
import { Subject } from 'rxjs';

// Screnns
import { SwitchScreen } from "screens/switchScreen/switchScreen";

// Serivices
import { SettingsMurkup, HtmlLoader } from 'shared/services';

export class Settings extends SwitchScreen {
    public isGameStart: Subject<boolean> = new Subject();
    public app: PIXI.Application;
    private scene: HTMLElement

    constructor(
        app: PIXI.Application,
        scene: HTMLElement
    ) {
        super(app);
        this.app = app;
        this.scene = scene;
    }

    public init(): void {
        this.initSetting();
        this.screenOptions();
        this.initLoader();
    }

    private screenOptions(): void {
        const menuGraphicts = new PIXI.Graphics();
        menuGraphicts.beginFill(0xc9c9c9);
        menuGraphicts.drawRect(0, 0, this.app.view.width, this.app.view.height);
        this.settingScreen.addChild(menuGraphicts);

        this.initMurkup();
    }

    private initMurkup(): void {
        const title = SettingsMurkup.createTitle(this.settingScreen.width);
        this.settingScreen.addChild(title);
        const complexityLevel = SettingsMurkup.createComplexityLevel(this.settingScreen.width);
        this.settingScreen.addChild(complexityLevel)
        const startGameBtn = SettingsMurkup.createStartGameButton(this.settingScreen.width, this.settingScreen.height);
        this.settingScreen.addChild(startGameBtn);

        this.startGame(startGameBtn);
    }

    private startGame(btn: PIXI.Text): void {
        btn.on('pointerdown', (): void => {
            HtmlLoader.toggleLoader(true);
            this.loaderService.loadGameAssets();
            this.loaderService.loadAssets().then((res) => {
                this.isGameStart.next(true);
                this.isGameStart.next(false);
                HtmlLoader.toggleLoader(false);
            })
        });
    }
}