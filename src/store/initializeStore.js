import User from "./storeSlices/UserActions"
import Dialog from "./storeSlices/DialogActions"
import Message from "./storeSlices/MessageAction"
import Company from "./storeSlices/CompanyActions"

export const initializeStore = {
    modules: {
        User,
        Dialog,
        Message,
        Company
    }
}