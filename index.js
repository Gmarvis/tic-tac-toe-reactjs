const rootElement = document.getElementById("root");
const App = () => {
  // set state for the squares in the board usiing the array .fill() 
  // setting each square as empty (null)
  const [squares, setSquares] = React.useState(Array(9).fill(null));

  // console.log(squares)

  // to toggle between first mover and second move,
  // add another state to our Board component. which should return a boolean
  const [xIsNext, SetxIsNext] = React.useState(true);



  // square is a component to define each buttons state in the board 
  // add a to each square a value and a click event function
  function Square({ value, onSquareClick }) {
    return (
      <button className="square" onClick={onSquareClick}>
        {value}
      </button>
    );
  }
  // handle clickin the squares
  function handleClick(i) {
    
    // check if square has been click, return if square has a value already
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

       // handle draw
       if (squares[i]!==""){
        console.log("handle draw", squares[i])

      }

    // create a copy of the squares array to be modified, and replaced latter with a new copy which will help show whos next to play "X" OR "0"
    const nextSquares = squares.slice();
    console.log(squares[i])
    // console.log(squares)
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    setSquares(nextSquares);
    SetxIsNext(!xIsNext);
  }

  // calculating winner

  // pass squares as a prop to determine the posibility of win
  function calculateWinner(squares) {
  // there are a series of posibilities for a win in this game
  // all posibilities can be passed into an array
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
// loop through the array of win posibilities
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] && squares[a] === squares[b] && squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  }
      // display game/winners status to user
      const winner = calculateWinner(squares);
      let status;
      if (winner) {
        status = 'Winner: '+ winner;
      } else {
        status = "Next player " + (xIsNext ? "X" : "O");
      }

  const Board = () => {
    return (
      <div className="game-container">
        <p className="status">{status}</p>

        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>

        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>

        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
    );
  };
  return Board();




};

ReactDOM.render(<App />, rootElement);
