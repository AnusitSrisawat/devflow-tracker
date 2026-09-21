"use client";

import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import { toast } from "sonner";

// Schema สำหรับตรวจสอบข้อมูล
const ticketSchema = z.object({
  title: z.string().min(5, "หัวข้อต้องมีความยาวอย่างน้อย 5 ตัวอักษร"),
  description: z.string().min(10, "รายละเอียดต้องมีความยาวอย่างน้อย 10 ตัวอักษร"),
  priority: z.enum(["LOW", "MEDIUM", "HIGH"]),
});

type FormErrors = {
  title?: string[];
  description?: string[];
  priority?: string[];
};

// 1. กำหนดรูปแบบข้อมูล Ticket และ Props ที่รับเข้ามา
export interface NewTicketData {
  title: string;
  description: string;
  priority: "LOW" | "MEDIUM" | "HIGH";
}

interface CreateTicketDialogProps {
  onTicketCreated: (ticket: NewTicketData) => void;
}

export function CreateTicketDialog({ onTicketCreated }: CreateTicketDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"LOW" | "MEDIUM" | "HIGH">("MEDIUM");
  const [errors, setErrors] = useState<FormErrors>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const result = ticketSchema.safeParse({ title, description, priority });

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    // 2. เรียกฟังก์ชันส่งข้อมูลกลับไปให้หน้าตารางหลัก
    onTicketCreated(result.data);

    toast.success("สร้าง Ticket สำเร็จเรียบร้อย", {
      description: `หัวข้อ: ${result.data.title}`,
    });

    // รีเซ็ตค่าและปิดฟอร์ม
    setErrors({});
    setTitle("");
    setDescription("");
    setPriority("MEDIUM");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> สร้าง Ticket ใหม่
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>สร้าง Ticket แจ้งปัญหาใหม่</DialogTitle>
            <DialogDescription>
              กรอกรายละเอียดปัญหา IT หรือข้อผิดพลาดที่พบเพื่อให้ทีมดำเนินการ
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-1.5">
              <Label htmlFor="title">หัวข้อปัญหา (Title)</Label>
              <Input
                id="title"
                placeholder="เช่น ระบบ Login บนมือถือค้าง"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && (
                <p className="text-xs text-red-500">{errors.title[0]}</p>
              )}
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="priority">ระดับความสำคัญ (Priority)</Label>
              <Select
                value={priority}
                onValueChange={(val: "LOW" | "MEDIUM" | "HIGH") => setPriority(val)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="เลือกระดับความสำคัญ" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="LOW">LOW (ทั่วไป / รอได้)</SelectItem>
                  <SelectItem value="MEDIUM">MEDIUM (ปานกลาง)</SelectItem>
                  <SelectItem value="HIGH">HIGH (ด่วนมาก / กระทบงาน)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-1.5">
              <Label htmlFor="desc">รายละเอียดปัญหา (Description)</Label>
              <Textarea
                id="desc"
                rows={4}
                placeholder="อธิบายขั้นตอนที่ทำให้เกิดปัญหา หรือข้อความ Error ที่ขึ้น..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {errors.description && (
                <p className="text-xs text-red-500">{errors.description[0]}</p>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              ยกเลิก
            </Button>
            <Button type="submit">ยืนยันการสร้าง</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}