function generateAndSort() {
    const minValue = parseInt(document.getElementById("min-value").value);
    const maxValue = parseInt(document.getElementById("max-value").value);
    const arraySize = parseInt(document.getElementById("array-size").value);
    const sortMethod = document.getElementById("sort-method").value;
    const arrayDecrescente = document.getElementById("sort-order").checked;

    if (isNaN(minValue) || isNaN(maxValue) || isNaN(arraySize) || arraySize < 1) {
        alert("Por favor, insira todos os valores corretamente.");
        return;
    }

    const array = [];
    for (let i = 0; i < arraySize; i++) {
        array.push(Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue);
    }

    let sortedArray, iterations;
    if (sortMethod === "bubble") {
        ({ sortedArray, iterations } = bubbleSort(array, arrayDecrescente));
    } else if (sortMethod === "insertion") {
        ({ sortedArray, iterations } = insertionSort(array, arrayDecrescente));
    } else {
        ({ sortedArray, iterations } = selectionSort(array, arrayDecrescente));
    }

    document.getElementById("original-array").innerText = `Array original: [${array.join(", ")}]`;
    document.getElementById("sorted-array").innerText = `Array ordenada: [${sortedArray.join(", ")}]`;
    document.getElementById("iterations").innerText = `Quantidade de iterações: ${iterations}`;
}

function bubbleSort(array, arrayDecrescente) {
    const arr = [...array];
    let iterations = 0;

    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            iterations++; // Conta cada iteração
            if (arrayDecrescente) {
                if (arr[j] < arr[j + 1]) {
                    const temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            } else {
                if (arr[j] > arr[j + 1]) {
                    const temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }
        }
    }

    return { sortedArray: arr, iterations };
}

function insertionSort(array, arrayDecrescente) {
    const arr = [...array];
    let iterations = 0;

    for (let i = 1; i < arr.length; i++) {
        const key = arr[i];
        let j = i - 1;

        while (j >= 0) {
            iterations++; // Conta cada iteração
            if (arrayDecrescente ? arr[j] < key : arr[j] > key) {
                arr[j + 1] = arr[j];
                j--;
            } else {
                break;
            }
        }

        arr[j + 1] = key;
    }

    return { sortedArray: arr, iterations };
}

function selectionSort(array, arrayDecrescente) {
    const arr = [...array];
    let iterations = 0;

    for (let i = 0; i < arr.length - 1; i++) {
        let key = i;

        for (let j = i + 1; j < arr.length; j++) {
            iterations++; // Conta cada iteração
            if (arrayDecrescente ? arr[j] > arr[key] : arr[j] < arr[key]) {
                key = j;
            }
        }

        if (key !== i) {
            const temp = arr[i];
            arr[i] = arr[key];
            arr[key] = temp;
        }
    }

    return { sortedArray: arr, iterations };
}
