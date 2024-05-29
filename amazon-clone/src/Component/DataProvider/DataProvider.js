// import React, {createContext, useReducer} from 'react'
// import reducer from '../../Utility/reducer'
// export const DataContext = createContext()
// export const DataProvider = ({children, reducer, initialState})=>{
// return (
//  <DataContext.Provider value={useReducer(reducer, initialState)}>
// {children}
// </DataContext.Provider >)
// }
import React, { createContext, useContext, useReducer } from "react";


export const DataContext = createContext();


export const StateProvider = ({ reducer, initialState, children }) => (
  <DataContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </DataContext.Provider>
);


export const useStateValue = () => useContext(DataContext);