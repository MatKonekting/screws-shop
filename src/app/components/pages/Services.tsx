import { Wrench, Package, Truck, HeadphonesIcon, Ruler, Cog } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';

export default function Services() {
  const services = [
    {
      icon: Package,
      title: 'Velika naročila',
      description: 'Konkurenčne cene za velika naročila z prilagodljivimi dobavnimi roki',
      image: 'https://images.unsplash.com/photo-1727292485821-f2feb8baa7ce',
    },
    {
      icon: Ruler,
      title: 'Proizvodnja po meri',
      description: 'Prilagojeni vijaki in žeblji narejeni po vaših natančnih specifikacijah',
      image: 'https://images.unsplash.com/photo-1625773084965-5ccf71e1df51',
    },
    {
      icon: Truck,
      title: 'Hitra dostava',
      description: 'Na voljo dostava v istem dnevu s sledenjem vseh naročil',
      image: 'https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55',
    },
    {
      icon: Cog,
      title: 'Tehnična podpora',
      description: 'Strokovno svetovanje pri izbiri pravih pritrdilnih elementov',
      image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12',
    },
    {
      icon: Wrench,
      title: 'Montažne storitve',
      description: 'Profesionalne navodila za vgradnjo in podpora na terenu',
      image: 'https://images.unsplash.com/photo-1575305842946-0e807ce6f3fc',
    },
    {
      icon: HeadphonesIcon,
      title: 'Podpora strankam 24/7',
      description: 'Pomoč na voljo kadarkoli za vse vaše potrebe',
      image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
    },
  ];

  const process = [
    { step: '01', title: 'Posvetovanje', description: 'Pogovor o vaših zahtevah z našimi strokovnjaki' },
    { step: '02', title: 'Oblikovanje', description: 'Ustvarimo specifikacije glede na vaše potrebe' },
    { step: '03', title: 'Proizvodnja', description: 'Precizna proizvodnja v našem obratu' },
    { step: '04', title: 'Nadzor kakovosti', description: 'Strog preizkus vsakega izdelka' },
    { step: '05', title: 'Dostava', description: 'Hitra in varna dostava na vašo lokacijo' },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative h-[400px] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-slate-900/80 z-10" />
        <img
          src="https://images.unsplash.com/photo-1693823462803-8921d3f5ea2c"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center px-4">
          <h1 className="text-5xl mb-4">Naše storitve</h1>
          <p className="text-xl text-slate-200">
            Celovite rešitve za vse vaše potrebe po pritrdilnih elementih
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="rounded-lg shadow-lg overflow-hidden">
                <img src={service.image} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <service.icon className="w-6 h-6 text-orange-500 mb-3" />
                  <h3 className="text-xl mb-2">{service.title}</h3>
                  <p className="text-slate-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {process.map((item, index) => (
              <div key={index}>
                <div className="w-16 h-16 bg-orange-500 text-white rounded-full flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3>{item.title}</h3>
                <p className="text-sm text-slate-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-slate-900 text-white text-center">
        <h2 className="text-3xl mb-4">Pripravljeni začeti?</h2>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <Link to="/contact">
            <Button className="bg-orange-500 hover:bg-orange-600">Kontakt</Button>
          </Link>

          <Link to="/design-yours">
            <Button size="lg" variant="outline" className="border-white text-black hover:bg-slate-300 hover:text-black">Ponudba</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}