import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const emptyForm = {
    name: '',
    company: '',
    email: '',
    phone: ''
};

function AddSupplier() {
    const [formdata, setFormData] = useState({ ...emptyForm });
    const [editid, setEditid] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const supplier = location.state?.supplier;

        if (supplier) {
            setEditid(supplier.id);
            setFormData({
                name: supplier.name,
                company: supplier.company,
                email: supplier.email,
                phone: supplier.phone
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

        const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
            formdata.email.trim()
        );

        if (
            !formdata.name.trim() ||
            !formdata.company.trim() ||
            !validEmail ||
            !/^\d{10}$/.test(formdata.phone.trim())
        ) {
            setError(
                'Enter a valid name, company, email and 10-digit phone number.'
            );
            return;
        }

        const supplier = {
            name: formdata.name.trim(),
            company: formdata.company.trim(),
            email: formdata.email.trim(),
            phone: formdata.phone.trim()
        };

        try {
            if (editid) {
                await axios.put(
                    `http://localhost:3000/suppliers/${editid}`,
                    { id: editid, ...supplier }
                );
                setMessage('Supplier updated successfully.');
            } else {
                await axios.post(
                    'http://localhost:3000/suppliers',
                    supplier
                );
                setMessage('Supplier added successfully.');
            }

            setFormData({ ...emptyForm });
            setEditid('');

            navigate('/addsuppliers', {
                replace: true,
                state: null
            });
        } catch (err) {
            setError('Unable to save supplier. Please try again.');
        }
    }

    function cancelEdit() {
        setEditid('');
        setFormData({ ...emptyForm });
        setError('');
        setMessage('');

        navigate('/addsuppliers', {
            replace: true,
            state: null
        });
    }

    return (
        <section>
            <h1>{editid ? 'Edit Supplier' : 'Add Supplier'}</h1>

            <p>
                {editid
                    ? `Editing supplier ID: ${editid}`
                    : 'Enter details to add a new supplier.'}
            </p>

            {error && <p className="error">{error}</p>}
            {message && <p className="success">{message}</p>}

            <form className="form-card" onSubmit={handleSubmit}>
                <label>Supplier Name</label>
                <input
                    name="name"
                    value={formdata.name}
                    onChange={handleChange}
                    placeholder="Enter supplier name"
                    required
                />

                <label>Company</label>
                <input
                    name="company"
                    value={formdata.company}
                    onChange={handleChange}
                    placeholder="Enter company name"
                    required
                />

                <label>Email</label>
                <input
                    type="email"
                    name="email"
                    value={formdata.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    required
                />

                <label>Phone</label>
                <input
                    type="tel"
                    name="phone"
                    value={formdata.phone}
                    onChange={handleChange}
                    placeholder="Enter 10-digit phone"
                    pattern="[0-9]{10}"
                    required
                />

                <div className="actions">
                    <button type="submit">
                        {editid ? 'Update Supplier' : 'Add Supplier'}
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
                onClick={() => navigate('/suppliers')}
            >
                View Suppliers
            </button>
        </section>
    );
}

export default AddSupplier;
