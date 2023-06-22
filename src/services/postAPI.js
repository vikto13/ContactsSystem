import PocketBase from 'pocketbase'

const postsAPI = (store) => {
    store.http = new PocketBase(import.meta.env.VITE_POCKET_BASE_URL)

    store.getFullList = async function (tableName, expand) {
        return this.http.collection(tableName).getFullList({
            sort: '-created',
            $autoCancel: false,
            ...expand,
        })
    }
    store.getFirstList = async function (tableName, id, expand) {
        return this.http
            .collection(tableName)
            .getFirstListItem(`id="${id}"`, expand ? expand : {})
    }
    store.getListByFilter = async function (tableName, filter, expand) {
        return this.http.collection(tableName).getList(null, null, {
            sort: '-created',
            $autoCancel: false,
            expand,
            filter,
        })
    }
    store.getList = async function (tableName, filterId, expand) {
        return this.http.collection(tableName).getList(null, null, {
            sort: '-created',
            $autoCancel: false,
            filter: `id="${filterId}"`,
            expand,
        })
    }
    store.getOneRecord = async function (tableName, id, expand) {
        return this.http.collection(tableName).getOne(id, { expand })
    }
    store.deleteRecord = async function (tableName, id) {
        await this.http.collection(tableName).delete(id, { $autoCancel: false })
    }
    store.updateRecord = async function (tableName, id, data) {
        return this.http
            .collection(tableName)
            .update(id, generateFormData(data))
    }
    store.saveRecord = async function (tableName, data) {
        let create = generateFormData(data)
        return this.http.collection(tableName).create(create)
    }
    store.saveRecords = async function (tableName, data) {
        return this.http
            .collection(tableName)
            .create(generateFormData(data), { $autoCancel: false })
    }
    store.getUrl = async function (record, fileName) {
        return this.http.files.getUrl(record, fileName)
    }
    store.authWithPassword = async function (
        tableName,
        email,
        password,
        expand
    ) {
        return this.http
            .collection(tableName)
            .authWithPassword(email, password, {}, { expand })
    }
    store.authRefresh = async function (tableName, expand) {
        return this.http
            .collection(tableName)
            .authRefresh({}, { expand: 'permissions_id' })
    }
    store.requestPasswordReset = async function (tableName, email) {
        return this.http.collection(tableName).requestPasswordReset(email)
    }
    store.confirmPasswordReset = async function (tableName, record) {
        return this.http.collection(tableName).confirmPasswordReset(record)
    }
}

export default postsAPI

function generateFormData(data) {
    const formData = new FormData()
    for (let file in data) {
        formData.append(file, data[file])
    }
    return formData
}
