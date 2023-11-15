import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import { Sort } from "./filterSlice";

type FetPizzsArgs = Record<string, string>

type Pizza = {
  id: string; 
  title:string; 
  price:number; 
  imageUrl:string; 
  sizes:number[]; 
  types:number[];
}

export type SearchPizzaParams = {
  sortBy: string;
  order: string;
  category: string;
  search: string;
  currentPage: string;
}

export const fetchPizzas = createAsyncThunk<Pizza[],SearchPizzaParams>(
  "pizza/fetchPizzasStatus",
  async (params) => {
    const { data } = await axios.get<Pizza[]>(
      `https://641c23afb556e431a866720e.mockapi.io/items?page=${params.currentPage}&limit=4&${params.category}&sortBy=${params.sortBy}&order=${params.order}${params.search}`
    );

    return data;
  }
);

export enum Status {
  LOADING = 'loading',
  SUCCES = 'succes',
  ERROR = 'error'

}
interface PizzaSliceState {
  items: Pizza[];
  status: 'loading' | 'succes' | 'error';
}

const initialState: PizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

const pizzaSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action: PayloadAction<Pizza[]>) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.items = action.payload;
        state.status = Status.SUCCES;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});

export const selectPizzaData = (state: RootState) => state.pizza;
export const selectCart = (state: RootState) => state.cart;
export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
