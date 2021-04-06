function createLoader() {
  const loader = document.createElement('div');
  loader.innerHTML = `<div class="spinner-border text-primary" role="status">
    <span class="visually-hidden">Loading...</span>
    </div>`;

  return loader;
}

export default createLoader;
