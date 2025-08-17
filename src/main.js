import 'izitoast/dist/css/iziToast.min.css';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import { getImagesByQuery } from './js/pixabay-api.js';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions.js';


const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');

let query = '';
let page = 1;
let totalHits = 0;

form.addEventListener('submit', async e => {
  e.preventDefault();
  // query = e.target.elements.searchQuery.value.trim();
  query = e.target.elements['search-text'].value.trim();
  if (!query) return;

  clearGallery();
  hideLoadMoreButton();
  page = 1;

  showLoader();
  try {
    const data = await getImagesByQuery(query, page);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.warning({
        message: 'Sorry, no images found. Try another keyword.',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);
    if (totalHits > data.hits.length) {
      showLoadMoreButton();
    }

  } catch (error) {
    iziToast.error({
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits);

    const totalLoaded = page * 15;
    if (totalLoaded >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }

    scrollGallery();

  } catch (error) {
    iziToast.error({
      message: 'Failed to load more images.',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});

function scrollGallery() {
  const { height: cardHeight } = document
    .querySelector('.gallery li')
    .getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}