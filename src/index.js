import React from "react";
import ReactDOM from 'react-dom/client';
import AccountTable from "./AccountTable";
const el = document.getElementById('root');

const root = ReactDOM.createRoot(el);

function App(){
  return (
  <>
  <h1>Client Performance Info</h1>
  <AccountTable/>
  </>
  )
}

root.render(<App/>);