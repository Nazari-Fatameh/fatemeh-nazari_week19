import React from "react";
import styles from "./ModalDeleteProduct.module.css";

function ModalDeleteProduct({ onClose, onConfirm, productName }) {
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal}>
        <div className={styles.ModalSVG}>
          <img src="./Photos/Close.svg" alt="delete" />
        </div>
        <p> آیا از حذف این محصول مطمئنید؟</p>
        <div className={styles.modalActions}>
          <button className={styles.buttonClose} onClick={onClose}>
            لغو
          </button>
          <button className={styles.buttonSubmit} onClick={onConfirm}>
            حذف
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalDeleteProduct;
