import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [characterAllowed, setCharacterAllowed] = useState(false);
  const [Password, setPassword] = useState("");

  //useRef hook
  const passwordRef = useRef(null);

  const passwordgenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (characterAllowed) str += "!@#$%^&*-_+={}[]~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);

      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, characterAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,999);
    window.navigator.clipboard.writeText(Password);
  }, [Password]);

  // useEffect(() => {
  //   passwordgenerator();
  // }, [length, numberAllowed, characterAllowed, passwordgenerator]);

  return (
    <>
      <div className="min-h-screen bg-[#17181d] flex justify-center items-start pt-12">
        <div className="w-157.5 bg-[#39465b] rounded-xl p-6">
          <h1 className="text-white text-3xl font-bold text-center mb-4">
            Password Generator
          </h1>

          <div className="flex bg-[#344055] rounded-xl overflow-hidden shadow-inner placeholder : text-white">
            <input
              type="text"
              value={Password}
              className="outline-none w-full py-1 px-3"
              placeholder="Password"
              readOnly
              ref={passwordRef}
            />
            <button
              onClick={copyPasswordToClipboard}
              className="outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0 cursor-pointer"
            >
              Copy
            </button>
          </div>
          <br />
          <div className="flex text-sm gap-x-5">
            <div className="flex items-center gap-x-1 text-[#b45309]">
              <input
                type="range"
                min={8}
                max={100}
                value={length}
                className="cursor-pointer"
                onChange={(e) => {
                  setLength(e.target.value);
                }}
              />
              <label>Length:{length}</label>
            </div>
            <div className="flex items-center gap-x-1 text-[#b45309]">
              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                id="numberInput"
                onChange={() => {
                  setNumberAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="numberInput">Numbers</label>
            </div>
            <div className="flex  items-center gap-x-1 text-[#b45309]">
              <input
                type="checkbox"
                defaultChecked={characterAllowed}
                id="characterInput"
                onChange={() => {
                  setCharacterAllowed((prev) => !prev);
                }}
              />
              <label htmlFor="characterInput ">Characters</label>
              <button 
              onClick={() => passwordgenerator()}
              className="outline-none bg-purple-600 text-black px-3 py-0.5 shrink-0 cursor-pointer rounded-2xl gap-x-3">
              Click Here
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
