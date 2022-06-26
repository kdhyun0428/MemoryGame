import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from './components/SingleCard';

const cardImages = [
  {"src": "/img/helmet-1.png"},
  {"src": "/img/potion-1.png"},
  {"src": "/img/ring-1.png"},
  {"src": "/img/scroll-1.png"},
  {"src": "/img/shield-1.png"},
  {"src": "/img/sword-1.png"}
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)

  //카드 섞기
  const shuffleCards = () => {
    const shuffleCards = [...cardImages,...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random()}))

      setCards(shuffleCards)
      setTurns(0)
  }

  //카드 선택
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  //두 카드를 비교
  useEffect(() => {
    if (choiceOne && choiceTwo){

      if(choiceOne.src === choiceTwo.src){
        console.log("일치합니다")
        resetTurn()
      } else{
        console.log("불일치합니다")
        resetTurn()
      }
    }
  }, [choiceOne, choiceTwo])

  //선택 초기화 & 턴 증가
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
  }

  return (
    <div className="App">
      <h1>카드 맞추기</h1>
      <button onClick={shuffleCards}>New</button>

      <div className="card-grid">
        {cards.map(card => (
          <SingleCard 
            key={card.id} 
            card={card}
            handleChoice={handleChoice}  
          />
        ))}
      </div>
    </div>
  );
}

export default App;
