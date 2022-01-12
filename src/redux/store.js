import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { loginReducer } from './reducers/loginReducers';
import { mesaPartesReducer } from './reducers/mesaPartesReducers';
import { tiposDocumentosReducer } from './reducers/tiposDocumentosReducer';
import { documentoReducer } from './reducers/documentosReducer';
import { eventosReducer } from './reducers/eventosReducers';
import { redAdministrativaReducer } from './reducers/redAdministrativaReducer';
import { turismoReducer } from './reducers/turismoReducers';

const reducer = combineReducers({
  //  TODO: reducers go here
  Auth: loginReducer,
  Tramite: mesaPartesReducer,
  TipoDocumento: tiposDocumentosReducer,
  Documento: documentoReducer,
  Eventos: eventosReducer,
  RedAdministrativa: redAdministrativaReducer,
  Turismo: turismoReducer,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
