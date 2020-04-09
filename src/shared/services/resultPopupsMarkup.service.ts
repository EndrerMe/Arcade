// Vendors
import gsap from "gsap";
import { Subject } from 'rxjs';

export class ResultPopupsMurkup {
    public static isStartNewGame: Subject<boolean> = new Subject();
    private static result: {
        container: PIXI.Container,
        window: PIXI.Container,
        winText: PIXI.Text,
        looseText: PIXI.Text
    } = {
        container: undefined,
        window: undefined,
        winText: undefined,
        looseText: undefined
    };
    
    public static createScoreContainer(): PIXI.Container {
        const scoreContainer = new PIXI.Container();
        scoreContainer.name = 'score_container';
        const scoreText = new PIXI.Text(`Score: 0`);
        scoreText.name = 'score';
        scoreText.x = 180;
        scoreText.y = 25;
        scoreText.style = new PIXI.TextStyle({
            fill: 0xffffff,
            fontSize: 18,
            fontFamily: 'Arial',
            fontStyle: 'bold',
        });
        scoreContainer.addChild(scoreText);
        return scoreContainer;
    }

    public static createResultPopup(width: number, height: number): PIXI.Container {
        let window, winText, looseText, tryAgainButton;
        const container = new PIXI.Container();
        const popupGraphics = new PIXI.Graphics();
        popupGraphics.alpha = 0.8;
        popupGraphics.beginFill(0x000000);
        popupGraphics.drawRect(0, 0, width, height);
        container.name = 'result_container';
        container.visible = false;

        window = this.createResultWindow(popupGraphics.width, popupGraphics.height);
        this.result.window = window;

        winText = this.createResultText(window.width, 'You Win!', 0x00c22d, 55);
        winText.name = 'win_text';
        winText.visible = false;
        this.result.winText = winText;

        looseText = this.createResultText(window.width, 'You Loose!', 0xff0000, 45);
        looseText.name = 'loose_text';
        looseText.visible = false;
        this.result.looseText = looseText;

        tryAgainButton = this.createTryAgainButton();

        container.addChild(popupGraphics);
        container.addChild(window);
        window.addChild(winText);
        window.addChild(looseText);
        window.addChild(tryAgainButton);
        this.result.container = container;

        return container;
    }

    private static createResultWindow(width: number, height: number): PIXI.Container {
        const window = new PIXI.Container();
        window.x = width / 2 - 100;
        window.y = height - 75;
        const windowGraphics = new PIXI.Graphics();
        windowGraphics.beginFill(0xffffff);
        windowGraphics.drawRoundedRect(0, 0, 200, 150, 15)
        window.name = 'result_window';
        window.addChild(windowGraphics);
        return window;
    }

    private static createTryAgainButton(): PIXI.Text {
        const text = new PIXI.Text('Try Again');
        text.x = 55;
        text.y = 100;
        text.buttonMode = true;
        text.interactive = true;
        text.style = new PIXI.TextStyle({
            fill: 0x000000,
            fontSize: 20,
            fontFamily: 'Arial',
            fontStyle: 'bold',
        });
        text.on('pointerdown', (): void => {
            this.callTryAgain();
        });
        
        return text;
    }

    private static createResultText(width: number, currentText: string, color, x: number): PIXI.Text {
        const text = new PIXI.Text(currentText);
        text.x = x;
        text.y = 25;
        text.style = new PIXI.TextStyle({
            fill: color,
            fontSize: 22,
            fontFamily: 'Arial',
            fontStyle: 'bold',
        });

        return text;
    }

    public static toggleWinPopup(state: boolean): void {
        this.result.container.visible = state;
        this.result.window.visible = state;
        this.result.winText.visible = state;
        if (state) {
            gsap.to(this.result.window, {x: this.result.window.x, 
                y: this.result.container.height / 2 - 100, 
                duration: .5, ease: "none"})
        } else {
            this.result.window.y = this.result.container.height - 100
        }
    }

    public static toggleLoosePopup(state: boolean): void {
        this.result.container.visible = state;
        this.result.window.visible = state;
        this.result.looseText.visible = state;

        if (state) {
            gsap.to(this.result.window, {x: this.result.window.x, 
                y: this.result.container.height / 2 - 100, 
                duration: .5, ease: "none"})
        } else {
            this.result.window.y = this.result.container.height - 100
        }
    }

    private static callTryAgain(): void {
        this.toggleLoosePopup(false);
        this.toggleWinPopup(false);
        this.isStartNewGame.next(true);
        this.isStartNewGame.next(false);
    }
}