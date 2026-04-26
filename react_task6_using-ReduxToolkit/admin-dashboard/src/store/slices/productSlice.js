import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addProduct,
  getAllProduct,
  getProductById,
  deleteProduct,
  updateProduct,
} from "../../Api/ProdductApi";

const getAllProductsAction = createAsyncThunk(
  "product/getAllProductsAction",
  async (args, thunkAPI) => {
    try {
      const res = await getAllProduct();
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const getProductByIdAction = createAsyncThunk(
  "product/getProductByIdAction",
  async (id, thunkAPI) => {
    try {
      const res = await getProductById(id);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const addProductAction = createAsyncThunk(
  "product/addProductAction",
  async (product, thunkAPI) => {
    try {
      const res = await addProduct(product);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const deleteProductAction = createAsyncThunk(
  "product/deleteProductAction",
  async (id, thunkAPI) => {
    try {
      await deleteProduct(id);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const updateProductAction = createAsyncThunk(
  "product/updateProductAction",
  async ({ id, product }, thunkAPI) => {
    try {
      const res = await updateProduct(id, product);
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [
      { id: 1, name: "a", price: 100 },
      { id: 2, name: "b", price: 200 },
      { id: 3, name: "c", price: 300 },
    ],
    error: null,
    isLoading: false,
    product: {},
  },

  reducers: {},

  extraReducers: (builder) => {
    console.log(builder);
    builder.addCase(getAllProductsAction.pending, (state, action) => {
      console.log(action);
      state.isLoading = true;
    });
    builder.addCase(getAllProductsAction.fulfilled, (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.products = action.payload;
    });
    builder.addCase(getAllProductsAction.rejected, (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.error = action.payload;
    });

    ///---------------------------getProductByIdAction---------------------------///
    builder.addCase(getProductByIdAction.pending, (state, action) => {
      console.log(action);
      state.isLoading = true;
    });
    builder.addCase(getProductByIdAction.fulfilled, (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.product = action.payload;
    });
    builder.addCase(getProductByIdAction.rejected, (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.error = action.payload;
    });

    //----------------addnewproduct
    builder.addCase(addProductAction.pending, (state, action) => {
      console.log(action);
      state.isLoading = true;
    });
    builder.addCase(addProductAction.fulfilled, (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.products = [...state.products, action.payload];
    });
    builder.addCase(addProductAction.rejected, (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.error = action.payload;
    });

    //----------------deleteProduct
    builder.addCase(deleteProductAction.pending, (state, action) => {
      console.log(action);
      state.isLoading = true;
    });
    builder.addCase(deleteProductAction.fulfilled, (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    });
    builder.addCase(deleteProductAction.rejected, (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.error = action.payload;
    });

    //----------------updateProduct
    builder.addCase(updateProductAction.pending, (state, action) => {
      console.log(action);
      state.isLoading = true;
    });
    builder.addCase(updateProductAction.fulfilled, (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.products = state.products.map((product) =>
        product.id === action.payload.id ? action.payload : product
      );
      state.product = action.payload;
    });
    builder.addCase(updateProductAction.rejected, (state, action) => {
      console.log(action);
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export {
  getAllProductsAction,
  getProductByIdAction,
  addProductAction,
  deleteProductAction,
  updateProductAction,
};
export const productreducer = productSlice.reducer;
