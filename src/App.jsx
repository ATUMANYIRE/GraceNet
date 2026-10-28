import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Sponsorship from './components/Sponsorship';
import PayEquity from './components/PayEquity';
import Roadmaps from './components/Roadmaps';
import Community from './components/Community';
import SafetyModal from './components/SafetyModal';
import JoinNetworkModal from './components/JoinNetworkModal';
import Toast from './components/Toast';
import Footer from './components/Footer';
import { COMMUNITY_POSTS } from './data/communityData';

export default function App() {
  // Navigation active tab: 'sponsors' | 'pay-equity' | 'roadmaps' | 'community'
  const [activeTab, setActiveTab] = useState('sponsors');

  // Theme: Warm Porcelain (#FEFEFE / #FDFBF7) vs Dark Slate (#0F172A)
  const [darkMode, setDarkMode] = useState(false);

  // Modals state
  const [isSafetyOpen, setIsSafetyOpen] = useState(false);
  const [isJoinOpen, setIsJoinOpen] = useState(false);

  // Reference for smooth scrolling to content area
  const contentSectionRef = useRef(null);

  // User Profile
  const [userProfile, setUserProfile] = useState({
    name: 'Maya Henderson',
    roleTitle: 'Senior Software Engineer',
    company: 'Fintech Scaleup',
    membershipType: 'mentee',
    track: 'Software Engineering',
    bio: 'Passionate about distributed web platforms, high availability, and breaking through the Staff+ glass ceiling.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
    isRegistered: true
  });

  // Sponsorship requests state
  const [requestsSent, setRequestsSent] = useState([
    {
      id: 'req-sample-1',
      sponsorId: 'sp-1',
      sponsorName: 'Dr. Maya Lin-Vanderbilt',
      sponsorTitle: 'VP of Engineering & Distributed Systems',
      sponsorCompany: 'Google Cloud',
      sponsorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
      mode: 'Executive Sponsorship (Promotion Advocacy)',
      focusAreas: ['Staff+ Promotion Dossier', 'Closed-Door Calibration Strategy'],
      cadence: 'Bi-weekly (30 min)',
      message: 'Hi Dr. Lin-Vanderbilt,\n\nI admire your pioneering work in distributed systems. As a Senior Engineer targeting Staff promotion next cycle, I am seeking an executive sponsor to review my cross-functional impact dossier.',
      sentAt: 'Yesterday',
      status: 'Pending Sponsor Review'
    }
  ]);

  // Roadmaps completed milestones
  const [completedMilestones, setCompletedMilestones] = useState(['fs-1', 'os-1']);

  // Community posts state
  const [posts, setPosts] = useState(COMMUNITY_POSTS);

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'info') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const handleDismissToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync dark mode class with root html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const scrollToContent = (tabId) => {
    setActiveTab(tabId);
    if (contentSectionRef.current) {
      contentSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handlers
  const handleSendRequest = (newRequest) => {
    setRequestsSent([newRequest, ...requestsSent]);
  };

  const handleToggleMilestone = (milestoneId) => {
    if (completedMilestones.includes(milestoneId)) {
      setCompletedMilestones(completedMilestones.filter((id) => id !== milestoneId));
    } else {
      setCompletedMilestones([...completedMilestones, milestoneId]);
    }
  };

  const handleAddPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handleToggleLike = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const isLiked = !post.isLiked;
          return {
            ...post,
            isLiked,
            likes: isLiked ? post.likes + 1 : post.likes - 1
          };
        }
        return post;
      })
    );
  };

  const handleAddReply = (postId, reply) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            replies: [...(post.replies || []), reply]
          };
        }
        return post;
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#FEFEFE] dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200 flex flex-col font-sans">
      {/* Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onOpenSafety={() => setIsSafetyOpen(true)}
        onOpenJoin={() => setIsJoinOpen(true)}
        userProfile={userProfile}
        pendingRequestsCount={requestsSent.length}
      />

      {/* Corvana-Style Landing Hero for GraceNet */}
      <Hero
        onExploreSponsors={() => scrollToContent('sponsors')}
        onExplorePayEquity={() => scrollToContent('pay-equity')}
        onOpenJoin={() => setIsJoinOpen(true)}
      />

      {/* Interactive Platform Workspace Section */}
      <section 
        ref={contentSectionRef} 
        className="flex-1 max-w-[1514px] w-full mx-auto px-4 sm:px-8 py-8 sm:py-12 border-t border-slate-100 dark:border-slate-800"
      >
        {/* Module Sub-Header Tabs */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-deepViolet dark:text-purple-400">
              GraceNet Platform Modules
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white mt-1">
              {activeTab === 'sponsors' && 'Executive Sponsorship & Mentorship Matcher'}
              {activeTab === 'pay-equity' && 'Audited Wage Transparency & Parity Engine'}
              {activeTab === 'roadmaps' && 'Grace Hopper Technical Skill Roadmaps'}
              {activeTab === 'community' && 'Safe Space Community Forum'}
            </h2>
          </div>

          <div className="hidden sm:flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl">
            {[
              { id: 'sponsors', label: 'Sponsors' },
              { id: 'pay-equity', label: 'Pay Equity' },
              { id: 'roadmaps', label: 'Roadmaps' },
              { id: 'community', label: 'Community' },
            ].map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === t.id
                    ? 'bg-white dark:bg-slate-900 text-deepViolet dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1: Sponsorship Matcher */}
        {activeTab === 'sponsors' && (
          <Sponsorship
            requestsSent={requestsSent}
            onSendRequest={handleSendRequest}
            showToast={showToast}
            userProfile={userProfile}
          />
        )}

        {/* Tab 2: Wage Transparency */}
        {activeTab === 'pay-equity' && (
          <PayEquity
            showToast={showToast}
            userProfile={userProfile}
          />
        )}

        {/* Tab 3: Roadmaps */}
        {activeTab === 'roadmaps' && (
          <Roadmaps
            completedMilestones={completedMilestones}
            onToggleMilestone={handleToggleMilestone}
            showToast={showToast}
          />
        )}

        {/* Tab 4: Community Hub */}
        {activeTab === 'community' && (
          <Community
            posts={posts}
            onAddPost={handleAddPost}
            onToggleLike={handleToggleLike}
            onAddReply={handleAddReply}
            showToast={showToast}
            userProfile={userProfile}
          />
        )}
      </section>

      {/* Footer */}
      <Footer
        onOpenSafety={() => setIsSafetyOpen(true)}
        onOpenJoin={() => setIsJoinOpen(true)}
        setActiveTab={setActiveTab}
      />

      {/* Emergency & Safety Resources Modal */}
      <SafetyModal
        isOpen={isSafetyOpen}
        onClose={() => setIsSafetyOpen(false)}
      />

      {/* Join Network / Profile Setup Modal */}
      <JoinNetworkModal
        isOpen={isJoinOpen}
        onClose={() => setIsJoinOpen(false)}
        userProfile={userProfile}
        onSaveProfile={setUserProfile}
        showToast={showToast}
      />

      {/* Floating Toast Feedback System */}
      <Toast toasts={toasts} onDismiss={handleDismissToast} />
    </div>
  );
}
