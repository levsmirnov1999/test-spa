import React from "react";
import { useParams, Link } from "react-router-dom";
import { RootState } from "../../store";
import { useAppSelector } from "../../hooks/hooks";
import { selectProductById } from "../../features/products/productsSlice";
import styles from "./styles.module.scss";

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const product = useAppSelector((state: RootState) =>
    selectProductById(state, productId)
  );

  if (!product) {
    return (
      <div className={styles.container}>
        <h1>Продукт не найден</h1>
        <Link to="/products" className={styles.link}>
          Вернуться к списку
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.product}>
        <img src={product.image} alt={product.title} className={styles.image} />
        <h1 className={styles.title}>{product.title}</h1>
        <p className={styles.price}>${product.price.toFixed(2)}</p>
        <p className={styles.description}>{product.description}</p>
        <p className={styles.category}>Категория: {product.category}</p>
        <Link to="/products" className={styles.link}>
          Вернуться к списку
        </Link>
      </div>
    </div>
  );
};

export default ProductDetailPage;
