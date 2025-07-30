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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { productAddApi, productListApi } from "@/apis/product";
import { Product } from "@/types/product";
import EditProductModal from "@/app/admin/_components/EditProductModal";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function ProductManagePage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [main, setMain] = useState<File | null>(null);
  const [photos, setPhotos] = useState<File[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const fakeType = new Map<string, string>([
    ["1", "AA"],
    ["2", "BB"],
    ["3", "CC"],
  ]);
  fakeType.set("4", "DD");

  // 新增商品api
  const handleAddProduct = async () => {
    try {
      const res = await productAddApi(
        name,
        description,
        category,
        price,
        quantity,
      );
      if (res.success) {
        toast.success("新增成功");
      }
    } catch (error) {
      console.log(error);
      toast.error("新增失敗");
    }
  };

  useEffect(() => {
    productListApi().then((res) => {
      console.log(res);
      setProducts(res.content);
    });
  }, []);

  // const [products, setProducts] = useState<Product[]>(fakeProducts);
  const [editing, setEditing] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleEdit = (item: Product) => {
    setEditing(item);
    setModalOpen(true);
  };

  const handleSave = (updated: Product) => {
    setProducts(products.map((p) => (p.name === updated.name ? updated : p)));
  };
  return (
    <div className="ml-[2vw] max-w-[80vw]">
      <Table className="border-t border-gray-300 ">
        <TableHeader className="">
          <TableRow>
            <TableHead>
              <div>商品名稱</div>
            </TableHead>
            <TableHead>
              <div className="w-16">商品金額</div>
            </TableHead>
            <TableHead>
              <div className="w-30">商品分類</div>
            </TableHead>
            <TableHead>
              <div className="w-55">商品分類</div>
            </TableHead>
            <TableHead>
              <div className="w-16">商品數量</div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/*新增列*/}
          <TableRow>
            {/*品名*/}
            <TableCell>
              <Input
                type="text"
                placeholder="請輸入商品名稱"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </TableCell>
            {/*價錢*/}
            <TableCell>
              <Input
                type="number"
                min="0"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
              />
            </TableCell>
            {/*分類*/}
            <TableCell>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="選擇分類" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>分類</SelectLabel>
                    {[...fakeType.entries()].map((item, key) => (
                      <SelectItem key={key} value={item[0]}>
                        {item[1]}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </TableCell>
            {/*說明*/}
            <TableCell>
              <Textarea
                value={description}
                onChange={(e) => {
                  setDescription(e.target.value);
                }}
              ></Textarea>
            </TableCell>
            {/*數量*/}
            <TableCell>
              <Input
                type="number"
                min="0"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </TableCell>
            <TableCell>
              <Button
                onClick={() => {
                  handleAddProduct();
                  console.log(main);
                  console.log(photos);
                }}
              >
                新增
              </Button>
            </TableCell>
          </TableRow>
          {/*資料列*/}
          {products.map((item, key) => (
            <TableRow key={key}>
              <TableCell className="w-[100%]">{item.name}</TableCell>
              <TableCell className="w-[100%]">{item.price}</TableCell>
              <TableCell className="w-[100%]">
                {fakeType.get(item.categoryId)}
              </TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell className="w-[100%]">{item.quantity}</TableCell>
              <TableCell className="w-[100%]">
                <Button onClick={() => handleEdit(item)}>編輯</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <EditProductModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        product={editing}
        onSave={handleSave}
      />
    </div>
  );
}
