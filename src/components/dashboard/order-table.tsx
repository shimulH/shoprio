import { Order } from "@/types/dashboard";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/app-table";

type OrderTableProps = { data: Order[] };

function statusClass(status: string) {
  if (status === "Paid" || status === "Fulfilled" || status === "Delivered")
    return "bg-emerald-100 text-emerald-700 border-emerald-200";
  if (
    status === "Pending" ||
    status === "Unfulfilled" ||
    status === "Not Shipped"
  )
    return "bg-amber-100 text-amber-700 border-amber-200";
  if (
    status === "Authorized" ||
    status === "Shipped" ||
    status === "Partially Fulfilled"
  )
    return "bg-sky-100 text-sky-700 border-sky-200";
  if (
    status === "Refunded" ||
    status === "Partially Refunded" ||
    status === "Voided"
  )
    return "bg-rose-100 text-rose-700 border-rose-200";
  return "bg-slate-100 text-slate-700 border-slate-200";
}

export function OrderTable({ data }: OrderTableProps) {
  return (
    <Card className="overflow-hidden bg-white shadow-sm">
      <CardHeader className="border-b border-slate-200 px-4 py-3">
        <CardTitle className="text-sm font-semibold text-slate-900">
          Recent Orders
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Financial</TableHead>
                <TableHead>Fulfillment</TableHead>
                <TableHead>Delivery</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium text-slate-800">
                    {order.id}
                  </TableCell>
                  <TableCell className="text-slate-700">
                    {order.customer}
                  </TableCell>
                  <TableCell className="text-slate-700">{order.date}</TableCell>
                  <TableCell>
                    <Badge
                      className={statusClass(order.financialStatus)}
                      variant="outline"
                    >
                      {order.financialStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={statusClass(order.fulfillmentStatus)}
                      variant="outline"
                    >
                      {order.fulfillmentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={statusClass(order.deliveryStatus)}
                      variant="outline"
                    >
                      {order.deliveryStatus}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium text-slate-800">
                    {order.total}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
