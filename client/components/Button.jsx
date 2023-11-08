/* eslint-disable react/prop-types */
import { useMemo, useState } from "react";
import { Words } from "../utils/Data";
import { useEffect } from "react";
import Countdown from "react-countdown";
import { GrPowerReset, GrSend } from "react-icons/gr";
const Button = () => {
  const [word, setWord] = useState("");
  const [score, setScore] = useState(0);
  const [wordsArr, setWordsArr] = useState([]);
  const [resetTimer, setResetTimer] = useState(false);
  useEffect(() => {
    setWordsArr(Words);
  }, []);

  const wordCheck = () => {
    const check = wordsArr.find((text) => text.item === word);
    if (check) {
      let newArr = wordsArr.filter((word) => word.id !== check.id);
      setWordsArr(newArr);
      setScore(score + 1);
    } else {
      alert("Good try but incorrect");
    }
  };
  const submitForm = (e) => {
    e.preventDefault();
    setWord("");
    // const formData = new FormData(e.target)
    // const answer = formData.get("answer")
    // alert(`You submitted ${answer}`)
  };
  function shuffleArray(array) {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ];
    }
    return shuffledArray;
  }
  const newArr = useMemo(() => shuffleArray(wordsArr), [wordsArr]);
  function scrambled(word) {
    const strArr = word.split("");
    for (let i = strArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [strArr[i], strArr[j]] = [strArr[j], strArr[i]];
    }
    return strArr.join("");
  }
  const scrambledWord = useMemo(() => scrambled, []);
  const resetWords = (e) => {
    e.preventDefault();
    setWordsArr(Words);
    setResetTimer(!resetTimer)
  };
  const Timer = ({ minutes, seconds, completed }) => {
    if (completed) {
      console.log("Done");
    } else {
      return (
        <span>
          {minutes}:{seconds}
        </span>
      );
    }
  };

  const memoTimer = useMemo(
    () => <Countdown date={Date.now() + 300000} renderer={Timer} />,
    [resetTimer]
  );
  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="border-2 border-slate-300 h-44 rounded-xl p-4 flex gap-2 flex-wrap">
        {wordsArr.length ? (
          newArr.map((word, idx) => (
            <p
              key={idx}
              className="bg-white border-2 w-fit p-2 font-bold rounded-xl h-fit"
            >
              {scrambledWord(word.item)}
            </p>
          ))
        ) : (
          <div>
            <p>You finished it in time</p>
          </div>
        )}
      </div>
      <form className="flex flex-col gap-2" onSubmit={submitForm}>
        <div className="relative">
          <input
            value={word}
            onChange={(event) => setWord(event.target.value)}
            className="border-2 rounded-xl px-4 h-12 w-full"
            placeholder="You're On"
            type="text"
            name="answer"
          />
          <div className="absolute right-5 top-3 text-red-600">
            {wordsArr.length && memoTimer}
          </div>
        </div>
        {wordsArr.length ? (
          <button
            type="submit"
            onClick={wordCheck}
            className="w-fit self-center py-3 px-6 rounded-xl bg-red-400 text-white text-lg font-semibold flex items-center gap-2"
          >
            Submit
            <GrSend size={20} />
          </button>
        ) : (
          <button
            className="rounded-xl self-center border-2 w-fit px-6 py-3 flex items-center gap-2 text-lg font-semibold"
            onClick={resetWords}
          >
            Play again
            <GrPowerReset size={20}/>
          </button>
        )}
      </form>
    </div>
  );
};

export default Button;
