import {atom} from "recoil";

export const selectedRecipeState = atom<string | null>({
    key: 'selectedRecipe',
    default: null
});