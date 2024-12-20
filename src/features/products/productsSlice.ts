import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { Product, ProductsState } from "../../types/types";
import { BASE_URL } from "../../utils/utils";

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchProducts = createAsyncThunk<Product[]>(
  "products/fetchProducts",
  async () => {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error("Ошибка загрузки товаров");
    }
    return response.json();
  }
);

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    toggleLike: (state, action: { payload: number }) => {
      const product = state.items.find((item) => item.id === action.payload);
      if (product) {
        product.liked = !product.liked;
      }
    },
    deleteProduct: (state, action: { payload: number }) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    addProduct: (state, action: { payload: Product }) => {
      state.items.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.map((product) => ({
          ...product,
          liked: false,
        }));
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка";
      });
  },
});

export const { toggleLike, deleteProduct, addProduct } = productsSlice.actions;

export const selectProducts = (state: RootState) => state.products.items;
export const selectProductsLoading = (state: RootState) =>
  state.products.loading;
export const selectProductsError = (state: RootState) => state.products.error;
export const selectProductById = (state: RootState, id: number) =>
  state.products.items.find((product) => product.id === id);

export default productsSlice.reducer;
