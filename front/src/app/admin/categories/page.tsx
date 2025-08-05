"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import {
  getCategoriesListApi,
  insertCategoryApi,
  updateCategoryApi,
} from "@/apis/product";
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
  const [originCategories, setOriginCategories] = useState<Category[]>([]);
  const [clonedCategories, setClonedCategories] = useState<Category[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [editTarget, setEditTarget] = useState<string[]>([]);

  const deepClone = <T extends object>(obj: T) => {
    return JSON.parse(JSON.stringify(obj)) as T;
  };

  const getCategories = async () => {
    const res = await getCategoriesListApi();
    setOriginCategories(deepClone(res.content));
    setClonedCategories(res.content);
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

  // 取消修改
  const handleCancel = (id: string, index: number) => {
    setEditTarget(editTarget.filter((item) => item !== id));
    clonedCategories[index].name = originCategories[index].name;
    setClonedCategories(deepClone(clonedCategories));
  };

  // 儲存分類
  const handleSave = async (category: Category, index: number) => {
    const { success } = await updateCategoryApi(category);
    if (!success) {
      toast.error("修改失敗");
      return;
    }
    toast.success("修改成功");
    setEditTarget(editTarget.filter((item) => item !== category.id));
    originCategories[index].name = clonedCategories[index].name;
    setOriginCategories(deepClone(originCategories));
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
          {clonedCategories.map((category, index) => (
            <TableRow key={category.id}>
              <TableCell>
                {editTarget.includes(category.id) ? (
                  <Input
                    value={category.name}
                    onChange={(e) => {
                      clonedCategories[index].name = e.target.value;

                      setClonedCategories([...clonedCategories]);
                    }}
                  />
                ) : (
                  <div>{category.name}</div>
                )}
              </TableCell>
              <TableCell>
                {editTarget.includes(category.id) ? (
                  <>
                    <Button
                      onClick={() => {
                        handleSave(category, index);
                      }}
                    >
                      儲存
                    </Button>
                    <Button
                      className="ml-5"
                      onClick={() => {
                        handleCancel(category.id, index);
                      }}
                    >
                      取消
                    </Button>
                  </>
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
