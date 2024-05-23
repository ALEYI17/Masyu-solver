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
        if (row >= 0 && row < this.gridSize && col >= 0 && col < this.gridSize) {
            return this.nodes[row * this.gridSize + col];
        }
        return null; // Return null if out of bounds
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


    //nuevas funciones para el solve

    getAdjacents(row, col) {
        const node = this.getNode(row, col);
        if (!node) return [];

        const adjacents = [];
        if (node.vecinoarriba) adjacents.push(this.getNode(row,col+1));
        if (node.vecinoabajo) adjacents.push(this.getNode(row,col-1));
        if (node.vecinoderecha) adjacents.push(this.getNode(row+1,col));
        if (node.vecinoizquierda) adjacents.push(this.getNode(row-1,col));

        return adjacents;
    }
    
    getCorner(row, col) {
        if (row === 0 && col === 0) return 'top-left';
        if (row === 0 && col === this.gridSize - 1) return 'top-right';
        if (row === this.gridSize - 1 && col === 0) return 'bottom-left';
        if (row === this.gridSize - 1 && col === this.gridSize - 1) return 'bottom-right';
        return null;
    }

    getCornerOneSpace(row, col) {
        if (row === 1 && col === 1) return 'top-left';
        if (row === 1 && col === this.gridSize - 2) return 'top-right';
        if (row === this.gridSize - 2 && col === 1) return 'bottom-left';
        if (row === this.gridSize - 2 && col === this.gridSize - 2) return 'bottom-right';
        return null;
    }


    getWhiteCirclesAtEdge() {
        const whiteCircles = [];

        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                if ((row === 0 || row === this.gridSize - 1 || col === 0 || col === this.gridSize - 1) &&
                    this.getNode(row, col).circleType === 1) {
                    whiteCircles.push(this.getNode(row, col));
                }
            }
        }

        return whiteCircles;
    }

    getBlackCirclesAtEdge() {
        const blackCircles = [];

        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                if ((row === 0 || row === this.gridSize - 1 || col === 0 || col === this.gridSize - 1) &&
                    this.getNode(row, col).circleType === 2) {
                    blackCircles.push({ node: this.getNode(row, col), edge: this.getEdge(row, col), corner: this.getCorner(row, col) });
                }
            }
        }

        return blackCircles;
    }

    getBlackCirclesOneSpaceFromEdge() {
        const blackCircles = [];

        for (let row = 1; row < this.gridSize - 1; row++) {
            for (let col = 1; col < this.gridSize - 1; col++) {
                if ((row === 1 || row === this.gridSize - 2 || col === 1 || col === this.gridSize - 2) &&
                    this.getNode(row, col).circleType === 2) {
                    blackCircles.push({ node: this.getNode(row, col), edge: this.getEdge(row, col), corner: this.getCornerOneSpace(row, col) });
                }
            }
        }

        return blackCircles;
    }

    getEdge(row, col) {
        if (row === 0) return 'top';
        if (row === this.gridSize - 1) return 'bottom';
        if (col === 0) return 'left';
        if (col === this.gridSize - 1) return 'right';
        if (row === 1) return 'one-space from top';
        if (row === this.gridSize - 2) return 'one-space from bottom';
        if (col === 1) return 'one-space from left';
        if (col === this.gridSize - 2) return 'one-space from right';
        return 'interior';
    }

    getThreeOrMoreWhiteCirclesInLine() {
        const whiteCircles = [];
        
        // Check rows for 3 or more consecutive white circles
        for (let row = 0; row < this.gridSize; row++) {
            let count = 0;
            let sequence = [];
            for (let col = 0; col < this.gridSize; col++) {
                const node = this.getNode(row, col);
                if (node && node.circleType === 1) {
                    count++;
                    sequence.push(node);
                    if (count >= 3) {
                        whiteCircles.push({ nodes: [...sequence], direction: 'horizontal' });
                    }
                } else {
                    count = 0;
                    sequence = [];
                }
            }
        }

        // Check columns for 3 or more consecutive white circles
        for (let col = 0; col < this.gridSize; col++) {
            let count = 0;
            let sequence = [];
            for (let row = 0; row < this.gridSize; row++) {
                const node = this.getNode(row, col);
                if (node && node.circleType === 1) {
                    count++;
                    sequence.push(node);
                    if (count >= 3) {
                        whiteCircles.push({ nodes: [...sequence], direction: 'vertical' });
                    }
                } else {
                    count = 0;
                    sequence = [];
                }
            }
        }

        return whiteCircles;
    }


    getTwoAdjacentBlackeCircles() {
        const adjacentWhiteCircles = [];

        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                const node = this.getNode(row, col);
                if (node && node.circleType === 2) {
                    // Check horizontal adjacency
                    const rightNode = this.getNode(row, col + 1);
                    if (rightNode && rightNode.circleType === 2) {
                        adjacentWhiteCircles.push({ nodes: [node, rightNode], direction: 'horizontal' });
                    }

                    // Check vertical adjacency
                    const bottomNode = this.getNode(row + 1, col);
                    if (bottomNode && bottomNode.circleType === 2) {
                        adjacentWhiteCircles.push({ nodes: [node, bottomNode], direction: 'vertical' });
                    }
                }
            }
        }

        return adjacentWhiteCircles;
    }


    getBlackCircleWithWhiteCorners() {
        const blackCirclesWithWhiteCorners = [];

        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                const node = this.getNode(row, col);
                if (node && node.circleType === 1) {
                    // Check top-left and bottom-right corners
                    const topLeft = this.getNode(row - 1, col - 1);
                    const topRight = this.getNode(row - 1, col + 1);
                    if (topLeft && topLeft.circleType === 2 && topRight && topRight.circleType === 2) {
                        blackCirclesWithWhiteCorners.push({ node, corners: [topLeft, topRight],direction: 'top' });
                    }

                    // Check top-right and bottom-left corners
                    const bottomRight = this.getNode(row + 1, col + 1);
                    const bottomLeft = this.getNode(row + 1, col - 1);
                    if (bottomRight && bottomRight.circleType === 2 && bottomLeft && bottomLeft.circleType === 2) {
                        blackCirclesWithWhiteCorners.push({ node, corners: [bottomRight, bottomLeft],direction: 'bottom' });
                    }
                }
            }
        }

        return blackCirclesWithWhiteCorners;
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
    const solver = new Solver(grafo);
    const result = solver.solve();
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

