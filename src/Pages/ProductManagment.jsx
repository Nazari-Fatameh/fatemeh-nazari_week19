import React, { useEffect, useState } from "react";
import styles from "./ProductManagment.module.css";
import { getProducts, addProduct, deleteProduct } from "../Services/api";
import ModalAddProduct from "../Components/ModalAddProduct.jsx";
import ModalDeleteProduct from "../Components/ModalDeleteProduct.jsx"; 

function ProductManagment() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await getProducts();
      const productsArray = res.data?.data || [];
      setProducts(productsArray);
    } catch (err) {
      console.error("خطا در دریافت محصولات:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (newProduct) => {
    try {
      await addProduct(newProduct);
      await fetchProducts();
      setShowModal(false);
    } catch (error) {
      console.error("خطا در اضافه کردن محصول:", error);
    }
  };


  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
  };

  
  const handleConfirmDelete = async () => {
    try {
      await deleteProduct(selectedProduct.id); 
      await fetchProducts(); 
      setShowDeleteModal(false);
    } catch (err) {
      console.error("خطا در حذف محصول:", err);
    }
  };
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.container}>
      <header className={styles.searchBox}>
        <div className={styles.inputWrapper}>
          <input
            type="text"
            placeholder="جستجو کالا"
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
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
      ) : filteredProducts.length === 0 ? (
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
              {filteredProducts.map((item) => (
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
                      onClick={() => handleDeleteClick(item)}
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

      {showDeleteModal && (
        <ModalDeleteProduct
          onClose={() => setShowDeleteModal(false)}
          onConfirm={handleConfirmDelete}
          productName={selectedProduct?.name}
        />
      )}
    </div>
  );
}

export default ProductManagment;
