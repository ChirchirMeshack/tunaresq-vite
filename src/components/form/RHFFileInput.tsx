import { Controller, useFormContext } from "react-hook-form";
import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { cn, trimText } from "@lib/utils";


interface MultiFilePickerFieldProps {
	name: string;
	label?: string;
}

interface FilePicked {
	preview: string;
	file: File;
	reference: string;
}

import { Input } from "@components/ui/input"; // Adjust the import path as needed
import { Label } from "@components/ui/label"; // Adjust the import path as needed

import { Upload, X, File } from "lucide-react"
import { Button } from "@components/ui/button"

const MultiFilePickerField = ({ name, label }: MultiFilePickerFieldProps) => {
	const { setValue, control, watch } = useFormContext();

	const watchedFiles = watch(name) as FilePicked[];

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			const files: FilePicked[] = [];

			acceptedFiles.forEach((file) => {
				files.push({
					file,
					preview: URL.createObjectURL(file),
					reference: file.name,
				});
			});

			const mergedFiles = [
				...new Map(
					[...watchedFiles, ...files].map((item) => [item.file, item])
				).values(),
			];

			setValue(name, mergedFiles);
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[name, setValue, JSON.stringify(watchedFiles)]
	);

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
	});

	const handleDeleteFile = (fileName: string) => {
		const filteredFiles = watchedFiles.filter(
			(file) => file.reference !== fileName
		);

		setValue(name, filteredFiles);
	};


	return (
		<Controller
			name={name}
			control={control}
			render={({ field: { value }, fieldState: { error } }) => {
				const files = value as FilePicked[];

				return (
				<div className="grid w-full items-center gap-1.5 md:min-h-[80px]">
                    {label && (
						<Label htmlFor={name}>{label}</Label>
					)}
                    <div className="space-y-3">
                        <div
                            className={cn(
                            "border-2 border-dashed rounded-lg p-6 text-center hover:bg-muted/50 transition-colors",
                            error && "border-red-500",
                            )}
                        >
                        <div
                            className={cn(
                                "cursor-pointer w-full border-2 border-dashed h-[50px] flex flex-col items-center justify-center rounded-lg hover:bg-[#f1f1f1] hover:text-white"
                            )}
                            {...getRootProps()}
                        >
                            <Input {...getInputProps()} />
                            <h6 className=" font-medium text-gray-500">Drag & drop file here</h6>
                        </div>
					
                    {/* Input Field */}
					{/* <Input
						id={name}
						{...field}
                        type="file"
              accept={accept}
              multiple={multiple}
						className={cn(className, error && "border-destructive")} // Apply error styling
						{...getInputProps()}
					/> */}
                    <Upload className="mx-auto h-8 w-8 text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground mb-2">Click to upload or drag and drop</p>
            <Button type="button" variant="outline" size="sm" >
              Choose Files
            </Button>
          </div>

          {files && files.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium">Selected files:</p>
              {Array.from(files).map((file, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted rounded-md">
                  <div className="flex items-center space-x-2">
                    <File className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{trimText(
											file?.file?.name ?? file?.reference,
											20
										)}</p>
                      {/* <p className="text-xs text-muted-foreground">{formatFileSize(file.)}</p> */}
                    </div>
                  </div>
                  <Button type="button" variant="ghost" size="sm" onClick={() => handleDeleteFile(
														file.reference
													)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

                    {/* Description or Error Message Container */}
                    {/* {description && !error && (
                        <p className="fileinput-sm fileinput-muted-foreground">
                            {description}
                        </p>
                    )} */}
                    {error && (
                        <p className="fileinput-sm font-medium fileinput-destructive">
                            {error.message}
                        </p>
                    )}
				</div>)
            }}
		/>
	);
};

export default MultiFilePickerField; 