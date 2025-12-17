import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

type Plan = "FREE" | "PLUS" | "PRO";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

const PRICE_ID_TO_PLAN: Record<string, string> = {
  [process.env.STRIPE_PLUS_MONTHLY_PRICE_ID!]: "PLUS",
  [process.env.STRIPE_PLUS_YEARLY_PRICE_ID!]: "PLUS",
  [process.env.STRIPE_PRO_MONTHLY_PRICE_ID!]: "PRO",
  [process.env.STRIPE_PRO_YEARLY_PRICE_ID!]: "PRO",
};

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature") as string;
  const rawBody = await req.text();

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("⚠️ Webhook signature verification failed.", err);
    return new NextResponse("Webhook Error", { status: 400 });
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object as Stripe.Checkout.Session;

      const userId = session.metadata?.userId;
      const customerId = session.customer as string;
      const subscriptionId = session.subscription as string;

      if (!userId || !customerId || !subscriptionId) {
        console.error("Missing metadata or customer info in checkout session");
        return new NextResponse("Bad request", { status: 400 });
      }

      try {
        const subscription = (await stripe.subscriptions.retrieve(
          subscriptionId
        )) as Stripe.Subscription;

        const priceId = subscription.items.data[0]?.price.id;
        const plan: Plan = (PRICE_ID_TO_PLAN[priceId!] as Plan) || "FREE";

        const frequency = subscription.items.data[0]?.price.recurring?.interval;

        let basicCredits = 0;
        let aiCredits = 0;

        switch (plan) {
          case "FREE":
            basicCredits = 5;
            aiCredits = 0;
            break;
          case "PLUS":
            basicCredits = 25;
            aiCredits = 10;
            break;
          case "PRO":
            basicCredits = Infinity;
            aiCredits = 100;
            break;
        }

        await prisma.user.update({
          where: { id: userId },
          data: {
            plan,
            basicCredits,
            aiCredits,
            creditsResetAt: new Date(),
            stripeCustomerId: customerId,
            stripeSubscriptionId: subscription.id,
            stripePriceId: priceId,
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          },
        });

        console.log(`✅ Upgraded user ${userId} to ${plan} (${frequency})`);
      } catch (err) {
        console.error("Failed to upgrade user", err);
        return new NextResponse("Internal Error", { status: 500 });
      }

      break;
    }

    case "invoice.payment_failed": {
      const invoice = event.data.object as Stripe.Invoice;
      const customerId = invoice.customer as string;

      try {
        await prisma.user.updateMany({
          where: { stripeCustomerId: customerId },
          data: {
            plan: "FREE",
            basicCredits: 5,
            aiCredits: 0,
            creditsResetAt: new Date(),
          },
        });

        console.log(`🔁 Downgraded user (customerId=${customerId}) to FREE`);
      } catch (err) {
        console.error("Failed to downgrade user", err);
      }

      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return new NextResponse("OK", { status: 200 });
}
