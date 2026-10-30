import { useState } from "react";

function Contact() {
    const [formdata, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [submitted, setSubmitted] = useState(false);

    function handleChange(e) {
        setFormData({
            ...formdata,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();

        setSubmitted(true);

        setFormData({
            name: "",
            email: "",
            message: ""
        });
    }

    return (
        <section className="auth-card">
            <h1>Contact Us</h1>

            <p>
                Have a question about your inventory?
                Send us a message.
            </p>

            {submitted && (
                <p className="success">
                    Thank you! Your message was submitted in this demo.
                </p>
            )}

            <form className="form-card" onSubmit={handleSubmit}>
                <label>Name</label>

                <input
                    name="name"
                    value={formdata.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                />

                <label>Email</label>

                <input
                    type="email"
                    name="email"
                    value={formdata.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                />

                <label>Message</label>

                <textarea
                    name="message"
                    value={formdata.message}
                    onChange={handleChange}
                    placeholder="Enter your message"
                    rows="5"
                    required
                />

                <button type="submit">Submit Message</button>
            </form>
        </section>
    );
}

export default Contact;