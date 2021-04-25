import {Box, Button, Text} from "grommet";
import React from "react";
import {Star} from "grommet-icons";
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
                <Button primary label="View/Edit" onClick={() => setSelectedRecipe(recipe.id)}/>
            </td>
            
            <td>
                <Button secondary label="Delete" onClick={onDelete} />
            </td>
        </tr>
        
        /*<Card
            background={'light-1'} 
            margin={{horizontal: 'large'}}
        >
            <CardBody pad={'small'}>
                <Heading level={3}>
                    {recipe.title}
                </Heading>
                <Box direction={'row'} align={'center'} gap={'small'} flex>
                    <RecipeImage src={recipe.photoUrl ?? ''}/>
                    <RatingStars rating={recipe.rating}/>
                </Box>
            </CardBody>
            <CardFooter background={'light-2'}
                        pad={'small'}><Text>Author: {recipe.author.firstName} {recipe.author.lastName}</Text></CardFooter>
        </Card>*/
    );
}