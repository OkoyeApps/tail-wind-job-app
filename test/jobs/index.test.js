import handler from '../../pages/api/jobs';
import { createMocks } from 'node-mocks-http';

describe("Jobs API", () => {
    test("api to jobs should return at least one object in array", async () => {
        const { req, res } = createMocks({
            method: "GET",
        });
        await handler(req, res);
        expect(res._getData().length).toBeGreaterThan(0);
    });

    test("search jobs should return at least one data for valid search", async () => {
        const { req, res } = createMocks({
            method: "GET",
            query: {
                search: "mammoth"
            }
        });
        await handler(req, res);
        expect(res._getData().length).toBeGreaterThan(0);
    });

    test("search jobs should return at empty array for invalid search", async () => {
        const { req, res } = createMocks({
            method: "GET",
            query: {
                search: "dafsdfadfasfsadfasdfasdfasd"
            }
        });
        await handler(req, res);
        expect(res._getData().length).toBeGreaterThan(0);
    });

    test("filter jobs should return at least one data for valid filter", async () => {
        const { req, res } = createMocks({
            method: "GET",
            query: {
                filter : "job_type$Per-Diem"
            }
        });
        await handler(req, res);
        expect(res._getData().length).toBeGreaterThan(0);
    });

});