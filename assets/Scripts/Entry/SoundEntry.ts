import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('SoundEntry')
export class SoundEntry extends Component {
    @property({
        type: Node
    })
    private btnTurnOn: Node;
    public get BtnTurnOn(): Node {
        return this.btnTurnOn;
    }
    public set BtnTurnOn(value: Node) {
        this.btnTurnOn = value;
    }

    @property({
        type: Node
    })
    private btnTurnOff: Node;
    public get BtnTurnOff(): Node {
        return this.btnTurnOff;
    }
    public set BtnTurnOff(value: Node) {
        this.btnTurnOff = value;
    }
}

