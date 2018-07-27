import {
    FindLongestArr,
    MergeArrs,
    Shuffle
} from '../utils';

export const GroupStudents = ({ gender, level, sectionId, size, students }) => {
    if (gender === 'random' && level === 'random') {
        return SameGroupsOf(size, [ Shuffle(Object.keys(students)) ]);
    }
    if (gender !== 'random') {
        const studentsByGender = SortObjectByKey(students, 'gender');
        const femalesObj = studentsByGender.female;
        const malesObj = studentsByGender.male;
        const femalesByLevelArr = GetArraysByObjectKey(femalesObj, 'level', sectionId);
        const malesByLevelArr = GetArraysByObjectKey(malesObj, 'level', sectionId);

        if (gender === 'mixed') {
            if (level === 'mixed') {
                return MixedGroupsOf(size, [ ...Shuffle(femalesByLevelArr), ...Shuffle(malesByLevelArr) ]);

            } else if (level === 'same') {
                const femalesByDescendingLevel = femalesByLevelArr[0].concat(
                    femalesByLevelArr[1], femalesByLevelArr[2]
                );
                const malesByDescendingLevel = malesByLevelArr[0].concat(
                    malesByLevelArr[1], malesByLevelArr[2]
                );

                return Shuffle(MixedGroupsOf(size, [ femalesByDescendingLevel, malesByDescendingLevel ]));

            } else if (level === 'random') {
                return MixedGroupsOf(size, [ Shuffle(Object.keys(femalesObj)), Shuffle(Object.keys(malesObj)) ]);
            }
        } else if (gender === 'same') {
            if (level === 'mixed') {
                const femalesAlternatingLevels = MergeArrs(femalesByLevelArr);
                const malesAlternatingLevels = MergeArrs(malesByLevelArr);

                return SameGroupsOf(size, [ femalesAlternatingLevels, malesAlternatingLevels ]);
            } else if (level === 'same') {
                return SameGroupsOf(size, [ ...femalesByLevelArr, ...malesByLevelArr ]);
            } else if (level === 'random') {
                return SameGroupsOf(size, [ Shuffle(Object.keys(femalesObj)), Shuffle(Object.keys(malesObj)) ]);
            }
        }
    }
}

// Grouping Utils

export const GetArraysByObjectKey = (obj, key, sectionId) => {
    const sorted = sectionId ? SortStudentsByLevel(obj, sectionId) : SortObjectByKey(obj, key);
    return Object.keys(sorted).map(category => Shuffle(Object.keys(sorted[category])));
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

export const SortStudentsByLevel = (studentObj, sectionId) => {
    const output = {};

    for (const studentId in studentObj) {
        const current = studentObj[studentId];
        const level = current.sections[sectionId];

        if (!output.hasOwnProperty(level)) {
            output[level] = {};
        }

        output[level][studentId] = current;
    }

    return output;
}