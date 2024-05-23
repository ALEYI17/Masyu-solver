 class Solver {
    constructor(graph) {
        this.graph = graph;
        this.visited = new Set();
    }

    solve() {
        // Start solving from a node with a circle, if any
        for (let node of this.graph.nodes) {
            if (node.circleType) {
                if (this.dfs(node, null)) {
                    return true;
                }
            }
        }
        return false;
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

// Example usage:
// Assume graph has been created and circles set
//
module.exports = Solver;
