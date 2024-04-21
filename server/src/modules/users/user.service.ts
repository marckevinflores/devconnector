import { Context } from "../../core/types/core.types";

export const findOne = async (parent: unknown, { id, email}: any, context: Context) => {
     return await context.prisma.user.findFirst({ where: {id} });
}