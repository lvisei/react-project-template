import React, { useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

// Context
export const AppContext = React.createContext(null);

// Provider
export function AppProvider({ reducer, initialState, children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
}

AppProvider.propTypes = {
  reducer: PropTypes.func.isRequired,
  initialState: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired
};

export const useAppState = () => useContext(AppContext);
