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
        this.ninetydegree=false;
        this.vecinoarriba=null
        this.vecinoabajo = null
        this.vecinoderecha = null
        this.vecinoizquierda = null
        this.deadSpot = false 
    }
}

class Graph {
    constructor(gridSize) {
        this.gridSize = gridSize;
        this.nodes = [];
        this.perls = 0;

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

    verifyWhite(node){
      let CircleValid = true;
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

      }
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

    getAdjacentsall(row, col) {
        const node = this.getNode(row, col);
        if (!node) return [];

        const adjacents = [];
        adjacents.push(this.getNode(row,col+1));//derecha
        adjacents.push(this.getNode(row,col-1));//izquierda
        adjacents.push(this.getNode(row+1,col));//abajo
        adjacents.push(this.getNode(row-1,col));//arriba

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

        for (let row = 1; row < this.gridSize ; row++) {
            for (let col = 1; col < this.gridSize ; col++) {
                if ((row === 1 || row === this.gridSize - 2 || col === 1 || col === this.gridSize - 2) &&
                    this.getNode(row, col).circleType === 2) {
                    blackCircles.push({ node: this.getNode(row, col), edge: this.getEdgeEspace(row, col), corner: this.getCornerOneSpace(row, col) });
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

        getEdgeEspace(row, col) {

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

    generateBlackCircleMoves() {
        const jugadasPosiblesBlack=[]
        let juagadasHechas =[]
        for (let row = 0; row < this.gridSize; row++){
            for (let col = 0; col < this.gridSize; col++){
                const node = this.getNode(row,col);
                if(node && node.circleType === 2){
                    this.setninetydegree(node)
                    if (node.ninetydegree == false){
                        console.log("Este es el nodo que se busca",node);
                        let jugadasPosiblesBlack = this.generateMovesFromBlackCircle(row,col,node)
                        console.log(jugadasPosiblesBlack);
                        let filtro_jugadas = this.checkJugadaBlack(node,jugadasPosiblesBlack)
                        console.log(filtro_jugadas);
                        if(filtro_jugadas.length === 1 ){
                            let jugar = filtro_jugadas.pop();
                            let nodesource = jugar.primero
                            let nodedest = jugar.segundo
                            DrawPlay(node,nodesource);
                            DrawPlay(nodesource,nodedest);
                            juagadasHechas.push(jugar);
                        }
                    }
                    
                }
            }
        }
        return juagadasHechas;
    }

    generateMovesFromBlackCircle(row,col,node) {
        let moves = [];
        let tot_vec = this.num_vecinos(node);
        let adj = this.getAdjacentsall(row,col);
        console.log("sus adjs son:",adj);
        console.log("para",row,col);
        console.log("Numero total de vecinos:",tot_vec);
        let lineThrough = false
        if(node.vecinoabajo !== null){
            console.log("vecino abajo");
            lineThrough=this.checkLineThrough(node.vecinoabajo)
            console.log("line:",lineThrough);
            for(let a of adj){
                if(a === null){
                  continue;
                }
                console.log("la fila del adj es",a.row);
                console.log("la col del adj es",a.col);
                let nodetwo = null;
                if(a.col === node.col+1 && a.row === node.row  ){
                    
                    nodetwo = this.getNode(a.row,a.col+1);
                    moves.push({primero:a,segundo:nodetwo})
                }
                else if(a.col === node.col-1 && a.row === node.row ){
                    nodetwo = this.getNode(a.row,a.col-1);
                    moves.push({primero:a,segundo:nodetwo})
                }
            }
        }
        if(node.vecinoarriba !== null){
            console.log("vecino arriba");
            lineThrough=this.checkLineThrough(node.vecinoarriba);
            console.log("line:",lineThrough);

            for(let a of adj){
                if(a === null){
                  continue;
                } 
                console.log("la fila del adj es",a.row);
                console.log("la col del adj es",a.col);
                let nodetwo = null;
                if(a.row === node.row && a.col === node.col +1 ){
                    
                    nodetwo = this.getNode(a.row,a.col+1);
                    moves.push({primero:a,segundo:nodetwo})
                }
                else if(a.row === node.row && a.col === node.col -1){
                    nodetwo = this.getNode(a.row,a.col-1);
                    moves.push({primero:a,segundo:nodetwo})
                }
            }
        }
        if(node.vecinoderecha !== null){
            console.log("vecino derecha");
            lineThrough=this.checkLineThrough(node.vecinoderecha);
            console.log("line:",lineThrough);
            for(let a of adj){
                if(a === null){
                  continue;
                }
                console.log("la fila del adj es",a.row);
                console.log("la col del adj es",a.col);
                let nodetwo = null;
                if(a.col === node.col && a.row === node.row +1  ){

                    nodetwo = this.getNode(a.row+1,a.col);
                    moves.push({primero:a,segundo:nodetwo})
                }
                else if(a.col === node.col && a.row === node.row -1   ){
                    
                    nodetwo = this.getNode(a.row-1,a.col);
                    moves.push({primero:a,segundo:nodetwo})
                }
            }
        }
        if(node.vecinoizquierda !== null){
            console.log("vecino izquierda");
            lineThrough=this.checkLineThrough(node.vecinoizquierda);
            console.log("line:",lineThrough);
            for(let a of adj){
                if(a === null){
                    continue;
                }
                console.log("la fila del adj es",a.row);
                console.log("la col del adj es",a.col);
                let nodetwo = null;
                if(a.col === node.col && a.row === node.row +1  ){

                    nodetwo = this.getNode(a.row+1,a.col);
                    moves.push({primero:a,segundo:nodetwo})
                }
                else if(a.col === node.col && a.row === node.row -1   ){
                    
                    nodetwo = this.getNode(a.row-1,a.col);
                    moves.push({primero:a,segundo:nodetwo})
                }
                
                
            }
        }

        return moves;
    }

    CompleteWhiteCircle(){
        const jugadasPosiblesWhite=[]
        for (let row = 0; row < this.gridSize; row++){
            for (let col = 0; col < this.gridSize; col++){
                const node = this.getNode(row,col);
                if(node && node.circleType === 1 && this.num_vecinos(node)  == 1){
                  let jugada = this.completeLineThrough(node)
                  let nodesource = jugada.primero
                  let nodedest = jugada.segundo
                  DrawPlay(nodesource,nodedest);
                  node.lineThrough=true
                  jugadasPosiblesWhite.push(jugada)
                }
            }
        }
        console.log("posibles a competar ");
        console.log(jugadasPosiblesWhite);
        return jugadasPosiblesWhite;
    }

    generateWhiteCircleMoves(){
      const jugadasPosiblesWhite=[]
      let jugadasHechas=[]
      for (let row = 0; row < this.gridSize; row++){
        for (let col = 0; col < this.gridSize; col++){
          const node = this.getNode(row,col);
          if(node && node.circleType === 1 && this.num_vecinos(node)  == 2){
            console.log("nodos con lineThrough",node);
            let posiblesJugadas = this.generateMovesFromWhiteCircle(node);
            console.log("Jugadas para este nodo", posiblesJugadas);
            let filtroJugadas= this.checkJugadaWhite(node,posiblesJugadas);
            console.log(filtroJugadas);
            if (filtroJugadas.length ===1){
              let jugar = filtroJugadas.pop();
              let nodesource = jugar.primero
              let nodedest = jugar.segundo
              DrawPlay(nodesource,nodedest);
              jugadasHechas.push(jugar);
            }

          }
        }
      }
      return jugadasHechas;
    }

    generateMovesFromWhiteCircle(node){
      let posiblesJugadas = []
      //console.log("Se esta viendo en GMFWC",node);
      if(!this.verifyWhite(node)){
        console.log("Se pueden buscar jugadas en :", node);

        if(node.vecinoabajo !== null && node.vecinoarriba !== null){
          console.log("es vertical:",node);
          let nodeArriba = node.vecinoarriba;
          let nodeabajo = node.vecinoabajo;
          let ArribaDerecha =  this.getNode(nodeArriba.row,nodeArriba.col +1)
          let ArribaIzquierda =  this.getNode(nodeArriba.row,nodeArriba.col -1)
          if(ArribaDerecha !== null){
            posiblesJugadas.push({primero:nodeArriba,segundo:ArribaDerecha})
          }
          if(ArribaIzquierda !== null){
            posiblesJugadas.push({primero:nodeArriba,segundo:ArribaIzquierda})
          }

          let AbajoDerecha = this.getNode(nodeabajo.row,nodeabajo.col+1)
          let AbajoIzquierda = this.getNode(nodeabajo.row,nodeabajo.col-1)
          if(AbajoDerecha !== null){
            posiblesJugadas.push({primero:nodeabajo,segundo:AbajoDerecha})
          }
          if(AbajoIzquierda !== null){
            posiblesJugadas.push({primero:nodeabajo,segundo:AbajoIzquierda})
          }

        }
        else if(node.vecinoderecha !== null && node.vecinoizquierda !== null){
          console.log("es horizontal:",node);
          let NodeDerecha = node.vecinoderecha;
          let NodeIzquierda = node.vecinoizquierda;

          let DerechaArriba = this.getNode(NodeDerecha.row-1,NodeDerecha.col);
          let DerechaAbajo = this.getNode(NodeDerecha.row+1,NodeDerecha.col);

          if(DerechaArriba !== null){
            posiblesJugadas.push({primero:NodeDerecha,segundo:DerechaArriba})
          }
          if(DerechaAbajo !== null){
            posiblesJugadas.push({primero:NodeDerecha,segundo:DerechaAbajo})
          }

          let IzquierdaArriba = this.getNode(NodeIzquierda.row-1,NodeIzquierda.col);
          let IzquierdaAbajo = this.getNode(NodeIzquierda.row+1,NodeIzquierda.col);

          if(IzquierdaArriba !== null){
            posiblesJugadas.push({primero:NodeIzquierda,segundo:IzquierdaArriba})
          }
          if(IzquierdaAbajo !== null){
            posiblesJugadas.push({primero:NodeIzquierda,segundo:IzquierdaAbajo})
          }
        }
      }
      return posiblesJugadas;
    }


    generateBlanckSpaceMove(){
        let jugadasHechas = []
        for (let row = 0; row < this.gridSize; row++){
            for (let col = 0; col < this.gridSize; col++){
                const node = this.getNode(row,col);
                const jugadasPosiblesBlank=[]
                if(node && node.circleType === null && this.num_vecinos(node)  == 1){
                  let vecino = this.getAdjacentsall(row,col)
                  for(let veci of vecino){
                    if(veci == null || veci.deadSpot){
                      continue;
                    }
                    if(this.getAdjacents(veci.row, veci.col).length !== 2 &&  !(this.isConnectionMade(row,col,veci.row,veci.col))){
                      jugadasPosiblesBlank.push({primero:node,segundo:veci});
                    }

                  }


                  if(jugadasPosiblesBlank.length !== 1){
                    continue;
                  }
                  let jugada = jugadasPosiblesBlank.pop();
                  let nodesource = jugada.primero
                  let nodedest = jugada.segundo
                  DrawPlay(nodesource,nodedest);
                  jugadasHechas.push(jugada);
                  console.log("posibles a competar en celda vacia ");
                  console.log(jugada);
                  node.lineThrough=true
                }
            }
        }
        return jugadasHechas;

    }




    num_vecinos(node){
        let sum_vem = 0;

        if(node.vecinoabajo !== null){
            sum_vem = sum_vem +1;
        }
        if(node.vecinoarriba !== null){
            sum_vem = sum_vem +1;
        }
        if(node.vecinoderecha !== null){
            sum_vem = sum_vem +1;
        }
        if(node.vecinoizquierda !== null){
            sum_vem = sum_vem +1;
        }

        return sum_vem;
    }

    getAllValidNeighbors(node) {

      if (!node) return 0;
  
      let validNeighbors = 0;
  
      const directions =  this.getAdjacentsall(node.row,node.col);
  
      directions.forEach(dir => {
          const neighbor = dir
          if (neighbor && !neighbor.deadSpot && this.num_vecinos(neighbor) < 2) {
              validNeighbors++;
          }
      });
  
      return validNeighbors;
  }
  

  

    checkLineThrough(node){
        

        if(node.vecinoabajo !== null && node.vecinoarriba !== null){
            node.lineThrough= true;
            return true;
        }
        if(node.vecinoderecha !== null && node.vecinoizquierda !== null){
            node.lineThrough= true;
            return true
        }

        return false;
    }

    completeLineThrough(node){
      let jugada = {}
      let nodedest= null;
      if (node.vecinoarriba !== null){
        nodedest = this.getNode(node.row+1,node.col);
        return jugada={primero:node, segundo:nodedest} 
      }
      else if(node.vecinoabajo !== null){
        nodedest = this.getNode(node.row-1,node.col);
        return jugada={primero:node, segundo:nodedest}
      }
      else if(node.vecinoizquierda !== null){
        nodedest = this.getNode(node.row,node.col+1);
        return jugada={primero:node, segundo:nodedest}
      }
      else if(node.vecinoderecha !== null){
        nodedest = this.getNode(node.row,node.col-1);
        return jugada={primero:node, segundo:nodedest}
      }
    }

    setninetydegree(node){

        if(node.vecinoabajo !== null ){
            if(node.vecinoderecha!==null || node.vecinoizquierda !== null){
                node.ninetydegree = true;
            }            
        }
        if(node.vecinoarriba !== null ){
            if(node.vecinoderecha!==null || node.vecinoizquierda !== null){
                node.ninetydegree = true;
            }            
        }
        if(node.vecinoderecha !== null ){
            if(node.vecinoarriba!==null || node.vecinoabajo !== null){
                node.ninetydegree = true;
            }            
        }
        if(node.vecinoizquierda !== null ){
            if(node.vecinoarriba!==null || node.vecinoabajo !== null){
                node.ninetydegree = true;
            }            
        }
    }

    checkJugadaBlack(node,jugadasPosiblesBlack){
        this.findDeadSpots()
        let verificate_play=[];
        for(let jugadas of jugadasPosiblesBlack){
            console.log("va a jugar este:",jugadas);
            let nodesource = jugadas.primero
            let nodedest = jugadas.segundo
            let conec1 = false;
            let conec2 = false;
            if(!this.isConnectionMade(node.row,node.col,nodesource.row,nodesource.col)){
                this.connectNodesByIndices(node.row,node.col,nodesource.row,nodesource.col);
                conec1 = true;
            }
            if(!this.isConnectionMade(nodesource.row,nodesource.col,nodedest.row,nodedest.col)){
                this.connectNodesByIndices(nodesource.row,nodesource.col,nodedest.row,nodedest.col);
                conec2 = true;
            }
            
            if(this.ifBranch(node) || this.ifBranch(nodesource) || this.ifBranch(nodedest)|| nodesource.deadSpot === true || nodedest.deadSpot === true || this.verifyInvalidLoop(node)===true){
                console.log("jugada invalida:", jugadas);
                if(conec1===true){
                    this.deleteConnectionByIndices(node.row,node.col,nodesource.row,nodesource.col);
                }
                if(conec2 === true){
                    this.deleteConnectionByIndices(nodesource.row,nodesource.col,nodedest.row,nodedest.col);
                }
                
            }else{

                  verificate_play.push(jugadas);
                
                
                if(conec1===true){
                    this.deleteConnectionByIndices(node.row,node.col,nodesource.row,nodesource.col);
                }
                if(conec2 === true){
                    this.deleteConnectionByIndices(nodesource.row,nodesource.col,nodedest.row,nodedest.col);
                }
                
            }

        }

        return verificate_play;
        
    }

    checkJugadaWhite(node, jugadaDisponible){
      this.findDeadSpots()
      let verificate_play=[];
      for(let jugada of jugadaDisponible){
        console.log("va a jugar este:",jugada);
        let nodeSource = jugada.primero;
        let nodeDest = jugada.segundo;
        let conec1 = false;
        if(!this.isConnectionMade(nodeSource.row,nodeSource.col,nodeDest.row,nodeDest.col)){
          this.connectNodesByIndices(nodeSource.row,nodeSource.col,nodeDest.row,nodeDest.col);
          conec1 = true;
        }
        
        if(this.ifBranch(nodeSource) || this.ifBranch(nodeDest) || nodeSource.deadSpot == true || nodeDest.deadSpot == true || this.verifyInvalidLoop(node)===true ){

          console.log("jugada invalida:", jugada);
          if(conec1==true){
            this.deleteConnectionByIndices(nodeSource.row,nodeSource.col,nodeDest.row,nodeDest.col);
          }
        }
        else{
          verificate_play.push(jugada)
          if(conec1==true){
            this.deleteConnectionByIndices(nodeSource.row,nodeSource.col,nodeDest.row,nodeDest.col);
          }

        }


      }

      return verificate_play;
    }

    isConnectionMade(row1, col1, row2, col2) {
        const node1 = this.getNode(row1, col1);
        const node2 = this.getNode(row2, col2);

        if (node1 && node2) {
            return (node1.vecinoarriba === node2 || node1.vecinoabajo === node2 || 
                    node1.vecinoderecha === node2 || node1.vecinoizquierda === node2);
        }
        return false;
    }


    ifBranch(node){
      if(this.num_vecinos(node)>=3){
        return true;
      }
        return false;
    }

  findDeadSpots() {
      const deadSpots = [];

      for (let row = 0; row < this.gridSize; row++) {
          for (let col = 0; col < this.gridSize; col++) {
              const node = this.getNode(row, col);
              if (!node || node.circleType !== null) continue;
              if (this.num_vecinos(node) != 0) continue ;
              let blockedDirections = 0;
              let adjacents = this.getAdjacentsall(row,col);
              // Check each direction
              const directions = [
                  { vecino: adjacents[3], row: row - 1, col: col },//vecino arriba
                  { vecino: adjacents[2], row: row + 1, col: col },// vecino abajo
                  { vecino: adjacents[1], row: row, col: col - 1 },//vecino izquierda
                  { vecino: adjacents[0], row: row, col: col + 1 }//vecino derecha
              ];

              directions.forEach(dir => {
                  const neighbor = this.getNode(dir.row, dir.col);
                  if (!neighbor || this.isDeadSpot(dir.row, dir.col) || this.num_vecinos(neighbor)===2 || neighbor.deadSpot === true) {
                      blockedDirections++;
                  }
              });

              if (blockedDirections >= 3) {
                  node.deadSpot= true
                  deadSpots.push(node);

              }
          }
      }

      return deadSpots;
  }

  isDeadSpot(row, col) {
      const node = this.getNode(row, col);
      if (!node || node.circleType !== null) return false;
      if (this.num_vecinos(node) != 0) return false ;
      if (node.deadSpot === true) return true;
      let blockedDirections = 0;
      let adjacents = this.getAdjacentsall(row,col);
      // Check each direction
      const directions = [
          { vecino: adjacents[3], row: row - 1, col: col },//vecino arriba
          { vecino: adjacents[2], row: row + 1, col: col },// vecino abajo
          { vecino: adjacents[1], row: row, col: col - 1 },//vecino izquierda
          { vecino: adjacents[0], row: row, col: col + 1 }//vecino derecha
      ];

      directions.forEach(dir => {
          const neighbor = this.getNode(dir.row, dir.col);
          if (!neighbor ||  this.num_vecinos(neighbor)===2 || neighbor.deadSpot === true) {
              blockedDirections++;
          }
      });

      return blockedDirections >= 3;
  }

  verifyInvalidLoop(startNode) {
    let visited = new Set();
    let stack = [{ node: startNode, parent: null }];
    let perl = 0;

    while (stack.length > 0) {
        let element = stack.pop();
        let node = element.node;
        let parent = element.parent;

        if (!visited.has(node)) {
            visited.add(node);
            
            if (node.circleType === 1) perl++;
            if (node.circleType === 2) perl++;

            let neighbors = [node.vecinoarriba, node.vecinoabajo, node.vecinoderecha, node.vecinoizquierda];
            for (let neighbor of neighbors) {
                if (neighbor) {
                    if (!visited.has(neighbor)) {
                        stack.push({ node: neighbor, parent: node });
                    } else if (neighbor !== parent) {
                        if(perl !== this.perls){
                          console.log("Ciclo invalido");
                          return true;
                        }
                        
                        
                    }
                }
            }
        }
    }
    console.log("Ciclo false");
    return false;
  }

  GetIsland(){
    let Islas = []

    for (let nod of this.nodes){

      if(this.num_vecinos(nod) === 0 && (nod.circleType == 1 || nod.circleType == 2)){

        

        let validNeighbors = this.getAllValidNeighbors(nod);
        console.log(nod ,validNeighbors)
        Islas.push({ node: nod, validNeighbors: validNeighbors });
        
      }


    } 

    Islas.sort((a, b) => a.validNeighbors - b.validNeighbors);
    console.log(Islas)
    if(Islas[0]){
      return Islas[0].node;
    }
    else{
      return null;
    }
    

  }
  


  conjeturaHorizontalBlanco(node){
    if(node.circleType !== 1){
      return null
    }
      // primero hacer conjetura horizontal
      let nodo_derecha = this.getNode(node.row,node.col+1)
      let nodo_izq = this.getNode(node.row,node.col-1)
      let posiblesJugadas = []
      let posiblesJugadaHorizontal = null;
      posiblesJugadas.push({primero:node,segundo:nodo_derecha})
      posiblesJugadas.push({primero:node,segundo:nodo_izq})
      posiblesJugadaHorizontal = this.checkJugadaWhite(node,posiblesJugadas)
      if(posiblesJugadaHorizontal.length === 2){
        this.connectNodesByIndices(node.row,node.col,nodo_derecha.row,nodo_derecha.col);
        this.connectNodesByIndices(node.row,node.col,nodo_izq.row,nodo_izq.col);
        return posiblesJugadaHorizontal
      }
      else{
        return null;
      }
  }

    conjeturaVerticalBlanco(node){
    if(node.circleType !== 1){
      return null
    }
      // primero hacer conjetura horizontal
      let nodo_arriba = this.getNode(node.row-1,node.col)
      let nodo_abajo = this.getNode(node.row+1,node.col)
      let posiblesJugadas = []
      let posiblesJugadaVertical = null;
      posiblesJugadas.push({primero:node,segundo:nodo_arriba})
      posiblesJugadas.push({primero:node,segundo:nodo_abajo})
      posiblesJugadaVertical= this.checkJugadaWhite(node,posiblesJugadas)
      if(posiblesJugadaVertical.length === 2){
        this.connectNodesByIndices(node.row,node.col,nodo_arriba.row,nodo_arriba.col);
        this.connectNodesByIndices(node.row,node.col,nodo_abajo.row,nodo_abajo.col);
        return posiblesJugadaVertical
      }
      else{
        return null;
      }
  }

  conjetura_arriba_arriba_negro(node){
    if(node.circleType !== 2){
      return null
    }
      
      let nodo_arriba = this.getNode(node.row-1,node.col)
      let nodo_arriba_arriba = this.getNode(node.row-2,node.col)

      if(nodo_arriba == null || nodo_arriba_arriba == null){
        return null;
      }

      let posiblesJugadas = []
      let posiblesJugadaVertical = null;

      posiblesJugadas.push({primero:node,segundo:nodo_arriba})
      posiblesJugadas.push({primero:nodo_arriba,segundo:nodo_arriba_arriba})

      posiblesJugadaVertical= this.checkJugadaBlack(node,posiblesJugadas)

      if(posiblesJugadaVertical.length === 2){
        this.connectNodesByIndices(node.row,node.col,nodo_arriba.row,nodo_arriba.col);
        this.connectNodesByIndices(nodo_arriba.row , nodo_arriba.col , nodo_arriba_arriba.row, nodo_arriba_arriba.col);
        return posiblesJugadaVertical
      }
      else{
        return null;
      }
  }

    conjetura_abajo_abajo_negro(node){
    if(node.circleType !== 2){
      return null
    }
      let nodo_abajo = this.getNode(node.row+1,node.col)
      let nodo_abajo_abajo = this.getNode(node.row+2,node.col)

      if(nodo_abajo == null || nodo_abajo_abajo == null){
        return null;
      }

      let posiblesJugadas = []
      let posiblesJugadaVertical = null;

      posiblesJugadas.push({primero:node,segundo:nodo_abajo})
      posiblesJugadas.push({primero:nodo_abajo,segundo:nodo_abajo_abajo})

      posiblesJugadaVertical= this.checkJugadaBlack(node,posiblesJugadas)

      if(posiblesJugadaVertical.length === 2){
        this.connectNodesByIndices(node.row , node.col, nodo_abajo.row , nodo_abajo.col);
        this.connectNodesByIndices(nodo_abajo.row , nodo_abajo.col , nodo_abajo_abajo.row , nodo_abajo_abajo.col);
        return posiblesJugadaVertical
      }
      else{
        return null;
      }
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
                grafo.perls = grafo.perls+1;
            } else if (type === 2) {
                grafo.getNode(i,j).circleType= 2
                grafo.perls = grafo.perls+1;
                cell.classList.add("black", "circle");
            }
            cell.addEventListener("click", handleCellClick);
            gameContainer.appendChild(cell);
        }
    }
  console.log(grafo)
  console.log("#Perlas del grafo", grafo.perls)
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
            grafo.verifyInvalidLoop(grafo.getNode(row,col))
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
      this.drawBlackOneSpace(blackCirclesOneSpaceFromEdge);
      console.log("Three or More White Circles in Line:", threeOrMoreWhiteCirclesInLine);
      this.drawWhiteLine(threeOrMoreWhiteCirclesInLine);
      console.log("Two Adjacent Black Circles:", twoAdjacentWhiteCircles);
      this.drawAdjacentBlack(twoAdjacentWhiteCircles);
      console.log("Black Circle with White Corners:", blackCircleWithWhiteCorners);
      let seguir = true;
      let jugadasNegro =[]
      let jugadasBlancoComplete=[]
      let jugadasBlanco=[]
      let jugadasBlank=[]
      while(seguir == true){
          //-----------------------------------
        let dead = this.graph.findDeadSpots();
        console.log("dead", dead);
        jugadasNegro=this.graph.generateBlackCircleMoves();
        dead = this.graph.findDeadSpots();
        console.log("dead", dead);

        jugadasBlancoComplete = this.graph.CompleteWhiteCircle();
        dead = this.graph.findDeadSpots();
        console.log("dead", dead);

        jugadasBlanco=this.graph.generateWhiteCircleMoves();
        //console.log("jugadas negro", jugadasNegro);
        dead = this.graph.findDeadSpots();
        console.log("dead", dead);

        jugadasBlank=this.graph.generateBlanckSpaceMove();  
        dead = this.graph.findDeadSpots();
        console.log("dead", dead);

        if(jugadasNegro.length ===0 && jugadasBlancoComplete.length===0 && jugadasBlanco.length===0 && jugadasBlank.length===0){
          seguir = false;
        }
        //------------------------------------
      }

      if (this.graph.verifyend()){
        return true;
      }
      this.EliminationSearch();
      // //-----------------------------------
      // let dead = this.graph.findDeadSpots();
      // console.log("dead", dead);
      // this.graph.generateBlackCircleMoves();
      // dead = this.graph.findDeadSpots();
      // console.log("dead", dead);

      // this.graph.CompleteWhiteCircle();
      // dead = this.graph.findDeadSpots();
      // console.log("dead", dead);

      // this.graph.generateWhiteCircleMoves();
      // //console.log("jugadas negro", jugadasNegro);
      // dead = this.graph.findDeadSpots();
      // console.log("dead", dead);

      // this.graph.generateBlanckSpaceMove();  
      // dead = this.graph.findDeadSpots();
      // console.log("dead", dead);
      // //------------------------------------

    }


    EliminationSearch(){
      let seguir = true;
      while(seguir == true){
        let isle = this.graph.GetIsland();
        if(isle == null){
          seguir = false;
          continue;
        }
        let conjeHorizontal = this.graph.conjeturaHorizontalBlanco(isle);
        if(conjeHorizontal != null){
          DrawPlay(conjeHorizontal[0].primero,conjeHorizontal[0].segundo)
          DrawPlay(conjeHorizontal[1].primero,conjeHorizontal[1].segundo)
          this.solveforElimination();
        }

        let conjeVertical = this.graph.conjeturaVerticalBlanco(isle);
        if(conjeVertical != null){
          DrawPlay(conjeVertical[0].primero,conjeVertical[0].segundo)
          DrawPlay(conjeVertical[1].primero,conjeVertical[1].segundo)
          this.solveforElimination();
        }

        let conjearriba = this.graph.conjetura_arriba_arriba_negro(isle);
        if(conjearriba != null){
          DrawPlay(conjearriba[0].primero,conjearriba[0].segundo)
          DrawPlay(conjearriba[1].primero,conjearriba[1].segundo)
          this.solveforElimination();
        }

        let conjeabajo = this.graph.conjetura_abajo_abajo_negro(isle);
        if(conjeabajo != null){
          DrawPlay(conjeabajo[0].primero,conjeabajo[0].segundo)
          DrawPlay(conjeabajo[1].primero,conjeabajo[1].segundo)
          this.solveforElimination();
        }
      }
      
      // let islas = this.graph.GetIsland();
      // for (let isle of islas){
      //   console.log(isle);
      //   let conjeHorizontal = this.graph.conjeturaHorizontalBlanco(isle);
      //   if(conjeHorizontal != null){
      //     DrawPlay(conjeHorizontal[0].primero,conjeHorizontal[0].segundo)
      //     DrawPlay(conjeHorizontal[1].primero,conjeHorizontal[1].segundo)
      //     this.solveforElimination();
      //   }

      //   let conjeVertical = this.graph.conjeturaVerticalBlanco(isle);
      //   if(conjeVertical != null){
      //     DrawPlay(conjeVertical[0].primero,conjeVertical[0].segundo)
      //     DrawPlay(conjeVertical[1].primero,conjeVertical[1].segundo)
      //     this.solveforElimination();
      //   }

      //   let conjearriba = this.graph.conjetura_arriba_arriba_negro(isle);
      //   if(conjearriba != null){
      //     DrawPlay(conjearriba[0].primero,conjearriba[0].segundo)
      //     DrawPlay(conjearriba[1].primero,conjearriba[1].segundo)
      //     this.solveforElimination();
      //   }

      //   let conjeabajo = this.graph.conjetura_abajo_abajo_negro(isle);
      //   if(conjeabajo != null){
      //     DrawPlay(conjeabajo[0].primero,conjeabajo[0].segundo)
      //     DrawPlay(conjeabajo[1].primero,conjeabajo[1].segundo)
      //     this.solveforElimination();
      //   }

      // }
    }

    solveforElimination() {

      let seguir = true;
      let jugadasNegro =[]
      let jugadasBlancoComplete=[]
      let jugadasBlanco=[]
      let jugadasBlank=[]
      while(seguir == true){
          //-----------------------------------
        let dead = this.graph.findDeadSpots();
        console.log("dead", dead);
        jugadasNegro=this.graph.generateBlackCircleMoves();
        dead = this.graph.findDeadSpots();
        console.log("dead", dead);

        jugadasBlancoComplete = this.graph.CompleteWhiteCircle();
        dead = this.graph.findDeadSpots();
        console.log("dead", dead);

        jugadasBlanco=this.graph.generateWhiteCircleMoves();
        //console.log("jugadas negro", jugadasNegro);
        dead = this.graph.findDeadSpots();
        console.log("dead", dead);

        jugadasBlank=this.graph.generateBlanckSpaceMove();  
        dead = this.graph.findDeadSpots();
        console.log("dead", dead);

        if(jugadasNegro.length ===0 && jugadasBlancoComplete.length===0 && jugadasBlanco.length===0 && jugadasBlank.length===0){
          seguir = false;
        }
        //------------------------------------
      }

      if (this.graph.verifyend()){
        return true;
      }


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
         nodeArribaArriba = this.graph.getNode(nodoarriba.row-1,nodoarriba.col);
        }
        if(nodoabajo !== null){
          nodoAbajoAbajo = this.graph.getNode(nodoabajo.row+1,nodoabajo.col);
        }
                        
       
        console.log(node)
        switch (edge) {
            case "left":
              DrawPlay(node,nodoDerecha);
              DrawPlay(nodoDerecha,nodeDerechaDerecha);
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
              DrawPlay(nodoizquierda,nodeIzquierdaIzquierda);
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
                DrawPlay(nodoDerecha,nodeDerechaDerecha);
              }
              if (corner === "top-right"){
                DrawPlay(node,nodoizquierda);
                DrawPlay(nodoizquierda,nodeIzquierdaIzquierda);
              }
              break;

            case "bottom":

              DrawPlay(node,nodoarriba);
              DrawPlay(nodoarriba,nodeArribaArriba);
              if (corner === "bottom-right"){

                DrawPlay(node,nodoizquierda);
                DrawPlay(nodoizquierda,nodeIzquierdaIzquierda);
              }
              if (corner === "bottom-left"){
                DrawPlay(node,nodoDerecha);
                DrawPlay(nodoDerecha,nodeDerechaDerecha);
              }
              break;

            default:
              break;
          }
        }

    }

