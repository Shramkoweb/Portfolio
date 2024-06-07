import { useReducer } from 'react';

import { Feedback } from '@/lib/types';

interface FeedbackState {
  feedback: Feedback;
}

const initialState = { feedback: Feedback.Blank };

function reducer(
  state: FeedbackState,
  action: { type: Feedback },
): FeedbackState {
  switch (action.type) {
    case Feedback.Helpful:
      return { feedback: Feedback.Helpful };
    case Feedback.Worthless:
      return { feedback: Feedback.Worthless };
    default:
      return { feedback: Feedback.Blank };
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
      worthless: () => dispatch(ActionCreator.setFeedback(Feedback.Worthless)),
      helpful: () => dispatch(ActionCreator.setFeedback(Feedback.Helpful)),
    },
  };
};
