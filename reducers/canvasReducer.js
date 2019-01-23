import { CANVAS } from '../constants';

const initialState = {
  step: 0,
  totalSteps: 5,
  helpMode: false,
  insurgent: {
    character: null,
    clothes: [],
    weapon: {
      model: null,
      extras: []
    }
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CANVAS.STEP_ADVANCED: {
      const step = state.step + 1;
      return {
        ...state,
        step
      };
    }
    case CANVAS.STEP_RETREATED: {
      const step = state.step - 1;
      return {
        ...state,
        step: step < 0 ? 0 : step
      };
    }
    case CANVAS.RESET: {
      return initialState;
    }

    default:
      return state;
  }
};
