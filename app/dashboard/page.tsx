import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Users,
  TicketCheck,
  HelpCircle,
  UserPlus,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-10 animate-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="mt-4 md:mt-0 flex gap-2">
          <Button variant="outline" className="rounded-full">
            <Clock className="mr-2 h-4 w-4" /> Last 7 days
          </Button>
          <Button className="rounded-full">
            <TrendingUp className="mr-2 h-4 w-4" /> View Reports
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 staggered-animate">
        <Card className="border-none shadow-md card-hover animate-in">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Contacts</CardTitle>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <Users className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <div className="flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
              <p className="text-xs text-green-500 font-medium">+12% from last month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md card-hover animate-in">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <TicketCheck className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <div className="flex items-center mt-1">
              <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
              <p className="text-xs text-red-500 font-medium">-5% from last week</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md card-hover animate-in">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">FAQ Views</CardTitle>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <HelpCircle className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8,567</div>
            <div className="flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
              <p className="text-xs text-green-500 font-medium">+23% from last month</p>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md card-hover animate-in">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">New Contacts</CardTitle>
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
              <UserPlus className="h-4 w-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <div className="flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
              <p className="text-xs text-green-500 font-medium">+7% from last week</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tickets" className="space-y-6">
        <TabsList className="bg-muted/50 p-1 rounded-full">
          <TabsTrigger value="tickets" className="rounded-full">
            Tickets
          </TabsTrigger>
          <TabsTrigger value="contacts" className="rounded-full">
            Contacts
          </TabsTrigger>
          <TabsTrigger value="faqs" className="rounded-full">
            FAQs
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="space-y-4 animate-in">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Recent Tickets</CardTitle>
              <CardDescription>Overview of the latest support tickets</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="font-medium">Payment issue with subscription</div>
                    <div className="text-sm text-muted-foreground">John Doe • 2 hours ago</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="px-2 py-1 rounded-full bg-red-100 text-red-800 text-xs font-medium flex items-center">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      High
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="font-medium">Can't access account after password reset</div>
                    <div className="text-sm text-muted-foreground">Jane Smith • 5 hours ago</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-medium flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Medium
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Feature request: Dark mode</div>
                    <div className="text-sm text-muted-foreground">Mike Johnson • 1 day ago</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium flex items-center">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Low
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4 text-right">
                <Link href="/tickets">
                  <Button variant="ghost" size="sm" className="text-primary">
                    View all tickets
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contacts" className="space-y-4 animate-in">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Recent Contacts</CardTitle>
              <CardDescription>Latest contacts added to the system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Sarah Williams</div>
                      <div className="text-sm text-muted-foreground">sarah@example.com</div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">Added today</div>
                </div>

                <div className="flex items-center justify-between border-b pb-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Robert Brown</div>
                      <div className="text-sm text-muted-foreground">robert@example.com</div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">Added yesterday</div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">Emily Davis</div>
                      <div className="text-sm text-muted-foreground">emily@example.com</div>
                    </div>
                  </div>
                  <div className="text-sm text-muted-foreground">Added 3 days ago</div>
                </div>
              </div>
              <div className="mt-4 text-right">
                <Link href="/contacts">
                  <Button variant="ghost" size="sm" className="text-primary">
                    View all contacts
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="faqs" className="space-y-4 animate-in">
          <Card className="border-none shadow-md">
            <CardHeader>
              <CardTitle>Popular FAQs</CardTitle>
              <CardDescription>Most viewed frequently asked questions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <div className="font-medium">How do I reset my password?</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    To reset your password, click on the "Forgot Password" link on the login page and follow the
                    instructions sent to your email.
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">Views: 1,245</div>
                </div>

                <div className="border-b pb-4">
                  <div className="font-medium">How can I upgrade my subscription?</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    You can upgrade your subscription by going to Account Settings &gt; Subscription and selecting a new
                    plan.
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">Views: 987</div>
                </div>

                <div>
                  <div className="font-medium">What payment methods do you accept?</div>
                  <div className="text-sm text-muted-foreground mt-1">
                    We accept all major credit cards, PayPal, and bank transfers for business accounts.
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">Views: 856</div>
                </div>
              </div>
              <div className="mt-4 text-right">
                <Link href="/faqs">
                  <Button variant="ghost" size="sm" className="text-primary">
                    View all FAQs
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

