// Mock data for the frontend-only demo
import { generateCourses, getCuratedThumbnail } from './videoPool';
import { sanitizeCoursePrice } from './helpers';

export const INITIAL_COURSES = [
  {
    id: 1,
    title: 'React Fundamentals',
    description: 'Learn React from scratch with hands-on projects and real-world examples.',
    thumbnail: null,
    price: 99.99,
    category: 'Web Development',
    level: 'beginner',
    status: 'published',
    instructorId: 2,
    firstName: 'Jane',
    lastName: 'Educator',
    instructorAvatar: null,
    enrollmentCount: 150,
    createdAt: '2024-01-15T00:00:00.000Z',
    modules: [
      {
        id: 1,
        title: 'Introduction to React',
        description: 'Getting started with React',
        orderIndex: 1,
        lessons: [
          {
            id: 1,
            title: 'What is React?',
            type: 'video',
            duration: 300,
            orderIndex: 1,
            videoUrl: 'https://www.youtube.com/embed/Tn6-PIqc4UM'
          },
          {
            id: 2,
            title: 'Setting up React Environment',
            type: 'video',
            duration: 480,
            orderIndex: 2,
            videoUrl: 'https://www.youtube.com/embed/SqcY0GlETPk'
          },
          {
            id: 3,
            title: 'Your First React App',
            type: 'video',
            duration: 360,
            orderIndex: 3,
            videoUrl: 'https://www.youtube.com/embed/w7ejDZ8SWv8'
          },
          {
            id: 4,
            title: 'Understanding JSX',
            type: 'video',
            duration: 420,
            orderIndex: 4,
            videoUrl: 'https://www.youtube.com/embed/7fPXI_MnBOY'
          },
          {
            id: 5,
            title: 'React Development Tools',
            type: 'video',
            duration: 300,
            orderIndex: 5,
            videoUrl: 'https://www.youtube.com/embed/DLX62G4lc44'
          }
        ]
      },
      {
        id: 2,
        title: 'Components and Props',
        description: 'Understanding React components',
        orderIndex: 2,
        lessons: [
          {
            id: 6,
            title: 'Creating Components',
            type: 'video',
            duration: 450,
            orderIndex: 1,
            videoUrl: 'https://www.youtube.com/embed/Y2hgEGPzTZY'
          },
          {
            id: 7,
            title: 'Props and State',
            type: 'video',
            duration: 600,
            orderIndex: 2,
            videoUrl: 'https://www.youtube.com/embed/IYvD9oBCuJI'
          },
          {
            id: 8,
            title: 'Component Lifecycle',
            type: 'video',
            duration: 540,
            orderIndex: 3,
            videoUrl: 'https://www.youtube.com/embed/Oioo0IdoEls'
          },
          {
            id: 9,
            title: 'Event Handling',
            type: 'video',
            duration: 390,
            orderIndex: 4,
            videoUrl: 'https://www.youtube.com/embed/Znqv84xi8Vs'
          },
          {
            id: 10,
            title: 'Conditional Rendering',
            type: 'video',
            duration: 330,
            orderIndex: 5,
            videoUrl: 'https://www.youtube.com/embed/7o5FPaVA9m0'
          }
        ]
      },
      {
        id: 3,
        title: 'State Management',
        description: 'Managing state in React applications',
        orderIndex: 3,
        lessons: [
          {
            id: 11,
            title: 'useState Hook',
            type: 'video',
            duration: 420,
            orderIndex: 1,
            videoUrl: 'https://www.youtube.com/embed/O6P86uwfdR0'
          },
          {
            id: 12,
            title: 'useEffect Hook',
            type: 'video',
            duration: 480,
            orderIndex: 2,
            videoUrl: 'https://www.youtube.com/embed/0ZJgIjIuY7U'
          },
          {
            id: 13,
            title: 'useContext Hook',
            type: 'video',
            duration: 360,
            orderIndex: 3,
            videoUrl: 'https://www.youtube.com/embed/5LrDIWkK_Bc'
          },
          {
            id: 14,
            title: 'Custom Hooks',
            type: 'video',
            duration: 510,
            orderIndex: 4,
            videoUrl: 'https://www.youtube.com/embed/6ThXsUwLWvc'
          },
          {
            id: 15,
            title: 'State Best Practices',
            type: 'video',
            duration: 390,
            orderIndex: 5,
            videoUrl: 'https://www.youtube.com/embed/1VVfMVQdx5M'
          }
        ]
      },
      {
        id: 4,
        title: 'Advanced React Concepts',
        description: 'Advanced patterns and techniques',
        orderIndex: 4,
        lessons: [
          {
            id: 16,
            title: 'React Router',
            type: 'video',
            duration: 600,
            orderIndex: 1,
            videoUrl: 'https://www.youtube.com/embed/Law7wfdg_ls'
          },
          {
            id: 17,
            title: 'Form Handling',
            type: 'video',
            duration: 450,
            orderIndex: 2,
            videoUrl: 'https://www.youtube.com/embed/SdzMBWT2CDQ'
          },
          {
            id: 18,
            title: 'API Integration',
            type: 'video',
            duration: 540,
            orderIndex: 3,
            videoUrl: 'https://www.youtube.com/embed/cuEtnrL9-H0'
          },
          {
            id: 19,
            title: 'Performance Optimization',
            type: 'video',
            duration: 480,
            orderIndex: 4,
            videoUrl: 'https://www.youtube.com/embed/uojLJFt9SzY'
          },
          {
            id: 20,
            title: 'Testing React Apps',
            type: 'video',
            duration: 420,
            orderIndex: 5,
            videoUrl: 'https://www.youtube.com/embed/8Xwq35cPwYg'
          }
        ]
      }
    ]
  },
  {
    id: 2,
    title: 'Advanced JavaScript',
    description: 'Master advanced JavaScript concepts including ES6+, async programming, and design patterns.',
    thumbnail: null,
    price: 149.99,
    category: 'Web Development',
    level: 'intermediate',
    status: 'published',
    instructorId: 2,
    firstName: 'Jane',
    lastName: 'Educator',
    instructorAvatar: null,
    enrollmentCount: 89,
    createdAt: '2024-01-10T00:00:00.000Z',
    modules: [
      {
        id: 5,
        title: 'ES6+ Features',
        description: 'Modern JavaScript features',
        orderIndex: 1,
        lessons: [
          {
            id: 21,
            title: 'Arrow Functions',
            type: 'video',
            duration: 240,
            orderIndex: 1,
            videoUrl: 'https://www.youtube.com/embed/h33Srr5J9nY'
          },
          {
            id: 22,
            title: 'Destructuring',
            type: 'video',
            duration: 300,
            orderIndex: 2,
            videoUrl: 'https://www.youtube.com/embed/NIq3qLaHCIs'
          },
          {
            id: 23,
            title: 'Template Literals',
            type: 'video',
            duration: 180,
            orderIndex: 3,
            videoUrl: 'https://www.youtube.com/embed/NgF9-pdTDGs'
          },
          {
            id: 24,
            title: 'Spread and Rest Operators',
            type: 'video',
            duration: 360,
            orderIndex: 4,
            videoUrl: 'https://www.youtube.com/embed/iLx4ma8ZqvQ'
          },
          {
            id: 25,
            title: 'Modules Import/Export',
            type: 'video',
            duration: 420,
            orderIndex: 5,
            videoUrl: 'https://www.youtube.com/embed/cRHQNNcYf6s'
          }
        ]
      },
      {
        id: 6,
        title: 'Async Programming',
        description: 'Promises, async/await, and asynchronous patterns',
        orderIndex: 2,
        lessons: [
          {
            id: 26,
            title: 'Understanding Promises',
            type: 'video',
            duration: 480,
            orderIndex: 1,
            videoUrl: 'https://www.youtube.com/embed/DHvZLI7Db8E'
          },
          {
            id: 27,
            title: 'Async/Await',
            type: 'video',
            duration: 360,
            orderIndex: 2,
            videoUrl: 'https://www.youtube.com/embed/V_Kr9OSfDeU'
          },
          {
            id: 28,
            title: 'Fetch API',
            type: 'video',
            duration: 300,
            orderIndex: 3,
            videoUrl: 'https://www.youtube.com/embed/cuEtnrL9-H0'
          },
          {
            id: 29,
            title: 'Error Handling',
            type: 'video',
            duration: 240,
            orderIndex: 4,
            videoUrl: 'https://www.youtube.com/embed/Pv1tulWR3ck'
          },
          {
            id: 30,
            title: 'Promise Chaining',
            type: 'video',
            duration: 330,
            orderIndex: 5,
            videoUrl: 'https://www.youtube.com/embed/s6SH72uAn3Q'
          }
        ]
      },
      {
        id: 7,
        title: 'Advanced Functions',
        description: 'Closures, higher-order functions, and functional programming',
        orderIndex: 3,
        lessons: [
          {
            id: 31,
            title: 'Closures Explained',
            type: 'video',
            duration: 420,
            orderIndex: 1,
            videoUrl: 'https://www.youtube.com/embed/3a0I8ICR1Vg'
          },
          {
            id: 32,
            title: 'Higher-Order Functions',
            type: 'video',
            duration: 360,
            orderIndex: 2,
            videoUrl: 'https://www.youtube.com/embed/BMUiFMZr7vk'
          },
          {
            id: 33,
            title: 'Map, Filter, Reduce',
            type: 'video',
            duration: 480,
            orderIndex: 3,
            videoUrl: 'https://www.youtube.com/embed/rRgD1yVwIvE'
          },
          {
            id: 34,
            title: 'Function Composition',
            type: 'video',
            duration: 300,
            orderIndex: 4,
            videoUrl: 'https://www.youtube.com/embed/sFTGEs2WXQ4'
          },
          {
            id: 35,
            title: 'Currying and Partial Application',
            type: 'video',
            duration: 390,
            orderIndex: 5,
            videoUrl: 'https://www.youtube.com/embed/iZLP4qOwY8I'
          }
        ]
      },
      {
        id: 8,
        title: 'Design Patterns',
        description: 'Common JavaScript design patterns and best practices',
        orderIndex: 4,
        lessons: [
          {
            id: 36,
            title: 'Module Pattern',
            type: 'video',
            duration: 360,
            orderIndex: 1,
            videoUrl: 'https://www.youtube.com/embed/HkFlM73G-hk'
          },
          {
            id: 37,
            title: 'Observer Pattern',
            type: 'video',
            duration: 420,
            orderIndex: 2,
            videoUrl: 'https://www.youtube.com/embed/_BpmfnqjgzQ'
          },
          {
            id: 38,
            title: 'Factory Pattern',
            type: 'video',
            duration: 300,
            orderIndex: 3,
            videoUrl: 'https://www.youtube.com/embed/kuirGzhGhyw'
          },
          {
            id: 39,
            title: 'Singleton Pattern',
            type: 'video',
            duration: 240,
            orderIndex: 4,
            videoUrl: 'https://www.youtube.com/embed/sJ-c3BA-Ypo'
          },
          {
            id: 40,
            title: 'MVC Pattern',
            type: 'video',
            duration: 480,
            orderIndex: 5,
            videoUrl: 'https://www.youtube.com/embed/DUg2SWWK18I'
          }
        ]
      }
    ]
  },
  {
    id: 3,
    title: 'UI/UX Design Principles',
    description: 'Learn the fundamentals of user interface and user experience design.',
    thumbnail: null,
    price: 79.99,
    category: 'Design',
    level: 'beginner',
    status: 'published',
    instructorId: 2,
    firstName: 'Jane',
    lastName: 'Educator',
    instructorAvatar: null,
    enrollmentCount: 203,
    createdAt: '2024-01-05T00:00:00.000Z',
    modules: [
      {
        id: 9,
        title: 'Design Fundamentals',
        description: 'Basic design principles',
        orderIndex: 1,
        lessons: [
          {
            id: 41,
            title: 'Color Theory',
            type: 'video',
            duration: 360,
            orderIndex: 1,
            videoUrl: 'https://www.youtube.com/embed/Qj1FK8n7WgY'
          },
          {
            id: 42,
            title: 'Typography',
            type: 'video',
            duration: 420,
            orderIndex: 2,
            videoUrl: 'https://www.youtube.com/embed/sByzHoiYFX0'
          },
          {
            id: 43,
            title: 'Layout and Composition',
            type: 'video',
            duration: 480,
            orderIndex: 3,
            videoUrl: 'https://www.youtube.com/embed/a5KYlHNKQB8'
          },
          {
            id: 44,
            title: 'Visual Hierarchy',
            type: 'video',
            duration: 300,
            orderIndex: 4,
            videoUrl: 'https://www.youtube.com/embed/qZWDJqY27bw'
          },
          {
            id: 45,
            title: 'Design Systems',
            type: 'video',
            duration: 540,
            orderIndex: 5,
            videoUrl: 'https://www.youtube.com/embed/wc5krSHtFP4'
          }
        ]
      },
      {
        id: 10,
        title: 'User Experience Basics',
        description: 'Understanding user needs and behavior',
        orderIndex: 2,
        lessons: [
          {
            id: 46,
            title: 'User Research Methods',
            type: 'video',
            duration: 450,
            orderIndex: 1,
            videoUrl: 'https://www.youtube.com/embed/Ovj4hFxko7c'
          },
          {
            id: 47,
            title: 'Creating User Personas',
            type: 'video',
            duration: 360,
            orderIndex: 2,
            videoUrl: 'https://www.youtube.com/embed/XnG4c4gXaQY'
          },
          {
            id: 48,
            title: 'User Journey Mapping',
            type: 'video',
            duration: 420,
            orderIndex: 3,
            videoUrl: 'https://www.youtube.com/embed/mSxpVRo3BLg'
          },
          {
            id: 49,
            title: 'Information Architecture',
            type: 'video',
            duration: 390,
            orderIndex: 4,
            videoUrl: 'https://www.youtube.com/embed/ka1d3YP8lVc'
          },
          {
            id: 50,
            title: 'Wireframing Basics',
            type: 'video',
            duration: 480,
            orderIndex: 5,
            videoUrl: 'https://www.youtube.com/embed/qpH7-KFWZRI'
          }
        ]
      },
      {
        id: 11,
        title: 'Interface Design',
        description: 'Creating beautiful and functional interfaces',
        orderIndex: 3,
        lessons: [
          {
            id: 51,
            title: 'UI Design Principles',
            type: 'video',
            duration: 420,
            orderIndex: 1,
            videoUrl: 'https://www.youtube.com/embed/RFv53AxxQAo'
          },
          {
            id: 52,
            title: 'Button and Form Design',
            type: 'video',
            duration: 360,
            orderIndex: 2,
            videoUrl: 'https://www.youtube.com/embed/YiLUYf4HDh4'
          },
          {
            id: 53,
            title: 'Navigation Design',
            type: 'video',
            duration: 300,
            orderIndex: 3,
            videoUrl: 'https://www.youtube.com/embed/MqQdZMhf7EU'
          },
          {
            id: 54,
            title: 'Mobile UI Patterns',
            type: 'video',
            duration: 450,
            orderIndex: 4,
            videoUrl: 'https://www.youtube.com/embed/WZQNb01oNvs'
          },
          {
            id: 55,
            title: 'Responsive Design',
            type: 'video',
            duration: 540,
            orderIndex: 5,
            videoUrl: 'https://www.youtube.com/embed/srvUrASNdxk'
          }
        ]
      },
      {
        id: 12,
        title: 'Design Tools and Prototyping',
        description: 'Using design tools and creating prototypes',
        orderIndex: 4,
        lessons: [
          {
            id: 56,
            title: 'Figma Basics',
            type: 'video',
            duration: 600,
            orderIndex: 1,
            videoUrl: 'https://www.youtube.com/embed/FTFaQWZBqQ8'
          },
          {
            id: 57,
            title: 'Creating Interactive Prototypes',
            type: 'video',
            duration: 480,
            orderIndex: 2,
            videoUrl: 'https://www.youtube.com/embed/X5qiBwqptek'
          },
          {
            id: 58,
            title: 'Design Handoff',
            type: 'video',
            duration: 300,
            orderIndex: 3,
            videoUrl: 'https://www.youtube.com/embed/LpVV_R7oh3s'
          },
          {
            id: 59,
            title: 'Usability Testing',
            type: 'video',
            duration: 420,
            orderIndex: 4,
            videoUrl: 'https://www.youtube.com/embed/v8JJrDvQDF4'
          },
          {
            id: 60,
            title: 'Design Iteration',
            type: 'video',
            duration: 360,
            orderIndex: 5,
            videoUrl: 'https://www.youtube.com/embed/XRd6Ddn4ZSY'
          }
        ]
      }
    ]
  },
  {
    id: 4,
    title: 'Data Science with Python',
    description: 'Complete guide to data science using Python, pandas, and machine learning.',
    thumbnail: null,
    price: 199.99,
    category: 'Data Science',
    level: 'intermediate',
    status: 'published',
    instructorId: 2,
    firstName: 'Jane',
    lastName: 'Educator',
    instructorAvatar: null,
    enrollmentCount: 67,
    createdAt: '2024-01-20T00:00:00.000Z',
    modules: [
      {
        id: 13,
        title: 'Python Basics',
        description: 'Introduction to Python for data science',
        orderIndex: 1,
        lessons: [
          {
            id: 61,
            title: 'Python Environment Setup',
            type: 'video',
            duration: 180,
            orderIndex: 1,
            videoUrl: 'https://www.youtube.com/embed/rfscVS0vtbw'
          },
          {
            id: 62,
            title: 'Data Types and Structures',
            type: 'video',
            duration: 300,
            orderIndex: 2,
            videoUrl: 'https://www.youtube.com/embed/khKv-8q7YmY'
          },
          {
            id: 63,
            title: 'Control Flow and Functions',
            type: 'video',
            duration: 420,
            orderIndex: 3,
            videoUrl: 'https://www.youtube.com/embed/DlkMs4ZHHr8'
          },
          {
            id: 64,
            title: 'File Handling and Modules',
            type: 'video',
            duration: 360,
            orderIndex: 4,
            videoUrl: 'https://www.youtube.com/embed/Uh2ebFW8OYM'
          },
          {
            id: 65,
            title: 'Error Handling and Debugging',
            type: 'video',
            duration: 240,
            orderIndex: 5,
            videoUrl: 'https://www.youtube.com/embed/NIWwJbo-9_8'
          }
        ]
      },
      {
        id: 14,
        title: 'Data Analysis with Pandas',
        description: 'Working with data using pandas library',
        orderIndex: 2,
        lessons: [
          {
            id: 66,
            title: 'Introduction to Pandas',
            type: 'video',
            duration: 480,
            orderIndex: 1,
            videoUrl: 'https://www.youtube.com/embed/vmEHCJofslg'
          },
          {
            id: 67,
            title: 'DataFrames and Series',
            type: 'video',
            duration: 420,
            orderIndex: 2,
            videoUrl: 'https://www.youtube.com/embed/e60ItwlZTKM'
          },
          {
            id: 68,
            title: 'Data Cleaning and Preprocessing',
            type: 'video',
            duration: 540,
            orderIndex: 3,
            videoUrl: 'https://www.youtube.com/embed/bDhvCp3_lYw'
          },
          {
            id: 69,
            title: 'Data Aggregation and Grouping',
            type: 'video',
            duration: 360,
            orderIndex: 4,
            videoUrl: 'https://www.youtube.com/embed/txMdrV1Ut64'
          },
          {
            id: 70,
            title: 'Merging and Joining Data',
            type: 'video',
            duration: 300,
            orderIndex: 5,
            videoUrl: 'https://www.youtube.com/embed/h4hOPGo4UVU'
          }
        ]
      },
      {
        id: 15,
        title: 'Data Visualization',
        description: 'Creating charts and graphs with matplotlib and seaborn',
        orderIndex: 3,
        lessons: [
          {
            id: 71,
            title: 'Matplotlib Basics',
            type: 'video',
            duration: 420,
            orderIndex: 1,
            videoUrl: 'https://www.youtube.com/embed/UO98lJQ3QGI'
          },
          {
            id: 72,
            title: 'Advanced Plotting Techniques',
            type: 'video',
            duration: 480,
            orderIndex: 2,
            videoUrl: 'https://www.youtube.com/embed/a9UrKTVEeZA'
          },
          {
            id: 73,
            title: 'Seaborn for Statistical Plots',
            type: 'video',
            duration: 360,
            orderIndex: 3,
            videoUrl: 'https://www.youtube.com/embed/6GUZXDef2U0'
          },
          {
            id: 74,
            title: 'Interactive Visualizations',
            type: 'video',
            duration: 540,
            orderIndex: 4,
            videoUrl: 'https://www.youtube.com/embed/hSPmj7mK6ng'
          },
          {
            id: 75,
            title: 'Dashboard Creation',
            type: 'video',
            duration: 600,
            orderIndex: 5,
            videoUrl: 'https://www.youtube.com/embed/7yAw1nPareM'
          }
        ]
      },
      {
        id: 16,
        title: 'Machine Learning Fundamentals',
        description: 'Introduction to machine learning with scikit-learn',
        orderIndex: 4,
        lessons: [
          {
            id: 76,
            title: 'ML Concepts and Types',
            type: 'video',
            duration: 480,
            orderIndex: 1,
            videoUrl: 'https://www.youtube.com/embed/ukzFI9rgwfU'
          },
          {
            id: 77,
            title: 'Linear Regression',
            type: 'video',
            duration: 420,
            orderIndex: 2,
            videoUrl: 'https://www.youtube.com/embed/7ArmBVF2dCs'
          },
          {
            id: 78,
            title: 'Classification Algorithms',
            type: 'video',
            duration: 540,
            orderIndex: 3,
            videoUrl: 'https://www.youtube.com/embed/yIYKR4sgzI8'
          },
          {
            id: 79,
            title: 'Model Evaluation and Validation',
            type: 'video',
            duration: 360,
            orderIndex: 4,
            videoUrl: 'https://www.youtube.com/embed/fSytzGwwBVw'
          },
          {
            id: 80,
            title: 'Feature Engineering',
            type: 'video',
            duration: 480,
            orderIndex: 5,
            videoUrl: 'https://www.youtube.com/embed/6WDFfaYtN6s'
          }
        ]
      }
    ]
  },
  {
    id: 5,
    title: 'Digital Marketing Strategy',
    description: 'Learn how to create and execute effective digital marketing campaigns.',
    thumbnail: null,
    price: 129.99,
    category: 'Marketing',
    level: 'beginner',
    status: 'published',
    instructorId: 2,
    firstName: 'Jane',
    lastName: 'Educator',
    instructorAvatar: null,
    enrollmentCount: 134,
    createdAt: '2024-01-12T00:00:00.000Z',
    modules: [
      {
        id: 17,
        title: 'Marketing Fundamentals',
        description: 'Basic marketing concepts',
        orderIndex: 1,
        lessons: [
          {
            id: 81,
            title: 'Understanding Your Audience',
            type: 'video',
            duration: 240,
            orderIndex: 1,
            videoUrl: 'https://www.youtube.com/embed/naIkpQ_cIt0'
          },
          {
            id: 82,
            title: 'Content Strategy',
            type: 'video',
            duration: 360,
            orderIndex: 2,
            videoUrl: 'https://www.youtube.com/embed/B_2_3q8A8nE'
          },
          {
            id: 83,
            title: 'Brand Development',
            type: 'video',
            duration: 420,
            orderIndex: 3,
            videoUrl: 'https://www.youtube.com/embed/iVRou3ctMxU'
          },
          {
            id: 84,
            title: 'Market Research',
            type: 'video',
            duration: 300,
            orderIndex: 4,
            videoUrl: 'https://www.youtube.com/embed/fVcQsS9x2N4'
          },
          {
            id: 85,
            title: 'Competitive Analysis',
            type: 'video',
            duration: 480,
            orderIndex: 5,
            videoUrl: 'https://www.youtube.com/embed/MqQdZMhf7EU'
          }
        ]
      },
      {
        id: 18,
        title: 'Social Media Marketing',
        description: 'Leveraging social platforms for marketing',
        orderIndex: 2,
        lessons: [
          {
            id: 86,
            title: 'Social Media Strategy',
            type: 'video',
            duration: 360,
            orderIndex: 1,
            videoUrl: 'https://www.youtube.com/embed/R1ZVZh_pvfQ'
          },
          {
            id: 87,
            title: 'Facebook and Instagram Marketing',
            type: 'video',
            duration: 480,
            orderIndex: 2,
            videoUrl: 'https://www.youtube.com/embed/ohBN2wriDyw'
          },
          {
            id: 88,
            title: 'Twitter and LinkedIn Marketing',
            type: 'video',
            duration: 420,
            orderIndex: 3,
            videoUrl: 'https://www.youtube.com/embed/BHK1uFpVy-w'
          },
          {
            id: 89,
            title: 'Content Creation for Social Media',
            type: 'video',
            duration: 540,
            orderIndex: 4,
            videoUrl: 'https://www.youtube.com/embed/8b9Xq7Dq-wM'
          },
          {
            id: 90,
            title: 'Social Media Analytics',
            type: 'video',
            duration: 300,
            orderIndex: 5,
            videoUrl: 'https://www.youtube.com/embed/gvTNl6InKss'
          }
        ]
      },
      {
        id: 19,
        title: 'Email Marketing',
        description: 'Building and managing email campaigns',
        orderIndex: 3,
        lessons: [
          {
            id: 91,
            title: 'Email Marketing Basics',
            type: 'video',
            duration: 300,
            orderIndex: 1,
            videoUrl: 'https://www.youtube.com/embed/YQiQMhJGNYE'
          },
          {
            id: 92,
            title: 'Building Email Lists',
            type: 'video',
            duration: 420,
            orderIndex: 2,
            videoUrl: 'https://www.youtube.com/embed/gEBUU6QfVzs'
          },
          {
            id: 93,
            title: 'Email Design and Templates',
            type: 'video',
            duration: 360,
            orderIndex: 3,
            videoUrl: 'https://www.youtube.com/embed/BKKcGb80MjQ'
          },
          {
            id: 94,
            title: 'Automation and Sequences',
            type: 'video',
            duration: 480,
            orderIndex: 4,
            videoUrl: 'https://www.youtube.com/embed/E_eIqGSLh6s'
          },
          {
            id: 95,
            title: 'Email Analytics and Optimization',
            type: 'video',
            duration: 240,
            orderIndex: 5,
            videoUrl: 'https://www.youtube.com/embed/wKJ9KzGQq0w'
          }
        ]
      },
      {
        id: 20,
        title: 'Digital Advertising',
        description: 'Paid advertising strategies and platforms',
        orderIndex: 4,
        lessons: [
          {
            id: 96,
            title: 'Google Ads Fundamentals',
            type: 'video',
            duration: 540,
            orderIndex: 1,
            videoUrl: 'https://www.youtube.com/embed/MvkodlMcklM'
          },
          {
            id: 97,
            title: 'Facebook Ads Manager',
            type: 'video',
            duration: 480,
            orderIndex: 2,
            videoUrl: 'https://www.youtube.com/embed/lbKRoSPlQ5c'
          },
          {
            id: 98,
            title: 'Display and Video Advertising',
            type: 'video',
            duration: 420,
            orderIndex: 3,
            videoUrl: 'https://www.youtube.com/embed/BKKcGb80MjQ'
          },
          {
            id: 99,
            title: 'Campaign Optimization',
            type: 'video',
            duration: 360,
            orderIndex: 4,
            videoUrl: 'https://www.youtube.com/embed/gvTNl6InKss'
          },
          {
            id: 100,
            title: 'ROI and Performance Tracking',
            type: 'video',
            duration: 300,
            orderIndex: 5,
            videoUrl: 'https://www.youtube.com/embed/wKJ9KzGQq0w'
          }
        ]
      }
    ]
  },
  {
    id: 6,
    title: 'Photography Masterclass',
    description: 'Professional photography techniques for beginners and intermediate photographers.',
    thumbnail: null,
    price: 89.99,
    category: 'Photography',
    level: 'beginner',
    status: 'published',
    instructorId: 2,
    firstName: 'Jane',
    lastName: 'Educator',
    instructorAvatar: null,
    enrollmentCount: 98,
    createdAt: '2024-01-08T00:00:00.000Z',
    modules: [
      {
        id: 21,
        title: 'Camera Basics',
        description: 'Understanding your camera',
        orderIndex: 1,
        lessons: [
          {
            id: 101,
            title: 'Camera Settings',
            type: 'video',
            duration: 300,
            orderIndex: 1,
            videoUrl: 'https://www.youtube.com/embed/V7z7BAZdt2M'
          },
          {
            id: 102,
            title: 'Composition Rules',
            type: 'video',
            duration: 420,
            orderIndex: 2,
            videoUrl: 'https://www.youtube.com/embed/7ZVyNjKSr0M'
          },
          {
            id: 103,
            title: 'Understanding Exposure',
            type: 'video',
            duration: 480,
            orderIndex: 3,
            videoUrl: 'https://www.youtube.com/embed/F8T94sdiNjc'
          },
          {
            id: 104,
            title: 'Focus and Depth of Field',
            type: 'video',
            duration: 360,
            orderIndex: 4,
            videoUrl: 'https://www.youtube.com/embed/34HBcGjsSWs'
          },
          {
            id: 105,
            title: 'Camera Modes Explained',
            type: 'video',
            duration: 300,
            orderIndex: 5,
            videoUrl: 'https://www.youtube.com/embed/M6lGth6B8NY'
          }
        ]
      },
      {
        id: 22,
        title: 'Lighting Techniques',
        description: 'Mastering natural and artificial lighting',
        orderIndex: 2,
        lessons: [
          {
            id: 106,
            title: 'Natural Light Photography',
            type: 'video',
            duration: 420,
            orderIndex: 1,
            videoUrl: 'https://www.youtube.com/embed/1xgCoJbDPTE'
          },
          {
            id: 107,
            title: 'Golden Hour and Blue Hour',
            type: 'video',
            duration: 360,
            orderIndex: 2,
            videoUrl: 'https://www.youtube.com/embed/3_LEAey5_Ys'
          },
          {
            id: 108,
            title: 'Studio Lighting Setup',
            type: 'video',
            duration: 540,
            orderIndex: 3,
            videoUrl: 'https://www.youtube.com/embed/Qe10ExwzCqk'
          },
          {
            id: 109,
            title: 'Flash Photography',
            type: 'video',
            duration: 480,
            orderIndex: 4,
            videoUrl: 'https://www.youtube.com/embed/dmGh4yiiuSs'
          },
          {
            id: 110,
            title: 'Light Modifiers and Reflectors',
            type: 'video',
            duration: 300,
            orderIndex: 5,
            videoUrl: 'https://www.youtube.com/embed/VL6-MsZdHmA'
          }
        ]
      },
      {
        id: 23,
        title: 'Portrait Photography',
        description: 'Capturing stunning portraits',
        orderIndex: 3,
        lessons: [
          {
            id: 111,
            title: 'Portrait Composition',
            type: 'video',
            duration: 360,
            orderIndex: 1,
            videoUrl: 'https://www.youtube.com/embed/kmi9TPQ57Mo'
          },
          {
            id: 112,
            title: 'Posing Techniques',
            type: 'video',
            duration: 480,
            orderIndex: 2,
            videoUrl: 'https://www.youtube.com/embed/ff7nltdBCHs'
          },
          {
            id: 113,
            title: 'Working with Models',
            type: 'video',
            duration: 420,
            orderIndex: 3,
            videoUrl: 'https://www.youtube.com/embed/Qe10ExwzCqk'
          },
          {
            id: 114,
            title: 'Environmental Portraits',
            type: 'video',
            duration: 390,
            orderIndex: 4,
            videoUrl: 'https://www.youtube.com/embed/1xgCoJbDPTE'
          },
          {
            id: 115,
            title: 'Headshot Photography',
            type: 'video',
            duration: 540,
            orderIndex: 5,
            videoUrl: 'https://www.youtube.com/embed/dmGh4yiiuSs'
          }
        ]
      },
      {
        id: 24,
        title: 'Post-Processing and Editing',
        description: 'Enhancing your photos with editing software',
        orderIndex: 4,
        lessons: [
          {
            id: 116,
            title: 'Lightroom Basics',
            type: 'video',
            duration: 600,
            orderIndex: 1,
            videoUrl: 'https://www.youtube.com/embed/SYeqJTwZWL4'
          },
          {
            id: 117,
            title: 'Color Correction and Grading',
            type: 'video',
            duration: 480,
            orderIndex: 2,
            videoUrl: 'https://www.youtube.com/embed/rgKBBz8rGvY'
          },
          {
            id: 118,
            title: 'Photoshop for Photographers',
            type: 'video',
            duration: 720,
            orderIndex: 3,
            videoUrl: 'https://www.youtube.com/embed/IyR_uYsRdPs'
          },
          {
            id: 119,
            title: 'Retouching Techniques',
            type: 'video',
            duration: 540,
            orderIndex: 4,
            videoUrl: 'https://www.youtube.com/embed/VL6-MsZdHmA'
          },
          {
            id: 120,
            title: 'Creating Your Style',
            type: 'video',
            duration: 360,
            orderIndex: 5,
            videoUrl: 'https://www.youtube.com/embed/3_LEAey5_Ys'
          }
        ]
      }
    ]
  },
  {
    id: 7,
    title: 'Business Strategy and Planning',
    description: 'Learn to create effective business strategies and execute successful plans.',
    thumbnail: null,
    price: 179.99,
    category: 'Business',
    level: 'intermediate',
    status: 'published',
    instructorId: 2,
    firstName: 'Jane',
    lastName: 'Educator',
    instructorAvatar: null,
    enrollmentCount: 112,
    createdAt: '2024-01-03T00:00:00.000Z',
    modules: [
      {
        id: 25,
        title: 'Business Fundamentals',
        description: 'Core business concepts',
        orderIndex: 1,
        lessons: [
          { id: 121, title: 'Strategic Planning Basics', type: 'video', duration: 420, orderIndex: 1, videoUrl: 'https://www.youtube.com/embed/MFsBFC8yl5k' },
          { id: 122, title: 'Market Analysis', type: 'video', duration: 480, orderIndex: 2, videoUrl: 'https://www.youtube.com/embed/fVcQsS9x2N4' },
          { id: 123, title: 'Competitive Advantage', type: 'video', duration: 360, orderIndex: 3, videoUrl: 'https://www.youtube.com/embed/vVsXO9brK7M' },
          { id: 124, title: 'Business Models', type: 'video', duration: 540, orderIndex: 4, videoUrl: 'https://www.youtube.com/embed/TUMXJzLNdM0' },
          { id: 125, title: 'Financial Planning', type: 'video', duration: 600, orderIndex: 5, videoUrl: 'https://www.youtube.com/embed/dLDM4Cm3R2M' }
        ]
      }
    ]
  },
  {
    id: 8,
    title: 'Music Production Fundamentals',
    description: 'Create professional music tracks from scratch using industry-standard tools.',
    thumbnail: null,
    price: 119.99,
    category: 'Music',
    level: 'beginner',
    status: 'published',
    instructorId: 2,
    firstName: 'Jane',
    lastName: 'Educator',
    instructorAvatar: null,
    enrollmentCount: 76,
    createdAt: '2024-01-02T00:00:00.000Z',
    modules: [
      {
        id: 26,
        title: 'Music Theory Basics',
        description: 'Understanding music fundamentals',
        orderIndex: 1,
        lessons: [
          { id: 126, title: 'Music Theory 101', type: 'video', duration: 360, orderIndex: 1, videoUrl: 'https://www.youtube.com/embed/5Y01jIorpeA' },
          { id: 127, title: 'Rhythm and Tempo', type: 'video', duration: 300, orderIndex: 2, videoUrl: 'https://www.youtube.com/embed/xyMRwSKMUbE' },
          { id: 128, title: 'Chord Progressions', type: 'video', duration: 420, orderIndex: 3, videoUrl: 'https://www.youtube.com/embed/MJy7nJT8S9g' },
          { id: 129, title: 'Melody Writing', type: 'video', duration: 480, orderIndex: 4, videoUrl: 'https://www.youtube.com/embed/MJy7nJT8S9g' },
          { id: 130, title: 'Audio Mixing Basics', type: 'video', duration: 540, orderIndex: 5, videoUrl: 'https://www.youtube.com/embed/TEjOdqZFvhY' }
        ]
      }
    ]
  },
  {
    id: 9,
    title: 'Mobile App Development with Flutter',
    description: 'Build beautiful cross-platform mobile applications with Flutter and Dart.',
    thumbnail: null,
    price: 169.99,
    category: 'Development',
    level: 'intermediate',
    status: 'published',
    instructorId: 2,
    firstName: 'Jane',
    lastName: 'Educator',
    instructorAvatar: null,
    enrollmentCount: 145,
    createdAt: '2024-01-25T00:00:00.000Z',
    modules: [
      {
        id: 27,
        title: 'Flutter Basics',
        description: 'Getting started with Flutter',
        orderIndex: 1,
        lessons: [
          { id: 131, title: 'Introduction to Flutter', type: 'video', duration: 360, orderIndex: 1, videoUrl: 'https://www.youtube.com/embed/1xipg02Wu8s' },
          { id: 132, title: 'Dart Programming', type: 'video', duration: 480, orderIndex: 2, videoUrl: 'https://www.youtube.com/embed/Fqcsow_7go4' },
          { id: 133, title: 'Flutter Widgets', type: 'video', duration: 420, orderIndex: 3, videoUrl: 'https://www.youtube.com/embed/1xipg02Wu8s' },
          { id: 134, title: 'State Management', type: 'video', duration: 540, orderIndex: 4, videoUrl: 'https://www.youtube.com/embed/d_m5csmrf7I' },
          { id: 135, title: 'Navigation and Routing', type: 'video', duration: 360, orderIndex: 5, videoUrl: 'https://www.youtube.com/embed/nyvwx7o277U' }
        ]
      }
    ]
  },
  {
    id: 10,
    title: 'Graphic Design with Adobe Illustrator',
    description: 'Master vector graphics and create stunning designs with Adobe Illustrator.',
    thumbnail: null,
    price: 99.99,
    category: 'Design',
    level: 'beginner',
    status: 'published',
    instructorId: 2,
    firstName: 'Jane',
    lastName: 'Educator',
    instructorAvatar: null,
    enrollmentCount: 188,
    createdAt: '2024-01-18T00:00:00.000Z',
    modules: [
      {
        id: 28,
        title: 'Illustrator Fundamentals',
        description: 'Learning the basics',
        orderIndex: 1,
        lessons: [
          { id: 136, title: 'Interface Overview', type: 'video', duration: 300, orderIndex: 1, videoUrl: 'https://www.youtube.com/embed/_-3bKs04RsA' },
          { id: 137, title: 'Vector Graphics Basics', type: 'video', duration: 420, orderIndex: 2, videoUrl: 'https://www.youtube.com/embed/p2iL0x9LRKs' },
          { id: 138, title: 'Pen Tool Mastery', type: 'video', duration: 480, orderIndex: 3, videoUrl: 'https://www.youtube.com/embed/-G9-gJEOzns' },
          { id: 139, title: 'Working with Shapes', type: 'video', duration: 360, orderIndex: 4, videoUrl: 'https://www.youtube.com/embed/ZtBZiNf41Ic' },
          { id: 140, title: 'Color and Gradients', type: 'video', duration: 540, orderIndex: 5, videoUrl: 'https://www.youtube.com/embed/W0ZM5FQ_SMg' }
        ]
      }
    ]
  },
  {
    id: 11,
    title: 'Full Stack Web Development',
    description: 'Complete guide to building modern web applications from frontend to backend.',
    thumbnail: null,
    price: 249.99,
    category: 'Web Development',
    level: 'advanced',
    status: 'published',
    instructorId: 2,
    firstName: 'Jane',
    lastName: 'Educator',
    instructorAvatar: null,
    enrollmentCount: 201,
    createdAt: '2024-01-22T00:00:00.000Z',
    modules: [
      {
        id: 29,
        title: 'Backend Development',
        description: 'Server-side programming',
        orderIndex: 1,
        lessons: [
          { id: 141, title: 'Node.js Fundamentals', type: 'video', duration: 480, orderIndex: 1, videoUrl: 'https://www.youtube.com/embed/TlB_eWDSMt4' },
          { id: 142, title: 'Express.js Framework', type: 'video', duration: 540, orderIndex: 2, videoUrl: 'https://www.youtube.com/embed/L72fhGm1tfE' },
          { id: 143, title: 'Database Design', type: 'video', duration: 600, orderIndex: 3, videoUrl: 'https://www.youtube.com/embed/ztHopE5Wnpc' },
          { id: 144, title: 'REST API Development', type: 'video', duration: 480, orderIndex: 4, videoUrl: 'https://www.youtube.com/embed/0oXYLzuucwE' },
          { id: 145, title: 'Authentication and Security', type: 'video', duration: 420, orderIndex: 5, videoUrl: 'https://www.youtube.com/embed/F-sFp_AvHc8' }
        ]
      }
    ]
  },
  {
    id: 12,
    title: 'E-Commerce Business Mastery',
    description: 'Start and grow a successful online store from zero to profit.',
    thumbnail: null,
    price: 159.99,
    category: 'Business',
    level: 'beginner',
    status: 'published',
    instructorId: 2,
    firstName: 'Jane',
    lastName: 'Educator',
    instructorAvatar: null,
    enrollmentCount: 92,
    createdAt: '2024-01-14T00:00:00.000Z',
    modules: [
      {
        id: 30,
        title: 'E-Commerce Fundamentals',
        description: 'Starting your online business',
        orderIndex: 1,
        lessons: [
          { id: 146, title: 'Choosing Your Niche', type: 'video', duration: 360, orderIndex: 1, videoUrl: 'https://www.youtube.com/embed/TUMXJzLNdM0' },
          { id: 147, title: 'Setting Up Your Store', type: 'video', duration: 480, orderIndex: 2, videoUrl: 'https://www.youtube.com/embed/OShS2d3BSHQ' },
          { id: 148, title: 'Product Sourcing', type: 'video', duration: 420, orderIndex: 3, videoUrl: 'https://www.youtube.com/embed/WI3A2LVhHTc' },
          { id: 149, title: 'Marketing Your Store', type: 'video', duration: 540, orderIndex: 4, videoUrl: 'https://www.youtube.com/embed/naIkpQ_cIt0' },
          { id: 150, title: 'Customer Service Excellence', type: 'video', duration: 300, orderIndex: 5, videoUrl: 'https://www.youtube.com/embed/OShS2d3BSHQ' }
        ]
      }
    ]
  },
  {
    id: 13,
    title: 'SEO and Content Marketing',
    description: 'Boost your website traffic with proven SEO strategies and content marketing.',
    thumbnail: null,
    price: 139.99,
    category: 'Marketing',
    level: 'intermediate',
    status: 'published',
    instructorId: 2,
    firstName: 'Jane',
    lastName: 'Educator',
    instructorAvatar: null,
    enrollmentCount: 167,
    createdAt: '2024-01-11T00:00:00.000Z',
    modules: [
      {
        id: 31,
        title: 'SEO Fundamentals',
        description: 'Search engine optimization basics',
        orderIndex: 1,
        lessons: [
          { id: 151, title: 'How Search Engines Work', type: 'video', duration: 300, orderIndex: 1, videoUrl: 'https://www.youtube.com/embed/hF515-0Tduk' },
          { id: 152, title: 'Keyword Research', type: 'video', duration: 420, orderIndex: 2, videoUrl: 'https://www.youtube.com/embed/TlB_eWDSMt4' },
          { id: 153, title: 'On-Page SEO', type: 'video', duration: 480, orderIndex: 3, videoUrl: 'https://www.youtube.com/embed/hF515-0Tduk' },
          { id: 154, title: 'Link Building Strategies', type: 'video', duration: 540, orderIndex: 4, videoUrl: 'https://www.youtube.com/embed/TlB_eWDSMt4' },
          { id: 155, title: 'Content Marketing', type: 'video', duration: 360, orderIndex: 5, videoUrl: 'https://www.youtube.com/embed/B_2_3q8A8nE' }
        ]
      }
    ]
  },
  {
    id: 14,
    title: 'Video Editing with Premiere Pro',
    description: 'Create professional videos with Adobe Premiere Pro and advanced editing techniques.',
    thumbnail: null,
    price: 129.99,
    category: 'Design',
    level: 'intermediate',
    status: 'published',
    instructorId: 2,
    firstName: 'Jane',
    lastName: 'Educator',
    instructorAvatar: null,
    enrollmentCount: 143,
    createdAt: '2024-01-09T00:00:00.000Z',
    modules: [
      {
        id: 32,
        title: 'Premiere Pro Basics',
        description: 'Getting started with video editing',
        orderIndex: 1,
        lessons: [
          { id: 156, title: 'Interface and Workflow', type: 'video', duration: 360, orderIndex: 1, videoUrl: 'https://www.youtube.com/embed/Hls3Tp7JS8E' },
          { id: 157, title: 'Importing and Organizing', type: 'video', duration: 300, orderIndex: 2, videoUrl: 'https://www.youtube.com/embed/O6ERELse_QY' },
          { id: 158, title: 'Cutting and Trimming', type: 'video', duration: 420, orderIndex: 3, videoUrl: 'https://www.youtube.com/embed/O6ERELse_QY' },
          { id: 159, title: 'Transitions and Effects', type: 'video', duration: 480, orderIndex: 4, videoUrl: 'https://www.youtube.com/embed/UeeWcskzWHQ' },
          { id: 160, title: 'Color Grading', type: 'video', duration: 540, orderIndex: 5, videoUrl: 'https://www.youtube.com/embed/rgKBBz8rGvY' }
        ]
      }
    ]
  },
  {
    id: 15,
    title: 'Cybersecurity Fundamentals',
    description: 'Learn essential cybersecurity concepts to protect systems and data.',
    thumbnail: null,
    price: 189.99,
    category: 'Development',
    level: 'intermediate',
    status: 'published',
    instructorId: 2,
    firstName: 'Jane',
    lastName: 'Educator',
    instructorAvatar: null,
    enrollmentCount: 78,
    createdAt: '2024-01-16T00:00:00.000Z',
    modules: [
      {
        id: 33,
        title: 'Security Basics',
        description: 'Understanding cybersecurity',
        orderIndex: 1,
        lessons: [
          { id: 161, title: 'Introduction to Cybersecurity', type: 'video', duration: 360, orderIndex: 1, videoUrl: 'https://www.youtube.com/embed/inWWhr5tnEA' },
          { id: 162, title: 'Network Security', type: 'video', duration: 480, orderIndex: 2, videoUrl: 'https://www.youtube.com/embed/eHsKLjbN_k0' },
          { id: 163, title: 'Encryption and Cryptography', type: 'video', duration: 540, orderIndex: 3, videoUrl: 'https://www.youtube.com/embed/C7vmouDOJYM' },
          { id: 164, title: 'Security Best Practices', type: 'video', duration: 420, orderIndex: 4, videoUrl: 'https://www.youtube.com/embed/F-sFp_AvHc8' },
          { id: 165, title: 'Threat Detection', type: 'video', duration: 480, orderIndex: 5, videoUrl: 'https://www.youtube.com/embed/inWWhr5tnEA' }
        ]
      }
    ]
  },
  {
    id: 16,
    title: 'Project Management Essentials',
    description: 'Master project management methodologies and tools for successful project delivery.',
    thumbnail: null,
    price: 149.99,
    category: 'Business',
    level: 'beginner',
    status: 'published',
    instructorId: 2,
    firstName: 'Jane',
    lastName: 'Educator',
    instructorAvatar: null,
    enrollmentCount: 156,
    createdAt: '2024-01-07T00:00:00.000Z',
    modules: [
      {
        id: 34,
        title: 'PM Fundamentals',
        description: 'Core project management concepts',
        orderIndex: 1,
        lessons: [
          { id: 166, title: 'Project Management Basics', type: 'video', duration: 360, orderIndex: 1, videoUrl: 'https://www.youtube.com/embed/ZKOL-rZ79gs' },
          { id: 167, title: 'Agile Methodology', type: 'video', duration: 480, orderIndex: 2, videoUrl: 'https://www.youtube.com/embed/8eVXTyIZ1Hs' },
          { id: 168, title: 'Scrum Framework', type: 'video', duration: 420, orderIndex: 3, videoUrl: 'https://www.youtube.com/embed/2Vt7Ik8Ublw' },
          { id: 169, title: 'Risk Management', type: 'video', duration: 540, orderIndex: 4, videoUrl: 'https://www.youtube.com/embed/ZKOL-rZ79gs' },
          { id: 170, title: 'Team Leadership', type: 'video', duration: 360, orderIndex: 5, videoUrl: 'https://www.youtube.com/embed/8eVXTyIZ1Hs' }
        ]
      }
    ]
  },
  {
    id: 17,
    title: 'Artificial Intelligence and Machine Learning',
    description: 'Comprehensive course on AI and ML algorithms, neural networks, and deep learning.',
    thumbnail: null,
    price: 299.99,
    category: 'Data Science',
    level: 'advanced',
    status: 'published',
    instructorId: 2,
    firstName: 'Jane',
    lastName: 'Educator',
    instructorAvatar: null,
    enrollmentCount: 124,
    createdAt: '2024-01-23T00:00:00.000Z',
    modules: [
      {
        id: 35,
        title: 'AI Foundations',
        description: 'Understanding artificial intelligence',
        orderIndex: 1,
        lessons: [
          { id: 171, title: 'Introduction to AI', type: 'video', duration: 480, orderIndex: 1, videoUrl: 'https://www.youtube.com/embed/ukzFI9rgwfU' },
          { id: 172, title: 'Neural Networks Basics', type: 'video', duration: 540, orderIndex: 2, videoUrl: 'https://www.youtube.com/embed/aircAruvnKk' },
          { id: 173, title: 'Deep Learning', type: 'video', duration: 600, orderIndex: 3, videoUrl: 'https://www.youtube.com/embed/aircAruvnKk' },
          { id: 174, title: 'Natural Language Processing', type: 'video', duration: 480, orderIndex: 4, videoUrl: 'https://www.youtube.com/embed/fNxaJsNG3-s' },
          { id: 175, title: 'Computer Vision', type: 'video', duration: 540, orderIndex: 5, videoUrl: 'https://www.youtube.com/embed/aircAruvnKk' }
        ]
      }
    ]
  },
  {
    id: 18,
    title: 'Financial Planning and Investment',
    description: 'Learn personal finance, investment strategies, and wealth building techniques.',
    thumbnail: null,
    price: 129.99,
    category: 'Business',
    level: 'beginner',
    status: 'published',
    instructorId: 2,
    firstName: 'Jane',
    lastName: 'Educator',
    instructorAvatar: null,
    enrollmentCount: 189,
    createdAt: '2024-01-06T00:00:00.000Z',
    modules: [
      {
        id: 36,
        title: 'Finance Basics',
        description: 'Understanding personal finance',
        orderIndex: 1,
        lessons: [
          { id: 176, title: 'Financial Planning 101', type: 'video', duration: 360, orderIndex: 1, videoUrl: 'https://www.youtube.com/embed/dLDM4Cm3R2M' },
          { id: 177, title: 'Budgeting and Saving', type: 'video', duration: 420, orderIndex: 2, videoUrl: 'https://www.youtube.com/embed/HQzoZfc3GwQ' },
          { id: 178, title: 'Investment Fundamentals', type: 'video', duration: 480, orderIndex: 3, videoUrl: 'https://www.youtube.com/embed/WEDIj9JBTC8' },
          { id:179, title: 'Stock Market Basics', type: 'video', duration: 540, orderIndex: 4, videoUrl: 'https://www.youtube.com/embed/gFQNPmLKj1k' },
          { id: 180, title: 'Retirement Planning', type: 'video', duration: 360, orderIndex: 5, videoUrl: 'https://www.youtube.com/embed/dLDM4Cm3R2M' }
        ]
      }
    ]
  },
  {
    id: 19,
    title: 'Cloud Computing with AWS',
    description: 'Master Amazon Web Services and cloud infrastructure deployment.',
    thumbnail: null,
    price: 219.99,
    category: 'Development',
    level: 'intermediate',
    status: 'published',
    instructorId: 2,
    firstName: 'Jane',
    lastName: 'Educator',
    instructorAvatar: null,
    enrollmentCount: 103,
    createdAt: '2024-01-17T00:00:00.000Z',
    modules: [
      {
        id: 37,
        title: 'AWS Fundamentals',
        description: 'Getting started with AWS',
        orderIndex: 1,
        lessons: [
          { id: 181, title: 'Introduction to AWS', type: 'video', duration: 360, orderIndex: 1, videoUrl: 'https://www.youtube.com/embed/ulprqHHWlng' },
          { id: 182, title: 'EC2 and Compute Services', type: 'video', duration: 480, orderIndex: 2, videoUrl: 'https://www.youtube.com/embed/TmKSGOa1w3w' },
          { id: 183, title: 'S3 Storage Solutions', type: 'video', duration: 420, orderIndex: 3, videoUrl: 'https://www.youtube.com/embed/77lMCiiMilo' },
          { id: 184, title: 'Database Services', type: 'video', duration: 540, orderIndex: 4, videoUrl: 'https://www.youtube.com/embed/eMzCI7S2M-w' },
          { id: 185, title: 'Deployment and Monitoring', type: 'video', duration: 480, orderIndex: 5, videoUrl: 'https://www.youtube.com/embed/TmKSGOa1w3w' }
        ]
      }
    ]
  },
  {
    id: 20,
    title: 'Public Speaking and Presentation Skills',
    description: 'Become a confident public speaker and deliver impactful presentations.',
    thumbnail: null,
    price: 79.99,
    category: 'Business',
    level: 'beginner',
    status: 'published',
    instructorId: 2,
    firstName: 'Jane',
    lastName: 'Educator',
    instructorAvatar: null,
    enrollmentCount: 214,
    createdAt: '2024-01-04T00:00:00.000Z',
    modules: [
      {
        id: 38,
        title: 'Speaking Fundamentals',
        description: 'Building confidence',
        orderIndex: 1,
        lessons: [
          { id: 186, title: 'Overcoming Stage Fright', type: 'video', duration: 300, orderIndex: 1, videoUrl: 'https://www.youtube.com/embed/XIXvKKEQQJo' },
          { id: 187, title: 'Voice and Body Language', type: 'video', duration: 360, orderIndex: 2, videoUrl: 'https://www.youtube.com/embed/eIho2S0ZahI' },
          { id: 188, title: 'Storytelling Techniques', type: 'video', duration: 420, orderIndex: 3, videoUrl: 'https://www.youtube.com/embed/Nj-hdQMa3uA' },
          { id: 189, title: 'Engaging Your Audience', type: 'video', duration: 480, orderIndex: 4, videoUrl: 'https://www.youtube.com/embed/8S0FDjFBj8o' },
          { id: 190, title: 'Presentation Design', type: 'video', duration: 360, orderIndex: 5, videoUrl: 'https://www.youtube.com/embed/Iwpi1Lm6dFo' }
        ]
      }
    ]
  },
  {
    id: 21,
    title: 'Blockchain and Cryptocurrency',
    description: 'Understand blockchain technology, cryptocurrencies, and decentralized applications.',
    thumbnail: null,
    price: 199.99,
    category: 'Development',
    level: 'intermediate',
    status: 'published',
    instructorId: 2,
    firstName: 'Jane',
    lastName: 'Educator',
    instructorAvatar: null,
    enrollmentCount: 87,
    createdAt: '2024-01-19T00:00:00.000Z',
    modules: [
      {
        id: 39,
        title: 'Blockchain Basics',
        description: 'Understanding distributed ledgers',
        orderIndex: 1,
        lessons: [
          { id: 191, title: 'What is Blockchain', type: 'video', duration: 360, orderIndex: 1, videoUrl: 'https://www.youtube.com/embed/SSo_EIwHSd4' },
          { id: 192, title: 'Cryptocurrency Fundamentals', type: 'video', duration: 420, orderIndex: 2, videoUrl: 'https://www.youtube.com/embed/1YyAzVmP9xQ' },
          { id: 193, title: 'Smart Contracts', type: 'video', duration: 480, orderIndex: 3, videoUrl: 'https://www.youtube.com/embed/ZE2HxTmxfrI' },
          { id: 194, title: 'DeFi and Web3', type: 'video', duration: 540, orderIndex: 4, videoUrl: 'https://www.youtube.com/embed/qB9yufZFnmU' },
          { id: 195, title: 'NFTs and Digital Assets', type: 'video', duration: 360, orderIndex: 5, videoUrl: 'https://www.youtube.com/embed/NNQLJcJEzv0' }
        ]
      }
    ]
  },
  {
    id: 22,
    title: 'Content Writing and Copywriting',
    description: 'Write compelling content that converts and engages your audience.',
    thumbnail: null,
    price: 89.99,
    category: 'Marketing',
    level: 'beginner',
    status: 'published',
    instructorId: 2,
    firstName: 'Jane',
    lastName: 'Educator',
    instructorAvatar: null,
    enrollmentCount: 172,
    createdAt: '2024-01-13T00:00:00.000Z',
    modules: [
      {
        id: 40,
        title: 'Writing Fundamentals',
        description: 'Mastering the craft',
        orderIndex: 1,
        lessons: [
          { id: 196, title: 'Writing Compelling Headlines', type: 'video', duration: 300, orderIndex: 1, videoUrl: 'https://www.youtube.com/embed/6TpaFs5xUjQ' },
          { id: 197, title: 'Persuasive Writing', type: 'video', duration: 420, orderIndex: 2, videoUrl: 'https://www.youtube.com/embed/rP7S3LLohYo' },
          { id: 198, title: 'SEO Copywriting', type: 'video', duration: 360, orderIndex: 3, videoUrl: 'https://www.youtube.com/embed/B_2_3q8A8nE' },
          { id: 199, title: 'Email Marketing Copy', type: 'video', duration: 480, orderIndex: 4, videoUrl: 'https://www.youtube.com/embed/YQiQMhJGNYE' },
          { id: 200, title: 'Brand Voice Development', type: 'video', duration: 360, orderIndex: 5, videoUrl: 'https://www.youtube.com/embed/iVRou3ctMxU' }
        ]
      }
    ]
  },
  {
    id: 23,
    title: 'Game Development with Unity',
    description: 'Create 2D and 3D games using Unity game engine and C# programming.',
    thumbnail: null,
    price: 189.99,
    category: 'Development',
    level: 'intermediate',
    status: 'published',
    instructorId: 2,
    firstName: 'Jane',
    lastName: 'Educator',
    instructorAvatar: null,
    enrollmentCount: 136,
    createdAt: '2024-01-21T00:00:00.000Z',
    modules: [
      {
        id: 41,
        title: 'Unity Basics',
        description: 'Getting started with game development',
        orderIndex: 1,
        lessons: [
          { id: 201, title: 'Unity Interface', type: 'video', duration: 360, orderIndex: 1, videoUrl: 'https://www.youtube.com/embed/XtQMytORBmM' },
          { id: 202, title: 'C# for Unity', type: 'video', duration: 480, orderIndex: 2, videoUrl: 'https://www.youtube.com/embed/N775KMpI_MY' },
          { id: 203, title: '2D Game Mechanics', type: 'video', duration: 540, orderIndex: 3, videoUrl: 'https://www.youtube.com/embed/on9nwbZngyw' },
          { id: 204, title: '3D Game Development', type: 'video', duration: 600, orderIndex: 4, videoUrl: 'https://www.youtube.com/embed/pwZpJzpE2lQ' },
          { id: 205, title: 'Physics and Animations', type: 'video', duration: 480, orderIndex: 5, videoUrl: 'https://www.youtube.com/embed/XtQMytORBmM' }
        ]
      }
    ]
  },
  {
    id: 24,
    title: 'Motion Graphics and Animation',
    description: 'Create stunning motion graphics and animations using After Effects.',
    thumbnail: null,
    price: 149.99,
    category: 'Design',
    level: 'intermediate',
    status: 'published',
    instructorId: 2,
    firstName: 'Jane',
    lastName: 'Educator',
    instructorAvatar: null,
    enrollmentCount: 127,
    createdAt: '2024-01-24T00:00:00.000Z',
    modules: [
      {
        id: 42,
        title: 'After Effects Basics',
        description: 'Introduction to motion graphics',
        orderIndex: 1,
        lessons: [
          { id: 206, title: 'After Effects Interface', type: 'video', duration: 300, orderIndex: 1, videoUrl: 'https://www.youtube.com/embed/DaEXf6n06o4' },
          { id: 207, title: 'Keyframe Animation', type: 'video', duration: 420, orderIndex: 2, videoUrl: 'https://www.youtube.com/embed/FvaPMJtUNw4' },
          { id: 208, title: 'Shape Layers', type: 'video', duration: 480, orderIndex: 3, videoUrl: 'https://www.youtube.com/embed/rIqRGMV6Qr0' },
          { id: 209, title: 'Text Animation', type: 'video', duration: 360, orderIndex: 4, videoUrl: 'https://www.youtube.com/embed/KhXKsUv8dno' },
          { id: 210, title: 'Visual Effects', type: 'video', duration: 540, orderIndex: 5, videoUrl: 'https://www.youtube.com/embed/UeeWcskzWHQ' }
        ]
      }
    ]
  },
  {
    id: 25,
    title: 'Social Media Influencer Marketing',
    description: 'Build your personal brand and become a successful social media influencer.',
    thumbnail: null,
    price: 99.99,
    category: 'Marketing',
    level: 'beginner',
    status: 'published',
    instructorId: 2,
    firstName: 'Jane',
    lastName: 'Educator',
    instructorAvatar: null,
    enrollmentCount: 198,
    createdAt: '2024-01-01T00:00:00.000Z',
    modules: [
      {
        id: 43,
        title: 'Influencer Basics',
        description: 'Starting your journey',
        orderIndex: 1,
        lessons: [
          { id: 211, title: 'Finding Your Niche', type: 'video', duration: 300, orderIndex: 1, videoUrl: 'https://www.youtube.com/embed/R1ZVZh_pvfQ' },
          { id: 212, title: 'Content Creation Strategy', type: 'video', duration: 420, orderIndex: 2, videoUrl: 'https://www.youtube.com/embed/8b9Xq7Dq-wM' },
          { id: 213, title: 'Growing Your Audience', type: 'video', duration: 480, orderIndex: 3, videoUrl: 'https://www.youtube.com/embed/R1ZVZh_pvfQ' },
          { id: 214, title: 'Brand Partnerships', type: 'video', duration: 360, orderIndex: 4, videoUrl: 'https://www.youtube.com/embed/ohBN2wriDyw' },
          { id: 215, title: 'Monetization Strategies', type: 'video', duration: 540, orderIndex: 5, videoUrl: 'https://www.youtube.com/embed/gvTNl6InKss' }
        ]
      }
    ]
  },
  {
    id: 26,
    title: 'Leadership and Management Skills',
    description: 'Develop essential leadership skills to manage teams and drive organizational success.',
    thumbnail: null,
    price: 169.99,
    category: 'Business',
    level: 'intermediate',
    status: 'published',
    instructorId: 2,
    firstName: 'Jane',
    lastName: 'Educator',
    instructorAvatar: null,
    enrollmentCount: 145,
    createdAt: '2024-01-26T00:00:00.000Z',
    modules: [
      {
        id: 44,
        title: 'Leadership Fundamentals',
        description: 'Core leadership principles',
        orderIndex: 1,
        lessons: [
          { id: 216, title: 'Leadership Styles', type: 'video', duration: 360, orderIndex: 1, videoUrl: 'https://www.youtube.com/embed/wnDQkR4u4NI' },
          { id: 217, title: 'Team Building', type: 'video', duration: 420, orderIndex: 2, videoUrl: 'https://www.youtube.com/embed/8eVXTyIZ1Hs' },
          { id: 218, title: 'Decision Making', type: 'video', duration: 480, orderIndex: 3, videoUrl: 'https://www.youtube.com/embed/MFsBFC8yl5k' },
          { id: 219, title: 'Conflict Resolution', type: 'video', duration: 360, orderIndex: 4, videoUrl: 'https://www.youtube.com/embed/t3R8qlaGITo' },
          { id: 220, title: 'Change Management', type: 'video', duration: 540, orderIndex: 5, videoUrl: 'https://www.youtube.com/embed/t3R8qlaGITo' }
        ]
      }
    ]
  },
  {
    id: 27,
    title: 'Yoga and Meditation for Wellness',
    description: 'Improve your physical and mental health through yoga and meditation practices.',
    thumbnail: null,
    price: 59.99,
    category: 'Health',
    level: 'beginner',
    status: 'published',
    instructorId: 2,
    firstName: 'Jane',
    lastName: 'Educator',
    instructorAvatar: null,
    enrollmentCount: 234,
    createdAt: '2024-01-27T00:00:00.000Z',
    modules: [
      {
        id: 45,
        title: 'Yoga Fundamentals',
        description: 'Introduction to yoga practice',
        orderIndex: 1,
        lessons: [
          { id: 221, title: 'Yoga Basics and Benefits', type: 'video', duration: 300, orderIndex: 1, videoUrl: 'https://www.youtube.com/embed/v7AYKMP6rOE' },
          { id: 222, title: 'Basic Yoga Poses', type: 'video', duration: 420, orderIndex: 2, videoUrl: 'https://www.youtube.com/embed/4pKly2JojMw' },
          { id: 223, title: 'Breathing Techniques', type: 'video', duration: 360, orderIndex: 3, videoUrl: 'https://www.youtube.com/embed/nM-ySWyID9o' },
          { id: 224, title: 'Meditation Practice', type: 'video', duration: 480, orderIndex: 4, videoUrl: 'https://www.youtube.com/embed/inpok4MKVLM' },
          { id: 225, title: 'Mindfulness and Relaxation', type: 'video', duration: 360, orderIndex: 5, videoUrl: 'https://www.youtube.com/embed/ZToicYcHIOU' }
        ]
      }
    ]
  },
  {
    id: 28,
    title: 'Nutrition and Healthy Eating',
    description: 'Learn the science of nutrition and build healthy eating habits for life.',
    thumbnail: null,
    price: 79.99,
    category: 'Health',
    level: 'beginner',
    status: 'published',
    instructorId: 2,
    firstName: 'Jane',
    lastName: 'Educator',
    instructorAvatar: null,
    enrollmentCount: 198,
    createdAt: '2024-01-28T00:00:00.000Z',
    modules: [
      {
        id: 46,
        title: 'Nutrition Basics',
        description: 'Understanding nutrition fundamentals',
        orderIndex: 1,
        lessons: [
          { id: 226, title: 'Macronutrients Explained', type: 'video', duration: 360, orderIndex: 1, videoUrl: 'https://www.youtube.com/embed/yvaBdkZk8mA' },
          { id: 227, title: 'Vitamins and Minerals', type: 'video', duration: 420, orderIndex: 2, videoUrl: 'https://www.youtube.com/embed/9mAkW3MKXkk' },
          { id: 228, title: 'Meal Planning Basics', type: 'video', duration: 480, orderIndex: 3, videoUrl: 'https://www.youtube.com/embed/xzJZeyN5z0E' },
          { id: 229, title: 'Healthy Eating Habits', type: 'video', duration: 300, orderIndex: 4, videoUrl: 'https://www.youtube.com/embed/lI8v7YgQaqw' },
          { id: 230, title: 'Reading Food Labels', type: 'video', duration: 360, orderIndex: 5, videoUrl: 'https://www.youtube.com/embed/lhLSN62rD8I' }
        ]
      }
    ]
  },
  {
    id: 29,
    title: 'Fitness and Strength Training',
    description: 'Build strength, improve fitness, and achieve your health goals with structured workouts.',
    thumbnail: null,
    price: 89.99,
    category: 'Health',
    level: 'beginner',
    status: 'published',
    instructorId: 2,
    firstName: 'Jane',
    lastName: 'Educator',
    instructorAvatar: null,
    enrollmentCount: 276,
    createdAt: '2024-01-29T00:00:00.000Z',
    modules: [
      {
        id: 47,
        title: 'Fitness Fundamentals',
        description: 'Getting started with fitness',
        orderIndex: 1,
        lessons: [
          { id: 231, title: 'Exercise Basics', type: 'video', duration: 300, orderIndex: 1, videoUrl: 'https://www.youtube.com/embed/IODxDxX7oi4' },
          { id: 232, title: 'Strength Training Fundamentals', type: 'video', duration: 420, orderIndex: 2, videoUrl: 'https://www.youtube.com/embed/U9ENCvFf_IQ' },
          { id: 233, title: 'Cardio Workouts', type: 'video', duration: 360, orderIndex: 3, videoUrl: 'https://www.youtube.com/embed/ml6cT4AZdqI' },
          { id: 234, title: 'Workout Programming', type: 'video', duration: 480, orderIndex: 4, videoUrl: 'https://www.youtube.com/embed/YCdYZi0eO5s' },
          { id: 235, title: 'Recovery and Rest', type: 'video', duration: 300, orderIndex: 5, videoUrl: 'https://www.youtube.com/embed/gaN7FoCx5z0' }
        ]
      }
    ]
  },
  {
    id: 30,
    title: 'Spanish for Beginners',
    description: 'Start your Spanish language journey with practical conversations and grammar.',
    thumbnail: null,
    price: 99.99,
    category: 'Language',
    level: 'beginner',
    status: 'published',
    instructorId: 2,
    firstName: 'Jane',
    lastName: 'Educator',
    instructorAvatar: null,
    enrollmentCount: 312,
    createdAt: '2024-01-30T00:00:00.000Z',
    modules: [
      {
        id: 48,
        title: 'Spanish Basics',
        description: 'Introduction to Spanish language',
        orderIndex: 1,
        lessons: [
          { id: 236, title: 'Spanish Alphabet and Pronunciation', type: 'video', duration: 300, orderIndex: 1, videoUrl: 'https://www.youtube.com/embed/sNDBaE3U6Uk' },
          { id: 237, title: 'Basic Greetings and Phrases', type: 'video', duration: 360, orderIndex: 2, videoUrl: 'https://www.youtube.com/embed/DAp_v7EH9AA' },
          { id: 238, title: 'Common Verbs', type: 'video', duration: 420, orderIndex: 3, videoUrl: 'https://www.youtube.com/embed/HqJaN6V8rLU' },
          { id: 239, title: 'Numbers and Counting', type: 'video', duration: 300, orderIndex: 4, videoUrl: 'https://www.youtube.com/embed/sNDBaE3U6Uk' },
          { id: 240, title: 'Everyday Conversations', type: 'video', duration: 480, orderIndex: 5, videoUrl: 'https://www.youtube.com/embed/DAp_v7EH9AA' }
        ]
      }
    ]
  },
  {
    id: 31,
    title: 'French Language Mastery',
    description: 'Master French from basics to advanced conversation and grammar.',
    thumbnail: null,
    price: 119.99,
    category: 'Language',
    level: 'intermediate',
    status: 'published',
    instructorId: 2,
    firstName: 'Jane',
    lastName: 'Educator',
    instructorAvatar: null,
    enrollmentCount: 267,
    createdAt: '2024-01-31T00:00:00.000Z',
    modules: [
      {
        id: 49,
        title: 'French Fundamentals',
        description: 'Building your French foundation',
        orderIndex: 1,
        lessons: [
          { id: 241, title: 'French Pronunciation', type: 'video', duration: 360, orderIndex: 1, videoUrl: 'https://www.youtube.com/embed/T_zYuNadxqE' },
          { id: 242, title: 'Grammar Essentials', type: 'video', duration: 420, orderIndex: 2, videoUrl: 'https://www.youtube.com/embed/T_zYuNadxqE' },
          { id: 243, title: 'French Vocabulary', type: 'video', duration: 480, orderIndex: 3, videoUrl: 'https://www.youtube.com/embed/D4oFIWDoxxQ' },
          { id: 244, title: 'Conversation Practice', type: 'video', duration: 540, orderIndex: 4, videoUrl: 'https://www.youtube.com/embed/D4oFIWDoxxQ' },
          { id: 245, title: 'French Culture', type: 'video', duration: 300, orderIndex: 5, videoUrl: 'https://www.youtube.com/embed/B_QpApqBwhs' }
        ]
      }
    ]
  },
  {
    id: 32,
    title: 'English Grammar and Writing',
    description: 'Improve your English grammar, writing skills, and communication abilities.',
    thumbnail: null,
    price: 79.99,
    category: 'Language',
    level: 'beginner',
    status: 'published',
    instructorId: 2,
    firstName: 'Jane',
    lastName: 'Educator',
    instructorAvatar: null,
    enrollmentCount: 445,
    createdAt: '2024-02-01T00:00:00.000Z',
    modules: [
      {
        id: 50,
        title: 'English Fundamentals',
        description: 'Core English skills',
        orderIndex: 1,
        lessons: [
          { id: 246, title: 'Parts of Speech', type: 'video', duration: 360, orderIndex: 1, videoUrl: 'https://www.youtube.com/embed/Q5F3y8uHcEw' },
          { id: 247, title: 'Sentence Structure', type: 'video', duration: 420, orderIndex: 2, videoUrl: 'https://www.youtube.com/embed/gJKjmBIPHFQ' },
          { id: 248, title: 'Punctuation Rules', type: 'video', duration: 300, orderIndex: 3, videoUrl: 'https://www.youtube.com/embed/Q5F3y8uHcEw' },
          { id: 249, title: 'Writing Paragraphs', type: 'video', duration: 480, orderIndex: 4, videoUrl: 'https://www.youtube.com/embed/gJKjmBIPHFQ' },
          { id: 250, title: 'Common Grammar Mistakes', type: 'video', duration: 360, orderIndex: 5, videoUrl: 'https://www.youtube.com/embed/Q5F3y8uHcEw' }
        ]
      }
    ]
  },
  {
    id: 33,
    title: 'Guitar for Beginners',
    description: 'Learn to play guitar from scratch with chord progressions and popular songs.',
    thumbnail: null,
    price: 89.99,
    category: 'Music',
    level: 'beginner',
    status: 'published',
    instructorId: 2,
    firstName: 'Jane',
    lastName: 'Educator',
    instructorAvatar: null,
    enrollmentCount: 398,
    createdAt: '2024-02-02T00:00:00.000Z',
    modules: [
      {
        id: 51,
        title: 'Guitar Basics',
        description: 'Getting started with guitar',
        orderIndex: 1,
        lessons: [
          { id: 251, title: 'Guitar Anatomy and Setup', type: 'video', duration: 300, orderIndex: 1, videoUrl: 'https://www.youtube.com/embed/qeOHOz7Er8k' },
          { id: 252, title: 'Basic Chords', type: 'video', duration: 420, orderIndex: 2, videoUrl: 'https://www.youtube.com/embed/yTAVChdN6Jg' },
          { id: 253, title: 'Strumming Patterns', type: 'video', duration: 360, orderIndex: 3, videoUrl: 'https://www.youtube.com/embed/Ahq9_RdrgHE' },
          { id: 254, title: 'Playing Your First Song', type: 'video', duration: 480, orderIndex: 4, videoUrl: 'https://www.youtube.com/embed/yTAVChdN6Jg' },
          { id: 255, title: 'Chord Transitions', type: 'video', duration: 360, orderIndex: 5, videoUrl: 'https://www.youtube.com/embed/Ahq9_RdrgHE' }
        ]
      }
    ]
  },
  {
    id: 34,
    title: 'Piano and Music Theory',
    description: 'Master piano playing and understand music theory fundamentals.',
    thumbnail: null,
    price: 109.99,
    category: 'Music',
    level: 'beginner',
    status: 'published',
    instructorId: 2,
    firstName: 'Jane',
    lastName: 'Educator',
    instructorAvatar: null,
    enrollmentCount: 287,
    createdAt: '2024-02-03T00:00:00.000Z',
    modules: [
      {
        id: 52,
        title: 'Piano Fundamentals',
        description: 'Introduction to piano',
        orderIndex: 1,
        lessons: [
          { id: 256, title: 'Piano Keys and Notes', type: 'video', duration: 300, orderIndex: 1, videoUrl: 'https://www.youtube.com/embed/MJy7nJT8S9g' },
          { id: 257, title: 'Proper Piano Posture', type: 'video', duration: 240, orderIndex: 2, videoUrl: 'https://www.youtube.com/embed/2mxG0nrmQBk' },
          { id: 258, title: 'Reading Sheet Music', type: 'video', duration: 480, orderIndex: 3, videoUrl: 'https://www.youtube.com/embed/ZN41d7Txcq0' },
          { id: 259, title: 'Basic Scales', type: 'video', duration: 420, orderIndex: 4, videoUrl: 'https://www.youtube.com/embed/MJy7nJT8S9g' },
          { id: 260, title: 'Simple Piano Songs', type: 'video', duration: 540, orderIndex: 5, videoUrl: 'https://www.youtube.com/embed/2mxG0nrmQBk' }
        ]
      }
    ]
  },
  {
    id: 35,
    title: 'Mental Health and Psychology',
    description: 'Understand mental health, psychology basics, and emotional well-being.',
    thumbnail: null,
    price: 69.99,
    category: 'Health',
    level: 'beginner',
    status: 'published',
    instructorId: 2,
    firstName: 'Jane',
    lastName: 'Educator',
    instructorAvatar: null,
    enrollmentCount: 412,
    createdAt: '2024-02-04T00:00:00.000Z',
    modules: [
      {
        id: 53,
        title: 'Mental Health Basics',
        description: 'Understanding mental wellness',
        orderIndex: 1,
        lessons: [
          { id: 261, title: 'Introduction to Mental Health', type: 'video', duration: 360, orderIndex: 1, videoUrl: 'https://www.youtube.com/embed/G0zJGDokyWQ' },
          { id: 262, title: 'Stress Management', type: 'video', duration: 420, orderIndex: 2, videoUrl: 'https://www.youtube.com/embed/hnpQrMqDoqE' },
          { id: 263, title: 'Emotional Intelligence', type: 'video', duration: 480, orderIndex: 3, videoUrl: 'https://www.youtube.com/embed/Y7m9eNoB3NU' },
          { id: 264, title: 'Building Resilience', type: 'video', duration: 360, orderIndex: 4, videoUrl: 'https://www.youtube.com/embed/NWH8N-BvhAw' },
          { id: 265, title: 'Self-Care Practices', type: 'video', duration: 300, orderIndex: 5, videoUrl: 'https://www.youtube.com/embed/w6T02g5hnT4' }
        ]
      }
    ]
  }
];

