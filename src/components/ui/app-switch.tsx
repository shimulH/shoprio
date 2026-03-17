import React from "react";
import { Switch } from "./switch";
import { Label } from "./label";
import { cn } from "@buildd/utils";

interface Props {
  id?: string;
  label?: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

const AppSwitch: React.FC<Props> = ({
  id = "switch",
  label,
  checked,
  onCheckedChange,
}) => {
  return (
    <div className="flex items-center justify-between bg-slate-100 p-3 rounded-sm">
      <Label
        htmlFor={id}
        className={cn("text-slate-600", checked && "text-slate-900")}
      >
        {label}
      </Label>
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
};

export default AppSwitch;
