import {Box, Button, Text} from "grommet";
import React from "react";
import {Star, Trash, View} from "grommet-icons";
import {useRecoilState, useSetRecoilState} from "recoil";
import {selectedRecipeState} from "../state/selectedRecipeState";
import {Recipe} from "../api/generated";
import {recipesClient} from "../api/clients";
import {recipesState} from "../state/recipesState";

const RatingStars = ({rating}: { rating: number }) => <Box direction={'row'}>
    {[...Array(rating)].map((el, i) => <Star key={i}/>)}
    {[...Array(5 - rating)].map((el, i) => <Star color={'light-4'} key={i}/>)}
</Box>

export const RecipeListItem = ({recipe}: {recipe: Recipe}) => {
    const setSelectedRecipe = useSetRecoilState(selectedRecipeState);
    const [recipes, setRecipes] = useRecoilState(recipesState);
    const onDelete = async () => {
        await recipesClient.deleteRecipe(recipe.id)
        const updatedRecipes = await recipesClient.getAllRecipes();
        setRecipes(updatedRecipes);
    }
    return (
        <tr>
            <td>
                <Text weight="bold" textAlign="center">{recipe.title}</Text>
            </td>
            
            <td>
                <RatingStars rating={recipe.rating} />
            </td>
            
            <td>
                <Text textAlign="center">{recipe.author.firstName} {recipe.author.lastName}</Text>
            </td>

            <td align="center">
                <Text>{recipe.ingredients.length}</Text>
            </td>

            <td align="center">
                <Text>{recipe.steps.length}</Text>
            </td>

            <td>
                <Button primary icon={<View />} onClick={() => setSelectedRecipe(recipe.id)}/>
            </td>
            
            <td>
                <Button secondary icon={<Trash />} onClick={onDelete} />
            </td>
        </tr>
    );
}