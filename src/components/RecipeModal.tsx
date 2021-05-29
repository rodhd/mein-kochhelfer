import {
    Box,
    Button,
    Form,
    FormField,
    Layer,
    RadioButtonGroup,
    TextInput,
    ThemeContext
} from "grommet";
import React, {useEffect, useState} from "react";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import {getSelectedRecipeSelector} from "../state/getSelectedRecipeSelector";
import {selectedRecipeState} from "../state/selectedRecipeState";
import {Ingredient, Recipe, Step, Unit} from "../api/generated";
import {Add, Close} from "grommet-icons";
import {recipesClient} from "../api/clients";
import {NotificationToast} from "./NotificationToast";
import {recipesState} from "../state/recipesState";
import {createNewRecipeState} from "../state/createNewRecipeState";
import {newRecipe} from "../helpers/constants/newRecipe";
import {IngredientElement} from "./IngredientElement";
import {AuthorElement} from "./AuthorElement";
import {StepsElement} from "./StepsElement";

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
};

export const RecipeModal = () => {
    const [disabled, setDisabled] = useState<boolean>(true);
    const [showToast, setShowToast] = useState<boolean>(false);

    //Recoil state
    const setSelectedRecipe = useSetRecoilState(selectedRecipeState);
    const selectedRecipeValue = useRecoilValue(getSelectedRecipeSelector);
    const [recipes, setRecipes] = useRecoilState(recipesState);
    const [createNewRecipe, setCreateNewRecipe] = useRecoilState(createNewRecipeState);
    
    //Recipe values
    const [recipe, setRecipe] = useState<Recipe>(createNewRecipe ? newRecipe : selectedRecipeValue!);
    useEffect(() => {
        if (createNewRecipe) {
            setDisabled(false);
        }
    });
    
    //Change handlers
    const onIngredientChange = (index: number, key: string, value: any) => {
        console.log(`Changing ingredient key ${key} with index ${index} with value ${value}`);
        const newIngredientList = recipe.ingredients.map((x, i) => {
            if (i === index) {
                if (key === 'unit') {
                    return {
                        ...x,
                        'unit': value['value']
                    };
                }
                return {
                    ...x,
                    [key]: value
                };
            }
            return x;
        })
        setRecipe({...recipe, ingredients: newIngredientList});
    };

    const onStepChange = (index: number, value: string) => {
        const newStepList = recipe.steps.map((x, i) => {
            if (i === index) {
                return {
                    ...x,
                    description: value
                };
            }
            return x;
        });
        setRecipe({...recipe, steps: newStepList});
    };
    
    //Add elements
    const onAddIngredient = () => {
        const newIngredientList: Ingredient[] = [
            ...recipe.ingredients,
            {
                name: '',
                amount: 0,
                unit: 0
            }
        ];
        setRecipe({...recipe, ingredients: newIngredientList})
    };

    const onAddStep = () => {
        const nextIndex = Math.max(...recipe.steps.map(x => x.index), -1) + 1;
        const newStepList: Step[] = [
            ...recipe.steps,
            {
                index: nextIndex,
                description: ''
            }
        ];
        setRecipe({...recipe, steps: newStepList})
    };
    
    //Remove elements
    const onRemoveIngredient = (index: number) => {
        const newIngredientList = recipe.ingredients.filter((x, i) => i !== index);
        setRecipe({...recipe, ingredients: newIngredientList});
    };

    const onRemoveStep = (index: number) => {
        const newStepList = recipe.steps
            .filter((x, i) => i !== index)
            .map((x, i) => x = {...x, index: i});
        setRecipe({...recipe, steps: newStepList});
    }

    // API calls

    const saveRecipe = async () => {
        if(createNewRecipe) {
            await recipesClient.addRecipe({
                author: recipe.author,
                ingredients: recipe.ingredients,
                rating: recipe.rating,
                steps: recipe.steps,
                title: recipe.title
            });
        }
        else {
            await recipesClient.updateRecipe(recipe.id, recipe);
        }
        const newRecipes = await recipesClient.getAllRecipes();
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
            setDisabled(true);
            setSelectedRecipe(null);
            setCreateNewRecipe(false);
            setRecipes(newRecipes);
        }, 500);
    };
    
    const onClose = () => {
        setSelectedRecipe(null);
        setCreateNewRecipe(false);
    };
    return (
        <Layer
            position="center"
        >
            <Box
                align="start"
                justify="center"
                gap="small"
                direction="row"
                alignSelf="center"
                pad="large"
                overflow="auto"
            >
                <Form>
                    <FormField label="Title" name="title">
                        <TextInput value={recipe!.title}
                                   onChange={event => setRecipe({...recipe, title: event.target.value})}
                                   disabled={disabled}/>
                    </FormField>
                    <FormField label="Rating" name="rating">
                        <ThemeContext.Extend
                            value={radioButtonTheme}
                        >
                            <RadioButtonGroup
                                name="rating-radio"
                                value={recipe!.rating}
                                onChange={(event: any) => setRecipe({...recipe, rating: parseInt(event.target.value)})}
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

                    <AuthorElement firstName={recipe!.author.firstName}
                                   setFirstName={event => setRecipe({
                                       ...recipe,
                                       author: {...recipe.author, firstName: event.target.value}
                                   })}
                                   lastName={recipe!.author.lastName}
                                   setLastName={event => setRecipe({
                                       ...recipe,
                                       author: {...recipe.author, lastName: event.target.value}
                                   })}
                                   disabled={disabled}
                    />

                    <FormField label="Ingredients" name="ingredients">
                        {recipe!.ingredients.map((x, i) =>
                            <IngredientElement
                                key={`ingredient-${i}`}
                                value={x.name}
                                setValue={event => onIngredientChange(i, 'name', event.target.value)}
                                amount={x.amount!}
                                setAmount={event => onIngredientChange(i, 'amount', event.target.value.replace(/\D/, ''))}
                                unit={x.unit}
                                setUnit={event => onIngredientChange(i, 'unit', event)}
                                onDelete={() => onRemoveIngredient(i)}
                                disabled={disabled}
                            />
                        )}
                    </FormField>

                    {!disabled && <Box>
                        <Button icon={<Add/>} label="Add Ingredient" onClick={onAddIngredient} alignSelf="end"
                                secondary/>
                    </Box>}

                    <FormField label="Steps" name="steps">
                        {recipe!.steps.map((x, i) =>
                            <StepsElement key={`steps-${x.index}`} index={x.index} text={x.description}
                                          setText={event => onStepChange(i, event.target.value)}
                                          onDelete={() => onRemoveStep(i)} disabled={disabled}/>
                        )}
                    </FormField>

                    {!disabled && <Box>
                        <Button icon={<Add/>} label="Add Step" onClick={onAddStep} alignSelf="end"
                                secondary/>
                    </Box>}

                    <Box direction="row" justify="center" gap="medium">
                        {disabled ?
                            <Button primary label="Edit" onClick={() => setDisabled(!disabled)}/>
                            : <Button primary label="Save" onClick={async () => await saveRecipe()}/>
                        }
                        <Button secondary label="Close" onClick={onClose}/>
                    </Box>
                </Form>
                {showToast &&
                <NotificationToast isWarning={false} text={"Recipe saved!"}/>
                }
            </Box>
        </Layer>
    );
}