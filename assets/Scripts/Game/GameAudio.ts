import { _decorator, Component, Node, AudioSource, AudioClip } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('GameAudio')
export class GameAudio extends Component {
    @property({
        type: [AudioClip]
    })
    private clips: AudioClip[] = [];
    public get Clips(): AudioClip[] {
        return this.clips;
    }
    public set Clips(value: AudioClip[]) {
        this.clips = value;
    }

    @property({
        type: AudioSource
    })
    private audioSource: AudioSource;
    public get AudioSource(): AudioSource {
        return this.audioSource;
    }
    public set AudioSource(value: AudioSource) {
        this.audioSource = value;
    }
}

