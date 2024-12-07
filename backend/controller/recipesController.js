const recipeSchema = require('../schemas/recipeSchema');

async function createRecipe(req, res){

  try{

    const recipeData = {...req.body, generation_date: new Date()};

    await recipeSchema.create(recipeData)
    return res.status(200).json({message: 'New recipe created'})
  } catch(error){

    console.error(error);
    return res.status(500).json({message: 'Could not create recipe'})
  }
}

async function modifyRecipe(req, res) {
  try {
    const { id } = req.params; // Extract recipe ID from URL
    const updatedData = {...req.body, generation_date: new Date()}; // Extract updated data

    const updatedRecipe = await recipeSchema.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedRecipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    res.status(200).json({ message: 'Recipe updated successfully', recipe: updatedRecipe });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while updating the recipe' });
  }
}

async function getRecipes(req, res) {

  try {
    const { owner, pet } = req.query;
    const recipes = await recipeSchema.find({ owner: owner, pet: pet }).populate('assigner', 'name lastName').exec();

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