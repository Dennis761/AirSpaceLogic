import { ADD_SLIDE, REMOVE_SLIDE, NEXT_SLIDE, PREV_SLIDE, FETCH_SLIDES_SUCCESS } from '../Constants/slideConstants.ts';

interface Slide {
  desktopImage: string;
  mobileImage: string;
}

interface SlideState {
  slides: Slide[];
  currentIndex: number;
}

const initialState: SlideState = {
  slides: [],
  currentIndex: 0,
};

export const slideReducer = (state = initialState, action: any): SlideState => {
  switch (action.type) {
    case FETCH_SLIDES_SUCCESS:
      return {
        ...state,
        slides: action.payload,
        currentIndex: 0, // Сбрасываем индекс при загрузке новых данных
      };
    case ADD_SLIDE:
      return {
        ...state,
        slides: [...state.slides, action.payload],
      };
    case REMOVE_SLIDE:
      const updatedSlides = state.slides.filter((_, index) => index !== action.payload);
      return {
        ...state,
        slides: updatedSlides,
        currentIndex: state.currentIndex >= updatedSlides.length ? 0 : state.currentIndex,
      };
    case NEXT_SLIDE:
      return {
        ...state,
        currentIndex: (state.currentIndex + 1) % state.slides.length,
      };
    case PREV_SLIDE:
      return {
        ...state,
        currentIndex: state.currentIndex === 0 ? state.slides.length - 1 : state.currentIndex - 1,
      };
    default:
      return state;
  }
};

