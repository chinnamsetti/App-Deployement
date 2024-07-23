
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import TasksGiven from './components/TasksGiven';
import Leaves from './components/Leaves';
import StatusUpdate from './components/StatusUpdate';
import EditProfile from './components/EditProfile';

function App() {
  return (
    
    <BrowserRouter>
         <Routes>
            <Route path="/" element={<Signin></Signin>}></Route>
            <Route path="/signup"element={<Signup></Signup>}></Route>
            <Route path="/home"element={<Dashboard></Dashboard>}></Route>
            <Route path="/tasks"element={<TasksGiven></TasksGiven>}></Route>
            <Route path="/editProfile"element={<EditProfile></EditProfile>}></Route>
            <Route path="/leaves"element={<Leaves></Leaves>}></Route>
            <Route path="/su"element={<StatusUpdate></StatusUpdate>}></Route>
            
            <Route path="*" element={<TasksGiven></TasksGiven>}></Route>
         </Routes>
    </BrowserRouter>
    );
}
export default App;
