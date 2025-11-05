import { BG_COLOR, FLOOR_HEIGHT, WALL_COLOR } from '../constants';

export function renderBaseScenario() {
  setBackground(Color.fromHex(BG_COLOR));

  setGravity(1600);

  const ceiling = add([
    rect(width(), FLOOR_HEIGHT),
    color(WALL_COLOR),
    pos(0, 0),
    area(),
    body({
      isStatic: true,
    }),
    outline(4),
    layer('obj'),
  ]);

  const floor = add([
    rect(width(), FLOOR_HEIGHT),
    color(WALL_COLOR),
    pos(0, height() - FLOOR_HEIGHT),
    area(),
    body({
      isStatic: true,
    }),
    outline(4),
    layer('obj'),
  ]);
  
  const leftWall = add([
    rect(10, height()),
    color(WALL_COLOR),
    pos(0),
    area(),
    body({
      isStatic: true,
    }),
    outline(4),
    layer('obj'),
  ]);

  const rightWall = add([
    rect(10, height()),
    color(WALL_COLOR),
    pos(width() - 10, 0),
    area(),
    body({
      isStatic: true,
    }),
    outline(4),
    layer('obj'),
  ]);
}
