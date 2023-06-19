export function expanding(obj) {
    let object = obj
    for (let expanded in obj.expand) {
        object[expanded] = obj.expand[expanded]
    }
    return object
}

export function expandTheLast(data) {
    let expanded = []
    expand(data, (data) => {
        expanded.push(data)
    })
    return expanded
}

function expand(data, callback) {
    if (typeof data === 'object' && !Array.isArray(data)) {
        if (data.expand) {
            Object.values(data.expand).forEach(value => expand(value, callback))
        } else {
            callback(data)
        }
    } else if (Array.isArray(data)) {
        Object.values(data).forEach(value => expand(value, callback))
    }
}

export function expandValues(data, collectionName) {
    let expanded = []
    expands(data, collectionName, (value) => {
        expanded.push(value)
    })
    return expanded
}
function expands(data, collectionName = null, callback) {

    if (typeof data === 'object' && !Array.isArray(data)) {
        if (Object.keys(data.expand).length) {
            Object.values(data.expand).forEach(value => expands(value, collectionName, callback))
        } else {
            if (collectionName) {
                data.collectionName === collectionName && callback(data)
            } else {
                callback(data)
            }

        }
    } else if (Array.isArray(data)) {
        Object.values(data).forEach(value => expands(value, collectionName, callback))
    }
}