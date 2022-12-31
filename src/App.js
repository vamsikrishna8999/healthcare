
import './App.css';
import RootLayot from './RootLayot';
import Today from './components/Today/Today';
import Tasks from './components/Tasks/Tasks';
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
