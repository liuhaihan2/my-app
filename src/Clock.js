import React, { Component } from 'react';
//没有 state的情况
// class Clock extends React.Component {
//     render (){
//         return (
//             <div>
//                 <h1>Hello</h1>
//                 <h2>It is {this.props.date.toLocaleTimeString()}</h2>
//             </div>
//         )
//     }
// }
//添加 state
class Clock extends React.Component {
    constructor(props){
        super(props);
        this.state = {date: new Date()}
    }

    componentDidMount(){
        this.timerID = setInterval(//注意  这里是this
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount(){
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render (){
        return (
            <div>
                <h1>Hello</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}</h2>
            </div>
        )
    }
}
//可以体现state 和 props的区别
//props  定时器每次都传入一个新时间给date  定时器更新的是整个组件
//state  定时器每次都在clock组件内部改变state.date的状态，只调用一次组件，这个是比较合理的 抽象出来一个时钟

export default Clock;