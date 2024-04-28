import { PrismaClient } from "@prisma/client";

interface PurchaseResult {
    id?: number; // These properties should match the actual return type of db.wallet.update
    userId?: number;
    amount?: number;
    createdAt?: Date;
    updatedAt?: Date;
    error?: string; // Add the error property
}

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
        return this.db.item.findMany({include: { collections: true }});
    }

    async buy(userId: number, itemId: number) {

        const collection = await this.db.collection.findUnique({
            where: { userId: userId },
            include: { items: true }, // Include items in the query
        });

        const item = await this.db.item.findUnique({
            where: { id: itemId },
        });

        console.log(item?.price);

        const purchase = await this.deductCost(userId, Number(item?.price));
        console.log(purchase);
        if (purchase.error === "Insufficient Funds!") {
            return {error: "Insufficient Funds!"};
        }

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

        //console.log('Item added to collection:', updatedCollection);

        return updatedCollection;
    }

    async deductCost(userId: number, price: number): Promise<PurchaseResult> {
        console.log(`Charging ${price} for purchase`);
        const wallet = await this.getByUserId(userId);
        if (wallet) {
            const currentAmount = wallet.amount;

            if (currentAmount < price) {
                return {error: "Insufficient Funds!"};
            }

            return this.db.wallet.update({
                where: {
                    userId: userId
                },
                data: {
                    amount: currentAmount - price
                }
            });
        }
        return {error: "Purchase failed"};
    }

    async getByUserId(userId: number) {
        return this.db.wallet.findFirst({
            where: {
                userId: userId
            },
        });
    }
}
