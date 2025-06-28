import React from 'react';
import styled from 'styled-components';

const PageContainer = styled.div`
  padding: 40px;
  min-height: calc(100vh - 140px); /* ヘッダーとフッターの高さを考慮 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: var(--accent-green);
  margin-bottom: 20px;
  font-size: 3em;
`;

const Subtitle = styled.p`
  color: var(--theme-text-color);
  font-size: 1.2em;
  margin-bottom: 40px;
  text-align: center;
`;

const Section = styled.section`
  width: 100%;
  max-width: 1200px;
  margin-bottom: 60px;
  background-color: #262a2f;
  padding: 30px;
  border-radius: 10px;
`;

const SectionTitle = styled.h2`
  color: var(--accent-blue);
  margin-bottom: 20px;
  text-align: center;
`;

const GameGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 30px;
`;

const GameCard = styled.div`
  background-color: #3e444c;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;
  &:hover {
    transform: translateY(-5px);
  }

  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }

  .info {
    padding: 15px;
    h3 {
      color: var(--theme-text-color);
      margin-bottom: 5px;
    }
    p {
      color: var(--disable-gray);
      font-size: 0.9em;
    }
  }
`;

function Home() {
  // 仮のゲームデータ
  const games = [
    { id: 1, title: 'ファンタジーRPG', genre: 'RPG', imageUrl: 'https://via.placeholder.com/250x150/ff8c94/fdfcfd?text=Game+A' },
    { id: 2, title: '宇宙シューター', genre: 'シューティング', imageUrl: 'https://via.placeholder.com/250x150/3498bd/fdfcfd?text=Game+B' },
    { id: 3, title: '戦略シミュレーション', genre: 'シミュレーション', imageUrl: 'https://via.placeholder.com/250x150/2ecc71/fdfcfd?text=Game+C' },
    { id: 4, title: 'パズルアドベンチャー', genre: 'パズル', imageUrl: 'https://via.placeholder.com/250x150/f1c40f/fdfcfd?text=Game+D' },
  ];

  return (
    <PageContainer>
      <Title>ゲームの世界へようこそ</Title>
      <Subtitle>最新のゲーム、人気のタイトル、そして隠れた名作を発見しよう。</Subtitle>

      <Section>
        <SectionTitle>新着ゲーム</SectionTitle>
        <GameGrid>
          {games.map(game => (
            <GameCard key={game.id}>
              <img src={game.imageUrl} alt={game.title} />
              <div className="info">
                <h3>{game.title}</h3>
                <p>{game.genre}</p>
              </div>
            </GameCard>
          ))}
        </GameGrid>
      </Section>

      <Section>
        <SectionTitle>ピックアップ</SectionTitle>
        <GameGrid>
          {games.slice().reverse().map(game => ( // 例として逆順に表示
            <GameCard key={game.id}>
              <img src={game.imageUrl} alt={game.title} />
              <div className="info">
                <h3>{game.title}</h3>
                <p>{game.genre}</p>
              </div>
            </GameCard>
          ))}
        </GameGrid>
      </Section>
    </PageContainer>
  );
}

export default Home;