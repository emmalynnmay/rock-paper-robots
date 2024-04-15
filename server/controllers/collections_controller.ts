import { Router } from "express";
import { authMiddleware } from "../middleware/authentication";
import { CollectionsRepository } from "../repositories/collections_repository";

// /collections/...
export const buildCollectionsController = (collectionsRepository: CollectionsRepository) => {
    const router = Router();

    router.get("/", authMiddleware, async (req, res) => {
        try {
            const collection = await collectionsRepository.getByUserId(Number(req.user?.id));
            console.log(collection);
            res.json({collection});
        } catch (e) {
            res.json({ error: e});
        }
    });

    router.post("/", async (req, res) => {
        const collection = await collectionsRepository.createCollection(Number(req.body.userId));
        res.json({ collection });
    });

    return router;
}
