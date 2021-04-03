import React from 'react';
import useFormDefaultValues from './useFormDefaultValues';
import { formSelector } from '../utils/constants';

export default function useFormValidation(inputs = [], resetTrigger = undefined) {
  const [values, setValues] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [isValid, setIsValid] = React.useState(false);
  const defaults = useFormDefaultValues(inputs);

  const handleChange = (evt) => {
    const name = evt.target.name;
    const value = evt.target.value;
    
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: evt.target.validationMessage });
    setIsValid(evt
      .target
      .closest(formSelector)
      .checkValidity());    
  }

  const handeResetValidation = React.useCallback(
    (values = {}, errors = {}, isValid = false) => {
      setValues(values);
      setErrors(errors);
      setIsValid(isValid);
    },
    [setValues, setErrors, setIsValid]);

  React.useEffect(
    () => {
      console.debug('Reset validation');
      const isValid = Object.keys(defaults).length > 0 || inputs.length === 0;
      handeResetValidation(defaults, {}, isValid, inputs);
    },
    [defaults, inputs, handeResetValidation, resetTrigger]
  );

  return {
    defaults,
    values,
    errors,
    isValid,
    handleChange,
    handeResetValidation,
  }
}