function DrawPlay(firstClickedCell, clickedCell){
          
        let row = firstClickedCell.row
        let col = firstClickedCell.col
        let selectedRow = clickedCell.row
        let selectedCol = clickedCell.col

        if (isAdjacent(firstClickedCell, clickedCell)) {
            drawLine(firstClickedCell, clickedCell);
            grafo.connectNodesByIndices(row,col,selectedRow,selectedCol);
            grid[row][col]=1;
            grid[selectedRow][selectedCol]=1;
            console.log(grafo);

            // Deselect the previously selected cell

        } 

}


class Solver {
    constructor(graph) {
        this.graph = graph;
        this.visited = new Set();
    }

    solve() {

      let whiteCirclesAtEdge = this.graph.getWhiteCirclesAtEdge();
      let blackCirclesAtEdge = this.graph.getBlackCirclesAtEdge();
      let blackCirclesOneSpaceFromEdge = this.graph.getBlackCirclesOneSpaceFromEdge();
      let threeOrMoreWhiteCirclesInLine = this.graph.getThreeOrMoreWhiteCirclesInLine();
      let twoAdjacentWhiteCircles = this.graph.getTwoAdjacentBlackeCircles();
      let blackCircleWithWhiteCorners = this.graph.getBlackCircleWithWhiteCorners();

      console.log("White Circles at Edge:", whiteCirclesAtEdge);
      this.drawWhiteEdge(whiteCirclesAtEdge);
      console.log("Black Circles at Edge:", blackCirclesAtEdge);
      this.drawBlackEdge(blackCirclesAtEdge);
      console.log("Black Circles One Space from Edge:", blackCirclesOneSpaceFromEdge);
      console.log("Three or More White Circles in Line:", threeOrMoreWhiteCirclesInLine);
      console.log("Two Adjacent Black Circles:", twoAdjacentWhiteCircles);
      console.log("Black Circle with White Corners:", blackCircleWithWhiteCorners);
      


    }

    drawWhiteEdge(ListWitheEdge){
      for(let node of ListWitheEdge){
        let edge = this.graph.getEdge(node.row,node.col);

        let nodoDerecha = this.graph.getNode(node.row,node.col+1);
        let nodoizquierda = this.graph.getNode(node.row,node.col-1);
        let nodoarriba = this.graph.getNode(node.row-1,node.col);
        let nodoabajo = this.graph.getNode(node.row+1,node.col);
      switch (edge) {
          case "top":
            DrawPlay(node,nodoDerecha);
            DrawPlay(node,nodoizquierda);
            
            break;
          case "right":

            DrawPlay(node,nodoarriba);
            DrawPlay(node,nodoabajo);
            break;

          case "left":

            DrawPlay(node,nodoarriba);
            DrawPlay(node,nodoabajo);
            break;

          case "bottom":

            DrawPlay(node,nodoDerecha);
            DrawPlay(node,nodoizquierda);
            break;

          default:
            break;
        }
      }
    }


