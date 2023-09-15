import dbConnect from "@/backend/config/dbConnect";
import { allAdminBookings } from "@/backend/controllers/bookingControllers";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "@/backend/middlewares/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthenticatedUser, authorizeRoles("admin")).get(allAdminBookings);

export async function GET(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
