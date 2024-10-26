import { ENTITY_TYPE } from "@prisma/client";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function GET(
    req: Request,
    { params }: { params: { cardId: string } }
) {

    try {
        const { orgId, userId } = auth()

        if (!orgId || !userId) {
            throw new NextResponse("Unauthorized", { status: 401 })
        }

        const auditLog = await db.auditLog.findMany({
            where: {
                orgId,
                entityId: params.cardId,
                entityType: ENTITY_TYPE.CARD,
            },
            orderBy: {
                createdAt: "desc"
            },
            take: 3
        })


        return NextResponse.json(auditLog)
    } catch (error) {
        throw new NextResponse("Internal server error", { status: 500 })
    }
}