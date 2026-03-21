import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

export default function Products() {
  const categories = [
    {
      id: 'screws',
      name: 'Vijaki',
      description: 'Visokokakovostni vijaki za vse aplikacije',
      products: [
        'Lesni vijaki',
        'Strojni vijaki',
        'Samovrezni vijaki',
        'Vijaki za mavec',
        'Vijaki za terase',
        'Vijaki za pločevino',
      ],
      image: 'https://m.media-amazon.com/images/I/71ugMpNwxSL._AC_SL1500_.jpg',
    },
    {
      id: 'nails',
      name: 'Žeblji',
      description: 'Trajni žeblji za gradnjo in mizarstvo',
      products: [
        'Navadni žeblji',
        'Zaključni žeblji',
        'Strešni žeblji',
        'Betonski žeblji',
        'Bradni žeblji',
        'Okvirni žeblji',
      ],
      image: 'https://i.etsystatic.com/11161410/r/il/cdab87/1018172539/il_794xN.1018172539_65ho.jpg',
    },
    {
      id: 'bolts',
      name: 'Vijaki in matice',
      description: 'Težki vijaki in pritrdilna oprema',
      products: [
        'Šestkotni vijaki',
        'Kočijski vijaki',
        'Obročni vijaki',
        'U-vijaki',
        'Samozaviralne matice',
        'Krila matice',
      ],
      image: 'https://wilsongarner.com/wp-content/uploads/2023/05/ultimate-guide-to-bolt-types-grades-manufacturing-jpg.webp',
    },
    {
      id: 'specialty',
      name: 'Posebni izdelki',
      description: 'Pritrdilni elementi po meri in specializirani',
      products: [
        'Sidrni vijaki',
        'Preklopni vijaki',
        'Kovički',
        'Podložke',
        'Navoji',
        'Pritrdilni elementi po meri',
      ],
      image: 'https://www.zakrajsek.si/img/home-vijaki-large.png',
    },
  ];

  const materials = [
    { name: 'Nerjavno jeklo', description: 'Odporno na korozijo, idealno za zunanjo uporabo' },
    { name: 'Ogljikovo jeklo', description: 'Visoka trdnost, ekonomična izbira' },
    { name: 'Medenina', description: 'Dekorativna in odporna na korozijo' },
    { name: 'Aluminij', description: 'Lahek in odporen na rjavenje' },
    { name: 'Pocinkano', description: 'Povečana zaščita proti koroziji' },
    { name: 'Galvanizirano', description: 'Maksimalna zunanja trajnost' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-slate-900/80 z-10" />
        <img
          src="https://images.unsplash.com/photo-1727292485821-f2feb8baa7ce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXJkd2FyZSUyMHN0b3JlJTIwbWV0YWwlMjBwYXJ0c3xlbnwxfHx8fDE3NzI3MDM3MzB8MA&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Katalog produktov"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center px-4">
          <h1 className="text-5xl mb-4">Naši produkti</h1>
          <p className="text-xl text-slate-200">Širok nabor vrhunskih pritrdilnih elementov</p>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">Kategorije produktov</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Raziščite našo obsežno ponudbo pritrdilnih elementov in opreme
            </p>
          </div>
          
          <Tabs defaultValue="screws" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4 mb-8">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
            
            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id}>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-96 object-cover rounded-lg shadow-lg"
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl mb-4">{category.name}</h3>
                    <p className="text-slate-600 mb-6">{category.description}</p>
                    <ul className="grid grid-cols-2 gap-3">
                      {category.products.map((product, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-orange-500 rounded-full" />
                          <span>{product}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Materials Section */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">Na voljo materiali</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              Izberite med različnimi materiali, ki ustrezajo vašim specifičnim potrebam
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {materials.map((material, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg mb-2">{material.name}</h3>
                <p className="text-slate-600 text-sm">{material.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Specifications Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4">Obseg velikosti</h2>
            <p className="text-slate-600">Na zalogi imamo velikosti od #2 do 1" premera in dolžine od 1/4" do 12"</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="p-6 bg-slate-50 rounded-lg">
              <div className="text-3xl text-orange-500 mb-2">500+</div>
              <div className="text-slate-600">Različnih velikosti</div>
            </div>
            <div className="p-6 bg-slate-50 rounded-lg">
              <div className="text-3xl text-orange-500 mb-2">15+</div>
              <div className="text-slate-600">Materialnih možnosti</div>
            </div>
            <div className="p-6 bg-slate-50 rounded-lg">
              <div className="text-3xl text-orange-500 mb-2">100%</div>
              <div className="text-slate-600">Preizkušena kakovost</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
