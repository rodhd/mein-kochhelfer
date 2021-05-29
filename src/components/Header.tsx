import React from "react";
import {Box, Text} from "grommet";

export const Header = () => {
    return (
        <Box
            gridArea="header"
            direction="row"
            align="center"
            justify="between"
            pad={{ horizontal: 'medium', vertical: 'small' }}
            background="dark-2"
        >
            <Text size="large">
                MeinKochhelfer
            </Text>
        </Box>
    )
}