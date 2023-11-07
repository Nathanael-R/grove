import { useMemo, useState } from "react";
import { Words } from "../utils/Data";
import { useEffect } from "react";
const Button = () => {
  const [word, setWord] = useState("");
  const [score, setScore] = useState(0)
  const [wordsArr, setWordsArr] = useState([])
 
    useEffect(() => {
        setWordsArr(Words)
    }, [])

  const wordCheck = () => {
    const check = wordsArr.find(text => text.item === word)
    if(check) {
        let newArr = wordsArr.filter(word => word.id !== check.id)
        setWordsArr(newArr)
        setScore(score + 1)

    } else {
        alert("Good try but incorrect")
    }
  }
  const submitForm = (e) => {
    e.preventDefault()
    setWord("")
    // const formData = new FormData(e.target)
    // const answer = formData.get("answer")
    // alert(`You submitted ${answer}`)
  }
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
  const newArr = useMemo(() =>shuffleArray(wordsArr) , [wordsArr]);
  function scrambled(word) {
    const strArr = word.split("");
    for (let i = strArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [strArr[i], strArr[j]] = [strArr[j], strArr[i]];
    }
    return strArr.join("");
  }
  const scrambledWord = useMemo(() => scrambled, [])
  //const mm
  return (
    <div className="p-4 flex flex-col gap-4">
    <p>{score}</p>
      <div className="bg-slate-400 h-44 rounded-xl p-4 flex gap-2 flex-wrap">
        {newArr.map((word, idx) => (
          <button
            key={idx}
            className="bg-white w-fit p-2 font-bold rounded-xl h-fit"
          >
            {scrambledWord(word.item)}
          </button>
        ))}
      </div>
      <form className="flex flex-col gap-2" onSubmit={submitForm}>
        <input
          value={word}
          onChange={(event) => setWord(event.target.value)}
          className="border-2 rounded-xl px-4 h-12"
          placeholder="You're On"
          type="text"
          name="answer"
        />
        {wordsArr.length ? 
        (<button
          type="submit"
          onClick={wordCheck}
          className="w-fit self-center py-4 px-8 font-bold rounded-xl bg-red-400 text-white"
        >
          Submit
        </button>) : (
            <button onClick={() => setWordsArr(Words)}>
                Reset
            </button>
        )}
      </form>
    </div>
  );
};

export default Button;