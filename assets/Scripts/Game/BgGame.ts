import { GameModel } from './GameModel';
import { _decorator, Component, Node, Vec3, Sprite, CCFloat, v3 } from 'cc';
import { GameController } from './GameController';
import { Ball } from './Ball';
const { ccclass, property } = _decorator;

@ccclass('BgGame')
export class BgGame extends Component {

//    @property({
//        type: Node
//    })
//    private ball: Node

   private posBall: Vec3 = new Vec3();

    protected onLoad(): void {
        // this.spriteWidth = this.node.getComponent(Sprite).spriteFrame.width;
        // console.log(this.spriteWidth); //4643
    }

    protected start(): void {
        // this.bgStartPositionX = this.node.position.x;
    }

    protected update(dt: number): void {
        // this.posBall.x = this.ball.position.x;
        // this.node.setPosition(this.posBall.x, 0);
    }
}

