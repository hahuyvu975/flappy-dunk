import { GameModel } from './GameModel';
import { _decorator, Component, Node, Vec3, Sprite, CCFloat, v3 } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('BgGame')
export class BgGame extends Component {

    @property({ type: GameModel })
    private gameModel: GameModel;

    private bgStartPositionX: number;
    private bgOffsetX: number = 0.0;

    private spriteWidth: number;

    protected onLoad(): void {
        this.spriteWidth = this.node.getComponent(Sprite).spriteFrame.width;
    }

    protected start(): void {
        this.bgStartPositionX = this.node.position.x;
    }

    protected update(dt: number): void {
        // if (this.gameModel.IsMovingGame) {


        //     this.bgOffsetX += this.gameModel.SpeedObject * dt;
        //     let offset: number = 0.0;
        //     if (this.bgOffsetX > this.spriteWidth) {
        //         offset = this.bgOffsetX - this.spriteWidth;
        //         this.bgOffsetX = 0.0;
        //     }
        //     this.node.position = v3(this.bgStartPositionX - this.bgOffsetX - offset, this.node.position.y, this.node.position.z);
        // }
    }
}


