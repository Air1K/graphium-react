//Все в пикселях
export const radiusNode: number = 12; // Радиус точки
export const weightEdge: number = 8; // Толщина линии
export const colorEdge: string | CanvasGradient | CanvasPattern = 'gray'; // Цвет линии
export const colorNode: string | CanvasGradient | CanvasPattern = 'green'; // Цвет точки
export const colorEdgeText: string | CanvasGradient | CanvasPattern = '#000'; // Цвет текста
export const MOK_JPS_PROPS = {
  edges: new Map([
    [
      '70caa7fe-ebb4-4075-b5fb-dcdc40aefe00',
      new Map<string, number>([
        ['03738472-8aa7-4ae1-a6be-21791c209dd3', 154.39235732380018],
        ['9d9d584-3aee-4d68-b786-52dabef49d51', 133.01503674397117],
        ['b546778c-9bf6-42c1-9cdb-621bf24e93be', 261.22212769977966],
      ]),
    ],
    [
      '03738472-8aa7-4ae1-a6be-21791c209dd3',
      new Map<string, number>([
        ['70caa7fe-ebb4-4075-b5fb-dcdc40aefe00', 154.39235732380018],
        ['b546778c-9bf6-42c1-9cdb-621bf24e93be', 153.9415474383361],
      ]),
    ],
    [
      'b546778c-9bf6-42c1-9cdb-621bf24e93be',
      new Map<string, number>([
        ['03738472-8aa7-4ae1-a6be-21791c209dd3', 153.9415474383361],
        ['9d9d584-3aee-4d68-b786-52dabef49d51', 169.6850222836432],
        ['70caa7fe-ebb4-4075-b5fb-dcdc40aefe00', 261.22212769977966],
      ]),
    ],
    [
      '9d9d584-3aee-4d68-b786-52dabef49d51',
      new Map<string, number>([
        ['b546778c-9bf6-42c1-9cdb-621bf24e93be', 169.6850222836432],
        ['6670cfde-e557-4391-a953-aea6120e7469', 170.0832099526764],
      ]),
    ],
    [
      '6670cfde-e557-4391-a953-aea6120e7469',
      new Map<string, number>([
        ['9d9d584-3aee-4d68-b786-52dabef49d51', 170.0832099526764],
        ['0d877861-e3de-4574-9531-447b5afb8090', 162.2004932174992],
      ]),
    ],
    [
      '0d877861-e3de-4574-9531-447b5afb8090',
      new Map<string, number>([
        ['6670cfde-e557-4391-a953-aea6120e7469', 162.2004932174992],
        ['70caa7fe-ebb4-4075-b5fb-dcdc40aefe00', 133.01503674397117],
      ]),
    ],
    [
      '9d9a00a0-b41a-47dd-8acf-56a5827c5f39',
      new Map<string, number>([
        ['0d877861-e3de-4574-9531-447b5afb8090', 142.46754016266303],
        ['70caa7fe-ebb4-4075-b5fb-dcdc40aefe00', 133.01503674397117],
      ]),
    ],
  ]),
  points: {
    '70caa7fe-ebb4-4075-b5fb-d0dc4a0efe00': {
      position: {
        x: 341.5,
        y: 376.5,
      },
    },
    '03738472-8aa7-4ae1-a6be-21791c209dd3': {
      position: {
        x: 352.5,
        y: 222.5,
      },
    },
    'b546778c-9bf6-42c1-9cdb-621bf24e93be': {
      position: {
        x: 495.5,
        y: 165.5,
      },
    },
    'd79dc584-3aee-4d68-b786-52d4bef49d51': {
      position: {
        x: 643.5,
        y: 82.5,
      },
    },
    '6670fcde-e557-4391-a953-aea6120e7469': {
      position: {
        x: 735.5,
        y: 225.5,
      },
    },
    '0d877861-e3de-4574-9531-447b5af8b090': {
      position: {
        x: 605.5,
        y: 322.5,
      },
    },
    '9d79a00a-b41a-47dd-8acf-56a5827c5f39': {
      position: {
        x: 474.5,
        y: 378.5,
      },
    },
  },
  optimalPath: [
    {
      id: '1',
      path: [
        '70caa7fe-ebb4-4075-b5fb-d0dc4a0efe00',
        '9d79a00a-b41a-47dd-8acf-56a5827c5f39',
        '0d877861-e3de-4574-9531-447b5af8b090',
        '6670fcde-e557-4391-a953-aea6120e7469',
      ],
      weight: 335.4101966249685,
    },
  ],
};
