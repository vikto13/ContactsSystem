import User from "./storeSlices/UserActions"
import Dialog from "./storeSlices/DialogActions"
import Message from "./storeSlices/MessageAction"
import Company from "./storeSlices/CompanyActions"
import Admin from "./storeSlices/AdminAction"
import Image from "./storeSlices/ImageAction"

export const initializeStore = {
    modules: {
        User,
        Dialog,
        Message,
        Company,
        Admin,
        Image
    }
}