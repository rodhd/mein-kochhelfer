import React from "react";
import {Box, Button, Grid, Text, TextArea} from "grommet";
import {Close} from "grommet-icons";

export const StepsElement = ({
                          index,
                          text,
                          setText,
                          onDelete,
                          disabled
                      }: { index: number, text: string, setText: ((event: React.ChangeEvent<HTMLTextAreaElement>) => void), onDelete: React.MouseEventHandler<HTMLButtonElement>, disabled: boolean }) => {
    return (
        <Grid
            columns={["xsmall", "auto", "auto"]}
            rows={["auto"]}
            areas={[["index", "text", "delete"]]}
            gap="xsmall"
            margin="xsmall"
        >
            <Box gridArea="index">
                <Text weight="bold">{index + 1}.</Text>
            </Box>
            <Box gridArea="text">
                <TextArea value={text} onChange={setText} disabled={disabled}/>
            </Box>
            {!disabled && <Box gridArea="delete">
                <Button icon={<Close/>} onClick={onDelete} secondary/>
            </Box>}
        </Grid>
    );
}
