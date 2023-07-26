import { _decorator, Component, Node, CCFloat, CCBoolean } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameModel')
export class GameModel extends Component {

    @property({
        type: CCFloat
    })
    private speedObject: number = 100;
    public get SpeedObject(): number {
        return this.speedObject;
    }
    public set SpeedObject(value: number) {
        this.speedObject = value;
    }

    @property({
        type: CCBoolean
    })
    private isMovingGame: Boolean;
    public get IsMovingGame(): Boolean {
        return this.isMovingGame;
    }
    public set IsMovingGame(value: Boolean) {
        this.isMovingGame = value;
    }
}

