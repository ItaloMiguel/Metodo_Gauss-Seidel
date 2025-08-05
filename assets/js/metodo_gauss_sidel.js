function parseMatrix(text) {
      return text.trim().split('\n').map(row => row.trim().split(/\s+/).map(Number));
    }

    function gaussSeidel(A, b, tol, maxIter) {
      const n = A.length;
      let x = Array(n).fill(0);
      let xOld = Array(n).fill(0);
      let output = '';

      for (let k = 0; k < maxIter; k++) {
        output += `Iteração ${k+1}:\n`;
        for (let i = 0; i < n; i++) {
          let sum = 0;
          for (let j = 0; j < n; j++) {
            if (j !== i) {
              sum += A[i][j] * x[j];
            }
          }
          x[i] = (b[i] - sum) / A[i][i];
        }

        output += 'x = [' + x.map(v => v.toFixed(6)).join(', ') + ']\n\n';

        // Verificar convergência
        let error = Math.max(...x.map((v, i) => Math.abs(v - xOld[i])));
        if (error < tol) {
          output += `Convergência atingida com erro ${error.toExponential()}\n`;
          return output;
        }
        xOld = [...x];
      }

      output += 'Número máximo de iterações atingido.\n';
      return output;
    }

    function solveGaussSeidel() {
      const matrixText = document.getElementById('matrix').value;
      const vectorText = document.getElementById('vector').value;
      const tol = parseFloat(document.getElementById('tolerance').value);
      const maxIter = parseInt(document.getElementById('iterations').value);

      try {
        const A = parseMatrix(matrixText);
        const b = vectorText.trim().split(/\s+/).map(Number);

        if (A.length !== b.length) {
          throw new Error('A matriz e o vetor devem ter o mesmo tamanho!');
        }

        const result = gaussSeidel(A, b, tol, maxIter);
        document.getElementById('output').textContent = result;

      } catch (error) {
        document.getElementById('output').textContent = 'Erro: ' + error.message;
      }
    }