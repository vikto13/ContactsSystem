import Employee from "./storeSlices/EmployeeAction"
import NavBar from "./storeSlices/NavBar"
import Paginate from "./storeSlices/PaginateAction"
import DialogActions from "./storeSlices/DialogActions"
import Admin from "./storeSlices/AdminAction"
import Company from "./storeSlices/CompanyActions"
import AlertMessage from "./storeSlices/AlertMessage"
import Image from "./storeSlices/ImageAction"
import Message from "./storeSlices/MessageAction"
import Office from "./storeSlices/OfficeAction"
import User from "./storeSlices/UserActions"

export const initializeStore = {
    modules: {
        Employee,
        Paginate,
        NavBar,
        DialogActions,
        Company,
        AlertMessage,
        Image,
        Message,
        Office,
        Admin,
        User
    }
}