import { KEventController } from 'kaplay';
import { FLOOR_HEIGHT } from '../../constants';
import { renderButtonTooltip } from '../../objects/buttonTooltip';
import { showConfetties } from '../../objects/confetti';
import { makeNewFriend } from '../../objects/makeNewFriend';
import { renderPlayer1 } from '../../objects/player1';
import { renderBaseScenario } from '../../objects/renderBaseScenario';

const MESSAGE_BIRTHDAY =
  'Feliz 23 anos, meu amoorrr. Eu e toda sua família lhe desejamos um dia muito incrível e especial.\n\nDesejamos muitas felicidades, muita saúde e que você continue sendo essa pessoa maravilhosa. Te amamos muito <3';

const friends = ['chico', 'vivi', 'clo', 'gaby', 'diego'];

export function room2() {
  renderBaseScenario();

  const song = play('parabens', {
    volume: 0.5,
    loop: true,
  });

  const door = add([
    sprite('door', {
      height: 120,
      width: 120,
    }),
    pos(40, height() - FLOOR_HEIGHT - 120),
    area(),
    'item',
    {
      action: () => {
        go('room1', { origin: 'room2' });
        song.stop();
      },
    },
  ]);

  showConfetties({ loop: true, delay: 1.5 });

  friends.forEach((friend, index) => {
    const randPosX = rand(120, width() - 120);
    console.log({ friend, randPosX, width: width() });
    const madeFriend = makeNewFriend({
      spriteName: friend,
      initialPosX: randPosX,
    });

    add(madeFriend);
  });

  on('update', 'friend', (friendObj) => {
    if (friendObj.exists()) {
      friendObj.move(Math.floor(time()) % 2 ? 100 : -100, 0);
      if (friendObj.isGrounded()) {
        friendObj.jump();
      }
    }
  });

  const cake = add([
    sprite('cake23', {
      height: 240,
      width: 240,
    }),
    pos(600, height() - FLOOR_HEIGHT - 240),
    area(),
    layer('obj'),
    {
      action: () => {},
    },
  ]);

  const birthdayText = make([
    pos(40, 160),
    text(MESSAGE_BIRTHDAY, {
      width: width() - 40 * 2,
      size: 40,
      align: 'center',
      lineSpacing: 8,
      letterSpacing: 4,
      transform: (idx, ch) => ({
        color: hsl2rgb((time() * 0.2 + idx * 0.1) % 1, 0.9, 0.6),
        pos: vec2(0, wave(-4, 4, time() * 4 + idx * 0.5)),
        scale: wave(1, 1.2, time() * 3 + idx),
        angle: wave(-9, 9, time() * 3 + idx),
      }),
    }),
    layer('ui'),
  ]);

  add(birthdayText);

  const player = renderPlayer1();

  add(player);
  player.moveTo(40, height() - 120 - 120);

  const buttonTooltip = renderButtonTooltip();

  let actionButton: KEventController;

  player.onCollide('item', (obj) => {
    obj.add(buttonTooltip);

    actionButton = onKeyPress('e', () => obj.action());
  });

  player.onCollideEnd('item', (obj) => {
    obj.removeAll('tooltip');
    actionButton.cancel();
  });
}
