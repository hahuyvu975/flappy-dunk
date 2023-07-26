import { _decorator, Component, Node, Vec3, RigidBody, RigidBody2D, Contact2DType, Collider2D, IPhysics2DContact, Vec2, input, Input } from 'cc';
import { ClickSheet } from './ClickSheet';
const { ccclass, property } = _decorator;

@ccclass('Ball')
export class Ball extends Component {

    private rigidBody: RigidBody2D;

    protected start(): void {
        this.rigidBody = this.node.getComponent(RigidBody2D);
    }

    protected update(): void {
        this.rigidBody.angularVelocity = 3;
        this.node.getComponent(Collider2D).apply();
    }
}