// Append additional auto-generated courses (10 more) with the same structure
INITIAL_COURSES.push(
  ...generateCourses(7, 10, 25, 121)
);

// Fill missing thumbnails for all courses using curated thumbnails based on title/category (logos when possible)
for (const course of INITIAL_COURSES) {
  if (!course.thumbnail) {
    course.thumbnail = getCuratedThumbnail(course.title, course.category, course.id);
  }
}

// Guarantee a solid image for Photography Masterclass specifically
for (const course of INITIAL_COURSES) {
  if (/photography masterclass/i.test(course.title)) {
    course.thumbnail = `https://loremflickr.com/640/360/${encodeURIComponent('photography,camera,studio,portrait,lighting')}?lock=${course.id}`;
  }
}

// Enforce price cap: no course price should exceed 499
for (const course of INITIAL_COURSES) {
  if (typeof course.price === 'number' && course.price > 499) {
    course.price = 499;
  }
}



// Initialize MOCK_COURSES from localStorage or use INITIAL_COURSES
const storedCourses = localStorage.getItem('coursehub_courses');
export const MOCK_COURSES = storedCourses ? JSON.parse(storedCourses) : INITIAL_COURSES;

export const INITIAL_ENROLLMENTS = [
  {
    id: 1,
    courseId: 1,
    studentId: 1,
    progress: 75.5,
    enrolledAt: '2024-01-20T00:00:00.000Z',
    completedAt: null,
    title: 'React Fundamentals',
    description: 'Learn React from scratch with hands-on projects and real-world examples.',
    thumbnail: null,
    level: 'beginner',
    price: 99.99,
    firstName: 'Jane',
    lastName: 'Educator',
    instructorAvatar: null
  },
  {
    id: 2,
    courseId: 3,
    studentId: 1,
    progress: 45.0,
    enrolledAt: '2024-01-25T00:00:00.000Z',
    completedAt: null,
    title: 'UI/UX Design Principles',
    description: 'Learn the fundamentals of user interface and user experience design.',
    thumbnail: null,
    level: 'beginner',
    price: 79.99,
    firstName: 'Jane',
    lastName: 'Educator',
    instructorAvatar: null
  }

];

