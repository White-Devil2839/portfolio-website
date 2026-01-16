# Divyansh Choudhary — Portfolio Website

A modern, full-stack portfolio application built to showcase my work as a product-focused developer. The site features smooth animations, an AI-powered chat assistant, a contact form with email notifications, and an admin dashboard for content management.

---

## What This Project Demonstrates

| Area | Highlights |
|------|------------|
| **Frontend Development** | React 18, React Router, Framer Motion animations, responsive CSS, component-based architecture |
| **Backend Development** | Express.js REST API, MongoDB with Mongoose ODM, secure route handling, data seeding scripts |
| **AI Integration** | Conversational chatbot using Google Gemini API with rate limiting and context-aware responses |
| **DevOps & Tooling** | Environment-based configuration, modular codebase structure, clear separation of concerns |

---

## Features

### Public Pages
- **Home** – Introduction with animated hero section, process workflow, and call-to-action banners
- **About** – Timeline-based experience section with career highlights
- **Projects** – Filterable project gallery with live/GitHub links
- **Skills** – Visual skill proficiency display organized by category
- **Resume** – Structured resume view with education, experience, and certifications
- **Contact** – Form submissions stored in MongoDB with email notifications via Resend

### AI Chat Assistant
A floating chatbot widget that answers questions about my background, projects, and skills. Powered by Google Gemini API with built-in rate limiting to manage API usage.

### Admin Panel
Password-protected dashboard for managing projects, skills, and resume content without touching code.

---

## Tech Stack

**Frontend**
- React 18 with React Router for navigation
- Framer Motion for page transitions and micro-animations
- Axios for API communication
- React Icons for consistent iconography

**Backend**
- Node.js with Express.js
- MongoDB with Mongoose for data modeling
- Google Generative AI SDK for chatbot responses
- Resend for transactional emails

---

## Project Structure

```
portfolio-website/
├── backend/
│   ├── config/           # Database configuration
│   ├── data/             # Sample data for seeding
│   ├── models/           # Mongoose schemas (Project, Skill, Resume, Message)
│   ├── routes/           # API endpoints (projects, skills, resume, messages, chat)
│   ├── scripts/          # Database seeding utilities
│   ├── seed/             # Seed data and runner
│   └── server.js         # Express app entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/   # Navbar, Footer, Chatbot
│   │   ├── pages/        # Home, About, Projects, Skills, Resume, Contact, Admin
│   │   ├── services/     # API client configuration
│   │   └── styles/       # Component and global styles
│   └── public/
│
└── README.md
```

---

## Getting Started

### Prerequisites
- Node.js 18 or higher
- MongoDB (local instance or MongoDB Atlas)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/White-Devil2839/portfolio-website.git
   cd portfolio-website
   ```

2. **Set up environment variables**
   ```bash
   cp backend/env.example backend/.env
   cp frontend/env.example frontend/.env
   ```
   Update the `.env` files with your MongoDB connection string, API keys, and other configuration.

3. **Install dependencies**
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```

4. **Seed the database** (optional)
   ```bash
   cd backend
   npm run seed
   ```

5. **Start the development servers**

   Backend (from `backend/` directory):
   ```bash
   npm run dev
   ```

   Frontend (from `frontend/` directory):
   ```bash
   npm start
   ```

   The frontend runs on `http://localhost:3000` and connects to the API at `http://localhost:5000/api`.

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | Fetch all projects |
| GET | `/api/skills` | Fetch all skills |
| GET | `/api/resume` | Fetch resume data |
| POST | `/api/messages` | Submit contact form |
| POST | `/api/chat` | Send message to AI assistant |
| GET | `/api/health` | Health check endpoint |

---

## Key Decisions

- **Mongoose ODM** – Chose Mongoose for schema validation and cleaner data modeling. I've also contributed to the Mongoose open-source project, which deepened my understanding of production-grade library design.

- **Framer Motion** – Picked over CSS-only animations for declarative control and physics-based transitions that feel more natural.

- **Component-based CSS** – Used modular stylesheets per component rather than a CSS-in-JS solution to keep the codebase simple and maintainable.

- **Rate-limited Chatbot** – Implemented cooldown timers on both frontend and backend to prevent API abuse while keeping the experience smooth.

---

## What I Learned

Building this portfolio from scratch reinforced several core skills:

1. **Full-stack ownership** – Designing schemas, building APIs, and wiring everything together end-to-end
2. **Third-party integrations** – Working with Google Gemini API and Resend for real-world functionality
3. **User experience focus** – Paying attention to loading states, error handling, and micro-interactions
4. **Clean architecture** – Keeping code modular, readable, and easy to extend

---

## Future Improvements

- Add unit and integration tests
- Add blog section with markdown support
- Set up CI/CD pipeline for automated deployments

---

## Contact

Feel free to reach out if you have questions or want to discuss opportunities.

- **Email:** divyanshchoudhary2839@gmail.com
- **GitHub:** [White-Devil2839](https://github.com/White-Devil2839)


---

*Built with care by Divyansh Choudhary*
