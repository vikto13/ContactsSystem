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

export function getWithSameId(array1, array2) {
    return array1.filter(item1 => array2.some(item2 => item2.id === item1.id));
}