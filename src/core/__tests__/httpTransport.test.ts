import { httpTransport, queryStringify } from "../HttpTransport";
import { applicationJson } from "../../api/headers";

function mockXMLHttpRequest(response?: Record<string, any>) {
  const xhrMock: Partial<XMLHttpRequest> = {
    open: jest.fn(),
    setRequestHeader: jest.fn(),
    onload: jest.fn(),
    send: jest.fn(),
    response: response,
  };

  jest
    .spyOn(window, "XMLHttpRequest")
    .mockImplementation(() => xhrMock as XMLHttpRequest);

  return xhrMock;
}
describe("HttpTransport", () => {
  it("should return query parameters for get request", () => {
    const params: Record<string, any> = {
      key1: "key1",
      key2: ["key2", "key3"],
    };

    expect(queryStringify(params)).toBe("?key1=key1&key2=key2,key3");
  });
  describe("REQUESTS", () => {
    const url = "https://ya-praktikum.tech/api/v2";

    afterEach(() => {
      jest.clearAllMocks();
    });

    it("should return response for get request",  () => {
      const mock = mockXMLHttpRequest({ message: "get request" });
      const response = httpTransport.get("/test", { queryParams: { key1: "key1" } });

      expect(mock.open).toBeCalledWith("GET", `${url}/test?key1=key1`, true);
      expect(mock.send).toBeCalledWith();

      (mock.onload as EventListener)(new Event(""));

      expect(response).resolves.toEqual({ message: "get request" });
    });

    it("should return response for post request", () => {
      const message = { message: "post request" };
      const data = JSON.stringify({ key: 1 });
      const mock = mockXMLHttpRequest({ message: "post request" });
      const response = httpTransport.post("/test", { data, headers: { ...applicationJson } });

      expect(mock.open).toBeCalledWith("POST", `${url}/test`, true);
      expect(mock.setRequestHeader).toBeCalledWith("Content-Type", "application/json");
      expect(mock.send).toBeCalledWith(data);

      (mock.onload as EventListener)(new Event(""));

      expect(response).resolves.toEqual(message);
    });

    it("should return response for put request", () => {
      const message = { message: "put request" };
      const data = JSON.stringify({ key: 1 });
      const mock = mockXMLHttpRequest({ message: "put request" });
      const response = httpTransport.put("/test", { data, headers: { ...applicationJson } });

      expect(mock.open).toBeCalledWith("PUT", `${url}/test`, true);
      expect(mock.setRequestHeader).toBeCalledWith("Content-Type", "application/json");
      expect(mock.send).toBeCalledWith(data);

      (mock.onload as EventListener)(new Event(""));

      expect(response).resolves.toEqual(message);
    });

    it("should return response for patch request", () => {
      const message = { message: "patch request" };
      const data = JSON.stringify({ key: 1 });
      const mock = mockXMLHttpRequest({ message: "patch request" });
      const response = httpTransport.patch("/test", { data, headers: { ...applicationJson } });

      expect(mock.open).toBeCalledWith("PATCH", `${url}/test`, true);
      expect(mock.setRequestHeader).toBeCalledWith("Content-Type", "application/json");
      expect(mock.send).toBeCalledWith(data);

      (mock.onload as EventListener)(new Event(""));

      expect(response).resolves.toEqual(message);
    });

    it("should return response for delete request", () => {
      const data = JSON.stringify({ key: 1 });
      const mock = mockXMLHttpRequest({});
      const response = httpTransport.delete("/test", { data, headers: { ...applicationJson } });

      expect(mock.open).toBeCalledWith("DELETE", `${url}/test`, true);
      expect(mock.setRequestHeader).toBeCalledWith("Content-Type", "application/json");
      expect(mock.send).toBeCalledWith(data);

      (mock.onload as EventListener)(new Event(""));

      expect(response).resolves.toEqual({});
    });
  });
});
