// Services
import { ChangeComplexityLevel } from 'shared/services';

export class SettingsMurkup {
    private static complyxityContainer: PIXI.Container;

    public static createTitle(width: number): PIXI.Text {
        const text = new PIXI.Text('Settings');
        text.anchor.set(0.5);
        text.x = width / 2;
        text.y = 100;
        text.style = new PIXI.TextStyle({
            fill: 0x000000,
            fontSize: 44,
            fontFamily: 'Arial',
            fontStyle: 'bold',
        });

        return text;
    }

    public static createComplexityLevel(width: number): PIXI.Container {
        this.complyxityContainer = new PIXI.Container;
        this.complyxityContainer.x = -150;
        const title = new PIXI.Text('Complexity Level: ');
        this.complyxityContainer.x = 25;
        this.complyxityContainer.y = 200;
        title.style = new PIXI.TextStyle({
            fill: 0x000000,
            fontSize: 26,
            fontFamily: 'Arial',
            fontStyle: 'bold',
        }); 
        const simpleLevel = this.createComplexityText('Simple', width, 60, 1);
        const normalLevel = this.createComplexityText('Normal', width, 100, 2);
        const HardLevel = this.createComplexityText('Hard', width, 140, 3);  
        
        this.complyxityContainer.addChild(title);
        this.complyxityContainer.addChild(simpleLevel);
        this.complyxityContainer.addChild(normalLevel);
        this.complyxityContainer.addChild(HardLevel);

        return this.complyxityContainer;
    }

    private static createComplexityText(complexityLevelText: string, 
        width: number, y: number, complexityLevel: number): PIXI.Container {
        const container = new PIXI.Container();
        container.name = 'complexity_text_container'
        const graphics = new PIXI.Graphics();
        graphics.name = 'complexity_text_graphics'
        graphics.beginFill(0x00c903)
        graphics.drawRect(0, 0, 100, 35)
        const text = new PIXI.Text(complexityLevelText);
        container.x = 25;
        container.y = y;
        text.x = 5;
        text.y = 5;
        text.buttonMode = true;
        text.interactive = true;
        text.style = new PIXI.TextStyle({
            fill: 0x000000,
            fontSize: 22,
            fontFamily: 'Arial',
            fontStyle: 'bold',
        });
        graphics.visible = false;
        if (complexityLevel === 1) {
            graphics.visible = true;
        }
        container.addChild(graphics)
        container.addChild(text)
        text.on('pointerdown', () => {
            ChangeComplexityLevel.changeLevel(complexityLevel, graphics, this.complyxityContainer);
        })

        return container;
    }

    public static createStartGameButton(width: number, height: number): PIXI.Text {
        const text = new PIXI.Text('Start Game!');
        text.anchor.set(0.5);
        text.x = width / 2;
        text.y = height - 125;
        text.buttonMode = true;
        text.interactive = true;
        text.style = new PIXI.TextStyle({
            fill: 0x000000,
            fontSize: 22,
            fontFamily: 'Arial',
            fontStyle: 'bold',
        });

        return text;
    }
}