const mongoose = require("mongoose");
const Recipe = require("./models/Recipe.model");
const data = require("./data");
const MONGODB_URI = "mongodb://localhost:27017/recipe_app";

mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    return Recipe.deleteMany();
  })
  .then(() => {
    return Recipe.create({
      title: `Rum Punch`,
      level: `Easy Peasy`,
      ingredients: [
        `Orange juice`,
        `Lime juice`,
        `Golden rum`,
        `Sugar syrup`,
        `Grenadine syrup`,
        `Angostura bitters`,
        `Ice cubes`,
        `Grated nutmeg`,
        `Orange slices`,
        `Maraschino cherries`,
      ],
      cuisine: `Carribian`,
      dishType: `Drink`,
      image: `https://images.immediate.co.uk/production/volatile/sites/30/2020/08/rum-punch-5c8fd79.jpg?quality=90&webp=true&resize=300,272`,
      duration: 5,
      creator: `John Smith`,
      created: Date.now(),
    });
  })
  .then((recipe) => {
    console.log(`Recipe done: ${recipe.title}`);
    return Recipe.insertMany(data);
  })
  .then((recipes) => {
    recipes.forEach((recipe) => {
      console.log("-", recipe.title);
    });
    return Recipe.findOneAndUpdate({ title: "Rigatoni alla Genovese" }, { duration: 100 });
  })
  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(() => {
    console.log(`Recipe removed`);
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  })
  .finally(() => {
    console.log(`Disconnected`);
    mongoose.disconnect();
  });
