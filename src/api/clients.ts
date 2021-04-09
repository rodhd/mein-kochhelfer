import {RecipesClient} from "./generated";

const apiHost = "https://localhost:5001"

export const recipesClient = new RecipesClient(apiHost)