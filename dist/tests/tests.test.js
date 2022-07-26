var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import app from "../src/app.js";
import supertest from "supertest";
import prisma from "../src/config/database.js";
import userFactory from "./factories/userFactory.js";
import testFactory from "./factories/testFactory.js";
beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prisma.$executeRaw(templateObject_1 || (templateObject_1 = __makeTemplateObject(["DELETE FROM users WHERE email = 'nicole-teste@driven.com'"], ["DELETE FROM users WHERE email = 'nicole-teste@driven.com'"])))];
            case 1:
                _a.sent();
                return [4 /*yield*/, prisma.$executeRaw(templateObject_2 || (templateObject_2 = __makeTemplateObject(["DELETE FROM tests WHERE name = 'prova top teste'"], ["DELETE FROM tests WHERE name = 'prova top teste'"])))];
            case 2:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
describe("POST /tests", function () {
    it("given test data, create test", function () { return __awaiter(void 0, void 0, void 0, function () {
        var body, response, token, test, response2, testConfirmation;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    body = userFactory.createUser();
                    return [4 /*yield*/, userFactory.postUser(body)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, supertest(app).post("/sign-in").send({
                            email: body.email,
                            password: body.password
                        })];
                case 2:
                    response = _a.sent();
                    token = response.text;
                    test = testFactory.createTest();
                    return [4 /*yield*/, supertest(app).post("/tests").set("Authorization", "Bearer ".concat(token)).send(test)];
                case 3:
                    response2 = _a.sent();
                    expect(response2.status).toEqual(201);
                    return [4 /*yield*/, prisma.tests.findFirst({
                            where: {
                                name: "prova top teste"
                            }
                        })];
                case 4:
                    testConfirmation = _a.sent();
                    expect(test.name).toEqual(testConfirmation.name);
                    return [2 /*return*/];
            }
        });
    }); });
    it("given invalid data, fail to create test", function () { return __awaiter(void 0, void 0, void 0, function () {
        var body, loginResponse, token, test, response1, response2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    body = userFactory.createUser();
                    return [4 /*yield*/, userFactory.postUser(body)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, supertest(app).post("/sign-in").send({
                            email: body.email,
                            password: body.password
                        })];
                case 2:
                    loginResponse = _a.sent();
                    token = loginResponse.text;
                    test = testFactory.createTest();
                    return [4 /*yield*/, supertest(app).post("/tests").set("Authorization", "Bearer ".concat(token)).send(__assign(__assign({}, test), { categoryId: 10000 }))];
                case 3:
                    response1 = _a.sent();
                    expect(response1.status).toEqual(404);
                    return [4 /*yield*/, supertest(app).post("/tests").set("Authorization", "Bearer ".concat(token)).send(__assign(__assign({}, test), { teacherDisciplineId: 10000 }))];
                case 4:
                    response2 = _a.sent();
                    expect(response2.status).toEqual(404);
                    return [2 /*return*/];
            }
        });
    }); });
});
describe("GET /tests", function () {
    it("given invalid query string, receive unprocessable entity error (422)", function () { return __awaiter(void 0, void 0, void 0, function () {
        var body, loginResponse, token, response1, response2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    body = userFactory.createUser();
                    return [4 /*yield*/, userFactory.postUser(body)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, supertest(app).post("/sign-in").send({
                            email: body.email,
                            password: body.password
                        })];
                case 2:
                    loginResponse = _a.sent();
                    token = loginResponse.text;
                    testFactory.createTest();
                    return [4 /*yield*/, supertest(app).get("/tests").set("Authorization", "Bearer ".concat(token))];
                case 3:
                    response1 = _a.sent();
                    expect(response1.status).toEqual(422);
                    return [4 /*yield*/, supertest(app).get("/tests?groupBy=terms").set("Authorization", "Bearer ".concat(token))];
                case 4:
                    response2 = _a.sent();
                    expect(response2.status).toEqual(422);
                    return [2 /*return*/];
            }
        });
    }); });
    it("given query string = disciplines || teachers, receive tests by discipline", function () { return __awaiter(void 0, void 0, void 0, function () {
        var body, loginResponse, token, disciplinesResponse, teachersResponse;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    body = userFactory.createUser();
                    return [4 /*yield*/, userFactory.postUser(body)];
                case 1:
                    _a.sent();
                    return [4 /*yield*/, supertest(app).post("/sign-in").send({
                            email: body.email,
                            password: body.password
                        })];
                case 2:
                    loginResponse = _a.sent();
                    token = loginResponse.text;
                    testFactory.createTest();
                    return [4 /*yield*/, supertest(app).get("/tests?groupBy=disciplines").set("Authorization", "Bearer ".concat(token))];
                case 3:
                    disciplinesResponse = _a.sent();
                    expect(disciplinesResponse.status).toEqual(200);
                    return [4 /*yield*/, supertest(app).get("/tests?groupBy=teachers").set("Authorization", "Bearer ".concat(token))];
                case 4:
                    teachersResponse = _a.sent();
                    expect(teachersResponse.status).toEqual(200);
                    return [2 /*return*/];
            }
        });
    }); });
});
var templateObject_1, templateObject_2;
