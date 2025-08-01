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
import { Order, SnapshotItem } from "@/types/orders";
import { snapshotMapper } from "@/utils/snapshotMapper";
import { getOrders } from "@/apis/order";

const fakeOrders = [
  {
    id: "ORD-202507250001",
    customer: "王小明",
    snapshot: JSON.stringify([
      { name: "蔘茸補氣湯", quantity: 2, price: 250 },
      { name: "健脾丸", quantity: 1, price: 180 },
    ]),
    total: 680,
    status: "PENDING",
    comments: "",
  },
  {
    id: "ORD-202507250002",
    customer: "陳美華",
    snapshot: JSON.stringify([
      { name: "舒壓茶包", quantity: 3, price: 120 },
      { name: "養肝丸", quantity: 1, price: 300 },
    ]),
    total: 660,
    status: "SHIPPED",
    comments: "",
  },
  {
    id: "ORD-202507250003",
    customer: "李志強",
    snapshot: JSON.stringify([
      { name: "保健花粉", quantity: 1, price: 450 },
      { name: "安神湯劑", quantity: 2, price: 200 },
    ]),
    total: 850,
    status: "SHIPPED",
    comments: "",
  },
  {
    id: "ORD-202507250004",
    customer: "林佳欣",
    snapshot: JSON.stringify([{ name: "潤肺膏", quantity: 1, price: 380 }]),
    total: 380,
    status: "CANCELED",
    comments: "",
  },
  {
    id: "ORD-202507250005",
    customer: "張耀仁",
    snapshot: JSON.stringify([
      { name: "提神丸", quantity: 2, price: 150 },
      { name: "舒壓茶包", quantity: 1, price: 120 },
    ]),
    total: 420,
    status: "PENDING",
    comments: "",
  },
];

const statusMap = {
  PENDING: "未出貨",
  SHIPPED: "已出貨",
  CANCELED: "取消",
};

export default function OrderManagePage() {
  useEffect(() => {
    getOrders().then((res) => {
      console.log(res);
    });
  }, []);
  const [orders, setOrders] = useState<Order[]>(fakeOrders);
  const [editing, setEditing] = useState<Order | null>(null);
  const [open, setOpen] = useState(false);
  const handleModal = (order: Order) => {
    setEditing(order);
    setOpen(true);
  };

  const handleSave = (updated: Order) => {
    setOrders(orders.map((o) => (o.id === updated.id ? updated : o)));
  };
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
          {fakeOrders.map((order) => (
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
