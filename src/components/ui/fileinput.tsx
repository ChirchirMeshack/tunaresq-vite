// import { Icon } from "@iconify/react/dist/iconify.js";
// import { trimText } from "@lib/utils";
import clsx from "clsx";
import { ImagePlus } from "lucide-react";
import { ChangeEvent, useEffect } from "react";
import { useFormContext, useWatch } from "react-hook-form";

interface DocumentFieldProps {
  label: string;
  name: string;
  className?: string;
  isDisabled?: boolean;
  acceptedTypes?: string;
  description?: string;
}

const DocumentField = ({
  label,
  name,
  className,
  isDisabled,
  description,
  acceptedTypes = "application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,text/plain, application/pdf, image/jpeg, image/png",
}: DocumentFieldProps) => {
  const { control, setValue, getValues } = useFormContext();

  const watchedValue = useWatch({ name, control });
//   const docLink = watchedValue?.preview;
//   const docRef = watchedValue?.reference;
//   const document: File | undefined = watchedValue?.file;

//   const { isValid, loading } = useFileValidation(docLink);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (!file) return;

    const allowedTypes = acceptedTypes.split(",").map((type) => type.trim());
    if (!allowedTypes.includes(file.type)) {
      alert(`The file type ${file.type} is not allowed. Please upload a valid file.`);
      return;
    }

    const preview = URL.createObjectURL(file);
    setValue(
      name,
      { preview, file: file, reference: file.name },
      { shouldDirty: true, shouldValidate: true }
    );
  };

  useEffect(() => {
    return () => {
      const link = getValues(name)?.preview;
      if (link) URL.revokeObjectURL(link);
    };
  }, [getValues, name]);

  return (
    // <section>
    //   <Subtitle className="text-sm mb-1 text-neutral-400">{label}</Subtitle>

    //   <div className="space-y-1">
    //     <Button
    //       className={clsx(
    //         "flex items-center flex-col justify-center w-full h-[60px]",
    //         className,
    //         !!watchedValue?.error && "border-danger-500 border-1"
    //       )}
    //       as="label"
    //       htmlFor={name + "document" + "picker"}
    //       variant="faded"
    //       isDisabled={isDisabled}
    //     >
    //       <Icon icon="clarity:upload-cloud-line" />
    //       <Subtitle2>Choose file</Subtitle2>
    //     </Button>

    //     {document && (
    //       <Link
    //         href={docLink}
    //         isExternal
    //         showAnchorIcon
    //         className="my-2"
    //         color="foreground"
    //         underline="always"
    //       >
    //         <Paragraph className="text-sm">{trimText(document.name, 25) ?? "Document"}</Paragraph>
    //       </Link>
    //     )}

    //     {!document && docLink && (
    //       <>
    //         {loading && (
    //           <Paragraph className="text-sm italic text-default-500">
    //             Validating file... <Spinner size="sm" />
    //           </Paragraph>
    //         )}
    //         {!loading && isValid && (
    //           <Link
    //             href={docLink}
    //             isExternal
    //             showAnchorIcon
    //             className="my-2"
    //             color="foreground"
    //             underline="always"
    //           >
    //             <Paragraph className="text-sm">
    //               {trimText(docRef, 25) ?? trimText(getFileNameFromUrl(docLink), 25) ?? "Document"}
    //             </Paragraph>
    //           </Link>
    //         )}
    //         {!loading && isValid === false && (
    //           <Paragraph className="text-sm text-danger-500 italic my-2">
    //             ⚠️ This file is missing or broken. Please upload again.
    //           </Paragraph>
    //         )}
    //       </>
    //     )}
    //   </div>

    //   {!!watchedValue?.error && (
    //     <Subtitle className="text-xs mt-1 text-danger-500">Please select a document</Subtitle>
    //   )}

    //   <input
    //     className="hidden"
    //     id={name + "document" + "picker"}
    //     type="file"
    //     onChange={handleChange}
    //     disabled={isDisabled}
    //     accept={acceptedTypes}
    //   />
    // </section>
    <div className="border rounded-lg p-0 sm:p-4 flex flex-col items-center text-center  min-h-[220px] justify-center relative overflow-hidden">
      <label  
      className={clsx("block text-sm font-medium mb-1 w-full text-left px-4 pt-4 sm:pt-0 sm:px-0",
            className,
            !!watchedValue?.error && "border-danger-500 border-1"
          )} >{label}</label>
      <div className="flex flex-col items-center justify-center w-full h-full flex-1 py-6">
        <ImagePlus size={40} className="mx-auto mb-2" />
        <span className="font-medium text-base  mb-1">Upload an image</span>
        <span className="text-xs text-[#bdbdbd] mb-1">{description}</span>
        <input
          id={name + "document" + "picker"}
          type="file"
          className="hidden"
        onChange={handleChange}
        disabled={isDisabled}
        accept={acceptedTypes}
        />
        <span className="text-xs">
          <label htmlFor={name + "document" + "picker"} className="text-blue-600 underline cursor-pointer font-medium">Click to upload file</label>
          <span className="hidden md:inline"> or drag and drop here.</span>
        </span>
        <span className="text-xs text-[#bdbdbdbd] mt-2">maximum file size 15MB</span>
      </div>
    </div>
  );
};

export default DocumentField;
