import { _decorator, Component, Node, misc, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Camera')
export class Camera extends Component {
    @property({
        type: Node
    })
    private ball: Node;

    protected update(deltaTime: number) {
        const ballPosition = this.ball.position;
       
        this.node.setPosition(ballPosition.x + 200, this.node.position.y, this.node.position.z);
    }
}
