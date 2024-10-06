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
import { toast } from "react-toastify";
import * as Yup from "yup";

import { PERSONA_DATA } from "@utils/data";
import { TCreateCampaign } from "../types";
import { LEAD_PROBABILITY } from "../constants";

type Props = {
  children: ReactNode;
  handleSubmit: (values: TCreateCampaign) => void;
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  persona: Yup.string().required("Persona is required"),
  leadProbability: Yup.string().required("Lead Probability is required"),
});

const CampaignForm = ({ children, handleSubmit }: Props) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      {React.cloneElement(children as React.ReactElement, { onClick: onOpen })}
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}
        scrollBehavior={"inside"}
        className="dark text-white"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Campaign</ModalHeader>
              <ModalBody>
                <Formik
                  initialValues={{
                    name: "",
                    persona: "",
                    leadProbability: LEAD_PROBABILITY.LOW,
                  }}
                  validationSchema={validationSchema}
                  onSubmit={async (values: TCreateCampaign) => {
                    console.log("submit", { values });
                    await handleSubmit(values);
                    toast.success("Campaign Created!");
                    onClose();
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
                        value={values?.name}
                        onChange={(e) => setFieldValue("name", e.target.value)}
                        isRequired
                        isInvalid={touched.name && !!errors.name}
                        errorMessage={touched.name && errors.name}
                      />

                      <Select
                        label="Select Persona"
                        name="persona"
                        defaultSelectedKeys={[values?.persona]}
                        onChange={(e) =>
                          e.target.value &&
                          setFieldValue("persona", e.target.value)
                        }
                        isRequired
                        isInvalid={touched.persona && !!errors.persona}
                        errorMessage={touched.persona && errors.persona}
                      >
                        {PERSONA_DATA.map((item) => (
                          <SelectItem key={item.id}>{item.name}</SelectItem>
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
                            <SelectItem key={value} value={value}>
                              {key}
                            </SelectItem>
                          )
                        )}
                      </Select>

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
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CampaignForm;
