import mainInnerHtml from './templates/main-inner-html';

const renderDisableSubmit = (element) => {
  const { input, submitButton } = element;
  input.readOnly = true;
  submitButton.disabled = true;
};

const renderEnableSubmit = (element) => {
  const { input, submitButton } = element;
  input.readOnly = false;
  submitButton.disabled = false;
};

export const renderSubmit = (formState, element) => {
  switch (formState) {
    case 'loading':
      renderDisableSubmit(element);
      break;
    default:
      renderEnableSubmit(element);
      break;
  }
};

export const renderFeedback = (message, element) => {
  const { feedback } = element;
  if (!message) {
    feedback.classList.add('d-none');
    feedback.textContent = '';
    return;
  }
  feedback.classList.remove('d-none');
  feedback.textContent = message;
};

export default (element) => {
  const main = document.createElement('main');
  main.classList.add('flex-grow-1');
  main.innerHTML = mainInnerHtml;
  element.parentNode.replaceChild(main, element);
};
