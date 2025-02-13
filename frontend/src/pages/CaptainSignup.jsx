import React, { useState } from 'react'
import { Link } from 'react-router-dom';
const CaptainSignup = () => {
  const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [password, setPassword] = useState('');
    const [lastName, setLastName] = useState('');
    
    const [userData, setUserData] = useState({});
  
    const submitHandler = (e)=>{
      e.preventDefault();
      setUserData({
        fullName:{
          firstName:firstName,
          lastName:lastName
        },
        password: password,
        email: email
      })
      setEmail('');
      setFirstName('');
      setLastName('');
      setPassword('');
    }
  return (
    <div className=' px-5 py-5 h-screen flex flex-col justify-between'>
    <div>
    <img className='w-16 mb-5' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
    <form onSubmit={(e) => {
      submitHandler(e);  
    }}>
      <h3 className=' text-base mb-2 font-semibold'>What's our captain's name</h3>
       <div className=' flex mb-5 gap-4'>
       <input 
       className=' bg-[#eeeeee] w-1/2 rounded px-4 py-2 border  text-base placeholder:text-sm'
       type="text" 
       placeholder='firstname'
       value={firstName}
       onChange={
        (e)=>{
          setFirstName(e.target.value);
        }
       }
       />
       <input 
       className=' bg-[#eeeeee] w-1/2 rounded px-4 py-2 border  text-base placeholder:text-sm'
       type="text" 
       placeholder='last name' 
       value={lastName}
       onChange={(e)=>{
        setLastName(e.target.value);
       }}
       />
       </div>
       
       <h3 className=' text-base mb-2 font-semibold'>What's out captain's email</h3>
       <input 
       required
       className=' bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm'
       type="email" 
       placeholder='email@example.com'
       value={email}
       onChange={(e)=>{
        setEmail(e.target.value);
       }}
       />

       <h3 className='text-base mb-2 font-semibold'>Enter Password</h3>
       <input 
       required 
       className=' bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm'
       type="password" 
       placeholder='password'
       value={password}
       onChange={(e)=>{
        setPassword(e.target.value);
       }}
       />
       <button
       className=' bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2  w-full text-lg placeholder:text-base'
       >Signup</button>

       
    </form>
    <p   className=' text-center'>Already have an account? <Link to='/captain-login' className='text-blue-600 '>Login here</Link></p>
    </div>
    <div>
        <p className=' text-[10px] leading-tight'>
          This site is protected by reCAPTCHA and the <span className='underline'>Google privacy Policy</span>
           and <span className='underline'> Terms of Service apply</span>.
        </p>
    </div>
</div>
  )
}

export default CaptainSignup