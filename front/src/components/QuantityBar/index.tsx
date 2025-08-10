"use client";
import { toast } from "sonner";
import { useState } from "react";
import { useCartStore } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";

export default function QuantityBar({ productId }: { productId: string }) {
  const [quantity, setQuantity] = useState<number>(1);
  const subQuantity = () => {
    if (quantity <= 1) {
      return;
    }
    setQuantity(quantity - 1);
  };

  const { add } = useCartStore();

  return (
    <div className="flex gap-10">
      <div className="flex items-center mt-4 space-x-4">
        <Button
          onClick={subQuantity}
          className="w-8 h-8 flex items-center hover:bg-gray-600  justify-center rounded text-xl"
        >
          −
        </Button>
        <span className="w-8 text-center">{quantity}</span>
        <Button
          onClick={() => setQuantity(quantity + 1)}
          className="w-8 h-8 flex items-center hover:bg-gray-600 justify-center rounded text-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ＋
        </Button>
      </div>
      <Button
        className="w-20 h-8 mt-4 hover:bg-gray-600 "
        onClick={() => {
          add(productId, quantity);
          toast.success("加入成功");
        }}
      >
        加入購物車
      </Button>
    </div>
  );
}
