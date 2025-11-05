import { MOVE_SPEED } from '../constants';

export function renderPlayer1() {
  const player = make([
    sprite('nina', {
      height: 120,
      width: 120,
      fill: true,
    }),
    area(),
    pos(10, 10),
    body(),
    z(10),
    layer('char'),
    'player'
  ]);

  onKeyPress(['up', 'space'], () => {
    if (!player.isJumping()) {
      player.jump();
    }
  });
  onKeyDown('right', () => {
    player.move(1 * MOVE_SPEED, 0);
  });
  onKeyDown('down', () => {
    player.move(0, 1 * MOVE_SPEED);
  });
  onKeyDown('left', () => {
    player.move(-1 * MOVE_SPEED, 0);
  });

  return player;
}
