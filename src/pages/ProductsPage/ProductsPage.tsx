import React, { useEffect, useState } from "react";
import {
  fetchProducts,
  selectProducts,
  selectProductsLoading,
  selectProductsError,
} from "../../features/products/productsSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import { Link } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import styles from "./styles.module.scss";

const ProductsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(selectProducts);
  const loading = useAppSelector(selectProductsLoading);
  const error = useAppSelector(selectProductsError);
  console.log(products);

  const [filter, setFilter] = useState<"all" | "liked">("all");

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchProducts());
    }
  }, [dispatch, products.length]);

  const filteredProducts =
    filter === "liked" ? products.filter((product) => product.liked) : products;

  if (loading) {
    return <div className={styles.preloader}>Загрузка товаров...</div>;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Список товаров</h1>
      <div className={styles.links}>
        <button className={styles.link} onClick={() => setFilter("all")}>
          Все товары
        </button>
        <button className={styles.link} onClick={() => setFilter("liked")}>
          Избранные
        </button>
        <Link className={styles.link} to="/create-product">
          Создать продукт
        </Link>
      </div>

      <div className={styles.products}>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsPage;
