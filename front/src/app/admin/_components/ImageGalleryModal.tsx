import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ImageGalleryModal() {
  const [images, setImages] = useState<string[]>([]);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleAddImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const file = files[0];
    const url = URL.createObjectURL(file);
    setImages((prev) => [...prev, url]);
    if (!mainImage) setMainImage(url);
  };

  const handleDelete = (index: number) => {
    const updated = images.filter((_, i) => i !== index);
    setImages(updated);
    if (mainImage === images[index]) {
      setMainImage(updated[0] || null);
    }
  };

  return (
    <div className="p-4 bg-white rounded-xl w-full max-w-[600px]">
      {/* Main Image */}
      <div className="w-full h-[300px] border mb-4 flex items-center justify-center">
        {mainImage ? (
          <Image
            width={300}
            height={400}
            alt="2222"
            src={mainImage}
            className="object-contain h-full"
          />
        ) : (
          <span className="text-gray-400">尚未選擇圖片</span>
        )}
      </div>

      {/* Thumbnail Carousel */}
      <div className="flex gap-2 overflow-x-auto">
        {images.map((img, idx) => (
          <div key={idx} className="relative group">
            <Image
              width={300}
              height={400}
              alt="ddd"
              src={img}
              onClick={() => setMainImage(img)}
              className={`h-20 w-20 object-cover border-2 cursor-pointer ${
                mainImage === img ? "border-blue-500" : "border-gray-300"
              }`}
            />
            <Button
              onClick={() => handleDelete(idx)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 text-xs hidden group-hover:block"
            >
              ✕
            </Button>
          </div>
        ))}
      </div>

      {/* Upload Button */}
      <div className="mt-4">
        <Input
          className="hidden"
          ref={fileRef}
          type="file"
          accept="image/*"
          onChange={handleAddImage}
        />
        <Button
          onClick={() => {
            fileRef.current?.click();
          }}
        >
          選擇檔案
        </Button>
      </div>
    </div>
  );
}
