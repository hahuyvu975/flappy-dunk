import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ClickSheet')
export class ClickSheet extends Component {
    @property({
        type: Node
    })
    private clickSheet1: Node;
    public get ClickSheet1(): Node {
        return this.clickSheet1;
    }
    public set ClickSheet1(value: Node) {
        this.clickSheet1 = value;
    }

    @property({
        type: Node
    })
    private clickSheet2: Node;
    public get ClickSheet2(): Node {
        return this.clickSheet2;
    }
    public set ClickSheet2(value: Node) {
        this.clickSheet2 = value;
    }
}

