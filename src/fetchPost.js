async function fetchPost(url = '', data = {}, settings = {}) {
  const defaultSettings = {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(data),
  };

  const config = { ...defaultSettings, ...settings };
  const response = await fetch(url, config);
  return response.json(); // parses JSON response into native JavaScript objects
}

export default fetchPost;
