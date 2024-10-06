import React, { ReactNode } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import moment from "moment-timezone";
import { useRouter } from "next/navigation";

import usePersona from "../../hooks/usePersona";

import { TCreateCampaign } from "../types";
import { CAMPAIGN_STEP, LEAD_PROBABILITY } from "../constants";

type Props = {
  children: ReactNode;
  handleSubmit: (values: TCreateCampaign) => Promise<string | null>;
};

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .max(50, "Name must be 50 characters or less"),
  persona: Yup.string().required("Persona is required"),
  leadProbability: Yup.string()
    .oneOf(Object.values(LEAD_PROBABILITY), "Invalid lead probability")
    .required("Lead Probability is required"),
  sendLimit: Yup.number()
    .required("Send Limit is required")
    .positive("Send Limit must be a positive number")
    .integer("Send Limit must be an integer")
    .max(1000, "Send Limit must be 1000 or less"),
  startDate: Yup.date()
    .required("Start Date is required")
    .test(
      "is-future-time",
      "Start time must be in the future",
      function (value) {
        const now = new Date();
        const startDate = new Date(value);
        return startDate.getTime() > now.getTime();
      }
    ),
});

const CampaignForm = ({ children, handleSubmit }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: personaData } = usePersona();

  const router = useRouter();

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <>
      {React.cloneElement(children as React.ReactElement, { onClick: onOpen })}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        scrollBehavior="inside"
        className="dark text-white"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Campaign</ModalHeader>
              <ModalBody>
                {personaData.length === 0 ? (
                  <span className="text-center">
                    "You need to Create Persona to be able to Create a
                    Campaign."
                  </span>
                ) : (
                  <Formik
                    initialValues={{
                      name: "",
                      persona: "",
                      leadProbability: LEAD_PROBABILITY.LOW,
                      sendLimit: 20,
                      startDate: moment().tz(timezone).format().slice(0, 16),
                      stepper: CAMPAIGN_STEP.TARGET,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (values: TCreateCampaign) => {
                      const submittedValues = {
                        ...values,
                        startDate: new Date(values.startDate).toISOString(),
                      };
                      console.log("submit", { submittedValues });
                      const res = await handleSubmit(submittedValues);
                      if (res !== null) {
                        router.push(`campaign/${res}`);
                        onClose();
                      }
                    }}
                    enableReinitialize
                  >
                    {({ values, setFieldValue, errors, touched }) => (
                      <Form className="space-y-3">
                        <Input
                          type="text"
                          name="name"
                          label="Name"
                          placeholder="Enter Campaign Name"
                          value={values.name}
                          onChange={(e) =>
                            setFieldValue("name", e.target.value)
                          }
                          isRequired
                          isInvalid={touched.name && !!errors.name}
                          errorMessage={touched.name && errors.name}
                        />

                        <Select
                          label="Select Persona"
                          name="persona"
                          selectedKeys={values.persona ? [values.persona] : []}
                          onChange={(e) =>
                            e.target.value &&
                            setFieldValue("persona", e.target.value)
                          }
                          isRequired
                          isInvalid={touched.persona && !!errors.persona}
                          errorMessage={touched.persona && errors.persona}
                        >
                          {personaData.map((item) => (
                            <SelectItem
                              key={item._id}
                              value={item._id}
                              classNames={{ title: "font-bold" }}
                            >
                              {item.name}
                            </SelectItem>
                          ))}
                        </Select>

                        <Select
                          label="Lead Probability"
                          name="leadProbability"
                          selectedKeys={[values.leadProbability]}
                          onChange={(e) =>
                            e.target.value &&
                            setFieldValue("leadProbability", e.target.value)
                          }
                          isRequired
                          isInvalid={
                            touched.leadProbability && !!errors.leadProbability
                          }
                          errorMessage={
                            touched.leadProbability && errors.leadProbability
                          }
                        >
                          {Object.entries(LEAD_PROBABILITY).map(
                            ([key, value]) => (
                              <SelectItem
                                key={value}
                                value={value}
                                classNames={{ title: "font-bold" }}
                              >
                                {key}
                              </SelectItem>
                            )
                          )}
                        </Select>

                        <Input
                          type="number"
                          name="sendLimit"
                          label="Email Sending Limit"
                          placeholder="Enter email sending limit"
                          value={String(values.sendLimit)}
                          onChange={(e) =>
                            setFieldValue("sendLimit", Number(e.target.value))
                          }
                          isRequired
                          isInvalid={touched.sendLimit && !!errors.sendLimit}
                          errorMessage={touched.sendLimit && errors.sendLimit}
                        />

                        <Input
                          type="datetime-local"
                          label="Start Date and Time"
                          variant="bordered"
                          value={values.startDate}
                          onChange={(e) => {
                            setFieldValue("startDate", e.target.value);
                            console.log(e.target.value);
                          }}
                          isRequired
                          isInvalid={touched.startDate && !!errors.startDate}
                          errorMessage={
                            touched.startDate && (errors.startDate as string)
                          }
                        />

                        <div className="flex justify-end gap-x-2">
                          <Button
                            color="danger"
                            variant="light"
                            onPress={onClose}
                          >
                            Close
                          </Button>
                          <Button color="primary" type="submit">
                            Submit
                          </Button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                )}
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CampaignForm;
