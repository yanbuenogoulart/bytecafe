function generateAndSort() {
    const minValue = parseInt(document.getElementById("min-value").value);
    const maxValue = parseInt(document.getElementById("max-value").value);
    const arraySize = parseInt(document.getElementById("array-size").value);
    const sortMethod = document.getElementById("sort-method").value;
    const isDescending = document.getElementById("sort-order").checked; // Checkbox de ordem

    if (isNaN(minValue) || isNaN(maxValue) || isNaN(arraySize)) {
        alert("Por favor, insira todos os valores corretamente.");
        return;
    }

    const array = Array.from({ length: arraySize }, () => 
        Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue
    );

    document.getElementById("original-array").innerText = `Array original: [${array.join(", ")}]`;

    let sortedArray, iterations;
    switch (sortMethod) {
        case "bubble":
            ({ sortedArray, iterations } = bubbleSort(array));
            break;
        case "insertion":
            ({ sortedArray, iterations } = insertionSort(array));
            break;
        case "selection":
            ({ sortedArray, iterations } = selectionSort(array));
            break;
        default:
            alert("Método de ordenação inválido.");
            return;
    }

    if (isDescending) {
        sortedArray.reverse();
    }

    document.getElementById("sorted-array").innerText = `Array ordenada: [${sortedArray.join(", ")}]`;
    document.getElementById("iterations-count").innerText = `Quantidade de iterações: ${iterations}`;
}


// Algoritmo Bubble Sort
function bubbleSort(array) {
    const arr = [...array];
    let iterations = 0;

    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            iterations++;
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }

    return { sortedArray: arr, iterations };
}

function insertionSort(array) {
    const arr = [...array];
    let iterations = 0;

    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;

        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j = j - 1;
            iterations++;
        }
        arr[j + 1] = key;
        iterations++;
    }

    return { sortedArray: arr, iterations };
}

// Algoritmo Selection Sort
function selectionSort(array) {
    const arr = [...array];
    let iterations = 0;

    for (let i = 0; i < arr.length - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < arr.length; j++) {
            iterations++;
            if (arr[j] < arr[minIdx]) {
                minIdx = j;
            }
        }
        if (minIdx !== i) {
            [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        }
    }

    return { sortedArray: arr, iterations };
}

