import {
  FETCH_CATALOGS,
  FETCH_CATALOGS_REQUEST,
  FETCH_CATALOGS_FAILURE,
  FETCH_SUBCATALOGS,
  FETCH_SUBCATALOGS_REQUEST,
  FETCH_SUBCATALOGS_FAILURE,
  ADD_CATALOG,
  ADD_SUBCATALOG,
  DELETE_CATALOG,
  DELETE_SUBCATALOG,
} from '../Constants/catalogConstants.ts';

interface CatalogState {
  catalogs: Array<{
    _id: string;
    name: string;
    subCatalogs: Array<{ _id: string; name: string }>;
  }>;
  loading: boolean;
  error: string | null;
}

const initialState: CatalogState = {
  catalogs: [],
  loading: false,
  error: null,
};

export const catalogReducer = (state = initialState, action: any): CatalogState => {
  switch (action.type) {
    case FETCH_CATALOGS_REQUEST:
    case FETCH_SUBCATALOGS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FETCH_CATALOGS:
      return {
        ...state,
        catalogs: action.payload.catalogs,
        loading: false,
      };
    case FETCH_SUBCATALOGS: {
      const { catalogName, subCatalogs } = action.payload;
      return {
        ...state,
        catalogs: state.catalogs.map((catalog) =>
          catalog.name === catalogName
            ? { ...catalog, subCatalogs }
            : catalog
        ),
        loading: false,
      };
    }
    case FETCH_CATALOGS_FAILURE:
    case FETCH_SUBCATALOGS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case ADD_CATALOG:
      return {
        ...state,
        catalogs: [...state.catalogs,  action.payload.catalog ],
      };
    case ADD_SUBCATALOG:
      return {
        ...state,
        catalogs: state.catalogs.map((catalog) =>
          catalog.name === action.payload.catalogKey
            ? {
                ...catalog,
                subCatalogs: [
                  ...catalog.subCatalogs,
                  action.payload.subcatalogs
                ],
              }
            : catalog
        ),
      };
    case DELETE_CATALOG:
      return {
        ...state,
        catalogs: state.catalogs.filter(
          (catalog) => catalog.name !== action.payload
        ), 
      };
    case DELETE_SUBCATALOG:
      return {
        ...state,
        catalogs: state.catalogs.map((catalog) =>
          catalog.name === action.payload.catalogKey
            ? {
                ...catalog,
                subCatalogs: catalog.subCatalogs.filter(
                  (subCatalog) => subCatalog.name !== action.payload.subcatalogKey
                ),
              }
            : catalog
        ),
      };
    default:
      return state;
  }
};
