import { Request, Response } from "express";
import { postTestService, getTestsByDisciplines, getTestsByTeachers, noQueryService } from "../services/testService.js";

export async function postTest(req:Request, res: Response) {
    const body = req.body;

    await postTestService(body);

    res.sendStatus(201);
};

export async function getTests(req:Request, res: Response) {
    const { groupBy } = req.query;

    if (groupBy === "disciplines") {

        const testsByDiscipline = await getTestsByDisciplines();
        return res.status(200).send(testsByDiscipline);

    } else if (groupBy === "teachers") {

        const testsByTeachers = await getTestsByTeachers();
        return res.status(200).send(testsByTeachers);

    } else {

        await noQueryService();
    };
};

