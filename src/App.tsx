import { Suspense } from 'react';
import { Routes } from './routes/index';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className='app'>
        <Routes />
      </div>
    </Suspense>
  );
}

export default App;
