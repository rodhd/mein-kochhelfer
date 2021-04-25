import {atom} from "recoil";

export const createNewRecipeState = atom<boolean>({
    key: "createNewRecipe",
    default: false
});