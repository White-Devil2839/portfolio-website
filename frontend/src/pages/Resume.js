import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import apiClient from '../services/api';

const Resume = () => {
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        setLoading(true);
        setError('');
        const { data } = await apiClient.get('/resume');
        setResumeData(data);
      } catch (error) {
        console.error('Error fetching resume data:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResumeData();
  }, []);

  const downloadPDF = () => {
    window.print();
  };

  if (loading) {
    return <div className="loading">Loading resume...</div>;
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  if (!resumeData) {
    return <div className="error-message">Resume data unavailable</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="section"
    >
      <div className="container">
        <div className="resume-header">
          <h2 className="section-title">Resume</h2>
          <button onClick={downloadPDF} className="cta-button">
            Download PDF
          </button>
        </div>

        <div className="resume-content">
          {/* Personal Info */}
          <div className="resume-section">
            <h3>Personal Information</h3>
            <div className="personal-info">
              <p><strong>Name:</strong> {resumeData.personalInfo?.name}</p>
              <p><strong>Title:</strong> {resumeData.personalInfo?.title}</p>
              <p><strong>Email:</strong> {resumeData.personalInfo?.email}</p>
              <p><strong>Phone:</strong> {resumeData.personalInfo?.phone}</p>
              <p><strong>Location:</strong> {resumeData.personalInfo?.location}</p>
            </div>
          </div>

          {/* Summary */}
          <div className="resume-section">
            <h3>Professional Summary</h3>
            <p>{resumeData.summary}</p>
          </div>

          {/* Experience */}
          <div className="resume-section">
            <h3>Experience</h3>
            {resumeData.experience?.map((exp, idx) => (
              <div key={exp._id || idx} className="experience-item">
                <h4>{exp.title} - {exp.company}</h4>
                <p className="date-location">
                  {exp.startDate} - {exp.endDate} | {exp.location}
                </p>
                <ul>
                  {exp.description.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Education */}
          <div className="resume-section">
            <h3>Education</h3>
            {resumeData.education?.map((edu, idx) => (
              <div key={edu._id || idx} className="education-item">
                <h4>{edu.degree}</h4>
                <p className="institution">{edu.institution}, {edu.location}</p>
                <p className="date-gpa">
                  {edu.startDate} - {edu.endDate} | GPA: {edu.gpa}
                </p>
                {edu.achievements && (
                  <div className="achievements">
                    <strong>Achievements:</strong>
                    <ul>
                      {edu.achievements.map((achievement, index) => (
                        <li key={index}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Skills */}
          <div className="resume-section">
            <h3>Skills</h3>
            <div className="skills-container">
              <div className="technical-skills">
                <h4>Technical Skills</h4>
                <div className="skills-list">
                  {resumeData.skills?.technical?.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
              <div className="soft-skills">
                <h4>Soft Skills</h4>
                <div className="skills-list">
                  {resumeData.skills?.soft?.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Resume;