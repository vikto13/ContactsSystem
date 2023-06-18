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

export function expandValues(data) {
    let expanded = []
    expands(data, (value) => {
        console.log(value)
        expanded.push(value)
    })
    return expanded
}
function expands(data, callback) {
    console.log(data)
    if (typeof data === 'object' && !Array.isArray(data)) {
        if (data.expand) {
            Object.values(data.expand).forEach(value => expands(value, callback))
        } else {
            callback(data)
        }
    } else if (Array.isArray(data)) {
        Object.values(data).forEach(value => expands(value, callback))
    }
}