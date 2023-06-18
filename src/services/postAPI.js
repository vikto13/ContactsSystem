import { pocketBase } from "./pocketBase";
import PocketBase from "pocketbase";

const postsAPI = store => {
    store.http = new PocketBase(import.meta.env.VITE_POCKET_BASE_URL);

    store.getFullList = async function (tableName, expand) {
        return pocketBase.collection(tableName).getFullList({
            sort: '-created',
            '$autoCancel': false,
            ...expand
        })
    }
    store.getFirstList = async function (tableName, id, expand) {
        return pocketBase
            .collection(tableName)
            .getFirstListItem(`id="${id}"`, expand ? expand : {})
    }
    store.getListByFilter = async function (tableName, filter, expand) {
        return pocketBase.collection(tableName).getList(null, null,
            {
                sort: '-created',
                '$autoCancel': false,
                expand,
                filter
            })
    }
    store.getList = async function (tableName, filterId, expand) {
        return pocketBase.collection(tableName).getList(null, null,
            {
                sort: '-created',
                '$autoCancel': false,
                filter: `id="${filterId}"`,
                expand
            })
    }
    store.deleteRecord = async function (tableName, id) {
        await pocketBase.collection(tableName).delete(id, { '$autoCancel': false })
    }
    store.updateRecord = async function (tableName, id, data) {
        return pocketBase.collection(tableName).update(id, generateFormData(data))
    }
    store.saveRecord = async function (tableName, data) {
        let create = generateFormData(data)
        return pocketBase.collection(tableName).create(create);
    }
    store.saveRecords = async function (tableName, data) {
        return pocketBase.collection(tableName).create(generateFormData(data), { '$autoCancel': false })
    }
}

export default postsAPI

function generateFormData(data) {
    const formData = new FormData()
    for (let file in data) {
        formData.append(file, data[file]);
    }
    return formData
}