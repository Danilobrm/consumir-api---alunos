import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import * as actions from './actions';
import * as types from '../types';
import axios from '../../../services/axios';

function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, '/tokens', payload);
    const { prevPath, navigate } = payload;
    yield put(actions.loginSucess({ ...response.data, prevPath }));
    toast.success('Login efetuado com sucesso.');
    axios.defaults.headers.authorization = `Bearer ${response.data.token}`;
    navigate(payload.prevPath);
  } catch (error) {
    toast.error('Usuário ou senha inválidos.');
    yield put(actions.loginFailure());
  }
}

function persistRehydrate({ payload }) {
  const token = get(payload, 'auth.token', '');
  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

function* registerRequest({ payload }) {
  const { nome, email, password, id, navigate } = payload;

  try {
    if (id) {
      yield call(axios.put, '/users/:id', {
        email,
        nome,
        password: password || undefined,
      });
      toast.success('conta alterada com sucesso.');
      yield put(actions.registerUpdatedSuccess({ nome, email, password }));
      return;
    }

    yield call(axios.post, '/users', {
      email,
      nome,
      password,
    });
    toast.success('conta criada com sucesso.');
    yield put(actions.registerCreatedSuccess({ nome, email, password }));
    navigate('/login');
  } catch (e) {
    const errors = get(e, 'response.data.errors', []);
    const status = get(e, 'response.status', 0);

    if (status === 401) {
      toast.error('Você precisa fazer login novamente.');
      yield put(actions.loginFailure());
      navigate('/login');
      return;
    }
    if (errors.length > 0) {
      errors.map((error) => toast.error(error));
      yield put(actions.registerFailure());
      return;
    }
    toast.error('Erro desconhecido.', e);

    yield put(actions.registerFailure());
  }
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
]);
