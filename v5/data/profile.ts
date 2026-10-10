export const profile = {
  name: "Aditya Naman Singh",
  role: "Full Stack & AI Engineer",
  roles: ["Full Stack Engineer", "AI Integration Specialist", "Laravel & Node.js Expert", "Cloud & DevOps"],
  tagline:
    "I build scalable web platforms and AI-powered products — from Laravel migrations to Gemini-driven RAG systems.",
  email: "adityanamansingh@gmail.com",
  phone: "+91 7500006161",
  location: "Delhi NCR, India",
  available: true,
  cv: "/aditya-naman-singh-resume.pdf",
  socials: [
    { label: "LinkedIn", href: "https://linkedin.com/in/adityanamansingh" },
    { label: "Instagram", href: "https://instagram.com/namantastic" },
    { label: "Facebook", href: "https://facebook.com/adityanamansingh" },
    // TODO: add GitHub
  ],
  about: [
    "Adventurous. Passionate. Ambitious. Curious technologist, happy-go-lucky creator, and believer that intent plus effort has zero limits. My journey from sales and strategy to code and creativity has been anything but linear.",
    "Full Stack & AI Engineer with 6+ years of experience in Laravel and Node.js. Expert in PHP (5+ yrs), Node.js (2+ yrs), AI integration (Gemini, Vertex AI, RAG), and server management on CentOS & Ubuntu.",
    "Skilled in REST APIs, MVC architecture, and cloud deployment on AWS & GCP. I've served 30+ clients with a proven track record in EdTech, FinTech and startups.",
    "Currently a Senior Software Engineer at Mono Solutions ApS, working across a Vue 3 design system, Laravel billing services and Stripe subscriptions.",
    "I vibe with people who support growth — in work, knowledge and positive energy.",
  ],
  facts: [
    ["Education", "B.Tech I.T. · M.Tech Cloud (BITS Pilani)"],
    ["Languages", "English, Hindi"],
    ["Nationality", "Indian"],
    ["Freelance", "Available"],
  ],
};

export const metrics = [
  { value: 6, suffix: "+", label: "Years experience" },
  { value: 30, suffix: "+", label: "Clients served" },
  { value: 93, suffix: "%", label: "ML model accuracy" },
];

export const services = [
  { title: "Full Stack Development", desc: "PHP, Laravel, Node.js, Express.js", icon: "Code2" },
  { title: "AI & ML Integration", desc: "Gemini, Vertex AI, RAG and ML model deployment.", icon: "Sparkles" },
  { title: "Cloud & DevOps", desc: "AWS, GCP, Docker, CI/CD, Linux server management.", icon: "Cloud" },
  { title: "REST API Development", desc: "Scalable REST APIs with clean MVC architecture.", icon: "Network" },
  { title: "EdTech Solutions", desc: "AI-powered educational platforms with 93% accuracy ML models.", icon: "GraduationCap" },
  { title: "Database & Performance", desc: "MySQL, MongoDB, Redis caching, performance optimization.", icon: "Database" },
];

export const skills = [
  "PHP", "Laravel", "Node.js", "Vue 3", "Next.js", "TypeScript", "Python", "Stripe", "MySQL", "PostgreSQL", "MongoDB", "Redis",
  "Gemini", "Vertex AI", "RAG", "Streamlit", "AWS", "GCP", "Docker", "CI/CD", "Linux", "Angular", "REST APIs",
];

