
import React, { useEffect, useState } from "react";
import styles from "./ProductManagment.module.css";
import { getProducts, addProduct } from "../Services/api";
import ModalAddProduct from "../Components/ModalAddProduct.jsx";

function ProductManagment() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await getProducts();
      console.log("Response from API:", res);

      
      const productsArray = res.data?.data || [];
      console.log("Products from API:", productsArray);

      setProducts(productsArray);
    } catch (err) {
      console.error("خطا در دریافت محصولات:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (newProduct) => {
    try {
      const res = await addProduct(newProduct);
      console.log("Add product response:", res);

    
      await fetchProducts();
      setShowModal(false);
    } catch (error) {
      console.error("خطا در اضافه کردن محصول:", error);
    }
  };

  return (
    <div className={styles.container}>
      <header className={styles.searchBox}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="جستجو کالا"
            className={styles.searchInput}
          />
          <div className={styles.leftContent}>
            <div className={styles.leftTextBox}>
              <span className={styles.leftText}>میلاد اعظمی</span>
              <span className={styles.modir}>مدیر</span>
            </div>
            <img
              src="/Photos/Felix-Vogel-4.svg"
              alt="logo"
              className={styles.leftImg}
            />
          </div>
          <img
            src="/Photos/search-normal.svg"
            alt="search"
            className={styles.rightIcon}
          />
        </div>
      </header>

      <div className={styles.productTitel}>
        <button
          className={styles.productAddButton}
          onClick={() => setShowModal(true)}
        >
          افزودن محصول
        </button>
        <div className={styles.productTitelRight}>
          <span>مدیریت کالا</span>
          <img
            src="/Photos/setting-3.svg"
            alt="titel"
            className={styles.productTitelsvg}
          />
        </div>
      </div>

      {loading ? (
        <p>در حال بارگذاری محصولات...</p>
      ) : products.length === 0 ? (
        <p>هیچ محصولی یافت نشد.</p>
      ) : (
        <div className={styles.ProductManagmentTable}>
          <table className={styles.ProductTable}>
            <thead>
              <tr>
                <th>نام کالا</th>
                <th>موجودی</th>
                <th>قیمت</th>
                <th>شناسه کالا</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item.id || Math.random()}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>{item.id}</td>
                  <td className={styles.actionTable}>
                    <img
                      src="./Photos/edit.svg"
                      alt="edit"
                      className={styles.actionIcon}
                    />
                    <img
                      src="./Photos/trash.svg"
                      alt="delete"
                      className={styles.actionIcon}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <ModalAddProduct
          onClose={() => setShowModal(false)}
          onAdd={handleAddProduct}
        />
      )}
    </div>
  );
}

export default ProductManagment;
