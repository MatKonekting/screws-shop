import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Slider } from '../ui/slider';
import { toast } from 'sonner';
import { Ruler, Package, Send } from 'lucide-react';
import { useAuth } from '../AuthContext';

export default function DesignYours() {
  const { isAuthenticated, user } = useAuth();
  const [formData, setFormData] = useState({
    productType: '',
    material: '',
    size: '',
    length: [25],
    diameter: [10],
    quantity: '',
    threadType: '',
    headType: '',
    finish: '',
    additionalSpecs: '',
    name: user?.name || '',
    email: user?.email || '',
    company: '',
    phone: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.productType || !formData.material || !formData.quantity || !formData.name || !formData.email) {
      toast.error('Prosimo izpolnite vsa obvezna polja');
      return;
    }

    // Simulate order submission
    toast.success('Naročilo po meri uspešno oddano! Kontaktirali vas bomo v 24 urah.');
    
    // Reset form
    setFormData({
      productType: '',
      material: '',
      size: '',
      length: [25],
      diameter: [10],
      quantity: '',
      threadType: '',
      headType: '',
      finish: '',
      additionalSpecs: '',
      name: user?.name || '',
      email: user?.email || '',
      company: '',
      phone: '',
    });
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-slate-900/80 z-10" />
        <img
          src="https://images.unsplash.com/photo-1575305842946-0e807ce6f3fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjdXN0b20lMjBtZXRhbHdvcmslMjBmYWJyaWNhdGlvbnxlbnwxfHx8fDE3NzI3MDM3MzF8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Prilagojena izdelava"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center px-4">
          <h1 className="text-5xl mb-4">Oblikujte svoje pritrdilne elemente po meri</h1>
          <p className="text-xl text-slate-200">Povejte nam točno kaj potrebujete in mi bomo to naredili</p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                <Ruler className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-lg mb-2">Natančne specifikacije</h3>
              <p className="text-slate-600">Prilagojene dimenzije po vaših natančnih zahtevah</p>
            </div>
            <div>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                <Package className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-lg mb-2">Poljubna količina</h3>
              <p className="text-slate-600">Od prototipnih serij do velikih naročil</p>
            </div>
            <div>
              <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                <Send className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-lg mb-2">Hitra realizacija</h3>
              <p className="text-slate-600">Hitre ponudbe in učinkovita proizvodnja</p>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Order Form */}
      <section className="py-12 px-4 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl mb-6">Obrazec za naročilo po meri</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Product Specifications */}
              <div className="space-y-6">
                <h3 className="text-lg pb-2 border-b">Specifikacije produkta</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="productType">Tip izdelka *</Label>
                    <Select value={formData.productType} onValueChange={(value) => setFormData({...formData, productType: value})}>
                      <SelectTrigger id="productType">
                        <SelectValue placeholder="Izberite tip" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="screw">Vijak</SelectItem>
                        <SelectItem value="nail">Žebelj</SelectItem>
                        <SelectItem value="bolt">Vijačni element</SelectItem>
                        <SelectItem value="other">Drugo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="material">Material *</Label>
                    <Select value={formData.material} onValueChange={(value) => setFormData({...formData, material: value})}>
                      <SelectTrigger id="material">
                        <SelectValue placeholder="Izberite material" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="stainless">Nerjavno jeklo</SelectItem>
                        <SelectItem value="carbon">Ogljikovo jeklo</SelectItem>
                        <SelectItem value="brass">Medenina</SelectItem>
                        <SelectItem value="aluminum">Aluminij</SelectItem>
                        <SelectItem value="titanium">Titan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label>Dolžina (mm): {formData.length[0]}mm</Label>
                  <Slider
                    value={formData.length}
                    onValueChange={(value) => setFormData({...formData, length: value})}
                    min={5}
                    max={300}
                    step={1}
                    className="mt-2"
                  />
                </div>

                <div>
                  <Label>Premer (mm): {formData.diameter[0]}mm</Label>
                  <Slider
                    value={formData.diameter}
                    onValueChange={(value) => setFormData({...formData, diameter: value})}
                    min={1}
                    max={50}
                    step={0.5}
                    className="mt-2"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="threadType">Tip navoja</Label>
                    <Select value={formData.threadType} onValueChange={(value) => setFormData({...formData, threadType: value})}>
                      <SelectTrigger id="threadType">
                        <SelectValue placeholder="Izberite tip navoja" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="coarse">Grobi</SelectItem>
                        <SelectItem value="fine">Fini</SelectItem>
                        <SelectItem value="self-tapping">Samovrezni</SelectItem>
                        <SelectItem value="none">Brez</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="headType">Tip glave</Label>
                    <Select value={formData.headType} onValueChange={(value) => setFormData({...formData, headType: value})}>
                      <SelectTrigger id="headType">
                        <SelectValue placeholder="Izberite tip glave" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="flat">Ravna</SelectItem>
                        <SelectItem value="pan">Okrogla</SelectItem>
                        <SelectItem value="hex">Šestkotna</SelectItem>
                        <SelectItem value="round">Polkrožna</SelectItem>
                        <SelectItem value="countersunk">Vgreznjena</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="finish">Površinska obdelava</Label>
                    <Select value={formData.finish} onValueChange={(value) => setFormData({...formData, finish: value})}>
                      <SelectTrigger id="finish">
                        <SelectValue placeholder="Izberite obdelavo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="plain">Navadna</SelectItem>
                        <SelectItem value="zinc">Pocinkana</SelectItem>
                        <SelectItem value="galvanized">Galvanizirana</SelectItem>
                        <SelectItem value="black-oxide">Črni oksid</SelectItem>
                        <SelectItem value="powder-coated">Prah prevlečena</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="quantity">Količina *</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                      placeholder="Vnesite količino"
                      min="1"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="additionalSpecs">Dodatne specifikacije</Label>
                  <Textarea
                    id="additionalSpecs"
                    value={formData.additionalSpecs}
                    onChange={(e) => setFormData({...formData, additionalSpecs: e.target.value})}
                    placeholder="Kakršne koli posebne zahteve, tolerance ali opombe..."
                    rows={4}
                  />
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <h3 className="text-lg pb-2 border-b">Kontaktni podatki</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="company">Ime podjetja</Label>
                    <Input
                      id="company"
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({...formData, company: e.target.value})}
                      placeholder="Vaše podjetje"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Telefonska številka</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+386 (01) 123-4567"
                    />
                  </div>
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full bg-orange-500 hover:bg-orange-600">
                Oddaj zahtevo za naročilo po meri
              </Button>

              <p className="text-sm text-slate-600 text-center">
                Pregledali bomo vaše specifikacije in vas kontaktirali v 24 urah s ponudbo
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl mb-8 text-center">Pogosta vprašanja</h2>
          <div className="space-y-4">
            <div className="border rounded-lg p-6">
              <h3 className="text-lg mb-2">Kakšna je minimalna količina naročila?</h3>
              <p className="text-slate-600">Sprejemamo naročila po meri od 50 kosov dalje, čeprav večje količine ponujajo boljše cene.</p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="text-lg mb-2">Koliko časa traja proizvodnja?</h3>
              <p className="text-slate-600">Običajna realizacija je 2-4 tedne, odvisno od kompleksnosti in količine. Hitri roki so lahko na voljo.</p>
            </div>
            <div className="border rounded-lg p-6">
              <h3 className="text-lg mb-2">Ali lahko dobim vzorce pred naročilom?</h3>
              <p className="text-slate-600">Da! Lahko izdelamo vzorčne kose za odobritev pred začetkom celotne proizvodnje.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
