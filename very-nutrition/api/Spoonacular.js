import { keyRapidAPI } from '../constants';
import axios from 'axios';

const urlSpoonacular =
  'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com';

const FoodNutrientsArrayIndex = {
  Calcium : 0,
  Carbohydrates : 1,
  Cholesterol : 2,
  Calories : 3,
  Fat : 4,
  SaturatedFat : 5,
  Transfat : 6,
  Fiber : 7,
  Iron : 8,
  Protein : 9,
  Sodium : 10,
  Sugar : 11,
  VitaminA : 12,
  VitaminC : 13,
  NetCarbohydrates : 14,
};

async function getFoodProducts(foodName) {
  const options = {
    method: 'GET',
    url: `${urlSpoonacular}/food/products/search`,
    params: {
      query : foodName,
      offset : '0',
      number : '10',
      maxCalories: '5000',
      minProtein: '0',
      maxProtein: '100',
      minFat: '0',
      maxFat: '100',
      minCarbs: '0',
      maxCarbs: '100',
      minCalories: '0',
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
    console.log(`error: failed getFoodProducts: ${error}`);
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
    console.log(`error: failed getFoodProductDetails: ${error}`);
    return {};
  }
}

export { getFoodProducts,
  getFoodProductDetails,
  FoodNutrientsArrayIndex
  };

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

