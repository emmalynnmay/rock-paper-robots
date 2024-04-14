import { Router } from "express";
import { authMiddleware } from "../middleware/authentication";
import { WalletsRepository } from "../repositories/wallets_repository";
import jwt from "jsonwebtoken";

// /wallets/...
export const buildWalletController = (walletsRepository: WalletsRepository) => {
    const router = Router();

    router.post("/", async (req, res) => {
        const wallet = await walletsRepository.createWallet(Number(req.body.userId));
        res.json({ wallet });
    });

    router.get("/", authMiddleware, async (req, res) => {
        try {
            if (req.user) {
                const wallet = await walletsRepository.getByUserId(Number(req.user.id));
                console.log(wallet);
                if (wallet) {
                    res.json({ balance: wallet.amount});
                } else {
                    res.json({ error: 'Wallet not found'});
                }
            }
        } catch (e) {
            res.json({ error: e});
        }
    });

    return router;
}
