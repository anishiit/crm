"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Search, AlertCircle, Clock, CheckCircle, Eye, Edit, Trash2, Filter } from "lucide-react"

// Sample data
const initialTickets = [
  {
    id: 1,
    title: "Payment issue with subscription",
    description: "Customer is unable to process payment for their monthly subscription.",
    status: "Open",
    priority: "High",
    assignedTo: "John Doe",
    customer: "Sarah Williams",
    createdAt: "2023-03-10T14:30:00Z",
  },
  {
    id: 2,
    title: "Can't access account after password reset",
    description: "Customer reset their password but is still unable to log in to their account.",
    status: "In Progress",
    priority: "Medium",
    assignedTo: "Jane Smith",
    customer: "Robert Brown",
    createdAt: "2023-03-09T10:15:00Z",
  },
  {
    id: 3,
    title: "Feature request: Dark mode",
    description: "Customer is requesting a dark mode option for the application.",
    status: "Open",
    priority: "Low",
    assignedTo: "Unassigned",
    customer: "Mike Johnson",
    createdAt: "2023-03-08T16:45:00Z",
  },
  {
    id: 4,
    title: "Mobile app crashes on startup",
    description: "Customer reports that the mobile app crashes immediately after opening on iOS devices.",
    status: "Open",
    priority: "High",
    assignedTo: "Mike Johnson",
    customer: "Emily Davis",
    createdAt: "2023-03-07T09:20:00Z",
  },
  {
    id: 5,
    title: "Invoice discrepancy",
    description: "Customer reports that their latest invoice shows incorrect charges.",
    status: "Resolved",
    priority: "Medium",
    assignedTo: "Jane Smith",
    customer: "David Wilson",
    createdAt: "2023-03-06T11:30:00Z",
  },
]

