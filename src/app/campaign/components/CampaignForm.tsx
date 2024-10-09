import React, { ReactNode, useState } from "react";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { Form, Formik } from "formik";
import * as Yup from "yup";
import moment from "moment-timezone";
import { useRouter } from "next/navigation";

import usePersona from "../../hooks/usePersona";

import { TCreateCampaign } from "../types";
import { CAMPAIGN_STEP, LEAD_PROBABILITY } from "../constants";

import Info from "@icons/Info";
import { toast } from "react-toastify";
import { TLinkedInCookies, TLinkedInProfile } from "@utils/types";

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

  const [linkedinProfile, setLinkedinProfile] = useState<TLinkedInProfile>();
  const [isLinkedinValid, setIsLinkedinValid] = useState(false);

  const router = useRouter();

  const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const fetchLinkedinProfile = async (
    linkedin: TLinkedInCookies,
    setFieldValue: any
  ) => {
    try {
      const response = await fetch("/api/linkedin/get-profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          li_at: linkedin.li_at,
          JSESSIONID: linkedin.JSESSIONID.replace(/"/g, ""),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to validate LinkedIn profile");
      }

      setIsLinkedinValid(true);
      const data = await response.json();
      console.log({ data });
      setLinkedinProfile(data.profileData);

      setFieldValue("linkedin.li_at", data.requestedBody.li_at);
      setFieldValue("linkedin.JSESSIONID", data.requestedBody.JSESSIONID);

      toast.success("LinkedIn profile validated successfully!");
    } catch (error: any) {
      setIsLinkedinValid(false);
      console.error("Error validating LinkedIn profile:", error);
      toast.error(
        error?.message ||
          "An unknown error occurred while validating LinkedIn profile"
      );
    }
  };

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
                  <Formik<TCreateCampaign>
                    initialValues={{
                      name: "",
                      persona: "",
                      leadProbability: LEAD_PROBABILITY.LOW,
                      sendLimit: 20,
                      startDate: moment().tz(timezone).format().slice(0, 16),
                      stepper: CAMPAIGN_STEP.TARGET,
                      linkedin: {
                        li_at: "",
                        JSESSIONID: "",
                        messageTemplate:
                          "Hi {firstName}, I have sent you an email. Did you get a chance to look at it?",
                      },
                    }}
                    validationSchema={validationSchema}
                    onSubmit={async (
                      values: TCreateCampaign,
                      { resetForm }
                    ) => {
                      const submittedValues = {
                        ...values,
                        startDate: new Date(values.startDate).toISOString(),
                      };
                      if (!isLinkedinValid) {
                        delete submittedValues.linkedin;
                      }
                      console.log("submit", { submittedValues });
                      const res = await handleSubmit(submittedValues);
                      if (res !== null) {
                        router.push(`campaign/${res}`);
                        onClose();
                        resetForm();
                      }
                    }}
                    enableReinitialize
                  >
                    {({ values, setFieldValue, errors, touched, dirty }) => (
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
                          onChange={(e) =>
                            setFieldValue("startDate", e.target.value)
                          }
                          isRequired
                          isInvalid={touched.startDate && !!errors.startDate}
                          errorMessage={
                            touched.startDate && (errors.startDate as string)
                          }
                        />
                        <hr className="my-2" />
                        <div className="flex gap-x-2 items-center">
                          <h2 className="text-lg font-semibold">LinkedIn</h2>
                          <span title="To find your LinkedIn li_at and JSESSIONID, open LinkedIn in your browser, log in, and then open the developer tools (F12 or right-click and select 'Inspect'). Go to the 'Application' tab, then under 'Cookies', find the cookies named 'li_at' and 'JSESSIONID'.">
                            <Info className="cursor-pointer" />
                          </span>
                        </div>

                        <Input
                          type="text"
                          name="linkedin.li_at"
                          label="li_at"
                          placeholder="Enter li_at"
                          value={values.linkedin?.li_at}
                          onChange={(e) =>
                            setFieldValue("linkedin.li_at", e.target.value)
                          }
                          disabled={isLinkedinValid}
                        />

                        <Input
                          type="text"
                          name="linkedin.JSESSIONID"
                          label="JSESSIONID"
                          placeholder="Enter JSESSIONID"
                          value={values.linkedin?.JSESSIONID}
                          onChange={(e) =>
                            setFieldValue("linkedin.JSESSIONID", e.target.value)
                          }
                          disabled={isLinkedinValid}
                        />

                        {isLinkedinValid && (
                          <Textarea
                            label="LinkedIn Message Template"
                            labelPlacement="outside"
                            placeholder="Enter your LinkedIn message template here"
                            className="max-h-[12rem]"
                            maxLength={200}
                            value={values?.linkedin?.messageTemplate}
                            onChange={(e) =>
                              setFieldValue(
                                "linkedin.messageTemplate",
                                e.target.value
                              )
                            }
                          />
                        )}

                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-x-2">
                            {linkedinProfile && (
                              <>
                                <img
                                  src={`${linkedinProfile?.miniProfile?.picture["com.linkedin.common.VectorImage"].rootUrl}${linkedinProfile.miniProfile.picture["com.linkedin.common.VectorImage"].artifacts[2].fileIdentifyingUrlPathSegment}`}
                                  alt="LinkedIn Profile"
                                  className="w-16 h-16 rounded-full"
                                />
                                <div className="flex flex-col text-xs font-semibold">
                                  <span>
                                    {linkedinProfile.miniProfile.firstName}{" "}
                                    {linkedinProfile.miniProfile.lastName}
                                  </span>
                                  <span>
                                    {
                                      linkedinProfile.miniProfile
                                        .publicIdentifier
                                    }
                                  </span>
                                </div>
                              </>
                            )}
                          </div>
                          <Button
                            type="button"
                            color={
                              values.linkedin?.li_at &&
                              values.linkedin?.JSESSIONID
                                ? "secondary"
                                : "default"
                            }
                            disabled={
                              (!values.linkedin?.li_at ||
                                !values.linkedin?.JSESSIONID) &&
                              isLinkedinValid
                            }
                            onClick={async () =>
                              await fetchLinkedinProfile(
                                values.linkedin!,
                                setFieldValue
                              )
                            }
                          >
                            Validate LinkedIn
                          </Button>
                        </div>
                        <span className="text-xs text-center flex justify-center line-clamp-1">
                          Validate Linkedin if you want to use it in Campaign!
                        </span>

                        <div className="flex justify-end gap-x-2">
                          <Button
                            color="danger"
                            variant="light"
                            onPress={onClose}
                          >
                            Close
                          </Button>
                          <Button
                            color="primary"
                            type="submit"
                            disabled={!dirty}
                          >
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

export default React.memo(CampaignForm);
