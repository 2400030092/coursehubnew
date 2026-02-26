import { useNavigate } from 'react-router-dom';
import { Trash2, CreditCard, ShieldCheck, ArrowRight } from 'lucide-react';
import { SEO } from '../components/SEO';

const Checkout = () => {
  const navigate = useNavigate();

  // Mock cart data
  const cartItems = [
    {
      id: 1,
      title: 'Complete Web Development Bootcamp',
      instructor: 'Dr. Angela Yu',
      price: 499,
      image: 'https://images.unsplash.com/photo-1593720213428-28a5b9e94613?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    },
    {
      id: 2,
      title: 'Advanced React Patterns',
      instructor: 'Kent C. Dodds',
      price: 299,
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'
    }
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + item.price, 0);
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const total = subtotal + tax;

  const handlePay = () => {
    navigate('/payment', { state: { amount: total, cartItems } });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <SEO title="Checkout" description="Review your order and complete your purchase" />

      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Shopping Cart</h1>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          {/* Cart Items */}
          <section className="lg:col-span-7">
            <div className="bg-white dark:bg-gray-800 shadow-sm rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-700">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {cartItems.map((item) => (
                  <li key={item.id} className="p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                    <div className="flex-shrink-0 w-full sm:w-32 h-32 rounded-xl overflow-hidden bg-gray-200">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 flex flex-col justify-between h-full w-full">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            {item.title}
                          </h3>
                          <p className="text-lg font-bold text-gray-900 dark:text-white">₹{item.price}</p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">By {item.instructor}</p>
                      </div>

                      <div className="mt-4 flex justify-between items-end">
                        <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm font-medium">
                          <ShieldCheck className="w-4 h-4" />
                          <span>Lifetime Access</span>
                        </div>
                        <button className="text-red-500 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Order Summary */}
          <section className="lg:col-span-5 mt-16 lg:mt-0">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 p-8 sticky top-24">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-6">Order Summary</h2>

              <dl className="space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-gray-600 dark:text-gray-400">Subtotal</dt>
                  <dd className="font-medium text-gray-900 dark:text-white">₹{subtotal}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
                  <dt className="flex items-center text-gray-600 dark:text-gray-400">
                    <span>Tax Estimate (18% GST)</span>
                  </dt>
                  <dd className="font-medium text-gray-900 dark:text-white">₹{tax}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
                  <dt className="text-base font-bold text-gray-900 dark:text-white">Order Total</dt>
                  <dd className="text-xl font-bold text-primary-600 dark:text-primary-400">₹{total}</dd>
                </div>
              </dl>

              <div className="mt-8">
                <button
                  onClick={handlePay}
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-700 hover:to-secondary-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-primary-600/30 transform transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Proceed to Payment</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
                <p className="mt-4 text-xs text-center text-gray-500 dark:text-gray-400 flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3 h-3" />
                  Secure Checkout powered by UPI
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
