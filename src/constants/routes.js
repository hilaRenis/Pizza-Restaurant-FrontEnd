export const CHECKOUT = "/checkout";
export const LOGIN = "/login";
export const REGISTER = "/register";
export const ACCOUNT = "/account/*";

export const ORDERS = "/";
export const CUSTOMER = "/";

export const MENU = "/menu"
export const MENU_EDIT = "/menu/:id"
export const MENU_CREATE = "/menu/create"

export const USERS = "/users"
export const USERS_EDIT = "/users/:id"
export const USERS_CREATE = "/users/create"
export const CUSTOMERS_LIST = "/customers"
export const STATS = "/stats"

export const getRoutePath = (PATH = null) => {
    let account = "/account";

    const userData = localStorage.getItem('userData');
    const user = JSON.parse(userData);

    if (user.role === "Employee") {
        account += "/admin"
    }

    if (user.role === "Customer") {
        account += "/customer"
    }

    if(!PATH){
        return account;
    }

    return  account + PATH;
}