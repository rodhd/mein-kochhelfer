import {useRecoilState} from "recoil";
import {searchBarInputState} from "../state/searchBarInputState";
import {Box, Button, TextInput} from "grommet";
import {Add, Search} from "grommet-icons";
import React from "react";

export const SearchBar = () => {
    const [searchBarInput, setSearchBarInput] = useRecoilState(searchBarInputState);
    return (
        <Box
            direction="row"
            justify="center"
            gap="small"
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
            />
            
            
            
        </Box>
    );
}