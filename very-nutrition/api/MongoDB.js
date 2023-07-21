import express from 'express';
import mongoose from 'mongoose';
import MealEntity from './MealEntity';
const app = express();

const urlMongoDB =
  'mongodb+srv://exampleuser:exampleuser@cluster0.saatmwu.mongodb.net/very-nutrition-db?retryWrites=true&w=majority';

// apply json 'middleware'.
app.use(express.json());
app.use(express.urlencoded( { extended: false } ));

// attach get/post controls.
app.get('/', (request, response) => {
  response.send('hello node api');
});

// read meal entity.
app.get('/mealentity', async (request, response) => {
  try {
    const mealEntity = await MealEntity.find({});
    response.status(200).json(mealEntity);
  }
  catch (error) {
    response.status(500).json( { message : error.message } );
  }
});

// read meal entity by id.
app.get('/mealentity/:id', async (request, response) => {
  try {
    const {id} = request.params;
    const mealEntity = await MealEntity.findById(id);
    response.status(200).json(mealEntity);
  }
  catch (error) {
    response.status(500).json( { message : error.message } );
  }
});

// create meal entity.
app.post('/mealentity', async (request, response) => {
  try {
    const mealEntity = await MealEntity.create(request.body);
    response.status(200).json(mealEntity);
  }
  catch (error) {
    console.log(error.message);
    response.status(500).json( { message: error.message } );
  }
});

// update meal entity.
app.put('/mealentity/:id', async (request, response) => {
  try {
    const {id} = request.params;
    const mealEntity = await MealEntity.findByIdAndUpdate(id, request.body);
    if (!mealEntity) {
      response.status(404).json({ message: `cannot find any mealEntity with id ${id}`});
    }
    else {
      const mealEntityUpdated = await MealEntity.findById(id);
      response.status(200).json(mealEntityUpdated);
    }
  }
  catch (error) {
    console.log(error.message);
    response.status(500).json( { message: error.message } );
  }
});

// delete meal entity.
app.delete('/mealentity/:id', async (request, response) => {
  try {
    const {id} = request.params;
    const mealEntity = await MealEntity.findByIdAndDelete(id);
    if (!mealEntity) {
      response.status(404).json({ message: `cannot find any mealEntity with id ${id}`});
    }
    else {
      response.status(200).json(mealEntity);
    }
  }
  catch (error) {
    response.status(500).json({ message: error.message });
  }
});

mongoose.set('strictQuery', false);

mongoose.connect(urlMongoDB).then(() => {
  app.listen(3000, () => {
    console.log('node api app is running on port 3000');
  });
}).catch((error) => {
  console.log(error);
});


