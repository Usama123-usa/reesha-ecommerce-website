"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import { supabase } from "@/lib/supabaseClient";

export default function Reviews() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };
  
  // Form state
  const [formData, setFormData] = useState({
    user_name: "",
    product_id: "",
    comment: ""
  });
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchReviews();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]); // Re-fetch on search change (debounced)

  async function fetchProducts() {
    const { data } = await supabase.from('products').select('id, name').order('name');
    if (data) setProducts(data);
  }

  async function fetchReviews() {
    setLoading(true);
    let query = supabase
      .from('reviews')
      .select('*, products(name)', { count: 'exact' })
      .order('created_at', { ascending: false });

    if (searchQuery) {
      // Supabase search on reviews table and related products table is tricky with ilike
      // For simplicity, we'll fetch and filter if search is active, or use a complex query
      query = query.ilike('user_name', `%${searchQuery}%`);
    }

    const { data } = await query;
    if (data) setReviews(data);
    setLoading(false);
    setCurrentPage(1); // Reset to first page on search
  }

  const handleDelete = async (id: string) => {
    if (!id) return;
    if (!confirm('Remove this review? This cannot be undone.')) return;
    setDeletingId(id);
    try {
      const res = await fetch('/api/reviews', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Delete failed.');
      showToast('Review removed successfully.', 'success');
      fetchReviews();
    } catch (err: any) {
      showToast(err.message || 'Failed to remove review.', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  const handleSaveReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.user_name || !formData.product_id || !formData.comment) {
      alert("Please fill in all fields.");
      return;
    }
    setFormLoading(true);
    try {
      const { error } = await supabase.from('reviews').insert([formData]);
      if (error) throw error;
      setIsModalOpen(false);
      setFormData({ user_name: "", product_id: "", comment: "" });
      fetchReviews();
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setFormLoading(false);
    }
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = reviews.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(reviews.length / itemsPerPage);

  return (
    <div className="flex bg-surface text-on-background font-body min-h-screen overflow-hidden">
      <Sidebar />
      <div className="w-64 shrink-0 hidden md:block" />
      <main className="flex-1 overflow-y-auto relative bg-background">
        <Header />
        <div className="p-4 md:p-margin-desktop max-w-5xl mx-auto space-y-gutter pb-24">
          
          <div className="flex flex-col md:flex-row justify-between items-center bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10 shadow-sm gap-4">
            <div>
              <h2 className="text-2xl font-headline text-on-surface">Customer Reviews</h2>
              <p className="text-sm text-outline italic">Monitor feedback for your artisan creations</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm">search</span>
                <input
                  type="text"
                  placeholder="Search by customer..."
                  className="pl-10 pr-4 py-2 bg-surface-container-lowest border border-outline-variant/30 rounded-full text-xs outline-none focus:ring-1 focus:ring-primary w-48 md:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-primary text-on-primary px-6 py-2 rounded-full font-bold uppercase tracking-widest hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg text-xs"
              >
                <span className="material-symbols-outlined text-sm">add</span> Add Review
              </button>
            </div>
          </div>

          <div className="glass-panel rounded-2xl overflow-hidden custom-shadow">
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[640px]">
                <thead>
                  <tr className="bg-surface-container-low text-outline text-[10px] uppercase font-bold tracking-widest">
                    <th className="px-8 py-4">Customer Name</th>
                    <th className="px-8 py-4">Product Name</th>
                    <th className="px-8 py-4">Review Description</th>
                    <th className="px-8 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  {currentItems.map((review) => (
                    <tr key={review.id} className="hover:bg-primary-container/5 group transition-colors">
                      <td className="px-8 py-4 font-bold text-on-surface">{review.user_name}</td>
                      <td className="px-8 py-4 text-sm text-outline">{review.products?.name || "Deleted Product"}</td>
                      <td className="px-8 py-4 text-xs text-outline leading-relaxed italic max-w-xs truncate">{review.comment}</td>
                      <td className="px-8 py-4 text-right">
                        <button
                          onClick={() => handleDelete(review.id)}
                          disabled={deletingId === review.id}
                          className="text-error/60 hover:text-error hover:underline text-xs font-bold uppercase tracking-widest disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          {deletingId === review.id ? 'Removing...' : 'Delete'}
                        </button>
                      </td>
                    </tr>
                  ))}
                  {!loading && currentItems.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-8 py-16 text-center text-outline italic bg-surface-container-lowest/30">
                        {searchQuery ? `No reviews found for "${searchQuery}"` : "No reviews found."}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="p-6 bg-surface-container-low/50 flex justify-center items-center gap-4 border-t border-outline-variant/10">
                <button 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-widest disabled:opacity-30 hover:text-primary transition-colors"
                >
                  Previous
                </button>
                <span className="text-xs font-bold text-outline">Page {currentPage} of {totalPages}</span>
                <button 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 text-xs font-bold uppercase tracking-widest disabled:opacity-30 hover:text-primary transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Toast Notification */}
      {toast && (
        <div className={`fixed bottom-6 right-6 z-[200] px-6 py-4 rounded-2xl shadow-2xl text-sm font-bold uppercase tracking-widest animate-in fade-in slide-in-from-bottom-4 ${
          toast.type === 'success' ? 'bg-primary text-on-primary' : 'bg-error text-on-error'
        }`}>
          {toast.message}
        </div>
      )}

      {/* Add Review Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
          <div className="relative glass-panel w-full max-w-xl rounded-[40px] shadow-2xl p-10 animate-in fade-in zoom-in duration-300">
            <div className="flex justify-between items-center mb-8 border-b border-outline-variant/20 pb-6">
              <h3 className="text-2xl font-headline text-primary">New Customer Review</h3>
              <button onClick={() => setIsModalOpen(false)} className="material-symbols-outlined text-outline hover:text-error transition-colors">close</button>
            </div>
            <form onSubmit={handleSaveReview} className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-outline ml-1">Customer Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="e.g. Sarah J." 
                  className="w-full px-6 py-4 bg-surface-container-low border border-outline-variant/30 rounded-2xl focus:ring-1 focus:ring-primary outline-none transition-all"
                  value={formData.user_name}
                  onChange={(e) => setFormData({...formData, user_name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-outline ml-1">Product</label>
                <div className="relative">
                  <select 
                    required 
                    title="Select a Product"
                    className="w-full px-6 py-4 bg-surface-container-low border border-outline-variant/30 rounded-2xl focus:ring-1 focus:ring-primary outline-none transition-all appearance-none pr-12"
                    value={formData.product_id}
                    onChange={(e) => setFormData({...formData, product_id: e.target.value})}
                  >
                    <option value="">Select a Product</option>
                    {products.map(p => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                  <span className="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-outline">expand_more</span>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-outline ml-1">Description</label>
                <textarea 
                  required 
                  rows={4} 
                  placeholder="Write the review content here..." 
                  className="w-full px-6 py-4 bg-surface-container-low border border-outline-variant/30 rounded-2xl focus:ring-1 focus:ring-primary outline-none transition-all resize-none italic"
                  value={formData.comment}
                  onChange={(e) => setFormData({...formData, comment: e.target.value})}
                ></textarea>
              </div>
              <div className="flex gap-4 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-4 rounded-2xl border border-outline-variant text-outline font-bold uppercase tracking-widest hover:bg-surface-container-low transition-all">Cancel</button>
                <button type="submit" disabled={formLoading} className="flex-[2] bg-primary text-on-primary py-4 rounded-2xl font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-xl disabled:opacity-50">{formLoading ? "SAVING..." : "SAVE REVIEW"}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