// Company logos and LinkedIn pages (from LinkedIn, stored in public/images/orgs/). Keyed by the org name used in `experience`/`education`.
export const orgs: Record<string, { logo?: string; url?: string }> = {
  "Mono Solutions ApS": { logo: "/images/orgs/mono-solutions.jpg", url: "https://www.linkedin.com/company/888251/" },
  "Adaan Digital Solutions": { logo: "/images/orgs/adaan.jpg", url: "https://www.linkedin.com/company/206116/" },
  "Sunstone Education Technology Pvt. Ltd.": { logo: "/images/orgs/sunstone.jpg", url: "https://www.linkedin.com/school/15098539/" },
  "College of Engineering Roorkee": { logo: "/images/orgs/coer.jpg", url: "https://www.linkedin.com/school/6319435/" },
  "Vienhance Studio": { logo: "/images/orgs/vienhance-studio.jpg", url: "https://www.linkedin.com/company/79953339/" },
  "Kalour Cosmetics & Beauty Products LLP": { logo: "/images/orgs/kalour.jpg", url: "https://www.linkedin.com/company/31238345/" },
  "Rowdy Meals": { logo: "/images/orgs/rowdy-meals.jpg", url: "https://www.linkedin.com/company/76807928/" },
  "Masha Art": { logo: "/images/orgs/masha-art.jpg", url: "https://www.linkedin.com/company/14620602/" },
  "Cryptina India": {},
  "BITS Pilani (Work Integrated Learning Programmes)": { logo: "/images/orgs/bits-pilani.jpg", url: "https://www.linkedin.com/school/9505366/" },
  "Sherwood College": { logo: "/images/orgs/sherwood.jpg", url: "https://www.linkedin.com/school/6702890/" },
  "Delhi Public School, Ranipur, Haridwar": { logo: "/images/orgs/dps-ranipur.jpg", url: "https://www.linkedin.com/school/14611423/" },
};
export const orgOf = (org: string) => orgs[org.split(" · ")[0]];

