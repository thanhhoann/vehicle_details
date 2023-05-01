import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {ChakraProvider, extendTheme} from "@chakra-ui/react";

const theme = extendTheme({
    fonts: {
        heading: `'Open Sans', sans-serif`, body: `'Raleway', sans-serif`,
    },
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<>
    <ChakraProvider theme={theme}>
        <App/>
    </ChakraProvider>
</>);

