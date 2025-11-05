import { FLOOR_HEIGHT } from '../constants';

type MakeNewFriend = {
  spriteName: string;
  initialPosX?: number;
  initialPosY?: number;
};

export function makeNewFriend({
  spriteName,
  initialPosX,
  initialPosY,
}: MakeNewFriend) {
  const posX = initialPosX ?? width() / 2;
  const posY = initialPosY ?? height() - FLOOR_HEIGHT - 140;

  const obj = make([
    pos(posX, posY),
    body(),
    area(),
    z(10),
    layer('char'),
    'friend',
  ]);

  obj.use(
    sprite(spriteName, {
      width: 120,
      height: 120,
    })
  );

  return obj;
}
