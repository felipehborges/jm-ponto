"use server";
import { prisma } from "../../../lib/prisma";
export async function getDayOffs() {
    return prisma.holiday.findMany();
}