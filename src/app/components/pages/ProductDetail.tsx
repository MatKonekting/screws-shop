import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ShoppingCart, ArrowLeft, Check, Truck, Shield, RotateCcw, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';
import { useCart } from '../CartContext';
import { toast } from 'sonner';
import { getProductById, getRelatedProducts, ProductVariant } from '../../data/products';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const product = getProductById(id || '');
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    product?.variants?.[0] || null
  );
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl mb-4">Produkt ni najden</h2>
          <Button onClick={() => navigate('/shop')}>Nazaj na trgovino</Button>
        </div>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 ? product.images : [product.image];
  const relatedProducts = getRelatedProducts(product, 4);

  const currentPrice = selectedVariant?.price || product.price;
  const currentPackageQuantity = selectedVariant?.packageQuantity || product.packageQuantity || 0;
  const isInStock = selectedVariant?.inStock !== false;

  const handleAddToCart = () => {
    const productToAdd = {
      ...product,
      price: currentPrice,
      name: selectedVariant 
        ? `${product.name} - ${selectedVariant.size}` 
        : product.name,
    };
    
    for (let i = 0; i < quantity; i++) {
      addToCart(productToAdd);
    }
    
    toast.success(`${quantity}x ${productToAdd.name} dodano v košarico!`);
  };

  const getCategoryName = (category: string) => {
    const categoryMap: { [key: string]: string } = {
      'screws': 'Vijaki',
      'nails': 'Žeblji',
      'bolts': 'Vijačni elementi',
      'specialty': 'Posebni izdelki',
    };
    return categoryMap[category] || category;
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center text-sm text-slate-600">
            <Link to="/" className="hover:text-orange-500">Domov</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link to="/shop" className="hover:text-orange-500">Trgovina</Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <Link to={`/shop?category=${product.category}`} className="hover:text-orange-500">
              {getCategoryName(product.category)}
            </Link>
            <ChevronRight className="w-4 h-4 mx-2" />
            <span className="text-slate-900">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/shop')}
          className="flex items-center space-x-2"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Nazaj na trgovino</span>
        </Button>
      </div>

      {/* Main Product Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-lg p-6 shadow-md">
          {/* Image Gallery */}
          <div>
            <div className="bg-slate-100 rounded-lg overflow-hidden mb-4">
              <img
                src={images[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-contain p-8"
              />
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`bg-slate-100 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImage === index ? 'border-orange-500' : 'border-transparent'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-20 object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-2">
              <span className="inline-block bg-orange-100 text-orange-600 text-xs px-2 py-1 rounded">
                {getCategoryName(product.category)}
              </span>
            </div>
            
            <h1 className="text-3xl mb-2">{product.name}</h1>
            
            {product.brand && (
              <p className="text-sm text-slate-600 mb-4">Blagovna znamka: {product.brand}</p>
            )}

            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-4xl text-orange-500">€{currentPrice.toFixed(2)}</span>
              <span className="text-slate-600">/ paket ({currentPackageQuantity} kos)</span>
            </div>

            <p className="text-slate-700 mb-6 leading-relaxed">{product.description}</p>

            {/* Size Selector */}
            {product.variants && product.variants.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm mb-2">Izberite velikost:</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {product.variants.map((variant) => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      disabled={!variant.inStock}
                      className={`p-3 border-2 rounded-lg text-sm transition-all ${
                        selectedVariant?.id === variant.id
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-slate-200 hover:border-slate-300'
                      } ${
                        !variant.inStock ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <div className="font-medium">{variant.size}</div>
                      <div className="text-xs text-slate-600">€{variant.price.toFixed(2)}</div>
                      {!variant.inStock && (
                        <div className="text-xs text-red-500 mt-1">Ni na zalogi</div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm mb-2">Količina paketov:</label>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-slate-300 rounded-lg hover:bg-slate-100"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-20 h-10 text-center border border-slate-300 rounded-lg"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-slate-300 rounded-lg hover:bg-slate-100"
                >
                  +
                </button>
                <span className="text-sm text-slate-600">
                  Skupaj: {quantity * currentPackageQuantity} kosov
                </span>
              </div>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {isInStock ? (
                <div className="flex items-center text-green-600">
                  <Check className="w-5 h-5 mr-2" />
                  <span>Na zalogi</span>
                </div>
              ) : (
                <div className="text-red-600">Ni na zalogi</div>
              )}
            </div>

            {/* Add to Cart Button */}
            <Button
              onClick={handleAddToCart}
              disabled={!isInStock}
              className="w-full bg-orange-500 hover:bg-orange-600 h-12 text-lg mb-6"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Dodaj v košarico
            </Button>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-t">
              <div className="flex items-center space-x-3">
                <Truck className="w-6 h-6 text-orange-500" />
                <div className="text-sm">
                  <div className="font-medium">Hitra dostava</div>
                  <div className="text-slate-600">2-3 dni</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Shield className="w-6 h-6 text-orange-500" />
                <div className="text-sm">
                  <div className="font-medium">Garancija</div>
                  <div className="text-slate-600">1 leto</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="w-6 h-6 text-orange-500" />
                <div className="text-sm">
                  <div className="font-medium">Vračilo</div>
                  <div className="text-slate-600">30 dni</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-8 bg-white rounded-lg p-6 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Specifications */}
            {product.specifications && product.specifications.length > 0 && (
              <div>
                <h2 className="text-xl mb-4">Specifikacije</h2>
                <div className="space-y-3">
                  {product.specifications.map((spec, index) => (
                    <div key={index} className="flex justify-between py-2 border-b border-slate-200">
                      <span className="text-slate-600">{spec.label}</span>
                      <span className="font-medium">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div>
                <h2 className="text-xl mb-4">Značilnosti</h2>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Usage */}
          {product.usage && product.usage.length > 0 && (
            <div className="mt-6 pt-6 border-t">
              <h2 className="text-xl mb-4">Priporočena uporaba</h2>
              <div className="flex flex-wrap gap-2">
                {product.usage.map((use, index) => (
                  <span
                    key={index}
                    className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm"
                  >
                    {use}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl mb-6">Podobni produkti</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/shop/product/${relatedProduct.id}`}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                >
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-sm mb-2 line-clamp-2 min-h-[2.5rem]">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-lg text-orange-500">
                      €{relatedProduct.price.toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
