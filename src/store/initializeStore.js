import User from "./storeSlices/UserActions"
import Dialog from "./storeSlices/DialogActions"

export const initializeStore = {
    modules: {
        User,
        Dialog
    }
}