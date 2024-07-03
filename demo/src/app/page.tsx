"use client";
import {
  Card,
  CardBody,
  Image,
  Button,
  CardHeader,
  CardFooter,
  useDisclosure,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";
import { useState } from "react";
import { FaCompressAlt, FaExpandAlt } from "react-icons/fa";

interface ModalFields {
  header: string;
  body: React.ReactNode;
  cancel?: boolean;
  close?: boolean;
}

export default function Home() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isExpanded, setIsExpanded] = useState(false);
  const [modalFields, setModalFields] = useState<ModalFields>({
    header: "",
    body: <></>,
  });

  const generateReceipt = () => {
    setModalFields({
      header: "Generating Receipt...",
      body: (
        <div className="flex flex-col gap-10">
          <p>This process should only take a few seconds.</p>
          <Spinner size="lg" label="Generating..." />
        </div>
      ),
      cancel: true,
    });
    onOpen();

    setTimeout(() => {
      setModalFields({
        header: "Receipt Generated",
        body: (
          <div className="flex flex-col items-center gap-10">
            <p>
              Scan the QR Code below or tap our NFC to retrieve your receipt!
            </p>
            <Image src="/qr.svg" alt="QR Code" width={1000} />
          </div>
        ),
        cancel: false,
        close: true,
      });
    }, 3000);
  };

  return (
    <main className="flex flex-col items-center justify-center py-10">
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {modalFields.header}
              </ModalHeader>
              <ModalBody className="flex flex-col gap-10">
                {modalFields.body}
              </ModalBody>
              <ModalFooter>
                {modalFields.cancel && (
                  <Button color="danger" onPress={onClose}>
                    Cancel
                  </Button>
                )}
                {modalFields.close && (
                  <Button color="primary" onPress={onClose}>
                    Done
                  </Button>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-4xl font-bold">
          <span className="text-accent">De</span>
          <span className="text-primary">Ceipt</span>
        </h1>
        <Card className="p-4">
          <CardHeader className="text-2xl font-bold text-text">
            Receipt Data
          </CardHeader>
          <CardBody className="overflow-visible py-2">
            <table className="w-full text-text">
              <tbody>
                <tr>
                  <td className="font-bold">Order ID</td>
                  <td>101003200011361</td>
                </tr>
                <tr>
                  <td className="font-bold">Date</td>
                  <td>03/07/2024</td>
                </tr>
                <tr>
                  <td className="font-bold">Time</td>
                  <td>18:43:12</td>
                </tr>
                <tr>
                  <td className="font-bold">Amount</td>
                  <td>RM 42.00</td>
                </tr>
              </tbody>
            </table>
          </CardBody>
        </Card>
        <Card className="py-4">
          <CardBody className={`py-2 ${isExpanded ? "" : "max-h-[50vh]"}`}>
            <Image src="/receipt.jpg" alt="Receipt" width={300} />
          </CardBody>
          <CardFooter className="mt-2">
            <Button
              fullWidth
              color="secondary"
              className="mx-4"
              endContent={isExpanded ? <FaCompressAlt /> : <FaExpandAlt />}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Hide Receipt" : "Show Full Receipt"}
            </Button>
          </CardFooter>
        </Card>
        <Button fullWidth color="primary" size="lg" onClick={generateReceipt}>
          Generate Receipt
        </Button>
      </div>
    </main>
  );
}
