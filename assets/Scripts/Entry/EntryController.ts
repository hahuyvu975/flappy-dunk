import { _decorator, Component, Node, director, AudioClip } from 'cc';
import { EntryAudio } from './EntryAudio';
import { SoundEntry } from './SoundEntry';
const { ccclass, property } = _decorator;

@ccclass('GameController')
export class GameController extends Component {

    @property({
        type: SoundEntry
    })
    private soundEntry: SoundEntry;

    @property({
        type: EntryAudio
    })
    private entryAudio: EntryAudio;
        
    private isClicked = false;

    protected onLoad(): void {
        if(!localStorage.getItem('volume')) {
            localStorage.setItem('volume', '1');
        }
        if (localStorage.getItem('volume') === '1') {
            this.soundEntry.BtnTurnOn.active = true;
            this.soundEntry.BtnTurnOff.active = false;
            this.onSoundTrack(1);
        } else {
            this.soundEntry.BtnTurnOn.active = false;
            this.soundEntry.BtnTurnOff.active = true;
            this.onSoundTrack(0);
        }


        // if(localStorage.getItem('volume') === '1') {

        // }
    }

    protected onClickStart(): void {
        if(localStorage.getItem('volume') === '1') {
            this.onQueueAudio(6);
        }
        director.loadScene('Game');
    }

    protected onClickSound(): void {
        if(!this.isClicked) {
            if(localStorage.getItem('volume') === '1') {
                this.onQueueAudio(6);
            }

            localStorage.setItem('volume', '0');
            this.onSoundTrack(0);
            this.soundEntry.BtnTurnOn.active = false;
            this.soundEntry.BtnTurnOff.active = true;
            this.isClicked = true;
            console.log('tat am')
        } else {
            localStorage.setItem('volume', '1');
            this.onSoundTrack(1);
            this.soundEntry.BtnTurnOn.active = true;
            this.soundEntry.BtnTurnOff.active = false;
            this.isClicked = false;
            console.log('mo am')
        }
    }

    protected onQueueAudio(index: number): void {
        let clip: AudioClip = this.entryAudio.Clips[index];
        this.entryAudio.AudioSource.playOneShot(clip);
    }

    protected onSoundTrack(num: number): void {
        this.entryAudio.AudioSource.volume = num;
    }
}

