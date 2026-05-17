"use client";

import { useState, useEffect, useRef } from "react";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import { supabase } from "@/lib/supabaseClient";
import imageCompression from 'browser-image-compression';

export default function Categories() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  // Form state
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchCategories();
  }, [searchQuery]);

  async function fetchCategories() {
    let query = supabase.from('categories').select('*').order('name');
    if (searchQuery) {
      query = query.ilike('name', `%${searchQuery}%`);
    }
    const { data } = await query;
    if (data) setCategories(data);
    setCurrentPage(1);
  }

  const openModal = (category: any = null) => {
    if (category) {
      setEditingCategory(category);
      setName(category.name);
      setPreview(category.image_url);
    } else {
      setEditingCategory(null);
      setName("");
      setPreview(null);
    }
    setSelectedFile(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setName("");
    setSelectedFile(null);
    setPreview(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const compressAndUpload = async (file: File) => {
    const options = { maxSizeMB: 1, maxWidthOrHeight: 1200, useWebWorker: true };
    try {
      const compressedFile = await imageCompression(file, options);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `categories/${fileName}`;
      const { error: uploadError } = await supabase.storage.from('product-images').upload(filePath, compressedFile);
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage.from('product-images').getPublicUrl(filePath);
      return publicUrl;
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || (!preview && !selectedFile)) {
      alert("Please provide both a name and an image.");
      return;
    }
    setLoading(true);

    try {
      let imageUrl = preview;
      if (selectedFile) imageUrl = await compressAndUpload(selectedFile);

      if (editingCategory) {
        const { error } = await supabase.from('categories').update({ name, image_url: imageUrl }).eq('id', editingCategory.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('categories').insert([{ name, image_url: imageUrl }]);
        if (error) throw error;
      }
      closeModal();
      fetchCategories();
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!id) return;
    if (!confirm('Delete this category? Products in this category may be affected.')) return;
    setDeletingId(id);
    try {
      const res = await fetch('/api/categories', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Delete failed.');
      showToast('Category deleted successfully.', 'success');
      fetchCategories();
    } catch (err: any) {
      showToast(err.message || 'Failed to delete category.', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = categories.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  return (
    <div className="flex bg-surface text-on-background font-body min-h-screen overflow-hidden">
      <Sidebar />
      <div className="w-64 shrink-0 hidden md:block" />
      <main className="flex-1 overflow-y-auto relative bg-background">
        <Header />
        
        <div className="p-margin-desktop max-w-6xl mx-auto space-y-gutter pb-24">
          <div className="flex flex-col md:flex-row justify-between items-center bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10 shadow-sm gap-4">
            <div>
              <h2 className="text-2xl font-headline text-on-surface">Categories & Collections</h2>
              <p className="text-sm text-outline italic">Manage your gift categories</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm">search</span>
                <input 
                  type="text"
                  placeholder="Search collections..."
                  className="pl-10 pr-4 py-2 bg-surface-container-lowest border border-outline-variant/30 rounded-full text-xs outline-none focus:ring-1 focus:ring-primary w-48 md:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button
                onClick={() => openModal()}
                className="bg-primary text-on-primary px-6 py-2 rounded-full font-bold uppercase tracking-widest hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg text-xs"
              >
                <span className="material-symbols-outlined text-sm">add</span> Add
              </button>
            </div>
          </div>

          <div className="glass-panel rounded-2xl overflow-hidden custom-shadow">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-surface-container-low text-outline text-[10px] uppercase font-bold tracking-widest">
                  <th className="px-8 py-4">Image</th>
                  <th className="px-8 py-4">Collection Name</th>
                  <th className="px-8 py-4">Created At</th>
                  <th className="px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/20">
                {currentItems.map((cat) => (
                  <tr key={cat.id} className="hover:bg-primary-container/5 group transition-colors">
                    <td className="px-8 py-4">
                      <div className="w-14 h-14 rounded-xl overflow-hidden border border-outline-variant/20 shadow-sm">
                        <img src={cat.image_url || 'https://via.placeholder.com/150'} alt={cat.name} className="w-full h-full object-cover" />
                      </div>
                    </td>
                    <td className="px-8 py-4 font-bold text-on-surface group-hover:text-primary transition-colors">{cat.name}</td>
                    <td className="px-8 py-4 text-sm text-outline italic">{new Date(cat.created_at).toLocaleDateString()}</td>
                    <td className="px-8 py-4 text-right">
                      <div className="flex justify-end gap-4">
                        <button onClick={() => openModal(cat)} className="text-primary hover:underline text-xs font-bold uppercase tracking-widest">Edit</button>
                        <button onClick={() => handleDelete(cat.id)} disabled={deletingId === cat.id} className="text-error/60 hover:text-error hover:underline text-xs font-bold uppercase tracking-widest disabled:opacity-40 disabled:cursor-not-allowed">{deletingId === cat.id ? 'Deleting...' : 'Delete'}</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {totalPages > 1 && (
              <div className="p-6 bg-surface-container-low/50 flex justify-center items-center gap-4 border-t border-outline-variant/10">
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-4 py-2 text-xs font-bold uppercase tracking-widest disabled:opacity-30 hover:text-primary transition-colors">Prev</button>
                <span className="text-xs font-bold text-outline">Page {currentPage} of {totalPages}</span>
                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-4 py-2 text-xs font-bold uppercase tracking-widest disabled:opacity-30 hover:text-primary transition-colors">Next</button>
              </div>
            )}
          </div>
        </div>

        {/* Toast Notification */}
        {toast && (
          <div className={`fixed bottom-6 right-6 z-[200] px-6 py-4 rounded-2xl shadow-2xl text-sm font-bold uppercase tracking-widest animate-in fade-in slide-in-from-bottom-4 ${
            toast.type === 'success' ? 'bg-primary text-on-primary' : 'bg-error text-on-error'
          }`}>
            {toast.message}
          </div>
        )}

        {/* Modal Overlay */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={closeModal}></div>
            <div className="relative glass-panel w-full max-w-xl rounded-3xl shadow-2xl p-8 overflow-hidden animate-in fade-in zoom-in duration-300">
              <div className="flex justify-between items-center mb-8 border-b border-outline-variant/20 pb-4">
                <h3 className="text-2xl font-headline text-primary">{editingCategory ? "Edit Category" : "Add New Category"}</h3>
                <button onClick={closeModal} className="material-symbols-outlined text-outline hover:text-error transition-colors">close</button>
              </div>
              <form onSubmit={handleSave} className="space-y-8">
                <div className="space-y-2">
                  <label htmlFor="category-name" className="text-xs font-bold uppercase tracking-widest text-outline ml-1">Category Name</label>
                  <input id="category-name" type="text" required placeholder="Enter category name" className="w-full px-4 py-4 bg-surface-container-low border border-outline-variant/30 rounded-2xl focus:ring-1 focus:ring-primary outline-none transition-all" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-4">
                  <label className="text-xs font-bold uppercase tracking-widest text-outline ml-1">Category Image</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-outline-variant/30 rounded-2xl p-8 flex flex-col items-center justify-center space-y-3 hover:border-primary transition-all bg-surface-container-low/30 cursor-pointer group">
                      <span className="material-symbols-outlined text-outline group-hover:text-primary transition-all text-3xl">add_photo_alternate</span>
                      <p className="text-[10px] text-outline font-bold uppercase tracking-widest text-center">{preview ? "Replace" : "Upload"}</p>
                      <input type="file" hidden ref={fileInputRef} accept="image/*" onChange={handleFileChange} />
                    </div>
                    {preview && (
                      <div className="aspect-square rounded-2xl overflow-hidden border border-outline-variant/30 shadow-inner">
                        <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={closeModal} className="flex-1 py-4 rounded-xl border border-outline-variant text-outline font-bold uppercase tracking-widest hover:bg-surface-container-low transition-all">Cancel</button>
                  <button type="submit" disabled={loading} className="flex-[2] bg-primary text-on-primary py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-xl disabled:opacity-50 flex items-center justify-center gap-3">{loading ? "SAVING..." : "SAVE CATEGORY"}</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
