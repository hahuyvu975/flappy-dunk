import { _decorator, Component, Node, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ScoreGame')
export class ScoreGame extends Component {
    @property({
        type: Label
    })
    private labelCurrentScore: Label;

    private currentScore: number = 0;

    public addScore(): void {
        this.currentScore++;
        this.labelCurrentScore.string = this.currentScore.toString();
    }

}

