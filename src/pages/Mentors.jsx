import { useState } from 'react';
import { SEO } from '../components/SEO';
import { Card, CardContent } from '../components/Card';
import { Button } from '../components/Button';
import { Mail, Linkedin, Twitter, Globe, Star } from 'lucide-react';

const mentors = [
    {
        id: 1,
        name: 'Dr. Sarah Johnson',
        role: 'Senior Data Scientist',
        company: 'Google',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
        bio: 'Expert in Machine Learning and AI with over 10 years of industry experience.',
        skills: ['Python', 'TensorFlow', 'PyTorch', 'Data Analysis'],
        rating: 4.9,
        students: 1200
    },
    {
        id: 2,
        name: 'Michael Chen',
        role: 'Full Stack Developer',
        company: 'Netflix',
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
        bio: 'Passionate about building scalable web applications and teaching modern web technologies.',
        skills: ['React', 'Node.js', 'TypeScript', 'AWS'],
        rating: 4.8,
        students: 850
    },
    {
        id: 3,
        name: 'Emily Davis',
        role: 'UX Design Lead',
        company: 'Airbnb',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
        bio: 'Creating intuitive and beautiful user experiences. Mentoring designers to reach their full potential.',
        skills: ['Figma', 'User Research', 'Prototyping', 'UI Design'],
        rating: 5.0,
        students: 2000
    },
    {
        id: 4,
        name: 'David Wilson',
        role: 'DevOps Engineer',
        company: 'Microsoft',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80',
        bio: 'Specializing in cloud infrastructure, CI/CD pipelines, and automation.',
        skills: ['Docker', 'Kubernetes', 'Azure', 'Terraform'],
        rating: 4.7,
        students: 600
    }
];

export const Mentors = () => {
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
                    {mentors.map((mentor) => (
                        <div key={mentor.id} className="flex flex-col">
                            <Card className="flex-1 hover:shadow-lg transition-shadow duration-300 dark:bg-gray-800 dark:border-gray-700">
                                <CardContent className="p-6 flex flex-col h-full">
                                    <div className="flex items-center justify-center mb-6">
                                        <div className="relative">
                                            <img
                                                className="h-24 w-24 rounded-full object-cover border-4 border-white dark:border-gray-700 shadow-md"
                                                src={mentor.image}
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
                                        <div className="flex flex-wrap justify-center gap-2">
                                            {mentor.skills.map((skill) => (
                                                <span key={skill} className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full">
                                                    {skill}
                                                </span>
                                            ))}
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
                    ))}
                </div>
            </div>
        </div>
    );
};
