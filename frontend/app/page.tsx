import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col h-[85dvh] ">
      <section className="flex items-center justify-center h-full w-full">
        <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-black dark:text-white">
          What can I help you with?
        </h3>
      </section>

      <section className="flex flex-row items-center justify-center mx-auto  w-full bottom-10 mb-10 gap-2 md:gap-5 px-2 md:px-0">
        <Input
          className=" w-full md:w-[60%] h-[60px] rounded-xl"
          height={160}
          placeholder="Enter your text here"
          aria-label="Type your prompt here"
        />
        <Button variant="outline" className="h-12 w-12">
          <Send className="w-10 h-10" />
        </Button>
      </section>
    </div>
  );
}
