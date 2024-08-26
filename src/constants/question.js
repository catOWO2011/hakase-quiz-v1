export const questionConstantsText = Object.freeze({
  FILL_IN_THE_BLANKS: "Fill in the blanks",
  MULTIPLE_CHOICE: "Multiple choice",
  MULTIPLE_RESPONSE: "Multiple response"
});

import FillInTheBlanksIcon from '../assets/icons/fill-in-the-blanks.svg';
import MultipleChoiceIcon from '../assets/icons/multiple-choice.svg';
import MultipleResponseIcon from '../assets/icons/multiple-response.svg';

export const questionIcons = {};
questionIcons[questionConstantsText.FILL_IN_THE_BLANKS] = FillInTheBlanksIcon;
questionIcons[questionConstantsText.MULTIPLE_CHOICE] = MultipleChoiceIcon;
questionIcons[questionConstantsText.MULTIPLE_RESPONSE] = MultipleResponseIcon;

export const questionIconsColor = {};
questionIconsColor[questionConstantsText.FILL_IN_THE_BLANKS] = '#ece3b1';
questionIconsColor[questionConstantsText.MULTIPLE_CHOICE] = '#b4e3ad';
questionIconsColor[questionConstantsText.MULTIPLE_RESPONSE] = '#c9d4ff';