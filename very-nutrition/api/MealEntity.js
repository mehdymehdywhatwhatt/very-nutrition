const mongoose = require('mongoose');

const MealEntitySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required : [true, 'please enter a meal name']
    },
    spoonacular_ids: {
      type: [Number],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const MealEntity = mongoose.model('MealEntity', MealEntitySchema);

module.exports = MealEntity;

