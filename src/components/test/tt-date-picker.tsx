import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { FormControl } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { SelectSingleEventHandler } from "react-day-picker";
import { CalendarIcon } from "lucide-react";

interface Props {
    value?: Date,
    onChange: SelectSingleEventHandler,
    dateFormat?: string,
}

function TTDatePicker({ value, onChange, dateFormat }: Props) {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <FormControl>
                <Button
                    variant={"outline"}
                    className={cn(
                    "w-full pl-3 text-left font-normal",
                    !value && "text-muted-foreground"
                    )}
                >
                    {value ? (
                    format(value, dateFormat ?? 'PPP')
                    ) : (
                    <span>Pick a date</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
                </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                mode="single"
                selected={value}
                onSelect={onChange}
                disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                }
                initialFocus
                />
            </PopoverContent>
        </Popover>
    );
}

export default TTDatePicker;