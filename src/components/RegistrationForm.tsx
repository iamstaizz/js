import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import type { Participant } from "../App";

interface RegistrationFormProps {
    participants: Participant[];
    setParticipants: React.Dispatch<React.SetStateAction<Participant[]>>;
}

function RegistrationForm({ participants, setParticipants }: RegistrationFormProps) {
    // Стан для полів форми
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        birthDate: "",
    });

    // Стан для повідомлень про помилки
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        phone: "",
        birthDate: "",
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });


        setErrors({ ...errors, [name]: "" });
    };


    const validate = (): boolean => {
        let valid = true;
        const newErrors = { name: "", email: "", phone: "", birthDate: "" };

        if (!formData.name.trim()) {
            newErrors.name = "Name is required";
            valid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            newErrors.email = "Invalid email format";
            valid = false;
        }

        const phoneRegex = /^[0-9]{10,15}$/;
        if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = "Phone must contain 10–15 digits";
            valid = false;
        }


        const birthDate = new Date(formData.birthDate);
        const today = new Date();
        if (birthDate > today) {
            newErrors.birthDate = "Birth date cannot be in the future";
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };


    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if (!validate()) return;


        const newParticipant: Participant = {
            id: participants.length + 1,
            ...formData,
        };

        setParticipants([...participants, newParticipant]);


        setFormData({ name: "", email: "", phone: "", birthDate: "" });
    };

    return (
        <div className="card p-4 mb-4">
            <h3 className="mb-3">Add New Participant</h3>

            <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        name="name"
                        className={`form-control ${errors.name && "is-invalid"}`}
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name}</div>}
                </div>

                {/* Email */}
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        name="email"
                        className={`form-control ${errors.email && "is-invalid"}`}
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                </div>


                <div className="mb-3">
                    <label className="form-label">Phone</label>
                    <input
                        type="tel"
                        name="phone"
                        className={`form-control ${errors.phone && "is-invalid"}`}
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                    {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                </div>


                <div className="mb-3">
                    <label className="form-label">Birth Date</label>
                    <input
                        type="date"
                        name="birthDate"
                        className={`form-control ${errors.birthDate && "is-invalid"}`}
                        value={formData.birthDate}
                        onChange={handleChange}
                        required
                    />
                    {errors.birthDate && <div className="invalid-feedback">{errors.birthDate}</div>}
                </div>


                <button type="submit" className="btn btn-primary w-100">
                    Save
                </button>
            </form>
        </div>
    );
}

export default RegistrationForm;
