"use client";

import { getOrders } from "@/apis/order";
import { useEffect, useState } from "react";
import { Order } from "@/types/orders";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { snapshotMapper } from "@/utils/snapshotMapper";

export default function OrderPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const getUserOrders = async () => {
    const { content } = await getOrders();
    console.log(typeof content[0].snapshot);
    console.log(snapshotMapper(content[0].snapshot));
    setOrders(content);
  };

  useEffect(() => {
    void getUserOrders();
  }, []);

  const statusMap = {
    PENDING: "未出貨",
    SHIPPED: "已出貨",
    CANCEL: "取消",
  };

  return (
    <div className="m-3 mx-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px]">編號</TableHead>
            <TableHead className="w-[200px]">快照</TableHead>
            <TableHead>總金額</TableHead>
            <TableHead>狀態</TableHead>
          </TableRow>
        </TableHeader>
        {orders &&
          orders.map((order) => (
            <TableBody key={order.id}>
              <TableRow>
                <TableCell>{order.id}</TableCell>
                <TableCell>
                  {snapshotMapper(order.snapshot).map((item, index) => {
                    return (
                      <div key={index}>
                        <span>{item.name}</span>
                        <span>，{item.quantity}個</span>
                      </div>
                    );
                  })}
                </TableCell>
                <TableCell>{order.total}</TableCell>
                <TableCell>
                  {statusMap[order.status as keyof typeof statusMap]}
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
      </Table>
    </div>
  );
}
