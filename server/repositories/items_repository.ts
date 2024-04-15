import { PrismaClient } from "@prisma/client";

export class ItemsRepository {
    private db: PrismaClient
    private static instance: ItemsRepository
    constructor(db: PrismaClient) {
        this.db = db;
    }

    static getInstance(db?: PrismaClient): ItemsRepository {
        if (!this.instance) {
            this.instance = new ItemsRepository(db!!);
        }
        return this.instance;
    }

    async getAll() {
        return this.db.item.findMany();
    }

    async buy(userId: number, itemId: number) {
        //TODO: implement
    }
}
