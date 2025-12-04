module.exports = {
  projects: [
    {
      title: 'AI Sales Assistant',
      description:
        'Conversational assistant that analyzes CRM data and drafts outreach emails using GPT-powered workflows.',
      image: 'https://images.unsplash.com/photo-1520607162513-77705c0f0d4a',
      technologies: ['React', 'Node.js', 'MongoDB', 'OpenAI'],
      githubUrl: 'https://github.com/example/ai-sales-assistant',
      liveUrl: 'https://ai-sales.example.com',
      category: 'fullstack',
      featured: true,
    },
    {
      title: 'Realtime Collaboration Board',
      description:
        'Figma-style collaboration board with WebRTC cursors, canvas editing tools, and auth.',
      image: 'https://images.unsplash.com/photo-1487017159836-4e23ece2e4cf',
      technologies: ['Next.js', 'Node.js', 'Socket.io', 'Redis'],
      githubUrl: 'https://github.com/example/realtime-board',
      liveUrl: 'https://board.example.com',
      category: 'web',
      featured: true,
    },
    {
      title: 'ML Experiment Tracker',
      description:
        'Dashboard that aggregates ML experiments, metrics, and artifacts with role-based access.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475',
      technologies: ['React', 'FastAPI', 'PostgreSQL', 'Docker'],
      githubUrl: 'https://github.com/example/ml-tracker',
      liveUrl: '',
      category: 'ai-ml',
      featured: false,
    },
  ],

  skills: [
    { name: 'JavaScript (ES6+)', proficiency: 92, icon: 'js', category: 'programming' },
    { name: 'React', proficiency: 90, icon: 'react', category: 'framework' },
    { name: 'Node.js', proficiency: 88, icon: 'node', category: 'framework' },
    { name: 'TypeScript', proficiency: 85, icon: 'ts', category: 'programming' },
    { name: 'MongoDB', proficiency: 84, icon: 'mongo', category: 'database' },
    { name: 'Express.js', proficiency: 86, icon: 'express', category: 'framework' },
    { name: 'GraphQL', proficiency: 70, icon: 'graphql', category: 'framework' },
    { name: 'AWS', proficiency: 75, icon: 'aws', category: 'tool' },
    { name: 'Docker', proficiency: 78, icon: 'docker', category: 'tool' },
    { name: 'Leadership', proficiency: 85, icon: 'lead', category: 'soft-skill' },
    { name: 'Communication', proficiency: 92, icon: 'comm', category: 'soft-skill' },
    { name: 'System Design', proficiency: 80, icon: 'system', category: 'programming' },
  ],

  resume: {
    personalInfo: {
      name: 'Divyansh Choudhary',
      title: 'Full Stack Engineer | AI Builder',
      email: 'hello@divyansh.dev',
      phone: '+91 99999 99999',
      location: 'Bengaluru, India',
      website: 'https://divyansh.dev',
      linkedin: 'https://linkedin.com/in/divyanshc',
      github: 'https://github.com/divyanshc',
    },
    summary:
      'Product-minded engineer with 4+ years shipping full-stack web and AI products. I move quickly, sweat the UX, and love collaborating with design, GTM, and leadership to build things that users rave about.',
    experience: [
      {
        title: 'Senior Software Engineer',
        company: 'SaaS Unicorn',
        location: 'Remote',
        startDate: '2023-02',
        endDate: 'Present',
        description: [
          'Led the migration of legacy services to a unified Node.js + GraphQL platform serving 150k+ monthly users.',
          'Launched AI-powered insights that increased activation by 18%.',
          'Mentored 4 engineers and drove adoption of automated testing across the tribe.',
        ],
      },
      {
        title: 'Full Stack Engineer',
        company: 'Early-stage Startup',
        location: 'Bengaluru, IN',
        startDate: '2021-06',
        endDate: '2023-01',
        description: [
          "Shipped the MVP in 6 weeks using React, Node.js, and MongoDB; closed the company's first 5 enterprise customers.",
          'Implemented observability and CI/CD pipelines that reduced release time from days to minutes.',
        ],
      },
    ],
    education: [
      {
        degree: 'B.Tech, Computer Science',
        institution: 'National Institute of Technology',
        location: 'India',
        startDate: '2017-08',
        endDate: '2021-05',
        gpa: '8.6/10',
        achievements: ["Dean's List (4x)", 'ACM Student Chapter Lead'],
      },
    ],
    skills: {
      technical: [
        'JavaScript/TypeScript',
        'React',
        'Node.js',
        'Express',
        'MongoDB',
        'GraphQL',
        'AWS',
        'Docker',
        'CI/CD',
      ],
      soft: ['Product Thinking', 'Team Leadership', 'Mentorship', 'Stakeholder Communication'],
    },
    certifications: [
      {
        name: 'AWS Certified Developer - Associate',
        issuer: 'Amazon Web Services',
        date: '2023',
      },
      {
        name: 'MongoDB Associate Developer',
        issuer: 'MongoDB University',
        date: '2022',
      },
    ],
  },
};
