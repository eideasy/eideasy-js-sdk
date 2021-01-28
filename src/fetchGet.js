async function fetchGet(url = '', settings = {}) {
  const defaultSettings = {
    credentials: 'same-origin',
    Accept: 'application/json',
  };
  const config = { ...defaultSettings, ...settings };
  const response = await fetch(url, config);
  return response.json();
}

export default fetchGet;
