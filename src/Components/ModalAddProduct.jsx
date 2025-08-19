import React, { useState } from "react";
import * as yup from "yup";
import styles from "./ModalAddProduct.module.css";

function ModalAddProduct({ onClose, onAdd }) {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    quantity: "",
  });

  const [errors, setErrors] = useState({});

 
  const schema = yup.object().shape({
    name: yup.string().required("نام کالا الزامی است"),
    price: yup
      .number()
      .typeError("قیمت باید عدد باشد")
      .required("قیمت الزامی است")
      .positive("قیمت باید مثبت باشد"),
    quantity: yup
      .number()
      .typeError("تعداد باید عدد باشد")
      .required("تعداد موجودی الزامی است")
      .integer("تعداد باید عدد صحیح باشد")
      .min(1, "حداقل یک عدد باید وارد کنید"),
  });

  const handleSubmit = async () => {
    try {
      await schema.validate(newProduct, { abortEarly: false });

      const productToAdd = {
        ...newProduct,
        price: Number(newProduct.price),
        quantity: Number(newProduct.quantity),
      };

      onAdd(productToAdd);
      setNewProduct({ name: "", price: "", quantity: "" });
      setErrors({});
    } catch (validationErrors) {
      const formattedErrors = {};
      validationErrors.inner.forEach((err) => {
        formattedErrors[err.path] = err.message;
      });
      setErrors(formattedErrors);
    }
  };

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h3>ایجاد محصول جدید</h3>

        <div className={styles.formSetion}>
          <label htmlFor="Name">نام کالا</label>
          <input
            id="Name"
            type="text"
            placeholder="نام کالا"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
          {errors.name && <p className={styles.error}>{errors.name}</p>}
        </div>

        <div className={styles.formSetion}>
          <label htmlFor="Quantity">تعداد موجودی</label>
          <input
            id="Quantity"
            type="number"
            placeholder="تعداد موجودی"
            value={newProduct.quantity}
            onChange={(e) =>
              setNewProduct({ ...newProduct, quantity: e.target.value })
            }
          />
          {errors.quantity && (
            <p className={styles.error}>{errors.quantity}</p>
          )}
        </div>

        <div className={styles.formSetion}>
          <label htmlFor="Price">قیمت</label>
          <input
            id="Price"
            type="number"
            placeholder="قیمت"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
          {errors.price && <p className={styles.error}>{errors.price}</p>}
        </div>

        <div className={styles.modalActions}>
          <button type="button" onClick={onClose} className={styles.buttonClose}>
            انصراف
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className={styles.buttonSubmit}
          >
            ایجاد
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalAddProduct;
