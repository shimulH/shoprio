import { Order } from "@/types/dashboard";

type OrderTableProps = { data: Order[] };

function statusClass(status: string) {
  if (status === "Paid" || status === "Fulfilled" || status === "Delivered") {
    return "bg-emerald-100 text-emerald-700";
  }

  if (status === "Pending" || status === "Unfulfilled" || status === "Not Shipped") {
    return "bg-amber-100 text-amber-700";
  }

  if (status === "Authorized" || status === "Shipped" || status === "Partially Fulfilled") {
    return "bg-sky-100 text-sky-700";
  }

  if (status === "Refunded" || status === "Partially Refunded" || status === "Voided") {
    return "bg-rose-100 text-rose-700";
  }

  return "bg-slate-100 text-slate-700";
}

export function OrderTable({ data }: OrderTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 px-4 py-3">
        <h3 className="font-semibold text-slate-900">Recent Orders</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-500">
            <tr>
              <th className="px-4 py-3 font-medium">Order</th>
              <th className="px-4 py-3 font-medium">Customer</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Financial</th>
              <th className="px-4 py-3 font-medium">Fulfillment</th>
              <th className="px-4 py-3 font-medium">Delivery</th>
              <th className="px-4 py-3 font-medium">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.map((order) => (
              <tr key={order.id} className="border-t border-slate-100">
                <td className="px-4 py-3 font-medium text-slate-800">{order.id}</td>
                <td className="px-4 py-3 text-slate-700">{order.customer}</td>
                <td className="px-4 py-3 text-slate-700">{order.date}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-1 text-xs ${statusClass(order.financialStatus)}`}>
                    {order.financialStatus}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-1 text-xs ${statusClass(order.fulfillmentStatus)}`}>
                    {order.fulfillmentStatus}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-1 text-xs ${statusClass(order.deliveryStatus)}`}>
                    {order.deliveryStatus}
                  </span>
                </td>
                <td className="px-4 py-3 font-medium text-slate-800">{order.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
