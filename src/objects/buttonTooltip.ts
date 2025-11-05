import { MOVE_SPEED } from '../constants';

export function renderButtonTooltip() {
  const buttonTooltip = make([
    rect(40, 40),
    anchor('center'),
    pos(80 / 2 + 20, -40),
    'tooltip',
    outline(4),
  ]);

  buttonTooltip.onAdd(() => {
    buttonTooltip.add([
      text('E', {
        size: 32,
      }),
      anchor('center'),
      color(0, 0, 0),
    ]);
  });

  return buttonTooltip;
}
