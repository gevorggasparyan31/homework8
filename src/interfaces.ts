export interface SquareProps {
    value: string | null;
    onSquareClick: () => void;
}
  
export interface BoardProps {
    xIsNext: boolean;
    squares: Array<string | null>;
    onPlay: (nextSquares: Array<string | null>) => void;
}

export interface GameState {
    history: Array<Array<string | null>>;
    currentMove: number;
}