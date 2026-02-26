// Utility to generate additional mock courses with YouTube videos

const YT_POOL = [
  'Tn6-PIqc4UM','SqcY0GlETPk','w7ejDZ8SWv8','7fPXI_MnBOY','DLX62G4lc44',
  'Y2hgEGPzTZY','IYvD9oBCuJI','Oioo0IdoEls','Znqv84xi8Vs','7o5FPaVA9m0',
  'O6P86uwfdR0','0ZJgIjIuY7U','5LrDIWkK_Bc','6ThXsUwLWvc','1VVfMVQdx5M',
  'Law7wfdg_ls','SdzMBWT2CDQ','cuEtnrL9-H0','uojLJFt9SzY','8Xwq35cPwYg',
  'h33Srr5J9nY','NIq3qLaHCIs','NgF9-pdTDGs','iLx4ma8ZqvQ','cRHQNNcYf6s',
  'DHvZLI7Db8E','V_Kr9OSfDeU','rfscVS0vtbw','khKv-8q7YmY','vmEHCJofslg',
  'e60ItwlZTKM','UO98lJQ3QGI','a9UrKTVEeZA','6GUZXDef2U0','hSPmj7mK6ng'
];

const categories = ['Web Development','Design','Data Science','Marketing','Photography','Mobile','DevOps','Cloud','AI','Security'];
const levels = ['beginner','intermediate','advanced'];

// ---------- Thumbnail Helpers (Top-Level) ----------
// Curated keyword mapping for better relevance (title/category aware)
const curatedQuery = (title, category) => {
  const t = String(title || '').toLowerCase();
  const c = String(category || '').toLowerCase();
  const has = (k) => t.includes(k) || c.includes(k);
  // Specific base-course matches
  if (t.includes('react fundamentals')) return 'react,javascript,frontend,components,web';
  if (t.includes('advanced javascript')) return 'javascript,es6,code,programming,web';
  if (t.includes('ui/ux design') || t.includes('ui ux')) return 'ui,ux,wireframe,prototype,design,figma';
  if (t.includes('data science') || t.includes('python')) return 'data,python,analytics,charts,notebook';
  if (t.includes('digital marketing')) return 'marketing,digital,ads,social media,seo';
  if (t.includes('photography')) return 'photography,camera,studio,portrait,lighting';
  // Generic keyword families
  if (has('react')) return 'react,javascript,frontend,web';
  if (has('javascript')) return 'javascript,code,web,frontend';
  if (has('design') || has('ui') || has('ux')) return 'design,ui,ux,interface,figma';
  if (has('data') || has('machine') || has('ml')) return 'data,machine learning,python,analytics';
  if (has('marketing')) return 'marketing,seo,ads,social media';
  if (has('photo')) return 'photography,camera,portrait,studio';
  if (has('mobile')) return 'mobile,app,android,ios';
  if (has('devops')) return 'devops,servers,automation,ci cd';
  if (has('cloud') || has('aws')) return 'cloud,aws,serverless';
  if (has('security') || has('cyber')) return 'cybersecurity,security,hacking';
  if (has('node')) return 'nodejs,api,backend,server';
  if (has('css') || has('tailwind')) return 'css,tailwind,web design,frontend';
  if (has('typescript')) return 'typescript,programming,code';
  if (has('next')) return 'nextjs,react,web,ssr';
  // Category-level defaults
  if (c.includes('web')) return 'web,frontend,code,design';
  if (c.includes('design')) return 'design,ui,ux,interface';
  if (c.includes('data')) return 'data,analytics,python,charts';
  if (c.includes('marketing')) return 'marketing,seo,ads';
  if (c.includes('photography')) return 'photography,camera,studio';
  if (c.includes('mobile')) return 'mobile,app,android,ios';
  if (c.includes('devops')) return 'devops,servers,automation';
  if (c.includes('cloud')) return 'cloud,aws,architecture';
  if (c.includes('ai')) return 'artificial intelligence,machine learning';
  if (c.includes('security')) return 'cybersecurity,security,infosec';
  return 'education,learning,technology';
};

