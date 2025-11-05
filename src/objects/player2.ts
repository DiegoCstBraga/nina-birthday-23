import { MOVE_SPEED } from '../constants';

export function renderPlayer2() {
  const player2 = make([
    sprite('diego', {
      height: 60,
      width: 60,
    }),
    area(),
    pos(10, 10),
    body(),
    layer('char'),
  ]);

  onKeyDown('w', () => {
    player2.move(0, -1 * MOVE_SPEED);
  });
  onKeyDown('d', () => {
    player2.move(1 * MOVE_SPEED, 0);
  });
  onKeyDown('s', () => {
    player2.move(0, 1 * MOVE_SPEED);
  });
  onKeyDown('a', () => {
    player2.move(-1 * MOVE_SPEED, 0);
  });
}
