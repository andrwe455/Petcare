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

module.exports = {
  createRecipe
}