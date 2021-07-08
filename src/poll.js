const poll = async ({
  fn, shouldContinue, interval,
}) => {
  let attempts = 0;

  const executePoll = async (resolve, reject) => {
    let result;
    let error;
    attempts += 1;
    // we try catch here because we might want to continue polling in case of some errors
    // for example when the network connection is poor
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
