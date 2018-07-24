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

export const GetArraysByObjectKeys = (obj, key) => {
    const sorted = SortObjectByKey(obj, key);
    return Object.keys(sorted).map(category => Shuffle(Object.keys(category)));
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

export const SameGroupsOf = (size, arrOfArrs) => {
    const output = [];
    let group = [];

    for (let g = 0; g < arrOfArrs.length; g++) {
        // Iterate through the groups
        const currentArr = arrOfArrs[g];

        for (let i = 0; i < currentArr.length; i++) {
            // Interate through the groups
            const current = currentArr[i];

            if (current) {
                group.push(current);
            }

            if (group.length === size) {
                output.push(group);
                group = [];
            }

            if (
                group.length &&
                i === currentArr.length - 1 &&
                g === arrOfArrs.length - 1
            ) {
                output.push(group);
            }
        }
    }

    return output;
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

export const SortObjectByKey = (obj, key) => {
    const output = {};

    for (const prop in obj) {
        const current = obj[prop];
        const value = current[key];

        if (!output.hasOwnProperty(value)) {
            output[value] = {};
        }

        output[value][prop] = current;
    }

    return output;
}