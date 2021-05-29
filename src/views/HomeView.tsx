import {RecipeList} from "../components/RecipeList";
import {Box, Grid, Main} from "grommet";
import React, {useEffect} from "react";
import {recipesClient} from "../api/clients";
import {useRecoilState, useRecoilValue} from "recoil";
import {selectedRecipeState} from "../state/selectedRecipeState";
import {recipesState} from "../state/recipesState";
import {RecipeModal} from "../components/RecipeModal";
import {SearchBar} from "../components/SearchBar";
import {createNewRecipeState} from "../state/createNewRecipeState";
import {Header} from "../components/Header";
import {NavSidebar} from "../components/NavSidebar";

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
        <Grid
            fill
            columns={["auto", "flex"]}
            rows={["auto", "flex"]}
            areas={[
                { name: 'header', start: [0, 0], end: [1, 0] },
                { name: 'sidebar', start: [0, 1], end: [0, 1] },
                { name: 'main', start: [1, 1], end: [1, 1] },
            ]}
        >
            <Box gridArea="header">
                <Header/>
            </Box>
            
            <Box gridArea="sidebar">
               <NavSidebar /> 
            </Box>
            
            <Main align="center" gridArea="main">
                <SearchBar/>
                <Box justify="center">
                    <RecipeList/>
                </Box>
                {(selectedRecipe != null || createNewRecipe) && <RecipeModal/>}
            </Main>
        </Grid>);
}