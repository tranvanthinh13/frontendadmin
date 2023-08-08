import Index from "./pages/Index";
import Tables from "./pages/Tables";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Sign_in from "./pages/Sign_in";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import SignupForm from "./Forms/SignupForm";
import Promotion from "./pages/Promotion";
import Invoice from "./pages/Invoice";
import ImportInvoices from "./pages/ImportInvoices";
import Banner from "./Forms/Banner";
import InvoiceDetails from "./pages/invoicedetail";
import ImportInvoiceDetails from "./pages/Importinvoicedetail";
import InvoicePDF from "./pages/expostInvoid";
import ProductsType from "./pages/ProductsType";
import Products from "./pages/Products";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/Index' element={<Index />} />
          <Route path='/Tables' element={<Tables />} />
          <Route path='/Products' element={<ProductsType />} />
          <Route path='/Products2' element={<Products />} />
          <Route path='/Banner' element={<Banner />} />
          <Route path='/Profile' element={<Profile />} />
          <Route path='/Promotion' element={<Promotion />} />
          <Route path='/Invoice' element={<Invoice />} />
          <Route path='/Dashboard' element={<Dashboard />} />
          <Route path='/SignupForm' element={<SignupForm />} />
          <Route path='/ImportInvoices' element={<ImportInvoices />} />
          <Route path="/invoicedetail/:id" element={<InvoiceDetails />} />
          <Route path="/ImportInvoicesdetail/:id" element={<ImportInvoiceDetails />} />
          <Route path="/InvoicePDF" element={<InvoicePDF />} />
          <Route path='/' element={<Sign_in />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;


