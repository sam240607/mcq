import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  UserPlus, 
  ArrowRight, 
  FileText, 
  BarChart3, 
  ShieldCheck, 
  GraduationCap,
  AlertCircle 
} from 'lucide-react';
import './Login.css';

export default function Register() {
  const location = useLocation();
  const [role, setRole] = useState(location.state?.role || 'student');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await register(name, email, password, role);
      // Redirect to login page with matching role and success message
      navigate('/login', {
        state: { 
          message: `${role === 'admin' ? 'Admin' : 'Student'} registration successful! Please log in with your credentials.`,
          role
        }
      });
    } catch (err) {
      setError(err.message || 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="saec-login-page">
      <div className="saec-login-bg-img" />
      <div className="saec-bg-grid" />
      <div className="saec-bg-wave" />

      <div className="saec-login-container">
        
        {/* LEFT COLUMN — PROMOTIONAL & BRANDING */}
        <div className="saec-login-left">
          <div className="saec-brand-badge">
            S.A. ENGINEERING COLLEGE
          </div>

          <h1 className="saec-hero-heading">
            Online Examination <br />
            <span className="saec-hero-heading-highlight">Management System</span>
          </h1>

          <div className="saec-tagline-wrapper">
            <span className="saec-handwritten-tag">Learn · Practice · Grow</span>
          </div>

          <p className="saec-hero-subtext">
            {role === 'admin' 
              ? 'Create an administrator account to set up exams, monitor student proctoring in real-time, and analyze test results.'
              : 'Create your student account to take tests, track your progress, and perform better with a simple and secure platform.'
            }
          </p>

          <div className="saec-features-list">
            <div className="saec-feature-item">
              <div className="saec-feature-icon blue">
                <FileText size={22} />
              </div>
              <div className="saec-feature-info">
                <h4>{role === 'admin' ? 'Manage Exams' : 'Take Tests'}</h4>
                <p>{role === 'admin' ? 'Create & Schedule' : 'Anytime, Anywhere'}</p>
              </div>
            </div>

            <div className="saec-feature-item">
              <div className="saec-feature-icon green">
                <BarChart3 size={22} />
              </div>
              <div className="saec-feature-info">
                <h4>{role === 'admin' ? 'Analytics & Reports' : 'Track Progress'}</h4>
                <p>{role === 'admin' ? 'Comprehensive Insights' : 'View Scores & History'}</p>
              </div>
            </div>

            <div className="saec-feature-item">
              <div className="saec-feature-icon purple">
                <ShieldCheck size={22} />
              </div>
              <div className="saec-feature-info">
                <h4>{role === 'admin' ? 'Live Proctoring' : 'Secure & Reliable'}</h4>
                <p>{role === 'admin' ? 'Detect & Prevent Cheating' : 'Your Data is Safe'}</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN — REGISTRATION CARD */}
        <div className="saec-login-right">
          <div className="saec-card">
            
            {/* College Logo & Headers */}
            <div className="saec-card-header">
              <img 
                src="/logo-removebg-preview.png" 
                alt="S.A. Engineering College Logo" 
                className="saec-logo-img"
              />
              <h2 className="saec-college-name">S.A. Engineering College</h2>
              <p className="saec-system-subtitle">Online Examination Management System</p>
              <div className="saec-divider-pill" />
            </div>

            {/* Role Toggle */}
            <div className="saec-role-toggle">
              <button 
                type="button"
                className={`saec-role-btn ${role === 'student' ? 'active' : ''}`}
                onClick={() => setRole('student')}
              >
                <GraduationCap size={16} />
                Student
              </button>
              <button 
                type="button"
                className={`saec-role-btn ${role === 'admin' ? 'active' : ''}`}
                onClick={() => setRole('admin')}
              >
                <ShieldCheck size={16} />
                Admin
              </button>
            </div>

            {/* Registration Header */}
            <div className="saec-login-header">
              <div className={`saec-cap-badge ${role === 'admin' ? 'admin' : ''}`}>
                {role === 'admin' ? <ShieldCheck size={24} /> : <UserPlus size={24} />}
              </div>
              <h3 className="saec-login-title">
                {role === 'admin' ? 'Admin Registration' : 'Student Registration'}
              </h3>
              <p className="saec-login-desc">
                {role === 'admin'
                  ? 'Create an administrator account to manage tests, questions, and students.'
                  : 'Create your student account to access online examinations and track your progress.'
                }
              </p>
            </div>

            {/* Error Feedback Alert */}
            {error && (
              <div className="saec-alert-error" role="alert">
                <AlertCircle size={18} style={{ flexShrink: 0 }} />
                <span>{error}</span>
              </div>
            )}

            {/* Registration Form */}
            <form onSubmit={handleSubmit} noValidate>
              
              {/* Full Name Field */}
              <div className="saec-form-field">
                <label htmlFor="name" className="saec-form-label">
                  Full Name
                </label>
                <div className="saec-input-wrapper">
                  <User size={18} className="saec-input-icon-left" />
                  <input
                    id="name"
                    type="text"
                    className="saec-input"
                    placeholder={role === 'admin' ? 'Admin / Faculty Name' : 'Enter your Full Name'}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="name"
                  />
                </div>
              </div>

              {/* Email Address Field */}
              <div className="saec-form-field">
                <label htmlFor="email" className="saec-form-label">
                  Email Address
                </label>
                <div className="saec-input-wrapper">
                  <Mail size={18} className="saec-input-icon-left" />
                  <input
                    id="email"
                    type="email"
                    className="saec-input"
                    placeholder={role === 'admin' ? 'admin@saec.ac.in' : 'student@saec.ac.in'}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="saec-form-field" style={{ marginBottom: 28 }}>
                <label htmlFor="password" className="saec-form-label">
                  Password
                </label>
                <div className="saec-input-wrapper">
                  <Lock size={18} className="saec-input-icon-left" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    className="saec-input saec-input-with-toggle"
                    placeholder="Create a secure password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="saec-toggle-password-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    title={showPassword ? 'Hide password' : 'Show password'}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Primary Action Button */}
              <button
                type="submit"
                className="saec-submit-btn"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <div className="saec-btn-spinner" />
                    <span>Registering...</span>
                  </>
                ) : (
                  <>
                    <span>Register as {role === 'admin' ? 'Admin' : 'Student'}</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </form>

            {/* Footer Login Link */}
            <div className="saec-card-footer">
              <span>Already have an account?</span>
              <Link to="/login" state={{ role }}>Sign in here</Link>
            </div>

            {/* Developed Credit */}
            <div className="saec-developed-tag">
              Developed for S.A. Engineering College
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
