import { _decorator, Component, Node, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ScoreGame')
export class ScoreGame extends Component {
    @property({
        type: Label
    })
    private labelCurrentScore: Label;

    private currentScore: number = 0;
    public get CurrentScore(): number {
        return this.currentScore;
    }
    public set CurrentScore(value: number) {
        this.currentScore = value;
    }

    public addScore(num: number): void {
        this.currentScore += num;
        this.labelCurrentScore.string = this.currentScore.toString();
        if(!localStorage.getItem('bestScore')) {
            localStorage.setItem('bestScore', this.currentScore.toString());
        }
        if (this.currentScore >= parseInt(localStorage.getItem('bestScore'))) {
            localStorage.setItem('bestScore', this.currentScore.toString());
        } else {
            return;
        }
    }

}

