"use client";

import { useEffect, useState, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import { supabase } from "@/lib/supabaseClient";
import imageCompression from 'browser-image-compression';

function AdminDashboardContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [formLoading, setFormLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };
  
  // Stats
  const [stats, setStats] = useState({
    activeListings: 0,
    totalCategories: 0,
    homeVisibility: 0
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category_id: "",
    description: "",
    status: "Live"
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchInitialData();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Check for trigger to open modal (e.g. from Sidebar)
  useEffect(() => {
    if (searchParams.get('action') === 'add') {
      openModal();
      // Remove query param
      router.replace('/admin/dashboard');
    }
  }, [searchParams]);

  async function fetchInitialData() {
    setLoading(true);
    let prodQuery = supabase.from('products').select('*, categories(name), product_images(image_url)').order('created_at', { ascending: false });
    
    if (searchQuery) {
      prodQuery = prodQuery.ilike('name', `%${searchQuery}%`);
    }

    const [
      { data: productsData },
      { data: categoriesData }
    ] = await Promise.all([
      prodQuery,
      supabase.from('categories').select('*').order('name'),
    ]);

    if (productsData) {
      setProducts(productsData);
      
      // Calculate Stats
      const active = productsData.filter(p => p.status === 'Live').length;
      const homeVis = productsData.filter(p => p.status === 'Live').length; // Home visibility = Live products
      
      setStats({
        activeListings: active,
        totalCategories: categoriesData?.length || 0,
        homeVisibility: homeVis
      });
    }
    if (categoriesData) setCategories(categoriesData);
    setLoading(false);
    setCurrentPage(1);
  }

  const openModal = (product: any = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        price: product.price.toString(),
        category_id: product.category_id,
        description: product.description || "",
        status: product.status || "Live"
      });
      setPreviews((product.product_images || []).map((img: any) => img.image_url));
    } else {
      setEditingProduct(null);
      setFormData({ name: "", price: "", category_id: "", description: "", status: "Live" });
      setPreviews([]);
    }
    setSelectedFiles([]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
    setFormData({ name: "", price: "", category_id: "", description: "", status: "Live" });
    setSelectedFiles([]);
    setPreviews([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...filesArray]);
      const newPreviews = filesArray.map(file => URL.createObjectURL(file));
      setPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== (index - (previews.length - selectedFiles.length))));
    setPreviews(prev => prev.filter((_, i) => i !== index));
  };

  const compressAndUpload = async (file: File, productId: string) => {
    const options = { maxSizeMB: 1, maxWidthOrHeight: 1200, useWebWorker: true };
    try {
      const compressedFile = await imageCompression(file, options);
      const formData = new FormData();
      formData.append('file', compressedFile);
      formData.append('folder', `products/${productId}`);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Upload failed.');
      }

      return data.publicUrl;
    } catch (error) {
      console.error("Upload error:", error);
      throw error;
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.category_id) {
      alert("Please fill in all required fields.");
      return;
    }
    setFormLoading(true);

    try {
      let productId = editingProduct?.id;
      const productPayload = {
        name: formData.name,
        price: parseFloat(formData.price),
        category_id: formData.category_id,
        description: formData.description,
        status: formData.status
      };

      if (editingProduct) {
        const res = await fetch('/api/products', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: productId, ...productPayload }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to update product.');
      } else {
        const res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(productPayload),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Failed to create product.');
        productId = data.data.id;
      }

      if (selectedFiles.length > 0) {
        const imageUrls = await Promise.all(
          selectedFiles.map((file) => compressAndUpload(file, productId))
        );
        const imgRes = await fetch('/api/products', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: productId, images: imageUrls }),
        });
        const imgData = await imgRes.json();
        if (!imgRes.ok) throw new Error(imgData.error || 'Failed to save product images.');
      }
      closeModal();
      fetchInitialData();
    } catch (error: any) {
      alert("Error: " + error.message);
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!id) return;
    if (!confirm('Delete this product and all its images? This cannot be undone.')) return;
    setDeletingId(id);
    try {
      const res = await fetch('/api/products', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Delete failed.');
      showToast('Product deleted successfully.', 'success');
      fetchInitialData();
    } catch (err: any) {
      showToast(err.message || 'Failed to delete product.', 'error');
    } finally {
      setDeletingId(null);
    }
  };

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div className="flex bg-surface text-on-background font-body min-h-screen overflow-hidden">
      <Sidebar />
      <div className="w-64 shrink-0 hidden md:block" />
      <main className="flex-1 overflow-y-auto relative bg-background">
        <Header />
        
        <div className="p-4 md:p-margin-desktop max-w-7xl mx-auto space-y-gutter pb-24">
          
          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel p-8 rounded-[2rem] border border-outline-variant/10 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline mb-2">Active Listings</p>
              <h3 className="text-4xl font-headline text-primary">{stats.activeListings}</h3>
            </div>
            <div className="glass-panel p-8 rounded-[2rem] border border-outline-variant/10 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline mb-2">Total Categories</p>
              <h3 className="text-4xl font-headline text-secondary">{stats.totalCategories}</h3>
            </div>
            <div className="glass-panel p-8 rounded-[2rem] border border-outline-variant/10 shadow-sm">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-outline mb-2">Home Visibility</p>
              <h3 className="text-4xl font-headline text-tertiary">{stats.homeVisibility}</h3>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center bg-surface-container-low p-6 rounded-2xl border border-outline-variant/10 shadow-sm gap-4">
            <div>
              <h2 className="text-2xl font-headline text-on-surface">Product Inventory</h2>
              <p className="text-sm text-outline italic">Manage your gift collections</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline text-sm">search</span>
                <input 
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 bg-surface-container-lowest border border-outline-variant/30 rounded-full text-xs outline-none focus:ring-1 focus:ring-primary w-48 md:w-64"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <button onClick={() => openModal()} className="bg-primary text-on-primary px-6 py-2 rounded-full font-bold uppercase tracking-widest hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg text-xs">
                <span className="material-symbols-outlined text-sm">add</span> Add New
              </button>
            </div>
          </div>

          <div className="glass-panel rounded-2xl overflow-hidden custom-shadow">
            <div className="overflow-x-auto">
              <table className="w-full text-left min-w-[720px]">
                <thead>
                  <tr className="bg-surface-container-low text-outline text-[10px] uppercase font-bold tracking-widest">
                    <th className="px-8 py-4">Product Name</th>
                    <th className="px-8 py-4">Category</th>
                    <th className="px-8 py-4">Price</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/20">
                  {currentItems.map((product) => (
                    <tr key={product.id} className="hover:bg-primary-container/5 group transition-colors">
                      <td className="px-8 py-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden border border-outline-variant/20 shrink-0">
                          <img src={product.product_images?.[0]?.image_url || '/placeholder.svg'} alt="" className="w-full h-full object-cover" />
                        </div>
                        <span className="font-bold text-on-surface group-hover:text-primary transition-colors">{product.name}</span>
                      </td>
                      <td className="px-8 py-4 text-xs text-outline font-medium uppercase tracking-wider">{product.categories?.name || "Uncategorized"}</td>
                      <td className="px-8 py-4 font-bold text-primary">Rs. {product.price.toLocaleString()}</td>
                      <td className="px-8 py-4">
                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${product.status === 'Live' ? 'bg-success/10 text-success' : 'bg-outline/10 text-outline'}`}>
                          {product.status || 'Live'}
                        </span>
                      </td>
                      <td className="px-8 py-4 text-right">
                        <div className="flex justify-end gap-4">
                          <button onClick={() => openModal(product)} className="text-primary hover:underline text-xs font-bold uppercase tracking-widest">Edit</button>
                          <button onClick={() => handleDelete(product.id)} disabled={deletingId === product.id} className="text-error/60 hover:text-error hover:underline text-xs font-bold uppercase tracking-widest disabled:opacity-40 disabled:cursor-not-allowed">{deletingId === product.id ? 'Deleting...' : 'Delete'}</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {totalPages > 1 && (
              <div className="p-6 bg-surface-container-low/50 flex justify-center items-center gap-4 border-t border-outline-variant/10">
                <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="px-4 py-2 text-xs font-bold uppercase tracking-widest disabled:opacity-30 hover:text-primary transition-colors">Prev</button>
                <span className="text-xs font-bold text-outline">Page {currentPage} of {totalPages}</span>
                <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="px-4 py-2 text-xs font-bold uppercase tracking-widest disabled:opacity-30 hover:text-primary transition-colors">Next</button>
              </div>
            )}
          </div>
        </div>

        {/* Add/Edit Product Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={closeModal}></div>
            <div className="relative glass-panel w-full max-w-4xl rounded-[40px] shadow-2xl p-10 overflow-y-auto max-h-[90vh] animate-in fade-in zoom-in duration-300">
              <div className="flex justify-between items-center mb-10 border-b border-outline-variant/20 pb-6">
                <h3 className="text-3xl font-headline text-primary">{editingProduct ? "Edit Product" : "New Gift Creation"}</h3>
                <button onClick={closeModal} className="material-symbols-outlined text-outline hover:text-error transition-colors p-2 hover:bg-error/10 rounded-full">close</button>
              </div>
              <form onSubmit={handleSave} className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="space-y-8">
                    <div className="space-y-2">
                      <label htmlFor="product-title" className="text-xs font-bold uppercase tracking-widest text-outline ml-1">Product Title</label>
                      <input id="product-title" type="text" required placeholder="e.g. Handmade Silk Scarf" className="w-full px-6 py-4 bg-surface-container-low border border-outline-variant/30 rounded-2xl focus:ring-1 focus:ring-primary outline-none transition-all text-lg" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="product-price" className="text-xs font-bold uppercase tracking-widest text-outline ml-1">Price (PKR)</label>
                        <input id="product-price" type="number" required placeholder="0.00" className="w-full px-6 py-4 bg-surface-container-low border border-outline-variant/30 rounded-2xl focus:ring-1 focus:ring-primary outline-none transition-all" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="category-select" className="text-xs font-bold uppercase tracking-widest text-outline ml-1">Collection</label>
                        <div className="relative">
                          <select id="category-select" title="Select a category" required className="w-full px-6 py-4 bg-surface-container-low border border-outline-variant/30 rounded-2xl focus:ring-1 focus:ring-primary outline-none transition-all appearance-none pr-12" value={formData.category_id} onChange={(e) => setFormData({...formData, category_id: e.target.value})}>
                            <option value="">Select</option>
                            {categories.map(cat => (
                              <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                          </select>
                          <span className="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-outline">expand_more</span>
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="status-select" className="text-xs font-bold uppercase tracking-widest text-outline ml-1">Status</label>
                        <div className="relative">
                          <select id="status-select" title="Product status" className="w-full px-6 py-4 bg-surface-container-low border border-outline-variant/30 rounded-2xl focus:ring-1 focus:ring-primary outline-none transition-all appearance-none pr-12" value={formData.status} onChange={(e) => setFormData({...formData, status: e.target.value})}>
                            <option value="Live">Live</option>
                            <option value="Inactive">Inactive</option>
                          </select>
                          <span className="material-symbols-outlined absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-outline">expand_more</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="product-description" className="text-xs font-bold uppercase tracking-widest text-outline ml-1">Description</label>
                      <textarea id="product-description" rows={5} placeholder="Describe the product details, materials, and care instructions..." className="w-full px-6 py-4 bg-surface-container-low border border-outline-variant/30 rounded-2xl focus:ring-1 focus:ring-primary outline-none transition-all resize-none italic" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})}></textarea>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-outline-variant/30 rounded-3xl p-12 flex flex-col items-center justify-center space-y-4 hover:border-primary transition-all bg-surface-container-low/30 cursor-pointer group h-[200px]">
                      <span className="material-symbols-outlined text-outline group-hover:text-primary transition-all text-4xl">add_photo_alternate</span>
                      <p className="text-xs text-outline font-bold uppercase tracking-widest">Add Photos</p>
                      <input type="file" multiple hidden ref={fileInputRef} accept="image/*" onChange={handleFileChange} />
                    </div>
                    <div className="grid grid-cols-3 gap-4 overflow-y-auto max-h-[300px] p-2">
                      {previews.map((preview, index) => (
                        <div key={index} className="relative aspect-square rounded-2xl overflow-hidden border border-outline-variant/30 shadow-sm">
                          <img src={preview} alt="" className="w-full h-full object-cover" />
                          <button type="button" onClick={() => removeFile(index)} className="absolute top-2 right-2 bg-error text-white w-6 h-6 rounded-full flex items-center justify-center"><span className="material-symbols-outlined text-xs">close</span></button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex gap-6 pt-6 border-t border-outline-variant/20">
                  <button type="button" onClick={closeModal} className="flex-1 py-5 rounded-2xl border border-outline-variant text-outline font-bold uppercase tracking-widest hover:bg-surface-container-low transition-all">Cancel</button>
                  <button type="submit" disabled={formLoading} className="flex-[2] bg-primary text-on-primary py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-primary/90 transition-all shadow-2xl disabled:opacity-50 flex items-center justify-center gap-3 text-lg">{formLoading ? "PROCESSING..." : "SAVE PRODUCT"}</button>
                </div>
              </form>
            </div>
          </div>
        )}
        {/* Toast Notification */}
        {toast && (
          <div className={`fixed bottom-6 right-6 z-[200] px-6 py-4 rounded-2xl shadow-2xl text-sm font-bold uppercase tracking-widest transition-all animate-in fade-in slide-in-from-bottom-4 ${
            toast.type === 'success' ? 'bg-primary text-on-primary' : 'bg-error text-on-error'
          }`}>
            {toast.message}
          </div>
        )}
      </main>
    </div>
  );
}

export default function AdminDashboard() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-background text-primary italic">Loading Dashboard...</div>}>
      <AdminDashboardContent />
    </Suspense>
  );
}
