import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

type PlanId = "plus" | "pro";
type Frequency = "monthly" | "yearly";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

const STRIPE_PRICE_IDS: Record<PlanId, Record<Frequency, string>> = {
  plus: {
    monthly: process.env.STRIPE_PLUS_MONTHLY_PRICE_ID!,
    yearly: process.env.STRIPE_PLUS_YEARLY_PRICE_ID!,
  },
  pro: {
    monthly: process.env.STRIPE_PRO_MONTHLY_PRICE_ID!,
    yearly: process.env.STRIPE_PRO_YEARLY_PRICE_ID!,
  },
};

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return new NextResponse("User not found", { status: 404 });
  }

  let stripeCustomerId = user.stripeCustomerId;
  if (!stripeCustomerId) {
    const customer = await stripe.customers.create({ email: user.email });
    stripeCustomerId = customer.id;
    await prisma.user.update({
      where: { id: user.id },
      data: { stripeCustomerId },
    });
  }

  try {
    const body: { planId: PlanId; frequency: Frequency } = await req.json();
    const { planId, frequency } = body;

    if (!STRIPE_PRICE_IDS[planId]?.[frequency]) {
      return new NextResponse("Invalid plan or frequency", { status: 400 });
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer: stripeCustomerId,
      line_items: [{ price: STRIPE_PRICE_IDS[planId][frequency], quantity: 1 }],
      success_url: `${process.env.NEXTAUTH_URL}/dashboard?checkout=success`,
      cancel_url: `${process.env.NEXTAUTH_URL}/pricing?checkout=cancelled`,
      metadata: { userId: user.id },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error: any) {
    console.error("Stripe Checkout Error:", error.message);
    return NextResponse.json({ error: "Stripe error" }, { status: 500 });
  }
}
