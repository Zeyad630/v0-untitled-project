import { Link } from "react-router-dom"
import { Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-xl font-bold mb-4">DeviceRepair</h2>
            <p className="text-gray-300 mb-4">
              Professional device repair services for all your tech needs. Fast, reliable, and affordable.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/diagnosis" className="text-gray-300 hover:text-white">
                  AI Diagnosis
                </Link>
              </li>
              <li>
                <Link to="/repair-centers" className="text-gray-300 hover:text-white">
                  Repair Centers
                </Link>
              </li>
              <li>
                <Link to="/my-orders" className="text-gray-300 hover:text-white">
                  My Orders
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">Screen Repair</li>
              <li className="text-gray-300">Battery Replacement</li>
              <li className="text-gray-300">Water Damage Repair</li>
              <li className="text-gray-300">Software Issues</li>
              <li className="text-gray-300">Camera Repair</li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-300">
                <MapPin className="h-5 w-5 mr-2" />
                <span>123 Repair St, Tech City, TC 12345</span>
              </li>
              <li className="flex items-center text-gray-300">
                <Phone className="h-5 w-5 mr-2" />
                <span>(555) 123-4567</span>
              </li>
              <li className="flex items-center text-gray-300">
                <Mail className="h-5 w-5 mr-2" />
                <span>support@devicerepair.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>&copy; {new Date().getFullYear()} DeviceRepair. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
