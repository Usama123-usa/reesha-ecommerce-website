"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/admin/Sidebar";
import Header from "@/components/admin/Header";
import { supabase } from "@/lib/supabaseClient";

export default function Settings() {
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState({ type: "", text: "" });
  
  // Password change state
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passLoading, setPassLoading] = useState(false);

  useEffect(() => {
    async function getProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUser(user);
        setEmail(user.email || "");
      }
      setLoading(false);
    }
    getProfile();
  }, []);

  const handleUpdateEmail = async () => {
    setMessage({ type: "", text: "" });
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ email });
      if (error) throw error;
      setMessage({ type: "success", text: "Confirmation email sent to both addresses!" });
    } catch (error: any) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "New passwords do not match." });
      return;
    }

    setPassLoading(true);
    try {
      // Re-authenticate to verify current password
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword,
      });

      if (signInError) {
        setMessage({ type: "error", text: "Current password is incorrect." });
        return;
      }

      const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });
      if (updateError) throw updateError;

      setMessage({ type: "success", text: "Password updated successfully!" });
      setShowPasswordForm(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error: any) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setPassLoading(false);
    }
  };

  return (
    <div className="flex bg-surface text-on-background font-body min-h-screen overflow-hidden">
      <Sidebar />
      <div className="w-64 shrink-0 hidden md:block" />
      <main className="flex-1 overflow-y-auto relative bg-background">
        <Header />
        <div className="p-margin-desktop max-w-3xl mx-auto space-y-gutter pb-24">
          
          {message.text && (
            <div className={`p-4 rounded-xl text-sm font-bold text-center animate-in fade-in slide-in-from-top-4 duration-300 ${
              message.type === "success" ? "bg-success/10 text-success border border-success/20" : "bg-error/10 text-error border border-error/20"
            }`}>
              {message.text}
            </div>
          )}

          <div className="glass-panel p-8 rounded-3xl custom-shadow space-y-10">
            <div>
              <h3 className="text-2xl font-headline text-on-surface mb-2">Studio Configuration</h3>
              <p className="text-sm text-outline italic">Manage your store details and administrative preferences.</p>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label htmlFor="store-name" className="text-xs font-bold uppercase tracking-widest text-outline ml-1">Store Name</label>
                  <input
                    id="store-name"
                    type="text"
                    defaultValue="Reesha Personalized Gifting"
                    className="w-full px-5 py-4 bg-surface-container-low border border-outline-variant/30 rounded-2xl outline-none focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="support-email" className="text-xs font-bold uppercase tracking-widest text-outline ml-1">Support Email</label>
                  <input
                    id="support-email"
                    type="email"
                    defaultValue="support@reesha.com"
                    className="w-full px-5 py-4 bg-surface-container-low border border-outline-variant/30 rounded-2xl outline-none focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
              </div>

              <div className="pt-8 border-t border-outline-variant/20">
                <h4 className="text-sm font-bold uppercase tracking-widest text-primary mb-6">Admin Account</h4>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="login-email" className="text-xs font-bold uppercase tracking-widest text-outline ml-1">Login Email</label>
                    <div className="flex gap-4">
                      <input
                        id="login-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 px-5 py-4 bg-surface-container-low border border-outline-variant/30 rounded-2xl outline-none focus:ring-1 focus:ring-primary transition-all font-bold"
                      />
                      <button 
                        onClick={handleUpdateEmail}
                        disabled={loading || email === user?.email}
                        className="px-6 bg-surface-container-high text-on-surface text-xs font-bold uppercase tracking-widest rounded-2xl hover:bg-primary hover:text-on-primary transition-all disabled:opacity-50"
                      >
                        {loading ? "..." : "Update"}
                      </button>
                    </div>
                  </div>

                  <div className="p-6 bg-surface-container-low/50 rounded-2xl border border-outline-variant/10">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-bold text-on-surface">Password</p>
                        <p className="text-xs text-outline italic">••••••••••••</p>
                      </div>
                      <button 
                        onClick={() => setShowPasswordForm(!showPasswordForm)}
                        className="text-primary text-xs font-bold uppercase tracking-widest hover:underline px-4 py-2"
                      >
                        {showPasswordForm ? "Cancel" : "Change Password"}
                      </button>
                    </div>

                    {showPasswordForm && (
                      <form onSubmit={handleChangePassword} className="mt-8 space-y-4 pt-6 border-t border-outline-variant/10 animate-in fade-in slide-in-from-top-2">
                        <div className="space-y-2">
                          <label htmlFor="current-password" title="Current Password" className="text-[10px] font-bold uppercase tracking-widest text-outline ml-1">Current Password</label>
                          <input
                            id="current-password"
                            type="password"
                            required
                            placeholder="••••••••"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-background border border-outline-variant/30 rounded-xl outline-none focus:ring-1 focus:ring-primary text-sm"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label htmlFor="new-password" title="New Password" className="text-[10px] font-bold uppercase tracking-widest text-outline ml-1">New Password</label>
                            <input
                              id="new-password"
                              type="password"
                              required
                              placeholder="••••••••"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                              className="w-full px-4 py-3 bg-background border border-outline-variant/30 rounded-xl outline-none focus:ring-1 focus:ring-primary text-sm"
                            />
                          </div>
                          <div className="space-y-2">
                            <label htmlFor="confirm-password" title="Confirm New Password" className="text-[10px] font-bold uppercase tracking-widest text-outline ml-1">Confirm New Password</label>
                            <input
                              id="confirm-password"
                              type="password"
                              required
                              placeholder="••••••••"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                              className="w-full px-4 py-3 bg-background border border-outline-variant/30 rounded-xl outline-none focus:ring-1 focus:ring-primary text-sm"
                            />
                          </div>
                        </div>
                        <button 
                          type="submit"
                          disabled={passLoading}
                          className="w-full bg-primary text-on-primary py-3 rounded-xl font-bold uppercase tracking-widest hover:bg-primary/90 transition-all text-xs mt-2 disabled:opacity-50"
                        >
                          {passLoading ? "UPDATING..." : "CONFIRM PASSWORD CHANGE"}
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>

              <button className="w-full bg-surface-container-high text-on-surface py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-primary hover:text-on-primary transition-all custom-shadow text-xs">
                SAVE ALL STORE SETTINGS
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
