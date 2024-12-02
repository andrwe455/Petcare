const recipeSchema = require('../schemas/recipeSchema');

async function createRecipe(req, res){

  try{

    const recipeData = {
      ...req.body,
      generation_date: new Date()
    };

    await recipeSchema.create(recipeData)
    return res.status(200).json({message: 'New recipe created'})
  } catch(error){

    console.error(error);
    return res.status(500).json({message: 'Could not create recipe'})
  }
}

async function modifyRecipe(req, res){

  const{owner, pet, assigner, medicines, dose_amount, dose_time_type, dose_time_amount, dose_type, initial_date, final_date, recommendations} = req.body;
  const generation_date = new Date();

}

async function getRecipes(req, res) {

  try {
    const { owner, pet } = req.query;
    const recipes = await recipeSchema.find({ owner: owner, pet: pet });

    return res.status(200).json(recipes);
  } 
  catch (error) {
    console.error('Error fetching recipes:', error);
    return res.status(500).json({ message: 'Could not fetch recipes.' });
  }
}

module.exports = {
  createRecipe,
  modifyRecipe,
  getRecipes
}