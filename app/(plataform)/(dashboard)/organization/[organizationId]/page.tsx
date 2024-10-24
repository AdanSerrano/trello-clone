import { BoardList } from "./_components/BoardList";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { Info } from "./_components/Info";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { Suspense } from "react";
import { db } from "@/lib/db";

export default async function OrganizationIdPage() {
    const boards = await db.board.findMany()
    return (
        <div className='w-full mb-20'>
            <Info />
            <Separator className="my-4" />
            <div className="px-2 md:px-4">
                <Suspense fallback={BoardList.Skeleton()}>
                    <BoardList />
                </Suspense>
            </div>
        </div >
    )
}
