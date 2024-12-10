# Masyu Solver

![Masyu Puzzle](https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Masyu_puzzle.svg/1024px-Masyu_puzzle.svg.png)

## What is Masyu?

Masyu is a logic puzzle played on a rectangular grid. Some cells on the grid contain circles that are either white (empty) or black (filled). The objective is to draw a single continuous, non-intersecting loop that passes through all the circled cells while adhering to specific rules:

1. **Loop Movement**: The loop must "enter" each cell it traverses from one of its four sides and "exit" from a different side. All turns are 90 degrees.

2. **White Circles**:
   - The loop must travel straight through a white circle.
   - The loop must turn in the previous and/or next cell.

3. **Black Circles**:
   - The loop must turn when passing through a black circle.
   - The loop must travel straight through the cells immediately before and after the black circle.

Masyu puzzles can be challenging to solve. While solving Masyu on arbitrarily large grids is computationally complex (an NP-complete problem), well-constructed puzzles are typically solvable within a reasonable timeframe using logic and reasoning.

---

## About the Project

**Masyu Solver** is a tool designed to solve Masyu puzzles programmatically. This project combines algorithmic problem-solving techniques and logic to automate the process of finding solutions to Masyu puzzles of varying complexity.

### Features
- **Automatic Puzzle Solving**: Input any valid Masyu puzzle, and the solver will find a solution (if one exists).
- **Visualization**: Displays the solved puzzle with the complete loop.
- **Custom Grid Sizes**: Supports puzzles of various dimensions.

### Technologies Used
- Programming Language: Vanilla JavaScript
- A heuristic function, also simply called a heuristic, is a function that ranks alternatives in search algorithms at each branching step based on available information to decide which branch to follow.

---

## How to Use

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Andres-Salamanca/Masyu-solver.git
   ```
2. Navigate to the project directory:
   ```bash
   cd masyu-solver
   ```
3. Run index.html in browser:
   ```bash
   ./chrome index.html
   ```

### Usage
1. Prepare a Masyu puzzle file (format instructions in `prueba.txt`).
2. Run the solver:
   ```bash
   open file in the interface
   ```
3. View the solution in the terminal or save it to an output file.

---

