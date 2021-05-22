import { useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'

import { Provider } from 'react-redux'
import store from './store'
import TaskList from './components/TaskList'
import 'bootstrap/dist/css/bootstrap.min.css';
import DeleteModal from './components/DeleteModal'
import ErrorToast from './components/ErrorToast'

function App() {

  const [showAddTask, setShowAddTask] = useState(false)

  return (
    <Provider store={store}>
      <Router>
        <div className='taskbox'>
          <ErrorToast />
          <Header
            onAdd={() => setShowAddTask(!showAddTask)}
            showAdd={showAddTask}
          />

          <Route path='/' exact render={(props) => (
            <>
              {showAddTask && <AddTask />}
              <TaskList />
            </>
          )} />

          <Route path='/about' component={About} />
          <Footer />
          <DeleteModal />
        </div>
      </Router>
    </Provider>

  );

}

export default App;
