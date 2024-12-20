import React from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/hooks";
import { toggleLike, deleteProduct } from "../features/products/productsSlice";
import { ProductCardProps } from "../types/types";
import { IoTrashOutline } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import styles from "./styles.module.scss";

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  image,
  liked,
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(toggleLike(id));
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(deleteProduct(id));
  };

  const handleCardClick = () => {
    navigate(`/products/${id}`);
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
      <img src={image} alt={title} className={styles.image} />
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.price}>${price.toFixed(2)}</p>
      <div className={styles.actions}>
        <button className={styles.like} onClick={handleLike}>
          {liked ? <FaHeart /> : <CiHeart />}
        </button>
        <button onClick={handleDelete}>
          <IoTrashOutline />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
