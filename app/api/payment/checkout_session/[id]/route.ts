import dbConnect from "@/backend/config/dbConnect";
import { stripeCheckoutSession } from "@/backend/controllers/paymentControllers";
import { isAuthenticatedUser } from "@/backend/middlewares/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthenticatedUser).get(stripeCheckoutSession);

export async function GET(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
