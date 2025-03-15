import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Users, TicketCheck, HelpCircle, BarChart, Headphones } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-blue-500/20 -z-10" />
        <div className="absolute inset-0 bg-grid-white/[0.05] -z-10" />

        <div className="container mx-auto py-20 px-4">
          <div className="flex flex-col items-center justify-center space-y-6 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center justify-center p-2 bg-primary/10 rounded-full mb-2">
              <Headphones className="h-6 w-6 text-primary mr-2" />
              <span className="text-sm font-medium text-primary">Contact Center Solution</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-500">
              Contact Center CRM & FAQ Solution
            </h1>

            <p className="text-xl text-muted-foreground max-w-[700px]">
              Streamline your customer support with our all-in-one platform for managing contacts, tracking tickets, and
              providing answers to frequently asked questions.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link href="/dashboard">
                <Button size="lg" className="rounded-full">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="rounded-full">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-20 px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">All-in-One Solution</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Everything you need to provide exceptional customer service in one integrated platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 staggered-animate">
          <Card className="border-none shadow-lg card-hover animate-in">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Contact Management</CardTitle>
              <CardDescription className="text-base">
                Add, edit, and manage your customer contacts with ease
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-end pt-4">
              <Link href="/contacts">
                <Button variant="ghost" className="group">
                  View Contacts <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg card-hover animate-in">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <TicketCheck className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">Ticket Tracking</CardTitle>
              <CardDescription className="text-base">Create and manage support tickets efficiently</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-end pt-4">
              <Link href="/tickets">
                <Button variant="ghost" className="group">
                  View Tickets <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg card-hover animate-in">
            <CardHeader className="pb-2">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <HelpCircle className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-xl">FAQ Management</CardTitle>
              <CardDescription className="text-base">Create and manage frequently asked questions</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-end pt-4">
              <Link href="/faqs">
                <Button variant="ghost" className="group">
                  View FAQs <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-blue-500 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to improve your customer service?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Get started with our comprehensive CRM and FAQ solution today and transform your contact center operations.
          </p>
          <Link href="/dashboard">
            <Button size="lg" variant="secondary" className="rounded-full">
              Go to Dashboard <BarChart className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}

