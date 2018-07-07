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