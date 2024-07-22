import AddTimer from './components/AddTimer.tsx';
import Banner from './components/Banner.tsx';
import Header from './components/Header.tsx';
import Timers from './components/Timers.tsx';
import TimersContextProvider from './store/timers-context.tsx';

function App() {
  return (
    <TimersContextProvider>
          <Header />
          <main>
            <AddTimer />
            <Timers />
            <Banner texto='Onjacktallcuca@Copyrighted'/>
          </main>
    </TimersContextProvider>
  );
}

export default App;