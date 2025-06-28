import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 40px;
  min-height: calc(100vh - 140px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FormWrapper = styled.div`
  background-color: #2e343b;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h2`
  color: var(--accent-blue);
  text-align: center;
  margin-bottom: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  label {
    color: var(--theme-text-color);
    font-weight: 700;
  }
`;

function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('ログイン機能は今後実装します！');
  };

  return (
    <PageContainer>
      <FormWrapper>
        <Title>ログイン</Title>
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <label htmlFor="email">メールアドレス</label>
            <input type="email" id="email" placeholder="your@example.com" required />
          </InputGroup>
          <InputGroup>
            <label htmlFor="password">パスワード</label>
            <input type="password" id="password" placeholder="********" required />
          </InputGroup>
          <button type="submit" style={{ marginTop: '20px' }}>ログイン</button>
        </form>
      </FormWrapper>
    </PageContainer>
  );
}

export default Login;