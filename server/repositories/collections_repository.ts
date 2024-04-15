import { PrismaClient } from "@prisma/client";

export class CollectionsRepository {
    private db: PrismaClient
    private static instance: CollectionsRepository
    constructor(db: PrismaClient) {
        this.db = db;
    }

    static getInstance(db?: PrismaClient): CollectionsRepository {
        if (!this.instance) {
            this.instance = new CollectionsRepository(db!!);
        }
        return this.instance;
    }

    async createCollection(userId: number) {
        return this.db.collection.create({
            data: {
                userId: userId
            }
        });
    }

    async getByUserId(userId: number) {
        return this.db.collection.findFirst({
            where: {
                userId: userId
            },
            include: {
                items: true
            }
        });
    }
}
