// // src/App.jsx

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { __getFamilies } from "./redux/modules/familiesSlice";

// const App = () => {
//   const dispatch = useDispatch();
//   // const state = useSelector((state) => state.families);
//   // console.log(state);
//   const { isLoading, error, families } = useSelector((state) => state.families);

//   useEffect(() => {
//     dispatch(__getFamilies());
//   }, [dispatch]);

//   if (isLoading) {
//     return <div>로딩 중....</div>;
//   }

//   if (error) {
//     return <div>{error.message}</div>;
//   }
//   console.log(families);
//   return (
//     <div>
//       {/* <h1>{families[0].title}</h1> */}
//       {families.map((family) => (
//         <div key={family.id}>
//           <h3>{family.title}</h3>
//           <h4>{family.comment[0].content}</h4>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default App;

import "./App.css";
import Router from "./shared/Router";

function App() {
  return <Router />;
}

export default App;