export const experience = [
  {
    role: "Senior Software Engineer",
    org: "Mono Solutions ApS · employed via Adaan Digital Solutions (India)",
    period: "Nov 2025 – Present",
    summary: ["Built the shared Vue 3 design system (20+ reusable components) behind the website builder and editor", "Built the Account Center and Stripe billing, with Laravel REST APIs on PostgreSQL and MySQL", "Set up Docker and LocalStack dev environments", "Working on a flagship revamp of an older product: admin panel, Keycloak, Redis and Argo CD"],
    groups: [
      {
        title: "Website Builder & Editor",
        points: [
          "Developed and maintained 20+ reusable Vue 3 components for the shared Design System",
          "Built and enhanced Favourite Rows, Row Editor, Global/Local Design and other website editing features",
          "Fixed complex frontend issues, optimized component behavior and reviewed pull requests",
        ],
      },
      {
        title: "Account Center & Billing",
        points: [
          "Built Account Center features: user management, authentication and billing workflows",
          "Integrated and enhanced Stripe payment and subscription functionality",
          "Built REST APIs and backend business logic in Laravel; PostgreSQL and MySQL schema and performance work",
        ],
      },
      {
        title: "Platform & Infrastructure",
        points: [
          "Configured Docker-based dev environments with LocalStack, Redis, PostgreSQL and AWS S3",
          "Improved local workflows and resolved production issues across frontend and backend",
        ],
      },
      {
        title: "Flagship revamp",
        points: [
          "Currently working on a flagship Mono project: a revamp of an older product, with an admin panel, Keycloak integration, PostgreSQL, Redis and Argo CD",
        ],
      },
    ],
    stack: ["Vue 3", "TypeScript", "Storybook", "SCSS", "Chromatic", "Git", "PHP", "Laravel", "Stripe", "REST APIs", "PostgreSQL", "MySQL", "Docker", "AWS S3", "LocalStack", "Redis", "Keycloak", "Argo CD"],
  },
  {
    role: "Software Engineer in Technology & Product",
    org: "Sunstone Education Technology Pvt. Ltd.",
    period: "Jul 2022 – Nov 2025",
    summary: ["AdmitQuest.ai: AI modules with Gemini and Streamlit, a GenAI chatbot and ML scoring models at 93% accuracy", "CollegeSearch.in: moved the legacy Core PHP platform to Laravel and merged 200+ daily crons into one", "Built the lead scoring and recommendation engine (1.4L+ requests, ~1,700 admissions)", "Cut page loads from 9s to 0.6s"],
    groups: [
      {
        title: "AdmitQuest.ai — AI-driven platform for personalized admissions and recommendations",
        points: [
          "Built AI-integrated modules using Gemini APIs and Streamlit for student–college compatibility analysis.",
          "Developed a GenAI chatbot combining AI models and database logic to guide students in finding suitable colleges.",
          "Delivered ML-based scoring models with 93% accuracy, boosting personalization and counselor efficiency.",
          "Optimized REST APIs and workflows for faster data processing and smoother user experience.",
          "Partnered with data and product teams to convert insights into user-centric features.",
        ],
      },
      {
        title: "CollegeSearch.in — EdTech platform helping students find and apply to colleges",
        points: [
          "Migrated the legacy Core PHP platform to Laravel, improving scalability, maintainability, and system performance.",
          "Consolidated 200+ daily crons into a single “All-in-One Cron” streamlining lead flow and eliminating job conflicts.",
          "Built a Lead Scoring & Recommendation Engine handling 1.4L+ requests and benefitting 3L+ students, resulting in ~1700 successful admissions.",
          "Improved Core Web Vitals and SEO by ~80%, reducing page load time from 9s → 0.6s and boosting overall site performance.",
          "Enhanced security and reliability by eliminating SQL injections, implementing caching, and optimizing redirects & UTM tracking with Google Analytics.",
          "Managed analytics and performance via GA4, Search Console, Clarity, and Jira",
        ],
      },
    ],
  },
  {
    role: "Student Intern",
    earlier: true,
    org: "College of Engineering Roorkee",
    period: "Apr 2022 – Jul 2022",
    summary: "Core IT team intern, mentoring students and backing project-based learning.",
    points: [
      "Worked in the core IT department, endorsing the institution's Project-Based Learning vision",
      "Mentored slow learners and built student interest in programming",
    ],
  },
  {
    role: "Co-Founder",
    earlier: true,
    org: "Vienhance Studio",
    period: "Sep 2021 – Jul 2022",
    summary: "Led a junior design team on client projects, from concept to delivery.",
    points: [
      "Led and mentored a junior design team across multiple client projects, from concept to delivery",
      "Built presentations, strategy material and design concepts aligned with client brand goals",
    ],
  },
  {
    role: "Co-Founder & CTO",
    earlier: true,
    org: "Rowdy Meals",
    period: "Jul 2020 – May 2022",
    summary: "Led technology, budgets and weekly management reporting.",
    points: ["Led technology, budgets, variance and weekly management reporting"],
  },
  {
    role: "Senior Web Developer",
    earlier: true,
    org: "Masha Art",
    period: "Jul 2019 – Mar 2020",
    summary: "Built the interactive website behind a 40% sales increase; delivered 9 projects on time.",
    points: [
      "Built an interactive website that drove a 40% increase in sales revenue",
      "Owned full lifecycle of 9 projects: 100% on time, 5% under budget",
      "Shipped a server that sped up document generation and search by 20%",
      "Cut downtime by 13% through cleanup and performance work",
    ],
  },
  {
    role: "Technology Officer",
    earlier: true,
    org: "Kalour Cosmetics & Beauty Products LLP",
    period: "Jan 2018 – Jul 2022",
    summary: "Ran production, budgets and inventory, plus listings on Amazon, Flipkart and more.",
    points: [
      "Managed production process, annual budgets and inventory",
      "Ran listings on Amazon, Flipkart, Snapdeal, Meesho, Mirraw and more",
    ],
  },
  {
    role: "Co-Founder",
    earlier: true,
    org: "Cryptina India",
    period: "Apr 2014 – May 2022",
    summary: "Led a team of developers and designers across mobile, web, EdTech and healthcare projects.",
    points: [
      "Led a team of developers and designers for seamless delivery",
      "Projects across mobile apps, web apps, EdTech and healthcare tech",
    ],
  },
];

