import { keyRapidAPI } from '../constants';
const axios = require('axios');

const urlSpoonacular =
  'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com';

async function getFoodProduct(foodProduct) {
  const options = {
    method: 'GET',
    url: `${urlSpoonacular}/food/products/search`,
    params: {
      query : foodProduct,
      offset : 0,
      number : 1,
    },
    headers: {
      'X-RapidAPI-Key': keyRapidAPI,
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
    }
  };

  try {
    const response = await axios.request(options);
    return response.data;
  }
  catch (error) {
    return {};
  }
};

async function getFoodProductDetails(id) {
  const options = {
    method: 'GET',
    url: `${urlSpoonacular}/food/products/${id}`,
    headers: {
      'X-RapidAPI-Key': keyRapidAPI,
      'X-RapidAPI-Host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com'
    }
  };
  
  try {
    const response = await axios.request(options);
    return response.data;
  }
  catch (error) {
    return {};
  }
}

export { getFoodProduct, getFoodProductDetails };

// Spoonacular Recipe - Food - Nutrition API
// 
// RapidAPI > "Products" > "Search Grocery Products"
// endpoint:
// https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com \
//   /food/products/search
// 
// return schema:
//   id: [integer]
//   title: [string]
//   image: [string, url]
//   imageType: [string, extension of 'image']
// 
// RapidAPI > "Products" > "Get Product Information"
// endpoint:
// https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com \
//   /food/products/22347
// 
// return schema:
//   id
//   title
//   nutrition
//   ingredients
//   badges
// 

