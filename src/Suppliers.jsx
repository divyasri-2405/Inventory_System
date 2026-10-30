import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getSuppliers, saveSuppliers } from "./data/storage";

function Suppliers() {
    const [suppliers, setSuppliers] = useState([]);
    const [search, setSearch] = useState("");

    const navigate = useNavigate();

    const user = localStorage.getItem("user");

    function loadSuppliers() {
        setSuppliers(getSuppliers());
    }

    useEffect(() => {
        loadSuppliers();
    }, []);

    function deleteSupplier(id) {
        if (!user) {
            navigate("/login");
            return;
        }

        if (window.confirm("Are you sure you want to delete this supplier?")) {
            const updatedSuppliers = suppliers.filter(
                supplier => supplier.id !== id
            );

            saveSuppliers(updatedSuppliers);
            setSuppliers(updatedSuppliers);
        }
    }

    const filteredSuppliers = suppliers.filter(supplier =>
        supplier.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div>
            <div className="page-heading">
                <h1>Suppliers</h1>

                {user && (
                    <Link to="/addsuppliers" className="primary-link">
                        Add Supplier
                    </Link>
                )}
            </div>

            <input
                className="search"
                type="text"
                placeholder="Search suppliers..."
                value={search}
                onChange={e => setSearch(e.target.value)}
            />

            <div className="table-wrap">
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Company</th>
                            {user && <th>Actions</th>}
                        </tr>
                    </thead>

                    <tbody>
                        {filteredSuppliers.map(supplier => (
                            <tr key={supplier.id}>
                                <td>{supplier.name}</td>
                                <td>{supplier.email}</td>
                                <td>{supplier.phone}</td>
                                <td>{supplier.company}</td>

                                {user && (
                                    <td>
                                        <div className="actions">
                                            <Link
                                                to="/addsuppliers"
                                                state={{ supplier }}
                                                className="edit-link"
                                            >
                                                Edit
                                            </Link>

                                            <button
                                                className="danger"
                                                onClick={() =>
                                                    deleteSupplier(supplier.id)
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

            {filteredSuppliers.length === 0 && (
                <p>No suppliers found.</p>
            )}
        </div>
    );
}

export default Suppliers;