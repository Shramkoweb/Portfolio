import { useReducer } from 'react';

import { Feedback } from '@/lib/types';

interface FeedbackState {
  feedback: Feedback;
}

const initialState = { feedback: Feedback.blank };

function reducer(
  state: FeedbackState,
  action: { type: Feedback },
): FeedbackState {
  switch (action.type) {
    case Feedback.helpful:
      return { feedback: Feedback.helpful };
    case Feedback.worthless:
      return { feedback: Feedback.worthless };
    default:
      return { feedback: Feedback.blank };
  }
}

const ActionCreator = {
  setFeedback: (feedback: Feedback) => ({
    type: feedback,
  }),
};

export const useFeedbackReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    state,
    actions: {
      worthless: () => dispatch(ActionCreator.setFeedback(Feedback.worthless)),
      helpful: () => dispatch(ActionCreator.setFeedback(Feedback.helpful)),
    },
  };
};
