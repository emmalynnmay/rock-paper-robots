import { Router } from "express";
import { authMiddleware } from "../middleware/authentication";
import { ItemsRepository } from "../repositories/items_repository";

// /items/...
export const buildItemsController = (itemsRepository: ItemsRepository) => {
    const router = Router();

    router.get("/", authMiddleware, async (req, res) => {
        try {
            const items = await itemsRepository.getAll();
            console.log(items);
            res.json({items});
        } catch (e) {
            res.json({ error: e});
        }
    });

    router.post("/", authMiddleware, async (req, res) => {
        try {
            const purchase = await itemsRepository.buy(Number(req.user?.id), req.body.id);
            console.log(purchase);
            res.json({purchase});
        } catch (e) {
            res.json({ error: e});
        }
    });

    return router;
}
