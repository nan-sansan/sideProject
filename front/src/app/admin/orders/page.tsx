"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import OrderModal from "@/app/admin/_components/OrderModal";
import { Order } from "@/types/orders";
import { snapshotMapper } from "@/utils/snapshotMapper";
import { getOrders } from "@/apis/order";

const statusMap = {
  PENDING: "未出貨",
  SHIPPED: "已出貨",
  CANCEL: "取消",
};

export default function OrderManagePage() {
  useEffect(() => {
    void getOrdersFunc();
  }, []);
  const [orders, setOrders] = useState<Order[]>([]);
  const [editing, setEditing] = useState<Order | null>(null);
  const [open, setOpen] = useState(false);
  const handleModal = (order: Order) => {
    setEditing(order);
    setOpen(true);
  };
  const getOrdersFunc = async () => {
    const { content } = await getOrders();
    setOrders(content);
  };

  const handleSave = (updated: Order) => {
    setOrders(orders.map((o) => (o.id === updated.id ? updated : o)));
  };

  if (orders.length === 0) return <div> 目前無訂單</div>;
  return (
    <>
      <h2 className="font-bold text-xl">訂單管理</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              <div className="font-bold">訂單編號</div>
            </TableHead>
            <TableHead>
              <div className="font-bold">訂購品項</div>
            </TableHead>
            <TableHead>
              <div className="font-bold">訂購金額</div>
            </TableHead>
            <TableHead>
              <div className="font-bold">訂單狀態</div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              {/*訂單編號*/}
              <TableCell className="w-[200px]">{order.id}</TableCell>
              {/*品項*/}
              <TableCell className="w-[300px]">
                {snapshotMapper(order.snapshot).map((item, index) => (
                  <p key={index}>
                    {item.name +
                      "，單價：" +
                      item.price +
                      "，數量 " +
                      item.quantity}
                  </p>
                ))}
              </TableCell>
              <TableCell>
                <p>總金額： ${order.total}</p>
              </TableCell>
              <TableCell>
                {statusMap[order.status as keyof typeof statusMap] ??
                  "未知狀態"}
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => {
                    handleModal(order);
                  }}
                >
                  詳細
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <OrderModal
        open={open}
        onCloseAction={() => setOpen(false)}
        order={editing!}
        onSaveAction={handleSave}
      />
    </>
  );
}
