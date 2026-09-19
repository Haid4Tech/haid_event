import { notFound } from "next/navigation";
import { getEventById } from "@/lib/data";
import { Logo } from "@/components/logo";
import { ScanClient } from "./scan-client";

export default async function ScanEventPage(props: PageProps<"/scan/[id]">) {
  const { id } = await props.params;
  const event = getEventById(id);
  if (!event) notFound();

  return (
    <div className="mx-auto max-w-lg px-4 py-10 sm:px-6">
      <Logo />
      <div className="mt-6">
        <ScanClient event={event} />
      </div>
    </div>
  );
}
