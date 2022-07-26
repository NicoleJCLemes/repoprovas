import { Test, 
    findByCategoryId, 
    findByTeacherDisciplineId, 
    insertTest, 
    findByDisciplines, 
    findByTeachers} from "../repositories/testRepository.js";

export async function postTestService(body:Test) {
    
    const category = await findByCategoryId(body.categoryId);
    if(!category) {
        throw {
            type: "Not Found",
            message: "No category was found"
        }
    };

    const teacherDiscipline = await findByTeacherDisciplineId(body.teacherDisciplineId);
    if(!teacherDiscipline) {
        throw {
            type: "Not Found",
            message: "No teacher/discipline was found"
        }
    };

    await insertTest(body);
}

export async function noQueryService() {
    throw {
        type: "Unprocessable Entity",
        message: "Query string inexistent or invalid"
    }
}

export async function getTestsByDisciplines() {
    const allTests = await findByDisciplines();

    return allTests;
}

export async function getTestsByTeachers() {
    const allTests = await findByTeachers();

    return allTests;
}