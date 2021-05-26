import clone from './clone';

describe('clone', () => {
  let originalObj;

  beforeEach(() => {
    originalObj = {
      lvl1: {
        lvl2: {
          lvl3: {
            prop1: 'I am a string',
            prop2: undefined,
            prop3: null,
            prop4: ['item1', 'item2', 'item3'],
          },
        },
      },
    };
  });

  test('object gets cloned', () => {
    const clonedObject = clone(originalObj);
    expect(clonedObject).toEqual(originalObj);
  });

  test('cloned object is not the original object', () => {
    const clonedObject = clone(originalObj);
    expect(clonedObject).not.toBe(originalObj);
  });
});
