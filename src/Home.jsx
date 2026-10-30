import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getProducts, getSuppliers } from "./data/storage";

function Home() {
    const [products, setProducts] = useState([]);
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        setProducts(getProducts());
        setSuppliers(getSuppliers());
    }, []);

    const totalStock = products.reduce(
        (total, product) =>
            total + Number(product.quantity),
        0
    );

    const stockValue = products.reduce(
        (total, product) =>
            total +
            Number(product.price) * Number(product.quantity),
        0
    );

    const lowStock = products.filter(
        product => Number(product.quantity) <= 5
    ).length;

    return (
        <div>
            <section className="hero">
                <p className="eyebrow">INVENTORY OVERVIEW</p>

                <h1>Manage your inventory with ease</h1>

                <p>
                    Track products, monitor stock and manage supplier
                    details in one place.
                </p>

                <Link className="primary-link" to="/addproducts">
                    + Add New Product
                </Link>
            </section>

            <h2>Dashboard</h2>

            <div className="stats">
                <div className="stat-card">
                    <p>Total Products</p>
                    <h2>{products.length}</h2>
                </div>

                <div className="stat-card">
                    <p>Total Stock Units</p>
                    <h2>{totalStock}</h2>
                </div>

                <div className="stat-card">
                    <p>Suppliers</p>
                    <h2>{suppliers.length}</h2>
                </div>

                <div className="stat-card">
                    <p>Low Stock Items</p>
                    <h2>{lowStock}</h2>
                </div>
            </div>

            <section className="panel">
                <h2>Inventory Value</h2>

                <h2>₹{stockValue.toLocaleString("en-IN")}</h2>

                <p>
                    Calculated from current quantity × unit price.
                </p>

                <Link to="/products">View Products →</Link>
            </section>
        </div>
    );
}

export default Home;