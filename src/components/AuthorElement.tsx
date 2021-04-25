import React from "react";
import {FormField, Grid, TextInput} from "grommet";

export const AuthorElement = ({
                           firstName,
                           setFirstName,
                           lastName,
                           setLastName,
                           disabled
                       }: {
    firstName: string,
    setFirstName: ((event: React.ChangeEvent<HTMLInputElement>) => void),
    lastName: string,
    setLastName: ((event: React.ChangeEvent<HTMLInputElement>) => void),
    disabled: boolean
}) => {
    return (
        <Grid
            columns={{
                count: 2,
                size: 'auto',
            }}
            gap="xsmall"
        >
            <FormField label="First Name">
                <TextInput value={firstName} onChange={setFirstName} disabled={disabled}/>
            </FormField>
            <FormField label="Last Name">
                <TextInput value={lastName} onChange={setLastName} disabled={disabled}/>
            </FormField>
        </Grid>
    );
}