//1. split components into smaller components.
//2. components里面只能有一个container
function Comment(props) {
	return (
	  <div className="Comment">
		<div className="UserInfo">
		  <img className="Avatar"
			src={props.author.avatarUrl}
			alt={props.author.name}
		  />
		  {/* img可以改成下面这个 */}
		  <Avator user="props.author"/>
		  <div className="UserInfo-name">
			{props.author.name}
		  </div>
		</div>
		<div className="Comment-text">
		  {props.text}
		</div>
		<div className="Comment-date">
		  {formatDate(props.date)}
		</div>
	  </div>
	);
  }
  //这样不容易修改和reuse
  //可以把img name  date拿出来放到单独的component里面
  function Avator(props){
	  return (
		  <img className="Avator"
			  src={props.user.avatarUrl}
			  alt={props.user.name}
		  />
	  )
  }
  //还可以进一步extract  把userInfo extract出来
  function UserInfo(props){
	return (
		<div className="UserInfo">
			<Avator user="props.user"/>
			<div className="UserInfo-name">
				{props.user.name}
			</div>
		</div>
	)
  }
  //现在上面的comment可以改成
  function Comment(props){
	<div className="Comment">
		<UserInfo user={props.author}/>
		<div className="Comment-text">
		{props.text}
		</div>
		<div className="Comment-date">
		{formatDate(props.date)}
		</div>
	</div>
  }

  //3.All React components must act like pure functions with respect to their props.

  //4.make the components reusable and encapsulated
  function tick() {
	const element = (
	  <div>
		<h1>Hello, world!</h1>
		<h2>It is {new Date().toLocaleTimeString()}.</h2>
	  </div>
	);
	ReactDOM.render(
	  element,
	  document.getElementById('root')
	);
  }
  
  setInterval(tick, 1000);

//reusable and encapsulated.
function Clock(props){
	return (
		<div>
			<h1>Hello, world</h1>
			<h2>It is {props.date.toLocaleDateString()}.</h2>
		</div>
	)
}
function tick(){
	ReactDOM.reader(
		<Clock date={new Date()}/>,
		document.getElementById('root')
	)
}
setInterval(tick, 1000);

//5. convert a function component to a class
//注意要把 props 变成 this.props
//very easy  就拿上面的clock来举例子
class Clock extends React.Component {
	render (){
		return (
			<div>
				<h1>Hello, world!</h1>
				<h2>It is {this.props.date.toLocaleDateString()}.</h2>
			</div>
		)
	}
}

//6. state 例子在Clock.js
	//6-1
	//除了constructor 你不要直接修改state  use this.setState({userName: 'lhh'})
	//note: The only place where you can assign this.state is the constructor.
	//6-2
	//use a second form of setState() that accepts a function rather than an object
	//reason是因为异步，但是还是不明白 @TOSEE
	this.setState({//wrong
		counter: this.state.counter + this.props.increment,
	});
	this.setState((state, props) => ({//correct
		counter: state.counter + props.increment
	}));
	//6-3
	//a component may choose to pass its state down as props to its child components
	//this child components can be a HTML tag or use-defined components
	//for example
	<h2>It is {this.state.date.toLocaleTimeString()}.</h2>
	<FormattedDate date={this.state.date} />
	//接受的组件或者表情不care传过来等数据到底是什么，都当成props用
	function FormattedDate(props) {
		return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
	}


//7. state 和 props	区别和联系
	//

//8. lifecycle  
	//componentDidMount: Clock is rendered to the DOM for the first time
	//componentWillUnmount: whenever the DOM produced by the Clock is removed












////////////////////这个是哪个例子
  function Square(props) {
	return (
	  <button className="square" onClick={props.onClick}>
		{props.value}
	  </button>
	);
  }
  
  class Board extends React.Component {
	renderSquare(i) {
	  return (
		<Square
		  value={this.props.squares[i]}//? this.props
		  onClick={() => this.props.onClick(i)}
		/>
	  );
	}
  
	render() {
	  return (
		<div>
		  <div className="board-row">
			{this.renderSquare(0)}
			{this.renderSquare(1)}
			{this.renderSquare(2)}
		  </div>
		  <div className="board-row">
			{this.renderSquare(3)}
			{this.renderSquare(4)}
			{this.renderSquare(5)}
		  </div>
		  <div className="board-row">
			{this.renderSquare(6)}
			{this.renderSquare(7)}
			{this.renderSquare(8)}
		  </div>
		</div>
	  );
	}
  }
  
  class Game extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {
		history: [
		  {
			squares: Array(9).fill(null)
		  }
		],
		stepNumber: 0,
		xIsNext: true
	  };
	}
  
	handleClick(i) {
	  const history = this.state.history.slice(0, this.state.stepNumber + 1);
	  const current = history[history.length - 1];
	  const squares = current.squares.slice();
	  if (calculateWinner(squares) || squares[i]) {
		return;
	  }
	  squares[i] = this.state.xIsNext ? "X" : "O";
	  this.setState({
		history: history.concat([
		  {
			squares: squares
		  }
		]),
		stepNumber: history.length,
		xIsNext: !this.state.xIsNext
	  });
	}
  
	jumpTo(step) {
	  this.setState({
		stepNumber: step,
		xIsNext: (step % 2) === 0
	  });
	}
  
	render() {
	  const history = this.state.history;
	  const current = history[this.state.stepNumber];
	  const winner = calculateWinner(current.squares);
  
	  const moves = history.map((step, move) => {
		const desc = move ?
		  'Go to move #' + move :
		  'Go to game start';
		return (
		  <li key={move}>
			<button onClick={() => this.jumpTo(move)}>{desc}</button>
		  </li>
		);
	  });
  
	  let status;
	  if (winner) {
		status = "Winner: " + winner;
	  } else {
		status = "Next player: " + (this.state.xIsNext ? "X" : "O");
	  }
  
	  return (
		<div className="game">
		  <div className="game-board">
			<Board
			  squares={current.squares}
			  onClick={i => this.handleClick(i)}
			/>
		  </div>
		  <div className="game-info">
			<div>{status}</div>
			<ol>{moves}</ol>
		  </div>
		</div>
	  );
	}
  }
  
  // ========================================
  
  ReactDOM.render(<Game />, document.getElementById("root"));
  
  function calculateWinner(squares) {
	const lines = [
	  [0, 1, 2],
	  [3, 4, 5],
	  [6, 7, 8],
	  [0, 3, 6],
	  [1, 4, 7],
	  [2, 5, 8],
	  [0, 4, 8],
	  [2, 4, 6]
	];
	for (let i = 0; i < lines.length; i++) {
	  const [a, b, c] = lines[i];
	  if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
		return squares[a];
	  }
	}
	return null;
  }
  