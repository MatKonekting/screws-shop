import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { toast } from 'sonner';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Prosimo izpolnite vsa obvezna polja');
      return;
    }

    // Simulate form submission
    toast.success('Sporočilo uspešno poslano! Kmalu se bomo oglasili.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-slate-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl mb-4">Kontaktirajte nas</h1>
          <p className="text-xl text-slate-200">Tu smo, da vam pomagamo pri vaših potrebah po pritrdilnih elementih</p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                <Phone className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-lg mb-2">Telefon</h3>
              <p className="text-slate-600">+386 41 813 225</p>
              <p className="text-slate-600">+386 70 540 515</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                <Mail className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-lg mb-2">Email</h3>
              <p className="text-slate-600">info@screws.si</p>
              <p className="text-slate-600">prodaja@screws.si</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                <MapPin className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-lg mb-2">Naslov</h3>
              <p className="text-slate-600">Gačnik 37a</p>
              <p className="text-slate-600">2000 Maribor, Slovenija</p>
            </div>

            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                <Clock className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-lg mb-2">Delovni čas</h3>
              <p className="text-slate-600">Pon - Pet: 8:00 - 18:00</p>
              <p className="text-slate-600">Sob: 9:00 - 14:00</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-12 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl mb-6">Pošljite nam sporočilo</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Polno ime *</Label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Janez Novak"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="janez@example.com"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Telefonska številka</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    placeholder="+386 41 813 225"
                  />
                </div>

                <div>
                  <Label htmlFor="subject">Zadeva</Label>
                  <Input
                    id="subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                    placeholder="Kako vam lahko pomagamo?"
                  />
                </div>

                <div>
                  <Label htmlFor="message">Sporočilo *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    placeholder="Povejte nam o vaših potrebah..."
                    rows={6}
                    required
                  />
                </div>

                <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600">
                  Pošlji sporočilo
                </Button>
              </form>
            </div>

            {/* Map & Additional Info */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <div className="h-80 bg-slate-200">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2763.8724082090535!2d15.624342115561043!3d46.54468447914553!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476f6f0f0a5f9f5d%3A0x5c4e2a8f0eeb5d!2sGa%C4%8Dnik%2037a%2C%202000%20Maribor%2C%20Slovenija!5e0!3m2!1sen!2s!4v1709579876543!5m2!1sen!2s"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl mb-4">Zakaj izbrati nas?</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                    <span className="text-slate-600">30+ let izkušenj v industriji</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                    <span className="text-slate-600">Vrhunski kakovostni materiali in izdelava</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                    <span className="text-slate-600">Zmogljivosti proizvodnje po meri</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                    <span className="text-slate-600">Hitra dostava in zanesljiva dobava</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2" />
                    <span className="text-slate-600">Predana ekipa za podporo strankam</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 px-4 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl mb-4">Potrebujete takojšnjo pomoč?</h2>
          <p className="text-lg text-slate-300 mb-6">
            Naša prodajna ekipa je pripravljena pomagati vam najti popolno rešitev
          </p>
          <a href="tel:+386041813225">
            <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
              <Phone className="mr-2 w-5 h-5" />
              Pokličite zdaj: +386 (041) 813-225
            </Button>
          </a>
        </div>
      </section>
    </div>
  );
}