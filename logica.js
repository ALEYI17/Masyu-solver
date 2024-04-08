let GRID_SIZE = null;
const grid = [];
let firstClickedCell = null;
let selectedCell = null;
let selectedRow = null;
let selectedCol = null;
let grafo = null;

class Node {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.circleType = null; // 'black', 'white', or null if no circle
        this.lineThrough = false; // Indicates if a line passes through this node
        this.vecinoarriba=null
        this.vecinoabajo = null
        this.vecinoderecha = null
        this.vecinoizquierda = null// Array of neighboring nodes
    }
}

class Graph {
    constructor(gridSize) {
        this.gridSize = gridSize;
        this.nodes = [];

        // Create nodes for each cell in the grid
        for (let row = 0; row < gridSize; row++) {
            for (let col = 0; col < gridSize; col++) {
                this.nodes.push(new Node(row, col));
            }
        }

      
    }

    getNode(row, col) {
        // Get the node at the specified row and column
        return this.nodes[row * this.gridSize + col];
    }

    setColor(row,col,circle){
      nodeToUpdate = this.getNode(row,col);
      nodeToUpdate.circleType = circle;
    }


    connectNodesByIndices(row1, col1, row2, col2) {
        const node1 = this.getNode(row1, col1);
        const node2 = this.getNode(row2, col2);

        // Ensure nodes are not null
        if (node1 && node2) {
            // Connect node1 to node2
            if (node1.row === node2.row) {
                // Nodes are in the same row, so they are either neighbors horizontally
                if (node1.col === node2.col - 1) {
                    node1.vecinoderecha = node2;
                    node2.vecinoizquierda = node1;
                } else if (node1.col === node2.col + 1) {
                    node1.vecinoizquierda = node2;
                    node2.vecinoderecha = node1;
                }
            } else if (node1.col === node2.col) {
                // Nodes are in the same column, so they are either neighbors vertically
                if (node1.row === node2.row - 1) {
                    node1.vecinoabajo = node2;
                    node2.vecinoarriba = node1;
                } else if (node1.row === node2.row + 1) {
                    node1.vecinoarriba = node2;
                    node2.vecinoabajo = node1;
                }
            }
        }
    }
    deleteConnectionByIndices(row1, col1, row2, col2) {
        const node1 = this.getNode(row1, col1);
        const node2 = this.getNode(row2, col2);

        // Ensure nodes are not null
        if (node1 && node2) {
            // Disconnect node1 from node2
            if (node1.row === node2.row) {
                // Nodes are in the same row, so they are either neighbors horizontally
                if (node1.col === node2.col - 1) {
                    node1.vecinoderecha = null;
                    node2.vecinoizquierda = null;
                } else if (node1.col === node2.col + 1) {
                    node1.vecinoizquierda = null;
                    node2.vecinoderecha = null;
                }
            } else if (node1.col === node2.col) {
                // Nodes are in the same column, so they are either neighbors vertically
                if (node1.row === node2.row - 1) {
                    node1.vecinoabajo = null;
                    node2.vecinoarriba = null;
                } else if (node1.row === node2.row + 1) {
                    node1.vecinoarriba = null;
                    node2.vecinoabajo = null;
                }
            }
        }
    }

    verifyNode(node) {
        console.log(node);
        let connectedCount = 0;
        let CircleValid = true;

        // Check if there's a connection in each direction and count them
        if (node.vecinoarriba) connectedCount++;
        if (node.vecinoabajo) connectedCount++;
        if (node.vecinoderecha) connectedCount++;
        if (node.vecinoizquierda) connectedCount++;

        // Check if the node has exactly two connections
        if (connectedCount == 0){
          return true;
        }
        if (connectedCount !== 2) {
            return false;
        }

              // falta hacer la configuracion de las negras

        if(node.circleType == 1 ){
          if(node.vecinoarriba && node.vecinoabajo){
            if(node.vecinoarriba.vecinoderecha || node.vecinoarriba.vecinoizquierda || node.vecinoabajo.vecinoderecha ||  node.vecinoabajo.vecinoizquierda){
              return CircleValid;
            }else{

              return false;

            }
          }else if(node.vecinoderecha && node.vecinoizquierda ){
            if(node.vecinoderecha.vecinoabajo || node.vecinoderecha.vecinoarriba || node.vecinoizquierda.vecinoabajo ||  node.vecinoizquierda.vecinoarriba){
              return CircleValid;
            }else{
              return false;
            }

          }else{
            return false;
          }

        }else if(node.circleType == 2 ){



          if(node.vecinoarriba){
            if(node.vecinoderecha ){

              if(node.vecinoderecha.vecinoderecha && node.vecinoarriba.vecinoarriba ){
                return CircleValid
              }else{
                return false
              }
              
            }else if(node.vecinoizquierda){
              console.log("debe entrar aqui")

              if(node.vecinoizquierda.vecinoizquierda && node.vecinoarriba.vecinoarriba ){
                return CircleValid
              }else{
                return false
              }
            }
          }else if( node.vecinoabajo ){
            if(node.vecinoderecha){
              if(node.vecinoderecha.vecinoderecha && node.vecinoabajo.vecinoabajo ){
                return CircleValid
              }else{
                return false
              }
              
            }else if(node.vecinoizquierda){

              if(node.vecinoizquierda.vecinoizquierda && node.vecinoabajo.vecinoabajo ){
                return CircleValid
              }else{
                return false
              }
            }else{
              return false;
            }


          }else{
            return false
          }
  

          
        }


    return CircleValid


    }

    verifyend() {
        // Iterate through each node to verify
        for (let node of this.nodes) {
            if (!this.verifyNode(node)) {
                // If a node doesn't have exactly two connections, return false
                return false;
            }
        }
        // All nodes have exactly two connections
        return true;
    }


}
















// Function to create the game grid in the HTML
function createGrid() {
    const gameContainer = document.getElementById("game-container");

    gameContainer.style.gridTemplateColumns = `repeat(${GRID_SIZE}, 50px)`;
    gameContainer.style.gridTemplateRows = `repeat(${GRID_SIZE}, 50px)`;
    grafo = new Graph(GRID_SIZE);
     for (let i = 0; i < GRID_SIZE; i++) {
        for (let j = 0; j < GRID_SIZE; j++) {
            const cell = document.createElement("div");
            cell.className = "cell";
            cell.dataset.row = i;
            cell.dataset.col = j;
            const type = grid[i][j];
            if (type === 1) {
                cell.classList.add("white", "circle");
                grafo.getNode(i,j).circleType= 1 
            } else if (type === 2) {
                grafo.getNode(i,j).circleType= 2
                cell.classList.add("black", "circle");
            }
            cell.addEventListener("click", handleCellClick);
            gameContainer.appendChild(cell);
        }
    }
  console.log(grafo)
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
            grafo.connectNodesByIndices(row,col,selectedRow,selectedCol);
            grid[row][col]=1;
            grid[selectedRow][selectedCol]=1;
            console.log(grafo);

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
        grafo.deleteConnectionByIndices(startRow,startCol,endRow,endCol);
        grid[startRow][startCol] = null;
        grid[endRow][endCol] = null;
        console.log(grafo);
        //console.log(grid);
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


function verificarRespuesta(){
  console.log(grafo.verifyend());
}


// Initialize the game when the DOM is ready
document.addEventListener("DOMContentLoaded", initializeGame);

