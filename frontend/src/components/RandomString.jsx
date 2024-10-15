import React from 'react'
import { useState , useCallback , useEffect , useRef} from 'react'

function RandomString() {

    const [length,setLength] = useState(8)
  const [numberAllowed,setNumberAllowed] = useState(false)
  const [charAllowed , setCharAllowed] = useState(false)
  const [password , setPassword] = useState("")

  // password referenceHook
  const passwordRef = useRef(null)


  // password generator method
  // new hook
  const passwordgenerator = useCallback(()=>{
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if(numberAllowed) str += "0123456789"
    if(numberAllowed) str += "`~!@#$%^&*()_+-=[]{}"

    for (let i = 1; i <= length; i++){
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
     
    }
    // use with hook
    setPassword(pass)

  },[length,numberAllowed,charAllowed,setPassword])



  // hook for text selection in textinputfield
  const copyPasswordToClipboard = useCallback(()=>{
    passwordRef.current?.select()

    // optional for selection particular range
    // passwordRef.current?.setSelectionRange(0,9)


    window.navigator.clipboard.writeText(password)
  },[password])

  useEffect(()=>{
    passwordgenerator()
  },[length,numberAllowed,charAllowed,passwordgenerator])
  return (
    <>
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8  text-orange-500 bg-gray-700'>
        <h1 className='text-white text-center my-3'>Token Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4 '>
          <input 
            type="text"
            value={password} 
            className='outline-none w-full py-1 px-3'
            placeholder='Password' 
            readOnly
            ref={passwordRef}
            />

            <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0 hover:bg-blue-900 duration-200'>copy</button>
        </div>

        <div className='flex text-sm gap-x-6'>
          <div className='flex items-center gap-x-1'>
            <input type="range"
              min={6}
              max={20}
              value={length}
              className='cursor-pointer'
              onChange={(e)=>{setLength(e.target.value)}}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
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
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                  setCharAllowed((prev) => !prev )
              }}
            />
            <label className='' htmlFor="characterInput">Characters</label>
          </div>
        </div>
        </div>

        

     
    </>
  )
}

export default RandomString