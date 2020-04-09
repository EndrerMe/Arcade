// Vendors
import gsap from "gsap";

// Services
import { DetectKill, EnemyLoop, ResultPopupsMurkup,
    FireLoop, PlayerLoop } from 'shared/services'
// Screen
import { initScreen } from 'screens/initScreen/initScreen';
// Components
import { Enemy } from "components";


export class Game extends initScreen {
    private enemyLoop: EnemyLoop;
    private fireLoop: FireLoop;
    private playerLoop: PlayerLoop;
    private detectKill: DetectKill;
    private enemies: Enemy[];
    private bullets: PIXI.Sprite[];
    private mainSetup: PIXI.Graphics;
    private scoreContainer: PIXI.Container;
    private popup: PIXI.Container;
    public app: PIXI.Application
    public scene: HTMLElement;

    constructor(
        app: PIXI.Application,
        scene: HTMLElement
    ) {
        super(app);
        this.app = app;
        this.scene = scene;
    }

    public init(): void {
        this.initGame();
        this.screenSetup();
        this.initEventTryAgain();
    }

    private screenSetup(): void {
        this.loadBackground();
        this.initComponents();
        this.setCompoentData();
        this.enemyLoop.init();
        this.playerLoop.init();
        this.fireLoop.init();
        this.initScore();
        this.scene.removeEventListener('pointerdown', this.fireLoop.fireBullet);
        this.scene.addEventListener('pointerdown', this.fireLoop.fireBullet);
        this.getComponentData();
        this.detectKill.init(this.enemies, this.bullets);
        this.initResultPopup();
    }

    private tryAgain = (): void => {
        this.hidePopup();
        this.enemyLoop.tryAgain();
        this.getComponentData();
        this.detectKill.init(this.enemies, this.bullets);
    }

    private hidePopup(): void {
        const loosePopup = document.getElementById('loose_popup');
        const looseWindow = document.getElementById('window_loose');
        const winPopup = document.getElementById('win_popup');
        const winWindow = document.getElementById('window_win');
        loosePopup.style.display = 'none';
        looseWindow.style.bottom = '-125px';
        winPopup.style.display = 'none';
        winWindow.style.bottom = '-125px';
    }

    private initEventTryAgain(): void {
        ResultPopupsMurkup.isStartNewGame.subscribe((res) => {
            if (res) {
                this.tryAgain();
            }
        })
    }

    private getComponentData(): void {
        this.enemies = this.enemyLoop.getEnemies();
        this.bullets = this.fireLoop.getBullets();
    }

    private setCompoentData(): void {
        this.enemyLoop.setApp(this.app);
        this.enemyLoop.setScene(this.scene);
        this.enemyLoop.setScreen(this.gameScreen);

        this.fireLoop.setApp(this.app);
        this.fireLoop.setScreen(this.gameScreen);
        this.fireLoop.setScene(this.scene);

        this.playerLoop.setScreen(this.gameScreen);
        this.playerLoop.setApp(this.app);

        this.detectKill.setApp(this.app);
        this.detectKill.setScreen(this.gameScreen);
    }

    private loadBackground(): void {
        const bg = PIXI.Sprite.from(this.app.loader.resources.mainBg.texture);
        this.gameScreen.addChild(bg);
    }

    private initComponents() : void {
        this.detectKill = new DetectKill();
        this.playerLoop = new PlayerLoop();
        this.fireLoop = new FireLoop();
        this.enemyLoop = new EnemyLoop();
    }

    private initScore(): void {
        this.scoreContainer = ResultPopupsMurkup.createScoreContainer();
        this.gameScreen.addChild(this.scoreContainer)
        this.detectKill.setScore(this.scoreContainer);
    }

    private initResultPopup(): void {
        this.popup = ResultPopupsMurkup.createResultPopup(this.app.view.width, this.app.view.height);
        this.gameScreen.addChild(this.popup)
    }
}