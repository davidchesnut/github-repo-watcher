import { AppContainer } from 'react-hot-loader';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

let isOfficeInitialized=true;
let title="test";

const render = (Component) => {
    ReactDOM.render(
        <AppContainer>
            <Component title={title} isOfficeInitialized={isOfficeInitialized} />
        </AppContainer>,
        document.getElementById('container')
    );
};

function Component () {
	return (
		<div>
			<InputRange /><p />
			<OutputRange />
		</div>);
	}


/* Render application after Office initializes */
Office.initialize = () => {
   // isOfficeInitialized = true;
   console.log("office initialized");
    render();
};

function InputRange (){
	return(
		<input type='text' name = 'Start range'/>
	);
}

function OutputRange () {
	return (
		<input type='text' name = 'Output range'/>
	);
}

if (module.hot) {
    module.hot.accept('./components/App', () => {
        const NextApp = require('./components/App').default;
        render(NextApp);
    });
}