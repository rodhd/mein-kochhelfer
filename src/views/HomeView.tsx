import {RecipeList} from "../components/RecipeList";
import {Box, Main} from "grommet";
import React, {useEffect} from "react";
import {recipesClient} from "../api/clients";
import {useRecoilState, useRecoilValue} from "recoil";
import {selectedRecipeState} from "../state/selectedRecipeState";
import {recipesState} from "../state/recipesState";
import {RecipeModal} from "../components/RecipeModal";
import {SearchBar} from "../components/SearchBar";
import {createNewRecipeState} from "../state/createNewRecipeState";

export function HomeView() {
    const [recipes, setRecipes] = useRecoilState(recipesState);
    const selectedRecipe = useRecoilValue(selectedRecipeState);
    const createNewRecipe = useRecoilValue(createNewRecipeState);
    
    useEffect(() => {
        const fetchRecipes = async () => {
            const result = await recipesClient.getAllRecipes();
            setRecipes(result);
        };
        
        fetchRecipes();
    }, []);
    
    return(
        <Main align="center">
            <SearchBar/>
            <Box justify="center">
                <RecipeList />
            </Box>
            {(selectedRecipe != null || createNewRecipe) && <RecipeModal />}
        </Main>);
}