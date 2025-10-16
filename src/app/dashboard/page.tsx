import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

function formatFileSize(size: number) {
  return size > 1024 * 1024
    ? `${(size / (1024 * 1024)).toFixed(2)} MB`
    : `${(size / 1024).toFixed(2)} KB`;
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user.email) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { files: true },
  });

  if (!user || user.plan !== "PRO") {
    redirect("/pricing");
  }

  const files = await prisma.file.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Processed Files</h1>

      {files.length === 0 ? (
        <p className="text-gray-600">
          No files found. Start converting or uploading!
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-h-full bg-white border rounded shadow-sm text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="px-4 py-2">File Name</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Size</th>
                <th className="px-4 py-2">Uploaded At</th>
                <th className="px-4 py-2">Download</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file.id} className="border-t">
                  <td className="px-4 py-2">{file.name}</td>
                  <td className="px-4 py-2">{file.type}</td>
                  <td className="px-4 py-2">{formatFileSize(file.size)}</td>
                  <td className="px-4 py-2">
                    {new Date(file.createdAt).toLocaleString()}
                  </td>
                  <td className="px-4 py-2">
                    {file.url ? (
                      <Link
                        href={file.url}
                        target="_blank"
                        className="text-blue-600 underline"
                      >
                        Download
                      </Link>
                    ) : (
                      <span className="text-gray-400">No URL</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
