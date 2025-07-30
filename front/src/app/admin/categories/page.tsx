"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function CategoryPage() {
  const [categoryName, setCategoryName] = useState("");
  return (
    <div className="max-w-[70vw]">
      <Label htmlFor="categoryName">
        新增分類
        <Input
          placeholder="請輸入分類名稱"
          id="cayrgoryName"
          type="text"
          value={categoryName}
          onChange={(e) => {
            setCategoryName(e.target.value);
          }}
        />
      </Label>
      <Button>新增</Button>
    </div>
  );
}
