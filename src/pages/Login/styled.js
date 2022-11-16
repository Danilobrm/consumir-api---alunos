import styled from 'styled-components';
import * as colors from '../../config/colors';

export const Form = styled.form`
  margin-top: 20px;
  display: flex;
  flex-direction: column;

  input {
    height: 40px;
    font-size: 18px;
    border: 1px solid #ddd;
    padding-left: 10px;
    border-radius: 4px;
    margin-bottom: 20px;

    &:focus {
      transition: 0.3s;
      border: 1px solid ${colors.primaryColor};
    }
  }
`;
