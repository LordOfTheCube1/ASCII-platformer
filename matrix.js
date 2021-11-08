// Welcome to the ASCII platformer source code
// Made by LordOfTheCube1 (discord LordOfTheCube#0419)
// See LICENSE before using any code
// Enjoy!

// Note: this library was originally made by me, inspired by The Coding Train, for a Neural Network project. Most of the functions here are useless for ASCII characters, I just wasn't bothered to change it.
// The matrix is an array of the rows of the matrix, which in turn are each arrays of values

class Matrix {

  constructor(rows,cols) {
    this.rows = rows;
    this.cols = cols;
    this.values = []; // the actual matrix

  }
  //------------------------------------------------------------------ Set random values
  randomize(n) {
      for (let i = 0; i < this.rows; i++) {
        this.values[i] = [];
        for (let j = 0; j < this.cols; j++) {
          this.values[i][j] = Math.floor(Math.random()*n);
        }
      }

  }
//------------------------------------------------------------------- Set a single value
  initialize(n) {
      for (let i = 0; i < this.rows; i++) {
        this.values[i] = [];
        for (let j = 0; j < this.cols; j++) {
          this.values[i][j] = n;
        }
      }

  }

  setRow(row, value) {
    for(let i = 0; i < this.cols; i++) {
      this.values[row][i] = value;
    }
  }
//--------------------------------------------------------- Add the same integer to each object of the matrix (scalar operation)
  nAdd(n) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.values[i][j] += n;
      }
    }
  }
//--------------------------------------------------------Multiply each object in the matrix by the same integer (scalar operation)
  nMultiply(n) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.values[i][j] *= n;
      }
    }
  }
//------------------------------------------------------- Add two matrices together element-wise
  mAdd(m) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.values[i][j] += m.values[i][j];
      }
    }
  }
//--------------------------------------------------- Multiply two matrices together element-wise
  mMultiply(m) {
    for (let i = 0; i < this.rows; i++) {
      for (let j = 0; j < this.cols; j++) {
        this.values[i][j] *= m.values[i][j];
      }
    }
  }
  //------------------------------------------------- Find the value of a specific point in the matrix - x then y, with 0,0 being in the top left corner
  findValue(x,y) {
    return this.values[y-1][x-1];
  }
  //------------------------------------------------ Multiply a matrix by a vector (NOTE: non-mutational)
vProduct(v) {
   let result = new Matrix(this.rows,1);
   result.initialize(0);
  for (i=0;i<this.rows;i++) {
    for (j=0;j<this.cols;j++) {
      result.values[i][0] += this.values[i][j] * v.values[j][0];
    }
  }
  return result.values;
}

}
