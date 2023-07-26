import { _decorator, Component, Node, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('BestScoreEntry')
export class BestScoreEntry extends Component {
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
}

