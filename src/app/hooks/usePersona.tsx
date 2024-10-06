import { useEffect, useState } from "react";

import { TPersona } from "../persona/types";
import { toast } from "react-toastify";

const usePersona = () => {
  const [data, setData] = useState<TPersona[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPersona = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}persona`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch persona");
        }
        const personaData = await response.json();
        setData(personaData);
      } catch (error: any) {
        console.error("Error fetching persona:", error);
        setError(error?.message || "Error fetching persona");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPersona();
  }, []);

  const createPersona = async (values: TPersona) => {
    console.log(`Create Name: ${values.name}`);
    const { _id, ...updatedValues } = values;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}persona`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedValues),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create persona");
      }

      const result = await response.json();
      console.log("Persona created successfully:", result);
      toast.success("Persona created successfully!");

      if (Object.keys(updatedValues).length !== 10) {
        setData((prevData) => [...prevData, result]);
      }

      return true;
    } catch (error) {
      console.error("Error creating persona:", error);
      toast.error("Error creating persona");

      return false;
    }
  };

  const editPersona = async (values: TPersona) => {
    console.log(`Edit Id: ${values._id}`);
    const { _id, ...updatedValues } = values;
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}persona/${_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedValues),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to edit persona");
      }

      const result = await response.json();
      console.log("Persona edited successfully:", result);
      toast.success("Persona edited successfully!");

      setData((prevData) =>
        prevData.map((item) =>
          item._id === _id ? { ...item, ...updatedValues } : item
        )
      );

      return true;
    } catch (error) {
      console.error("Error editing persona:", error);
      toast.error("Error editing persona");

      return false;
    }
  };

  const deletePersona = async (id: string) => {
    console.log(`Delete Id: ${id}`);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}persona/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete persona");
      }

      toast.success("Persona deleted successfully!");
      setData((prevData) => prevData.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Error deleting persona:", error);
      toast.error("Error deleting persona");
    }
  };

  return { data, isLoading, error, createPersona, editPersona, deletePersona };
};

export default usePersona;
