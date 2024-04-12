import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

export type CreateWalletPayload = {
    userId: Number,
    amount: Number,
}

export class WalletsRepository {
    private db: PrismaClient
    private static instance: WalletsRepository
    constructor(db: PrismaClient) {
        this.db = db;
    }

    static getInstance(db?: PrismaClient): WalletsRepository {
        if (!this.instance) {
            this.instance = new WalletsRepository(db!!);
        }
        return this.instance;
    }

    async getByUserId(userId: number) {
        return this.db.wallet.findFirst({
            where: {
                userId: userId
            },
        });
    }

    async incrementAmount(userId: number) {
        //TODO: implement
    }
}
