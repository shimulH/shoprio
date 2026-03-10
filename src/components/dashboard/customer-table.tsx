import { Customer } from "@/types/dashboard";

type CustomerTableProps = {
  data: Customer[];
};

export function CustomerTable({ data }: CustomerTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-4 py-3">
        <h3 className="font-semibold text-slate-900">Customers</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Email</th>
              <th className="px-4 py-3 font-medium">Orders</th>
              <th className="px-4 py-3 font-medium">Total Spent</th>
            </tr>
          </thead>
          <tbody>
            {data.map((customer) => (
              <tr key={customer.id} className="border-t border-slate-100">
                <td className="px-4 py-3 font-medium text-slate-800">{customer.name}</td>
                <td className="px-4 py-3 text-slate-700">{customer.email}</td>
                <td className="px-4 py-3 text-slate-700">{customer.orders}</td>
                <td className="px-4 py-3 font-medium text-slate-800">{customer.spent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
