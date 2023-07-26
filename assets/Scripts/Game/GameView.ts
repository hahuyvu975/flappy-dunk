import { _decorator, Component, Node, Camera, view, v3, director } from 'cc';

import { ClickSheet } from './ClickSheet';
import { GameController } from './GameController';
import { UIResultGame } from './UIResultGame';

const { ccclass, property } = _decorator;

@ccclass('GameView')
export class GameView extends Component {

    @property({
        type: Node
    })
    private x2PerfectScore: Node;
    public get X2PerfectScore(): Node {
        return this.x2PerfectScore;
    }
    public set X2PerfectScore(value: Node) {
        this.x2PerfectScore = value;
    }
    
    @property({
        type: UIResultGame
    })
    private uiResultGamsScript: UIResultGame;
    public get UIResultGamsScript(): UIResultGame {
        return this.uiResultGamsScript;
    }
    public set UIResultGamsScript(value: UIResultGame) {
        this.uiResultGamsScript = value;
    }

    @property({
        type: Node
    })
    private uiResultGameNode: Node;
    public get UIResultGameNode(): Node {
        return this.uiResultGameNode;
    }
    public set UIResultGameNode(value: Node) {
        this.uiResultGameNode = value;
    }

    @property({
        type: Node
    })
    private clickSheetNode: Node;
    public get ClickSheetNode(): Node {
        return this.clickSheetNode;
    }
    public set ClickSheetNode(value: Node) {
        this.clickSheetNode = value;
    }

    @property({
        type: ClickSheet
    })
    private clickSheetScript: ClickSheet;
    public get ClickSheetScript(): ClickSheet {
        return this.clickSheetScript;
    }
    public set ClickSheetScript(value: ClickSheet) {
        this.clickSheetScript = value;
    }

    protected onClickTryAgain(): void {
        director.loadScene('Game');
    }
}