export const education = [
  { title: "M.Tech in Cloud Computing", org: "BITS Pilani (Work Integrated Learning Programmes)", period: "Apr 2025 – Apr 2027 (ongoing)" },
  { title: "Bachelor of Technology (I.T.)", org: "College of Engineering Roorkee", period: "Aug 2019 – Aug 2023" },
  { title: "XII, PCM with Computer Science", org: "The Asian School, Dehradun", period: "2014 – 2018" },
  { title: "VIII", org: "Sherwood College", period: "2012 – 2014" },
  { title: "V", org: "Delhi Public School, Ranipur, Haridwar", period: "2006 – 2012" },
];

export const certifications = [
  { title: "Gen AI Exchange Program", org: "Hack2skill", period: "Jul 2025", top: true },
  { title: "Inspect Rich Documents with Gemini Multimodality and Multimodal RAG", org: "Google Skill Badge", period: "Jul 2025", top: true },
  { title: "Develop GenAI Apps with Gemini and Streamlit", org: "Google Skill Badge", period: "Jul 2025", top: true },
  { title: "Build Real World AI Applications with Gemini and Imagen", org: "Google Skill Badge", period: "Apr 2025", top: true },
  { title: "Prompt Design in Vertex AI", org: "Google Skill Badge", period: "Apr 2025", top: true },
  { title: "Software Engineering Job Simulation", org: "Goldman Sachs · Forage", period: "Dec 2024", top: true },
  { title: "Angular", org: "Ducat Education", period: "Jan 2023", top: true },
  { title: "MEAN Stack Training", org: "Ducat Education", period: "Dec 2021", top: true },
  { title: "HTML Level 1", org: "Cambridge Certification Authority", period: "Apr 2021" },
  { title: "The Web Developer Bootcamp 2021", org: "Udemy", period: "Apr 2021" },
  { title: "Introduction to Programming: C programming", org: "Udemy", period: "Apr 2021" },
  { title: "Software Development Trainee", org: "Aspiring Minds", period: "Jan 2021" },
  { title: "Data Processing Specialist", org: "Aspiring Minds", period: "Jan 2021" },
  { title: "CIIC on Incubation, Innovation, Entrepreneurship and Startup", org: "College of Engineering Roorkee", period: "Jan 2021" },
  { title: "STC on Web Development", org: "College of Engineering Roorkee", period: "Dec 2020" },
  { title: "Fundamentals of C Programming", org: "Kamala Institute of Technology & Science", period: "May 2020" },
  { title: "Virtual Lab Workshop", org: "IIT Roorkee", period: "May 2020" },
  { title: "Fight COVID-19 Using Robotics & IT", org: "College of Engineering Roorkee", period: "May 2020" },
  { title: "Fundamentals of Digital Marketing", org: "Google", period: "May 2020" },
  { title: "Google Ads Display Certification", org: "Google Ads", period: "Apr 2020" },
  { title: "Google My Business Basics", org: "Google", period: "Apr 2020" },
  { title: "Google Web Designer Basics", org: "Google", period: "Apr 2020" },
  { title: "Applied Machine Learning: Foundations", org: "LinkedIn Learning", period: "Mar 2020", top: true },
  { title: "Succeeding in Web Development: Full Stack and Front End", org: "LinkedIn Learning", period: "Mar 2020" },
  { title: "Excel Essential Training (Office 365)", org: "LinkedIn Learning", period: "Mar 2020" },
  { title: "Learning C", org: "LinkedIn Learning", period: "Mar 2020" },
  { title: "ICT Concave", org: "Microsoft", period: "Oct 2016" },
];

// TODO: replace with real project data (url, screenshot, stack, results)
export const projects = [
  {
    title: "Mono Solutions",
    cat: "Web",
    desc: "Website builder design system and account/billing platform: Vue 3 components, Stripe subscriptions, Laravel APIs.",
    stack: ["Vue 3", "TypeScript", "Laravel", "Stripe", "PostgreSQL"],
  },
  {
    title: "AdmitQuest.ai",
    cat: "AI",
    desc: "AI-driven student–college compatibility platform with a GenAI chatbot and 93%-accurate ML scoring.",
    stack: ["Gemini", "Streamlit", "Node.js", "REST APIs"],
  },
  {
    title: "CollegeSearch.in",
    cat: "EdTech",
    desc: "Legacy PHP to Laravel migration. Page load 9s → 0.6s, lead scoring engine at 1.4L+ requests.",
    stack: ["Laravel", "MySQL", "Redis", "PHP"],
  },
  {
    title: "Rowdy Meals",
    cat: "Startup",
    desc: "Food startup co-founded as CTO — product, tech and operations.",
    stack: ["Web", "Ops"],
  },
];

