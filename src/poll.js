const poll = async ({
  fn, shouldContinue, interval,
}) => {
  let attempts = 0;

  const executePoll = async (resolve, reject) => {
    let result;
    let error;
    try {
      result = await fn();
      error = undefined;
    } catch (err) {
      result = undefined;
      error = err;
    }

    if (shouldContinue({
      result,
      attempts,
      error,
    })) {
      attempts += 1;
      return setTimeout(executePoll, interval, resolve, reject);
    }
    return resolve({
      result,
      error,
    });
  };

  return new Promise(executePoll);
};

export default poll;
