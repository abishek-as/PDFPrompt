import { db } from "@/db";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { privateProcedure, publicProcedure, router } from "./trpc";

export const appRouter = router({
    // User Authorization
    authCallback: publicProcedure.query(async () => {
        const { getUser } = getKindeServerSession();
        const user = getUser();
        if (!user.id || !user.email)
            throw new TRPCError({ code: "UNAUTHORIZED" });

        // check if the user is in DB
        const dbUser = await db.user.findFirst({
            where: { id: user.id },
        });

        if (!dbUser) {
            // create user in DB
            await db.user.create({
                data: { id: user.id, email: user.email },
            });
        }

        return { success: true };
    }),

    // Fetch all user files
    getUserFiles: privateProcedure.query(async ({ ctx }) => {
        const { userId } = ctx;

        return await db.file.findMany({
            where: { userId },
        });
    }),

    // Get FileUpload status
    getFileUploadStatus: privateProcedure
        .input(z.object({ fileId: z.string() }))
        .query(async ({ input, ctx }) => {
            const file = await db.file.findFirst({
                where: {
                    id: input.fileId,
                    userId: ctx.userId,
                },
            });

            if (!file) return { status: "PENDING" as const };

            return { status: file.uploadStatus };
        }),

    // Fetch particular file
    getFile: privateProcedure
        .input(z.object({ key: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const { userId } = ctx;

            const file = await db.file.findFirst({
                where: { key: input.key, userId },
            });

            if (!file) throw new TRPCError({ code: "NOT_FOUND" });

            return file;
        }),

    // Delete user files
    deleteFile: privateProcedure
        .input(z.object({ id: z.string() }))
        .mutation(async ({ ctx, input }) => {
            const { userId } = ctx;

            const file = await db.file.findFirst({
                where: { id: input.id, userId },
            });

            if (!file) throw new TRPCError({ code: "NOT_FOUND" });

            await db.file.delete({
                where: { id: input.id },
            });

            return file;
        }),
});

export type AppRouter = typeof appRouter;
