import handler from '../../pages/api/filters';
import { createMocks } from 'node-mocks-http';

describe("/api/filters", () => {
    let response;
    beforeAll(() => {
        const { req, res } = createMocks({
            method: "GET"
        });
        handler(req, res);
        response = res;
    });
    test("filter objects keys must be greater than zero (0)", () => {
        expect(response._getStatusCode()).toBe(200);
    });
    test("filter succes response code", () => {
        expect(Object.keys(response._getData()).length).toBeGreaterThan(0);
    });
});