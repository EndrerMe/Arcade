export class Score {
    private static currentScore: number = 0

    constructor() {}

    public static calcScore(score: PIXI.Text): void {
        this.currentScore += 1;
        score.text = `Score: ${this.currentScore}`;
    }
}