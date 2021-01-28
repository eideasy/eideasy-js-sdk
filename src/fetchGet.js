async function fetchGet(url = '') {
  const response = await fetch(url, {
    credentials: 'same-origin',
  });
  return response.json();
}

export default fetchGet;
