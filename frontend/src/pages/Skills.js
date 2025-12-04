import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import apiClient from '../services/api';
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaJava,
  FaGitAlt,
  FaDatabase,
  FaProjectDiagram,
} from 'react-icons/fa';
import {
  SiJavascript,
  SiTypescript,
  SiMongodb,
  SiExpress,
  SiCplusplus,
  SiHtml5,
  SiCss3,
  SiGraphql,
  SiAmazonaws,
  SiDocker,
} from 'react-icons/si';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        setError('');
        const { data } = await apiClient.get('/skills');
        setSkills(data);
      } catch (error) {
        console.error('Error fetching skills:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  const getIcon = (iconName) => {
    const iconProps = { size: 40 };
    switch (iconName) {
      case 'react': return <FaReact {...iconProps} color="#61DAFB" />;
      case 'node': return <FaNodeJs {...iconProps} color="#339933" />;
      case 'python': return <FaPython {...iconProps} color="#3776AB" />;
      case 'java': return <FaJava {...iconProps} color="#007396" />;
      case 'cpp': return <SiCplusplus {...iconProps} color="#00599C" />;
      case 'js': return <SiJavascript {...iconProps} color="#F7DF1E" />;
      case 'ts': return <SiTypescript {...iconProps} color="#3178C6" />;
      case 'mongo': return <SiMongodb {...iconProps} color="#47A248" />;
      case 'express': return <SiExpress {...iconProps} color="#000000" />;
      case 'html': return <SiHtml5 {...iconProps} color="#E34F26" />;
      case 'css': return <SiCss3 {...iconProps} color="#1572B6" />;
      case 'git': return <FaGitAlt {...iconProps} color="#F05032" />;
      case 'graphql': return <SiGraphql {...iconProps} color="#DE33A6" />;
      case 'aws': return <SiAmazonaws {...iconProps} color="#FF9900" />;
      case 'docker': return <SiDocker {...iconProps} color="#0db7ed" />;
      case 'system': return <FaProjectDiagram {...iconProps} color="#6366F1" />;
      case 'database': return <FaDatabase {...iconProps} color="#059669" />;
      case 'comm': return <div style={iconProps}>💬</div>;
      case 'lead': return <div style={iconProps}>👑</div>;
      case 'biz': return <div style={iconProps}>💼</div>;
      case 'ai': return <div style={iconProps}>🤖</div>;
      default: return <div style={iconProps}>⚡</div>;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="section"
    >
      <div className="container">
        <h2 className="section-title">Skills & Technologies</h2>
        
        {loading ? (
          <div className="loading">Loading skills...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <div className="skills-grid">
            {skills.map((skill, index) => (
              <motion.div
                key={skill._id || skill.name}
                className="skill-card card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="skill-icon">
                  {getIcon(skill.icon)}
                </div>
                <h3>{skill.name}</h3>
                <div className="progress-bar">
                  <motion.div
                    className="progress"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.proficiency}%` }}
                    transition={{ duration: 1, delay: index * 0.05 }}
                  />
                </div>
                <span className="proficiency-text">{skill.proficiency}%</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Skills;