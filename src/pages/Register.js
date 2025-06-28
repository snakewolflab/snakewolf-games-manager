// src/pages/Register.js (または他のページ)
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

const Title = styled.h1`
  color: var(--accent-blue);
  margin-bottom: 20px;
`;

function Register() {
  return (
    <PageContainer>
      <Title>新規登録</Title>
      <p>新規登録フォームがここに表示されます。</p>
      {/* Firebase Authの登録フォームを実装 */}
    </PageContainer>
  );
}

export default Register;