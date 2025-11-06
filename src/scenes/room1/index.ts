import { AudioPlay, KEventController } from 'kaplay';
import { FLOOR_HEIGHT } from '../../constants';
import { renderButtonTooltip } from '../../objects/buttonTooltip';
import { showConfetties } from '../../objects/confetti';
import { makeNewFriend } from '../../objects/makeNewFriend';
import { renderPlayer1 } from '../../objects/player1';
import { renderBaseScenario } from '../../objects/renderBaseScenario';
import { addButton } from '../../utils/addButton';
import { isCurrentDateAfterOrEqualNiver } from '../../utils/date';

type Room1Props = {
  origin?: 'mainMenu' | 'room2';
};

const MESSAGE_BIRTHDAY =
  'Feliz aniversário de 3 anos meu amooor, sou muito grato de entrarmos nesta marca juntos e que venham muitos anos pela frente. Te amo muitoooo <3';

export function room1({ origin }: Room1Props) {
  renderBaseScenario();
  const goBack = () => {
    go('mainMenu');
    audio?.stop();
  };

  const returnButton = addButton({
    txt: '<- Return',
    position: [20, 20],
    action: goBack,
  });
  returnButton.moveTo(160, 100);

  const dynScale = (timeVariant: number) => wave(0.8, 1, time() + timeVariant);
  const dynAngle = (timeVariant: number) => wave(-9, 9, time() + timeVariant);

  const makeSounds = () => [sprite('sounds'), pos(-32), rotate(), 'notes'];
  let isAudioPlaying = false;

  let audio: AudioPlay;
  let audioTime: number = 0;

  function displayAudioEffect() {
    const audios = jukebox.add(makeSounds());
    const audios2 = audios.add(makeSounds());
    const audios3 = audios2.add(makeSounds());

    audios.onUpdate(() => {
      audios.use(scale(dynScale(3)));
      audios.use(rotate(dynAngle(3)));
    });

    audios2.onUpdate(() => {
      audios2.use(scale(dynScale(2)));
      audios2.use(rotate(dynAngle(2)));
    });

    audios3.onUpdate(() => {
      audios3.use(scale(dynScale(1)));
      audios3.use(rotate(dynAngle(1)));
    });

    audio.onEnd(() => {
      isAudioPlaying = false;
      audioTime = 0;
      jukebox.remove(audios);
    });
  }

  const jukeboxAction = () => {
    if (!audio) {
      audio = play('mainSong', {
        volume: 0.5,
        seek: audioTime,
      });
      isAudioPlaying = true;

      displayAudioEffect();
      return;
    }

    if (!isAudioPlaying) {
      audio.play();
      audio.seek(audioTime);
      isAudioPlaying = true;

      displayAudioEffect();
      return;
    }

    if (isAudioPlaying) {
      audioTime = audio.time();

      audio.stop();
      isAudioPlaying = false;

      jukebox.removeAll('notes');
    }
  };

  const jukebox = add([
    sprite('jukebox', {
      width: 120,
      height: 180,
      fill: true,
    }),
    pos(200, height() - FLOOR_HEIGHT - 180),
    area(),
    'item',
    {
      action: jukeboxAction,
    },
  ]);

  const diego = makeNewFriend({ spriteName: 'diego' });

  const cakeAction = async () => {
    if (!audio) {
      audio = play('mainSong', {
        volume: 0.5,
        seek: audioTime,
      });
      isAudioPlaying = true;

      displayAudioEffect();
    }

    if (!birthdayText.exists()) {
      add(birthdayText);

      showConfetties({ maxConfetti: 11, delay: 1 });

      if (!diego.exists()) {
        add(diego);

        diego.onUpdate(() => {
          if (birthdayText.exists() || isAudioPlaying) {
            diego.move(Math.floor(time()) % 2 ? 100 : -100, 0);
            if (diego.isGrounded()) {
              diego.jump();
            }
          }
        });
      }
    }
  };

  const cake = add([
    sprite('cake3', {
      height: 240,
      width: 240,
    }),
    pos(600, height() - FLOOR_HEIGHT - 240),
    area(),
    'item',
    {
      action: cakeAction,
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

  birthdayText.onAdd(() =>
    wait(10, () => {
      destroy(birthdayText);
    })
  );

  const nextDoorText = make([
    pos(40, height() - 40 - 120 - 200),
    text('Próxima porta só será liberada no dia 07/11 em diante', {
      width: width() - 40 * 2,
      size: 40,
      align: 'center',
      lineSpacing: 8,
      letterSpacing: 4,
      transform: (idx, ch) => ({
        color: hsl2rgb((time() * 0.2 + idx * 0.1) % 1, 0.9, 0.1),
        pos: vec2(0, wave(-4, 4, time() * 4 + idx * 0.5)),
        scale: wave(1, 1.2, time() * 3 + idx),
        angle: wave(-9, 9, time() * 3 + idx),
      }),
    }),
    layer('ui'),
  ]);

  nextDoorText.onAdd(() => {
    wait(3, () => nextDoorText.destroy());
  });

  const doorAction = () => {
    if (isCurrentDateAfterOrEqualNiver()) {
      audio?.stop();
      go('room2');
    } else {
      if (!nextDoorText.exists()) {
        add(nextDoorText);
      }
    }
  };

  const door = add([
    sprite('door', {
      height: 120,
      width: 120,
    }),
    pos(width() - 160, height() - FLOOR_HEIGHT - 120),
    area(),
    'item',
    {
      action: doorAction,
    },
  ]);

  let actionButton: KEventController;

  const player = renderPlayer1();
  add(player);

  if (origin === 'mainMenu') {
    player.moveTo(100, height() - 80 - 80);
  }

  if (origin === 'room2') {
    player.moveTo(width() - 200, height() - 80 - 80);
  }

  const buttonTooltip = renderButtonTooltip();

  player.onCollide('item', (obj) => {
    if (!buttonTooltip.exists()) {
      obj.add(buttonTooltip);

      actionButton = onKeyPress('e', () => obj.action());
    }
  });

  player.onCollideEnd('item', (obj) => {
    obj.removeAll('tooltip');
    actionButton.cancel();
  });
}
