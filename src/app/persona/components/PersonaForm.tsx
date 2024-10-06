import React, { ReactNode } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { Form, Formik } from "formik";
import { toast } from "react-toastify";
import * as Yup from "yup";

import { TPersona } from "../types";

type Props = {
  children: ReactNode;
  isEditable?: boolean;
  data?: TPersona;
  handleSubmit: (values: TPersona) => void;
};

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
});

const PersonaForm = ({
  children,
  isEditable = false,
  data,
  handleSubmit,
}: Props) => {
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
              <ModalHeader>Persona</ModalHeader>
              <ModalBody>
                <Formik
                  initialValues={
                    data || {
                      id: "",
                      name: "",
                      icpQuestions: {
                        usp: "",
                        industry: "",
                        customerSupport: "",
                      },
                    }
                  }
                  validationSchema={validationSchema}
                  onSubmit={async (values: TPersona) => {
                    console.log("submit", { values });
                    await handleSubmit(values);
                    toast.success("Persona updated");
                    onClose();
                  }}
                  enableReinitialize
                >
                  {({ values, setFieldValue }) => (
                    <Form className="space-y-3">
                      {isEditable && (
                        <Input
                          type="text"
                          name="id"
                          label="ID"
                          value={values?.id}
                          disabled
                        />
                      )}
                      <Input
                        type="text"
                        name="name"
                        label="Name"
                        placeholder="Enter Persona Name"
                        value={values?.name}
                        onChange={(e) => setFieldValue("name", e.target.value)}
                        isRequired
                      />
                      <section id="icp-questions" className="space-y-3">
                        <h1 className="text-2xl underline text-center">
                          ICP Questions
                        </h1>
                        <Textarea
                          label="Unique Selling Point"
                          labelPlacement="outside"
                          placeholder="Explain your product/company unique selling
                          proposition (USP) and How does it differentiate from
                          competitors?"
                          className="max-h-[12rem]"
                          maxLength={200}
                          value={values?.icpQuestions.usp}
                          onChange={(e) =>
                            setFieldValue("icpQuestions.usp", e.target.value)
                          }
                        />
                        <Textarea
                          label="Ideal Target Market"
                          labelPlacement="outside"
                          placeholder="Define your ideal target market. Which industries or company sizes can benefit the most from your platform?"
                          className="max-h-[12rem]"
                          maxLength={200}
                          value={values?.icpQuestions.industry}
                          onChange={(e) =>
                            setFieldValue(
                              "icpQuestions.industry",
                              e.target.value
                            )
                          }
                        />
                        <Textarea
                          label="Customer Support"
                          labelPlacement="outside"
                          placeholder="How does your company handle customer support and issue resolution? What is your average response time?"
                          className="max-h-[12rem]"
                          maxLength={200}
                          value={values?.icpQuestions.customerSupport}
                          onChange={(e) =>
                            setFieldValue(
                              "icpQuestions.customerSupport",
                              e.target.value
                            )
                          }
                        />
                      </section>
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

export default PersonaForm;
