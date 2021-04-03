import React from 'react';
import Input from './Input';
import useFormValidation from '../hooks/useFormValidation';

import * as constants from '../utils/constants';

function Form(props) {
  const {
    name,
    isActive,
    inputs,
    submitTitle,
    onSubmit,
    formClass,
    inputClass,
    labelClass,
    submitClass,
    inactiveSubmitClass
  } = props;

  const handleSubmit = (evt) => {
    evt.preventDefault(evt);
    onSubmit(values);
  }

  const {
    values,
    errors,
    isValid,
    handleChange
  } = useFormValidation(inputs, isActive);
  
  console.debug("rendering form");
  console.debug(submitTitle);
  
  return (
    <form
      name = {name}
      className = {`${constants.formClass} ${formClass}`}
      onSubmit = {handleSubmit}
      noValidate
    >
      {inputs.map(
        (input) => (
          <Input 
            key = {input.id}
            id = {input.id}
            name = {input.name}
            type = {input.type}
            placeholder = {input.placeholder}
            minLength = {input.minLength}
            maxLength = {input.maxLength}
            value = {values[input.name] || ''}
            error = {errors[input.name]}
            isInvalid = {errors[input.name] !== undefined && errors[input.name] !== ''}
            onChange = {handleChange}
            inputClass = {inputClass}
            labelClass = {labelClass}
            required
          />
        )
      )}
      <button 
        type = "submit" 
        className = {`button ${constants.submitClass} ${submitClass}${!isValid ? ` ${inactiveSubmitClass}` : ''}`} 
        disabled = {!isValid}
      >
        {submitTitle}
      </button>
    </form>
  );
}

export default Form;