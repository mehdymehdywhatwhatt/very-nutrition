import MealEntity from './MealEntity';
import axios from 'axios';
const mongoose = require('mongoose');

const urlMongo = 'https://us-east-2.aws.data.mongodb-api.com/app/data-hwvyx/endpoint/data/v1'
const keyMongo = 'QQIgS8FacIjLpkqDl6q55ukMquRh2zVXHfvoyb5P8KjtJEUM0pzaVQCpSneq7mhh';

const findAllMongo = '/action/find';
const findOneMongo = '/action/findOne';
const insertOneMongo = '/action/insertOne';
const deleteOneMongo = '/action/deleteOne';
const updateOneMongo = '/action/updateOne';

/**
 * Finds a meal of argument meal name, and returns it.
 * If no meal exists with argument name, returns 'null'.
 */
const findMealByName = async (arg_meal_name) => {

  var data = JSON.stringify({
    "collection": 'mealentities',
    "database": 'exampleuser-meals',
    "dataSource": 'Cluster0',
    "filter": {
      "meal_name": arg_meal_name,
    }
  });

  var config = {
    method: 'post',
    url: `${urlMongo}${findOneMongo}`,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': keyMongo,
    },
    data: data
  };

  let rtn = null;
  await axios(config)
    .then(function (response) {
      if (response && response.data && response.data.document) {
        rtn = response.data.document;
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  return rtn;
}

/**
 * Returns array of all meals.
 */
const findAllMeals = async () => {

  var data = JSON.stringify({
    'collection': 'mealentities',
    'database': 'exampleuser-meals',
    'dataSource': 'Cluster0',
    'filter': { }
  });

  var config = {
    method: 'post',
    url: `${urlMongo}${findAllMongo}`,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': keyMongo,
    },
    data: data
  };

  let rtn = null;
  await axios(config)
    .then(function (response) {
      rtn = response.data.documents;
    })
    .catch(function (error) {
      console.log(error);
    });

  return rtn;

// example find 
// curl --request POST \
//   'https://data.mongodb-api.com/app/<Data API App ID>/endpoint/data/v1/action/findOne' \
//   --header 'Content-Type: application/json' \
//   --header 'apiKey: <Data API Key>' \
//   --data-raw '{
//       "dataSource": "<cluster name>",
//       "database": "learn-data-api",
//       "collection": "people",
//       "filter": { "name": "John Sample" }
//   }'

}

/**
 * Creates a meal of the argument name, and returns its uid.
 * If a meal of the argument name already exists,
 *   does nothing to the database, and returns null.
 */
const createMeal = async (arg_meal_name) => {

  const alreadyExists = await findMealByName(arg_meal_name);
  if (alreadyExists !== null) {
    return null;
  } 

  var data = JSON.stringify({
    "collection": 'mealentities',
    "database": 'exampleuser-meals',
    "dataSource": 'Cluster0',
    "document": {
      "meal_name" : arg_meal_name,
      "spoonacular_ids" : [],
    }
  });

  var config = {
    method: 'post',
    url: `${urlMongo}${insertOneMongo}`,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': keyMongo,
    },
    data: data
  };

  let rtn = null;
  await axios(config)
    .then(function (response) {
      rtn = response.data.insertedId;
    })
    .catch(function (error) {
      console.log(error);
    });

  return rtn;

// example create
// curl --request POST \
//   'https://data.mongodb-api.com/app/<Data API App ID>/endpoint/data/v1/action/insertOne' \
//   --header 'Content-Type: application/json' \
//   --header 'apiKey: <Data API Key>' \
//   --data-raw '{
//       "dataSource": "<cluster name>",
//       "database": "learn-data-api",
//       "collection": "people",
//       "document": {
//         "name": "John Sample",
//         "age": 42
//       }
//   }'
//

}

/*
 * Deletes one meal of given name.
 * If no meal exists with this name, does nothing.
 * Returns count of meals deleted.
 */
const deleteMeal = async (arg_meal_name) => {

  var data = JSON.stringify({
    "collection": 'mealentities',
    "database": 'exampleuser-meals',
    "dataSource": 'Cluster0',
    "filter": {
      "meal_name" : arg_meal_name,
    }
  });

  var config = {
    method: 'post',
    url: `${urlMongo}${deleteOneMongo}`,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': keyMongo,
    },
    data: data
  };

  let rtn = null;
  await axios(config)
    .then(function (response) {
      rtn = response.data.deletedCount;
    })
    .catch(function (error) {
      console.log(error);
    });

  return rtn;

// example delete
// curl --request POST \
//   'https://data.mongodb-api.com/app/<Data API App ID>/endpoint/data/v1/action/deleteOne' \
//   --header 'Content-Type: application/json' \
//   --header 'apiKey: <Data API Key>' \
//   --data-raw '{
//       "dataSource": "<cluster name>",
//       "database": "learn-data-api",
//       "collection": "people",
//       "filter": { "name": "John Sample" }
//   }'
// 

}

/* 
 * Updates one meal in the database.
 * Returns the count of modified elements, when 'arg_meal_name' is found;
 *   and sets its 'spoonacular_ids' to 'arg_new_spoonacular_ids'.
 * Otherwise, returns 'null'.
 * */
const updateMeal = async (arg_meal_name, arg_new_spoonacular_ids) => {

  var data = JSON.stringify({
    "collection": 'mealentities',
    "database": 'exampleuser-meals',
    "dataSource": 'Cluster0',
    "filter": {
      "meal_name" : arg_meal_name,
    },
    "update" : {
      "$set": {
        "meal_name" : arg_meal_name,
        "spoonacular_ids": arg_new_spoonacular_ids,
      }
    },
    "upsert" : false,
  });

  var config = {
    method: 'post',
    url: `${urlMongo}${updateOneMongo}`,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': keyMongo,
    },
    data: data
  };

  let rtn = null;
  await axios(config)
    .then(function (response) {
      rtn = response.data.modifiedCount;
    })
    .catch(function (error) {
      console.log(error);
    });

  return rtn;
}

// left todo:
//   const renameMeal = async (arg_meal_name, arg_new_meal_name) => {

export {
findMealByName,
findAllMeals,
createMeal,
deleteMeal,
updateMeal, }