// Initialize MOCK_ENROLLMENTS from localStorage or use INITIAL_ENROLLMENTS
const storedEnrollments = localStorage.getItem('coursehub_enrollments');
export const MOCK_ENROLLMENTS = storedEnrollments ? JSON.parse(storedEnrollments) : INITIAL_ENROLLMENTS;

export const MOCK_ASSIGNMENTS = [
  {
    id: 1,
    courseId: 1,
    title: 'Build a Todo App',
    description: 'Create a simple todo application using React components and state management.',
    dueDate: '2024-02-15T23:59:59.000Z',
    maxPoints: 100,
    createdAt: '2024-01-20T00:00:00.000Z',
    isSubmitted: true,
    submittedAt: '2024-01-28T00:00:00.000Z',
    grade: 85,
    feedback: 'Great work! Your component structure is clean and well-organized.'
  },
  {
    id: 2,
    courseId: 1,
    title: 'React Hooks Practice',
    description: 'Implement various React hooks in a practical project.',
    dueDate: '2024-02-20T23:59:59.000Z',
    maxPoints: 100,
    createdAt: '2024-01-25T00:00:00.000Z',
    isSubmitted: false,
    submittedAt: null,
    grade: null,
    feedback: null
  }
];

// Helper functions for mock data
export const getCourses = (params = {}) => {
  let filteredCourses = [...MOCK_COURSES];
  
  if (params.search) {
    const searchTerm = params.search.toLowerCase();
    filteredCourses = filteredCourses.filter(course => 
      course.title.toLowerCase().includes(searchTerm) ||
      course.description.toLowerCase().includes(searchTerm)
    );
  }
  
  if (params.category) {
    filteredCourses = filteredCourses.filter(course => 
      course.category === params.category
    );
  }
  
  if (params.level) {
    filteredCourses = filteredCourses.filter(course => 
      course.level === params.level
    );
  }
  
  const page = params.page || 1;
  const limit = params.limit || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  return {
    courses: filteredCourses
      .slice(startIndex, endIndex)
      .map((course) => ({
        ...course,
        price: sanitizeCoursePrice(course.price, 499)
      })),
    pagination: {
      page,
      limit,
      total: filteredCourses.length,
      pages: Math.ceil(filteredCourses.length / limit)
    }
  };
};

