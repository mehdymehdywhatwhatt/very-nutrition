const mongoose = require('mongoose');

const MealEntitySchema = mongoose.Schema(
  {
    meal_name: {
      type: String,
      required : true,
    },
    spoonacular_ids: {
      type: [Number],
      required: true,
    },
  },
  {
    timestamps: true
  }
);

const MealEntity = mongoose.model('MealEntity', MealEntitySchema);

module.exports = MealEntity;

