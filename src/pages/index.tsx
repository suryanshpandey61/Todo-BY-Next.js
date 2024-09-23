// pages/index.tsx
import Link from 'next/link';
import '../app/globals.css';

const Home = () => (
  <div className='home-div h-[100vh] flex flex-col mx-auto text-center p-8'>
    <h1 className='text-4xl font-bold'>Welcome to My To-Do App</h1>
  <div>
  <button className='border border-black p-4 mt-5 font-bold text-white text-[20px] rounded-md shadow-xl hover:bg-green-600 transition-all duration-500'>
    <Link href="/todos">Go to To-Do List</Link>
  </button></div> 
 </div>
);

export default Home;
