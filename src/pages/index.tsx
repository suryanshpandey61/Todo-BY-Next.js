// pages/index.tsx
import Link from 'next/link';

const Home = () => (
  <div className='home-div'>
    <h1>Welcome to My To-Do App</h1>
    <Link href="/todos">Go to To-Do List</Link>
  </div>
);

export default Home;
