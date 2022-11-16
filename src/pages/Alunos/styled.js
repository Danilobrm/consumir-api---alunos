import styled from 'styled-components';

export const AlunoContainer = styled.div`
  margin-top: 20px;

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 5px 0;
  }

  div + div {
    border-top: 1px solid #eee;
  }

  .editDelete {
    width: 50px;
    display: flex;
    justify-content: space-between;
  }

  .nameEmail {
    justify-content: space-between;
    width: 70%;
  }

  .email {
    width: fit-content;
    overflow-x: hidden;
    text-overflow: ellipsis;
    text-align: left;
  }
`;
export const ProfilePicture = styled.div`
  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  align-items: center;
`;

export const NovoAluno = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  width: 110px;
`;
