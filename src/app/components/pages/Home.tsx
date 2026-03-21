import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Award, Package } from 'lucide-react';
import { Button } from '../ui/button';

export default function Home() {
  const features = [
    {
      icon: Shield,
      title: 'Vrhunska kakovost',
      description: 'Visokokakovostni materiali zagotavljajo trajnost in zanesljivost',
    },
    {
      icon: Zap,
      title: 'Hitra dostava',
      description: 'Hitri dobavni roki za vsa naročila',
    },
    {
      icon: Award,
      title: '18+ let izkušenj',
      description: 'Zaupanja vreden strokovnjak v kovinskem delu in pritrdilnih elementih',
    },
    {
      icon: Package,
      title: 'Rešitve po meri',
      description: 'Prilagojeni izdelki za vaše posebne potrebe',
    },
  ];

  const featuredProducts = [
    {
      id: '1',
      name: 'Nerjavni vijaki za les',
      price: 12.99,
      image: 'https://cdn11.bigcommerce.com/s-yh2g6i/images/stencil/640w/products/4941/19171/QWS1001_1__31079.1673600555.jpg?c=2',
    },
    {
      id: '2',
      name: 'Težki okvirni žeblji',
      price: 6.99,
      image: 'https://www.tehmax.si/media/SlikeIT//zeblji.jpg',
    },
    {
      id: '3',
      name: 'Šestkotni vijaki z matkami',
      price: 12.99,
      image: 'https://static1.unitrailer.si/hpeciai/18523b3be01abd24870291a2bb855fce/slv_pm_Vijak-z-matico-za-pritrditev-nosilnega-kolesa-DROMET-M10x25-3553_4.png',
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 to-slate-900/70 z-10" />
        <img
          src="https://images.unsplash.com/photo-1693823462803-8921d3f5ea2c"
          alt="Industrijska delavnica"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl mb-6">
            Vrhunski vijaki in žeblji za vsak projekt
          </h1>

          <p className="text-xl mb-8 text-slate-200">
            Kakovostni pritrdilni elementi in rešitve kovinarstva po meri od leta 2007
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                V trgovino <ArrowRight className="ml-0.5 w-5 h-5" />
              </Button>
            </Link>

            <Link to="/design-yours">
              <Button size="lg" variant="outline" className="border-white text-black hover:bg-slate-300 hover:text-black">
                Naročila po meri <ArrowRight className="ml-0.4 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-100 rounded-full mb-4">
                  <feature.icon className="w-8 h-8 text-orange-500" />
                </div>
                <h3 className="text-lg mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                <div className="p-6">
                  <h3 className="text-lg mb-2">{product.name}</h3>
                  <p className="text-2xl text-orange-500 mb-4">${product.price}</p>

                  <Link to="/shop">
                    <Button className="w-full bg-slate-900 hover:bg-slate-800">
                      Trgovina
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}