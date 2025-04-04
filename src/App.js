import './App.css';
import { BrowserRouter as Router,Routes,Route  } from 'react-router-dom';
import Dashboard from './Components/Common/Dashboard';
import PageNotFound from './Components/Common/PageNotFound';
 

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
      <Route path="/*" element={<Dashboard />} />
      <Route path="*" element={<PageNotFound />} />
      </Routes>
      </Router>
    </div>
  );
}

export default App;
