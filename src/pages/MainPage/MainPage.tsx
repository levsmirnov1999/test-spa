import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

function MainPage() {
  return (
    <div className={styles.main}>
      <div className={styles.container}>
        <div className={styles.welcome}>
          <h1>Добро пожаловать в наш магазин!</h1>
          <p>
            Исследуйте наш каталог товаров и найдите что-то особенное для себя.
          </p>
          <Link to="/products" className={styles.link}>
            Показать продукты
          </Link>
        </div>
      </div>
      <footer className={styles.footer}>
        <p>
          Это тестовое задание. Исходный код доступен на{" "}
          <a href="https://github.com/levsmirnov1999/test-spa" target="_blank">
            GitHub
          </a>
          .
        </p>
      </footer>
    </div>
  );
}

export default MainPage;
