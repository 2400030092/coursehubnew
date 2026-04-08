import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { SEO } from '../components/SEO';
import { CreditCard, Lock, CheckCircle } from 'lucide-react';
import { createEnrollment, fetchCourseById } from '../services/courseApi';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import toast from 'react-hot-toast';

const Payment = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { clearCart } = useCart();
    const [amount, setAmount] = useState(0);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [selectedBank, setSelectedBank] = useState('hdfc');
    const [upiId, setUpiId] = useState('demo@upi');
    const [course, setCourse] = useState(null);

    useEffect(() => {
        // Prefer explicit amount passed via state
        if (location.state?.amount) {
            setAmount(location.state.amount);
        }

        // Also support ?courseId=123 in the URL
        try {
            const params = new URLSearchParams(location.search);
            const cid = params.get('courseId');
            if (cid) {
                fetchCourseById(parseInt(cid, 10))
                    .then((loadedCourse) => {
                        if (loadedCourse) {
                            setCourse(loadedCourse);
                            setAmount(loadedCourse.price || 0);
                        }
                    })
                    .catch((error) => {
                        console.error('Failed to load course for payment', error);
                    });
            }
        } catch (e) { void e; }
    }, [location.state, location.search]);

    const enrollUser = async (targetCourse) => {
        if (!user || !targetCourse) return;
        await createEnrollment({
            studentId: user.id,
            courseId: targetCourse.id
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            if (location.state?.cartItems && user) {
                for (const item of location.state.cartItems) {
                    await createEnrollment({
                        studentId: user.id,
                        courseId: item.id
                    });
                }
                clearCart();
            } else if (course && user) {
                await enrollUser(course);
            }

            setIsProcessing(false);
            setIsSuccess(true);

            setTimeout(() => {
                navigate('/dashboard');
            }, 1600);
        } catch (error) {
            console.error('Payment enrollment failed', error);
            toast.error(error.message || 'Payment completed but enrollment failed');
            setIsProcessing(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
                <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl text-center">
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Payment Successful!</h2>
                    <p className="text-gray-600 dark:text-gray-400">Redirecting you to your dashboard...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <SEO title="Payment" description="Secure online payment" />

            <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:border-gray-700">
                <div className="p-8">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Online payment</h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Please enter any details in the notes section</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                                Enter Amount<span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₹</span>
                                <input
                                    type="number"
                                    value={amount}
                                    readOnly
                                    className="w-full pl-8 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white font-medium focus:outline-none cursor-not-allowed"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">
                                Notes
                            </label>
                            <textarea
                                rows="3"
                                placeholder="Add any details or notes about your purchase here."
                                className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                            ></textarea>
                        </div>

                        <div className="pt-6 border-t border-gray-100 dark:border-gray-700">
                            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Payment Method</h3>

                            <div className="flex gap-2 mb-4">
                                <button type="button" onClick={() => setPaymentMethod('card')} className={`px-3 py-2 rounded ${paymentMethod==='card' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}>Card</button>
                                <button type="button" onClick={() => setPaymentMethod('upi')} className={`px-3 py-2 rounded ${paymentMethod==='upi' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}>UPI</button>
                                <button type="button" onClick={() => setPaymentMethod('netbank')} className={`px-3 py-2 rounded ${paymentMethod==='netbank' ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700'}`}>Netbanking</button>
                            </div>

                            {paymentMethod === 'card' && (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">Card Number<span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                            <input type="text" placeholder="0000 0000 0000 0000" required className="w-full pl-12 pr-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">Expiration<span className="text-red-500">*</span></label>
                                            <input type="text" placeholder="MM/YY" required className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">CVV<span className="text-red-500">*</span></label>
                                            <input type="text" placeholder="123" required maxLength="3" className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">ZIP Code<span className="text-red-500">*</span></label>
                                        <input type="text" placeholder="ZIP" required className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all" />
                                    </div>
                                </div>
                            )}

                            {paymentMethod === 'upi' && (
                                <div className="space-y-4">
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Scan this QR with any UPI app or pay to UPI ID</p>
                                    <div className="flex items-center gap-4">
                                        <img src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(`upi:pay?pa=${upiId}&pn=Demo&am=${amount}`)}&size=200x200`} alt="UPI QR" className="w-36 h-36 bg-white rounded" />
                                        <div>
                                            <div className="text-sm font-medium">UPI ID</div>
                                            <div className="text-lg font-semibold">{upiId}</div>
                                            <div className="mt-2">
                                                <input value={upiId} onChange={(e) => setUpiId(e.target.value)} className="px-3 py-2 rounded border bg-white dark:bg-gray-700" />
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-xs text-gray-500">Sample QR — this is for demo purposes only.</p>
                                </div>
                            )}

                            {paymentMethod === 'netbank' && (
                                <div className="space-y-4">
                                    <label className="block text-sm font-bold text-gray-900 dark:text-white mb-2">Choose your bank</label>
                                    <select value={selectedBank} onChange={(e) => setSelectedBank(e.target.value)} className="w-full px-4 py-3 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg">
                                        <option value="hdfc">HDFC Bank</option>
                                        <option value="sbi">State Bank of India</option>
                                        <option value="icici">ICICI Bank</option>
                                        <option value="axis">Axis Bank</option>
                                    </select>
                                    <p className="text-xs text-gray-500">You will be redirected to a mock netbanking page (demo only).</p>
                                </div>
                            )}
                        </div>

                        <button type="submit" disabled={isProcessing} className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-blue-600/30 transform transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none">
                            {isProcessing ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    <span>Processing...</span>
                                </>
                            ) : (
                                <>
                                    <Lock className="w-4 h-4" />
                                    <span>{paymentMethod === 'upi' ? 'Confirm UPI Payment' : `Pay ₹${amount}`}</span>
                                </>
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Payment;
