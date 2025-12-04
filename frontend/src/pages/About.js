import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  const experiences = [
    {
      year: "2023 - Present",
      title: "Full Stack Developer",
      company: "Tech Company",
      description: "Developing modern web applications using MERN stack and cloud technologies."
    },
    {
      year: "2022 - 2023",
      title: "Web Development Intern",
      company: "Startup Inc",
      description: "Gained hands-on experience in full-stack development and agile methodologies."
    },
    {
      year: "2019 - 2023",
      title: "Computer Science Student",
      company: "University of Technology",
      description: "Focused on software engineering, algorithms, and AI/ML fundamentals."
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
              I'm a passionate full-stack developer with a strong foundation in computer science 
              and a keen interest in artificial intelligence. My journey in technology started 
              during my university years, and since then, I've been constantly learning and 
              adapting to new technologies.
            </p>
            <p>
              What sets me apart is my entrepreneurial mindset combined with technical expertise. 
              I believe in creating solutions that not only work well but also provide real value 
              to users. My strengths include problem-solving, leadership, and effective communication.
            </p>
            <p>
              When I'm not coding, you can find me exploring new AI technologies, contributing to 
              open-source projects, or sharing knowledge with the developer community.
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