    drawBlackEdge(ListBlackEdge){


      for(let nodeClass of ListBlackEdge){
        let node = nodeClass.node
        let edge = nodeClass.edge
        let corner = nodeClass.corner
        let nodoDerecha = this.graph.getNode(node.row,node.col+1);
        let nodoizquierda = this.graph.getNode(node.row,node.col-1);
        let nodoarriba = this.graph.getNode(node.row-1,node.col);
        let nodoabajo = this.graph.getNode(node.row+1,node.col);
        let nodeDerechaDerecha;
        let nodeIzquierdaIzquierda
        let nodeArribaArriba
        let nodoAbajoAbajo
        if(nodoDerecha !== null){
          nodeDerechaDerecha = this.graph.getNode(nodoDerecha.row,nodoDerecha.col+1);
        }
        if(nodoizquierda !== null){
          nodeIzquierdaIzquierda = this.graph.getNode(nodoizquierda.row,nodoizquierda.col-1);
        }
        if(nodoarriba !== null){
         nodeArribaArriba = this.graph.getNode(nodoarriba.col,nodoarriba.row-1);
        }
        if(nodoabajo !== null){
          nodoAbajoAbajo = this.graph.getNode(nodoabajo.col,nodoabajo.row+1);
        }
                        
       
        console.log(node)
        switch (edge) {
            case "left":
              DrawPlay(node,nodoDerecha);
              DrawPlay(node,nodeDerechaDerecha);
              if (corner === "top-left"){
                DrawPlay(node,nodoabajo);
                DrawPlay(nodoabajo,nodoAbajoAbajo);
              }
              if (corner === "bottom-left"){
                DrawPlay(node,nodoarriba);
                DrawPlay(nodoarriba,nodeArribaArriba);
              }
              
              break;
            case "right":

              DrawPlay(node,nodoizquierda);
              DrawPlay(nodoizquierda,nodoizquierda);
              if (corner === "top-right"){
                DrawPlay(node,nodoabajo);
                DrawPlay(nodoabajo,nodoAbajoAbajo);
              }
              if (corner === "bottom-right"){
                DrawPlay(node,nodoarriba);
                DrawPlay(nodoarriba,nodeArribaArriba);
              }
              break;

            case "top":

              DrawPlay(node,nodoabajo);
              DrawPlay(nodoabajo,nodoAbajoAbajo);
              if (corner === "top-left"){
                DrawPlay(node,nodoDerecha);
                DrawPlay(node,nodeDerechaDerecha);
              }
              if (corner === "top-right"){
                DrawPlay(node,nodoizquierda);
                DrawPlay(nodoizquierda,nodoizquierda);
              }
              break;

            case "bottom":

              DrawPlay(node,nodoarriba);
              DrawPlay(nodoarriba,nodeArribaArriba);
              if (corner === "bottom-right"){

                DrawPlay(node,nodoizquierda);
                DrawPlay(nodoizquierda,nodoizquierda);
              }
              if (corner === "bottom-left"){
                DrawPlay(node,nodoDerecha);
              }
              break;

            default:
              break;
          }
        }







    }


    dfs(node, parent) {
        // Mark the current node as visited
        this.visited.add(node);

        // Get all possible neighbors (up, down, left, right)
        const neighbors = [
            node.vecinoarriba,
            node.vecinoabajo,
            node.vecinoderecha,
            node.vecinoizquierda
        ].filter(neighbor => neighbor && !this.visited.has(neighbor));

        // Heuristic: Prioritize nodes with circles and follow rules
        for (let neighbor of neighbors) {
            if (this.isValidMove(node, neighbor, parent)) {
                // Connect the nodes
                this.graph.connectNodesByIndices(node.row, node.col, neighbor.row, neighbor.col);

                // Recursively visit the neighbor
                if (this.dfs(neighbor, node)) {
                    return true;
                }

                // Backtrack: Disconnect the nodes
                this.graph.deleteConnectionByIndices(node.row, node.col, neighbor.row, neighbor.col);
            }
        }

        // Unmark the current node before backtracking
        this.visited.delete(node);

        return false;
    }

    isValidMove(node, neighbor, parent) {
        // Check if the move is valid according to the Masyu rules
        if (node.circleType === 'black') {
            // Black circle: Must turn on the circle and go straight through the next and previous cells
            if (parent) {
                const straightLine = this.getStraightLine(parent, node, neighbor);
                if (!straightLine) {
                    return false;
                }
            }
        } else if (node.circleType === 'white') {
            // White circle: Must go straight through but turn in the previous or next cell
            if (parent) {
                const turns = this.getTurns(parent, node, neighbor);
                if (!turns) {
                    return false;
                }
            }
        }
        return true;
    }

    getStraightLine(parent, node, neighbor) {
        // Check if the nodes form a straight line
        return (parent.row === node.row && node.row === neighbor.row) ||
               (parent.col === node.col && node.col === neighbor.col);
    }

    getTurns(parent, node, neighbor) {
        // Check if the path turns in the previous or next cell for white circles
        return (parent.row !== node.row && neighbor.row !== node.row) ||
               (parent.col !== node.col && neighbor.col !== node.col);
    }
}

