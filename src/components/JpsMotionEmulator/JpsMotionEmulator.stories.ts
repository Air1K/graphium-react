import type { Meta, StoryObj } from '@storybook/react';
import { JpsMotionEmulator } from '../../index';
import { IEdge } from '../../types/index.type';

const edges: IEdge = new Map<string, Map<string, number>>([
  [
    'f437864e-facd-4990-a760-fe896149e053',
    new Map<string, number>([
      ['2a4c54c6-b1fb-4915-9fee-494ca3e0cdde', 141.4213562373095],
      ['b6e81d49-f38b-410e-9232-204f1b2d8f5a', 250],
      ['be79b837-4048-4a16-8eec-d6654247d473', 316.22776601683796],
    ]),
  ],
  [
    '2a4c54c6-b1fb-4915-9fee-494ca3e0cdde',
    new Map<string, number>([
      ['f437864e-facd-4990-a760-fe896149e053', 141.4213562373095],
      ['be79b837-4048-4a16-8eec-d6654247d473', 200],
      ['b6e81d49-f38b-410e-9232-204f1b2d8f5a', 180.27756377319946],
    ]),
  ],
  [
    'be79b837-4048-4a16-8eec-d6654247d473',
    new Map<string, number>([
      ['2a4c54c6-b1fb-4915-9fee-494ca3e0cdde', 200],
      ['b6e81d49-f38b-410e-9232-204f1b2d8f5a', 335.4101966249685],
      ['f437864e-facd-4990-a760-fe896149e053', 316.22776601683796],
    ]),
  ],
  [
    'b6e81d49-f38b-410e-9232-204f1b2d8f5a',
    new Map<string, number>([
      ['be79b837-4048-4a16-8eec-d6654247d473', 335.4101966249685],
      ['2a4c54c6-b1fb-4915-9fee-494ca3e0cdde', 180.27756377319946],
      ['f437864e-facd-4990-a760-fe896149e053', 250],
    ]),
  ],
]);

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Component/JpsMotionEmulator',
  component: JpsMotionEmulator,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {},
} satisfies Meta<typeof JpsMotionEmulator>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Normal: Story = {
  args: {
    points: {
      '2a4c54c6-b1fb-4915-9fee-494ca3e0cdde': {
        position: {
          x: 700,
          y: 50,
        },
      },
      'be79b837-4048-4a16-8eec-d6654247d473': {
        position: {
          x: 900,
          y: 50,
        },
      },
      'b6e81d49-f38b-410e-9232-204f1b2d8f5a': {
        position: {
          x: 600,
          y: 200,
        },
      },
      'f437864e-facd-4990-a760-fe896149e053': {
        position: {
          x: 600,
          y: -50,
        },
      },
    },
    edges: edges,
    optimalPath: [
      {
        id: '1',
        path: ['b6e81d49-f38b-410e-9232-204f1b2d8f5a', 'be79b837-4048-4a16-8eec-d6654247d473'],
        weight: 335.4101966249685,
      },
      {
        id: '2',
        path: ['b6e81d49-f38b-410e-9232-204f1b2d8f5a', '2a4c54c6-b1fb-4915-9fee-494ca3e0cdde'],
        weight: 180.27756377319946,
      },
    ],
    imageSrc: '',
  },
};
