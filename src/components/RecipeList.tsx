import {Box, Text} from "grommet";
import {RecipeListItem} from "./RecipeListItem";
import React from "react";
import {useRecoilValue} from "recoil";
import {recipesState} from "../state/recipesState";
import {getFilteredRecipesSelector} from "../state/getFilteredRecipesSelector";

export const RecipeList = () => {
    const recipes = useRecoilValue(getFilteredRecipesSelector);

    return (
        <Box fill gap="medium" pad="medium"  width={{"min": "1000px", "max": "60%"}}>
            {recipes !== null && recipes.map((x) =>
                <RecipeListItem key={x.id} recipe={x}/>
            )}
        </Box>
    );
}