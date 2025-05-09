import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { AuthProvider } from "./context/AuthContext"
import { OrderProvider } from "./context/OrderContext"
import Navbar from "./components/common/Navbar"
import Footer from "./components/common/Footer"
import HomePage from "./pages/HomePage"
import DiagnosisPage from "./pages/DiagnosisPage"
import RepairCentersPage from "./pages/RepairCentersPage"
import BookingFormPage from "./pages/BookingFormPage"
import StatusPage from "./pages/StatusPage"
import MyOrdersPage from "./pages/MyOrdersPage"

function App() {
  return (
    <AuthProvider>
      <OrderProvider>
        <Router>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/diagnosis" element={<DiagnosisPage />} />
                <Route path="/repair-centers" element={<RepairCentersPage />} />
                <Route path="/booking/:centerId" element={<BookingFormPage />} />
                <Route path="/status/:orderId" element={<StatusPage />} />
                <Route path="/my-orders" element={<MyOrdersPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </OrderProvider>
    </AuthProvider>
  )
}

export default App
