import poll from './poll';

describe('poll', () => {
  test('function is called 10 times', async () => {
    const mockFunction = jest.fn();

    await poll({
      fn: mockFunction,
      interval: 3,
      shouldContinue({
        attempts,
      }) {
        return attempts < 10;
      },
    });
    expect(mockFunction).toHaveBeenCalledTimes(10);
  });

  test('shouldcontinue callback receives the error and terminates polling after 2 calls', async () => {
    const mockFunction = jest.fn();
    mockFunction
      .mockReturnValueOnce(true)
      .mockImplementation(() => {
        throw new Error('Mock error message');
      });

    await poll({
      fn: mockFunction,
      interval: 3,
      shouldContinue({
        attempts,
        error,
      }) {
        return !(error || attempts > 9);
      },
    });
    expect(mockFunction).toHaveBeenCalledTimes(2);
  });
});
