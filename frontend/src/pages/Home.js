import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Home = () => {
  const processSteps = [
    {
      title: 'Discover & align',
      description: 'Deep-dives with stakeholders, competitive research, and success metrics we can actually measure.',
      deliverable: 'Product brief • experiment map'
    },
    {
      title: 'Prototype & validate',
      description: 'Rapid Figma exploration and clickable prototypes, plus technical spikes to derisk feasibility.',
      deliverable: 'Interactive prototype • eng plan'
    },
    {
      title: 'Build & launch',
      description: 'Ship production-quality code, instrument analytics, and polish the micro-interactions.',
      deliverable: 'MVP build • instrumentation'
    },
    {
      title: 'Iterate & amplify',
      description: 'Ship follow-ups based on data + qualitative feedback, create playbooks the team can scale.',
      deliverable: 'Launch report • iteration slate'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <section className="hero">
        <div className="hero-grid">
          <div className="hero-content">
            <motion.p
              className="eyebrow"
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              Product-focused full stack engineer
            </motion.p>
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >

              <span className="gradient-text"> Divyansh Choudhary</span>
            </motion.h1>
            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              I blend product thinking, clean UI, and solid engineering fundamentals to build polished, reliable user experiences. Currently exploring AI-powered tooling, modern web architectures, and thoughtful design patterns.

            </motion.p>
            <motion.ul
              className="hero-badges"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <li>Product Engineering</li>
              <li>Generative AI</li>
              <li>Design Systems</li>
              <li>Cloud & DevOps</li>
            </motion.ul>
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="cta-group"
            >
              <Link to="/projects" className="cta-button">
                View My Work
              </Link>
              <Link to="/contact" className="cta-button secondary">
                Book a Call
              </Link>
            </motion.div>
            <motion.div
              className="hero-stats"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              <div className="stat-card">
                <h4>15+</h4>
                <span>Projects across web development, AI, and full-stack systems</span>

                <h4>1–2 yrs</h4>
                <span>Hands-on experience building real products & prototypes</span>

                <h4>Consistent</h4>
                <span>Improvements in UX, performance, and maintainability across projects</span>
              </div>
            </motion.div>
          </div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="floating-card primary floating">
              <p>Current Focus</p>
              <h3>AI-driven UX Research</h3>
              <span>LLM, Next.js, RAG</span>
            </div>
            <div className="floating-card secondary floating delay">
              <p>Stack</p>
              <div className="stack-pills">
                <span>React</span>
                <span>Node.js</span>
                <span>MongoDB</span>
                <span>Express.js</span>
                <span>React Native</span>
              </div>
            </div>
            <div className="orbit-card">
              <div className="orbit-dot dot-1" />
              <div className="orbit-dot dot-2" />
              <div className="orbit-dot dot-3" />
              <div className="orbit-core">
                <h4>Ship Faster</h4>
                <p>Research → Prototype → Launch</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* <section className="section trusted-section">
        <div className="container">
          <p className="trusted-text">Trusted by teams at</p>
          <div className="logo-marquee">
            <div className="logo-track">
              {['Stripe', 'Figma', 'Notion', 'Vercel', 'Linear', 'Postman'].map((brand) => (
                <span key={brand}>{brand}</span>
              ))}
            </div>
            <div className="logo-track">
              {['Stripe', 'Figma', 'Notion', 'Vercel', 'Linear', 'Postman'].map((brand) => (
                <span key={`${brand}-clone`}>{brand}</span>
              ))}
            </div>
          </div>
        </div>
      </section> */}

      {/* Featured Section */}
      <section className="section">
        <div className="container">
          <div className="features-grid">
            <motion.div
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3>Web Development</h3>
              <p>Modern, responsive web applications using the latest technologies</p>
            </motion.div>
            <motion.div
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h3>AI & ML</h3>
              <p>Exploring artificial intelligence and machine learning applications</p>
            </motion.div>
            <motion.div
              className="feature-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h3>Entrepreneurship</h3>
              <p>Business strategy and innovative solution development</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="section spotlight">
        <div className="container split-grid">
          <motion.div
            className="split-content"
            initial={{ x: -40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <p className="eyebrow">In the spotlight</p>
            <h2>Turning ideas into polished, user-friendly products</h2>
            <p>
              I enjoy diving into problems, validating assumptions quickly, and crafting
              experiences that feel intuitive and delightful. From AI features to interactive dashboards,
              I bring a thoughtful, systems-minded approach to every project.
            </p>
            <ul className="check-list">
              <li>Build with clarity and intention</li>
              <li>Prototype fast, iterate faster</li>
              <li>Work seamlessly with designers & engineers</li>
            </ul>

          </motion.div>

          {/* <motion.div
            className="split-card floating slow"
            initial={{ x: 40, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="badge">Latest Wins</div>
            <div className="timeline-pill">
              <span>2024</span>
              <p>Launched AI onboarding assistant that cut setup time by 62%.</p>
            </div>
            <div className="timeline-pill">
              <span>2023</span>
              <p>Scaled design system powering 5 product lines and 3M+ users.</p>
            </div>
            <div className="timeline-pill">
              <span>2022</span>
              <p>Built analytics suite adopted by CS + GTM org in under 6 weeks.</p>
            </div>
            <div className="glow-accent" />
          </motion.div> */}
        </div>
      </section>

      <section className="section process">
        <div className="container">
          <h2 className="section-title">How we’ll build together</h2>
          <p className="section-subtitle">
            A transparent, data-informed workflow that keeps stakeholders aligned and users delighted.
          </p>
          <div className="process-grid">
            {processSteps.map((step, index) => (
              <motion.div
                key={step.title}
                className="process-card"
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="step-index">0{index + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <span>{step.deliverable}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-banner">
        <div className="container">
          <motion.div
            className="cta-banner-card"
            initial={{ scale: 0.98, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div>
              <p className="eyebrow">Let’s talk impact</p>
              <h2>Ready to ship something users obsess over?</h2>
              <p>
                I love collaborating with teams to explore ideas, build fast,
                and ship user-focused experiences.

              </p>
            </div>
            <div className="cta-banner-actions">
              <div className="cta-pills">
                <span>Rapid prototyping</span>
                <span>AI copilots</span>
                <span>Growth experiments</span>
              </div>
              <Link to="/contact" className="cta-button">
                Let’s Connect
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;