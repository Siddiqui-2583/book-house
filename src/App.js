import './App.css';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import BookTable from './Components/BookTable/BookTable';
import InputForm from './Components/InputForm/InputForm';
import EditForm from "./Components/EditForm/EditForm";
import Header from './Components/Header/Header';
function App() {
  const [clickedBook, setClickedBook] = useState({})
  const [data, setData] = useState([]);
  return (
    <div className="App">
      <Router>
        <Header />
        <br />
        <Switch>
          <Route exact path="/">
            <BookTable
              data={data}
              setData={setData}
              setClickedBook={setClickedBook}
            />
          </Route>
          <Route path="/add-book">
            <InputForm />
          </Route>
          <Route path="/edit-book">
            <EditForm clickedBook={clickedBook} data={data} setData={setData} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
