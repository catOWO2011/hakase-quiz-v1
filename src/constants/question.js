export const questionConstantsText = Object.freeze({
  CREATE_NEW_QUIZ: 'Create a new quiz',
  FILL_IN_THE_BLANKS: "Fill in the blanks",
  MULTIPLE_CHOICE: "Multiple choice",
  MULTIPLE_RESPONSE: "Multiple response"
});

import CreateQuizIcon from '../assets/icons/quiz.svg';
import FillInTheBlanksIcon from '../assets/icons/fill-in-the-blanks.svg';
import MultipleChoiceIcon from '../assets/icons/multiple-choice.svg';
import MultipleResponseIcon from '../assets/icons/multiple-response.svg';

export const questionIcons = {};
questionIcons[questionConstantsText.FILL_IN_THE_BLANKS] = FillInTheBlanksIcon;
questionIcons[questionConstantsText.MULTIPLE_CHOICE] = MultipleChoiceIcon;
questionIcons[questionConstantsText.MULTIPLE_RESPONSE] = MultipleResponseIcon;
questionIcons[questionConstantsText.CREATE_NEW_QUIZ] = CreateQuizIcon;