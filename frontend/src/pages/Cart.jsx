import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, ArrowRight, BookOpen, X } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { SEO } from '../components/SEO';
import toast from 'react-hot-toast';

export const Cart = () => {
    const { cartItems, removeFromCart, clearCart, getCartTotal } = useCart();
    const { isAuthenticated, isStudent } = useAuth();
    const navigate = useNavigate();

    const handleRemoveItem = (courseId, courseTitle) => {
        removeFromCart(courseId);
        toast.success(`${courseTitle} removed from cart`);
    };

    const handleClearCart = () => {
        if (window.confirm('Are you sure you want to clear your cart?')) {
            clearCart();
            toast.success('Cart cleared');
        }
    };

    const handleCheckout = () => {
        if (!isAuthenticated) {
            toast.error('Please sign in to checkout');
            return;
        }
        if (!isStudent) {
            toast.error('Only students can checkout');
            return;
        }
        navigate('/checkout');
    };

    if (cartItems.length === 0) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                <SEO
                    title="Shopping Cart"
                    description="View and manage your course cart"
                    keywords="cart, shopping cart, courses"
                />
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    <div className="text-center py-20">
                        <div className="w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-6">
                            <ShoppingCart className="w-12 h-12 text-gray-400 dark:text-gray-600" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Your cart is empty</h1>
                        <p className="text-gray-600 dark:text-gray-400 mb-8">
                            Start adding courses to your cart to continue learning!
                        </p>
                        <Link to="/courses">
                            <Button>
                                <BookOpen className="w-4 h-4 mr-2" />
                                Browse Courses
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const total = getCartTotal();

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <SEO
                title="Shopping Cart"
                description="View and manage your course cart"
                keywords="cart, shopping cart, courses"
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Shopping Cart</h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            {cartItems.length} {cartItems.length === 1 ? 'course' : 'courses'} in your cart
                        </p>
                    </div>
                    {cartItems.length > 0 && (
                        <Button variant="outline" onClick={handleClearCart}>
                            <X className="w-4 h-4 mr-2" />
                            Clear Cart
                        </Button>
                    )}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((course) => (
                            <Card key={course.id} className="overflow-hidden">
                                <CardContent className="p-6">
                                    <div className="flex gap-4">
                                        {/* Course Image */}
                                        <div className="flex-shrink-0">
                                            <img
                                                src={course.thumbnail || `https://source.unsplash.com/random/200x150?${course.category}`}
                                                alt={course.title}
                                                className="w-32 h-24 object-cover rounded-lg"
                                                onError={(e) => {
                                                    e.target.src = 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=200&q=80';
                                                }}
                                            />
                                        </div>

                                        {/* Course Info */}
                                        <div className="flex-1 min-w-0">
                                            <Link to={`/courses/${course.id}`}>
                                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors mb-2">
                                                    {course.title}
                                                </h3>
                                            </Link>
                                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                                                {course.description}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                                                    <span className="flex items-center gap-1">
                                                        <BookOpen className="w-4 h-4" />
                                                        {course.category}
                                                    </span>
                                                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 capitalize">
                                                        {course.level}
                                                    </span>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-xl font-bold text-gray-900 dark:text-white">
                                                        {course.price === 0 ? 'Free' : `$${course.price}`}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Remove Button */}
                                        <div className="flex-shrink-0">
                                            <button
                                                onClick={() => handleRemoveItem(course.id, course.title)}
                                                className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                                                title="Remove from cart"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <Card className="lg:sticky lg:top-8">
                            <CardContent className="p-6">
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h2>

                                <div className="space-y-4 mb-6">
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>Subtotal ({cartItems.length} {cartItems.length === 1 ? 'course' : 'courses'})</span>
                                        <span className="font-medium text-gray-900 dark:text-white">${total.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                        <span>Tax</span>
                                        <span className="font-medium text-gray-900 dark:text-white">$0.00</span>
                                    </div>
                                    <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                                        <div className="flex justify-between">
                                            <span className="text-lg font-bold text-gray-900 dark:text-white">Total</span>
                                            <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                                                ${total.toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {isAuthenticated && isStudent ? (
                                    <Button className="w-full mb-4" onClick={handleCheckout}>
                                        Proceed to Checkout
                                        <ArrowRight className="w-4 h-4 ml-2" />
                                    </Button>
                                ) : (
                                    <div className="space-y-3">
                                        <Link to="/login" className="block">
                                            <Button className="w-full">
                                                Sign in to Checkout
                                            </Button>
                                        </Link>
                                        <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
                                            Need an account?{' '}
                                            <Link to="/register" className="text-primary-600 dark:text-primary-400 hover:underline">
                                                Sign up
                                            </Link>
                                        </p>
                                    </div>
                                )}

                                <Link to="/courses" className="block mt-4">
                                    <Button variant="outline" className="w-full">
                                        <BookOpen className="w-4 h-4 mr-2" />
                                        Continue Shopping
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

