import './styles/App.css';
import Navbar from './components/UI/navbar/Navbar';
import AppRouter from './components/AppRouter';

function App() {
  return (
    <div className='main'>
      <Navbar />
      <AppRouter />
    </div>
  );
}

export default App;
