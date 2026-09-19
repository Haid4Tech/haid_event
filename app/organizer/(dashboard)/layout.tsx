import { OrganizerSidebar } from "@/components/organizer/sidebar";

export default function OrganizerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <OrganizerSidebar />
      <main className="flex-1 overflow-x-hidden p-6 sm:p-8">{children}</main>
    </div>
  );
}
