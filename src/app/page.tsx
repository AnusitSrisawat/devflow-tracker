import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AlertCircle, CheckCircle2, Clock, Plus, Search } from "lucide-react";

const mockTickets = [
  {
    id: "DEV-101",
    title: "ระบบ Login ผ่าน Google ไม่ตอบสนองบนมือถือ",
    priority: "HIGH",
    status: "OPEN",
    author: "Somchai D.",
    createdAt: "2026-09-20",
  },
  {
    id: "DEV-102",
    title: "แก้คำผิดหน้า Checkout และปรับปุ่มเป็นสีเขียว",
    priority: "LOW",
    status: "RESOLVED",
    author: "Apinya K.",
    createdAt: "2026-09-19",
  },
  {
    id: "DEV-103",
    title: "API Endpoint /tickets ช้าผิดปกติเมื่อ Query เกิน 100 แถว",
    priority: "MEDIUM",
    status: "IN_PROGRESS",
    author: "Anusit S.",
    createdAt: "2026-09-18",
  },
];

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50/50 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header ส่วนหัว */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              DevFlow Tracker
            </h1>
            <p className="text-slate-500 text-sm">
              ระบบติดตามข้อผิดพลาดและบริการจัดการเคส IT ภายในทีม
            </p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> สร้าง Ticket ใหม่
          </Button>
        </div>

        {/* สรุปสถานะ 3 การ์ด */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Ticket ทั้งหมด
              </CardTitle>
              <AlertCircle className="w-4 h-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-slate-400 mt-1">+2 รายการใหม่สัปดาห์นี้</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                กำลังดำเนินการ (In Progress)
              </CardTitle>
              <Clock className="w-4 h-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-slate-400 mt-1">ทีมกำลังตรวจสอบ</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                แก้ไขเสร็จสิ้น (Resolved)
              </CardTitle>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">7</div>
              <p className="text-xs text-slate-400 mt-1">ปิดเคสเรียบร้อย</p>
            </CardContent>
          </Card>
        </div>

        {/* ช่อง Search & ตารางข้อมูล */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <CardTitle className="text-lg">รายการ Incident & Tasks</CardTitle>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="ค้นหาชื่อเรื่อง..."
                  className="pl-8 text-sm"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>หัวข้อปัญหา</TableHead>
                  <TableHead>ระดับความสำคัญ</TableHead>
                  <TableHead>สถานะ</TableHead>
                  <TableHead>ผู้แจ้ง</TableHead>
                  <TableHead className="text-right">วันที่แจ้ง</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-mono text-xs text-slate-500">
                      {ticket.id}
                    </TableCell>
                    <TableCell className="font-medium text-slate-900">
                      {ticket.title}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          ticket.priority === "HIGH"
                            ? "border-red-500 text-red-600 bg-red-50"
                            : ticket.priority === "MEDIUM"
                            ? "border-amber-500 text-amber-600 bg-amber-50"
                            : "border-slate-300 text-slate-600"
                        }
                      >
                        {ticket.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={
                          ticket.status === "RESOLVED"
                            ? "bg-emerald-600"
                            : ticket.status === "IN_PROGRESS"
                            ? "bg-amber-600"
                            : "bg-blue-600"
                        }
                      >
                        {ticket.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-600">{ticket.author}</TableCell>
                    <TableCell className="text-right text-slate-500 text-xs font-mono">
                      {ticket.createdAt}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

      </div>
    </main>
  );
}