export function expanding(obj) {
    let object = obj
    for (let expanded in obj.expand) {
        object[expanded] = obj.expand[expanded]
    }
    return object
}