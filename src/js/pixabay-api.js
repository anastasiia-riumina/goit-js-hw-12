import axios from 'axios';

const API_KEY = '51729967-cf115d8e1e17df6f8ee5ef85d';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 15;
export async function getImagesByQuery(query, page) {
  try{
    const response = await axios.get(BASE_URL, {
      params: {
       key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: PER_PAGE,
       },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error;
  }
} 


