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
import {
  deleteProductApi,
  getCategoriesListApi,
  productAddApi,
  getProductListByCategoryApi,
  updateProductApi,
} from "@/apis/product";
import { Category, Product } from "@/types/product";
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
  const [categories, setCategories] = useState<Category[]>([]);

  // 列表資料請求
  const loadData = async () => {
    const res = await getProductListByCategoryApi();
    const categoryItems = await getCategoriesListApi();
    setProducts(res.content);
    setCategories(categoryItems.content);
  };
  // 新增商品api
  const handleAddProduct = async () => {
    if (!name) {
      toast.warning("請輸入商品名稱");
      return;
    }
    try {
      const res = await productAddApi({
        name: name,
        description: description,
        categoryId: category,
        price: price,
        quantity: quantity,
        imageIds: [],
      });
      if (res.success) {
        toast.success("新增成功");
        loadData();
      }
    } catch (error) {
      console.log(error);
      toast.error("新增失敗");
    }
  };

  // 監聽列表
  useEffect(() => {
    loadData();
  }, []);

  const [editing, setEditing] = useState<Product | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleEdit = (item: Product) => {
    setEditing(item);
    setModalOpen(true);
  };
  //更新商品
  const handleSave = async (updated: Product) => {
    setProducts(products.map((p) => (p.name === updated.name ? updated : p)));
    await updateProductApi(updated.id, updated);
    loadData();
  };
  // 刪除商品
  const handleDelete = async (id: string) => {
    const { success } = await deleteProductApi(id);
    if (success) {
      toast.success("刪除成功");
      loadData();
    } else {
      toast.error("刪除失敗");
    }
  };
  return (
    <div className="ml-[2vw] max-w-[80vw]">
      <Table className="border-t border-gray-300 ">
        <TableHeader>
          <TableRow>
            <TableHead>
              <div className="w-30">商品名稱</div>
            </TableHead>
            <TableHead>
              <div className="w-20">商品金額</div>
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
                    {categories.map((item, key) => (
                      <SelectItem key={key} value={item.id}>
                        {item.name}
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
                {categories.find((category) => {
                  return item.categoryId === category.id;
                })?.name ?? "未知類別"}
              </TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell className="w-[100%]">{item.quantity}</TableCell>
              <TableCell className="flex w-40 justify-between">
                <Button onClick={() => handleEdit(item)}>編輯</Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    handleDelete(item.id);
                  }}
                >
                  刪除
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <EditProductModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        product={editing!}
        onSave={handleSave}
      />
    </div>
  );
}
