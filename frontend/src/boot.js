import React from 'react';
import ReactDOM from 'react-dom';
import App from 'container/App';
import 'moment-duration-format';

import 'style/variables.css';
import 'style/reset.css';
import 'react-select/dist/react-select.css';

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
