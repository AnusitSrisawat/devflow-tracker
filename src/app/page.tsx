"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateTicketDialog, NewTicketData } from "@/components/create-ticket-dialog";
import { AlertCircle, CheckCircle2, Clock, Search } from "lucide-react";

// Mock Data เริ่มต้น
const initialTickets = [
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
  const [tickets, setTickets] = useState(initialTickets);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  // ฟังก์ชันเพิ่ม Ticket ใหม่เข้าไปใน State
  const handleCreateTicket = (data: NewTicketData) => {
    const newId = `DEV-${100 + tickets.length + 1}`;
    const newTicket = {
      id: newId,
      title: data.title,
      priority: data.priority,
      status: "OPEN",
      author: "You (Staff)",
      createdAt: new Date().toISOString().split("T")[0],
    };

    // นำ Ticket ใหม่ใส่ไว้หน้าสุดของ Array เพื่อให้โชว์บนสุดของตาราง
    setTickets((prev) => [newTicket, ...prev]);
  };

  // ตัวกรองตาราง
  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "ALL" || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalCount = tickets.length;
  const inProgressCount = tickets.filter((t) => t.status === "IN_PROGRESS").length;
  const resolvedCount = tickets.filter((t) => t.status === "RESOLVED").length;

  return (
    <main className="min-h-screen bg-gray-950 p-6 md:p-10">
      <div className="max-w-6xl mx-auto space-y-8 bg-gray-300 p-5 rounded-md">
        
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
          {/* ส่งฟังก์ชัน handleCreateTicket เข้าไปใน Dialog */}
          <CreateTicketDialog onTicketCreated={handleCreateTicket} />
        </div>

        {/* สรุปสถานะ 3 การ์ด (ตัวเลขจะขยับขึ้นทันทีที่มีตั๋วใหม่) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">Ticket ทั้งหมด</CardTitle>
              <AlertCircle className="w-4 h-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">กำลังดำเนินการ (In Progress)</CardTitle>
              <Clock className="w-4 h-4 text-amber-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{inProgressCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">แก้ไขเสร็จสิ้น (Resolved)</CardTitle>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{resolvedCount}</div>
            </CardContent>
          </Card>
        </div>

        {/* ตารางข้อมูล */}
        <Card>
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <CardTitle className="text-lg">รายการ Incident & Tasks</CardTitle>
              <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="ค้นหา ID หรือหัวข้อ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 text-sm"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[160px]">
                    <SelectValue placeholder="กรองตามสถานะ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ALL">สถานะทั้งหมด</SelectItem>
                    <SelectItem value="OPEN">OPEN</SelectItem>
                    <SelectItem value="IN_PROGRESS">IN_PROGRESS</SelectItem>
                    <SelectItem value="RESOLVED">RESOLVED</SelectItem>
                  </SelectContent>
                </Select>
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
                {filteredTickets.length > 0 ? (
                  filteredTickets.map((ticket) => (
                    <TableRow key={ticket.id}>
                      <TableCell className="font-mono text-xs text-slate-500">{ticket.id}</TableCell>
                      <TableCell className="font-medium text-slate-900">{ticket.title}</TableCell>
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
                      <TableCell className="text-right text-slate-500 text-xs font-mono">{ticket.createdAt}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-slate-400 text-sm">
                      ไม่พบข้อมูล Ticket ที่ตรงกับเงื่อนไข
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

      </div>
    </main>
  );
}