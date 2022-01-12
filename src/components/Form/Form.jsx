import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/actions/loginActions';

const Form = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();

  const { email, password } = user;

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    if (email === '' || password === '') {
      dispatch(login(null, 'Todos los campos son obligatorios'));
      return;
    }
    dispatch(login(user));
  };
  return (
    <form onSubmit={submit}>
      <label htmlFor="">Correo : </label>
      <input
        type="email"
        placeholder="Ej. corre@correo.com"
        name="email"
        onChange={handleChange}
        value={email}
        autoComplete="off"
      />
      <label htmlFor="">Password : </label>
      <input
        type="password"
        placeholder="Ej. *******"
        name="password"
        onChange={handleChange}
        value={password}
        autoComplete="off"
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default Form;
