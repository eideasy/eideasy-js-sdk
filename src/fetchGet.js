async function fetchGet(url = '') {
  const response = await fetch(url, {
    credentials: 'include',
    Accept: 'application/json',
  });
  return response.json();
}

export default fetchGet;
