import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import apiClient from '../services/api';
import '../styles/Admin.css';

const Admin = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('projects');
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [resume, setResume] = useState(null);
    const [loading, setLoading] = useState(true);

    // Form States
    const [editingProject, setEditingProject] = useState(null);
    const [projectForm, setProjectForm] = useState({
        title: '', description: '', image: '', technologies: '', githubUrl: '', liveUrl: '', category: 'web'
    });

    const [editingSkill, setEditingSkill] = useState(null);
    const [skillForm, setSkillForm] = useState({
        name: '', category: 'programming', proficiency: 50, icon: '', color: '#3B82F6'
    });

    useEffect(() => {
        const isAdmin = localStorage.getItem('isAdmin');
        if (!isAdmin) {
            navigate('/');
            return;
        }
        fetchData();
    }, [navigate]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [projectsRes, skillsRes, resumeRes] = await Promise.all([
                apiClient.get('/projects'),
                apiClient.get('/skills'),
                apiClient.get('/resume')
            ]);
            setProjects(projectsRes.data);
            setSkills(skillsRes.data);
            setResume(resumeRes.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('isAdmin');
        navigate('/');
    };

    // --- Projects Logic ---
    const handleProjectSubmit = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                ...projectForm,
                technologies: typeof projectForm.technologies === 'string'
                    ? projectForm.technologies.split(',').map(t => t.trim())
                    : projectForm.technologies
            };

            if (editingProject) {
                await apiClient.put(`/projects/${editingProject._id}`, payload);
            } else {
                await apiClient.post('/projects', payload);
            }
            setEditingProject(null);
            setProjectForm({ title: '', description: '', image: '', technologies: '', githubUrl: '', liveUrl: '', category: 'web' });
            fetchData();
        } catch (error) {
            alert('Error saving project');
        }
    };

    const handleEditProject = (project) => {
        setEditingProject(project);
        setProjectForm({
            ...project,
            technologies: project.technologies.join(', ')
        });
    };

    const handleDeleteProject = async (id) => {
        if (window.confirm('Are you sure?')) {
            await apiClient.delete(`/projects/${id}`);
            fetchData();
        }
    };

    // --- Skills Logic ---
    const handleSkillSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingSkill) {
                await apiClient.put(`/skills/${editingSkill._id}`, skillForm);
            } else {
                await apiClient.post('/skills', skillForm);
            }
            setEditingSkill(null);
            setSkillForm({ name: '', category: 'programming', proficiency: 50, icon: '', color: '#3B82F6' });
            fetchData();
        } catch (error) {
            alert('Error saving skill');
        }
    };

    const handleEditSkill = (skill) => {
        setEditingSkill(skill);
        setSkillForm(skill);
    };

    const handleDeleteSkill = async (id) => {
        if (window.confirm('Are you sure?')) {
            await apiClient.delete(`/skills/${id}`);
            fetchData();
        }
    };

    // --- Resume Logic ---
    const handleResumeUpdate = async (e) => {
        e.preventDefault();
        try {
            // For simplicity, we'll just update the summary for now, 
            // or we could implement a full JSON editor if needed.
            // Let's assume we just want to update the summary field as a demo.
            await apiClient.put('/resume', resume);
            alert('Resume updated!');
        } catch (error) {
            alert('Error updating resume');
        }
    };

    if (loading) return <div className="loading">Loading Admin...</div>;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="admin-dashboard container">
            <div className="admin-header">
                <h2>Admin Portal</h2>
                <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>

            <div className="admin-tabs">
                <button className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>Projects</button>
                <button className={`tab-btn ${activeTab === 'skills' ? 'active' : ''}`} onClick={() => setActiveTab('skills')}>Skills</button>
                <button className={`tab-btn ${activeTab === 'resume' ? 'active' : ''}`} onClick={() => setActiveTab('resume')}>Resume</button>
            </div>

            <div className="admin-content">
                {activeTab === 'projects' && (
                    <div>
                        <h3>{editingProject ? 'Edit Project' : 'Add New Project'}</h3>
                        <form onSubmit={handleProjectSubmit} className="admin-form">
                            <div className="form-group">
                                <label>Title</label>
                                <input value={projectForm.title} onChange={e => setProjectForm({ ...projectForm, title: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label>Description</label>
                                <textarea value={projectForm.description} onChange={e => setProjectForm({ ...projectForm, description: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label>Image URL</label>
                                <input value={projectForm.image} onChange={e => setProjectForm({ ...projectForm, image: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label>Technologies (comma separated)</label>
                                <input value={projectForm.technologies} onChange={e => setProjectForm({ ...projectForm, technologies: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>GitHub URL</label>
                                <input value={projectForm.githubUrl} onChange={e => setProjectForm({ ...projectForm, githubUrl: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Live Demo URL</label>
                                <input value={projectForm.liveUrl} onChange={e => setProjectForm({ ...projectForm, liveUrl: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <select value={projectForm.category} onChange={e => setProjectForm({ ...projectForm, category: e.target.value })}>
                                    <option value="web">Web</option>
                                    <option value="mobile">Mobile</option>
                                    <option value="ai-ml">AI/ML</option>
                                    <option value="fullstack">Fullstack</option>
                                </select>
                            </div>
                            <div className="form-actions">
                                <button type="submit" className="btn-primary">{editingProject ? 'Update' : 'Create'}</button>
                                {editingProject && <button type="button" onClick={() => { setEditingProject(null); setProjectForm({ title: '', description: '', image: '', technologies: '', githubUrl: '', liveUrl: '', category: 'web' }) }} className="btn-secondary">Cancel</button>}
                            </div>
                        </form>

                        <div className="item-list">
                            {projects.map(p => (
                                <div key={p._id} className="list-item">
                                    <div className="item-info">
                                        <h4>{p.title}</h4>
                                        <p>{p.category}</p>
                                    </div>
                                    <div className="item-actions">
                                        <button onClick={() => handleEditProject(p)} className="btn-edit">Edit</button>
                                        <button onClick={() => handleDeleteProject(p._id)} className="btn-delete">Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'skills' && (
                    <div>
                        <h3>{editingSkill ? 'Edit Skill' : 'Add New Skill'}</h3>
                        <form onSubmit={handleSkillSubmit} className="admin-form">
                            <div className="form-group">
                                <label>Name</label>
                                <input value={skillForm.name} onChange={e => setSkillForm({ ...skillForm, name: e.target.value })} required />
                            </div>
                            <div className="form-group">
                                <label>Category</label>
                                <select value={skillForm.category} onChange={e => setSkillForm({ ...skillForm, category: e.target.value })}>
                                    <option value="programming">Programming</option>
                                    <option value="framework">Framework</option>
                                    <option value="database">Database</option>
                                    <option value="tool">Tool</option>
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Proficiency (0-100)</label>
                                <input type="number" value={skillForm.proficiency} onChange={e => setSkillForm({ ...skillForm, proficiency: e.target.value })} />
                            </div>
                            <div className="form-actions">
                                <button type="submit" className="btn-primary">{editingSkill ? 'Update' : 'Create'}</button>
                                {editingSkill && <button type="button" onClick={() => { setEditingSkill(null); setSkillForm({ name: '', category: 'programming', proficiency: 50, icon: '', color: '#3B82F6' }) }} className="btn-secondary">Cancel</button>}
                            </div>
                        </form>

                        <div className="item-list">
                            {skills.map(s => (
                                <div key={s._id} className="list-item">
                                    <div className="item-info">
                                        <h4>{s.name}</h4>
                                        <p>{s.category} - {s.proficiency}%</p>
                                    </div>
                                    <div className="item-actions">
                                        <button onClick={() => handleEditSkill(s)} className="btn-edit">Edit</button>
                                        <button onClick={() => handleDeleteSkill(s._id)} className="btn-delete">Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'resume' && resume && (
                    <div>
                        <h3>Edit Resume Summary</h3>
                        <form onSubmit={handleResumeUpdate} className="admin-form">
                            <div className="form-group">
                                <label>Summary</label>
                                <textarea
                                    rows="6"
                                    value={resume.summary}
                                    onChange={e => setResume({ ...resume, summary: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="form-actions">
                                <button type="submit" className="btn-primary">Update Resume</button>
                            </div>
                        </form>
                        <p className="text-muted">Note: Full resume editing is complex. Currently only Summary editing is supported in this demo.</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default Admin;
