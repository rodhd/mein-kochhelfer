import {Box, Image} from "grommet";
import {Cafeteria} from "grommet-icons"
import React from "react";

type RecipeImageProps = {
    src: string | null
}

export const RecipeImage = ({src}: RecipeImageProps) => <Box background={'light-4'} pad={'small'} gap={'small'}>
    {src !== null ? (
        <Image fit={'cover'} src={src}/>
    ) : <Cafeteria size={'large'}/>}
</Box>