import React from "react";
import ReactDOM from 'react-dom/client';
import AccountTable from "./AccountTable";
const el = document.getElementById('root');

const root = ReactDOM.createRoot(el);

function App(){
  return (
  <>
  <AccountTable/>
  </>
  )
}

root.render(<App/>);