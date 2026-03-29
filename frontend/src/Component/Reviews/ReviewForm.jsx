import React, { useState, useRef, useEffect } from 'react';
import { Star, Send, User } from 'lucide-react';
import { toast } from 'react-toastify';
import api from '../../Radux/axios';
import LoginPromptModal from '../../Utility/LoginPromptModal';


const ReviewForm = ({ type, id, onReviewSubmitted, selectedItem }) => {
     const [rating, setRating] = useState(0);
     const [hover, setHover] = useState(0);
     const [comment, setComment] = useState('');
     const [submitting, setSubmitting] = useState(false);
     const [showPrompt, setShowPrompt] = useState(false);
     const textareaRef = useRef(null);


     const token = localStorage.getItem('token');
     const isAuthenticated = token && token !== 'undefined' && token !== 'null';

     // Auto-resize textarea
     useEffect(() => {
          if (textareaRef.current) {
               textareaRef.current.style.height = 'auto';
               textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
          }
     }, [comment]);

     const modelNames = {
          'trip': 'App\\Models\\Trip',
          'restaurant': 'App\\Models\\Restaurant',
          'hotel': 'App\\Models\\Hotel',
          'activity': 'App\\Models\\Activity',
          'flight': 'App\\Models\\Flight',
          'car': 'App\\Models\\Car',
          'cruise': 'App\\Models\\Cruise'
     };

     const handleSubmit = async (e) => {
          e.preventDefault();

          if (rating === 0) {
               toast.error('Please select a rating');
               return;
          }
          if (!comment.trim()) {
               toast.error('Please write a comment');
               return;
          }
          if (comment.length < 5) {
               toast.error('Comment must be at least 5 characters');
               return;
          }

          setSubmitting(true);
          try {
               const response = await api.post('/reviews', {
                    reviewable_type: modelNames[type] || 'App\\Models\\Trip',
                    reviewable_id: id,
                    rating: rating,
                    comment: comment,
               });

               if (response.status === 200 || response.status === 201) {
                    toast.success('Thank you for your feedback! ✨');
                    setRating(0);
                    setComment('');
                    if (onReviewSubmitted) onReviewSubmitted();
               }
          } catch (error) {
               console.error('Review submission error:', error);
               if (error.response?.status === 422) {
                    toast.error('You have already reviewed this item');
               } else {
                    toast.error('Something went wrong. Please try again.');
               }
          } finally {
               setSubmitting(false);
          }
     };

     if (!isAuthenticated) {
          return (
               <div className="relative group overflow-hidden bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/50 dark:border-slate-800/50 p-8 rounded-[2rem] shadow-2xl shadow-blue-500/5 transition-all duration-500 hover:shadow-blue-500/10 hover:border-blue-500/30">
                    <LoginPromptModal
                         open={showPrompt}
                         onClose={() => setShowPrompt(false)}
                         onGoLogin={() => window.location.href = '/login'}
                         type="review"
                    />

                    {/* Sophisticated Glow */}
                    <div className="absolute -top-16 -right-16 w-32 h-32 bg-blue-400/10 dark:bg-blue-600/10 rounded-full blur-[60px] group-hover:bg-blue-400/20 transition-colors duration-700"></div>

                    <div className="relative z-10 text-center">
                         <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-500/20 transform transition-all duration-700 group-hover:rotate-[10deg] group-hover:scale-110">
                              <User size={32} strokeWidth={1.5} />
                         </div>

                         <h4 className="text-xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">Share your story</h4>
                         <p className="text-slate-500 dark:text-slate-400 text-xs mb-8 max-w-[240px] mx-auto leading-relaxed">
                              Join our travelers and help others discover the best experiences!
                         </p>

                         <button
                              onClick={() => setShowPrompt(true)}
                              className="w-full bg-slate-900 dark:bg-blue-600 hover:bg-slate-800 dark:hover:bg-blue-500 text-white py-3 px-6 rounded-xl font-bold transition-all shadow-xl shadow-blue-500/10 transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-2 text-sm"
                         >
                              Sign in to Review
                         </button>
                    </div>
               </div>
          );
     }


     return (
          <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border border-white/50 dark:border-slate-800/50 p-6 rounded-[2rem] shadow-2xl shadow-slate-500/5 transition-all duration-500 hover:shadow-blue-500/5">
               <div className="mb-6">
                    <h4 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-3">
                         <div className="w-9 h-9 bg-amber-100 dark:bg-amber-900/30 text-amber-500 dark:text-amber-400 rounded-lg flex items-center justify-center shadow-inner">
                              <Star size={18} fill="currentColor" strokeWidth={1} />
                         </div>
                         Write a Review
                    </h4>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-2 font-medium">How was your journey?</p>
               </div>

               <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Star Rating Selection */}
                    <div className="space-y-3">
                         <div className="flex justify-between items-center px-1">
                              <label id="rating-label" className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Overall Rating</label>
                              {rating > 0 && <span className="text-[10px] font-black text-blue-500 dark:text-blue-400 uppercase tracking-widest">{rating}.0 Rating</span>}
                         </div>
                         <div className="flex gap-2.5 bg-white/50 dark:bg-slate-800/30 p-3 rounded-xl border border-white/60 dark:border-slate-700/50 shadow-inner justify-center">
                              {[1, 2, 3, 4, 5].map((star) => (
                                   <button
                                        key={star}
                                        type="button"
                                        className="focus:outline-none relative group/star"
                                        aria-label={`Rate ${star} stars`}
                                        aria-labelledby="rating-label"
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHover(star)}
                                        onMouseLeave={() => setHover(0)}
                                   >
                                        <Star
                                             size={28}
                                             strokeWidth={1.5}
                                             className={`transition-all duration-300 transform ${star <= (hover || rating)
                                                  ? 'text-amber-400 fill-amber-400 scale-110'
                                                  : 'text-slate-300 dark:text-slate-700 hover:text-slate-400'
                                                  }`}
                                        />
                                        {star <= (hover || rating) && (
                                             <div className="absolute inset-0 bg-amber-400/20 blur-xl animate-pulse -z-10 rounded-full"></div>
                                        )}
                                   </button>
                              ))}
                         </div>
                    </div>

                    {/* Comment Textarea */}
                    <div className="space-y-3">
                         <div className="flex justify-between items-center px-1">
                              <label htmlFor="review-comment" className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Your Experience</label>
                              <div className={`flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${comment.length < 5 ? 'bg-slate-100 dark:bg-slate-800 text-slate-400' : 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'}`}>
                                   {comment.length} / 5+
                              </div>
                         </div>
                         <div className="relative group-focus-within:translate-y-[-2px] transition-transform duration-300">
                              <textarea
                                   id="review-comment"
                                   name="comment"
                                   ref={textareaRef}
                                   value={comment}
                                   onChange={(e) => setComment(e.target.value)}
                                   placeholder="What did you love?"
                                   rows={3}
                                   className="w-full bg-white/30 dark:bg-slate-950/30 border-2 border-slate-100 dark:border-slate-800/50 rounded-2xl p-4 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 dark:focus:border-blue-500/50 transition-all resize-none shadow-inner text-sm leading-relaxed overflow-hidden"
                                   style={{ minHeight: '100px' }}
                              />
                         </div>
                    </div>

                    {/* Submit Button */}
                    <button
                         type="submit"
                         disabled={submitting}
                         className={`w-full relative group overflow-hidden py-3.5 px-6 rounded-xl font-black transition-all duration-500 flex items-center justify-center gap-3 overflow-hidden text-sm ${submitting
                              ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                              : 'bg-slate-900 dark:bg-blue-600 text-white shadow-xl shadow-blue-500/10 hover:shadow-blue-500/25 active:scale-[0.98]'
                              }`}
                    >
                         {/* Shine effect */}
                         <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white/10 opacity-40 group-hover:animate-shine" />

                         {submitting ? (
                              <>
                                   <div className="w-4 h-4 border-2 border-slate-300 border-t-slate-500 rounded-full animate-spin" />
                                   <span>Sending...</span>
                              </>
                         ) : (
                              <>
                                   <Send size={16} strokeWidth={2.5} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                   <span className="tracking-wide uppercase text-[10px]">Publish Review</span>
                              </>
                         )}
                    </button>
               </form>
          </div>
     );
};

export default ReviewForm;
