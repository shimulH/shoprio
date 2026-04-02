import { Sidebar } from "@/components/dashboard/sidebar";
import { Topbar } from "@/components/dashboard/topbar";
import { InboxWorkspace } from "@/components/inbox/inbox-workspace";
import { conversations } from "@/data/mock-store";

export default function InboxPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="flex w-full">
        <Sidebar />
        <main className="flex min-h-screen flex-1 flex-col">
          <Topbar />
          <section
            className="flex flex-1 p-5 lg:p-8"
            style={{ height: "calc(100vh - 73px)" }}
          >
            <InboxWorkspace initialConversations={conversations} />
          </section>
        </main>
      </div>
    </div>
  );
}
