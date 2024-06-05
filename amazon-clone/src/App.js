import "./App.css";
import Routering from "./Routers";
import { DataContext } from "./Component/DataProvider/DataProvider";
import { Type } from "./Utility/action.type";
import { auth } from "./Utility/firebase";
import { useContext, useEffect } from "react";
function App() {
  const [{ user }, dispatch] = useContext(DataContext);
  useEffect (() => {
auth.onAuthStateChanged((authUser) => {
if (authUser) {
// console.log(authUser);
dispatch({
type: Type.SET_USER,
user: authUser,
});
} else { 
dispatch({
type: Type.SET_USER,
user: null,
});}
});
}, []);
  return (
    <>
      <Routering />
    </>
  );
}

export default App;
