import SimpleLightbox from 'simplelightbox';

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
let lightbox = new SimpleLightbox('.gallery a');

export function createGallery(images) {
  const markup = images
    .map(
      img => `
    <li>
      <a href="${img.largeImageURL}">
        <img src="${img.webformatURL}" alt="${img.tags}" />
      </a>
      <div class="info">
        <p>Likes: ${img.likes}</p>
        <p>Views: ${img.views}</p>
        <p>Comments: ${img.comments}</p>
        <p>Downloads: ${img.downloads}</p>
      </div>
    </li>`
    )
    .join('');
  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}


export function showLoader() {
  loader.classList.remove('hidden');
}

export function hideLoader() {
  loader.classList.add('hidden');
}

