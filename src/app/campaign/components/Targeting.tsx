import React from "react";
import { Formik, Form } from "formik";
import { Select, SelectItem, Button } from "@nextui-org/react";
import { toast } from "react-toastify";

import { LOCATIONS, PERSON_TITLES } from "../constants";
import { TTargetingFilters } from "../types";

type TTargeting = {
  nextStep: () => void;
};

const Targeting = ({}: TTargeting) => {
  const apiUrl = process.env.APOLLO_SEARCH_API;
  const apiKey = process.env.APOLLO_API_KEY;

  const handleSubmit = async (values: TTargetingFilters) => {
    console.log(values);

    if (!apiUrl || !apiKey) {
      toast.error("Apollo API configuration is missing");
      return;
    }

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-cache",
          "X-Api-Key": `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          api_key: apiKey,
          person_locations: values?.location,
          person_titles: values?.personTitle,
          page: 1,
          per_page: 10,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      toast.success("Successfully fetched Data!");
      console.log("Apollo API response:", data);
    } catch (error: any) {
      console.error("Error fetching data from Apollo:", error);
      toast.error(error?.message || "Error fetching data from Apollo");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <Formik
        initialValues={{
          location: [],
          personTitle: [],
        }}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form className="space-y-4 dark flex flex-col items-center">
            <Select
              label="Location"
              placeholder="Select Location"
              selectionMode="multiple"
              value={values.location}
              onSelectionChange={(values) => {
                const selectedValues = Array.from(values);
                setFieldValue("location", selectedValues);
              }}
              isRequired
            >
              {LOCATIONS.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </Select>

            <Select
              label="Person Title"
              placeholder="Select a Title"
              selectionMode="multiple"
              value={values.personTitle}
              onSelectionChange={(values) => {
                const selectedValues = Array.from(values);
                setFieldValue("personTitle", selectedValues);
              }}
              isRequired
            >
              {PERSON_TITLES.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </Select>
            <span>
              Results are limited to 10 due to the free Apollo Search API
            </span>
            <Button type="submit" color="primary">
              Apply Filters
            </Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Targeting;
