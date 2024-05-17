class Confusion {
  constructor(container, samples, classes, options) {
    this.samples = samples;
    this.classes = classes;
    this.size = options.size;
    this.styles = options.styles;

    this.N = classes.length + 1;
    this.cellSize = this.size / (this.N + 1);

    this.table = document.createElement("table");
    this.table.style.borderCollapse = "collapse";
    this.table.style.textAlign = "center";
    this.table.style.marginLeft = this.cellSize + "px";
    this.table.style.marginTop = this.cellSize + "px";

    container.appendChild(this.table);

    const topText = document.createElement("div");
    topText.innerHTML = "Predicted Class";
    topText.style.position = "absolute";
    topText.style.fontSize = "x-large";
    topText.style.top = "0px";
    topText.style.left = "50%";
    topText.style.transform = "translate(-50%)";
    topText.style.height = this.cellSize + "px";
    topText.style.display = "flex";
    topText.style.alignItems = "center";
    topText.style.marginLeft = this.cellSize / 2 + "px";
    container.appendChild(topText);

    const leftText = document.createElement("div");
    leftText.innerHTML = "True Class";
    leftText.style.position = "absolute";
    leftText.style.fontSize = "x-large";
    leftText.style.top = "50%";
    leftText.style.left = "0px";
    leftText.style.transform = "translate(-50%) rotate(-90deg)";
    leftText.style.height = this.cellSize + "px";
    leftText.style.display = "flex";
    leftText.style.alignItems = "center";
    leftText.style.marginLeft = this.cellSize / 2 + "px";
    container.appendChild(leftText);

    this.matrix = this.#prepareMatrix(samples);
    this.#fillTable();
  }

  #prepareMatrix(samples) {
    const matrix = [];

    // create matrix with 0 values for each cell
    for (let i = 0; i < this.N; i++) {
      matrix[i] = [];
      for (let j = 0; j < this.N; j++) {
        matrix[i][j] = 0;
      }
    }

    // calculate condition values
    for (const sample of samples) {
      matrix[this.classes.indexOf(sample.truth) + 1][
        this.classes.indexOf(sample.label) + 1
      ]++;
    }

    // fill the cumulative values for the top row and columns
    for (let i = 1; i < this.N; i++) {
      for (let j = 1; j < this.N; j++) {
        matrix[0][j] += matrix[i][j];
        matrix[i][0] += matrix[i][j];
      }
    }

    matrix[0][0] = "";

    // display predicated value as the difference from true class
    for (let i = 1; i < this.N; i++) {
      matrix[0][i] -= matrix[i][0];
      if (matrix[0][i] > 0) {
        matrix[0][i] = "+" + matrix[0][i];
      }
    }

    return matrix;
  }

  #fillTable() {
    const { N, matrix, styles, classes, cellSize, table } = this;
    for (let i = 0; i < N; i++) {
      const row = document.createElement("tr");
      table.appendChild(row);

      for (let j = 0; j < N; j++) {
        const cell = document.createElement("td");
        cell.style.width = cellSize + "px";
        cell.style.height = cellSize + "px";
        cell.style.padding = "0";

        cell.textContent = matrix[i][j];

        // add item icon to each classes top row
        if (i == 0 && j > 0) {
          cell.style.backgroundImage =
            "url(" + styles[classes[j - 1]].image.src + ")";
          cell.style.backgroundRepeat = "no-repeat";
          cell.style.backgroundPosition = "50% 20%";
          cell.style.verticalAlign = "bottom";
          cell.style.fontWeight = "bold";
        }

        // add item icon to each classes left column
        if (j == 0 && i > 0) {
          cell.style.backgroundImage =
            "url(" + styles[classes[i - 1]].image.src + ")";
          cell.style.backgroundRepeat = "no-repeat";
          cell.style.backgroundPosition = "50% 20%";
          cell.style.verticalAlign = "bottom";
          cell.style.fontWeight = "bold";
        }

        row.appendChild(cell);
      }
    }
  }
}
