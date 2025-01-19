import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import Alert from './components/Alert/index.tsx';

createRoot(document.getElementById('root')!).render(
  <>
    <Alert />
    <App />
  </>
  ,
);
