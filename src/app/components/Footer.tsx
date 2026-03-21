import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xl text-white">SCREWS</span>
            </div>
            <p className="text-sm">
              Vaš zaupanja vreden partner za visokokakovostne vijake, žeblje in rešitve po meri iz kovine od leta 2007.
            </p>
          </div>

          <div>
            <h3 className="text-white mb-4">Hitre povezave</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/about" className="hover:text-orange-500">O nas</Link></li>
              <li><Link to="/services" className="hover:text-orange-500">Storitve</Link></li>
              <li><Link to="/contact" className="hover:text-orange-500">Kontakti</Link></li>
              <li><Link to="/shop" className="hover:text-orange-500">Spletna trgovina</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white mb-4">Kontakt</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+386 41 813 225</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>info@screws.si</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>Gačnik 37a<br />2000 Maribor, Slovenija</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white mb-4">Sledite nam</h3>
            <div className="flex space-x-3">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-full hover:bg-orange-500">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-full hover:bg-orange-500">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-full hover:bg-orange-500">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 bg-slate-800 rounded-full hover:bg-orange-500">
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 text-sm text-center">
          <p>&copy; {new Date().getFullYear()} SCREWS. Vse pravice pridržane.</p>
        </div>
      </div>
    </footer>
  );
}