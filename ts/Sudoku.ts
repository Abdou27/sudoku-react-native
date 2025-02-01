export type ValidSudokuCellValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type SudokuCellValue = ValidSudokuCellValue | null;
export type SudokuRow = [
    SudokuCellValue,
    SudokuCellValue,
    SudokuCellValue,
    SudokuCellValue,
    SudokuCellValue,
    SudokuCellValue,
    SudokuCellValue,
    SudokuCellValue,
    SudokuCellValue,
];
export type SudokuBoard = [
    SudokuRow,
    SudokuRow,
    SudokuRow,
    SudokuRow,
    SudokuRow,
    SudokuRow,
    SudokuRow,
    SudokuRow,
    SudokuRow,
];
export type SolvedSudokuCell = ValidSudokuCellValue;
export type SolvedSudokuRow = [
    SolvedSudokuCell,
    SolvedSudokuCell,
    SolvedSudokuCell,
    SolvedSudokuCell,
    SolvedSudokuCell,
    SolvedSudokuCell,
    SolvedSudokuCell,
    SolvedSudokuCell,
    SolvedSudokuCell,
];
export type SolvedSudokuBoard = [
    SolvedSudokuRow,
    SolvedSudokuRow,
    SolvedSudokuRow,
    SolvedSudokuRow,
    SolvedSudokuRow,
    SolvedSudokuRow,
    SolvedSudokuRow,
    SolvedSudokuRow,
    SolvedSudokuRow,
];

type Idx = 0 | 1 | 2;

export class SudokuPuzzle {
    public initialPuzzle: SudokuBoard;
    public puzzle: SudokuBoard;
    public solution: SolvedSudokuBoard;

    constructor(
        initialPuzzle: SudokuBoard,
        puzzle: SudokuBoard,
        solution: SolvedSudokuBoard,
    ) {
        this.initialPuzzle = initialPuzzle;
        this.puzzle = puzzle;
        this.solution = solution;
    }

    public static generate(difficulty: number = 50) {
        // 1. Generate a fully solved board
        const solution = generateSolvedBoard();

        // 2. Create a puzzle from the solved board by removing certain cells
        const initialPuzzle = removeCells(solution, difficulty);

        // 3. Init the puzzle
        const puzzle = cloneBoard(initialPuzzle);

        return new SudokuPuzzle(initialPuzzle, puzzle, solution);
    }

    public getValue(megaRowIdx: Idx, megaCellIdx: Idx, rowIdx: Idx, cellIdx: Idx): SudokuCellValue {
        return this.puzzle[megaRowIdx * 3 + rowIdx][megaCellIdx * 3 + cellIdx];
    }

    public setValue(megaRowIdx: Idx, megaCellIdx: Idx, rowIdx: Idx, cellIdx: Idx, value: SudokuCellValue): SudokuPuzzle {
        this.puzzle[megaRowIdx * 3 + rowIdx][megaCellIdx * 3 + cellIdx] = value;
        return this.clone();
    }

    public isReadonly(megaRowIdx: Idx, megaCellIdx: Idx, rowIdx: Idx, cellIdx: Idx): boolean {
        return this.initialPuzzle[megaRowIdx * 3 + rowIdx][megaCellIdx * 3 + cellIdx] !== null;
    }

    public isInvalid(megaRowIdx: Idx, megaCellIdx: Idx, rowIdx: Idx, cellIdx: Idx): boolean {
        const row = megaRowIdx * 3 + rowIdx;
        const cell = megaCellIdx * 3 + cellIdx;
        const value = this.puzzle[row][cell];

        if (value === null || this.isReadonly(megaRowIdx, megaCellIdx, rowIdx, cellIdx)) {
            return false;
        }

        // Check row
        for (let c = 0; c < 9; c++) {
            if (c === cell) {
                continue;
            }
            if (this.puzzle[row][c] === value) {
                return true;
            }
        }

        // Check column
        for (let r = 0; r < 9; r++) {
            if (r === row) {
                continue;
            }
            if (this.puzzle[r][cell] === value) {
                return true;
            }
        }

        // Check 3x3 box
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                if (r === rowIdx && c === cellIdx) {
                    continue;
                }
                if (this.puzzle[megaRowIdx * 3 + r][megaCellIdx * 3 + c] === value) {
                    console.log(`Invalid box ${row}:${cell}`);
                    return true;
                }
            }
        }

        return false;
    }

    public clone(): SudokuPuzzle {
        return new SudokuPuzzle(this.initialPuzzle, this.puzzle, this.solution);
    }

    public solve(): SudokuPuzzle {
        return new SudokuPuzzle(this.initialPuzzle, this.solution, this.solution);
    }

    public reset(): SudokuPuzzle {
        return new SudokuPuzzle(this.initialPuzzle, this.initialPuzzle, this.solution);
    }
}

/**
 * Returns a Sudoku puzzle (9x9) in a 2D array of numbers,
 * where 0 represents an empty cell.
 *
 * @param difficulty - string difficulty level: "easy", "medium", or "hard"
 * @returns SudokuBoard representing the Sudoku board
 */
