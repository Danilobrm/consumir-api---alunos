import { toast } from 'react-toastify';
import { isEmail, isFloat, isInt } from 'validator';

// eslint-disable-next-line consistent-return
export default function clearRegisterData(data) {
  let formErrors = false;
  const { nome, sobrenome, email, idade, peso, altura } = data;

  if (nome.length < 3 || nome.length > 30) {
    formErrors = true;
    toast.error('Nome precisa ter entre 3 e 20 caracteres.');
  }

  if (sobrenome.length < 3 || sobrenome.length > 30) {
    formErrors = true;
    toast.error('Sobrenome precisa ter entre 3 e 20 caracteres.');
  }

  if (!isEmail(email)) {
    formErrors = true;
    toast.error('Email inválido.');
  }

  if (!isInt(String(idade))) {
    formErrors = true;
    toast.error('Idade precisa ser um número inteiro.');
  }

  if (!isFloat(String(peso))) {
    formErrors = true;
    toast.error('Peso precisa ser um número inteiro ou flutuante.');
  }

  if (!isFloat(String(altura))) {
    formErrors = true;
    toast.error('Altura precisa ser um número inteiro ou flutuante.');
  }

  return formErrors;
}
