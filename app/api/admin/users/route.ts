import dbConnect from "@/backend/config/dbConnect";
import { allAdminUsers } from "@/backend/controllers/authControllers";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "@/backend/middlewares/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthenticatedUser, authorizeRoles("admin")).get(allAdminUsers);

export async function GET(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
