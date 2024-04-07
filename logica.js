let GRID_SIZE = null;
const grid = [];
let firstClickedCell = null;
let selectedCell = null;
let selectedRow = null;
let selectedCol = null;


// Initialize the grid
for (let i = 0; i < GRID_SIZE; i++) {
    grid.push(new Array(GRID_SIZE).fill(null));
}

// Function to create the game grid in the HTML
function createGrid() {
    const gameContainer = document.getElementById("game-container");

    gameContainer.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 50px)`;
    gameContainer.style.gridTemplateRows = `repeat(${GRID_SIZE}, 50px)`;

     for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            cell.dataset.row = i;
            cell.dataset.col = j;
            const type = grid[i][j];
            if (type === 1) {
                cell.classList.add("white", "circle");
            } else if (type === 2) {
                cell.classList.add("black", "circle");
            }
            cell.addEventListener("click", handleCellClick);
            gameContainer.appendChild(cell);
        }
    }
}

function handleCellClick(event) {
    const row = parseInt(event.target.dataset.row);
    const col = parseInt(event.target.dataset.col);
    const clickedCell = { row, col };

    // If no cell has been clicked yet, store the current clicked cell
    if (!firstClickedCell) {
        firstClickedCell = clickedCell;
        event.target.classList.add("selected");
        selectedCell = event.target;
        selectedCol = col;
        selectedRow = row;
    } else {
        // Check if the clicked cell is adjacent to the first clicked cell
        if (isAdjacent(firstClickedCell, clickedCell)) {
            drawLine(firstClickedCell, clickedCell);
            grid[row][col]=1;
            grid[selectedRow][selectedCol]=1;
            console.log(grid);

            // Deselect the previously selected cell
            if (selectedCell) {
                selectedCell.classList.remove("selected");
            }
        } else {
            // If not adjacent, reset selection
            event.target.classList.remove("selected");
            selectedCell.classList.remove("selected");

        }
        firstClickedCell = null;
        selectedCell = null;
        selectedCol = null;
        selectedRow = null;

    }
    // Store the currently clicked cell as the selected cell
    
}

// Function to check if two cells are adjacent
function isAdjacent(cell1, cell2) {
    const rowDiff = Math.abs(cell1.row - cell2.row);
    const colDiff = Math.abs(cell1.col - cell2.col);
    return (rowDiff === 1 && colDiff === 0) || (rowDiff === 0 && colDiff === 1);
}

// Function to draw a line between two cells
function drawLine(cell1, cell2) {
    const line = document.createElement("div");
    line.className = "line";
    line.dataset.startRow = cell1.row;
    line.dataset.startCol = cell1.col;
    line.dataset.endRow = cell2.row;
    line.dataset.endCol = cell2.col;

    const isHorizontal = cell1.row === cell2.row;
    const cellSize = 50;
    const borderWidth = 1;

    const startPos = {
        top: (Math.min(cell1.row, cell2.row) * cellSize) + (cellSize / 2) - (borderWidth / 2)+21,
        left: (Math.min(cell1.col, cell2.col) * cellSize) + (cellSize / 2) - (borderWidth / 2)
    };

    if (isHorizontal) {
        Object.assign(line.style, {
            width: `${Math.abs(cell1.col - cell2.col) * cellSize}px`,
            height: `${2 * borderWidth}px`,
            top: `${startPos.top}px`,
            left: `${startPos.left}px`
        });
    } else {
        Object.assign(line.style, {
            width: `${2 * borderWidth}px`,
            height: `${Math.abs(cell1.row - cell2.row) * cellSize}px`,
            top: `${startPos.top}px`,
            left: `${startPos.left}px`
        });
    }

    // Add click event listener to remove the line
    line.addEventListener("click", function() {
        const startRow = parseInt(line.dataset.startRow);
        const startCol = parseInt(line.dataset.startCol);
        const endRow = parseInt(line.dataset.endRow);
        const endCol = parseInt(line.dataset.endCol);
        grid[startRow][startCol] = null;
        grid[endRow][endCol] = null;

        console.log(grid);
        line.remove();
    });

    document.getElementById("game-container").appendChild(line);
}




// Function to read and parse file input
function handleFileInput(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const contents = e.target.result;
        parseFile(contents);
    };

    reader.readAsText(file);
}

// Function to parse file contents
function parseFile(contents) {
    const lines = contents.split('\n');
    GRID_SIZE = parseInt(lines[0]);
    for (let i = 0; i < GRID_SIZE; i++) {
        grid.push(new Array(GRID_SIZE).fill(0));
    }
    for (let i = 1; i < lines.length; i++) {
        const [row, col, type] = lines[i].trim().split(',');
        grid[row - 1][col - 1] = parseInt(type);
    }
    createGrid();
}

//Function to initialize the game
function initializeGame() {
    document.getElementById("file-input").addEventListener("change", handleFileInput);
}

// Initialize the game when the DOM is ready
document.addEventListener("DOMContentLoaded", initializeGame);

