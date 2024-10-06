import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";

type Props = {
  children: React.ReactNode;
  subject: string;
  body: string;
};

const EmailModal = ({ children, subject, body }: Props) => {
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
                <Input
                  type="text"
                  name="subject"
                  label="Subject"
                  placeholder="Email Subject"
                  value={subject}
                  disabled
                />

                <Textarea
                  label="Email Body"
                  labelPlacement="outside"
                  placeholder="Email Content"
                  className="max-h-[12rem]"
                  value={body}
                  disabled
                />

                <div className="flex justify-end gap-x-2">
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default EmailModal;
