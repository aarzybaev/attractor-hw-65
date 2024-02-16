import {Route, Routes} from 'react-router-dom';
import Appbar from './components/Appbar/Appbar';
import Page from './containers/Page/Page';
import PageForm from './containers/PageForm/PageForm';

const App = () => {
  return (
    <>
      <header>
        <Appbar/>
      </header>
      <main className="container-fluid">
        <Routes>
          <Route path="/" element={<Page/>} />
          <Route path="/pages/:pageName" element={<Page/>}/>
          <Route path="/pages/admin" element={<PageForm/>}/>
          <Route path="*" element={<h1>Not found</h1>} />
        </Routes>
      </main>
    </>
  );
};

export default App;
