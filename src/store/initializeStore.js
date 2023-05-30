import User from "./storeSlices/UserActions"
import Dialog from "./storeSlices/DialogActions"
import Message from "./storeSlices/MessageAction"
import Company from "./storeSlices/CompanyActions"
import Admin from "./storeSlices/AdminAction"
import Image from "./storeSlices/ImageAction"
import Office from "./storeSlices/OfficeAction"
import Contact from "./storeSlices/ContactActions"
import Paginate from "./storeSlices/PaginateAction"
import NavBar from "./storeSlices/NavBar"
import AlertMessage from "./storeSlices/AlertMessage"

export const initializeStore = {
    modules: {
        User,
        Dialog,
        Message,
        Company,
        Admin,
        Image,
        Office,
        Contact,
        Paginate,
        NavBar,
        AlertMessage
    }
}