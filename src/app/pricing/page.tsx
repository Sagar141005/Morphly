import Pricing from "@/components/Pricing";

export default function PricingPage() {
  return (
    <main className="w-full max-w-7xl mx-auto px-4 py-20">
      {/* Heading */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-2">Choose Your Plan</h1>
        <p className="text-gray-600 text-lg">
          Simple pricing for any stage of your project.
        </p>
      </div>

      {/* Pricing Plans */}
      <Pricing />
    </main>
  );
}
