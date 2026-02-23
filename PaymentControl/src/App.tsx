import { Route, Routes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Principal from "./pages/Principal";
import PieSpendings from "./components/graphics/PieSpendings";
import {SlidingContainer} from "./components/atoms/SlidingContainer";
import TransactionForm from "./components/atoms/TransactionForm";

function App() {
  return (
    // <Login>
      
    // </Login>
    <MainLayout >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/principal" element={<Principal />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/form" element={<TransactionForm type="spending" category={null} onBack={() => {}} onSuccess={() => {}} />} />

        {/* <Route path="/slide" element={<SlidingContainer />} /> */}
        <Route path="/pie" element={<PieSpendings totalSpendings={4800}  totalIncomes={3000}/>} />
      </Routes>
    </MainLayout>

  );
}

export default App;
