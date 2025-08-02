"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { getCategoriesListApi, insertCategoryApi } from "@/apis/product";
import { Category } from "@/types/product";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { toast } from "sonner";

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [editTarget, setEditTarget] = useState<string[]>([]);

  const getCategories = async () => {
    const res = await getCategoriesListApi();
    setCategories(res.content);
  };

  const handleAddCategory = async () => {
    const res = await insertCategoryApi(categoryName);
    if (res.success) {
      toast.success("新增成功");
      getCategories();
    } else {
      toast.error("新增失敗");
    }
  };

  const handleEdit = (id: string) => {
    setEditTarget([...editTarget, id]);
  };

  const handleSave = (id: string) => {
    setEditTarget(editTarget.filter((item) => item !== id));
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="max-w-[70vw]">
      <Table className="w-[50%]">
        <TableHeader>
          <TableRow>
            <TableHead className="w-40">分類名稱</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <Label htmlFor="categoryName">
                <Input
                  className="w-[300px]"
                  placeholder="請輸入分類名稱"
                  id="cayrgoryName"
                  type="text"
                  value={categoryName}
                  onChange={(e) => {
                    setCategoryName(e.target.value);
                  }}
                />
              </Label>
            </TableCell>
            <TableCell>
              <Button onClick={handleAddCategory}>新增</Button>
            </TableCell>
          </TableRow>
          {categories.map((category) => (
            <TableRow key={category.id}>
              <TableCell>
                <div>{category.name}</div>
              </TableCell>
              <TableCell>
                {editTarget.includes(category.id) ? (
                  <Button
                    onClick={() => {
                      handleSave(category.id);
                    }}
                  >
                    儲存
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      handleEdit(category.id);
                    }}
                  >
                    修改
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
