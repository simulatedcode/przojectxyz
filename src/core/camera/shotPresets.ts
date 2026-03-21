import { Shot } from './cameraTypes'

export const bladeRunnerShots: Shot[] = [
  {
    id: 'intro-establish',
    name: 'Establishing Shot',
    start: 0,
    end: 0.15,
    easing: 'easeInOut',
    camera: {
      position: [
        { at: 0, value: [0, 3, 20] },
        { at: 0.5, value: [0, 2.5, 16] },
        { at: 1, value: [0, 2, 12] }
      ],
      target: [
        { at: 0, value: [0, 0, 0] },
        { at: 0.5, value: [0, 0, 0] },
        { at: 1, value: [0, 0, 0] }
      ],
      fov: [
        { at: 0, value: 60 },
        { at: 1, value: 55 }
      ],
      roll: [
        { at: 0, value: 0 },
        { at: 1, value: 0 }
      ]
    },
    focus: {
      distance: [
        { at: 0, value: 25 },
        { at: 1, value: 10 }
      ],
      aperture: [
        { at: 0, value: 8.6 },
        { at: 1, value: 4 }
      ]
    }
  },
  {
    id: 'descent',
    name: 'Descent',
    start: 0.15,
    end: 0.4,
    easing: 'smoothstep',
    camera: {
      position: [
        { at: 0, value: [0, 2, 12] },
        { at: 0.3, value: [1.5, 1.5, 8] },
        { at: 0.7, value: [2.5, 1.2, 5] },
        { at: 1, value: [3, 1, 3] }
      ],
      target: [
        { at: 0, value: [0, 0, 0] },
        { at: 0.5, value: [0.5, 0.2, 0] },
        { at: 1, value: [1, 0.3, 0] }
      ],
      fov: [
        { at: 0, value: 55 },
        { at: 0.5, value: 45 },
        { at: 1, value: 40 }
      ],
      roll: [
        { at: 0, value: 0 },
        { at: 0.3, value: 0.03 },
        { at: 0.7, value: -0.02 },
        { at: 1, value: 0 }
      ]
    },
    focus: {
      distance: [
        { at: 0, value: 10 },
        { at: 0.5, value: 6 },
        { at: 1, value: 3 }
      ],
      aperture: [
        { at: 0, value: 4 },
        { at: 1, value: 2.8 }
      ]
    }
  },
  {
    id: 'hero-reveal',
    name: 'Hero Reveal',
    start: 0.4,
    end: 0.7,
    easing: 'easeOut',
    camera: {
      position: [
        { at: 0, value: [3, 1, 3] },
        { at: 0.3, value: [2, 0.8, 2.5] },
        { at: 0.7, value: [1, 0.6, 2] },
        { at: 1, value: [0.5, 0.5, 1.5] }
      ],
      target: [
        { at: 0, value: [1, 0.3, 0] },
        { at: 0.5, value: [0.5, 0.2, 0] },
        { at: 1, value: [0, 0.2, 0] }
      ],
      fov: [
        { at: 0, value: 35 },
        { at: 0.5, value: 30 },
        { at: 1, value: 25 }
      ],
      roll: [
        { at: 0, value: 0 },
        { at: 0.5, value: -0.05 },
        { at: 1, value: 0 }
      ]
    },
    focus: {
      distance: [
        { at: 0, value: 3 },
        { at: 0.5, value: 2 },
        { at: 1, value: 1.5 }
      ],
      aperture: [
        { at: 0, value: 4.8 },
        { at: 1, value: 2.4 }
      ]
    }
  },
  {
    id: 'pull-back',
    name: 'Pull Back',
    start: 0.7,
    end: 1.0,
    easing: 'easeInOut',
    camera: {
      position: [
        { at: 0, value: [0.5, 0.65, 1.5] },
        { at: 0.5, value: [1, 0.8, 3] },
        { at: 1, value: [-2, 1.2, 5] }
      ],
      target: [
        { at: 0, value: [0, 0.2, 0] },
        { at: 0.5, value: [0.5, 0.3, 0] },
        { at: 1, value: [1, 0.5, 0] }
      ],
      fov: [
        { at: 0, value: 35 },
        { at: 0.5, value: 45 },
        { at: 1, value: 45 }
      ],
      roll: [
        { at: 0, value: 0 },
        { at: 1, value: 0 }
      ]
    },
    focus: {
      distance: [
        { at: 0, value: 1.5 },
        { at: 0.5, value: 3 },
        { at: 1, value: 5 }
      ],
      aperture: [
        { at: 0, value: 1.4 },
        { at: 1, value: 4 }
      ]
    }
  }
]

export const simpleShots: Shot[] = [
  {
    id: 'main',
    name: 'Main Shot',
    start: 0,
    end: 1,
    easing: 'smoothstep',
    camera: {
      position: [
        { at: 0, value: [0, 2, 15] },
        { at: 1, value: [0, 0.5, 2] }
      ],
      target: [
        { at: 0, value: [0, 0, 0] },
        { at: 1, value: [0, 0, 0] }
      ],
      fov: [
        { at: 0, value: 50 },
        { at: 1, value: 40 }
      ],
      roll: [
        { at: 0, value: 0 },
        { at: 1, value: 0 }
      ]
    }
  }
]
