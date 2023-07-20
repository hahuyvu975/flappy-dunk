import { _decorator, Component, Node, Camera, view, v3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameView')
export class GameView extends Component {
    @property({type: Camera})
    private camera : Camera;

    private _width: number;
    public get Width(): number {
        return this._width;
    }

    protected onLoad(): void {
        const visibleSize = view.getVisibleSizeInPixel();
        const aspect = visibleSize.width/visibleSize.height;

        this._width = 2.0*this.camera.orthoHeight*aspect;
        const cameraPosition = this.camera.node.position;
        this.camera.node.position = v3(this._width/4.0, cameraPosition.y, cameraPosition.z);
    }
}

