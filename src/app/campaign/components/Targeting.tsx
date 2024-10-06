import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Select, SelectItem, Button } from "@nextui-org/react";
import { toast } from "react-toastify";

import { COMPANY_SIZE, INDUSTRIES, LOCATIONS } from "../constants";
import { TTargetingFilters } from "../types";
import Loader from "@components/Loader";

type TTargeting = {
  campaignId: string;
  nextStep: () => void;
};

const Targeting = ({ campaignId, nextStep }: TTargeting) => {
  const [isSubmiting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values: TTargetingFilters) => {
    console.log(values);
    setIsSubmitting(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}campaign/${campaignId}/search-leads`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      toast.success("Successfully fetched Data!");
      console.log("API response:", data);
      nextStep();
    } catch (error: any) {
      console.error("Error fetching data!", error);
      toast.error(error?.message || "Error fetching data!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Formik
        initialValues={{
          locations: [],
          industries: [],
          companySizes: [],
        }}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="space-y-4 dark flex flex-col items-center">
            <Select
              label="Location"
              placeholder="Select Locations"
              selectionMode="multiple"
              value={values.locations}
              onSelectionChange={(values) => {
                const selectedValues = Array.from(values);
                setFieldValue("locations", selectedValues);
              }}
              isRequired
            >
              {LOCATIONS.map((item) => (
                <SelectItem
                  key={item}
                  value={item}
                  className="capitalize"
                  classNames={{ title: "font-bold" }}
                >
                  {item}
                </SelectItem>
              ))}
            </Select>

            <Select
              label="Industry"
              placeholder="Select Industries"
              selectionMode="multiple"
              value={values.industries}
              onSelectionChange={(values) => {
                const selectedValues = Array.from(values);
                setFieldValue("industries", selectedValues);
              }}
              isRequired
            >
              {INDUSTRIES.map((item: string) => (
                <SelectItem
                  key={item}
                  value={item}
                  className="capitalize"
                  classNames={{ title: "font-bold" }}
                >
                  {item}
                </SelectItem>
              ))}
            </Select>

            <Select
              label="Company Size"
              placeholder="Select Company Sizes"
              selectionMode="multiple"
              value={values.companySizes}
              onSelectionChange={(values) => {
                const selectedValues = Array.from(values);
                setFieldValue("companySizes", selectedValues);
              }}
              isRequired
            >
              {Object.values(COMPANY_SIZE).map((size) => (
                <SelectItem
                  key={size}
                  value={size}
                  classNames={{ title: "font-bold" }}
                >
                  {size}
                </SelectItem>
              ))}
            </Select>
            <span>Results are limited to 10 due to the free Search API</span>
            {isSubmiting ? (
              <Loader />
            ) : (
              <Button type="submit" color="primary">
                Apply Filters
              </Button>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Targeting;
