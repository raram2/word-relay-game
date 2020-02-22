// node_modules에서 리액트 module 불러오기 - require 방식
const React = require('react');
const {useState, useRef} = React;

const WordRelayHooks = () => {
  // state for render
  const [word, setWord] = useState('손흥민');
  const [answer, setAnswer] = useState('');
  const [startingLetter, setStartingLetter] = useState('');
  const [alert, setAlert] = useState('');
  const [tries, setTries] = useState(0);
  const [lifeCountMsg, setLifeCountMsg] = useState('');
  const [alreadyWords, setAlreadyWords] = useState({});
  // state not for render
  // const alreadyWords = {};
  // 노드 접근(레퍼런스) 부분
  const inputRef = useRef(null);
  // 이미 존재하는 값인지 확인하는 논리 함수
  const isAlreadyWord = newAnswer => {
    if (newAnswer[0] in alreadyWords) {
      let firstLetterCorrespondingArray = alreadyWords[newAnswer[0]];
      for (let alreadyWord of firstLetterCorrespondingArray) {
        if (alreadyWord === newAnswer) {
          return true;
        }
      }
      return false;
    }
    return false;
  };
  const onChangeInput = e => {
    setAnswer(e.target.value);
  };
  const onSubmitForm = e => {
    e.preventDefault();
    setTries(prev => prev + 1);
    if (
      word[word.length - 1] === answer[0] &&
      answer.length === 3 &&
      isAlreadyWord(answer) === false
    ) {
      // resolve
      if (answer[0] in alreadyWords) {
        alreadyWords[answer[0]].push(answer);
      } else {
        alreadyWords[answer[0]] = [answer];
      }
      setWord(answer);
      setStartingLetter(answer[2]);
      setAlert(`"${answer[2]}"(으)로 시작하는 3자리 단어는?`);
      setTries(0);
      setLifeCountMsg('');
    } else if (isAlreadyWord(answer) === true) {
      // 이미 존재하는 단어일 경우
      setAlert(`"${answer}"은(는) 이미 제시된 단어입니다.`);
      setLifeCountMsg(`다시 시도하세요. (${2 - tries})회 남음`);
    } else {
      // 3자리 단어가 아닐 경우
      setAlert(
        `"${answer}"은(는) "${startingLetter}"(으)로 시작하지 않거나 3자리 단어가 아닙니다.`,
      );
      setLifeCountMsg(`다시 시도하세요. (${2 - tries})회 남음`);
    }
    if (tries > 1) {
      window.alert('벌칙!');
    }
    setAnswer('');
    inputRef.current.focus();
  };
  return (
    <>
      <h1>쿵쿵따 오리지널</h1>
      <div>제시어: {word}</div>
      <form onSubmit={onSubmitForm} autoComplete='off'>
        <input type='text' ref={inputRef} value={answer} onChange={onChangeInput} />
        <button type='submit'>입력</button>
      </form>
      <div>{alert}</div>
      <div>{lifeCountMsg}</div>
    </>
  );
};

// WordRelay 객체 내보내기 (module.exports에 할당)
module.exports = WordRelayHooks;
