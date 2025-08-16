import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';


const form = document.querySelector('.form');

form.addEventListener('submit', async e => {
  e.preventDefault();
  const query = e.target.elements['search-text'].value.trim();
  if (!query) {
    iziToast.warning({
      message: 'Please enter a search term!',
      position: 'topRight',
    });
    return;
  }

  clearGallery();
  showLoader();

  try {
    const { hits } = await getImagesByQuery(query);
    hideLoader();

    if (hits.length === 0) {
      iziToast.info({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
      return;
    }

    createGallery(hits);
  } catch (error) {
    hideLoader();
    iziToast.error({
      message: 'Something went wrong. Try again later.',
      position: 'topRight',
    });
  }
});