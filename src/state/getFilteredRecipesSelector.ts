import {selector} from "recoil";
import {Recipe} from "../api/generated";
import {recipesState} from "./recipesState";
import {searchBarInputState} from "./searchBarInputState";

export const getFilteredRecipesSelector = selector<Recipe[]>({
    key: 'getFilteredRecipes',
    get: ({get}) => {
        const recipes = get(recipesState);
        const searchBarInput = get(searchBarInputState);
        console.log("update filtered")
        if (!searchBarInput && searchBarInput !== '') {
            return recipes;
        }
        
        return recipes.filter(x => x.title.toLowerCase().includes(searchBarInput.toLowerCase()))
    }
});