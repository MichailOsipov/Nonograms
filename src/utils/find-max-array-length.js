export const findMaxArrayLength = arrayOfArray =>
    arrayOfArray.reduce(
        (currMax, currArray) => (currMax > currArray.length ? currMax : currArray.length),
        0
    );
