export function findObjectWithSameId(array1, array2) {
    for (let obj1 of array1) {
        for (let obj2 of array2) {
            if (obj1.id === obj2.id) {
                return obj1;
            }
        }
    }
    return null;
}

export function filterSameId(array) {
    return array.reduce((result, element) => {
        if (!result.find((e) => e.id === element.id)) {
            result.push(element);
        }
        return result;
    }, [])
}