function createTest() {
    const body = {
        name: "prova top teste",
        pdfUrl: "https://www.infolivros.org/pdfview/2736-introducao-a-algoritmos-e-programacao-fabricio-ferrari-e-cristian-cechinel/",
        categoryId: 1,
        teacherDisciplineId: 1
    }

    return body;
}

const testFactory = {
    createTest
}

export default testFactory;