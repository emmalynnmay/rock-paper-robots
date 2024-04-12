import { Router } from "express";
import { authMiddleware } from "../middleware/authentication";
import { WalletsRepository } from "../repositories/wallets_repository";

// /wallets/...
export const buildWalletController = (walletsRepository: WalletsRepository) => {
    const router = Router();

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

