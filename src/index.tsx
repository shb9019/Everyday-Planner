import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import Dashboard from './components/Dashboard';
import './index.css';

ReactDOM.render(
  <Dashboard/>,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
