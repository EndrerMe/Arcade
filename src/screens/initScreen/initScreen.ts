// Services
import { LoaderService } from 'shared/services';
// Screens
import { Main } from 'screens';

export class initScreen {
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
        const menuScreen = this.app.stage.getChildByName('menu_screen');
        this.app.stage.removeChild(menuScreen);
        this.settingScreen = new PIXI.Container;
        this.settingScreen.name = 'setting_screen';
        this.app.stage.addChild(this.settingScreen);
    }

    public initGame = (): void => {
        const settingScreen = this.app.stage.getChildByName('setting_screen')
        this.app.stage.removeChild(settingScreen);
        this.gameScreen = new PIXI.Container();
        this.gameScreen.name = 'game_screen';
        this.app.stage.addChild(this.gameScreen);
    }
}