import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-900/60 dark:to-neutral-900/60 border-t border-neutral-200 dark:border-neutral-700 text-sm text-neutral-600 dark:text-neutral-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <div>
            <Link
              href="/"
              className="flex items-center text-lg font-bold text-blue-600 tracking-tight hover:scale-[1.01] hover:brightness-110 transition-all"
            >
              <img src="/M.png" alt="Morphly Logo" className="h-6 w-6 mb-1" />
              orphly
            </Link>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 font-medium">
              Smart conversions. Limitless possibilities.
            </p>

            <p className="mt-4 text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-xs">
              Morphly helps you build smarter, faster, and more powerful digital
              products with beautiful UI and robust tools.
            </p>

            <div className="flex space-x-4 mt-5 text-neutral-400 dark:text-neutral-500">
              <Link
                href="https://github.com/Sagar141005/Morphly"
                aria-label="GitHub"
                className="hover:text-black dark:hover:text-white transition-colors"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.linkedin.com/in/sagar-saini-9b45a52b2/"
                aria-label="LinkedIn"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="https://x.com/not_sagar1410"
                aria-label="Twitter"
                className="hover:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between lg:justify-start lg:gap-16">
            <div>
              <h3 className="text-neutral-800 dark:text-neutral-200 font-semibold mb-2">
                Product
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/image/convert"
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Image Convert
                  </Link>
                </li>
                <li>
                  <Link
                    href="/image/removebg"
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    AI BG Removal
                  </Link>
                </li>
                <li>
                  <Link
                    href="/file/convert"
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    File Convert
                  </Link>
                </li>
                <li>
                  <Link
                    href="/file/merge"
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    File Merge
                  </Link>
                </li>
                <li>
                  <Link
                    href="/file/split"
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    File Split
                  </Link>
                </li>
              </ul>
            </div>

            <div className="mt-6 sm:mt-0">
              <h3 className="text-neutral-800 dark:text-neutral-200 font-semibold mb-2">
                Company
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-neutral-800 dark:text-neutral-200 font-semibold mb-2">
              Stay Updated
            </h3>
            <p className="text-neutral-500 dark:text-neutral-400 mb-4 max-w-sm">
              Join our mailing list for updates, tutorials, and more.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 rounded-xl border border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-700 text-neutral-900 dark:text-neutral-200 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium transition-shadow shadow-sm hover:shadow-md cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <hr className="mt-12 border-neutral-200 dark:border-neutral-700" />

        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-neutral-400 dark:text-neutral-500">
          <p>© {new Date().getFullYear()} Morphly. All rights reserved.</p>
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <Link
              href="/terms"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Terms & Conditions
            </Link>
            <span>·</span>
            <Link
              href="/privacy"
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
