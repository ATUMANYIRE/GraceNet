import React, { useState } from 'react';
import { 
  MessageSquare, 
  Heart, 
  Share2, 
  PlusCircle, 
  Shield, 
  User, 
  Send, 
  Search, 
  Filter, 
  Sparkles, 
  Lock, 
  Check, 
  Bookmark, 
  X,
  MessageCircle,
  EyeOff,
  Flame,
  Clock
} from 'lucide-react';
import { FORUM_TAGS } from '../data/communityData';

export default function Community({ posts, onAddPost, onToggleLike, onAddReply, showToast, userProfile }) {
  const [selectedTag, setSelectedTag] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('trending'); // 'trending' | 'latest'
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeReplyPostId, setActiveReplyPostId] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [savedPosts, setSavedPosts] = useState([]);

  // Create post form state
  const [postForm, setPostForm] = useState({
    title: '',
    content: '',
    category: 'Salary Transparency',
    isAnonymous: false,
    tagsInput: 'Salary Transparency, Career Growth'
  });

  // Filter posts
  const filteredPosts = posts.filter(post => {
    const matchesTag = selectedTag === 'All' || post.category === selectedTag || post.tags.includes(selectedTag);
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTag && matchesSearch;
  });

  // Sort posts
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === 'trending') {
      return (b.likes + (b.replies?.length || 0) * 2) - (a.likes + (a.replies?.length || 0) * 2);
    }
    return 0; // Seeding order is chronological
  });

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!postForm.title.trim() || !postForm.content.trim()) {
      showToast('Please provide a title and post content', 'error');
      return;
    }

    const tagsArray = postForm.tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(Boolean);

    const newPost = {
      id: `post-${Date.now()}`,
      author: {
        name: postForm.isAnonymous ? 'Incognito Technologist' : (userProfile?.name || 'Catalyst Technologist'),
        role: postForm.isAnonymous ? 'Verified Community Member' : (userProfile?.roleTitle || 'Software Engineer'),
        avatar: postForm.isAnonymous 
          ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
          : (userProfile?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80'),
        isAnonymous: postForm.isAnonymous,
        badge: postForm.isAnonymous ? 'Shield Protected' : 'Member'
      },
      title: postForm.title,
      content: postForm.content,
      category: postForm.category,
      tags: tagsArray.length > 0 ? tagsArray : [postForm.category],
      createdAt: 'Just now',
      likes: 1,
      isLiked: true,
      replies: []
    };

    onAddPost(newPost);
    showToast(postForm.isAnonymous ? 'Anonymous post shared safely!' : 'Post published to Community Hub!', 'success');
    setIsCreateModalOpen(false);
    setPostForm({
      title: '',
      content: '',
      category: 'Salary Transparency',
      isAnonymous: false,
      tagsInput: 'Salary Transparency, Career Growth'
    });
  };

  const handleReplySubmit = (postId) => {
    if (!replyText.trim()) return;

    const newReply = {
      id: `rep-${Date.now()}`,
      author: {
        name: userProfile?.name || 'GraceNet Technologist',
        role: userProfile?.roleTitle || 'Community Member',
        avatar: userProfile?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
        isAnonymous: false
      },
      content: replyText,
      createdAt: 'Just now'
    };

    onAddReply(postId, newReply);
    setReplyText('');
    showToast('Reply posted!', 'success');
  };

  const toggleSavePost = (postId) => {
    if (savedPosts.includes(postId)) {
      setSavedPosts(savedPosts.filter(id => id !== postId));
      showToast('Post removed from saved items', 'info');
    } else {
      setSavedPosts([...savedPosts, postId]);
      showToast('Post saved to bookmarks!', 'success');
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-deepViolet via-purple-900 to-indigo-950 text-white p-6 sm:p-10 shadow-xl border border-purple-800/40">
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold text-purple-200">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span>Safe Space Forum & Peer Mentorship Circle</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Community Hub & <br />
            <span className="bg-gradient-to-r from-rose-200 via-amber-200 to-purple-200 bg-clip-text text-transparent">
              Safe Space Tech Forum
            </span>
          </h1>

          <p className="text-sm sm:text-base text-purple-100/90 leading-relaxed max-w-2xl">
            A verified, harassment-free environment for women in tech to discuss salary equity, navigate microaggressions, coordinate GHC meetups, and share executive sponsorship advice.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-bold bg-white text-deepViolet hover:bg-purple-50 shadow-md hover:scale-[1.02] active:scale-[0.98] transition-all"
            >
              <PlusCircle className="w-4 h-4 text-deepViolet" />
              <span>Create Safe Space Post</span>
            </button>

            <span className="text-xs text-purple-200 flex items-center gap-1.5 bg-white/10 px-3 py-2 rounded-2xl">
              <EyeOff className="w-4 h-4 text-emerald-300" />
              100% Anonymous Posting Available
            </span>
          </div>
        </div>

        {/* Background glow */}
        <div className="absolute right-0 top-0 -mr-20 -mt-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        {/* Search */}
        <div className="w-full sm:w-80 relative">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search discussions, topics, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-2xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-deepViolet shadow-sm"
          />
        </div>

        {/* Sort Controls */}
        <div className="flex items-center gap-2 self-end sm:self-center">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Sort:</span>
          <button
            onClick={() => setSortBy('trending')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              sortBy === 'trending'
                ? 'bg-deepViolet text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Flame className="w-3.5 h-3.5" />
            <span>Trending</span>
          </button>
          <button
            onClick={() => setSortBy('latest')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              sortBy === 'latest'
                ? 'bg-deepViolet text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Latest</span>
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1 shrink-0 mr-1">
          <Filter className="w-3.5 h-3.5" /> Topics:
        </span>
        {FORUM_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
              selectedTag === tag
                ? 'bg-deepViolet text-white shadow-sm ring-2 ring-deepViolet/20'
                : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-purple-300 dark:hover:border-purple-700'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Feed List */}
      <div className="space-y-6">
        {sortedPosts.length === 0 ? (
          <div className="text-center py-16 bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 p-8 space-y-3">
            <MessageSquare className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200">No discussions match your filter</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Start a new conversation or reset your tags to see all peer discussions.
            </p>
            <button
              onClick={() => { setSelectedTag('All'); setSearchQuery(''); }}
              className="mt-2 px-4 py-2 rounded-xl text-xs font-bold bg-deepViolet text-white"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          sortedPosts.map((post) => {
            const isSaved = savedPosts.includes(post.id);
            const isRepliesOpen = activeReplyPostId === post.id;

            return (
              <div
                key={post.id}
                className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-sm hover:border-purple-300 dark:hover:border-purple-700/60 transition-all duration-200 space-y-4"
              >
                {/* Author Card & Time */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className={`w-11 h-11 rounded-2xl object-cover ring-2 ${
                          post.author.isAnonymous 
                            ? 'ring-emerald-500 bg-slate-800' 
                            : 'ring-purple-200 dark:ring-purple-900'
                        }`}
                      />
                      {post.author.isAnonymous && (
                        <span className="absolute -bottom-1 -right-1 p-0.5 bg-emerald-600 rounded-full text-white shadow-sm" title="Identity Protected">
                          <EyeOff className="w-3 h-3" />
                        </span>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900 dark:text-white">
                          {post.author.name}
                        </span>
                        {post.author.isAnonymous ? (
                          <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center gap-1">
                            <Shield className="w-2.5 h-2.5" />
                            Anonymous Verified
                          </span>
                        ) : (
                          <span className="text-[10px] font-semibold px-2 py-0.2 rounded-full bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300">
                            {post.author.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {post.author.role} • <span>{post.createdAt}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-deepViolet/10 text-deepViolet dark:bg-purple-950 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                      {post.category}
                    </span>
                    <button
                      onClick={() => toggleSavePost(post.id)}
                      className={`p-2 rounded-xl transition-colors ${
                        isSaved ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                      }`}
                      aria-label="Save bookmark"
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Post Content */}
                <div className="space-y-2">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 whitespace-pre-line leading-relaxed">
                    {post.content}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {post.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-semibold px-2.5 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Footer Interaction Bar */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Upvote / Like Button */}
                    <button
                      onClick={() => onToggleLike(post.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                        post.isLiked
                          ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800'
                          : 'bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${post.isLiked ? 'fill-current text-rose-500' : ''}`} />
                      <span>{post.likes}</span>
                    </button>

                    {/* Replies Toggle Button */}
                    <button
                      onClick={() => setActiveReplyPostId(isRepliesOpen ? null : post.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                    >
                      <MessageCircle className="w-3.5 h-3.5 text-deepViolet dark:text-purple-400" />
                      <span>{post.replies?.length || 0} Replies</span>
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(`${window.location.origin}/community#${post.id}`);
                      showToast('Discussion link copied to clipboard!', 'info');
                    }}
                    className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Share</span>
                  </button>
                </div>

                {/* EXPANDED REPLIES & DISCUSSION THREAD */}
                {isRepliesOpen && (
                  <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4 animate-fadeIn">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Thread Replies ({post.replies?.length || 0})
                    </h4>

                    {/* List of Replies */}
                    <div className="space-y-3">
                      {post.replies && post.replies.length > 0 ? (
                        post.replies.map((reply) => (
                          <div
                            key={reply.id}
                            className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 space-y-1.5"
                          >
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2">
                                <img
                                  src={reply.author.avatar}
                                  alt={reply.author.name}
                                  className="w-6 h-6 rounded-full object-cover"
                                />
                                <span className="font-bold text-slate-900 dark:text-white">
                                  {reply.author.name}
                                </span>
                                <span className="text-slate-400 text-[10px]">
                                  • {reply.author.role}
                                </span>
                              </div>
                              <span className="text-[10px] text-slate-400">{reply.createdAt}</span>
                            </div>
                            <p className="text-xs text-slate-600 dark:text-slate-300 pl-8">
                              {reply.content}
                            </p>
                          </div>
                        ))
                      ) : (
                        <div className="text-xs text-slate-400 italic py-2">
                          No replies yet. Be the first to add your perspective!
                        </div>
                      )}
                    </div>

                    {/* Reply Input Box */}
                    <div className="flex items-center gap-2 pt-2">
                      <input
                        type="text"
                        placeholder="Add a supportive reply or tactical tip..."
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleReplySubmit(post.id);
                        }}
                        className="flex-1 p-2.5 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-deepViolet"
                      />
                      <button
                        onClick={() => handleReplySubmit(post.id)}
                        className="p-2.5 rounded-xl bg-deepViolet hover:bg-purple-700 text-white shadow-sm transition-all"
                        aria-label="Send reply"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* CREATE POST MODAL WITH ANONYMOUS TOGGLE */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 border border-purple-200 dark:border-slate-800 rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-deepViolet/10 text-deepViolet dark:bg-purple-950 dark:text-purple-300">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Create Community Post
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Catalyst California C3 Safe Space Guidelines Enforced
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4 text-xs">
              {/* Anonymous Posting Toggle */}
              <div className="p-3.5 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900/40 flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 dark:text-white">
                    <Shield className="w-4 h-4 text-emerald-500" />
                    <span>Post Anonymously</span>
                  </div>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Hides your name and displays your profile as "Incognito Technologist".
                  </p>
                </div>

                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={postForm.isAnonymous}
                    onChange={(e) => setPostForm({ ...postForm, isAnonymous: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-slate-300 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-deepViolet"></div>
                </label>
              </div>

              {/* Category Picker */}
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Topic Category
                </label>
                <select
                  value={postForm.category}
                  onChange={(e) => setPostForm({ ...postForm, category: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
                >
                  <option value="Salary Transparency">Salary Transparency</option>
                  <option value="GHC Networking">GHC Networking</option>
                  <option value="Workplace Safety">Workplace Safety</option>
                  <option value="Microaggressions">Microaggressions & Credit Reclamation</option>
                  <option value="Executive Sponsorship">Executive Sponsorship</option>
                </select>
              </div>

              {/* Title */}
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Discussion Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. How to handle promotion pushback during calibration?"
                  value={postForm.title}
                  onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Discussion Content *
                </label>
                <textarea
                  rows={5}
                  required
                  placeholder="Share your experience, question, or tactical advice with context..."
                  value={postForm.content}
                  onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white leading-relaxed"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1">
                  Tags (Comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Promotion, Staff Engineer, California Labor"
                  value={postForm.tagsInput}
                  onChange={(e) => setPostForm({ ...postForm, tagsInput: e.target.value })}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              {/* Actions */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl font-bold bg-deepViolet hover:bg-purple-700 text-white shadow-md shadow-purple-900/20"
                >
                  Publish Discussion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
