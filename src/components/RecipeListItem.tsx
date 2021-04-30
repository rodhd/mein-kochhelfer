import {Box, Button, Grid, Text} from "grommet";
import React from "react";
import {Basket, Cafeteria, Star, Task, Trash, User, View} from "grommet-icons";
import {useRecoilState, useSetRecoilState} from "recoil";
import {selectedRecipeState} from "../state/selectedRecipeState";
import {Recipe} from "../api/generated";
import {recipesClient} from "../api/clients";
import {recipesState} from "../state/recipesState";

const RatingStars = ({rating}: { rating: number }) => <Box direction={'row'}>
    {[...Array(rating)].map((el, i) => <Star key={i}/>)}
    {[...Array(5 - rating)].map((el, i) => <Star color={'light-4'} key={i}/>)}
</Box>

export const RecipeListItem = ({recipe}: { recipe: Recipe }) => {
    const setSelectedRecipe = useSetRecoilState(selectedRecipeState);
    const [recipes, setRecipes] = useRecoilState(recipesState);
    const onDelete = async () => {
        await recipesClient.deleteRecipe(recipe.id)
        const updatedRecipes = await recipesClient.getAllRecipes();
        setRecipes(updatedRecipes);
    }
    return (
        <Box
            direction="row-responsive"
            pad="medium"
            align="start"
            round
            background={{color: 'light-2', opacity: 'strong'}}
            border={true}
        >
            <Grid
                rows={['auto']}
                columns={['small', 'small', 'flex', 'flex', 'medium', 'flex', 'flex']}
                areas={[['title', 'rating', 'ingredients', 'steps', 'author', 'view', 'delete']]}
                gap="small"
            >
                <Box
                    pad="small"
                    direction="row"
                    gridArea="title"
                >
                    <Cafeteria/>
                    <Text>{recipe.title}</Text>
                </Box>

                <Box
                    pad="small"
                    gridArea="rating"
                >
                    <RatingStars rating={recipe.rating}/>
                </Box>

                <Box
                    pad="small"
                    direction="row"
                    round={true}
                    gap="xsmall"
                    background={{color: 'accent-1', opacity: 'strong'}}
                    gridArea="ingredients"
                >
                    <Basket/>
                    <Text>{recipe.ingredients.length}</Text>
                </Box>

                <Box
                    pad="small"
                    direction="row"
                    align="center"
                    gap="xsmall"
                    round={true}
                    background={{color: 'accent-2', opacity: 'strong'}}
                    gridArea="steps"
                >
                    <Task/>
                    <Text>{recipe.steps.length}</Text>
                </Box>

                <Box
                    pad="small"
                    align="center"
                    direction="row"
                    gridArea="author"
                >
                    <User/>
                    <Text>{recipe.author.firstName} {recipe.author.lastName}</Text>
                </Box>

                <Box gridArea="view" align="center">
                    <Button primary icon={<View/>} onClick={() => setSelectedRecipe(recipe.id)}/>
                </Box>

                <Box gridArea="delete" align="center">
                    <Button secondary icon={<Trash/>} onClick={onDelete}/>
                </Box></Grid>
        </Box>
    );
}