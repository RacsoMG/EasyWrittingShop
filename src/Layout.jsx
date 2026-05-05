import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { name: "Home", page: "Home" },
  { name: "Services", page: "Services" },
  { name: "Projects", page: "Projects" },
  { name: "Contact", page: "Contact" }
];

export default function Layout({ children, currentPageName }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const isHomePage = currentPageName === "Home";
  const headerBg = isScrolled || !isHomePage ? "bg-white shadow-sm" : "bg-transparent";
  const textColor = isScrolled || !isHomePage ? "text-black" : "text-white";
  const logoColor = isScrolled || !isHomePage ? "text-black" : "text-white";

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerBg}`}>
        <div className="container mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to={createPageUrl("Home")} className="flex items-center">
              <span className={`text-2xl font-bold transition-colors ${logoColor}`}>
                Easy<span className="font-light">WorkShop</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.page}
                  to={createPageUrl(link.page)}
                  className={`text-sm font-medium transition-colors hover:opacity-70 ${
                    currentPageName === link.page 
                      ? `${textColor} border-b-2 ${isScrolled || !isHomePage ? 'border-black' : 'border-white'} pb-1` 
                      : `${textColor} opacity-80`
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* CTA & Admin */}
            <div className="hidden lg:flex items-center gap-4">
              <Link to={createPageUrl("Contact")}>
                <Button 
                  className={`${
                    isScrolled || !isHomePage 
                      ? 'bg-black text-white hover:bg-gray-800' 
                      : 'bg-white text-black hover:bg-gray-100'
                  }`}
                >
                  Get Started
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`lg:hidden p-2 ${textColor}`}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t"
            >
              <div className="container mx-auto px-6 py-6">
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.page}
                      to={createPageUrl(link.page)}
                      className={`text-lg font-medium py-2 ${
                        currentPageName === link.page ? 'text-black' : 'text-gray-600'
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                  <Link to={createPageUrl("Contact")}>
                    <Button className="w-full mt-4 bg-black text-white">
                      Get Started
                    </Button>
                  </Link>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <span className="text-2xl font-bold">
                Easy<span className="font-light">WorkShop</span>
              </span>
              <p className="text-gray-400 mt-4 text-sm leading-relaxed">
                Your trusted partner for academic excellence. Expert research solutions 
                for students at all levels.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.page}
                    to={createPageUrl(link.page)}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Services */}
            <div>
              <h4 className="font-semibold mb-4">Services</h4>
              <nav className="flex flex-col gap-2">
                {["Research Papers", "Thesis Writing", "Data Analysis", "Academic Editing"].map((service) => (
                  <span key={service} className="text-gray-400 text-sm">
                    {service}
                  </span>
                ))}
              </nav>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <div className="flex flex-col gap-2 text-gray-400 text-sm">
                <span>contact@easyworkshop.com</span>
                <span>+1 (555) 123-4567</span>
                <span>New York, NY</span>
              </div>
            </div>
          </div>

          {/* Bottom */}
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2024 EasyWorkShop. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}