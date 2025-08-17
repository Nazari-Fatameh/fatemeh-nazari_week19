import React, { useEffect, useState } from "react";
import styles from "./ProductManagment.module.css";
import { getProducts } from "../Services/api";

function ProductManagment() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProducts()
      .then((res) => {
        console.log("API Response:", res);
        setProducts(res.data);
      })
      .catch((err) => {
        console.error("خطا در دریافت محصولات:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
        <button className={styles.productTitelButton}> افزودن محصول</button>

        <div className={styles.productTitelRight}>
          <span>مدیریت کالا</span>
          <img
            src="/Photos/setting-3.svg"
            alt="titel"
            className={styles.productTitelsvg}
          />
        </div>
      </div>

      <div className={styles.ProductManagmentTable}>
     
          <table className={styles.ProductTable}>
            <thead>
              <tr>
                <th>نام کالا</th>
                <th>موجودی</th>
                <th>قیمت</th>
                <th>شناسه کالا</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.price}</td>
                  <td>{item.id}</td>
                  <td className={styles.actionTable}>
                    <img src="./Photos/edit.svg" alt="edit"  className={styles.actionIcon}/>
                    <img src="./Photos/trash.svg" alt="delete" className={styles.actionIcon}/>
                  </td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        
      </div>
    </div>
  );
}

export default ProductManagment;
