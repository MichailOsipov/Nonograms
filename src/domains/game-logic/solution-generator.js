
// const getDigitSpaceFromPosition = (row, digit, position) => {
//     let freeCellCounter = 0;
//     // todo add check if we start from 'unknown'
//     for (let i = position; i < row.length; i += 1) {
//         if (row[i] === 'empty') {
//             freeCellCounter = 0;
//         }

//         if (row[i] === 'unknown' || row[i] === 'filled') {
//             freeCellCounter += 1;
//         }

//         if (freeCellCounter === digit && i === row.length - 1) {
//             return (i + 1) - freeCellCounter;
//         }

//         if (freeCellCounter === digit && (row[i + 1] === 'unknown' || row[i + 1] === 'empty')) {
//             return (i + 1) - freeCellCounter;
//         }

//         // todo rework this case
//         if (freeCellCounter === digit && row[i + 1] === 'filled') {
//             for (let j = (i - freeCellCounter) + 1; j < row.length; j += 1) {
//                 if (row[j] === 'empty' || row[j] === 'unknown') {
//                     i = j + 1;
//                     break;
//                 }
//             }
//         }
//     }

//     return -1;
// };

const initDigitsSolution = (row, digits) => {
    const resDigits = digits.reduce((res, currDigit, i) => {
        const lastDigitPosition = res[res.length - 1] || 0;
        const nextFreeIndex = res.length === 0 ? 0 : lastDigitPosition + digits[i - 1] + 1;
        const nextDigitPosition = nextFreeIndex; // getDigitSpaceFromPosition(row, currDigit, nextFreeIndex);
        return [...res, nextDigitPosition];
    }, []);

    return resDigits;
};

const convertDigitsSolutionToSolution = (digitsSolution, row, digits) => {
    const solution = [...row];
    digitsSolution.forEach((digitSolution, i) => {
        for (let j = 0; j < digits[i]; j += 1) {
            solution[digitSolution + j] = 'filled';
        }
    });

    return solution.map(f => (f === 'filled' ? 'filled' : 'empty'));
};

const buildSolutionFromIndex = (digitsSolution, row, digits, index) => {
    let isError = false;
    const resDigits = digits.reduce((res, currDigit, i) => {
        if (i < index) {
            return [...res, digitsSolution[i]];
        }

        const lastDigitPosition = res[res.length - 1] || 0;

        let nextFreeIndex;

        if (i === index) {
            nextFreeIndex = digitsSolution[i] + 1;
        } else {
            nextFreeIndex = res.length === 0 ? 0 : lastDigitPosition + digits[i - 1] + 1;
        }
        const nextDigitPosition = nextFreeIndex + currDigit <= row.length ? nextFreeIndex : -1; // getDigitSpaceFromPosition(row, currDigit, nextFreeIndex);
        if (nextDigitPosition === -1) {
            isError = true;
        }
        return [...res, nextDigitPosition];
    }, []);

    if (isError === true) {
        return -1;
    }

    return resDigits;
};


const getNextDigitsSolution = (digitsSolution, row, digits) => {
    if (!digitsSolution) {
        return initDigitsSolution(row, digits);
    }

    for (let i = digitsSolution.length - 1; i >= 0; i -= 1) {
        const newSolution = buildSolutionFromIndex(digitsSolution, row, digits, i);
        if (newSolution !== -1) {
            return newSolution;
        }
    }

    return -1;
};

const isValidSolution = (solution, row, digits) => {
    const solutionDigits = [];
    let currDigit = 0;
    for (let i = 0; i < solution.length; i += 1) {
        if (solution[i] === 'filled') {
            currDigit += 1;
        }

        if (solution[i] === 'empty' && currDigit !== 0) {
            solutionDigits.push(currDigit);
            currDigit = 0;
        }
    }

    if (solution[solution.length - 1] === 'filled') {
        solutionDigits.push(currDigit);
    }

    if (solutionDigits.length !== digits.length) {
        return false;
    }

    const sameDigits = solutionDigits.every((currSolutionDigit, i) =>
        currSolutionDigit === digits[i]
    );

    if (!sameDigits) {
        return false;
    }

    const sameCells = row.every((rowEl, i) => {
        if (rowEl === 'unknown') {
            return true;
        }

        return rowEl === solution[i];
    });

    return sameCells;
};

export function* solutionGenerator(row, digits) {
    // todo - empy row case
    let haveSolutions = true;
    let digitsSolution;
    let solution;

    while (haveSolutions) {
        digitsSolution = getNextDigitsSolution(digitsSolution, row, digits);
        if (digitsSolution === -1) {
            haveSolutions = false;
        } else {
            solution = convertDigitsSolutionToSolution(digitsSolution, row, digits);
            if (isValidSolution(solution, row, digits)) {
                yield solution;
            }
        }
    }

    return -1;
}
