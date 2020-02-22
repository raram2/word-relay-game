import {hot} from 'react-hot-loader/root';
import React from 'react';
import ReactDOM from 'react-dom';
import WordRelay from './WordRelay';
// const WordRelayHooks = require('./WordRelayHooks');
const Hot = hot(WordRelay);

ReactDOM.render(<Hot />, document.getElementById('root'));
