import { Tests } from "@prisma/client";
import prisma from "../config/database.js";

export type Test = Omit<Tests, "id">;

export async function findByCategoryId(id: number) {
    const category = await prisma.categories.findFirst({
        where: {
            id
        }
    });
    return category;
}

export async function findByTeacherDisciplineId(id:number) {
    const teacherDiscipline = await prisma.teachersDisciplines.findFirst({
        where: {
            id
        }
    });
    return teacherDiscipline;
}

export async function insertTest(body:Test) {
    await prisma.tests.create({
        data: body
    });
}

export async function findByDisciplines() {
    const tests = await prisma.terms.findMany({
        select: {
            number: true,
            discipline: {
                select: {
                    id: true,
                    name: true,
                    teacherDiscipline: {
                        select: {
                            teacher: {select: { name: true }},
                            tests: {
                                select: {
                                    id: true,
                                    name: true,
                                    pdfUrl: true,
                                    category: {select: { name: true }}
                                }
                            }
                        }
                    }
                }
            }
        }
    });

    return tests
}

export async function findByTeachers() {
    const tests = await prisma.teachers.findMany({
        include: {
            teacherDiscipline: {
                select: {
                    tests: {
                        select: {
                            category: true,
                            name: true,
                            pdfUrl: true,
                            id: true
                        }
                    },
                    discipline: true
                }
            }
        }
    });

    return tests
}