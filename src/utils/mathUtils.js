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

export const MixedGroupsOf = (size, arrOfArrs) => {
    const output = [];
    const longestLength = FindLongestArr(arrOfArrs, 'length');
    let group = [];

    for (let i = 0; i < longestLength; i++) {
        // Iterate through a group

        for (let g = 0; g < arrOfArrs.length; g++) {
            // Interate through the groups
            const current = arrOfArrs[g][i];

            if (current) {
                group.push(current);
            }

            if (group.length === size) {
                output.push(group);
                group = [];
            }

            if (
                group.length &&
                i === longestLength - 1 &&
                g === arrOfArrs.length - 1
            ) {
                output.push(group);
            }
        }
    }

    return output;
}

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