import {useRecoilState, useSetRecoilState} from "recoil";
import {searchBarInputState} from "../state/searchBarInputState";
import {Box, Button, TextInput} from "grommet";
import {Add, Search} from "grommet-icons";
import React from "react";
import {createNewRecipeState} from "../state/createNewRecipeState";

export const SearchBar = () => {
    const [searchBarInput, setSearchBarInput] = useRecoilState(searchBarInputState);
    const setCreateNewRecipe = useSetRecoilState(createNewRecipeState);
    return (
        <Box
            direction="row"
            justify="center"
            gap="small"
            pad="medium"
            width={{"max": "600px"}}
            fill="horizontal"
        >
            <TextInput 
                value={searchBarInput} 
                onChange={event => setSearchBarInput(event.target.value)}
                icon={<Search/>}
                placeholder="search recipes..."
            />
            <Button 
                icon={<Add/>} 
                label="Add"
                primary
                onClick={() => setCreateNewRecipe(true)}
            />
        </Box>
    );
}