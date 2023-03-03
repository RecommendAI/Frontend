import React from "react";
import type { Preference, Reasons } from "typings";

type Props = {
  title: string;
  reasons: Reasons | undefined;
  setPreferences: React.Dispatch<React.SetStateAction<Preference[]>>;
};

function ChooseReasons({ title, reasons, setPreferences }: Props) {
  const [selectedReasons, setSelectedReasons] = React.useState<string[]>([]);

  React.useEffect(() => {
    setPreferences((prev: Preference[]): Preference[] => {
      if (prev) {
        const index = prev.findIndex((p) => p.title === title);
        if (index !== -1) {
          return [
            ...prev.slice(0, index),
            { ...prev[index], reasons: selectedReasons },
            ...prev.slice(index + 1),
          ] as Preference[];
        }
        return [...prev, { title, reasons: selectedReasons }];
      }
      return [{ title, reasons: selectedReasons }];
    });
  }, [selectedReasons, title, setPreferences]);

  const toggleReasonSelection = (reason: string) => {
    if (selectedReasons.includes(reason)) {
      // If the reason is already selected, remove it from the selectedReasons array
      setSelectedReasons((prev) =>
        prev.filter((selected) => selected !== reason)
      );
    } else {
      // If the reason is not selected, add it to the selectedReasons array
      setSelectedReasons((prev) => [...prev, reason]);
    }
  };

  return (
    <>
      {reasons &&
        (reasons[title] as string[])?.map((reason, index) => (
          <button
            key={index}
            className={`mx-auto w-3/4 rounded-md bg-slate-100 p-3`}
            onClick={() => toggleReasonSelection(reason)}
          >
            {reason}
            {selectedReasons.includes(reason) && " ✔"}
          </button>
        ))}
    </>
  );
}

export default ChooseReasons;
