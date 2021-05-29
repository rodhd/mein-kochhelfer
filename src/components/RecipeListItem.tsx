import {Box, Button, Grid, Text, Tip} from "grommet";
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
            direction="row"
            pad="medium"
            align="start"
            justify="center"
            fill
            round
            background={{color: 'light-2', opacity: 'strong'}}
            border={true}
        >
            <Grid
                rows={['full']}
                columns={['30%', '21%', '7%', '7%', '15%', '5%', '5%']}
                areas={[['title', 'rating', 'ingredients', 'steps', 'author', 'view', 'delete']]}
                gap="small"
                fill
            >
                <Box
                    pad="small"
                    direction="row"
                    gridArea="title"
                    gap="small"
                    fill={true}
                >
                    <Cafeteria/>
                    <Text size="xlarge">{recipe.title}</Text>
                </Box>

                <Box
                    pad="small"
                    gridArea="rating"
                    fill
                >
                    <RatingStars rating={recipe.rating}/>
                </Box>

                <Box
                    pad="small"
                    direction="row"
                    align="center"
                    round={true}
                    gap="xsmall"
                    background={{color: 'accent-1', opacity: 'strong'}}
                    gridArea="ingredients"
                    fill
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
                    a11yTitle="No. of steps"
                    fill
                >
                    <Task/>
                    <Text>{recipe.steps.length}</Text>
                </Box>

                <Box
                    pad="small"
                    align="center"
                    gap="small"
                    direction="row"
                    gridArea="author"
                    fill
                >
                    <User/>
                    <Text>{recipe.author.firstName} {recipe.author.lastName}</Text>
                </Box>

                <Box gridArea="view" align="center" fill>
                    <Tip content="View">
                        <Button primary icon={<View/>} onClick={() => setSelectedRecipe(recipe.id)}/>
                    </Tip>
                </Box>

                <Box gridArea="delete" align="center" fill>
                    <Tip content="Delete">
                        <Button secondary icon={<Trash/>} onClick={onDelete}/>
                    </Tip>
                </Box>
            </Grid>
        </Box>
    );
}