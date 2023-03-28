
import './App.css';
import RootLayot from './RootLayot';
import Today from './components/Today/Today';
import Tasks from './components/Tasks/Tasks';
import ReportForm from './components/ReportForm/ReportForm';
import Report from './components/Report/Report';
import Zen from './components/Zen/Zen';
import Dashboard from './components/Dashboard/Dashboard';
import Ayurveda from './components/Ayurveda/Ayurveda';
import Insurance from './components/Insurance/Insurance';
import Login from './components/login/login';
import Register from './components/register/register';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
function App() {

  const router=createBrowserRouter([
    {
      path:"/",
      element:<RootLayot />,
      children:[
        {
          path:"/Login",
          element:<Login />
        },
        {
          path:"/Register",
          element:<Register />
        },
        {
          path:"/",
          element:<Dashboard />
        },
        {
          path:"/Today",
          element:<Today />
        },
        {
          path:"/Tasks",
          element:<Tasks />
        },
        {
          path:"/ReportForm",
          element:<ReportForm />
        },
        {
          path:"/Report",
          element:<Report />
        },
        {
          path:"/Zen",
          element:<Zen />
        },
        {
          path:"/Ayurveda",
          element:<Ayurveda />
        },
        {
          path:"/Insurance",
          element:<Insurance />
        }
        
      ]
    }
  ])



  return (
    <div className="App">
      <RouterProvider router={router} />

    </div>
  );
}

export default App;