export default function TicketsPage() {
  const [tickets, setTickets] = useState(initialTickets)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [newTicket, setNewTicket] = useState({
    title: "",
    description: "",
    status: "Open",
    priority: "Medium",
    assignedTo: "Unassigned",
    customer: "",
  })
  const [editingTicket, setEditingTicket] = useState(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [ticketToView, setTicketToView] = useState(null)
  const [ticketToDelete, setTicketToDelete] = useState(null)

  const filteredTickets = tickets.filter((ticket) => {
    const matchesSearch =
      ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.assignedTo.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter
    const matchesPriority = priorityFilter === "all" || ticket.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const handleAddTicket = () => {
    const id = tickets.length > 0 ? Math.max(...tickets.map((t) => t.id)) + 1 : 1
    const now = new Date().toISOString()
    setTickets([...tickets, { ...newTicket, id, createdAt: now }])
    setNewTicket({
      title: "",
      description: "",
      status: "Open",
      priority: "Medium",
      assignedTo: "Unassigned",
      customer: "",
    })
    setIsAddDialogOpen(false)
  }

  const handleEditTicket = () => {
    setTickets(tickets.map((ticket) => (ticket.id === editingTicket.id ? editingTicket : ticket)))
    setIsEditDialogOpen(false)
  }

  const handleDeleteTicket = () => {
    setTickets(tickets.filter((ticket) => ticket.id !== ticketToDelete.id))
    setIsDeleteDialogOpen(false)
  }

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case "High":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      case "Medium":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "Low":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      default:
        return null
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Open":
        return "bg-blue-100 text-blue-800"
      case "In Progress":
        return "bg-yellow-100 text-yellow-800"
      case "Resolved":
        return "bg-green-100 text-green-800"
      case "Closed":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date)
  }

  return (
    <div className="container mx-auto py-10 animate-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-3xl font-bold">Support Tickets</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="mt-4 md:mt-0 rounded-full">
              <Plus className="mr-2 h-4 w-4" /> Create Ticket
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Ticket</DialogTitle>
              <DialogDescription>Enter the details of the new support ticket below.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={newTicket.title}
                  onChange={(e) => setNewTicket({ ...newTicket, title: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="customer" className="text-right">
                  Customer
                </Label>
                <Input
                  id="customer"
                  value={newTicket.customer}
                  onChange={(e) => setNewTicket({ ...newTicket, customer: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={newTicket.description}
                  onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                  className="col-span-3"
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="priority" className="text-right">
                  Priority
                </Label>
                <Select
                  value={newTicket.priority}
                  onValueChange={(value) => setNewTicket({ ...newTicket, priority: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="assignedTo" className="text-right">
                  Assign To
                </Label>
                <Select
                  value={newTicket.assignedTo}
                  onValueChange={(value) => setNewTicket({ ...newTicket, assignedTo: value })}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select assignee" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Unassigned">Unassigned</SelectItem>
                    <SelectItem value="John Doe">John Doe</SelectItem>
                    <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                    <SelectItem value="Mike Johnson">Mike Johnson</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddTicket}>Create Ticket</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="mb-6 border-none shadow-md">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search tickets..."
                className="pl-10 rounded-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="rounded-full">
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Filter by status" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Open">Open</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Resolved">Resolved</SelectItem>
                <SelectItem value="Closed">Closed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="rounded-full">
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Filter by priority" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Priorities</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="Low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle>All Tickets ({filteredTickets.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Customer</TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
                <TableHead className="hidden md:table-cell">Priority</TableHead>
                <TableHead className="hidden md:table-cell">Assigned To</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTickets.map((ticket) => (
                <TableRow key={ticket.id} className="animate-in">
                  <TableCell>#{ticket.id}</TableCell>
                  <TableCell className="font-medium">{ticket.title}</TableCell>
                  <TableCell className="hidden md:table-cell">{ticket.customer}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(ticket.status)}`}
                    >
                      {ticket.status}
                    </span>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-1">
                      {getPriorityIcon(ticket.priority)}
                      <span>{ticket.priority}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{ticket.assignedTo}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Dialog
                        open={isViewDialogOpen && ticketToView?.id === ticket.id}
                        onOpenChange={(open) => {
                          setIsViewDialogOpen(open)
                          if (open) setTicketToView(ticket)
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="rounded-full">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>Ticket #{ticketToView?.id}</DialogTitle>
                          </DialogHeader>
                          {ticketToView && (
                            <div className="py-4">
                              <div className="mb-4">
                                <h3 className="text-lg font-semibold">{ticketToView.title}</h3>
                                <p className="text-sm text-muted-foreground">
                                  Created on {formatDate(ticketToView.createdAt)}
                                </p>
                              </div>
                              <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                  <p className="text-sm font-medium">Status</p>
                                  <span
                                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusColor(ticketToView.status)}`}
                                  >
                                    {ticketToView.status}
                                  </span>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Priority</p>
                                  <div className="flex items-center gap-1">
                                    {getPriorityIcon(ticketToView.priority)}
                                    <span>{ticketToView.priority}</span>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Customer</p>
                                  <p>{ticketToView.customer}</p>
                                </div>
                                <div>
                                  <p className="text-sm font-medium">Assigned To</p>
                                  <p>{ticketToView.assignedTo}</p>
                                </div>
                              </div>
                              <div>
                                <p className="text-sm font-medium mb-2">Description</p>
                                <p className="text-sm">{ticketToView.description}</p>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                      <Dialog
                        open={isEditDialogOpen && editingTicket?.id === ticket.id}
                        onOpenChange={(open) => {
                          setIsEditDialogOpen(open)
                          if (open) setEditingTicket(ticket)
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="rounded-full">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>Edit Ticket #{editingTicket?.id}</DialogTitle>
                          </DialogHeader>
                          {editingTicket && (
                            <div className="grid gap-4 py-4">
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-title" className="text-right">
                                  Title
                                </Label>
                                <Input
                                  id="edit-title"
                                  value={editingTicket.title}
                                  onChange={(e) => setEditingTicket({ ...editingTicket, title: e.target.value })}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-customer" className="text-right">
                                  Customer
                                </Label>
                                <Input
                                  id="edit-customer"
                                  value={editingTicket.customer}
                                  onChange={(e) => setEditingTicket({ ...editingTicket, customer: e.target.value })}
                                  className="col-span-3"
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-description" className="text-right">
                                  Description
                                </Label>
                                <Textarea
                                  id="edit-description"
                                  value={editingTicket.description}
                                  onChange={(e) => setEditingTicket({ ...editingTicket, description: e.target.value })}
                                  className="col-span-3"
                                  rows={4}
                                />
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-status" className="text-right">
                                  Status
                                </Label>
                                <Select
                                  value={editingTicket.status}
                                  onValueChange={(value) => setEditingTicket({ ...editingTicket, status: value })}
                                >
                                  <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select status" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Open">Open</SelectItem>
                                    <SelectItem value="In Progress">In Progress</SelectItem>
                                    <SelectItem value="Resolved">Resolved</SelectItem>
                                    <SelectItem value="Closed">Closed</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-priority" className="text-right">
                                  Priority
                                </Label>
                                <Select
                                  value={editingTicket.priority}
                                  onValueChange={(value) => setEditingTicket({ ...editingTicket, priority: value })}
                                >
                                  <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select priority" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="High">High</SelectItem>
                                    <SelectItem value="Medium">Medium</SelectItem>
                                    <SelectItem value="Low">Low</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-assignedTo" className="text-right">
                                  Assign To
                                </Label>
                                <Select
                                  value={editingTicket.assignedTo}
                                  onValueChange={(value) => setEditingTicket({ ...editingTicket, assignedTo: value })}
                                >
                                  <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select assignee" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Unassigned">Unassigned</SelectItem>
                                    <SelectItem value="John Doe">John Doe</SelectItem>
                                    <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                                    <SelectItem value="Mike Johnson">Mike Johnson</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                          )}
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button onClick={handleEditTicket}>Save Changes</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                      <Dialog
                        open={isDeleteDialogOpen && ticketToDelete?.id === ticket.id}
                        onOpenChange={(open) => {
                          setIsDeleteDialogOpen(open)
                          if (open) setTicketToDelete(ticket)
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="rounded-full">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Delete Ticket</DialogTitle>
                            <DialogDescription>
                              Are you sure you want to delete this ticket? This action cannot be undone.
                            </DialogDescription>
                          </DialogHeader>
                          {ticketToDelete && (
                            <div className="py-4">
                              <p>
                                <strong>Ticket ID:</strong> #{ticketToDelete.id}
                              </p>
                              <p>
                                <strong>Title:</strong> {ticketToDelete.title}
                              </p>
                              <p>
                                <strong>Customer:</strong> {ticketToDelete.customer}
                              </p>
                            </div>
                          )}
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button variant="destructive" onClick={handleDeleteTicket}>
                              Delete
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredTickets.length === 0 && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-10 text-muted-foreground">
                    No tickets found. Try a different search or create a new ticket.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

