import {Box, Layer, Text} from "grommet";
import React from "react";
import {StatusGood, StatusWarning} from "grommet-icons";

export const NotificationToast = ({isWarning, text} : {isWarning: boolean, text: string}) => {
    return (
        <Layer
            position="bottom"
            modal={false}
            margin={{ vertical: 'medium', horizontal: 'small' }}
            responsive={false}
            plain
        >
            <Box
                align="center"
                direction="row"
                gap="small"
                justify="between"
                round="medium"
                elevation="medium"
                pad={{ vertical: 'xsmall', horizontal: 'small' }}
                background={!isWarning ? "status-ok" : "status-warning"}
            >
                <Box align="center" direction="row" gap="xsmall">
                    {!isWarning ? <StatusGood/> : <StatusWarning/>}
                    <Text>
                        {text}
                    </Text>
                </Box>

            </Box>

        </Layer>
    );
}