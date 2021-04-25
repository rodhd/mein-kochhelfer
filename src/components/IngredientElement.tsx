import React from "react";
import {Box, Button, Grid, Select, TextInput} from "grommet";
import {units} from "../helpers/constants/units";
import {Close} from "grommet-icons";

export const IngredientElement = ({
                               value,
                               setValue,
                               amount,
                               setAmount,
                               unit,
                               setUnit,
                               onDelete,
                               disabled
                           }: {
    value: string,
    setValue: ((event: React.ChangeEvent<HTMLInputElement>) => void),
    amount: number,
    setAmount: ((event: React.ChangeEvent<HTMLInputElement>) => void)
    unit: any,
    setUnit: ((event: React.ChangeEvent<HTMLSelectElement>) => void),
    onDelete: React.MouseEventHandler<HTMLButtonElement>,
    disabled: boolean
}) => {
    return (
        <Grid
            columns={['2/4', 'auto', 'auto', 'auto']}
            rows={['auto']}
            areas={[['name', 'amount', 'unit', 'delete']]}
            gap="xsmall"
            margin="xsmall"
        >
            <Box gridArea="name">
                <TextInput placeholder="Name" onChange={setValue} value={value} disabled={disabled}/>
            </Box>
            <Box gridArea="amount">
                <TextInput placeholder="Amount" onChange={setAmount} value={amount} disabled={disabled}/>
            </Box>
            <Box gridArea="unit">
                <Select
                    placeholder="Unit"
                    labelKey="label"
                    valueKey={{key: "value", reduce: true}}
                    value={unit}
                    onChange={setUnit}
                    options={units}
                    disabled={disabled}
                />
            </Box>
            {!disabled && <Box gridArea="delete">
                <Button icon={<Close/>} onClick={onDelete} secondary/>
            </Box>}
        </Grid>

    );
}