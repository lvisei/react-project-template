import React, { useContext, useReducer } from 'react';
import { AppProvider, useAppState } from './state';
import './index.css';

// init state
const initialState = {
  count: 0
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'count.add':
      return { ...state, count: state.count + 1 };
    case 'count.reduce':
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};

function App() {
  return (
    <AppProvider initialState={initialState} reducer={reducer}>
      <AppContainer />
    </AppProvider>
  );
}

function AppContainer() {
  const { state, dispatch } = useAppState();

  return (
    <div className="App">
      <header className="App-header">
        <p>react-project-template</p>
        <p>This is containers App</p>
      </header>
      <div className="App-container">
        <p>App</p>
        <button
          onClick={() => {
            dispatch({ type: 'count.add' });
          }}
        >
          +
        </button>
        <span>{state.count}</span>
        <button
          onClick={() => {
            dispatch({ type: 'count.reduce' });
          }}
        >
          -
        </button>
        <Demo />
      </div>
    </div>
  );
}

function Demo() {
  const { state, dispatch } = useAppState();

  // console.log('demo');
  return (
    <div className="demo">
      <p>demo</p>
      <button
        onClick={() => {
          dispatch({ type: 'count.add' });
        }}
      >
        +
      </button>
      <span>{state.count}</span>
      <button
        onClick={() => {
          dispatch({ type: 'count.reduce' });
        }}
      >
        -
      </button>
    </div>
  );
}

export default App;