import recommendations from "./recommendations.json";

// Generated from LinkedIn by `npm run sync:linkedin` (scripts/sync-linkedin.mjs). Entries with "hidden": true are never shown.
// Edit "role" freely; the sync keeps it. Text and photo are overwritten from LinkedIn.
export const testimonials = recommendations.filter((r) => !("hidden" in r && r.hidden)) as { name: string; linkedin: string; role: string; photo: string; text: string; relationship?: string; date?: string }[];

// Sources: CV skills section + LinkedIn (all 5 skill tabs, scrolled to the end) + tools named in the project work. LinkedIn-assessed: HTML, CSS, C, C++, Hadoop, Excel.
export const skillGroups: { group: string; items: string[] }[] = [
  { group: "Languages", items: ["PHP", "JavaScript", "TypeScript", "Python", "SQL", "C", "C++", "C#", "Java", "HTML5", "CSS3", "SCSS"] },
  { group: "Backend & APIs", items: ["Laravel", "CodeIgniter", "Node.js", "Express.js", "Filament", "REST APIs", "MVC architecture", "Authentication", "Keycloak", "Middleware", "Caching", "Cron jobs", "Stripe"] },
  { group: "Frontend & web", items: ["Vue 3", "Next.js", "Angular", "MEAN stack", "jQuery", "Bootstrap", "DHTML", "Responsive UI", "Storybook", "Chromatic", "Full-stack development", "Web development", "Web applications"] },
  { group: "AI & ML", items: ["Gemini", "Vertex AI", "RAG", "Multimodal RAG", "Imagen", "Prompt design", "Machine learning", "Streamlit", "GenAI chatbots", "ML scoring models"] },
  { group: "Databases & big data", items: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "BigQuery", "Hadoop", "Hive", "Apache Pig", "Apache Spark"] },
  { group: "Cloud", items: ["AWS", "EC2", "S3", "RDS", "GCP", "Cloud Storage"] },
  { group: "DevOps & servers", items: ["Docker", "LocalStack", "Linux", "Ubuntu", "CentOS", "Windows Server", "CI/CD", "Argo CD", "Git"] },
  { group: "Ways of working", items: ["Agile", "Scrum", "Jira", "Office 365"] },
  { group: "Data analysis", items: ["Data analysis", "Data cleaning", "Pandas", "NumPy", "Excel", "Spreadsheets"] },
  { group: "SEO & analytics", items: ["SEO", "SEM", "Google Analytics", "GA4", "Search Console", "Clarity", "Google Ads"] },
  { group: "Design", items: ["Figma", "Photoshop", "Illustrator", "Google Web Designer"] },
  { group: "Leadership & business", items: ["Team management", "Leadership", "Management", "Strategic planning", "Strategy", "Business strategy", "Business development", "Sales", "Sales management", "CRM", "Business relationship management", "Client communication", "Mentoring"] },
];

