const STORAGE_KEY = 'easyworkshop_content';

const defaultServices = [
  {
    id: '699bb5f457808fcd987f1008',
    title: 'Research Papers',
    description: 'Comprehensive analytical and investigative research papers across all academic fields. Our team of experts delivers thoroughly researched content with proper citations and methodology.',
    icon: 'FileText',
    category: 'research',
    order: 1,
    is_active: true,
  },
  {
    id: '699bb5f457808fcd987f1009',
    title: 'Literature Reviews',
    description: 'In-depth analysis and synthesis of existing research and scholarly articles. We help you understand the current state of knowledge in your field.',
    icon: 'Search',
    category: 'research',
    order: 2,
    is_active: true,
  },
  {
    id: '699bb5f457808fcd987f100a',
    title: 'Thesis Writing',
    description: 'Complete thesis development support from proposal to final submission. We guide you through every chapter with expert feedback.',
    icon: 'PenTool',
    category: 'postgraduate',
    order: 3,
    is_active: true,
  },
  {
    id: '699bb5f457808fcd987f100b',
    title: 'Dissertation Support',
    description: 'Comprehensive assistance for doctoral dissertations including research design, data collection, analysis, and writing.',
    icon: 'GraduationCap',
    category: 'postgraduate',
    order: 4,
    is_active: true,
  },
  {
    id: '699bb5f457808fcd987f100c',
    title: 'Data Analysis',
    description: 'Statistical analysis and interpretation using SPSS, R, Python, and other advanced tools. We handle both quantitative and qualitative data.',
    icon: 'BarChart3',
    category: 'research',
    order: 5,
    is_active: true,
  },
  {
    id: '699bb5f457808fcd987f100d',
    title: 'Academic Editing',
    description: 'Professional editing and proofreading to ensure your work meets the highest academic standards and publication requirements.',
    icon: 'Users',
    category: 'college',
    order: 6,
    is_active: true,
  }
];

const defaultProjects = [
  {
    id: '699bb5f457808fcd987f1003',
    title: 'Economic Impact Analysis of Trade Policies',
    field: 'economics',
    level: 'postgraduate',
    year: 2024,
    image_url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80',
    description: 'Comprehensive study on market dynamics and economic policy effects in emerging markets focusing on international trade agreements.',
    is_featured: true,
    is_active: true,
    order: 1,
  },
  {
    id: '699bb5f457808fcd987f1004',
    title: 'Clinical Psychology: CBT Outcomes Study',
    field: 'psychology',
    level: 'postgraduate',
    year: 2024,
    image_url: 'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&q=80',
    image_alt: 'Therapist and client in conversation during a counseling session, illustrating cognitive behavioral therapy research',
    description: 'In-depth analysis of cognitive behavioral therapy outcomes in adolescent patients with anxiety disorders.',
    is_featured: true,
    is_active: true,
    order: 2,
  },
  {
    id: '699bb5f457808fcd987f1005',
    title: 'Healthcare Data Analytics Framework',
    field: 'medicine',
    level: 'undergraduate',
    year: 2024,
    image_url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&q=80',
    description: 'Statistical analysis of patient health records and treatment outcomes using machine learning approaches.',
    is_featured: true,
    is_active: true,
    order: 3,
  },
  {
    id: '699bb5f457808fcd987f1006',
    title: 'Corporate Strategy in Emerging Markets',
    field: 'business',
    level: 'postgraduate',
    year: 2023,
    image_url: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
    description: 'Strategic analysis of market entry strategies for multinational corporations expanding into developing economies.',
    is_featured: false,
    is_active: true,
    order: 4,
  },
  {
    id: '699bb5f457808fcd987f1007',
    title: 'Intellectual Property Law Comparative Study',
    field: 'law',
    level: 'undergraduate',
    year: 2023,
    image_url: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&q=80',
    description: 'Comparative analysis of intellectual property laws and their enforcement across different jurisdictions.',
    is_featured: false,
    is_active: true,
    order: 5,
  }
];

