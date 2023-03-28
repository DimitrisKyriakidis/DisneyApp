import {
  animate,
  group,
  query,
  stagger,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const listAnimation = trigger('listAnimation', [
  transition('* <=> *', [
    query(
      ':enter',
      [
        style({ opacity: 0 }),
        stagger('150ms', animate('800ms ease-in', style({ opacity: 1 }))),
      ],
      { optional: true }
    ),
    query(':leave', animate('50ms', style({ opacity: 0 })), {
      optional: true,
    }),
  ]),
]);
