import { _decorator, Component, Node, misc, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Camera')
export class Camera extends Component {
    @property({
        type: Node
    })
    private ball: Node;


    @property({
        type: Node
    })
    private containerNode: Node = null; // Thêm thuộc tính containerNode vào script

    protected update(deltaTime: number) {
        // const ballPosition = this.ball.position;
        // const cameraPosition = this.node.position;
        // const containerInitialPosition = this.containerNode.position;
        // const cameraNewPosition = new Vec3(ballPosition.x, cameraPosition.y, cameraPosition.z);

        // // Cập nhật vị trí mới cho camera
        // this.node.setPosition(cameraNewPosition);
    }
}
