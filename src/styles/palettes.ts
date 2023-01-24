export const paletteFrom = (indx: number) => {
  return palettes[indx].map((hex) =>
    hex.startsWith('#') ? hex : `#${hex}`
  )
}

export const palettes = [
  ['4c5454', 'ff715b', '90be6d', '1ea896', '523f38'],
  [
    'f94144',
    'f3722c',
    'f8961e',
    'f9844a',
    'f9c74f',
    '90be6d',
    '43aa8b',
    '4d908e',
    '577590',
    '277da1'
  ],
  [
    '7400b8',
    '6930c3',
    '5e60ce',
    '5390d9',
    '4ea8de',
    '48bfe3',
    '56cfe1',
    '64dfdf',
    '72efdd',
    '80ffdb'
  ],
  [
    '005f73',
    '0a9396',
    '94d2bd',
    'e9d8a6',
    'ee9b00',
    'ca6702',
    'bb3e03',
    'ae2012',
    '9b2226'
  ],
  [
    'ff616e',
    'f3722c',
    'f8961e',
    'f9844a',
    'f9c74f',
    '90be6d',
    '43aa8b',
    '4d908e',
    '577590',
    '277da1'
  ],
  [
    'ea698b',
    'd55d92',
    'c05299',
    'ac46a1',
    '973aa8',
    '822faf',
    '6d23b6',
    '6411ad',
    '571089',
    '47126b'
  ]
]