const defaultTeamMembers = [
  {
    id: '699bb5f457808fcd987f100e',
    name: 'Dr. Sarah Mitchell',
    position: 'CEO & Founder',
    department: 'leadership',
    bio: 'PhD in Economics from Harvard University with 15 years of academic research experience. Dr. Mitchell founded EasyWorkShop with a vision to make academic excellence accessible to all.',
    image_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80',
    email: 'sarah@easyworkshop.com',
    linkedin: 'https://linkedin.com',
    is_active: true,
    order: 1,
  },
  {
    id: '699bb5f457808fcd987f100f',
    name: 'Prof. James Anderson',
    position: 'Head of Research',
    department: 'research',
    bio: 'Former university professor with expertise in quantitative research methods. Prof. Anderson leads our research team with over 20 years of experience.',
    image_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    email: 'james@easyworkshop.com',
    linkedin: 'https://linkedin.com',
    is_active: true,
    order: 2,
  },
  {
    id: '699bb5f457808fcd987f1010',
    name: 'Dr. Emily Chen',
    position: 'Lead Editor',
    department: 'editing',
    bio: 'Expert in academic writing and publication standards. Dr. Chen ensures all our deliverables meet the highest quality standards.',
    image_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80',
    email: 'emily@easyworkshop.com',
    linkedin: 'https://linkedin.com',
    is_active: true,
    order: 3,
  },
  {
    id: '699bb5f457808fcd987f1011',
    name: 'Michael Torres',
    position: 'Client Relations Director',
    department: 'support',
    bio: 'Dedicated to ensuring exceptional client experiences. Michael oversees our support team and maintains strong client relationships.',
    image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    email: 'michael@easyworkshop.com',
    linkedin: 'https://linkedin.com',
    is_active: true,
    order: 4,
  }
];

const defaultState = {
  services: defaultServices,
  projects: defaultProjects,
  teamMembers: defaultTeamMembers,
};

// Unsplash removed these photos (they now return 404). Visitors who loaded the site earlier
// still hold the old seed URLs in localStorage, so swap them on read.
const RETIRED_IMAGE_URLS = {
  'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&q=80':
    'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&q=80',
};

export const replaceRetiredImages = (projects) => projects.map((project) => {
  const replacementUrl = RETIRED_IMAGE_URLS[project.image_url];
  return replacementUrl ? { ...project, image_url: replacementUrl } : project;
});

const isBrowser = typeof window !== 'undefined';

const readState = () => {
  if (!isBrowser) {
    return { ...defaultState };
  }

  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    if (!value) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultState));
      return { ...defaultState };
    }
    const stored = JSON.parse(value);
    return {
      services: Array.isArray(stored.services) ? stored.services : defaultServices,
      projects: Array.isArray(stored.projects) ? replaceRetiredImages(stored.projects) : defaultProjects,
      teamMembers: Array.isArray(stored.teamMembers) ? stored.teamMembers : defaultTeamMembers,
    };
  } catch (error) {
    return { ...defaultState };
  }
};

const writeState = (state) => {
  if (!isBrowser) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    // ignore write failures in private mode
  }
};

const ensureState = () => {
  const state = readState();
  if (!isBrowser) return state;
  writeState(state);
  return state;
};

const sortByOrder = (items) => [...items].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

const createRecord = (key, data) => {
  const state = ensureState();
  const id = `${key}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  const record = { id, ...data };
  state[key] = [record, ...(state[key] || [])];
  writeState(state);
  return record;
};

const updateRecord = (key, id, data) => {
  const state = ensureState();
  state[key] = (state[key] || []).map((item) => item.id === id ? { ...item, ...data } : item);
  writeState(state);
  return state[key].find((item) => item.id === id);
};

const deleteRecord = (key, id) => {
  const state = ensureState();
  state[key] = (state[key] || []).filter((item) => item.id !== id);
  writeState(state);
  return id;
};

export const getServices = async () => {
  const { services } = ensureState();
  return sortByOrder(services.filter((service) => service.is_active));
};

export const getAllServices = async () => {
  const { services } = ensureState();
  return sortByOrder(services);
};

export const createService = async (service) => createRecord('services', service);
export const updateService = async ({ id, data }) => updateRecord('services', id, data);
export const deleteService = async (id) => deleteRecord('services', id);

export const getProjects = async () => {
  const { projects } = ensureState();
  return [...projects].sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
};

export const getFeaturedProjects = async () => {
  const { projects } = ensureState();
  return projects
    .filter((project) => project.is_active && project.is_featured)
    .sort((a, b) => (b.order ?? 0) - (a.order ?? 0));
};

export const getProjectPreview = async (limit = 3) => {
  const featured = await getFeaturedProjects();
  return featured.slice(0, limit);
};

export const createProject = async (project) => createRecord('projects', project);
export const updateProject = async ({ id, data }) => updateRecord('projects', id, data);
export const deleteProject = async (id) => deleteRecord('projects', id);

export const getTeamMembers = async () => {
  const { teamMembers } = ensureState();
  return sortByOrder(teamMembers.filter((member) => member.is_active));
};

export const createTeamMember = async (member) => createRecord('teamMembers', member);
export const updateTeamMember = async ({ id, data }) => updateRecord('teamMembers', id, data);
export const deleteTeamMember = async (id) => deleteRecord('teamMembers', id);

export const getPreviewServices = async (limit = 6) => {
  const services = await getServices();
  return services.slice(0, limit);
};
