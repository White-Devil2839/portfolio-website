import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import apiClient from '../services/api';



const Contact = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Secret Admin Access
    if (
      formData.name === process.env.REACT_APP_ADMIN_NAME &&
      formData.email === process.env.REACT_APP_ADMIN_EMAIL &&
      formData.message === process.env.REACT_APP_ADMIN_MESSAGE
    ) {
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage('');

    try {
      await apiClient.post('/messages', formData);
      setSubmitMessage('Message sent successfully! I\'ll get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitMessage(error.message || 'Error sending message. Please try again.');
    } finally {
      setIsSubmitting(false);
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
        <h2 className="section-title">Get In Touch</h2>

        <div className="contact-content">
          <div className="contact-info">
            <h3>Let's Connect</h3>
            <p>
              I'm always interested in new opportunities, whether it's a
              freelance project, collaboration, or full-time position.
              Feel free to reach out!
            </p>
            <div className="contact-details">
              <p><strong>Email:</strong> divyanshchoudhary2839@gmail.com</p>
              <p><strong>Location:</strong> Pune, India</p>
              <p><strong>Availability:</strong> Open to new opportunities</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="cta-button"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>

            {submitMessage && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="submit-message"
              >
                {submitMessage}
              </motion.div>
            )}
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;