export function generateSudokuPuzzle(
    difficulty: number = 50,
): SudokuBoard {
    // 1. Generate a fully solved board
    const solution = generateSolvedBoard();

    // 2. Create a puzzle from the solved board by removing certain cells
    return removeCells(solution, difficulty);
}

/**
 * Generate a fully solved 9×9 Sudoku board using backtracking.
 */
function generateSolvedBoard(): SolvedSudokuBoard {
    // Initialize empty board
    const board = Array.from({length: 9}, () => Array(9).fill(null)) as SolvedSudokuBoard;

    // Fill the board
    fillBoard(board);
    return board;
}

/**
 * Backtracking function to fill the board with a valid Sudoku solution.
 */
function fillBoard(board: SudokuBoard): boolean {
    const emptyCell = findEmptyCell(board);
    if (!emptyCell) {
        return true; // no empty cells left, board is filled
    }

    const {row, col} = emptyCell;

    // Try numbers 1-9 in random order for variety
    const numbers = shuffle(Array.from({length: 9}, (_, i) => i + 1)) as ValidSudokuCellValue[];

    for (const num of numbers) {
        if (isSafeToPlace(board, row, col, num)) {
            board[row][col] = num;
            if (fillBoard(board)) {
                return true;
            }
            board[row][col] = null; // reset on failure
        }
    }
    return false; // trigger backtracking
}

/**
 * Finds the first empty cell (with 0). Returns {row, col} or null if none.
 */
function findEmptyCell(board: SudokuBoard): { row: number; col: number } | null {
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if (board[row][col] === null) {
                return {row, col};
            }
        }
    }
    return null;
}

/**
 * Checks if placing `num` at board[row][col] violates Sudoku rules.
 */
function isSafeToPlace(
    board: SudokuBoard,
    row: number,
    col: number,
    num: number,
): boolean {
    // Check row
    for (let c = 0; c < 9; c++) {
        if (board[row][c] === num) return false;
    }

    // Check column
    for (let r = 0; r < 9; r++) {
        if (board[r][col] === num) return false;
    }

    // Check 3x3 box
    const boxRow = Math.floor(row / 3) * 3;
    const boxCol = Math.floor(col / 3) * 3;
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            if (board[boxRow + r][boxCol + c] === num) return false;
        }
    }

    return true;
}

/**
 * Randomly remove cells from a solved board based on the difficulty,
 * ensuring the puzzle has a unique solution.
 */
function removeCells(board: SudokuBoard, difficulty: number): SudokuBoard {
    // Clone the board so we don't mutate the original solution
    const puzzle = cloneBoard(board);

    // Decide how many cells to remove based on difficulty
    const cellsToRemove = getNumberOfCellsToRemove(difficulty);

    let removed = 0;
    while (removed < cellsToRemove) {
        const row = Math.floor(Math.random() * 9);
        const col = Math.floor(Math.random() * 9);

        if (puzzle[row][col] !== null) {
            // Temporarily remove the cell
            const backup = puzzle[row][col];
            puzzle[row][col] = null;

            // Check if puzzle still has a unique solution
            const solutionsCount = countSolutions(cloneBoard(puzzle), 2);
            if (solutionsCount !== 1) {
                // Not unique, revert removal
                puzzle[row][col] = backup;
            } else {
                removed++;
            }
        }
    }

    return puzzle;
}

/**
 * Returns the number of cells to remove based on difficulty.
 */
function getNumberOfCellsToRemove(difficulty: number): number {
    const MAX = 60;
    const MIN = 40;
    if (difficulty > MAX) {
        return MAX;
    } else if (difficulty < MIN) {
        return MIN;
    } else {
        return difficulty;
    }
}

/**
 * Counts the number of solutions to a Sudoku board using backtracking.
 * The `limit` parameter is used to stop early if solutions exceed the limit.
 */
function countSolutions(board: SudokuBoard, limit: number = 2): number {
    const emptyCell = findEmptyCell(board);
    if (!emptyCell) {
        // Found a solution
        return 1;
    }

    let solutionsFound = 0;
    const {row, col} = emptyCell;
    for (let num = 1; num <= 9; num++) {
        if (isSafeToPlace(board, row, col, num)) {
            board[row][col] = num as ValidSudokuCellValue;
            solutionsFound += countSolutions(board, limit - solutionsFound);
            board[row][col] = null;

            // Stop if we already found enough solutions
            if (solutionsFound >= limit) {
                break;
            }
        }
    }

    return solutionsFound;
}

/**
 * Utility to clone a 2D array (board).
 */
function cloneBoard(board: SudokuBoard): SudokuBoard {
    return board.map((row) => row.slice()) as SudokuBoard;
}

/**
 * Utility to shuffle an array in place (Fisher-Yates).
 */
function shuffle<T>(array: T[]): T[] {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [
            array[i],
            array[j],
        ] = [
            array[j],
            array[i],
        ];
    }
    return array;
}
