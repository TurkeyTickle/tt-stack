import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

function Autocomplete() {
  const [value] = useState("");

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">{value}</Button>
      </PopoverTrigger>

      <Input />
    </Popover>
  );
}

export default Autocomplete;
