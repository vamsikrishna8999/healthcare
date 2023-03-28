
import './App.css';
import RootLayot from './RootLayot';
import Today from './components/Today/Today';
import Tasks from './components/Tasks/Tasks';
import ReportForm from './components/ReportForm/ReportForm';
import Report from './components/Report/Report';
import Zen from './components/Zen/Zen';
import Dashboard from './components/Dashboard/Dashboard';
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
function App() {

  const router=createBrowserRouter([
    {
      path:"/",
      element:<RootLayot />,
      children:[
        {
          path:"/",
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
          path:"/Dashboard",
          element:<Dashboard />
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
