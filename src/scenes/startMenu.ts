import { addButton } from '../utils/addButton';

export function startMenu() {
  const bgSong = play('bgSong', {
    volume: 0.2,
    loop: true,
  });

  setBackground(Color.fromHex('#202020'));
  const bg = add([
    sprite('startMenuBg'),
    layer('bg'),
    pos(center()),
    anchor('center'),
  ]);

  const dynScale = (timeVariant: number) => wave(0.5, 0.8, time() + timeVariant);
  const dynAngle = (timeVariant: number) => wave(-9, 9, time() + timeVariant);

  onUpdate(() => {
    bg.use(scale(dynScale(1)));
    bg.use(rotate(dynAngle(1)));
  });

  const start = () => {
    go('room1', { origin: 'mainMenu' });
    bgSong?.stop();
  };
  addButton({ txt: 'Start', action: start });
}
