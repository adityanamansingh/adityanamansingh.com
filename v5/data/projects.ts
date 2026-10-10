// Case studies. Only facts from the CV / LinkedIn are used. `stub: true` marks entries with no write-up yet (no extra note is shown on the page).
// To add images: drop files in public/images named  project-<slug>.jpg  (cover)  and  project-<slug>-2.jpg, -3.jpg, -4.jpg (gallery).
export type Project = {
  slug: string;
  title: string;
  kind: string;
  year: string;
  role: string;
  summary: string;
  stack: string[];
  results: { value: string; label: string }[];
  story: { heading: string; points: string[] }[];
  links: { label: string; href: string }[];
  stub?: boolean;
  /** CSS background behind a transparent cover (e.g. an SVG exported without its backdrop). */
  coverBg?: string;
};

export const projects: Project[] = [
  {
    slug: "mono-solutions",
    coverBg: "linear-gradient(93deg, #110E33 4.76%, #4338CA 48.19%, #D0CDF2 95.24%)", // "New Mono Gradient" from the Mono design system
    title: "Mono Solutions",
    kind: "Website builder & billing platform",
    year: "2025 – now",
    role: "Senior Software Engineer",
    summary: "A shared Vue 3 design system for a website builder, plus the Account Center and Stripe billing behind it.",
    stack: ["Vue 3", "TypeScript", "Storybook", "SCSS", "Chromatic", "Git", "PHP", "Laravel", "Stripe", "REST APIs", "PostgreSQL", "MySQL", "Docker", "AWS S3", "LocalStack", "Redis", "Keycloak", "Argo CD"],
    results: [
      { value: "20+", label: "reusable Vue 3 components in the shared design system" },
    ],
    story: [
      { heading: "Website Builder & Editor", points: [
        "Developed and maintained 20+ reusable Vue 3 components for the shared Design System",
        "Built and enhanced Favourite Rows, Row Editor, Global/Local Design and other website editing features",
        "Fixed complex frontend issues, optimized component behavior and reviewed pull requests",
      ] },
      { heading: "Account Center & Billing", points: [
        "Built Account Center features: user management, authentication and billing workflows",
        "Integrated and enhanced Stripe payment and subscription functionality",
        "Built REST APIs and backend business logic in Laravel, with PostgreSQL and MySQL schema and performance work",
      ] },
      { heading: "Platform & Infrastructure", points: [
        "Configured Docker-based dev environments with LocalStack, Redis, PostgreSQL and AWS S3",
        "Improved local workflows and resolved production issues across frontend and backend",
      ] },
      { heading: "Flagship revamp", points: [
        "Currently working on a flagship Mono project: a revamp of an older product, with an admin panel, Keycloak integration, PostgreSQL, Redis and Argo CD",
      ] },
    ],
    links: [],
  },
  {
    slug: "admitquest",
    coverBg: "linear-gradient(180deg, #262626 0%, #131313 100%)", // the SVG cover has a transparent fade, so give it its dark backdrop
    title: "AdmitQuest.ai",
    kind: "AI admissions platform",
    year: "2024 – 2025",
    role: "Software Engineer in Technology & Product, Sunstone",
    summary: "An AI-driven platform that matches students to colleges, with a GenAI chatbot and ML scoring.",
    stack: ["Gemini API", "Streamlit", "Node.js", "Next.js", "Docker", "CI/CD", "REST APIs"],
    results: [
      { value: "93%", label: "accuracy on the ML scoring models" },
    ],
    story: [
      { heading: "What I built", points: [
        "Built AI-integrated modules using Gemini APIs and Streamlit for student–college compatibility analysis",
        "Developed a GenAI chatbot combining AI models and database logic to guide students in finding suitable colleges",
        "Delivered ML-based scoring models with 93% accuracy, boosting personalization and counselor efficiency",
        "Optimized REST APIs and workflows for faster data processing and smoother user experience",
        "Partnered with data and product teams to convert insights into user-centric features",
      ] },
    ],
    links: [],
  },
  {
    slug: "collegesearch",
    title: "CollegeSearch.in",
    kind: "EdTech platform",
    year: "2022 – 2025",
    role: "Software Engineer in Technology & Product, Sunstone",
    summary: "Moved a legacy Core PHP platform to Laravel, then made it fast, safe and good at matching students to colleges.",
    stack: ["PHP", "Laravel", "CodeIgniter", "MySQL", "Redis", "GA4", "Search Console", "Clarity", "Jira", "Filament"],
    results: [
      { value: "9s → 0.6s", label: "page load time" },
      { value: "~80%", label: "Core Web Vitals and SEO improvement" },
      { value: "1.4L+", label: "requests through the lead scoring & recommendation engine" },
      { value: "~1,700", label: "successful admissions, 3L+ students benefitted" },
    ],
    story: [
      { heading: "Migration & performance", points: [
        "Migrated the legacy Core PHP platform to Laravel, improving scalability, maintainability and system performance",
        "Improved Core Web Vitals and SEO by ~80%, reducing page load time from 9s → 0.6s and boosting overall site performance",
      ] },
      { heading: "Systems", points: [
        "Consolidated 200+ daily crons into a single “All-in-One Cron” streamlining lead flow and eliminating job conflicts",
        "Built a Lead Scoring & Recommendation Engine handling 1.4L+ requests and benefitting 3L+ students, resulting in ~1700 successful admissions",
      ] },
      { heading: "Security & analytics", points: [
        "Enhanced security and reliability by eliminating SQL injections, implementing caching, and optimizing redirects & UTM tracking with Google Analytics",
        "Managed analytics and performance via GA4, Search Console, Clarity and Jira",
      ] },
    ],
    links: [{ label: "collegesearch.in", href: "https://collegesearch.in" }],
  },
  {
    slug: "ikio-technologies",
    title: "IKIO Technologies",
    kind: "Corporate website",
    year: "—",
    role: "Design & development",
    summary: "Website for IKIO Technologies Limited, an Indian LED lighting and electronics manufacturer based in Noida.",
    stack: ["PHP", "Laravel", "CodeIgniter"],
    results: [],
    story: [
      { heading: "What I did", points: [
        "Designed and developed the corporate website for IKIO Technologies Limited",
        "Built ahead of the company’s IPO",
        "A detailed Investors section with 15 sub-sections: SEBI LODR disclosures, financial information, shareholding pattern, corporate governance, stock exchange intimations, secretarial compliance, investor meets and earning calls, annual returns, CSR, press releases and the IPO",
        "Products organised into five lines: ODM for LED lights, switches and hardware components, LED refrigeration lights and controls, recreational vehicle components, and LED drivers",
        "Sections for About Us, Facilities, Careers and Contact Us",
        "A custom admin panel for the investor relations team: manage the investor home, years, shareholding pattern and information, annual returns, CSR, stock exchange intimations, press and newspaper publications, financial information, corporate governance, secretarial compliance reports and investor meets and earning calls, plus pages, contacts and careers",
      ] },
    ],
    links: [{ label: "ikiotech.com", href: "https://ikiotech.com/" }],
    
  },
  {
    slug: "rlux",
    title: "RLUX",
    kind: "Corporate website",
    year: "—",
    role: "Design & development",
    summary: "Website for Rlux, the LED lighting brand of Royalux Exports Pvt. Ltd. (founded 1987, Noida), making commercial and industrial lighting for global markets.",
    stack: ["PHP", "Laravel", "CodeIgniter"],
    results: [],
    story: [
      { heading: "What I did", points: [
        "Designed and developed the website for Rlux, the LED lighting brand of Royalux Exports",
        "Product-led homepage with a rotating hero banner (such as the NOMA T8 LED tube lights) and a company history section",
        "Products organised into commercial lighting (panel lights, troffers, tube lights, linear low bay), industrial lighting (high bay, shoebox area lights, wall packs, sports and canopy lights) and other products (automotive lights, pipes, RV accessories, solar)",
        "Company pages: overview, why choose us, manufacturing and innovation, quality and certifications, factory overview and partners",
        "Resources: blogs and news, downloads and careers, plus a catalog download and a product customization request",
        "Quick WhatsApp, LinkedIn and phone links on every page",
        "A custom admin panel to manage categories, sub-categories, products, blogs, homepage sliders, pages, downloads, careers and the newsletter, and to handle contact messages, enquiries and OEM forms",
      ] },
    ],
    links: [{ label: "rlux.in", href: "https://rlux.in/" }],
    
  },
  {
    slug: "dhoa",
    title: "DHOA · Design House of Alexandra",
    kind: "Luxury furniture website",
    year: "—",
    role: "Design & development",
    summary: "Website for DHOA (Design House of Alexandra), a luxury furniture brand with ranges for drawing rooms, dining rooms and outdoor spaces.",
    stack: ["PHP", "Laravel", "CodeIgniter"],
    results: [],
    story: [
      { heading: "What I did", points: [
        "Designed and developed the website for DHOA (Design House of Alexandra)",
        "A dark, gold-accented look with an editorial feel to suit a luxury furniture brand",
        "Product listing with a filter sidebar, a product grid and pagination",
        "Product detail pages with an image gallery, a specifications table and related products",
        "A collection page grouping the furnishing ranges for drawing rooms, dining rooms and outdoor spaces",
        "A blog with article listings and detail pages",
        "A contact page with a map and an enquiry form",
        "An admin panel to manage the site",
      ] },
    ],
    links: [],
    
  },
  {
    slug: "ikio-led-lighting",
    title: "IKIO LED Lighting",
    kind: "Corporate website",
    year: "—",
    role: "Design & development",
    summary: "Website for IKIO LED Lighting, a US-based maker of LED fixtures for commercial, industrial and multi-family spaces.",
    stack: ["PHP", "Laravel", "CodeIgniter"],
    results: [],
    story: [
      { heading: "What I did", points: [
        "Designed and developed the website for IKIO LED Lighting",
        "Company, Products, Media, Resources and Support sections, with a banner slider for featured products such as the Delphi back-lit panel light",
        "Case studies and FAQ pages, plus downloadable product catalogs",
        "An admin panel to manage products, stock, categories and sub-categories",
      ] },
    ],
    links: [{ label: "ikioledlighting.com", href: "https://www.ikioledlighting.com/" }],
    
  },
  {
    slug: "rowdy-meals",
    title: "Rowdy Meals",
    kind: "Food delivery startup",
    year: "2020 – 2022",
    role: "Co-Founder & CTO",
    summary: "A no-contact food delivery startup in Haridwar: choose a restaurant, pick a dish, then get it delivered or pick it up.",
    stack: [],
    results: [],
    story: [
      { heading: "What it offered", points: [
        "Ordering in three steps: choose a restaurant, choose a dish, then pick up or get it delivered",
        "No-contact delivery, with riders trained on hand sanitisation, mask-wearing and safe handling of packages",
        "Daily temperature checks for riders at the pick-up points",
        "Cashless payments through UPI and netbanking, including Paytm, Google Pay and BHIM",
        "A home-style tiffin service for Haridwar, announced as coming soon",
      ] },
    ],
    links: [],
  },
];

export const now = [
  { label: "Working on", value: "A flagship Mono Solutions revamp: admin panel, Keycloak, Redis and Argo CD, plus the Vue 3 design system" },
  { label: "Studying", value: "M.Tech in Cloud Computing at BITS Pilani" },
  { label: "Exploring", value: "Gemini, Vertex AI and multimodal RAG" },
  { label: "Off-screen", value: "Trekking, music, dance, and moving between places" },
];
