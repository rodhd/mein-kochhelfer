import {Box, Button, Form, FormField, Layer, RadioButtonGroup, RangeInput, TextInput} from "grommet";
import React, {useState} from "react";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {getSelectedRecipeSelector} from "../state/getSelectedRecipeSelector";
import {selectedRecipeState} from "../state/selectedRecipeState";


export const RecipeModal = () => {
    const [disabled, setDisabled] = useState<boolean>(true);
    const setSelectedRecipe = useSetRecoilState(selectedRecipeState);
    const selectedRecipeValue = useRecoilValue(getSelectedRecipeSelector);
    return (
        <Layer>
            <Box
                align="center"
                justify="center"
                gap="small"
                direction="row"
                alignSelf="center"
                pad="large"
            > 
                <Form>
                    <FormField label="Title" name="title">
                        <TextInput value={selectedRecipeValue!.title} disabled={disabled}/>
                    </FormField>
                    <FormField label="Rating" name="rating">
                        <RadioButtonGroup
                        name="rating-radio"
                        value={selectedRecipeValue!.rating}
                        direction="row"
                        disabled={disabled}
                        options={[
                            {label: '1', value: 1},
                            {label: '2', value: 2},
                            {label: '3', value: 3},
                            {label: '4', value: 4},
                            {label: '5', value: 5},
                        ]}/>
                    </FormField>
                    
                    <Box direction="row">
                        <Button primary label="Edit"/>
                        <Button secondary label="Close" onClick={() => setSelectedRecipe(null)}/>
                    </Box>
                </Form>
            
            </Box>
        </Layer>
    );
}