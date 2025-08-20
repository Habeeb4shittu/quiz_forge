import * as React from "react"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

export function SelectOpt({
    placeholder,
    options,
    selected,
    setSelected,
}: {
    placeholder: string
    options: { value: string; label: string }[]
    selected: string | null
    setSelected: (value: string | null) => void
}) {
    return (
        <Select value={selected ?? ""} onValueChange={setSelected}>
            <SelectTrigger className="w-full cursor-pointer py-6">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>{placeholder}...</SelectLabel>
                    {options.map((option) => (
                        <SelectItem key={option.value} value={option.value} className="cursor-pointer text-md ">
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}
