import { pocketBase } from "./pocketBase";
import PocketBase from "pocketbase";


const postsAPI = store => {
    store.http = new PocketBase(import.meta.env.VITE_POCKET_BASE_URL);

    store.getFullList = async function (tableName) {
        return pocketBase.collection(tableName).getFullList({ sort: '-created', })
    }
    store.deleteRecord = async function (tableName, id) {
        await pocketBase.collection(tableName).delete(id)
    }
    store.updateRecord = async function (tableName, id, data) {
        pocketBase.beforeSend = function (url, options) {
            options.headers = Object.assign({}, options.headers, {
                'Content-Type': 'multipart/mixed'
            });
            console.log(options)
            return { url, options };
        };

        await pocketBase.collection(tableName).update(id, data)
        // await pocketBase.collection(tableName).delete(id)
    }

    //await axios.patch(`${import.meta.env.VITE_POCKET_BASE_URL}/api/collections/${tableName}/records/${state.admin.id}`,


}

export default postsAPI