import { _decorator, Component, Node, director, Label } from 'cc';
const { ccclass, property } = _decorator;

import { ScoreGame } from './ScoreGame';

@ccclass('UIResultGame')
export class UIResultGame extends Component {

    @property({
        type: ScoreGame
    })
    private scoreGame: ScoreGame;

    @property({
        type: Node
    })
    private bgBlackSheet: Node;

    public get BgBlackSheet(): Node {
        return this.bgBlackSheet;
    }
    public set BgBlackSheet(value: Node) {
        this.bgBlackSheet = value;
    }

    @property({
        type: Label
    })
    private labelResultScore: Label;
    public get LabelResultScore(): Label {
        return this.labelResultScore;
    }
    public set LabelResultScore(value: Label) {
        this.labelResultScore = value;
    }
    
    @property({
        type: Label
    })
    private labelBestScore: Label;
    public get LabelBestScore(): Label {
        return this.labelBestScore;
    }
    public set LabelBestScore(value: Label) {
        this.labelBestScore = value;
    }

    private bestScore: number = 0;
    public get BestScore(): number {
        return this.bestScore;
    }
    public set BestScore(value: number) {
        this.bestScore = value;
    }

    protected start(): void {
        this.showResultScore();
        this.showBestScore();
    }

    protected showBestScore(): void {
        this.bestScore = parseInt(localStorage.getItem('bestScore'));
        this.labelBestScore.string = `${this.bestScore}`
    }

    protected showResultScore(): void {
        this.labelResultScore.string = `${this.scoreGame.CurrentScore}`
    }
}

