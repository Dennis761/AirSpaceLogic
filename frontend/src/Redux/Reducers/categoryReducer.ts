import {
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_CATEGORIES_FAILURE,
  ADD_CATEGORY,
  REMOVE_CATEGORY,
  ADD_PRODUCT_TO_CATEGORY,
  REMOVE_PRODUCT_FROM_CATEGORY,
} from '../Constants/categoryConstants.ts';

export interface Product {
  _id: string;
  name: string;
  price: number;
  discount?: number;
  titleImage: string;
  hoverImage: string;
  rating?: number;
  parametrs?: string[];
  ratingCount?: number;
}

interface Category {
  name: string;
  products: Product[];
}

interface CategoryState {
  loading: boolean;
  categories: Category[];
  error: string | null;
}

const initialState: CategoryState = {
  loading: false,
  categories: [],
  error: null,
};

interface Action {
  type: string;
  payload?: any;
}

export const categoryReducer = (state = initialState, action: Action): CategoryState => {
  switch (action.type) {
    case FETCH_CATEGORIES_REQUEST:
      return { ...state, loading: true, error: null };

    case FETCH_CATEGORIES_SUCCESS:
      return { ...state, loading: false, categories: action.payload };

    case FETCH_CATEGORIES_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case ADD_CATEGORY:
      return { ...state, categories: [...state.categories, action.payload] };

    case REMOVE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.name !== action.payload
        ),
      };

    case ADD_PRODUCT_TO_CATEGORY: {
      const { categoryName, product } = action.payload;
      const updatedCategories = state.categories.map((category) =>
        category.name === categoryName
          ? { ...category, products: [...category.products, product] }
          : category
      );
      return { ...state, categories: updatedCategories };
    }

    case REMOVE_PRODUCT_FROM_CATEGORY: {
      const { categoryName, productId } = action.payload;
      const updatedCategories = state.categories.map((category) =>
        category.name === categoryName
          ? {
              ...category,
              products: category.products.filter(
                (product) => product._id !== productId
              ),
            }
          : category
      );
      return { ...state, categories: updatedCategories };
    }

    default:
      return state;
  }
};
