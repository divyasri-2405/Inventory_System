import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProducts, saveProducts } from "./data/storage";

function Products() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");

    const navigate = useNavigate();

    const user = localStorage.getItem("user");

    function loadProducts() {
        setProducts(getProducts());
    }

    useEffect(() => {
        loadProducts();
    }, []);

    function deleteProduct(id) {
        if (!user) {
            navigate("/login");
            return;
        }

        if (window.confirm("Are you sure you want to delete this product?")) {
            const updatedProducts = products.filter(
                product => product.id !== id
            );

            saveProducts(updatedProducts);
            setProducts(updatedProducts);
        }
    }

    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <div className="page-heading">
                <h1>Products</h1>

                {user && (
                    <Link to="/addproducts" className="primary-link">
                        Add Product
                    </Link>
                )}
            </div>

            <input
                className="search"
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={e => setSearch(e.target.value)}
            />

            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Supplier</th>
                            {user && <th>Actions</th>}
                        </tr>
                    </thead>

                    <tbody>
                        {filteredProducts.map(product => (
                            <tr key={product.id}>
                                <td>{product.name}</td>
                                <td>{product.category}</td>
                                <td>₹{product.price}</td>
                                <td>{product.quantity}</td>
                                <td>{product.supplier}</td>

                                {user && (
                                    <td>
                                        <div className="actions">
                                            <Link
                                                to="/addproducts"
                                                state={{ product }}
                                                className="edit-link"
                                            >
                                                Edit
                                            </Link>

                                            <button
                                                className="danger"
                                                onClick={() =>
                                                    deleteProduct(product.id)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {filteredProducts.length === 0 && (
                <p>No products found.</p>
            )}
        </div>
    );
}

export default Products;