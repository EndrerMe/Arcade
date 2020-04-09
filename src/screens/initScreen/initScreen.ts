// Services
import { LoaderService } from 'shared/services';

export abstract class initScreen {
    public menuScreen: PIXI.Container;
    public gameScreen: PIXI.Container;
    public settingScreen: PIXI.Container;
    public app: PIXI.Application
    public loaderService: LoaderService;

    constructor(
       app: PIXI.Application
    ) {
        this.app = app;
    }

    public initLoader(): void {
        this.loaderService = new LoaderService(this.app);
    }

    public initMenu(): void {
        this.menuScreen = new PIXI.Container();
        this.menuScreen.name = 'menu_screen';
        this.app.stage.addChild(this.menuScreen);
    }

    public initSetting(): void {
        this.app.stage.removeChild(this.menuScreen);
        this.settingScreen = new PIXI.Container;
        this.settingScreen.name = 'setting_screen';
        this.app.stage.addChild(this.settingScreen);
    }

    public initGame(): void {
        this.app.stage.removeChild(this.settingScreen);
        this.gameScreen = new PIXI.Container();
        this.gameScreen.name = 'game_screen';
        this.app.stage.addChild(this.gameScreen);
    }
}