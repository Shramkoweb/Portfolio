import { useReducer } from 'react';

import { Feedback } from '@/lib/types';

interface FeedbackState {
  feedback: Feedback;
}

interface FeedbackAction {
  type: 'SET_FEEDBACK';
  payload: Feedback;
}

interface FeedbackActionCreators {
  setFeedback: (payload: Feedback) => FeedbackAction;
}

const initialState = { feedback: Feedback.Blank };

function reducer(state: FeedbackState, action: FeedbackAction): FeedbackState {
  switch (action.type) {
    case 'SET_FEEDBACK':
      return { feedback: action.payload };
    default:
      return state;
  }
}

const ActionCreator: FeedbackActionCreators = {
  setFeedback: (payload: Feedback) => ({
    type: 'SET_FEEDBACK',
    payload,
  }),
};

export const useFeedbackReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    state,
    actions: {
      worthless: () => dispatch(ActionCreator.setFeedback(Feedback.Worthless)),
      helpful: () => dispatch(ActionCreator.setFeedback(Feedback.Helpful)),
    },
  };
};
