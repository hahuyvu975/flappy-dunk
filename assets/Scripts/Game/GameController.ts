import { _decorator, Component, Node, Collider2D, Contact2DType, IPhysics2DContact, Vec3, RigidBody, RigidBody2D, Vec2, Input, input, Prefab, instantiate, math, director, Collider, misc, v2, v3 } from 'cc';
const { ccclass, property } = _decorator;

import { ScoreGame } from './ScoreGame';
import { GameModel } from './GameModel';
import { ClickSheet } from './ClickSheet';

@ccclass('GameController')
export class GameController extends Component {

    @property({
        type: Node
    })
    private ball: Node;

    @property({
        type: Node
    })
    private lineGhost: Node;

    @property({
        type: Node
    })
    private lineGround: Node;

    @property({
        type: Prefab
    })
    private hoopPrefab: Prefab;

    @property({
        type: Node
    })
    private hoops: Node;

    @property({
        type: Node
    })
    private startBonus: Node;

    @property({
        type: Node
    })
    private ui_ResultGame: Node;

    @property({
        type: Node
    })
    private clickSheetNode: Node;

    // @property({
    //     type: Node
    // })
    // private camera: Node;

    @property({
        type: ClickSheet
    })
    private clickSheetScript: ClickSheet;

    @property({
        type: GameModel
    })
    private gameModel: GameModel;

    @property({
        type: ScoreGame
    })
    private scoreGame: ScoreGame;

    //ball
    private isAutoJumpped: boolean = true;
    private rigidBodyBall: RigidBody2D;
    private colliBodyBall: Collider2D;
    private contactHoop: boolean = false;
    private isClickOnce: boolean = true;
    public get ContactHoop(): boolean {
        return this.contactHoop;
    }
    public set ContactHoop(value: boolean) {
        this.contactHoop = value;
    }

    //hoop
    private arrHoop: Node[] = [];
    private posHoop: Vec3 = new Vec3(100, 0);
    private tempHoop: Vec3 = new Vec3();

    //line ground
    private colliBodyGround: Collider2D;

    //StartBonus
    private tempStartBonus: Vec3 = new Vec3();

    protected onLoad(): void {
        this.initPrefabHoop();
        this.setPosStar();
    }

    protected start(): void {
        this.colliBodyGround = this.lineGround.getComponent(Collider2D);
        this.rigidBodyBall = this.ball.getComponent(RigidBody2D);
        this.colliBodyBall = this.ball.getComponent(Collider2D);
        if (this.colliBodyBall) {
            this.colliBodyBall.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            this.colliBodyBall.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        }

        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    protected onBeginContact(self: Collider2D, other: Collider2D, contact: IPhysics2DContact): void {
        const prefabNode = other.node;
        const index = this.arrHoop.indexOf(prefabNode);
        // when user haven't clicked, the ball is auto jumping
        if (this.isAutoJumpped) {
            this.rigidBodyBall.linearVelocity = new Vec2(0, 15);
            this.clickSheetScript.ClickSheet1.active = false;
            this.clickSheetScript.ClickSheet2.active = true;

            this.scheduleOnce(() => {
                this.clickSheetScript.ClickSheet1.active = true;
                this.clickSheetScript.ClickSheet2.active = false;
            }, 0.2);
        }

        if (other.tag === 1) {
            this.setPosHoop(prefabNode, index);
            if (this.rigidBodyBall.linearVelocity.y <= 0) {
                this.scoreGame.addScore();
            } else {
                this.overGame();
            }
        }

        // contact hoop
        if (other.tag === 2) {
            // this.posBall = false;
            console.log('contact hoop')
            this.contactHoop = true;
            this.rigidBodyBall.linearDamping = 4;

            // if (this.rigidBodyBall.linearVelocity.x === 0) {
            //     this.rigidBodyBall.linearVelocity = new Vec2(-5, 0);
            // }
        }

        // contact star
        if (other.tag === 5) {
            console.log('contact start')
            this.scoreGame.addScore();
            this.startBonus.active = false;
        }

        // contact collider ground and sky
        if (other.tag === 6) {
            console.log('contact ground and sky');
            this.overGame();
        }
    }

    protected onEndContact(self: Collider2D, other: Collider2D, contact: IPhysics2DContact): void {
        if (other.tag === 2) {
            // this.posBall = true;
            this.contactHoop = false;
            this.rigidBodyBall.linearDamping = 0;
            this.ball.position = v3(-160, this.ball.position.y);
        }
    }

    //click start  playing game
    protected onTouchStart(): void {
        this.isAutoJumpped = false;
        this.clickSheetNode.active = false;
        this.lineGhost.active = false;
        console.log('click')

        this.rigidBodyBall.linearVelocity = new Vec2(0, 15);

        this.gameModel.IsMovingGame = true;
        this.contactHoop = false;
    }

    // initialize hoop
    protected initPrefabHoop(): void {
        for (let i = 0; i < 3; i++) {
            let element = instantiate(this.hoopPrefab);
            this.arrHoop.push(element);
            element.parent = this.hoops;
            this.setPosHoop(element, i);
            element.getComponent(Collider2D).apply();
        }
    }

    // set position hoop
    protected setPosHoop(node: Node, index: number): void {
        for (let i = 0; i < this.arrHoop.length; i++) {
            const randomYSpaceTop = math.randomRangeInt(0, 100)
            const randomYSpaceBottom = math.randomRangeInt(-100, 0)
            const randomYSpace = Math.random() < 0.5 ? randomYSpaceTop : randomYSpaceBottom;
            const rotation = math.randomRangeInt(10, 25);
            const randomRotation = Math.random() < 0.5 ? -rotation : rotation;

            node = this.arrHoop[index];
            // node.setRotationFromEuler(0, 0, randomRotation);
            node.setPosition(this.posHoop.x + (i * 300), randomYSpace);
            node.getComponent(Collider2D).apply();
        }
    }
    
    // set position star
    protected setPosStar(): void {
        const posY = math.randomRange(200, 150);

        const randomYPosStart = Math.random() < 0.5 ? posY : -posY;
        const randomXPosStart = Math.random() < 0.5 ? 1000 : 1500;
        this.startBonus.setPosition(randomXPosStart, randomYPosStart);
        this.startBonus.getComponent(Collider2D).apply();
        this.startBonus.active = true;
    }

    protected overGame(): void {
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
        this.colliBodyBall.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        this.ui_ResultGame.active = true;
        this.gameModel.IsMovingGame = false;
    }

    protected update(deltaTime: number) {
        // when isMovingGame = true and contact other element = false, element will move
        if (this.gameModel.IsMovingGame && !this.contactHoop) {
            //hoop moving
            for (let i = 0; i < this.arrHoop.length; i++) {
                let element = this.arrHoop[i];
                this.tempHoop = element.position;
                this.tempHoop.x -= this.gameModel.SpeedObject * deltaTime;
                if (this.tempHoop.x < -700) {
                    this.setPosHoop(element, i);
                }
                element.setPosition(this.tempHoop.x, this.tempHoop.y);
                element.getComponent(Collider2D).apply();
            }

            //star moving
            this.tempStartBonus = this.startBonus.position;
            this.tempStartBonus.x -= this.gameModel.SpeedObject * deltaTime;
            if (this.tempStartBonus.x < -510) {
                this.setPosStar();
            }
            this.startBonus.setPosition(this.tempStartBonus);
            this.startBonus.getComponent(Collider2D).apply();

        }
    }
}

