"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
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
import { Textarea } from "@/components/ui/textarea"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Search, Edit, Trash2, Filter, Eye } from "lucide-react"

// Sample data
const initialFaqs = [
  {
    id: 1,
    question: "How do I reset my password?",
    answer:
      'To reset your password, click on the "Forgot Password" link on the login page and follow the instructions sent to your email.',
    category: "Account",
    views: 1245,
  },
  {
    id: 2,
    question: "How can I upgrade my subscription?",
    answer: "You can upgrade your subscription by going to Account Settings > Subscription and selecting a new plan.",
    category: "Billing",
    views: 987,
  },
  {
    id: 3,
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards, PayPal, and bank transfers for business accounts.",
    category: "Billing",
    views: 856,
  },
  {
    id: 4,
    question: "How do I export my data?",
    answer:
      "You can export your data by going to Settings > Data Management > Export. You can choose between CSV, Excel, or JSON formats.",
    category: "Data",
    views: 723,
  },
  {
    id: 5,
    question: "Is my data secure?",
    answer:
      "Yes, we use industry-standard encryption and security practices to protect your data. All information is stored on secure servers with regular backups.",
    category: "Security",
    views: 689,
  },
]
interface Faq {
  id: number
  question: string
  answer: string  
  category: string
  views: number
}

const categories = ["Account", "Billing", "Data", "Security", "General"]

export default function FaqsPage() {
  const [faqs, setFaqs] = useState(initialFaqs)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [newFaq, setNewFaq] = useState({ question: "", answer: "", category: "General" })
  const [editingFaq, setEditingFaq] = useState<Faq | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [faqToDelete, setFaqToDelete] = useState<Faq | null>(null)

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  const handleAddFaq = () => {
    const id = faqs.length > 0 ? Math.max(...faqs.map((f) => f.id)) + 1 : 1
    setFaqs([...faqs, { ...newFaq, id, views: 0 }])
    setNewFaq({ question: "", answer: "", category: "General" })
    setIsAddDialogOpen(false)
  }

  const handleEditFaq = () => {
    if(!editingFaq) return
    setFaqs(faqs.map((faq) => (faq.id === editingFaq.id ? editingFaq : faq)))
    setIsEditDialogOpen(false)
  }

  const handleDeleteFaq = () => {
    if(!faqToDelete) return
    setFaqs(faqs.filter((faq) => faq.id !== faqToDelete.id))
    setIsDeleteDialogOpen(false)
  }

  return (
    <div className="container mx-auto py-10 animate-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
        <h1 className="text-3xl font-bold">FAQ Management</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="mt-4 md:mt-0 rounded-full">
              <Plus className="mr-2 h-4 w-4" /> Add FAQ
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add New FAQ</DialogTitle>
              <DialogDescription>Enter the question and answer for the new FAQ.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="question" className="text-right">
                  Question
                </Label>
                <Input
                  id="question"
                  value={newFaq.question}
                  onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="category" className="text-right">
                  Category
                </Label>
                <Select value={newFaq.category} onValueChange={(value) => setNewFaq({ ...newFaq, category: value })}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="answer" className="text-right">
                  Answer
                </Label>
                <Textarea
                  id="answer"
                  value={newFaq.answer}
                  onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                  className="col-span-3"
                  rows={6}
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleAddFaq}>Add FAQ</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card className="mb-6 border-none shadow-md">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative col-span-2">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search FAQs..."
                className="pl-10 rounded-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="rounded-full">
                <div className="flex items-center">
                  <Filter className="h-4 w-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Filter by category" />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card className="border-none shadow-md">
        <CardHeader>
          <CardTitle>Frequently Asked Questions ({filteredFaqs.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {filteredFaqs.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {filteredFaqs.map((faq) => (
                <AccordionItem key={faq.id} value={`faq-${faq.id}`} className="animate-in border-b border-muted">
                  <AccordionTrigger className="text-left hover:no-underline">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full pr-4">
                      <span className="font-medium">{faq.question}</span>
                      <div className="flex items-center gap-2 mt-2 md:mt-0">
                        <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                          {faq.category}
                        </span>
                        <span className="text-xs text-muted-foreground flex items-center">
                          <Eye className="h-3 w-3 mr-1" /> {faq.views}
                        </span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pb-4">
                      <p className="text-sm text-muted-foreground mb-4">{faq.answer}</p>
                      <div className="flex justify-end gap-2">
                        <Dialog
                          open={isEditDialogOpen && editingFaq?.id === faq.id}
                          onOpenChange={(open) => {
                            setIsEditDialogOpen(open)
                            if (open) setEditingFaq(faq)
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="rounded-full">
                              <Edit className="h-4 w-4 mr-2" /> Edit
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                              <DialogTitle>Edit FAQ</DialogTitle>
                              <DialogDescription>Update the question and answer for this FAQ.</DialogDescription>
                            </DialogHeader>
                            {editingFaq && (
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="edit-question" className="text-right">
                                    Question
                                  </Label>
                                  <Input
                                    id="edit-question"
                                    value={editingFaq.question}
                                    onChange={(e) => setEditingFaq({ ...editingFaq, question: e.target.value })}
                                    className="col-span-3"
                                  />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="edit-category" className="text-right">
                                    Category
                                  </Label>
                                  <Select
                                    value={editingFaq.category}
                                    onValueChange={(value) => setEditingFaq({ ...editingFaq, category: value })}
                                  >
                                    <SelectTrigger className="col-span-3">
                                      <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {categories.map((category) => (
                                        <SelectItem key={category} value={category}>
                                          {category}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <Label htmlFor="edit-answer" className="text-right">
                                    Answer
                                  </Label>
                                  <Textarea
                                    id="edit-answer"
                                    value={editingFaq.answer}
                                    onChange={(e) => setEditingFaq({ ...editingFaq, answer: e.target.value })}
                                    className="col-span-3"
                                    rows={6}
                                  />
                                </div>
                              </div>
                            )}
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                                Cancel
                              </Button>
                              <Button onClick={handleEditFaq}>Save Changes</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                        <Dialog
                          open={isDeleteDialogOpen && faqToDelete?.id === faq.id}
                          onOpenChange={(open) => {
                            setIsDeleteDialogOpen(open)
                            if (open) setFaqToDelete(faq)
                          }}
                        >
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="rounded-full">
                              <Trash2 className="h-4 w-4 mr-2" /> Delete
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Delete FAQ</DialogTitle>
                              <DialogDescription>
                                Are you sure you want to delete this FAQ? This action cannot be undone.
                              </DialogDescription>
                            </DialogHeader>
                            {faqToDelete && (
                              <div className="py-4">
                                <p>
                                  <strong>Question:</strong> {faqToDelete.question}
                                </p>
                                <p>
                                  <strong>Category:</strong> {faqToDelete.category}
                                </p>
                              </div>
                            )}
                            <DialogFooter>
                              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                                Cancel
                              </Button>
                              <Button variant="destructive" onClick={handleDeleteFaq}>
                                Delete
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="text-center py-10 text-muted-foreground">
              No FAQs found. Try a different search or add a new FAQ.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

