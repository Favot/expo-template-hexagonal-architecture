import { Session } from "~/domain";
import * as infrastructureRegistry from "~/gateway/infrastructureRegistry";
import { sessionServiceStorageImplementation } from "./sessionServiceStorageImplementation";

// Mock the infrastructure registry
jest.mock("~/gateway/infrastructureRegistry", () => ({
  getInfrastructureRegistry: jest.fn(),
}));

describe("sessionServiceStorageImplementation", () => {
  const mockStorageClient = {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
  };

  // Mock session data
  const mockSession: Session = {
    state: "authenticated",
    tokens: {
      accessToken: "mock-access-token",
      refreshToken: "mock-refresh-token",
      tokenType: "Bearer",
    },
    user: {
      id: "123",
      email: "test@example.com",
      firstName: "Test",
      lastName: "User",
      displayName: "Test User",
      avatarUrl: "https://example.com/avatar.jpg",
      roles: ["user"],
      permissions: ["read"],
    },
  };

  beforeEach(() => {
    // Reset all mocks before each test
    jest.clearAllMocks();
    // Setup the mock infrastructure registry
    jest
      .mocked(infrastructureRegistry.getInfrastructureRegistry)
      .mockReturnValue({
        storageClient: mockStorageClient,
      } as any);
    // Spy on console.error
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  describe("getSession", () => {
    it("should return null when no session exists", async () => {
      mockStorageClient.getItem.mockResolvedValue(null);

      const result = await sessionServiceStorageImplementation.getSession();

      expect(result).toBeNull();
      expect(mockStorageClient.getItem).toHaveBeenCalledWith("session");
    });

    it("should return parsed session when valid session exists", async () => {
      mockStorageClient.getItem.mockResolvedValue(JSON.stringify(mockSession));

      const result = await sessionServiceStorageImplementation.getSession();

      expect(result).toEqual(mockSession);
      expect(mockStorageClient.getItem).toHaveBeenCalledWith("session");
    });

    it("should return null and log error when session JSON is invalid", async () => {
      mockStorageClient.getItem.mockResolvedValue("invalid-json");

      const result = await sessionServiceStorageImplementation.getSession();

      expect(result).toBeNull();
      expect(mockStorageClient.getItem).toHaveBeenCalledWith("session");
      expect(console.error).toHaveBeenCalledWith(
        "Error parsing session:",
        expect.any(SyntaxError)
      );
    });
  });

  describe("setSession", () => {
    it("should store serialized session", async () => {
      await sessionServiceStorageImplementation.setSession(mockSession);

      expect(mockStorageClient.setItem).toHaveBeenCalledWith(
        "session",
        JSON.stringify(mockSession)
      );
    });

    it("should remove session when null is provided", async () => {
      await sessionServiceStorageImplementation.setSession(null);

      expect(mockStorageClient.removeItem).toHaveBeenCalledWith("session");
      expect(mockStorageClient.setItem).not.toHaveBeenCalled();
    });
  });

  describe("removeSession", () => {
    it("should remove the session", async () => {
      await sessionServiceStorageImplementation.removeSession();

      expect(mockStorageClient.removeItem).toHaveBeenCalledWith("session");
    });
  });
});
