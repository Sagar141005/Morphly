import { Github, Linkedin, Twitter } from "lucide-react";
import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-50 to-white border-t border-gray-200 text-sm text-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Branding */}
          <div>
            <Link
              href="/"
              className="flex items-center text-lg font-bold text-blue-600 tracking-tight hover:scale-[1.01] hover:brightness-110 transition-all"
            >
              <img src="/M.png" alt="Morphly Logo" className="h-6 w-6 mb-1" />
              orphly
            </Link>
            <p className="text-xs text-gray-400 font-medium">
              Smart conversions. Limitless possibilities.
            </p>

            <p className="mt-4 text-gray-500 leading-relaxed max-w-xs">
              Morphly helps you build smarter, faster, and more powerful digital
              products with beautiful UI and robust tools.
            </p>

            {/* Socials */}
            <div className="flex space-x-4 mt-5 text-gray-400">
              <Link
                href="https://github.com/morphly"
                aria-label="GitHub"
                className="hover:text-black transition-colors"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="https://linkedin.com/company/morphly"
                aria-label="LinkedIn"
                className="hover:text-blue-600 transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link
                href="https://twitter.com/morphly"
                aria-label="LinkedIn"
                className="hover:text-blue-400 transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col sm:flex-row sm:justify-between lg:justify-start lg:gap-16">
            <div>
              <h3 className="text-gray-800 font-semibold mb-2">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#features"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            <div className="mt-6 sm:mt-0">
              <h3 className="text-gray-800 font-semibold mb-2">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-blue-600 transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-blue-600 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* CTA / Newsletter / Contact */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-2">Stay Updated</h3>
            <p className="text-gray-500 mb-4 max-w-sm">
              Join our mailing list for updates, tutorials, and more.
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
              />
              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-shadow shadow-sm hover:shadow-md"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <hr className="mt-12 border-gray-200" />

        {/* Bottom Bar */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-400">
          <p>© {new Date().getFullYear()} Morphly. All rights reserved.</p>
          <div className="flex space-x-4 mt-2 sm:mt-0">
            <Link href="/terms" className="hover:text-blue-600">
              Terms & Conditions
            </Link>
            <span>·</span>
            <Link href="/privacy" className="hover:text-blue-600">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
