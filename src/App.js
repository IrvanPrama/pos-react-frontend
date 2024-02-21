import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./component/Sidebar";
import Navbar from "./component/Navbar";
import Dashboard from "./pages/Dashboard";
import User from "./pages/User";
import EditUser from "./pages/User/EditUser";
import AddUser from "./pages/User/AddUser";
import Product from "./pages/Product";
import AddProduct from "./pages/Product/AddProduct";
import ProductMenu from "./pages/ProductMenu";
import AddProductMenu from "./pages/ProductMenu/AddProductMenu";
import Transaction from "./pages/Transaction";
import AddTransaction from "./pages/Transaction/AddTransaction";
import Packet from "./pages/Packet";
import AddPacket from "./pages/Packet/AddPacket";
import TakePacket from "./pages/Packet/TakePacket";
import EditPacket from "./pages/Packet/EditPacket";
import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";

function App() {
  return (
    <Router>
      <Navbar />
      <Sidebar>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<User />} />
          <Route path="/user/add" element={<AddUser />} />
          <Route path="/user/edit/:id" element={<EditUser />} />

          <Route path="/packet" element={<Packet />} />
          <Route path="/packet/add" element={<AddPacket />} />
          <Route path="/packet/edit/:id" element={<EditPacket />} />
          <Route path="/packet/take/:id" element={<TakePacket />} />

          {/* Mengarah ke Stok*/}
          <Route path="/product" element={<Product />} />
          <Route path="/product/add" element={<AddProduct />} />

          {/* Mengarah ke Manajemen Produk*/}
          <Route path="/product-menu" element={<ProductMenu />} />
          <Route path="/product-menu/add" element={<AddProductMenu />} />

          <Route path="/transaction" element={<Transaction />} />
          <Route path="/transaction/add" element={<AddTransaction />} />
          <Route path="/login" element={<Login />} />

          {/* Step 8, mengarahkan menu ke halaman Signup.js */}
          {/* Step 9, ada di Signup.jsx */}
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </Sidebar>
    </Router>
  );
}

export default App;
