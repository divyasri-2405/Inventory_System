
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Products() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState('');

    const navigate = useNavigate();
    const user = localStorage.getItem('user');

    function getProducts() {
        axios.get('http://localhost:3000/products')
            .then(response => setProducts(response.data))
            .catch(error => console.log(error));
    }

    useEffect(() => {
        getProducts();
    }, []);

    function checkLogin() {
        if (!user) {
            navigate('/login');
            return false;
        }
        return true;
    }

    function deleteProduct(id) {
        if (!checkLogin()) {
            return;
        }

        if (window.confirm('Are you sure you want to delete this product?')) {
            axios.delete(`http://localhost:3000/products/${id}`)
                .then(() => getProducts())
                .catch(error => console.log(error));
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
                                                state={{ product: product }}
                                                className="edit-link"
                                            >
                                                Edit
                                            </Link>

                                            <button
                                                className="delete-button"
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
