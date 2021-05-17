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
import Access from './components/Access'

function App() {

  const [showAddTask, setShowAddTask] = useState(false)

  return (
    <Provider store={store}>
      <Router>
        <div className="container">
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
          <Access />
        </div>
      </Router>
    </Provider>

  );

}

export default App;
