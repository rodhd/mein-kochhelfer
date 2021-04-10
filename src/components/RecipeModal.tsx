import {
    Box,
    Button,
    Form,
    FormField, Grid,
    grommet,
    Layer,
    RadioButtonGroup,
    RangeInput, Select,
    TextInput,
    ThemeContext
} from "grommet";
import React, {useState} from "react";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {getSelectedRecipeSelector} from "../state/getSelectedRecipeSelector";
import {selectedRecipeState} from "../state/selectedRecipeState";
import {deepMerge} from "grommet/utils";
import {Unit} from "../api/generated";

const radioButtonTheme = {
    radioButton: {
        container: {
            extend: {
                flexDirection: "column",
                justifyContent: "center"
            }
        },
        extend: {
            marginRight: 5,
            marginLeft: 5
        }
    }
}

const units = [
    {label: 'Grams', value: Unit.Grams},
    {label: 'Cups', value: Unit.Cups},
    {label: 'Liters', value: Unit.Liters},
    {label: 'Ounces', value: Unit.Ounces},
    {label: 'Pounds', value: Unit.Pounds},
    {label: 'Tablespoons', value: Unit.Tablespoons},
    {label: 'Teaspoon', value: Unit.Teaspoons}
]


const IngredientElement = ({value, amount, unit, disabled}: {value: string, amount: number, unit: any, disabled: boolean}) => {
    return(
        <Grid 
            columns={['2/4', '1/4', '1/4']}
            rows={['auto']}
            areas={[['name', 'amount', 'unit']]}
            gap="xsmall"
            margin="xsmall"
        >
            <Box gridArea="name">
                <TextInput placeholder="Name" value={value} disabled={disabled}/>
            </Box>
            <Box gridArea="amount">
                <TextInput placeholder="Amount" value={amount} disabled={disabled}/>
            </Box>
            <Box gridArea="unit">
                <Select
                placeholder="Unit"
                labelKey="label"
                valueKey={{key: "value", reduce: true}}
                value={unit}
                options={units}
                disabled={disabled}
            /></Box>
        </Grid>
        
    );
}


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
                        <ThemeContext.Extend
                            value={radioButtonTheme}
                        >
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
                        </ThemeContext.Extend>
                    </FormField>
                    
                    <FormField label="Ingredients" name="ingredients">
                        {selectedRecipeValue!.ingredients.map((x, i) => 
                            <IngredientElement key={`ingredient-${i}`} value={x.name} amount={x.amount!} unit={x.unit} disabled={disabled}/>
                            )}
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