"use client";

import { motion } from "motion/react";
import { useState } from "react";
import {
  Upload,
  Pencil,
  Save,
  X,
  FileText,
  Mail,
  Calendar,
  Lock,
  ShieldCheck,
  HardDrive,
  Clock,
  Layers,
} from "lucide-react";
import PlanCard from "@/components/dashboard/PlanCard";
import FilesTable from "@/components/dashboard/FilesTable";
import ConfirmModal from "@/components/ConfirmModal";
import { useUserStore } from "@/stores/userStore";
import Loader from "@/components/Loader";
import toast from "react-hot-toast";
import ChangePasswordModal from "@/components/ChangePasswordModal";

interface UserFile {
  id: string;
  name: string;
  type: string;
  size: number;
  url: string | null;
  createdAt: string | Date;
}

interface User {
  name: string | null;
  email: string;
  plan: "FREE" | "PRO" | "PLUS";
  profilePic?: string | null;
  createdAt: string | Date;
  hashedPassword?: string | null;
  files: UserFile[];
  allFiles: UserFile[];
}

export default function ProfileClient({ user }: { user: User }) {
  const { user: storedUser, setUser } = useUserStore();

  const [allFiles, setAllFiles] = useState<UserFile[]>(user.allFiles);
  const [name, setName] = useState(user.name || "");
  const [profilePicFile, setProfilePicFile] = useState<File | null>(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [fileToDelete, setFileToDelete] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [passwordModalOpen, setPasswordModalOpen] = useState(false);

  const files = allFiles.slice(0, 10);

  const handleSave = async () => {
    setSaving(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      if (profilePicFile) formData.append("profilePic", profilePicFile);

      const response = await fetch("/api/user/update", {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) {
        toast.error("Failed to save changes");
        return;
      }

      const updatedUser = await response.json();
      setUser({
        ...storedUser!,
        name: updatedUser.user.name,
        profilePic: updatedUser.user.profilePic,
      });

      setEditing(false);
      setProfilePicFile(null);
      toast.success("Profile updated successfully!");
      window.location.reload();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteClick = (id: string) => {
    setFileToDelete(id);
    setModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!fileToDelete) return;

    try {
      const response = await fetch(`/api/files/${fileToDelete}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        toast.error("Failed to delete file");
        return;
      }

      setAllFiles((prev) => prev.filter((f) => f.id !== fileToDelete));
      toast.success("File deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete file");
    } finally {
      setModalOpen(false);
      setFileToDelete(null);
    }
  };

  if (!user) return <Loader />;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="relative bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-sm overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-r from-blue-50 via-indigo-50 to-white dark:from-neutral-800 dark:via-neutral-900 dark:to-black opacity-80" />

          <div className="relative px-6 pb-8 pt-12 sm:px-10 sm:pt-16">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
              <div className="flex flex-col sm:flex-row items-end sm:items-end gap-6">
                <div className="relative group">
                  <div className="h-28 w-28 sm:h-32 sm:w-32 rounded-full p-1 bg-white dark:bg-neutral-950 shadow-xl ring-1 ring-neutral-200 dark:ring-neutral-800">
                    <div className="h-full w-full rounded-full overflow-hidden bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center relative">
                      {profilePicFile ? (
                        <img
                          src={URL.createObjectURL(profilePicFile)}
                          alt="profile preview"
                          className="w-full h-full object-cover"
                        />
                      ) : user.profilePic ? (
                        <img
                          src={user.profilePic}
                          alt="profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-4xl font-bold text-neutral-400 dark:text-neutral-500">
                          {(user.name || user.email).charAt(0).toUpperCase()}
                        </div>
                      )}

                      <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  <button
                    className="absolute bottom-1 right-1 p-2 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 hover:scale-105 transition-all cursor-pointer z-10"
                    title="Change profile picture"
                  >
                    <Upload className="w-4 h-4" />
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setProfilePicFile(e.target.files[0]);
                          setEditing(true);
                        }
                      }}
                    />
                  </button>
                </div>

                <div className="flex flex-col gap-1 mb-1 w-full sm:w-auto">
                  {editing ? (
                    <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <label className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
                        Display Name
                      </label>
                      <input
                        className="px-4 py-2 rounded-lg bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 text-lg font-medium shadow-sm focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all w-full sm:min-w-[300px]"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your name"
                        autoFocus
                      />
                    </div>
                  ) : (
                    <div className="mb-1">
                      <h1 className="text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
                        {user.name || "User"}
                      </h1>
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-4 text-sm mt-1">
                    <div className="flex items-center gap-1.5 text-neutral-600 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800/50 px-2 py-1 rounded-md">
                      <Mail className="w-3.5 h-3.5" />
                      <span>{user.email}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-neutral-500 dark:text-neutral-500 px-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>
                        Joined{" "}
                        {new Date(user.createdAt).toLocaleDateString(
                          undefined,
                          {
                            year: "numeric",
                            month: "short",
                          }
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-row gap-3 lg:mb-2 text-nowrap">
                {editing ? (
                  <>
                    <button
                      onClick={() => {
                        setEditing(false);
                        setName(user.name || "");
                        setProfilePicFile(null);
                      }}
                      className="px-4 py-2 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-xl text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-all flex items-center gap-2 shadow-sm cursor-pointer"
                    >
                      <X className="w-4 h-4" /> Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20 transition-all flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                    >
                      {saving ? (
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      ) : (
                        <>
                          <Save className="w-4 h-4" /> Save Changes
                        </>
                      )}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setEditing(true)}
                    className="px-4 py-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 rounded-xl text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all flex items-center gap-2 shadow-sm  cursor-pointer"
                  >
                    <Pencil className="w-3.5 h-3.5" /> Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10"
      >
        <PlanCard />

        <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 flex flex-col shadow-sm h-full">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg">
              <HardDrive className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
              Usage & Activity
            </h3>
          </div>

          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">
            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800">
              <span className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center gap-2 mb-1">
                <FileText className="w-3.5 h-3.5" /> Total Files
              </span>
              <span className="text-2xl font-bold text-neutral-900 dark:text-white">
                {allFiles.length}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-100 dark:border-neutral-800">
              <span className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center gap-2 mb-1">
                <ShieldCheck className="w-3.5 h-3.5" /> Storage
              </span>
              <span className="text-2xl font-bold text-neutral-900 dark:text-white">
                {allFiles.length > 0
                  ? `${(
                      allFiles.reduce((acc, f) => acc + f.size, 0) /
                      1024 /
                      1024
                    ).toFixed(1)} MB`
                  : "0 MB"}
              </span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
              <Clock className="w-3.5 h-3.5" />
              <span>Last upload:</span>
              <span className="font-medium text-neutral-700 dark:text-neutral-300">
                {allFiles.length > 0
                  ? new Date(allFiles[0].createdAt).toLocaleDateString(
                      undefined,
                      {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )
                  : "N/A"}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <div className="mb-6 px-1">
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-neutral-400" />
            Recent Files
          </h2>
        </div>

        {files.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-neutral-900 rounded-3xl border border-dashed border-neutral-300 dark:border-neutral-700">
            <div className="p-4 bg-neutral-50 dark:bg-neutral-800 rounded-full mb-4">
              <Upload className="w-8 h-8 text-neutral-400 dark:text-neutral-500" />
            </div>
            <p className="text-lg font-medium text-neutral-900 dark:text-white mb-1">
              No files converted yet
            </p>
            <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-6">
              Your workspace is clean and ready to go.
            </p>
            <a
              href="/image/convert"
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition-all shadow-lg shadow-blue-500/20"
            >
              Start new conversion
            </a>
          </div>
        ) : (
          <FilesTable
            files={files}
            visibleCount={10}
            showLoadMore={false}
            onDelete={handleDeleteClick}
          />
        )}
      </motion.section>

      {user.hashedPassword && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <div className="bg-red-50/50 dark:bg-red-950/10 border border-red-100 dark:border-red-900/30 rounded-3xl p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-white dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl shadow-sm border border-red-100 dark:border-red-900/30">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-1">
                    Password & Security
                  </h3>
                  <p className="text-sm text-neutral-600 dark:text-neutral-400 max-w-md">
                    Manage your password to keep your account secure. We
                    recommend updating it periodically.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setPasswordModalOpen(true)}
                className="whitespace-nowrap px-5 py-2.5 rounded-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-800 hover:text-red-600 dark:hover:text-red-400 font-medium text-sm transition-all shadow-sm"
              >
                Change Password
              </button>
            </div>
          </div>
        </motion.section>
      )}

      <ConfirmModal
        isOpen={modalOpen}
        message="Are you sure you want to delete this file? This action cannot be undone."
        onConfirm={handleConfirmDelete}
        onCancel={() => setModalOpen(false)}
        action="Delete"
      />

      {user.hashedPassword && (
        <ChangePasswordModal
          isOpen={passwordModalOpen}
          onClose={() => setPasswordModalOpen(false)}
        />
      )}
    </>
  );
}
