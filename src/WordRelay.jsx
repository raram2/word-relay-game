import React, {PureComponent, createRef} from 'react';

export default class WordRelay extends PureComponent {
  state = {
    word: '손흥민',
    answer: '',
    alert: '',
    alreadyWords: {},
  };
  inputRef = createRef(null);
  isNotAlreadyWord = newAnswer => {
    if (newAnswer[0] in this.state.alreadyWords) {
      let correspondingWordList = this.state.alreadyWords[newAnswer[0]];
      for (let word of correspondingWordList) {
        if (word === newAnswer) {
          return false;
        }
      }
      return true;
    }
    return true;
  };
  onSubmitForm = e => {
    e.preventDefault();
    if (
      this.state.word[this.state.word.length - 1] === this.state.answer[0] &&
      this.state.answer.length === 3 &&
      this.isNotAlreadyWord(this.state.answer)
    ) {
      // 성공
      if (this.state.answer[0] in this.state.alreadyWords) {
        this.state.alreadyWords[this.state.answer[0]].push(this.state.answer);
      } else {
        this.state.alreadyWords[this.state.answer[0]] = [];
        this.state.alreadyWords[this.state.answer[0]].push(this.state.answer);
      }
      this.setState({
        word: this.state.answer,
        alert: `"${this.state.answer[2]}"(으)로 시작하는 3자리 단어는?`,
        answer: '',
      });
    } else {
      // 실패
      this.setState({
        alert: '다시 시도하세요.',
        answer: '',
      });
    }
    this.inputRef.current.focus();
  };
  onChangeInput = e => {
    this.setState({answer: e.target.value});
  };
  render() {
    return (
      <>
        <h1>끝말잇기 게임</h1>
        <div>단어: {this.state.word}</div>
        <form onSubmit={this.onSubmitForm} autoComplete='off'>
          <input
            type='text'
            ref={this.inputRef}
            value={this.state.answer}
            onChange={this.onChangeInput}
          />
          <button type='submit'>입력</button>
        </form>
        <div>{this.state.alert}</div>
      </>
    );
  }
}
