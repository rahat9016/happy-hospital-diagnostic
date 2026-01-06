"use client";



import { ErrorType } from "@/src/types/common/common";
import { useFormContext } from "react-hook-form";
import { CategoryFormType } from "../Schema/Category";
import InputLabel from "@/src/components/shared/InputLabel";
import ControlledInputField from "@/src/components/shared/FromController/ControlledInputField";
import ControlledTextareaField from "@/src/components/shared/FromController/ControlledTextareaField";
import { ControlledCheckField } from "@/src/components/shared/FromController/ControlledCheckField";
import ErrorMessage from "@/src/components/shared/Errors/ErrorMessage";
import SubmitButton from "@/src/components/shared/SubmitButton";

export default function CategoryForm({
  isEditMode = false,
  onSubmit,
  error,
  isPending = false,
}: {
  isEditMode?: boolean;
  onSubmit: (data: CategoryFormType) => void;
  error?: ErrorType | null;
  isPending?: boolean;
}) {
  const methods = useFormContext<CategoryFormType>();

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} className="w-full">
      <div className="mb-4">
        <InputLabel label="Name" required />
        <ControlledInputField
          name="name"
          placeholder="Enter the category name..."
        />
      </div>
      <div className="mb-4">
        <InputLabel label="Description" />
        <ControlledTextareaField
          name="description"
          placeholder="Write the category description..."
        />
      </div>
      {isEditMode && (
        <div className="mb-4">
          <InputLabel label="Is Active" />
          <ControlledCheckField
            name="isActive"
            label="Active (Visible on website)"
          />
        </div>
      )}
      <ErrorMessage error={error} />
      <SubmitButton
        isLoading={isPending}
        label={isEditMode ? "Update" : "Create"}
      />
    </form>
  );
}
