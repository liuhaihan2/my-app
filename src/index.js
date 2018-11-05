import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Clock from './Clock';
import Toggle from './Toggle';
import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// ReactDOM.render(<Clock />,document.getElementById('root'))
//下面是没有加state 的方法
// function tick() {
//     ReactDOM.render(
//         <Clock date={new Date()} />,
//         document.getElementById('root')
//     )
// }
//下面是有state管理时候的状态
ReactDOM.render(
    <Clock />,
    document.getElementById('root')
)

ReactDOM.render(
    <Toggle />,
    document.getElementById('toggle')
)
// setInterval(tick,1000);
serviceWorker.unregister();
