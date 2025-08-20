import React, { useState, useEffect } from "react";
import styles from "./ModalEditProduct.module.css";

function ModalEditProduct({ onClose, onSave, product }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || "",
        price: product.price || "",
        quantity: product.quantity || "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); 
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <h3>ویرایش اطلاعات</h3>
        <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formSetion}>
          <label> نام کالا</label>

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
</div>
<div className={styles.formSetion}>
          <label>تعداد موجودی</label>
          <input
            type="number"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
          />
          </div>
          <div  className={styles.formSetion}>
          <label>قیمت</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
          </div>
          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.cancel}>
              انصراف
            </button>
            <button type="submit" className={styles.save}>
               ثبت اطلاعات جدید
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalEditProduct;