// Prefer crisp tech logos (SVG) from SimpleIcons CDN when possible for strong title relevance
const simpleIcon = (slug, color = '111827') => `https://cdn.simpleicons.org/${slug}/${color}`; // color default: gray-900
const curatedLogo = (title) => {
  const t = String(title || '').toLowerCase();
  if (t.includes('react')) return simpleIcon('react', '0ea5e9');
  if (t.includes('javascript')) return simpleIcon('javascript', 'f7df1e');
  if (t.includes('typescript')) return simpleIcon('typescript', '3178c6');
  if (t.includes('node')) return simpleIcon('nodedotjs', '339933');
  if (t.includes('next')) return simpleIcon('nextdotjs', '000000');
  if (t.includes('css') || t.includes('tailwind')) return simpleIcon('tailwindcss', '38bdf8');
  if (t.includes('python')) return simpleIcon('python', '3776ab');
  if (t.includes('figma') || t.includes('ui') || t.includes('ux')) return simpleIcon('figma', '000000');
  if (t.includes('aws') || t.includes('cloud')) return simpleIcon('amazonaws', 'ff9900');
  if (t.includes('kubernetes')) return simpleIcon('kubernetes', '326ce5');
  if (t.includes('docker')) return simpleIcon('docker', '2496ed');
  if (t.includes('marketing') || t.includes('seo')) return simpleIcon('googleanalytics', 'e37400');
  if (t.includes('photography')) return simpleIcon('adobephotoshop', '31a8ff');
  if (t.includes('security') || t.includes('cyber')) return simpleIcon('letsencrypt', '003a70');
  return null;
};

export const getCuratedThumbnail = (title, category, id) => {
  const t = String(title || '').toLowerCase();
  const c = String(category || '').toLowerCase();
  // Prefer real photos for photography-related courses
  if (/(photography|photo|camera)/.test(t) || /(photography|photo|camera)/.test(c)) {
    const kw = 'photography,camera,studio,portrait,lighting';
    return `https://loremflickr.com/640/360/${encodeURIComponent(kw)}?lock=${id}`;
  }
  const logo = curatedLogo(title);
  if (logo) return logo;
  // Fallback to relevant photo with deterministic locking
  return `https://loremflickr.com/640/360/${encodeURIComponent(curatedQuery(title, category))}?lock=${id}`;
};

// Curated titles for 10 additional courses to ensure meaningful, title-related thumbnails
const curatedGeneratedCourses = [
  { title: 'Full-Stack Web Development', category: 'Web Development' },
  { title: 'Node.js APIs with Express', category: 'Web Development' },
  { title: 'Modern CSS & Tailwind', category: 'Web Development' },
  { title: 'TypeScript for React Developers', category: 'Web Development' },
  { title: 'Next.js Zero to Hero', category: 'Web Development' },
  { title: 'Python for Data Analysis', category: 'Data Science' },
  { title: 'Machine Learning Projects', category: 'Data Science' },
  { title: 'Cloud Fundamentals (AWS)', category: 'Cloud' },
  { title: 'Kubernetes for Developers', category: 'DevOps' },
  { title: 'Cybersecurity Essentials', category: 'Security' }
];

export function generateCourses(startCourseId = 7, count = 10, startModuleId = 25, startLessonId = 121) {
  const courses = [];
  let moduleId = startModuleId;
  let lessonId = startLessonId;
  let ytIndex = 0;

  for (let i = 0; i < count; i++) {
    const id = startCourseId + i;
    const curated = curatedGeneratedCourses[i % curatedGeneratedCourses.length];
    const title = curated?.title || `Course ${id}`;
    const category = curated?.category || categories[i % categories.length];
    const level = levels[i % levels.length];
    const price = 49.99 + (i % 5) * 25;

    const modules = [];
    for (let m = 0; m < 4; m++) {
      const lessons = [];
      for (let l = 0; l < 5; l++) {
        const ytId = YT_POOL[ytIndex % YT_POOL.length];
        ytIndex++;
        lessons.push({
          id: lessonId++,
          title: `Lesson ${m + 1}.${l + 1}`,
          type: 'video',
          duration: 240 + ((m + l) % 5) * 60,
          orderIndex: l + 1,
          videoUrl: `https://www.youtube.com/embed/${ytId}`
        });
      }
      modules.push({
        id: moduleId++,
        title: `Module ${m + 1}`,
        description: `Auto-generated module ${m + 1}`,
        orderIndex: m + 1,
        lessons
      });
    }


    courses.push({
      id,
      title,
      description: 'Auto-generated sample course with YouTube video lessons.',
      // Use curated thumbnail (logos for known topics; otherwise relevant photo)
      thumbnail: getCuratedThumbnail(title, category, id),
      price,
      category,
      level,
      status: 'published',
      instructorId: 2,
      firstName: 'Jane',
      lastName: 'Educator',
      instructorAvatar: null,
      enrollmentCount: 50 + (i * 7) % 200,
      createdAt: '2024-02-01T00:00:00.000Z',
      modules
    });
  }

  return courses;
}