    drawBlackOneSpace(ListOneSpace){
      
      for(let nodeClass of ListOneSpace){
        console.log(nodeClass);
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
         nodeArribaArriba = this.graph.getNode(nodoarriba.row-1,nodoarriba.col);
        }
        if(nodoabajo !== null){
          nodoAbajoAbajo = this.graph.getNode(nodoabajo.row+1,nodoabajo.col);
        }
        switch (edge) {
          case "one-space from top":
              DrawPlay(node,nodoabajo);
              DrawPlay(nodoabajo,nodoAbajoAbajo);
              if (corner === "top-left"){
                DrawPlay(node,nodoDerecha);
                DrawPlay(nodoDerecha,nodeDerechaDerecha);
              }
              if (corner === "top-right"){
                DrawPlay(node,nodoizquierda);
                DrawPlay(nodoizquierda,nodeIzquierdaIzquierda);
              }
         
            break;

          case "one-space from bottom":
              DrawPlay(node,nodoarriba);
              DrawPlay(nodoarriba,nodeArribaArriba);
              if (corner === "bottom-left"){
                DrawPlay(node,nodoDerecha);
                DrawPlay(nodoDerecha,nodeDerechaDerecha);
              }
              if (corner === "bottom-right"){
                DrawPlay(node,nodoizquierda);
                DrawPlay(nodoizquierda,nodeIzquierdaIzquierda);
              }
            break;

          case "one-space from left":
            
              DrawPlay(node,nodoDerecha);
              DrawPlay(nodoDerecha,nodeDerechaDerecha);
              if (corner === "bottom-left"){
                DrawPlay(node,nodoarriba);
                DrawPlay(nodoarriba,nodeArribaArriba);
              }
              if (corner === "top-left"){
                DrawPlay(node,nodoabajo);
                DrawPlay(nodoabajo,nodoAbajoAbajo);
              }

            break;

          case "one-space from right":
              DrawPlay(node,nodoizquierda);
              DrawPlay(nodoizquierda,nodeIzquierdaIzquierda);
              if (corner === "bottom-right"){
                DrawPlay(node,nodoarriba);
                DrawPlay(nodoarriba,nodeArribaArriba);
              }
              if (corner === "top-right"){
                DrawPlay(node,nodoabajo);
                DrawPlay(nodoabajo,nodoAbajoAbajo);
              } 
            break;

          default:
            break;
        }
       

      }

    }//end one-space


  drawWhiteLine(ListWhiteLine){

    for(let nodesClass of ListWhiteLine){
      console.log(nodesClass);
      let nodes = nodesClass.nodes
      let direction = nodesClass.direction
      for(let node of nodes){
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
         nodeArribaArriba = this.graph.getNode(nodoarriba.row-1,nodoarriba.col);
        }
        if(nodoabajo !== null){
          nodoAbajoAbajo = this.graph.getNode(nodoabajo.row+1,nodoabajo.col);
        }

        switch (direction) {
          case "horizontal":
              DrawPlay(node,nodoarriba);
              DrawPlay(node,nodoabajo);
            break;
          case "vertical":
            DrawPlay(node,nodoizquierda);
            DrawPlay(node,nodoDerecha);
            break;

          default:
            break;
        }
      }
      
    }

  }//end drawWhiteLine


  drawAdjacentBlack(twoAdjacentWhiteCircles){
    
    for(let nodesClass of twoAdjacentWhiteCircles){
      let nodes = nodesClass.nodes
      let direction = nodesClass.direction
      let node = null
      switch (direction) {
        case "horizontal":

          node = nodes[0]
          let nodoizquierda = this.graph.getNode(node.row,node.col-1);
          let nodeIzquierdaIzquierda = this.graph.getNode(nodoizquierda.row,nodoizquierda.col-1);
          DrawPlay(node,nodoizquierda);
          DrawPlay(nodoizquierda,nodeIzquierdaIzquierda);
          node = nodes[1]
          let nodoDerecha = this.graph.getNode(node.row,node.col+1);
          let nodeDerechaDerecha = this.graph.getNode(nodoDerecha.row,nodoDerecha.col+1);
          DrawPlay(node,nodoDerecha);
          DrawPlay(nodoDerecha,nodeDerechaDerecha);

          break;
        case "vertical":
          node = nodes[0]
          let nodoarriba = this.graph.getNode(node.row-1,node.col);
          let nodeArribaArriba = this.graph.getNode(nodoarriba.row-1,nodoarriba.col);
          DrawPlay(node,nodoarriba);
          DrawPlay(nodoarriba,nodeArribaArriba);
          node = nodes[1]
          let nodoabajo = this.graph.getNode(node.row+1,node.col);
          let nodoAbajoAbajo = this.graph.getNode(nodoabajo.row+1,nodoabajo.col);
          DrawPlay(node,nodoabajo);
          DrawPlay(nodoabajo,nodoAbajoAbajo);
          break;

        default:
          break;
      }


      

    }


  }//end adjacentBlack 





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

