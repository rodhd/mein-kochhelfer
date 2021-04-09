import React, {useState} from 'react';
import {Grommet} from 'grommet'
import {HomeView} from "./views/HomeView";

const theme = {
    global: {
        colors: {
            brand: '#228BE6',
        },
        font: {
            family: 'Roboto',
            size: '14px',
            height: '20px',
        },
    },
};

function App() {
    return (
        <Grommet theme={theme} full>
            <HomeView/>
        </Grommet>
    );
}

export default App;
