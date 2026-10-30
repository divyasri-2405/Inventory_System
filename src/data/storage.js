import initialData from "../../db.json";

// Initialize data only once
function initializeData() {
    if (!localStorage.getItem("products")) {
        localStorage.setItem(
            "products",
            JSON.stringify(initialData.products || [])
        );
    }

    if (!localStorage.getItem("suppliers")) {
        localStorage.setItem(
            "suppliers",
            JSON.stringify(initialData.suppliers || [])
        );
    }

    if (!localStorage.getItem("users")) {
        localStorage.setItem(
            "users",
            JSON.stringify([])
        );
    }
}

initializeData();

// Read products
export function getProducts() {
    return JSON.parse(
        localStorage.getItem("products") || "[]"
    );
}

// Save products
export function saveProducts(products) {
    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );
}

// Read suppliers
export function getSuppliers() {
    return JSON.parse(
        localStorage.getItem("suppliers") || "[]"
    );
}

// Save suppliers
export function saveSuppliers(suppliers) {
    localStorage.setItem(
        "suppliers",
        JSON.stringify(suppliers)
    );
}

// Read registered users
export function getUsers() {
    return JSON.parse(
        localStorage.getItem("users") || "[]"
    );
}

// Save registered users
export function saveUsers(users) {
    localStorage.setItem(
        "users",
        JSON.stringify(users)
    );
}