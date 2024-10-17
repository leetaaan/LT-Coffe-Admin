import { getGraphTotalRevenue } from "@/actions/get-graph-total-revenue";
import { getOrderTotalRevenueByCategory } from "@/actions/get-graph-total-revenue -by-category";
import { getOrderPaymentStatusTotalRevenue } from "@/actions/get-graph-total-revenue -by-order-status";
import { getOrderStatusTotalRevenue } from "@/actions/get-graph-total-revenue-by-order-status";
import { getTotalProducts } from "@/actions/get-total-products";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import { getTotalSales } from "@/actions/get-total-sales";
import { Heading } from "@/components/heading";
import Overview from "@/components/overview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatter } from "@/lib/utils";

interface DashBoardOverviewProps {
  params: { storeId: string };
}
const DashBoardOverview = async ({ params }: DashBoardOverviewProps) => {
  const totalRevenue = await getTotalRevenue(params.storeId);
  const totalSales = await getTotalSales(params.storeId);
  const totalProducts = await getTotalProducts(params.storeId);

  const  monthlyGraphRevenue = await getGraphTotalRevenue(params.storeId)
  const  orderPaymentStatusRevenue = await getOrderPaymentStatusTotalRevenue(params.storeId)
  const revenueByCategory = await getOrderTotalRevenueByCategory(params.storeId)
  const revenueByOrderStatus = await getOrderStatusTotalRevenue(params.storeId)

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Heading title="Dashboard" description="Overview of your store" />
        <Separator />
        <div className="grid gap-4 grid-cols-4">
          <Card className="col-span-2">
            <CardHeader className="flex items-center justify-between flex-row">
              <CardTitle className="text-sm font-medium">
                Total revenue
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {formatter.format(totalRevenue)}
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardHeader className="flex items-center justify-between flex-row">
              <CardTitle className="text-sm font-medium">Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{totalSales}</div>
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardHeader className="flex items-center justify-between flex-row">
              <CardTitle className="text-sm font-medium">Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+{totalProducts}</div>
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader className="flex items-center justify-between flex-row">
              <CardTitle className="text-sm font-medium">
                Revenue by month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Overview data={monthlyGraphRevenue} />
            </CardContent>
          </Card>
          <Card className="col-span-1">
            <CardHeader className="flex items-center justify-between flex-row">
              <CardTitle className="text-sm font-medium">
                Revenue by payment status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Overview data={orderPaymentStatusRevenue} />
            </CardContent>
          </Card>

          <Card className="col-span-2">
            <CardHeader className="flex items-center justify-between flex-row">
              <CardTitle className="text-sm font-medium">
                Revenue by category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Overview data={revenueByCategory} />
            </CardContent>
          </Card>
          <Card className="col-span-2">
            <CardHeader className="flex items-center justify-between flex-row">
              <CardTitle className="text-sm font-medium">
                Revenue by order status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Overview data={revenueByOrderStatus} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DashBoardOverview;
