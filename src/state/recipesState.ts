import {atom, atomFamily} from "recoil";
import {Recipe} from "../api/generated";

export const recipesState = atom<Recipe[]>({
    key: 'recipes',
    default: []
});