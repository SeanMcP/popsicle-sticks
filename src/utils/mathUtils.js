export const FindLongestArr = (arrOfArrs, request) => {
    // This intentionally does not care whether
    // there are more than one longest array.

    let length = -Infinity;
    let index = -1;

    arrOfArrs.forEach((arr, i) => {
        if (arr.length > length) {
            length = arr.length;
            index = i;
        }
    });

    if (request === 'index') {
        return index;
    } else if (request === 'length') {
        return arrOfArrs[index].length;
    } else {
        return arrOfArrs[index];
    }
}

export const MergeArr = (arrOfArrs) => {
    const length = FindLongestArr(arrOfArrs, 'length');
    const mergedArr = [];

    for (const i = 0; i < length; i++) {
        for (const g = 0; g < arrOfArrs.length; g++) {
            if (arrOfArrs[g][i]) {
                mergedArr.push(arrOfArrs[g][i]);
            }
        }
    }

    return mergedArr;
}

export const Shuffle = (arr) => {
    const output = [...arr];
    let count = output.length;

    while (count > 0) {
        const i = Math.floor(Math.random() * count);
        count--;
        const temp = output[count];
        output[count] = output[i];
        output[i] = temp;
    }

    return output;
}