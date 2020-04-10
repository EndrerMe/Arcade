import { Subject } from "rxjs";

export class GamePause {
    public static isGamePause: Subject<boolean> = new Subject();

    public static togglePause(state: boolean): void {
        console.log(state)
        this.isGamePause.next(state);
    }
}