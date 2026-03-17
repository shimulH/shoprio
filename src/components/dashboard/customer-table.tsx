import { Customer } from "@/types/dashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/app-table";

type CustomerTableProps = {
  data: Customer[];
};

export function CustomerTable({ data }: CustomerTableProps) {
  return (
    <Card className="overflow-hidden bg-white shadow-sm">
      <CardHeader className="border-b border-slate-200 px-4 py-3">
        <CardTitle className="text-sm font-semibold text-slate-900">
          Customers
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell className="font-medium text-slate-800">
                    {customer.name}
                  </TableCell>
                  <TableCell className="text-slate-700">
                    {customer.email}
                  </TableCell>
                  <TableCell className="text-slate-700">
                    {customer.orders}
                  </TableCell>
                  <TableCell className="font-medium text-slate-800">
                    {customer.spent}
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
