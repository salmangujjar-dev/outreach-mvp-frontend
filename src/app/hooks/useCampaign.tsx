import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { TCreateCampaign, TGetCampaign } from "../campaign/types";

const useCampaign = () => {
  const [data, setData] = useState<TGetCampaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}campaign`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch campaigns");
        }
        const campaignData = await response.json();
        setData(campaignData);
      } catch (error: any) {
        console.error("Error fetching campaigns:", error);
        setError(error?.message || "Error fetching campaigns");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const createCampaign = async (values: TCreateCampaign) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}campaign`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create campaign");
      }

      const result = await response.json();
      console.log("Campaign created successfully:", result);
      toast.success("Campaign created successfully!");

      setData((prevData) => [...prevData, result]);

      return result?._id;
    } catch (error) {
      console.error("Error creating campaign:", error);
      toast.error("Error creating campaign");

      return null;
    }
  };

  const deleteCampaign = async (id: string) => {
    console.log(`Delete Id: ${id}`);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}campaign/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete campaign");
      }

      toast.success("Campaign deleted successfully!");
      setData((prevData) => prevData.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting campaign:", error);
      toast.error("Error deleting campaign");
    }
  };

  return { data, isLoading, error, createCampaign, deleteCampaign };
};

export default useCampaign;
