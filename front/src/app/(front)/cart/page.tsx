"use client";
import { useCartStore } from "@/stores/cartStore";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { getProductNameById } from "@/apis/product";
import { makeImageUrl } from "@/utils/urlHelper";
import Image from "next/image";
import { Product } from "@/types/product";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { createOrder } from "@/apis/order";
import { toast } from "sonner";

type Snapshot = {
  productId: string;
  productName: string;
  quantity: number;
  imageIds: string[];
};

export default function Cart() {
  const { items, set } = useCartStore();
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);
  const [productIds, setProductIds] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [targetId, setTargetId] = useState("");

  useEffect(() => {
    if (items.length === 0) return;
    // STEP1 抽取items裡面的每個productId，組成新的ids陣列
    const ids = items.map((item) => item.productId);
    // STEP2 如果初始值包含ids內的所有id代表沒有改變，就回傳原陣列，否則回傳ids作為新值
    setProductIds((prev) => {
      if (ids.every((id) => prev.includes(id))) return prev;
      return ids;
    });
  }, [items]);

  useEffect(() => {
    if (productIds.length === 0) return;
    // STEP3 當productIds發生改變時，發送API取得商品詳情
    const getProducts = async () => {
      const { content: products } = await getProductNameById(productIds);
      setProducts(products);
    };
    void getProducts();
  }, [productIds]);

  useEffect(() => {
    const getSnapshots = async () => {
      const snapshot: Snapshot[] = [];
      // STEP4 映射items為顯示所需的購物車物件
      for (const item of items) {
        const find = products.find((product) => product.id === item.productId);
        if (!find) continue;
        const snapshotItem: Snapshot = {
          productId: item.productId,
          productName: find.name,
          quantity: item.quantity,
          imageIds: find.imageIds,
        };
        snapshot.push(snapshotItem);
      }
      setSnapshots(snapshot);
    };
    void getSnapshots();
  }, [products, items]);

  const submitOrder = async () => {
    try {
      await createOrder(snapshots);
      setSnapshots([]);
    } catch (e) {
      if (e instanceof Error) toast.error(e.message);
      return;
    }
  };

  if (snapshots.length === 0) {
    return <div className="mt-[50px]">購物車內還沒有任何商品！</div>;
  }
  return (
    <div className="mt-[50px]">
      <ul className="flex gap-5">
        {snapshots.map((item, index) => (
          <li key={index} className="m-5">
            <Image
              src={makeImageUrl(item.imageIds[0])}
              width={200}
              height={200}
              alt=""
            />
            <p>商品名稱：{item.productName}</p>
            <p>
              數量：
              <Input
                type="number"
                value={item.quantity}
                onChange={(e) => {
                  const newQuantity = Number(e.target.value);
                  if (newQuantity === 0) {
                    setTargetId(item.productId);
                  } else {
                    set(item.productId, newQuantity);
                  }
                }}
              />
            </p>
            <Button
              onClick={() => {
                setTargetId(item.productId);
              }}
            >
              刪除商品
            </Button>
          </li>
        ))}
      </ul>
      <Button
        onClick={() => {
          submitOrder();
        }}
      >
        確認購買
      </Button>
      <Dialog
        open={targetId !== ""}
        onOpenChange={(open) => {
          if (!open) {
            setTargetId("");
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>是否要移除此商品？</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => {
                setTargetId("");
              }}
            >
              取消
            </Button>
            <Button
              onClick={() => {
                set(targetId, 0);
                setTargetId("");
              }}
            >
              確定
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
