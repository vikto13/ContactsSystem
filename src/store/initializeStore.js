import Employee from "./storeSlices/EmployeeAction"
import NavBar from "./storeSlices/NavBar"
import Paginate from "./storeSlices/PaginateAction"
import DialogActions from "./storeSlices/DialogActions"
import Company from "./storeSlices/CompanyActions"
import AlertMessage from "./storeSlices/AlertMessage"
import Image from "./storeSlices/ImageAction"



export const initializeStore = {
    modules: {
        Employee,
        Paginate,
        NavBar,
        DialogActions,
        Company,
        AlertMessage,
        Image
    }
}