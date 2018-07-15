export const ObjVal = (obj) => {
    if (obj && typeof obj === 'object' && Object.keys(obj).length) {
        return true;
    }
    return false;
}