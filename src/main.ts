import kaplay from 'kaplay';
import { startMenu } from './scenes/startMenu';
import { room1 } from './scenes/room1/index';
import { room2 } from './scenes/room2/index';

const k = kaplay({
  debug: true,
  global: true,
  backgroundAudio: true,
  buttons: {
    jump: {
      keyboard: ['space', 'up'],
    },
  },
  width: 1280,
  height: 720,
  letterbox: true,
});

const { loadRoot, loadSprite, scene, go } = k;

loadRoot('./'); // A good idea for Itch.io publishing later

loadSprite('startMenuBg', 'sprites/startMenuBg.jpg');

loadSprite('nina', 'sprites/nina.png');
loadSprite('diego', 'sprites/diego.png');
loadSprite('clo', 'sprites/clo.png');
loadSprite('gaby', 'sprites/gaby.png');
loadSprite('vivi', 'sprites/vivi.png');
loadSprite('chico', 'sprites/chico.png');

loadSprite('door', 'sprites/door.png');
loadSprite('cake', 'sprites/cake.png');
loadSprite('cake3', 'sprites/cake3.png');
loadSprite('cake23', 'sprites/cake23.png');
loadSprite('sounds', 'sprites/sounds.png');
loadSprite('jukebox', 'sprites/jukebox.png');

loadSound('test', 'sounds/test.mp3');
loadSound('bgSong', 'sounds/bgSong.mp3');
loadSound('mainSong', 'sounds/mainSong.mp3');
loadSound('parabens', 'sounds/parabens.mp3');

setLayers(['bg', 'obj', 'char', 'ui'], 'char');

scene('mainMenu', startMenu);
scene('room1', ({ origin }) => room1({ origin }));
scene('room2', room2);

go('mainMenu');
