import { toast } from 'react-toastify';
import { isEmail } from 'validator';

// eslint-disable-next-line consistent-return
export default function clearRegisterData(data) {
  let formErrors = false;
  const { nome, email, password, id } = data;
  if (nome.length < 3 || nome.length > 30) {
    formErrors = true;
    toast.error('Campo nome deve ter entre 3 e 30 caracteres');
  }

  if (!isEmail(email)) {
    formErrors = true;
    toast.error('Email inválido.');
  }

  if ((!id && password.length < 6) || password.length > 50) {
    formErrors = true;
    toast.error('A senha precisa ter entre 6 e 50 caracteres.');
  }
  if (formErrors) return formErrors;
}
