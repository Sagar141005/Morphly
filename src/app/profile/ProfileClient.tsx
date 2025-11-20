"use client";

import { motion } from "framer-motion";
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
  Download,
} from "lucide-react";
import PlanCard from "@/components/dashboard/PlanCard";
import FilesTable from "@/components/dashboard/FilesTable";
import { useSession } from "next-auth/react";

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
  const [files, setFiles] = useState<UserFile[]>(user.files);
  const [allFiles, setAllFiles] = useState<UserFile[]>(user.allFiles);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(user.name || "");
  const [profilePicFile, setProfilePicFile] = useState<File | null>(null);

  const { data: session, update } = useSession();

  const handleSave = async () => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      if (profilePicFile) formData.append("profilePic", profilePicFile);

      const response = await fetch("/api/user/update", {
        method: "PUT",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to save changes");

      const updatedUser = await response.json();
      await update({
        ...session,
        user: updatedUser.user,
      });

      setEditing(false);
      setProfilePicFile(null);
      console.log("User updated:", updatedUser);
    } catch (err) {
      console.error(err);
      alert("Failed to save changes. Please try again.");
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this file?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/files/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete file");

      setAllFiles((prev) => prev.filter((f) => f.id !== id));
      setFiles((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete file");
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <div className="bg-white/60 dark:bg-neutral-900/50 backdrop-blur-xl border border-neutral-200/70 dark:border-neutral-800 rounded-2xl shadow-lg transition-all duration-300 p-6 sm:p-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8">
            <div className="flex flex-col sm:flex-row items-start gap-6">
              <div className="relative group">
                <div className="h-24 w-24 sm:h-28 sm:w-28 rounded-full overflow-hidden shadow-md border border-neutral-200/70 dark:border-neutral-800 bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center">
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
                    <div className="text-4xl sm:text-5xl font-bold text-neutral-700 dark:text-neutral-300">
                      {(user.name || user.email).charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>

                <button
                  className="absolute bottom-1.5 right-1.5 p-1.5 rounded-full bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:scale-110 transition-all opacity-0 group-hover:opacity-100"
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

              <div className="flex flex-col justify-center">
                {editing ? (
                  <input
                    className="px-3 py-1.5 rounded-xl bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 text-lg sm:text-xl font-medium shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                  />
                ) : (
                  <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 dark:text-white tracking-tight">
                    {user.name || "User"}
                  </h1>
                )}

                <div className="mt-3 space-y-2">
                  <div className="flex items-center gap-2 text-neutral-600 dark:text-neutral-300 text-sm">
                    <Mail className="w-4 h-4" />
                    <span>{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 text-sm">
                    <Calendar className="w-4 h-4" />
                    <span>
                      Member since{" "}
                      {new Date(user.createdAt).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row gap-2 lg:self-start items-center">
              {editing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition flex items-center gap-1"
                  >
                    <Save className="w-4 h-4" /> Save
                  </button>
                  <button
                    onClick={() => {
                      setEditing(false);
                      setName(user.name || "");
                      setProfilePicFile(null);
                    }}
                    className="px-3 py-1.5 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-lg text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition flex items-center gap-1"
                  >
                    <X className="w-4 h-4" /> Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditing(true)}
                  className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition flex items-center gap-1 shadow-sm hover:shadow-md duration-200"
                >
                  <Pencil className="w-4 h-4" /> Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12"
      >
        <PlanCard plan={user.plan} />

        <div className="bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-6">
          <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-4">
            Your Activity
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600 dark:text-neutral-400 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Total Files
              </span>
              <span className="text-2xl font-bold text-neutral-900 dark:text-white">
                {allFiles.length}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-600 dark:text-neutral-400 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Total Storage
              </span>
              <span className="text-lg font-semibold text-neutral-900 dark:text-white">
                {allFiles.length > 0
                  ? `${(
                      allFiles.reduce((acc, f) => acc + f.size, 0) /
                      1024 /
                      1024
                    ).toFixed(2)} MB`
                  : "0 MB"}
              </span>
            </div>

            <div className="pt-3 border-t border-neutral-200 dark:border-neutral-700">
              <div className="flex items-center justify-between text-xs">
                <span className="text-neutral-500 dark:text-neutral-400">
                  Last Upload
                </span>
                <span className="font-medium text-neutral-700 dark:text-neutral-300">
                  {allFiles.length > 0
                    ? new Date(allFiles[0].createdAt).toLocaleDateString(
                        undefined,
                        { month: "short", day: "numeric", year: "numeric" }
                      )
                    : "No uploads yet"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-12"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
            Recent Files
          </h2>
          {files.length > 0 && (
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              Showing {Math.min(10, files.length)} of {allFiles.length}
            </span>
          )}
        </div>

        {files.length === 0 ? (
          <div className="text-center py-16 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-xl rounded-2xl border border-neutral-200 dark:border-neutral-700 shadow-md">
            <FileText className="w-12 h-12 mx-auto mb-4 text-neutral-400 dark:text-neutral-500" />
            <p className="text-base text-neutral-600 dark:text-neutral-300 mb-2 font-medium">
              No files yet — your workspace is clear!
            </p>
            <a
              href="/"
              className="inline-block mt-2 text-blue-600 dark:text-blue-400 font-medium hover:underline text-sm"
            >
              Start your first conversion →
            </a>
          </div>
        ) : (
          <FilesTable
            files={files}
            visibleCount={10}
            showLoadMore={false}
            onDelete={handleDelete}
          />
        )}
      </motion.section>

      {user.hashedPassword && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-6">
            Security
          </h2>
          <div className="bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md border border-neutral-200 dark:border-neutral-700 rounded-2xl shadow-md p-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg">
                <Lock className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-1">
                  Password
                </h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-4">
                  Keep your account secure by updating your password regularly
                </p>
                <button className="px-5 py-2.5 rounded-lg bg-neutral-200 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-300 dark:hover:bg-neutral-700 font-medium text-sm transition-colors shadow-sm">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </motion.section>
      )}
    </>
  );
}
