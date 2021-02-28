//@ts-check

import eat from '../assets/sounds/eat.wav';
import end from '../assets/sounds/end.wav';
import start from '../assets/sounds/start.wav';
import music from '../assets/sounds/music.mp3';

const soundsArr = [
  ['eat', eat],
  ['end', end],
  ['start', start],
  ['music', music],
];

class Sounds {
  constructor() {
    this.playList = {};
  }

  _addSound(name, filepath) {
    this.playList[name] = new Audio(filepath);
  }
}

const sounds = new Sounds();
soundsArr.forEach(([name, path]) => sounds._addSound(name, path));
sounds.playList.music.loop = true;

export default sounds;
