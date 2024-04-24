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

        const collection = await this.db.collection.findUnique({
            where: { userId: userId },
            include: { items: true }, // Include items in the query
        });

        const item = await this.db.item.findUnique({
            where: { id: itemId },
        });

        if (!collection || !item) {
            throw new Error('Collection or Item not found');
        }

        // Add the item to the collection's items array
        collection.items.push(item);

        // Save the updated collection back to the database
        const updatedCollection = await this.db.collection.update({
            where: { userId: userId },
            data: { items: { connect: { id: itemId } } }, // Connect the item to the collection
        });

        console.log('Item added to collection:', updatedCollection);

        return updatedCollection;

        /*return this.db.collection.update({
            where: {
                userId: userId
            },
            data: {
                items: {
                    id: itemId
                }
            },
            include: {
                items: true,
            },
        });*/
    }
}
