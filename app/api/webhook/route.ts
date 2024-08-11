import Stripe from "stripe";
import { NextResponse, NextRequest } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest, res: NextResponse) {
  const payload = await req.text();

  const response = JSON.parse(payload);

  // const sign = req.headers.get("Stripe-Signature")
  const sign = req.headers.get("HTTP_STRIPE_SIGNATURE");

  const dateTime = new Date(response?.created * 1000).toLocaleDateString();
  const timeStr = new Date(response?.created * 1000).toLocaleDateString();

  try {
    let event = stripe.webhooks.constructEvent(
      payload,
      sign!,
      process.env.STRIPE_WEBHOOK_SECRET!
    );

    console.log("event", event.type);
    console.log("payload", payload);
    return NextResponse.json({ status: "Success!", event: event.type });
  } catch (error) {
    return NextResponse.json({ status: "Failed!", error });
  }
}
