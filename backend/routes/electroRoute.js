import express from "express";
import { createElectro, deleteElectro, getElectros, updateElectro, getElectroById, } from "../controller/electroController.js";

const router = express.Router();
router.get("/electros", getElectros);
router.get("/electros/:id", getElectroById);
router.post("/create-electros", createElectro);
router.put("/update-electros/:id", updateElectro);
router.delete("/delete-electros/:id", deleteElectro);

export default router;
