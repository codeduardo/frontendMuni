import './login.scss';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Form from '../../components/Form/Form';

const Login = () => {
  const state = useSelector((state) => state.Auth);
  const { msg, isAuthenticated } = state;

  if (isAuthenticated) {
    return <Navigate replace to="/admin" />;
  }

  return (
    <div className="login-container">
      <h1>
        Municipalidad del Centro Poblado <span>Paratushiali</span>
      </h1>
      {msg && <p className="error">{msg}</p>}
      <div className="form">
        <div className="img"></div>
        <Form />
      </div>
    </div>
  );
};

export default Login;
