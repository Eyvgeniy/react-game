//@ts-check

import eat from '../assets/sounds/eat.wav';
import end from '../assets/sounds/end.wav';
import start from '../assets/sounds/start.wav';
import music from '../assets/sounds/music.mp3';

const soundsArr = [
  ['eat', eat],
  ['end', end],
  ['start', start],
];

const musicArr = [['music', music]];

class Sounds {
  constructor() {
    this.soundsPlaylist = {};
    this.musicPlaylist = {};
  }

  _addSound(name, filepath) {
    this.soundsPlaylist[name] = new Audio(filepath);
  }

  _changeSoundsVolume(volume) {
    Object.values(this.soundsPlaylist).forEach((sound) => {
      sound.volume = volume;
    });
  }
  _addMusic(name, filepath) {
    this.musicPlaylist[name] = new Audio(filepath);
  }

  _changeMusicVolume(volume) {
    Object.values(this.musicPlaylist).forEach((music) => {
      music.volume = volume;
    });
  }
}

const sounds = new Sounds();
soundsArr.forEach(([name, path]) => sounds._addSound(name, path));
musicArr.forEach(([name, path]) => sounds._addMusic(name, path));
sounds._changeSoundsVolume(0.1);
sounds.musicPlaylist.music.loop = true;

export default sounds;