export const getCourseById = (id) => {
  const found = MOCK_COURSES.find(course => course.id == id);
  if (!found) return null;
  return {
    ...found,
    price: sanitizeCoursePrice(found.price, 499)
  };
};

export const getMyEnrollments = (userId, params = {}) => {
  const enrollments = MOCK_ENROLLMENTS.filter(enrollment => enrollment.studentId == userId);
  
  const page = params.page || 1;
  const limit = params.limit || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  return {
    enrollments: enrollments.slice(startIndex, endIndex),
    pagination: {
      page,
      limit,
      total: enrollments.length,
      pages: Math.ceil(enrollments.length / limit)
    }
  };
};

export const getMyCourses = (userId, params = {}) => {
  const courses = MOCK_COURSES.filter(course => course.instructorId == userId);
  
  const page = params.page || 1;
  const limit = params.limit || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  return {
    courses: courses.slice(startIndex, endIndex),
    pagination: {
      page,
      limit,
      total: courses.length,
      pages: Math.ceil(courses.length / limit)
    }
  };
};

export const getCourseAssignments = (courseId) => {
  return MOCK_ASSIGNMENTS.filter(assignment => assignment.courseId == courseId);
};

export const saveCourse = (course) => {
  // Generate a new ID if not provided
  if (!course.id) {
    const maxId = Math.max(...MOCK_COURSES.map(c => c.id), 0);
    course.id = maxId + 1;
  }
  
  // Add default fields if missing
  const newCourse = {
    createdAt: new Date().toISOString(),
    enrollmentCount: 0,
    modules: [],
    thumbnail: null,
    status: 'published',
    ...course
  };

  MOCK_COURSES.push(newCourse);
  localStorage.setItem('coursehub_courses', JSON.stringify(MOCK_COURSES));
  return newCourse;
};

export const saveEnrollment = (enrollment) => {
  // Check if already enrolled
  const exists = MOCK_ENROLLMENTS.some(
    e => e.courseId === enrollment.courseId && e.studentId === enrollment.studentId
  );
  
  if (exists) return;

  // Generate ID
  const maxId = Math.max(...MOCK_ENROLLMENTS.map(e => e.id), 0);
  
  const newEnrollment = {
    id: maxId + 1,
    progress: 0,
    enrolledAt: new Date().toISOString(),
    completedAt: null,
    ...enrollment
  };

  MOCK_ENROLLMENTS.push(newEnrollment);
  localStorage.setItem('coursehub_enrollments', JSON.stringify(MOCK_ENROLLMENTS));
  return newEnrollment;
};
