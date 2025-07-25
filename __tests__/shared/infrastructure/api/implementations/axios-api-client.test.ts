import { AxiosApiClient } from "@infrastructure/api/implementations/axios-api-client";

const getMock = vi.fn();
const postMock = vi.fn();

vi.mock("axios", () => ({
  default: { create: () => ({ get: getMock, post: postMock }) },
}));

describe("AxiosApiClient tests:", () => {
  const baseURL = "https://api.example.com";
  let client: AxiosApiClient;

  beforeEach(() => {
    client = new AxiosApiClient(baseURL);
  });

  it("should call GET with the correct URL and return the response data", async () => {
    const expectedData = { message: "success" };

    getMock.mockReturnValueOnce({ data: expectedData });

    const data = await client.get("/test");

    expect(getMock).toHaveBeenCalledWith("/test");
    expect(data).toEqual(expectedData);
  });

  it("should call POST with the correct URL and body and return the response data", async () => {
    const postData = { name: "John" };
    const expectedData = { id: 1 };

    postMock.mockResolvedValue({ data: expectedData });

    const data = await client.post("/users", postData);

    expect(postMock).toHaveBeenCalledWith("/users", postData);
    expect(data).toEqual(expectedData);
  });
});
