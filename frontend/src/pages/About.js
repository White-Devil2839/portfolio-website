import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const experiences = [
    {
      year: "2025 - Present",
      title: "Full Stack Developer (Independent Projects)",
      company: "Self-Driven",
      description: "Building full-stack applications using React, Node.js, Express.js and MongoDB, with a focus on AI-powered features and clean UI/UX."
    },
    {
      year: "2024 - Present",
      title: "Computer Science Student",
      company: "Newton School of Technology",
      description: "Studied software engineering, algorithms, and AI/ML fundamentals while building practical projects."
    },
    {
      year: "2025",
      title: "Open Source Contributor, Mongoose"
    }
  ];


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="section"
    >
      <div className="container">
        <h2 className="section-title">About Me</h2>

        <div className="about-content">
          <div className="about-text">
            <p>
              I'm a full-stack developer who loves turning ideas into polished, usable products.
              With a strong foundation in computer science and hands-on experience across the MERN
              stack, I enjoy building systems that feel fast, intuitive, and thoughtfully engineered.
            </p>

            <p>
              I’m especially interested in AI-driven experiences, developer tools, and clean
              design systems. Recently, I contributed a merged PR to the Mongoose open-source
              library—an experience that strengthened my understanding of production-grade
              code and collaborative engineering.
            </p>

            <p>
              Outside of coding, I enjoy exploring emerging AI technologies, working on
              side projects, and contributing to the developer community. I’m constantly
              learning, iterating, and pushing myself to build better experiences.
            </p>
            <p>
              My current focus areas: full-stack engineering, generative AI workflows,
              scalable backend architectures, and developer experience tooling.
            </p>


          </div>

          <div className="timeline">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                className="timeline-item"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="timeline-content">
                  <div className="timeline-year">{exp.year}</div>
                  <h3>{exp.title}</h3>
                  <h4>{exp.company}</h4>
                  <p>{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;