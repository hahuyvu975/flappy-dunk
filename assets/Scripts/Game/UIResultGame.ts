import { _decorator, Component, Node, director } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('UIResultGame')
export class UIResultGame extends Component {

    // @property({
    //    type: Node 
    // })
    // private btnPlay: Node;
    

    protected onClickTryAgain(): void {
        director.loadScene('Game');
    }
}

