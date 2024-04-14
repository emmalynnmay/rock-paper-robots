import { Router } from "express";
import {authMiddleware} from "../middleware/authentication";
import { WalletsRepository } from "../repositories/wallets_repository";

const CHOICES = ["Rock", "Paper", "Scissors"];

// /play/...
export const buildPlayController = (walletsRepository: WalletsRepository) => {
    const router = Router();
    router.post("/", authMiddleware, async (req, res) => {
        console.log(req.body);
        const robotChoice = CHOICES[Math.floor(Math.random() * (CHOICES.length))];
        const yourChoice = req.body.action;
        let result;

        if (robotChoice === yourChoice) {
            result = "Tie!";
        } else if (robotChoice === "Rock") {
            if (yourChoice === "Paper") {
                result = "You win!!";
            } else {
                result = "You lose...";
            }
        } else if (robotChoice === "Paper") {
            if (yourChoice === "Scissors") {
                result = "You win!!";
            } else {
                result = "You lose...";
            }
        } else {
            if (yourChoice === "Rock") {
                result = "You win!!";
            } else {
                result = "You lose...";
            }
        }

        if (result === "You win!!" && req.user) {
            await walletsRepository.incrementAmount(Number(req.user.id));
        }

        res.json({ result: result, yourChoice: yourChoice, robotChoice: robotChoice });
    });

    return router;
}