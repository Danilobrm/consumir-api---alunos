/* eslint-disable react/jsx-no-bind */
import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { FaUserCircle, FaEdit } from 'react-icons/fa';
import { Container } from '../../styles/GlobalStyles';
import { Form, ProfilePicture, Title } from './styled';
import * as actions from '../../store/modules/auth/actions';

import Loading from '../../components/Loading';
import axios from '../../services/axios';
import clearAlunoData from './clearAlunoData';

export default function Aluno() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [email, setEmail] = useState('');
  const [idade, setIdade] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [foto, setFoto] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    if (!id) return;
    async function getData() {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        setFoto(data.Fotos[0]);

        setNome(data.nome);
        setSobrenome(data.sobrenome);
        setEmail(data.email);
        setIdade(data.idade);
        setPeso(data.peso);
        setAltura(data.altura);

        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', []);
        if (status === 400) errors.map((error) => toast.error(error));
        navigate('/');
      }
    }
    getData();
  }, [
    altura.data,
    email.data,
    id,
    idade.data,
    navigate,
    nome.data,
    peso.data,
    sobrenome.data,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (clearAlunoData({ nome, sobrenome, email, idade, peso, altura })) return;
    try {
      if (id) {
        await axios.put(`/alunos/${id}`, {
          nome,
          sobrenome,
          email,
          idade,
          peso,
          altura,
        });
        navigate('/');
        toast.success('Aluno(a) editado(a) com sucesso!');
        return;
      }

      axios.post('/alunos/', {
        nome,
        sobrenome,
        email,
        idade,
        peso,
        altura,
      });
      navigate('/');
      toast.success('Aluno(a) criado(a) com sucesso!');
    } catch (err) {
      const status = get(err, 'response.status', 0);
      const errors = get(err, 'response.data.errors', []);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
        return;
      }
      toast.error('Erro desconhecido.');

      if (status === 401) dispatch(actions.loginFailure());
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <Title>{id ? 'Editar Aluno' : 'Novo aluno'}</Title>

      {id && (
        <ProfilePicture>
          {foto ? (
            <img src={foto.url} alt={nome} />
          ) : (
            <FaUserCircle size={180} />
          )}
          <Link to={`/fotos/${id}`}>
            <FaEdit size={24} />
          </Link>
        </ProfilePicture>
      )}
      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite seu nome"
          />
        </label>
        <label htmlFor="sobrenome">
          Sobrenome:
          <input
            type="text"
            value={sobrenome}
            onChange={(e) => setSobrenome(e.target.value)}
            placeholder="Digite seu sobrenome"
          />
        </label>
        <label htmlFor="email">
          E-mail:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
          />
        </label>
        <label htmlFor="idade">
          Idade:
          <input
            type="idade"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
            placeholder="Digite sua Idade"
          />
        </label>
        <label htmlFor="peso">
          peso:
          <input
            type="peso"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            placeholder="Digite sua Peso"
          />
        </label>
        <label htmlFor="altura">
          Altura:
          <input
            type="altura"
            value={altura}
            onChange={(e) => setAltura(e.target.value)}
            placeholder="Digite sua Altura"
          />
        </label>

        <button type="submit">{id ? 'Salvar' : 'Criar'}</button>
      </Form>
    </Container>
  );
}
