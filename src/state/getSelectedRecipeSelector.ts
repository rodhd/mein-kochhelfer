import {selector} from "recoil";
import {recipesState} from "./recipesState";
import {selectedRecipeState} from "./selectedRecipeState";
import {Recipe} from "../api/generated";

export const getSelectedRecipeSelector = selector<Recipe | undefined>({
    key: 'getSelectedRecipe',
    get: ({get}) => {
        const recipes = get(recipesState);
        const selectedRecipe = get(selectedRecipeState);
        
        if (selectedRecipe == null || recipes.length === 0) {
            return;
        }
        
        return recipes.find(x => x.id == selectedRecipe);
    }
});