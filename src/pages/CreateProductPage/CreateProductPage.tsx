import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAppDispatch } from "../../hooks/hooks";
import { addProduct } from "../../features/products/productsSlice";
import styles from "./styles.module.scss";

const CreateProductPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      price: "",
      description: "",
      category: "",
      image: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Название обязательно"),
      price: Yup.number()
        .required("Цена обязательна")
        .min(1, "Цена должна быть больше 0"),
      description: Yup.string().required("Описание обязательно"),
      category: Yup.string().required("Категория обязательна"),
      image: Yup.string()
        .url("Некорректный URL изображения")
        .required("URL обязателен"),
    }),
    onSubmit: (values) => {
      const newProduct = {
        id: Date.now(),
        title: values.title,
        price: parseFloat(values.price),
        description: values.description,
        category: values.category,
        image: values.image,
        rating: { rate: 0, count: 0 },
        liked: false,
      };

      dispatch(addProduct(newProduct));
      navigate("/products");
    },
  });

  return (
    <div className={styles.container}>
      <div className={styles.creator}>
        <h1 className={styles.title}>Создать продукт</h1>
        <form onSubmit={formik.handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="title">Название</label>
            <input
              id="title"
              name="title"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.title}
            />
            {formik.touched.title && formik.errors.title ? (
              <div className={styles.error}>{formik.errors.title}</div>
            ) : null}
          </div>

          <div className={styles.field}>
            <label htmlFor="price">Цена</label>
            <input
              id="price"
              name="price"
              type="number"
              onChange={formik.handleChange}
              value={formik.values.price}
            />
            {formik.touched.price && formik.errors.price ? (
              <div className={styles.error}>{formik.errors.price}</div>
            ) : null}
          </div>

          <div className={styles.field}>
            <label htmlFor="description">Описание</label>
            <textarea
              id="description"
              name="description"
              onChange={formik.handleChange}
              value={formik.values.description}
            />
            {formik.touched.description && formik.errors.description ? (
              <div className={styles.error}>{formik.errors.description}</div>
            ) : null}
          </div>

          <div className={styles.field}>
            <label htmlFor="category">Категория</label>
            <input
              id="category"
              name="category"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.category}
            />
            {formik.touched.category && formik.errors.category ? (
              <div className={styles.error}>{formik.errors.category}</div>
            ) : null}
          </div>

          <div className={styles.field}>
            <label htmlFor="image">URL изображения</label>
            <input
              id="image"
              name="image"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.image}
            />
            {formik.touched.image && formik.errors.image ? (
              <div className={styles.error}>{formik.errors.image}</div>
            ) : null}
          </div>

          <button type="submit" className={styles.button}>
            Создать
          </button>
          <Link className={styles.backbutton} to="/products">
            Назад
          </Link>
        </form>
      </div>
    </div>
  );
};

export default CreateProductPage;
