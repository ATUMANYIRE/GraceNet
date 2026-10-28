import React, { useState } from 'react';
import { 
  MessageSquare, 
  Heart, 
  Share2, 
  PlusCircle, 
  Shield, 
  Search, 
  Filter, 
  Bookmark, 
  X,
  MessageCircle,
  EyeOff,
  Flame,
  Clock,
  Send
} from 'lucide-react';
import { FORUM_TAGS } from '../data/communityData';

export default function Community({ posts, onAddPost, onToggleLike, onAddReply, showToast, userProfile }) {
  const [selectedTag, setSelectedTag] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('trending');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeReplyPostId, setActiveReplyPostId] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [savedPosts, setSavedPosts] = useState([]);

  const [postForm, setPostForm] = useState({
    title: '',
    content: '',
    category: 'Salary Transparency',
    isAnonymous: false,
    tagsInput: 'Salary Transparency, Career Growth'
  });

  const filteredPosts = posts.filter(post => {
    const matchesTag = selectedTag === 'All' || post.category === selectedTag || post.tags.includes(selectedTag);
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTag && matchesSearch;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (sortBy === 'trending') {
      return (b.likes + (b.replies?.length || 0) * 2) - (a.likes + (a.replies?.length || 0) * 2);
    }
    return 0;
  });

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!postForm.title.trim() || !postForm.content.trim()) {
      showToast('Please provide a title and content', 'error');
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
        role: postForm.isAnonymous ? 'Verified Member' : (userProfile?.roleTitle || 'Software Engineer'),
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
    showToast(postForm.isAnonymous ? 'Anonymous post shared safely!' : 'Post published!', 'success');
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
        name: userProfile?.name || 'Community Member',
        role: userProfile?.roleTitle || 'Technologist',
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
      showToast('Removed from saved items', 'info');
    } else {
      setSavedPosts([...savedPosts, postId]);
      showToast('Saved to bookmarks!', 'success');
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-black/[0.06] dark:border-white/[0.08] pb-4">
        <div className="w-full sm:w-80 relative">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-[#5E6064]" />
          <input
            type="text"
            placeholder="Search discussions or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-[13px] rounded-full border border-black/[0.08] dark:border-white/[0.1] bg-[#FFFFFF] dark:bg-slate-900 text-[#000000] dark:text-white placeholder-[#5E6064] focus:outline-none focus:ring-2 focus:ring-[#7A5CF0]"
          />
        </div>

        <div className="flex items-center gap-2 self-end sm:self-center">
          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-[500] bg-[#000000] hover:bg-slate-900 text-white shadow-sm cursor-pointer border-none"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Create Post</span>
          </button>

          <button
            onClick={() => setSortBy('trending')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-[500] cursor-pointer border ${
              sortBy === 'trending'
                ? 'bg-[#000000] text-white border-transparent font-[600]'
                : 'bg-transparent text-[#5E6064] border-transparent'
            }`}
          >
            <Flame className="w-3 h-3 text-[#F8533F]" />
            <span>Trending</span>
          </button>
        </div>
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-[12px] font-[500] text-[#5E6064] uppercase tracking-wider flex items-center gap-1 shrink-0 mr-1">
          <Filter className="w-3 h-3" /> Topics:
        </span>
        {FORUM_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`px-3.5 py-1.5 rounded-full text-[12.5px] font-[500] whitespace-nowrap transition-all cursor-pointer border ${
              selectedTag === tag
                ? 'bg-[#000000] text-white border-transparent'
                : 'bg-[#FFFFFF] dark:bg-slate-900 border-black/[0.08] dark:border-white/[0.1] text-[#3A3C40] dark:text-slate-300'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Feed List */}
      <div className="space-y-4">
        {sortedPosts.map((post) => {
          const isSaved = savedPosts.includes(post.id);
          const isRepliesOpen = activeReplyPostId === post.id;

          return (
            <div
              key={post.id}
              className="bg-[#FFFFFF] dark:bg-slate-900 border border-black/[0.06] dark:border-white/[0.08] rounded-[16px] p-6 shadow-sm space-y-4"
            >
              {/* Author Card & Time */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-[10px] object-cover ring-2 ring-black/[0.06]"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-[600] text-[#000000] dark:text-white">
                        {post.author.name}
                      </span>
                      {post.author.isAnonymous ? (
                        <span className="text-[10px] font-[600] px-2 py-0.5 rounded-full bg-[#F1EDFE] text-[#6A4CEB] dark:bg-purple-950 dark:text-purple-300 border border-[#E8E2FD] dark:border-purple-800/40">
                          Shield Protected
                        </span>
                      ) : (
                        <span className="text-[10px] font-[500] px-2 py-0.2 rounded-full bg-gradient-to-r from-[#F1EDFE] to-[#E8E2FD] text-[#6A4CEB]">
                          {post.author.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#5E6064]">
                      {post.author.role} • <span>{post.createdAt}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-[600] px-3 py-1 rounded-full bg-[#FAF9F8] dark:bg-slate-800 text-[#3A3C40] dark:text-slate-300 border border-black/[0.06] dark:border-white/[0.08]">
                    {post.category}
                  </span>
                  <button
                    onClick={() => toggleSavePost(post.id)}
                    className="p-1.5 rounded-full text-[#5E6064] hover:text-[#000000] bg-transparent border-none cursor-pointer"
                  >
                    <Bookmark className={`w-4 h-4 ${isSaved ? 'text-amber-500 fill-amber-500' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="space-y-1.5">
                <h3 className="text-base font-[600] text-[#000000] dark:text-white">
                  {post.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5E6064] dark:text-slate-300 leading-relaxed whitespace-pre-line">
                  {post.content}
                </p>
              </div>

              {/* Interaction Bar */}
              <div className="pt-3 border-t border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => onToggleLike(post.id)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-[500] transition-all cursor-pointer border ${
                      post.isLiked
                        ? 'bg-[#FFEBE8] text-[#F8533F] border-[#F8533F]/30'
                        : 'bg-white dark:bg-slate-800 text-[#3A3C40] dark:text-slate-300 border-black/[0.08] dark:border-white/10'
                    }`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${post.isLiked ? 'fill-current text-[#F8533F]' : ''}`} />
                    <span>{post.likes}</span>
                  </button>

                  <button
                    onClick={() => setActiveReplyPostId(isRepliesOpen ? null : post.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-[500] bg-white dark:bg-slate-800 text-[#3A3C40] dark:text-slate-300 border border-black/[0.08] dark:border-white/10 cursor-pointer"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#7A5CF0]" />
                    <span>{post.replies?.length || 0} Replies</span>
                  </button>
                </div>

                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`${window.location.origin}/community#${post.id}`);
                    showToast('Link copied to clipboard!', 'info');
                  }}
                  className="flex items-center gap-1 text-xs text-[#5E6064] hover:text-[#000000] bg-transparent border-none cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share</span>
                </button>
              </div>

              {/* Threaded Replies */}
              {isRepliesOpen && (
                <div className="mt-4 pt-4 border-t border-black/[0.06] dark:border-white/[0.08] space-y-3">
                  {post.replies?.map((reply) => (
                    <div
                      key={reply.id}
                      className="p-3 rounded-[12px] bg-[#FAF9F8] dark:bg-slate-800/50 border border-black/[0.04] dark:border-white/[0.04] space-y-1 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-[600] text-[#000000] dark:text-white">{reply.author.name}</span>
                        <span className="text-[#5E6064] text-[10px]">{reply.createdAt}</span>
                      </div>
                      <p className="text-[#3A3C40] dark:text-slate-300">{reply.content}</p>
                    </div>
                  ))}

                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="text"
                      placeholder="Add a reply..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleReplySubmit(post.id);
                      }}
                      className="flex-1 p-2.5 text-xs rounded-full border border-black/[0.08] dark:border-white/[0.1] bg-[#FFFFFF] dark:bg-slate-800 text-[#000000] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#7A5CF0]"
                    />
                    <button
                      onClick={() => handleReplySubmit(post.id)}
                      className="p-2.5 rounded-full bg-[#000000] text-white border-none cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* CREATE POST MODAL */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg bg-[#FFFFFF] dark:bg-slate-900 border border-black/[0.08] dark:border-white/[0.08] rounded-[16px] p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-black/[0.06] dark:border-white/[0.08]">
              <h3 className="text-lg font-[600] text-[#000000] dark:text-white">
                Create Community Post
              </h3>
              <button
                onClick={() => setIsCreateModalOpen(false)}
                className="text-[#5E6064] hover:text-[#000000] bg-transparent border-none cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4 text-xs">
              <div className="p-3.5 rounded-[12px] bg-[#FAF9F8] dark:bg-slate-800/60 border border-black/[0.06] dark:border-white/[0.08] flex items-center justify-between">
                <div>
                  <div className="font-[600] text-[#000000] dark:text-white">Post Anonymously</div>
                  <p className="text-[11px] text-[#5E6064]">Hides name as Incognito Technologist.</p>
                </div>
                <input
                  type="checkbox"
                  checked={postForm.isAnonymous}
                  onChange={(e) => setPostForm({ ...postForm, isAnonymous: e.target.checked })}
                  className="w-4 h-4 accent-[#7A5CF0]"
                />
              </div>

              <div>
                <label className="block font-[600] uppercase text-[#5E6064] mb-1">Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Navigating promotion calibrations"
                  value={postForm.title}
                  onChange={(e) => setPostForm({ ...postForm, title: e.target.value })}
                  className="w-full p-2.5 rounded-[10px] border border-black/[0.08] bg-white dark:bg-slate-800 text-[#000000] dark:text-white"
                />
              </div>

              <div>
                <label className="block font-[600] uppercase text-[#5E6064] mb-1">Content *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Share your perspective..."
                  value={postForm.content}
                  onChange={(e) => setPostForm({ ...postForm, content: e.target.value })}
                  className="w-full p-2.5 rounded-[10px] border border-black/[0.08] bg-white dark:bg-slate-800 text-[#000000] dark:text-white"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 rounded-full text-[#5E6064] bg-transparent border-none cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full font-[500] bg-[#000000] text-white cursor-pointer border-none"
                >
                  Publish Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
