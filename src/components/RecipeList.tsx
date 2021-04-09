import {Box, Text} from "grommet";
import {RecipeListItem} from "./RecipeListItem";
import React from "react";
import {useRecoilValue} from "recoil";
import {recipesState} from "../state/recipesState";

export const RecipeList = () => {
    const recipes = useRecoilValue(recipesState);

    return (
        <Box fill direction="row">
            <table>
                <thead>
                    <tr>
                        <th>
                            <Text weight="bold" textAlign="center">Title</Text>
                        </th>
                        <th>
                            <Text weight="bold" textAlign="center">Rating</Text>
                        </th>
                        <th>
                            <Text weight="bold" textAlign="center">Author</Text>
                        </th>
                        <th>
                            <Text weight="bold" textAlign="center">Ingredients</Text>
                        </th>
                        <th>
                            <Text weight="bold" textAlign="center">Steps</Text>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {recipes !== null && recipes.map((x) =>
                        <RecipeListItem key={x.id} recipe={x}/>
                    )}
                </tbody>
            </table>
            {/*<Box direction={'column'} gap={'small'}>
                {recipes !== null && recipes.map((x) =>
                    <RecipeListItem key={x.id} recipe={x}/>
                )}
            </Box>*/}
        </Box>
    );
}