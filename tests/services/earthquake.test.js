import { describe, it, expect, vi, beforeEach } from "vitest";
import axios from "axios";
import earthquakeService from "../../src/services/earthquake";

// mock axios
vi.mock("axios");

describe("earthquake service", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should post new earthquake data", async () => {
    const newData = { location: "Tainan", severityLevel: 1 };
    const responseData = { data: { id: "abc123", ...newData } };

    axios.post.mockResolvedValue(responseData);

    const result = await earthquakeService.create(newData);
    expect(axios.post).toHaveBeenCalledWith(`/api/earthquake`, newData);
    expect(result).toEqual(responseData);
  });

  it("should fetch earthquake alerts", async () => {
    const responseData = {
      data: [
        { id: "1", location: "Taipei", severityLevel: 2 },
        { id: "2", location: "Tainan", severityLevel: 1 },
      ],
    };

    axios.get.mockResolvedValue(responseData);

    const result = await earthquakeService.getAlerts();
    expect(axios.get).toHaveBeenCalledWith(`/api/earthquake/alerts`);
    expect(result).toEqual(responseData);
  });

  it("should update earthquake alert", async () => {
    const mockResponse = { data: "response data" };
    axios.put.mockResolvedValue(mockResponse);

    const id = 1;
    const updatedData = { name: "Updated Alert" };

    const result = await earthquakeService.updateAlert(id, updatedData);

    expect(axios.put).toHaveBeenCalledWith(
      `/api/earthquake/alerts/1`,
      updatedData,
    );

    expect(result).toEqual(mockResponse);
  });
});
