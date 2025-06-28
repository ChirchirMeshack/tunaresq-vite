import React, { useState } from "react";
import { Edit3, Check, ArrowLeft, ArrowRight } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import { Button } from "@components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@components/ui/card";
import { Step } from "@lib/progressUtils";
import { FundraiserData, useFundraiserTypeStore } from "stores/fundraiser-form";
import { cn } from "@lib/utils";

interface EditableFieldProps {
  label: string;
  value: string;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (value: string) => void;
  onCancel: () => void;
  multiline?: boolean;
}

const EditableField: React.FC<EditableFieldProps> = ({
  //label,
  value,
  isEditing,
  onEdit,
  onSave,
  onCancel,
  multiline = false,
}) => {
  const [editValue, setEditValue] = useState(value);

  const handleSave = () => {
    onSave(editValue);
  };

  const handleCancel = () => {
    setEditValue(value);
    onCancel();
  };

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
      <div className="flex justify-between items-start">
        <div className={cn("flex-1", isEditing && " overflow-y-auto max-h-[400px]")}>
          {isEditing ? (
            <div className="space-y-3">
              {multiline ? (
                <textarea
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none"
                  rows={4}
                />
              ) : (
                <input
                  type="text"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              )}
              <div className="flex gap-2">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors flex items-center gap-2"
                >
                  <Check size={16} />
                  Save
                </button>
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="text-gray-700">
              {multiline ? (
                <p className="whitespace-pre-wrap leading-relaxed overflow-y-auto max-h-[400px]">{value}</p>
              ) : (
                <p className="font-medium">{value}</p>
              )}
            </div>
          )}
        </div>
        {!isEditing && (
          <button
            onClick={onEdit}
            className="px-3 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors flex items-center gap-2 text-sm"
          >
            <Edit3 size={16} />
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default function SignupForm() {
  const { fundraiserType, setFundraiserType, fundraiserData, setFundraiserDetails } = useFundraiserTypeStore();
  
  const { setCurrentStep } = useOutletContext<{
    steps: Step[];
    currentStep: string;
    handleStepComplete: (stepId: string) => void;
    setCurrentStep: (stepId: string) => void;
  }>();

  const [paymentDetails, setPaymentDetails] = useState("Mobile Money");

  const [editingField, setEditingField] = useState<string | null>(null);

  const handleEdit = (field: string) => {
    setEditingField(field);
  };

  const handleSave = (field: string, value: string) => {
    switch (field) {
      case "type":
        setFundraiserType(value);
        break;
      case "details":
        setFundraiserDetails(value);
        break;
      case "payment":
        setPaymentDetails(value);
        break;
    }
    setEditingField(null);
  };

  const handleCancel = () => {
    setEditingField(null);
  };

  const handleBack = () => {
    setCurrentStep("payment-details");
  };
  function handleSubmitFundraiserData(
    fundraiserDetails: FundraiserData | null,
    fundraiserType: string | null,
    paymentDetails: string
  ): React.MouseEventHandler<HTMLButtonElement> {
    return (e) => {
      e.preventDefault();console.log("submitting fundraiser data", {
        fundraiserDetails,
        fundraiserType,
        paymentDetails
      });
      alert("fundraiser-launched");
    };
  }

  return (
    <div className=" md:w-full ">
      <section>
        <div className="p-2 sm:p-4 lg:p-8 flex items-center justify-center">
          <Card className="w-full max-w-3xl mx-auto p-4 sm:p-6 lg:p-8">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-semibold ">
                Review your fundraiser and launch
              </CardTitle>
              <CardDescription>
                Here's a preview of how your fundraiser will look. You can edit
                any section before launching.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 px-2 sm:px-4">
              <div className="space-y-8">
                {/* Fundraiser Type */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Fundraiser type
                  </h2>
                  <EditableField
                    label="Fundraiser Type"
                    value={fundraiserType || ""}
                    isEditing={editingField === "type"}
                    onEdit={() => handleEdit("type")}
                    onSave={(value) => handleSave("type", value)}
                    onCancel={handleCancel}
                  />
                </div>

                {/* Fundraiser Details */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Fundraiser details
                  </h2>
                  <EditableField
                    label="Fundraiser Details"
                    value={fundraiserData?.details || ""}
                    isEditing={editingField === "details"}
                    onEdit={() => handleEdit("details")}
                    onSave={(value) => handleSave("details", value)}
                    onCancel={handleCancel}
                    multiline={true}
                  />
                </div>

                {/* Payment Details */}
                <div>
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">
                    Payment details
                  </h2>
                  <EditableField
                    label="Payment Details"
                    value={paymentDetails}
                    isEditing={editingField === "payment"}
                    onEdit={() => handleEdit("payment")}
                    onSave={(value) => handleSave("payment", value)}
                    onCancel={handleCancel}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      <div className="w-full max-w-3xl sm:max-w-md md:max-w-3xl lg:max-w-3xl mx-auto px-2 sm:px-4 pb-6 flex flex-row justify-between gap-3 sm:gap-4 mt-2">
        <Button
          type="button"
          onClick={handleBack}
          variant="outline"
          className="w-[120px] md:w-[150px] rounded-lg border-gray-300 text-gray-700 hover:bg-gray-100 font-medium px-4 sm:px-6 py-2 flex items-center justify-center gap-2"
        >
          <ArrowLeft className="size-4 sm:size-5" />
          Back
        </Button>
        <Button
          type="button"
          onClick={handleSubmitFundraiserData(fundraiserData, fundraiserType, paymentDetails)}
          className="w-[120px] md:w-[150px] rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 sm:px-6 py-2 flex items-center justify-center gap-2"
        >
          Continue
          <ArrowRight className="size-4 sm:size-5" />
        </Button>
      </div>
    </div>
  );
}
