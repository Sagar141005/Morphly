import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Pricing from "@/components/Pricing";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-blue-50/40 to-white">
      <Navbar />
      <section className="w-full max-w-6xl mx-auto px-6 py-24">
        {/* Header */}
        <div className="mb-14 text-center">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Choose Your Plan
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Simple, transparent pricing to power your Morphly conversions. Scale
            your workflow at your own pace.
          </p>
        </div>

        {/* Pricing Cards */}
        <Pricing />
      </section>

      {/* Decorative background accent */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-blue-300/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 blur-[140px] rounded-full" />
      </div>
      <Footer />
    </main>
  );
}
