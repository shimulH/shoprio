"use client";
import {
  TextEditor as AdvanceEditor,
  PreviewEditor,
  VariantType,
} from "@marufme/react-text-editor";

type Props = {
  variant?: VariantType;
  placeholder?: string;
};

export default function TextEditor({
  placeholder = "Start typing your story...",
  variant = "simple",
  ...props
}: Props) {
  return (
    <AdvanceEditor
      {...props}
      variant={variant}
      // defaultValue={content}
      // onChange={setContent}
      // placeholder={placeholder}
      // height="400px"
    />
  );
}

export { PreviewEditor };
