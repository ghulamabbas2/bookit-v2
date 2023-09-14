import dbConnect from "@/backend/config/dbConnect";
import { uploadRoomImages } from "@/backend/controllers/roomControllers";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "@/backend/middlewares/auth";
import { createEdgeRouter } from "next-connect";
import { NextRequest } from "next/server";

interface RequestContext {
  params: {
    id: string;
  };
}

const router = createEdgeRouter<NextRequest, RequestContext>();

dbConnect();

router.use(isAuthenticatedUser, authorizeRoles("admin")).put(uploadRoomImages);

export async function PUT(request: NextRequest, ctx: RequestContext) {
  return router.run(request, ctx);
}
