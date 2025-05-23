
import Signup from "./components/signup";
import Login from "./components/login";
import PrivateRoute from "./components/private/privateRoute";

import { UserContextProvider } from "./context/userContext";

import {
  BrowserRouter as Router,
  Route,
  Routes
} from 'react-router-dom';

function App() {

  
  

  return<UserContextProvider>
    <Router>
    <Routes>
          <Route path="/signup" exact element={<Signup />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/" element={<PrivateRoute/>} />
        </Routes>
      </Router>

  </UserContextProvider> 
      
}

export default App


