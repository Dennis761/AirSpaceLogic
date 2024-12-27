import {
  FETCH_SUBCATALOG_PRODUCTS,
  ADD_PRODUCT,
  DELETE_PRODUCT,
} from "../Constants/subcatalogProductsConstants.ts";

interface Product {
  _id: string;
  name: string;
  price: number;
  discount?: number;
  titleImage: string;
  hoverImage: string;
  rating?: number;
  parametrs?: string[];
  imagesCollection: string[];
  ratingCount?: number;
}

interface SubcatalogState {
  products: Product[];
  currentPage: number;
  hasMore: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: SubcatalogState = {
  products: [],
  currentPage: 1,
  hasMore: true,
  loading: false,
  error: null,
};

export const subcatalogReducer = (
  state = initialState,
  action: any
): SubcatalogState => {
  switch (action.type) {
    case FETCH_SUBCATALOG_PRODUCTS:
      return {
        ...state,
        products:
          action.payload.currentPage === 1
            ? action.payload.products
            : [...state.products, ...action.payload.products],
        currentPage: action.payload.currentPage,
        hasMore: action.payload.hasMore,
        loading: false,
        error: action.payload.error || null,
      };
    case ADD_PRODUCT:
      console.log(action.payload)
      return {
        ...state,
        products: [action.payload.product, ...state.products],
      };
    case DELETE_PRODUCT:
      console.log(action.payload.productId)
      return {
        ...state,
        products: state.products.filter(
          (product) => product._id !== action.payload.productId
        ),
      };
    default:
      return state;
  }
};

