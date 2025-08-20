import React, { useEffect, useState } from "react";
import styles from "./ProductManagment.module.css";
import {
  getProducts,
  addProduct,
  deleteProduct,
  editProduct,
} from "../Services/api";

import ModalAddProduct from "../Components/ModalAddProduct.jsx";
import ModalDeleteProduct from "../Components/ModalDeleteProduct.jsx";
import ModalEditProduct from "../Components/ModalEditProduct.jsx";

const toPersianDigits = (num) => {
  return num.toString().replace(/\d/g, (d) => "۰۱۲۳۴۵۶۷۸۹"[d]);
};

function ProductManagment() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 7;
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, searchTerm]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await getProducts(currentPage, itemsPerPage, searchTerm);
      setProducts(res.data.data || []);
      setTotalPages(res.data.totalPages || 1);
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
      setShowAddModal(false);
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

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setShowEditModal(true);
  };

  const handleConfirmEdit = async (updatedProduct) => {
    try {
      await editProduct(selectedProduct.id, updatedProduct);
      await fetchProducts();
      setShowEditModal(false);
    } catch (err) {
      console.error("خطا در ویرایش محصول:", err);
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
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
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
          onClick={() => setShowAddModal(true)}
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
                <th></th>
              </tr>
            </thead>
            <tbody>
              {products.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{toPersianDigits(item.quantity)}</td>
                  <td>{toPersianDigits(item.price)} هزار تومان</td>

                  <td>{toPersianDigits(item.id)}</td>
                  <td className={styles.actionTable}>
                    <img
                      src="./Photos/edit.svg"
                      alt="edit"
                      className={styles.actionIcon}
                      onClick={() => handleEditClick(item)}
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

          
          <div className={styles.pagination}>
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`${styles.pageButton} ${
                  currentPage === index + 1 ? styles.activePage : ""
                }`}
              >
                {toPersianDigits(index + 1)}
              </button>
            ))}
          </div>
        </div>
      )}

      
      {showAddModal && (
        <ModalAddProduct
          onClose={() => setShowAddModal(false)}
          onAdd={handleAddProduct}
        />
      )}

      {showEditModal && (
        <ModalEditProduct
          product={selectedProduct}
          onClose={() => setShowEditModal(false)}
          onSave={handleConfirmEdit}
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
