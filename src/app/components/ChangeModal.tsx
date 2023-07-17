import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { Input, Modal, Select } from "@mantine/core";

interface ChangeModalProps {
  opened: boolean;
  open: () => void;
  close: () => void;
  isChangeEmail?: boolean;
  setEmail: (dto: string) => void;
  setpayment: (dto: any) => void;
}

interface EmailValues {
  email: string;
}
export interface PaymentValues {
  cardType: string;
  cardNumber: string;
  month: string;
  year: string;
}

const ChangeModal: FC<ChangeModalProps> = ({
  open,
  opened,
  close,
  isChangeEmail,
  setEmail,
  setpayment,
}) => {
  const { register, handleSubmit, formState, reset } = useForm<EmailValues>();
  const {
    register: registPayment,
    handleSubmit: handlePayment,
    formState: paymentFormState,
    reset: paymentReset,
  } = useForm<PaymentValues>();
  const { errors, isDirty, isValid, isSubmitting } = formState;
  const [cardType, setCardType] = useState<string | null>(null);
  const {
    errors: paymentErrors,
    isDirty: paymentIsDirty,
    isValid: paymentIsValid,
    isSubmitting: paymentIsSubmitting,
  } = paymentFormState;

  const handleCardType = (value: string) => {
    setCardType(value);
  };

  const submitEmail = (values: EmailValues) => {
    setEmail(values.email);
    close();
    reset();
  };
  const submitPayment = (values: PaymentValues) => {
    setpayment(values);
    close();
    paymentReset();
  };

  const ChangeEmail = () => (
    <form onSubmit={handleSubmit(submitEmail)}>
      <div className="text-lg font-lekton font-bold">
        <Input.Wrapper id="name" error={errors.email?.message}>
          <Input
            radius="lg"
            size="md"
            placeholder="Reminder Email"
            defaultValue={"pelumi.al@gmail.com"}
            {...register("email", {
              required: {
                value: true,
                message: "email is required",
              },
            })}
            error={errors.email?.message && errors.email.message.length > 0}
          />
        </Input.Wrapper>
      </div>
      <div className="text-lg font-lekton font-bold flex flex-row items-center justify-center my-5">
        <button
          className={`text-center p-1 px-6 rounded-3xl ${
            !isDirty || !isValid || isSubmitting
              ? "ring ring-gray-300 bg-gray-300 text-gray-400"
              : "ring ring-green-400 bg-green-400 text-white"
          } `}
          disabled={!isDirty || !isValid || isSubmitting}
        >
          Change
        </button>
      </div>
    </form>
  );

  const ChangePayment = () => (
    <form onSubmit={handlePayment(submitPayment)}>
      <div className="text-lg font-lekton font-bold mb-3">
        <Input.Wrapper
          id="cardType"
          label="Select Card Type"
          error={paymentErrors.cardType?.message}
        >
          <div className="">
            {
              //@ts-ignore
              <Select
                size="md"
                radius="lg"
                defaultValue="Mastercard"
                {...registPayment("cardType", {
                  required: {
                    value: true,
                    message: "cardType is required",
                  },
                })}
                data={[
                  { value: "Mastercard", label: "Mastercard" },
                  {
                    value: "Visacard",
                    label: "Visacard",
                  },
                ]}
              />
            }
          </div>
        </Input.Wrapper>
      </div>
      <div className="text-lg font-lekton font-bold mb-3">
        <Input.Wrapper
          label="Enter Card Number"
          id="cardNumber"
          error={paymentErrors.cardNumber?.message}
        >
          <Input
            radius="lg"
            size="md"
            placeholder="5999 5467 8932 2341"
            {...registPayment("cardNumber", {
              required: {
                value: true,
                message: "card number is required",
              },
            })}
            error={
              paymentErrors.cardNumber?.message &&
              paymentErrors.cardNumber.message.length > 0
            }
          />
        </Input.Wrapper>
      </div>
      <div className="mb-5 flex flex-row items-center gap-4">
        <div className="text-lg font-lekton font-bold">
          <Input.Wrapper
            label="Expiry Month"
            id="month"
            error={paymentErrors.month?.message}
          >
            <Input
              radius="lg"
              size="md"
              placeholder="2"
              {...registPayment("month", {
                required: {
                  value: true,
                  message: "month is required",
                },
              })}
              error={
                paymentErrors.month?.message &&
                paymentErrors.month.message.length > 0
              }
            />
          </Input.Wrapper>
        </div>
        <div className="text-lg font-lekton font-bold">
          <Input.Wrapper
            label="Expiry Year"
            id="year"
            error={paymentErrors.year?.message}
          >
            <Input
              radius="lg"
              size="md"
              placeholder="25"
              {...registPayment("year", {
                required: {
                  value: true,
                  message: "year is required",
                },
              })}
              error={
                paymentErrors.year?.message &&
                paymentErrors.year.message.length > 0
              }
            />
          </Input.Wrapper>
        </div>
      </div>

      <div className="text-lg font-lekton font-bold flex flex-row items-center justify-center my-5">
        <button
          className={`text-center p-1 px-6 rounded-3xl ${
            !paymentIsDirty || !paymentIsValid || paymentIsSubmitting
              ? "ring ring-gray-300 bg-gray-300 text-gray-400"
              : "ring ring-green-400 bg-green-400 text-white"
          } `}
          disabled={!paymentIsDirty || !paymentIsValid || paymentIsSubmitting}
        >
          Change
        </button>
      </div>
    </form>
  );

  return (
    <Modal opened={opened} onClose={close} size="md" radius="md" centered>
      <div className="flex flex-row items-center justify-center font-semibold">
        {isChangeEmail ? "Change Email" : "make Payment"}
      </div>
      <div className="mt-5 px-4 ">
        {isChangeEmail ? <ChangeEmail /> : <ChangePayment />}
      </div>
    </Modal>
  );
};

export default ChangeModal;
