import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import {CreateUserPayload} from "./users_respository";

export type CreateWalletPayload = {
    userId: Number,
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

    async createWallet(userId: number) {
        return this.db.wallet.create({
            data: {
                userId: userId,
                amount: 0
            }
        });
    }

    async getByUserId(userId: number) {
        return this.db.wallet.findFirst({
            where: {
                userId: userId
            },
        });
    }

    async incrementAmount(userId: number) {
        console.log("Increment");
        const wallet = await this.getByUserId(userId);
        if (wallet) {
            const currentAmount = wallet.amount;

            return this.db.wallet.update({
                where: {
                    userId: userId
                },
                data: {
                    amount: currentAmount + 1
                }
            });
        }
        return {error: "Increment failed"};
    }
}
