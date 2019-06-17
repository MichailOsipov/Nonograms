import * as React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter} from 'connected-react-router';
import {store} from 'store/store';
import {history} from 'store/history';

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div>React - Nonograms</div>
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
