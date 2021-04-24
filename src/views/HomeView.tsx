import {RecipeList} from "../components/RecipeList";
import {Box, Main} from "grommet";
import React, {useEffect} from "react";
import {recipesClient} from "../api/clients";
import {useRecoilState} from "recoil";
import {selectedRecipeState} from "../state/selectedRecipeState";
import {recipesState} from "../state/recipesState";
import {RecipeModal} from "../components/RecipeModal";
import {SearchBar} from "../components/SearchBar";

export function HomeView() {
    const [recipes, setRecipes] = useRecoilState(recipesState);
    const [selectedRecipe, setSelectedRecipe] = useRecoilState(selectedRecipeState);
    
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
            {selectedRecipe != null && <RecipeModal />}
        </Main>);
}