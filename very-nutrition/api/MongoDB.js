import mongoose from 'mongoose';
import MealEntity from './MealEntity';

mongoose.set('strictQuery', false);

const urlMongo = 'mongodb+srv://exampleuser:exampleuser@cluster0.saatmwu.mongodb.net/exampleuser-meals?retryWrites=true&w=majority';

const findMealByName = async (arg_meal_name) => {
  return await MealEntity.findOne({ meal_name : { $eq:arg_meal_name } });
}

const findAllMeals = async () => {
  return await MealEntity.find({});
}

const createMeal = async (arg_meal_name, arg_spoonacular_ids) => {
  const meal = await findMealByName(arg_meal_name);
  if (!meal) {
    return await MealEntity.create({
      meal_name : arg_meal_name,
      spoonacular_ids : arg_spoonacular_ids
    });
  }
  else { return null; }
}

const deleteMeal = async (arg_meal_name) => {
  const meal = await findMealByName(arg_meal_name);
  if (meal) {
    return await MealEntity.findByIdAndDelete(meal._id);
  }
  else { return null; }
}

const updateMeal = async (arg_meal_name, arg_new_spoonacular_ids) => {
  const meal = await findMealByName(arg_meal_name);
  if (meal) {
    return await MealEntity.findByIdAndUpdate(meal._id, {
      meal_name : meal.meal_name,
      spoonacular_ids : arg_new_spoonacular_ids,
    });
  }
  else { return null; }
}

const renameMeal = async (arg_meal_name, arg_new_meal_name) => {
  const meal = await findMealByName(arg_meal_name);
  if (meal) {
    return await MealEntity.findByIdAndUpdate(meal._id, {
      meal_name : arg_new_meal_name,
      spoonacular_ids : meal.spoonacular_ids,
    });
  }
  else { return null; }
}

