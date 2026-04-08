import { useEffect, useState } from 'react';
import { SEO } from '../components/SEO';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { Mail, Linkedin, Twitter, Globe, Star } from 'lucide-react';
import toast from 'react-hot-toast';
import { fetchMentors } from '../services/mentorApi';

export const Mentors = () => {
    const [mentors, setMentors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadMentors = async () => {
            try {
                const data = await fetchMentors();
                setMentors(data);
            } catch (error) {
                toast.error('Unable to load mentors right now');
            } finally {
                setLoading(false);
            }
        };

        loadMentors();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
            <SEO
                title="Our Mentors"
                description="Connect with expert mentors from top companies to accelerate your learning."
                keywords="mentors, experts, learning, guidance, coaching"
            />

            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
                        Learn from the <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-500">Best</span>
                    </h1>
                    <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500 dark:text-gray-400">
                        Get guidance, code reviews, and career advice from industry experts.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {loading ? (
                        <div className="col-span-full text-center text-gray-500">Loading mentors...</div>
                    ) : mentors.length > 0 ? mentors.map((mentor) => (
                        <div key={mentor.id} className="flex flex-col">
                            <Card className="flex-1 hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700">
                                <CardContent className="p-6 flex flex-col h-full">
                                    <div className="flex items-center justify-center mb-6">
                                        <div className="relative">
                                            <img
                                                className="h-24 w-24 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-md"
                                                src={mentor.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(mentor.name)}&background=6366f1&color=fff&size=256&bold=true`}
                                                alt={mentor.name}
                                            />
                                            <div className="absolute bottom-0 right-0 bg-white dark:bg-gray-800 rounded-full p-1 shadow-sm border border-gray-100 dark:border-gray-600">
                                                <div className="flex items-center gap-1 px-2 py-0.5">
                                                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                                                    <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{mentor.rating}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center mb-4">
                                        <h3 className="text-lg font-bold text-gray-900 dark:text-white">{mentor.name}</h3>
                                        <p className="text-sm text-primary-600 dark:text-primary-400 font-medium">{mentor.role}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">at {mentor.company}</p>
                                    </div>

                                    <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-6 flex-grow">
                                        {mentor.bio}
                                    </p>

                                    <div className="space-y-4">
                                        <div className="flex justify-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                                            <span>{mentor.courseCount} courses</span>
                                            <span>{mentor.students} students</span>
                                        </div>

                                        <div className="flex justify-center space-x-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                                            <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                                                <Linkedin className="w-5 h-5" />
                                            </a>
                                            <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                                                <Twitter className="w-5 h-5" />
                                            </a>
                                            <a href="#" className="text-gray-400 hover:text-primary-500 transition-colors">
                                                <Globe className="w-5 h-5" />
                                            </a>
                                        </div>

                                        <Button className="w-full rounded-xl">
                                            Book Session
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )) : (
                        <div className="col-span-full text-center text-gray-500">No mentors found yet.</div>
                    )}
                </div>
            </div>
        </div>
    );
};
