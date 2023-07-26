import { _decorator, Component, Node, Collider2D, Contact2DType, IPhysics2DContact, Vec3, Animation, RigidBody, RigidBody2D, Vec2, Input, input, Prefab, instantiate, math, director, Collider, misc, v2, v3, BoxCollider2D, CircleCollider2D, EventKeyboard, KeyCode, Camera, AudioClip, AmbientInfo } from 'cc';
const { ccclass, property } = _decorator;

import { ScoreGame } from './ScoreGame';
import { GameModel } from './GameModel';
import { GameView } from './GameView';
import { GameAudio } from './GameAudio';

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
        type: Node
    })
    private hoops1: Node;

    @property({
        type: Prefab
    })
    private hoop1Prefab: Prefab;

    @property({
        type: Node
    })
    private hoops2: Node;

    @property({
        type: Prefab
    })
    private hoop2Prefab: Prefab;

    @property({
        type: Prefab
    })
    private addHoop1Prefab: Prefab;


    @property({
        type: Prefab
    })
    private addHoop2Prefab: Prefab;

    @property({
        type: Node
    })
    private startBonus: Node;

    @property({
        type: GameView
    })
    private gameView: GameView;

    @property({
        type: GameModel
    })
    private gameModel: GameModel;

    @property({
        type: ScoreGame
    })
    private scoreGame: ScoreGame;

    @property({
        type: GameAudio
    })
    private audioGame: GameAudio;


    @property({
        type: Node
    })
    private camera: Node;

    //ball
    private isAutoJumpped: boolean = true;
    private rigidBodyBall: RigidBody2D;
    private colliBodyBall: Collider2D;
    private contactHoop: boolean = false;
    private stopMoving: boolean = false;

    //hoop
    private arrHoop1: Node[] = [];
    private arrHoop2: Node[] = [];
    private tempHoop2: Vec3 = new Vec3();
    private randomYSpaceTop: number;
    private randomYSpaceBottom: number;
    private randomYSpace: number;
    private count: number = 0;
    private startCount: boolean = false;
    private activeChildHoop: boolean = false;
    private cloneHoop2Prefab: Prefab = null;

    // starBonus
    private tempStartBonus: Vec3 = new Vec3();

    protected onLoad(): void {
        this.initPrefabHoop2();
        this.initPrefabHoop1();
        this.setPosStar();
        this.gameModel.IsMovingGame = false;
    }

    protected start(): void {
        if (!localStorage.getItem('bestScore')) {
            localStorage.setItem('bestScore', '0');
        }

        this.rigidBodyBall = this.ball.getComponent(RigidBody2D);
        this.colliBodyBall = this.ball.getComponent(Collider2D);
        if (this.colliBodyBall) {
            this.colliBodyBall.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
            this.colliBodyBall.on(Contact2DType.END_CONTACT, this.onEndContact, this);
        }

        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    protected onBeginContact(self: Collider2D, other: Collider2D, contact: IPhysics2DContact): void {
        const hoop2 = this.arrHoop2.indexOf(other.node);
        const rotation = math.randomRangeInt(10, 25);
        const randomRotation = Math.random() < 0.5 ? -rotation : rotation;
        const duration = this.activeChildHoop === false ? 0.0 : 0.2;

        // when user haven't clicked, the ball is auto jumping vertically
        if (this.isAutoJumpped) {
            this.rigidBodyBall.linearVelocity = new Vec2(0, 15);
            this.gameView.ClickSheetScript.ClickSheet1.active = false;
            this.gameView.ClickSheetScript.ClickSheet2.active = true;

            this.scheduleOnce(() => {
                this.gameView.ClickSheetScript.ClickSheet1.active = true;
                this.gameView.ClickSheetScript.ClickSheet2.active = false;
            }, 0.2);
        }

        // score game
        if (other.tag === 1) {
            console.log(duration)

            // check ball moving direction to score game or over game
            if (this.rigidBodyBall.linearVelocity.y < 0) {
                if (this.startCount) {
                    this.count++;
                }

                // Other way to child prefab have collider
                // if (this.scoreGame.CurrentScore > 1) {
                //     this.startCount = true;
                //     if (this.count >= 2) {
                //         let cloneHoop2s = other.node.children;
                //         for (const cloneHoop2 of cloneHoop2s) {
                //             this.scheduleOnce(() => {
                //                 if (cloneHoop2.name === "cloneHoop2") {
                //                     cloneHoop2.active = true;
                //                     this.activeChildHoop = true;
                //                 }
                //             }, 0.5)
                //         }
                //         this.count = 0;
                //     }
                // }

                const newPos = this.newPosHoop();

                // avoid bug when create new position for hoop
                if (!this.activeChildHoop) {
                    this.scheduleOnce(() => {
                        other.node.setPosition(newPos);
                        // other.node.setRotationFromEuler(0, 0, randomRotation);
                        this.arrHoop2.splice(hoop2, 1); // Remove the node from the current position in the array
                        this.arrHoop2.push(other.node); // Add the node to the end of the array
                        other.node.getChildByName('cloneHoop2').active = false;
                        other.node.getComponent(Collider2D).enabled = true;
                    }, 0.0);
                }
                // this.onAudioQueue(3);



                // check contact hoop to score game x1 or x2
                if (!this.contactHoop) {
                    this.gameView.X2PerfectScore.active = true;
                    this.scheduleOnce(() => {
                        this.gameView.X2PerfectScore.active = false;
                    }, 0.5)
                    this.scoreGame.addScore(2);
                    this.contactHoop = false;
                } else {
                    this.scoreGame.addScore(1);
                    this.contactHoop = false;
                }


                   if (this.scoreGame.CurrentScore > 2) {
                        this.startCount = true;
                        if (this.count >= 3) {
                            let lastNode = this.lastNode();
                            let cloneHoop2 = lastNode.getChildByName('cloneHoop2');
                            console.log(cloneHoop2);
                            if (cloneHoop2) {
                                cloneHoop2.active = true;
                                cloneHoop2.setPosition(0, -30);
                            } else {
                                console.warn('Error!!');
                            }
                            this.count = 0;
                        }
                    }

            } else {
                // this.onAudioQueue(2);
                this.overGame();
            }
        } else {

        }

        // contact hoop
        if (other.tag === 2) {
            this.contactHoop = true;
            // director.pause();
            // this.onAudioQueue(0);
            this.stopMoving = true;
            this.rigidBodyBall.linearDamping = 4;
        }

        // contact star
        if (other.tag === 5) {
            this.scoreGame.addScore(1);
            this.startBonus.active = false;
        }

        // contact collider ground and sky
        if (other.tag === 6) {
            this.rigidBodyBall.enabled = false;
            this.overGame();
        }

    }

    protected onEndContact(self: Collider2D, other: Collider2D, contact: IPhysics2DContact): void {
        this.stopMoving = false;
        this.rigidBodyBall.linearDamping = 0;
    }

    //click start  playing game
    protected onTouchStart(): void {
        this.isAutoJumpped = false;
        this.gameView.ClickSheetNode.active = false;
        this.lineGhost.active = false;
        this.rigidBodyBall.linearVelocity = new Vec2(2, 15);
        this.gameModel.IsMovingGame = true;
        this.stopMoving = false;
        // this.onAudioQueue(5);
    }

    // initialize hoop1
    protected initPrefabHoop1(): void {
        for (let i = 0; i < 4; i++) {
            let element1 = instantiate(this.hoop1Prefab);
            this.arrHoop1.push(element1);
            element1.parent = this.hoops1;
            this.setPosHoop1(element1, i);
        }
    }

    // set position hoop1
    protected setPosHoop1(node: Node, index: number): void {
        for (let i = 0; i < this.arrHoop1.length; i++) {
            node = this.arrHoop1[index];
            node.setPosition(this.arrHoop2[index].position.x, this.arrHoop2[index].position.y);
        }
    }

    // initialize hoop2
    protected initPrefabHoop2(): void {
        for (let i = 0; i < 4; i++) {
            let element2 = instantiate(this.hoop2Prefab);
            this.arrHoop2.push(element2);
            element2.parent = this.hoops2;
            this.setPosHoop2(element2, i);
            element2.getComponent(Collider2D).apply();
        }
    }

    // set position hoop2
    protected setPosHoop2(node: Node, index: number): void {
        // this.randomNumberPos();
        for (let i = 0; i < this.arrHoop2.length; i++) {
            node = this.arrHoop2[index];
            node.setPosition(this.hoops2.position.x + (i * 300), this.randomNumberPosY());
        }
    }

    // random y for hoop1 and hoop2
    private randomNumberPosY(): number {
        this.randomYSpaceTop = math.randomRangeInt(-100, 0);
        this.randomYSpaceBottom = math.randomRangeInt(1, 100);
        this.randomYSpace = Math.random() < 0.5 ? this.randomYSpaceTop : this.randomYSpaceBottom;
        return this.randomYSpace;
    }

    // get node has longest x in array
    private lastNode(): Node {
        let temp = this.arrHoop2[0];
        this.arrHoop2.map((hoop) => {
            temp = hoop.getPosition().x > temp.getPosition().x ? hoop : temp;
        })
        return temp;
    }

    // create new vec3(x,y) position node
    private newPosHoop(): Vec3 {
        const randomPosY = math.randomRangeInt(-100, 100);
        let temp = new Vec3(this.lastNode().position.x + 300, randomPosY);
        return temp;
    }

    // set position star
    protected setPosStar(): void {
        const posY = math.randomRange(200, 150);
        const posXBall = this.ball.position.x

        const randomYPosStart = Math.random() < 0.5 ? posY : -posY;
        const randomXPosStart = Math.random() < 0.5 ? posXBall + 1000 : posXBall + 1500;
        this.startBonus.setPosition(randomXPosStart, randomYPosStart);
        this.startBonus.getComponent(Collider2D).apply();
        this.startBonus.active = true;
    }

    // fall to the ground
    protected ballFall(): void {
        this.rigidBodyBall.linearVelocity = new Vec2(0, -5);
        console.log('123')
        // this.onAudioQueue(2);
    }

    // over game
    protected overGame(): void {
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
        this.colliBodyBall.off(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        this.gameView.UIResultGameNode.active = true;
        this.gameModel.IsMovingGame = false;

        // this.onAudioQueue(1);
        console.log('over game')
    }

    // sound effect and sound background
    protected onAudioQueue(num: number) {
        let clip: AudioClip = this.audioGame.Clips[num];
        this.audioGame.AudioSource.playOneShot(clip);
    }
    protected onSoundTrack(index: number): void {
        this.audioGame.AudioSource.volume = index;
    }

    protected update(deltaTime: number) {
        for (let i = 0; i < 4; i++) {
            this.arrHoop1[i].setRotation(this.arrHoop2[i].rotation);
            this.arrHoop1[i].setPosition(this.arrHoop2[i].position.x, this.arrHoop2[i].position.y + 16);
        }

        // when isMovingGame = true and contact other element = false, element will move
        if (this.gameModel.IsMovingGame && !this.stopMoving) {
            // hoop1 moving
            for (let i = 0; i < this.arrHoop2.length; i++) {
                let element = this.arrHoop2[i];
                this.tempHoop2 = element.position;
                this.tempHoop2.x -= this.gameModel.SpeedObject * deltaTime;
                if (this.ball.getPosition().x > (element.position.x + 290)) {
                    this.rigidBodyBall.linearVelocity = new Vec2(0, -20);
                }
                element.setPosition(this.tempHoop2.x, this.tempHoop2.y);
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

            // line ground
            this.lineGround.setPosition(this.camera.position.x, this.camera.position.y - 315);
            this.lineGhost.getComponent(Collider2D).apply();
        }
    }
}

