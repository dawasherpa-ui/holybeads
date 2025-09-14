import { AxiosInstance } from "@/app/(repositories)/config";

export async function getBanners(category: string = ""): Promise<any[]> {
  try {
    const response = await AxiosInstance.get("/hero-banners", {
      params: { category },
    });

    if (response.status === 200) {
      return response.data.data.results || [];
    } else {
      console.warn("Unexpected status code:", response.status);
      return [];
    }
  } catch (error:any) {
    // if (axios.isAxiosError(error)) {
      console.error("Axios error:", error.response?.data);
    // } else {
      console.error("Unexpected error:", error);
    // }
    throw error; // Re-throw the error for the caller to handle
  }
}

// Add other API functions here as needed