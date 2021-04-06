export const formSelector = '.form';

export const authFormClass = 'auth__form';
export const authInputClass = 'auth__input';
export const authLabelClass = 'auth__field';
export const authSubmitClass = 'auth__submit';
export const popupFormClass = 'form-view__form';
export const popupInputClass = 'form-view__input';
export const popupLabelClass = 'form-view__field';
export const popupSubmitClass = 'form-view__submit';
export const formClass = 'form';
export const inputClass = 'input';
export const inputErrorClass = 'input_type_error';
export const labelClass = 'field';
export const submitClass = 'submit';
export const inactiveSubmitClass = 'submit_disabled';
export const errorClass = 'error';
export const errorActiveClass = 'error_visible';

export const submitProcessDefaultText = 'Сохранение...';
export const submitProcessRemoveText = 'Удаление...';

export const authSuccessTitle = 'Вы успешно зарегистрировались';
export const authFailTitle = 'Что-то пошло не так! Попробуйте ещё раз.';

export const baseUri = `${window.location.protocol}//${process.env.NODE_ENV  === 'production' 
  ? process.env.REACT_APP_API_URL 
  : `${window.location.hostname}:${process.env.REACT_APP_API_PORT || 3001}`}`;
export const headers = {
  'Content-Type': 'application/json; charset=utf-8'
}