import { calculateChildPosition } from './windowOpen';

describe('calculateChildPosition', () => {
  it('should center the child window relative to parent if child is smaller than parent', () => {
    const childPosition = calculateChildPosition({
      parent: {
        width: 1300,
        height: 700,
        left: 600,
        top: 500,
      },
      child: {
        width: 800,
        height: 600,
      },
    });

    expect(childPosition).toEqual({
      top: 550,
      left: 850,
    });
  });

  it('should center the child window relative to parent if child is bigger than parent', () => {
    const childPosition = calculateChildPosition({
      parent: {
        width: 700,
        height: 400,
        left: 600,
        top: 500,
      },
      child: {
        width: 950,
        height: 650,
      },
    });

    expect(childPosition).toEqual({
      top: 375,
      left: 475,
    });
  });
});
