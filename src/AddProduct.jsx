import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const emptyForm = {
    name: '',
    category: '',
    price: '',
    quantity: '',
    supplier: ''
};

function AddProduct() {
    const [formdata, setFormData] = useState({ ...emptyForm });
    const [editid, setEditid] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const product = location.state?.product;

        if (product) {
            setEditid(product.id);
            setFormData({
                name: product.name,
                category: product.category,
                price: String(product.price),
                quantity: String(product.quantity),
                supplier: product.supplier
            });
        } else {
            setEditid('');
            setFormData({ ...emptyForm });
        }

        setError('');
        setMessage('');
    }, [location.state]);

    function handleChange(e) {
        const { name, value } = e.target;

        setFormData(previous => ({
            ...previous,
            [name]: value
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setError('');
        setMessage('');

        if (
            !formdata.name.trim() ||
            !formdata.category.trim() ||
            !formdata.supplier.trim() ||
            formdata.price === '' ||
            formdata.quantity === '' ||
            !Number.isFinite(Number(formdata.price)) ||
            !Number.isFinite(Number(formdata.quantity)) ||
            Number(formdata.price) < 0 ||
            Number(formdata.quantity) < 0 ||
            !Number.isInteger(Number(formdata.quantity))
        ) {
            setError(
                'Enter valid details and non-negative price and quantity.'
            );
            return;
        }

        const product = {
            name: formdata.name.trim(),
            category: formdata.category.trim(),
            price: Number(formdata.price),
            quantity: Number(formdata.quantity),
            supplier: formdata.supplier.trim()
        };

        try {
            if (editid) {
                await axios.put(
                    `http://localhost:3000/products/${editid}`,
                    { id: editid, ...product }
                );
                setMessage('Product updated successfully.');
            } else {
                await axios.post(
                    'http://localhost:3000/products',
                    product
                );
                setMessage('Product added successfully.');
            }

            setFormData({ ...emptyForm });
            setEditid('');

            navigate('/addproducts', {
                replace: true,
                state: null
            });
        } catch (err) {
            setError('Unable to save product. Please try again.');
        }
    }

    function cancelEdit() {
        setEditid('');
        setFormData({ ...emptyForm });
        setError('');
        setMessage('');

        navigate('/addproducts', {
            replace: true,
            state: null
        });
    }

    return (
        <section>
            <h1>{editid ? 'Edit Product' : 'Add Product'}</h1>

            <p>
                {editid
                    ? `Editing product ID: ${editid}`
                    : 'Enter details to add a new product.'}
            </p>

            {error && <p className="error">{error}</p>}
            {message && <p className="success">{message}</p>}

            <form className="form-card" onSubmit={handleSubmit}>
                <label>Product Name</label>
                <input
                    name="name"
                    value={formdata.name}
                    onChange={handleChange}
                    placeholder="Enter product name"
                    required
                />

                <label>Category</label>
                <input
                    name="category"
                    value={formdata.category}
                    onChange={handleChange}
                    placeholder="Enter category"
                    required
                />

                <label>Price (₹)</label>
                <input
                    type="number"
                    name="price"
                    min="0"
                    step="0.01"
                    value={formdata.price}
                    onChange={handleChange}
                    required
                />

                <label>Quantity</label>
                <input
                    type="number"
                    name="quantity"
                    min="0"
                    step="1"
                    value={formdata.quantity}
                    onChange={handleChange}
                    required
                />

                <label>Supplier</label>
                <input
                    name="supplier"
                    value={formdata.supplier}
                    onChange={handleChange}
                    placeholder="Enter supplier company"
                    required
                />

                <div className="actions">
                    <button type="submit">
                        {editid ? 'Update Product' : 'Add Product'}
                    </button>

                    {editid && (
                        <button
                            type="button"
                            className="secondary"
                            onClick={cancelEdit}
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>

            <button
                type="button"
                className="secondary"
                onClick={() => navigate('/products')}
            >
                View Products
            </button>
        </section>
    );
}

export default AddProduct;
