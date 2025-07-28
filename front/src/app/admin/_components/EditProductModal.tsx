import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import ImageGalleryModal from "@/app/admin/_components/ImageGalleryModal";

type Props = {
  open: boolean;
  onClose: () => void;
  product: Product | null;
  onSave: (updated: Product) => void;
};

export default function EditProductModal({
  open,
  onClose,
  product,
  onSave,
}: Props) {
  const [temp, setTemp] = useState<Product | null>(product);
  useEffect(() => {
    setTemp(product);
  }, [product]);

  if (!open || !temp) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-[600px] h-[600px] shadow-lg overflow-auto">
        <h2 className="text-lg font-bold mb-4">編輯商品</h2>
        <div className="space-y-3">
          <ImageGalleryModal />
          <Input
            className="border p-2 w-full"
            value={temp.name}
            onChange={(e) => setTemp({ ...temp, name: e.target.value })}
          />
          <Input
            className="border p-2 w-full"
            type="number"
            value={temp.price}
            onChange={(e) => setTemp({ ...temp, price: +e.target.value })}
          />
          <Textarea
            className="border p-2 w-full"
            value={temp.description}
            onChange={(e) => setTemp({ ...temp, description: e.target.value })}
          />
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={onClose}
            className=" px-4 py-1 rounded"
          >
            取消
          </Button>
          <Button
            onClick={() => {
              onSave(temp);
              onClose();
            }}
            className="  px-4 py-1 rounded"
          >
            儲存
          </Button>
        </div>
      </div>
    </div>
  );
}
