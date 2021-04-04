import React from 'react';
import Form from '../Form';
import { authFormClass, authInputClass, authLabelClass, authSubmitClass, inactiveSubmitClass } from '../../utils/constants';
import { useLocation, Link } from 'react-router-dom';

function Auth(props) {
  const { handleSubmit, name, title, submitTitle } = props;
  const inputs = React.useMemo(() => [
    {
      id: 'email',
      name: 'email',
      type: 'email',
      placeholder: 'Email',
      required: true,
    },
    {
      id: 'password',
      name: 'password',
      type: 'password',
      placeholder: 'Пароль',
      minLength: 6,
      required: true,
    }
  ], []);

  const location = useLocation();

  return (
    <section className="auth page__section page__section_indent-size_s">
      <h2 className="auth__title">{title}</h2>
      <Form
        name = {name}
        submitTitle = {submitTitle}
        inputs = {inputs}
        onSubmit = {handleSubmit}
        formClass = {authFormClass}
        submitClass = {authSubmitClass}
        inputClass = {authInputClass}
        labelClass = {authLabelClass}
        inactiveSubmitClass = {inactiveSubmitClass}
      />
      {location.pathname === '/signup' && <Link to ="/signin" className="auth__link">Уже зарегестрированы? Войти</Link>}
    </section>
  );
}

export default Auth;