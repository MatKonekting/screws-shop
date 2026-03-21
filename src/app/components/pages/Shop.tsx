import { useState } from 'react';
import { Search, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useCart } from '../CartContext';
import { toast } from 'sonner';
import { products, Product } from '../../data/products';

export default function Shop() {
  const { addToCart } = useCart();

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('name');

  const toggleFilter = (value: string) => {
    setCategoryFilter((prev) =>
      prev.includes(value)
        ? prev.filter((f) => f !== value)
        : [...prev, value]
    );
  };

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());

      let matchesCategory = true;

      if (categoryFilter.length > 0) {
        matchesCategory = categoryFilter.some((filter) => {
          if (['screws', 'nails', 'bolts', 'specialty'].includes(filter)) {
            return product.category === filter;
          }

          if (['Zunanja uporaba', 'Notranja uporaba'].includes(filter)) {
            return product.usage?.includes(filter);
          }

          if (['Za Notranjo in Zunanjo uporabo'].includes(filter)) {
            return product.usage?.includes(filter);
          }

          return false;
        });
      }

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'packageQuantity-low')
        return (a.packageQuantity || 0) - (b.packageQuantity || 0);
      if (sortBy === 'packageQuantity-high')
        return (b.packageQuantity || 0) - (a.packageQuantity || 0);
      return 0;
    });

  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    toast.success(`${product.name} dodano v košarico!`);
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-slate-900 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl mb-4">Spletna trgovina</h1>
          <p className="text-xl text-slate-200">
            Preglejte naš popoln katalog vrhunskih pritrdilnih elementov
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white border-b sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">

          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                type="text"
                placeholder="Iskanje produktov..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-72">
                <SelectValue placeholder="Razvrsti po" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Ime</SelectItem>
                <SelectItem value="price-low">Cena: od nizke do visoke</SelectItem>
                <SelectItem value="price-high">Cena: od visoke do nizke</SelectItem>
                <SelectItem value="packageQuantity-low">Količina: od najmanjše do največje</SelectItem>
                <SelectItem value="packageQuantity-high">Količina: od največje do najmanjše</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { label: 'Vijaki', value: 'screws' },
              { label: 'Žeblji', value: 'nails' },
              { label: 'Vijačni elementi', value: 'bolts' },
              { label: 'Posebni izdelki', value: 'specialty' },
              { label: 'Zunanja uporaba', value: 'Zunanja uporaba' },
              { label: 'Notranja uporaba', value: 'Notranja uporaba' },
              { label: 'Za Notranjo in Zunanjo uporabo', value: 'Za Notranjo in Zunanjo uporabo' },
            ].map((filter) => (
              <Button
                key={filter.value}
                variant={categoryFilter.includes(filter.value) ? 'default' : 'outline'}
                size="sm"
                onClick={() => toggleFilter(filter.value)}
              >
                {filter.label}
              </Button>
            ))}
          </div>

        </div>
      </section>

      {/* Products */}
      <section className="py-12 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">

          <div className="mb-6">
            <p className="text-slate-600">
              {filteredProducts.length} najdenih produktov
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <Link
                key={product.id}
                to={`/shop/product/${product.id}`}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />

                <div className="p-4">
                  <h3 className="text-sm mb-2 line-clamp-2 min-h-[2.5rem]">
                    {product.name}
                  </h3>

                  <p className="text-xs text-slate-600 mb-3 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-xl text-orange-500">
                      €{product.price.toFixed(2)}
                    </span>

                    <Button
                      size="sm"
                      onClick={(e) => handleAddToCart(product, e)}
                      className="bg-slate-900 hover:bg-slate-800"
                    >
                      <ShoppingCart className="w-4 h-4 mr-1" />
                      Dodaj
                    </Button>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-slate-500">
                Ni najdenih produktov, ki bi ustrezali vašim kriterijem
              </p>
            </div>
          )}

        </div>
      </section>
    </div>
  );
}