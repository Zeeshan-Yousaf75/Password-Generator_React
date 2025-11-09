import { useState, useCallback , useEffect, useRef } from 'react'
import './App.css'

function App() {
const [length, setLength] = useState(8)
const [numberAllowed, setNumberAllowed] = useState
(false);
const [characterAllowed, setCharacterAllowed] = useState
(false);
const [Password, setPassword] = useState('');

//useRef hook
const passwordRef = useRef(null);
const buttonRef = useRef(null);

const handleMouseDown = () => {
    buttonRef.current.classList.add( "bg-gray-400");
  };

  const handleMouseUp = () => {
    buttonRef.current.classList.remove( "bg-gray-400");
  };

const passordGenerator = useCallback(() => {

  let pass = '';
  let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

  if (numberAllowed) str += '0123456789';
  
  if (characterAllowed) str += '!@#$%^&*()_+~`|}{[]:;?><,./-=';

  for (let i = 1; i <= length; i++) {
    let char = Math.floor(Math.random() * str.length 
    + 1);

    pass += str.charAt(char);

  }
  setPassword(pass);
  
}, [length,numberAllowed, characterAllowed,setPassword])

const copyPasswordToClipboard = useCallback(() => {
  passwordRef.current?.select();
  
 // passwordRef.current?.setSelectionRange(0, 3); // For mobile devices

  window.navigator.clipboard.writeText(Password);
},
 [Password]);

useEffect(() =>{
  passordGenerator();
} ,[length,numberAllowed,characterAllowed,
  passordGenerator]);


return (
    <>
      <div className='w-full , max-w-md mx-auto shadow-md
      rounded-lg px-4 py-3 my-8  bg-gray-700 text-orange-500'> 
      
      <h1 className='text-white text-center my-3 text-2xl '>Password Generator</h1>

      <div className='flex shadow 
      rounded-lg overflow-hidden mb-4 bg-white'>

        <input 
        type="text" 
        value={Password}
        className='outline-none w-full py-1 px-3'
        placeholder='Password'
        readOnly
        ref={passwordRef}
        />

        <button 
        onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 text-white
        px-3 py-0.5 shrink-0'
      ref={buttonRef}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
        >Copy</button>
      </div>

      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input 
          type="range" 
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox" 
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={() => {
             setNumberAllowed((prev) => !prev)}}
          />
          <label htmlFor="numberInput">Numbers</label>    
          </div>

          <div className='flex items-center gap-x-1'>
          <input 
          type="checkbox" 
          defaultChecked={characterAllowed}
          id="characterInput"
          onChange={() => {
             setCharacterAllowed((prev) => !prev)}}
          />
          <label htmlFor="numberInput">Character</label>    
          </div>
      </div>

      </div>
    </>
  )
}

export default App