export const skillInfo: Record<string, string> = {
  Python: "Gemini + Streamlit modules and ML scoring models.",
  "Next.js": "Modern React frontends, including this portfolio.",
  S3: "Object storage in AWS and LocalStack-based dev setups.",
  PHP: "5+ years. Legacy Core PHP platforms to modern MVC.",
  Laravel: "Migrated CollegeSearch.in from Core PHP — page load 9s → 0.6s.",
  "Node.js": "2+ years building Express APIs and services.",
  "Express.js": "Lean REST services for startups and EdTech.",
  "REST APIs": "Optimized AdmitQuest.ai workflows for faster data processing.",
  Stripe: "Payments and subscription flows in the Account Center & Billing platform.",
  MySQL: "Primary store behind lead scoring at 1.4L+ requests.",
  PostgreSQL: "Schema changes and performance work on the billing platform.",
  MongoDB: "Document stores for flexible product data.",
  Redis: "Caching layer that took Core Web Vitals up ~80%.",
  Gemini: "Compatibility analysis + GenAI chatbot for AdmitQuest.ai.",
  "Vertex AI": "Prompt design and ML model deployment on GCP.",
  RAG: "Multimodal RAG over rich documents (Google skill badge).",
  Streamlit: "Rapid AI front-ends for the AdmitQuest.ai modules.",
  AWS: "Cloud deployments and server management (S3, EC2, RDS).",
  GCP: "Vertex AI, Gemini and hosted ML workloads.",
  Docker: "Reproducible environments with LocalStack, Redis and PostgreSQL.",
  "CI/CD": "Automated build and release pipelines.",
  Linux: "CentOS & Ubuntu server management.",
  "Vue 3": "20+ reusable components for Mono Solutions' shared Design System.",
  TypeScript: "Typed frontends with Storybook and Chromatic at Mono Solutions.",
  Angular: "MEAN stack and Angular training — frontend when needed.",
};

export const projectHighlights: Record<string, string[]> = {
  "Mono Solutions": [
    "20+ reusable Vue 3 design-system components",
    "Stripe subscriptions and Laravel billing APIs",
    "Dockerized dev environments with LocalStack and Redis",
  ],
  "AdmitQuest.ai": [
    "Gemini APIs + Streamlit for student–college compatibility",
    "GenAI chatbot combining AI models and database logic",
    "ML scoring models with 93% accuracy",
  ],
  "CollegeSearch.in": [
    "200+ daily crons consolidated into one “All-in-One Cron”",
    "Lead scoring engine: 1.4L+ requests, 3L+ students, ~1,700 admissions",
    "Core Web Vitals and SEO up ~80%; load time 9s → 0.6s",
  ],
};

// Add `img: "/beyond/xyz.jpg"` (file in public/beyond/) to any entry to show a real photo on that tile.
export const beyond = {
  quote: "Happiest where the air is thin and the road is long.",
  // Source: owner's own ChatGPT history summary (only things he actually said). Keep claims modest.
  tiles: [
    { key: "trek", title: "Trekking", note: "Trekking and comparing hill routes; Phulara Ridge and Madhyamaheshwar are on the radar.", img: "" },
    { key: "mountain", title: "Haridwar & Ganga ji", note: "Haridwar roots, Delhi NCR address. Enjoys sunrises, sunsets and quiet spots in nature.", img: "" },
    { key: "music", title: "Music", note: "Music is part of the downtime and the thinking.", img: "" },
    { key: "dance", title: "Dance", note: "Dances a little whenever the mood strikes.", img: "" },
    { key: "travel", title: "Moving places", note: "Road trips, long drives and exploring new places.", img: "" },
  ],
  curiosity: [
    "Curious about Generative AI and the possibilities it opens up",
    "Likes experimenting with new technologies and side projects that start with a simple \u201cwhat if?\u201d",
    "Learns by building, testing and figuring things out hands-on",
    "Interested in design and visual storytelling alongside engineering",
    "A practical, resourceful problem-solver",
  ],
};

export const certGroups = ["AI & GenAI", "Software & web", "Digital marketing & tools", "Workshops & programs"] as const;
export const certGroupOf = (title: string): (typeof certGroups)[number] => {
  const t = title.toLowerCase();
  if (/(gen ai|genai|gemini|vertex|multimodal|applied machine learning)/.test(t)) return "AI & GenAI";
  if (/(goldman|angular|mean stack|html level|web developer bootcamp|programming|c programming|learning c|software development trainee|data processing|stc on web|succeeding in web)/.test(t)) return "Software & web";
  if (/(ciic|virtual lab|covid|ict concave)/.test(t)) return "Workshops & programs";
  return "Digital marketing & tools";
};
