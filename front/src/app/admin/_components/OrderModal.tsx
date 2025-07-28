"use client";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Order } from "@/types/orders";
import { useEffect, useState } from "react";
import { snapshotMapper } from "@/utils/snapshotMapper";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  open: boolean;
  onCloseAction: () => void;
  order: Order;
  onSaveAction: (update: Order) => void;
};

export default function OrderModal({
  open,
  onCloseAction,
  order,
  onSaveAction,
}: Props) {
  const [temp, setTemp] = useState<Order | null>(order);
  useEffect(() => {
    setTemp(order);
  }, [order]);
  if (!open || !temp) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center ">
      <div className="bg-white p-6 rounded-lg w-[600px] h-[600px] shadow-lg overflow-auto">
        <h2 className="text-lg font-bold mb-4">訂單詳情</h2>
        <p>編號：{temp.id}</p>
        <hr className="m-1" />
        <div>訂購人名稱：{temp.customer}</div>
        <hr className="m-1" />
        <div>
          訂單詳情：
          <div className="rounded-md m-2 p-2">
            {snapshotMapper(temp.snapshot).map((item, index) => {
              return (
                <div key={index}>
                  <p>
                    {item.name}，單價：{item.price}，數量：{item.quantity}。
                  </p>
                  <p></p>
                </div>
              );
            })}
          </div>
        </div>
        <p>總金額：{temp.total}元</p>
        <hr className="m-1" />
        <div className="flex justify-between">
          <div>訂單狀態：{temp.status}</div>
          <Label htmlFor="status">
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="訂單狀態" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>狀態選擇</SelectLabel>
                  <SelectItem value="PENDING">未出貨</SelectItem>
                  <SelectItem value="SHIPPED">已出貨</SelectItem>
                  <SelectItem value="CANCELED">取消</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </Label>
        </div>
        <hr className="m-1" />
        <div className="space-y-3">
          <Label htmlFor="comment">商家備註</Label>
          <Textarea
            id="comment"
            className="border p-2 w-full"
            value={temp.comments === null ? "" : temp.comments}
            onChange={(e) => {
              setTemp({ ...temp, comments: e.target.value });
            }}
          />
        </div>
        <div className="mt-4 flex justify-end gap-">
          <Button
            variant="outline"
            className="px-4 py-1 rounded"
            onClick={() => {
              onCloseAction();
            }}
          >
            取消
          </Button>
          <Button
            className="px-4 py-1 rounded"
            onClick={() => {
              onSaveAction(temp);
              onCloseAction();
            }}
          >
            儲存
          </Button>
        </div>
      </div>
    </div>
  );
}
