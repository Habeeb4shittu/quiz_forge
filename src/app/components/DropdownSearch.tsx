"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

export function SearchableDropdown({ options, selected, setSelected }: { options?: { value: string; label: string }[], selected?: string | null, setSelected?: (value: string | null) => void }) {
    const [open, setOpen] = React.useState(false);
    const [search, setSearch] = React.useState(""); // track input for filtering

    // filter options based on search input
    const filteredOptions = React.useMemo(() => {
        if (!options) return [];
        return options.filter((option) =>
            option.label.toLowerCase().includes(search.toLowerCase())
        );
    }, [options, search]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild className="h-12">
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between text-md"
                >
                    {selected
                        ? <span className="text-black">{options?.find((option) => option.value === selected)?.label}</span>
                        : <span className="text-gray-400">Select option...</span>}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0 max-h-[300px] thin-scrollbar overflow-y-auto">
                <Command>
                    <CommandInput
                        placeholder="Search option..."
                        value={search}
                        onValueChange={(val) => setSearch(val)} // update search state
                    />
                    <CommandEmpty>No option found.</CommandEmpty>
                    <CommandGroup>
                        {filteredOptions.map((option) => (
                            <CommandItem
                                key={option.value}
                                value={option.value}
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                onSelect={(currentValue: any) => {
                                    if (setSelected) {
                                        setSelected(currentValue === selected ? "" : currentValue);
                                    }
                                    setOpen(false);
                                }}
                                className="cursor-pointer flex items-center px-1 py-3 hover:bg-gray-100"
                            >
                                <Check
                                    className={cn(
                                        "h-4 w-4",
                                        selected === option.value ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                {option.label}
                            </CommandItem>
                        ))}
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}
