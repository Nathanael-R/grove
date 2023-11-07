import { useState } from "react";
import { Words } from "../utils/Data";
const Button = () => {
  const [word, setWord] = useState("");
  const [words, setWords] = useState([])
  const submitWord = (e) => {
    e.preventDefault();
  };
  function scrambled(word) {
    const strArr = word.split("");
    for (let i = strArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [strArr[i], strArr[j]] = [strArr[j], strArr[i]];
    }
    return strArr.join("");
  }
  return (
    <div className="p-4 flex flex-col gap-4">
      <div className="bg-slate-400 h-44 rounded-xl p-4 flex gap-2 flex-wrap">
        {Words.map((word) => (
          <p key={word.id} className="bg-white w-fit p-2 font-bold rounded-xl h-fit">{scrambled(word.item)}</p>
        ))}
      </div>
      <form className="flex flex-col gap-2">
        <input
          value={word}
          onChange={(event) => setWord(event.target.value)}
          className="border-2 rounded-xl px-4 h-12"
          placeholder="You're On"
          type="text"
          name="word"
        />
        <button
          onClick={submitWord}
          className="w-fit self-center py-4 px-8 font-bold rounded-xl bg-red-400 text-white"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Button;
