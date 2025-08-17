import React, { useState, useEffect } from "react";
import Styles from "./ReusableForm.module.css";
export default function ReusableForm({
  fields,
  buttonText,
  onSubmit,
  errors = {},
  resetForm = false,
}) {
  const initialState = {};
  fields.forEach((f) => (initialState[f.name] = ""));

  const [formData, setFormData] = useState(initialState);

 
  useEffect(() => {
    if (resetForm) {
      setFormData(initialState);
    }
  }, [resetForm]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className={Styles.form}>
      {fields.map((field) => (
        <div key={field.name} className={Styles.formGroup}>
          <input
            name={field.name}
            type={field.type}
            placeholder={field.placeholder}
            value={formData[field.name]}
            onChange={handleChange}
            className={Styles.input}
          />
          {errors[field.name] && (
            <p className={Styles.error}>{errors[field.name]}</p>
          )}
        </div>
      ))}
      <button type="submit" className={Styles.submitButton}>
        {buttonText}
      </button>
    </form>
  );
}
