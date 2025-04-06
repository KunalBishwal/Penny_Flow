"use client"

import { useState } from "react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { ThreeDCard } from "@/components/three-d-card"

export default function SettingsPage() {
  const { toast } = useToast()
  const [budgetAmount, setBudgetAmount] = useState("3600")

  const handleSaveBudget = () => {
    toast({
      title: "Budget updated",
      description: `Your monthly budget has been set to $${budgetAmount}.`,
    })
  }

  return (
    <div className="container mx-auto py-6">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight font-sf-pro">Settings</h1>
          <p className="text-muted-foreground">Manage your account settings and preferences.</p>
        </div>

        <Tabs defaultValue="budget" className="space-y-6">
          <TabsList className="grid w-full max-w-md grid-cols-4">
            <TabsTrigger value="budget">Budget</TabsTrigger>
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Alerts</TabsTrigger>
            <TabsTrigger value="appearance">Theme</TabsTrigger>
          </TabsList>

          <TabsContent value="budget" className="space-y-6">
            <ThreeDCard>

              <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Budget Settings</CardTitle>
                  <CardDescription>Set your monthly budget and category limits</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="budget">Monthly Budget</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input
                        id="budget"
                        value={budgetAmount}
                        onChange={(e) => setBudgetAmount(e.target.value)}
                        className="pl-8"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">This is your total budget for the month</p>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Category Budgets</h3>

                    <div className="grid gap-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="food">Food</Label>
                          <p className="text-xs text-muted-foreground">Restaurants, groceries, coffee shops</p>
                        </div>
                        <div className="relative w-24">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                          <Input id="food" defaultValue="850" className="pl-8" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="transport">Transport</Label>
                          <p className="text-xs text-muted-foreground">Gas, public transit, rideshares</p>
                        </div>
                        <div className="relative w-24">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                          <Input id="transport" defaultValue="450" className="pl-8" />
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="shopping">Shopping</Label>
                          <p className="text-xs text-muted-foreground">Clothes, electronics, household items</p>
                        </div>
                        <div className="relative w-24">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                          <Input id="shopping" defaultValue="650" className="pl-8" />
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={handleSaveBudget}
                    className="w-full bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90"
                  >
                    Save Budget Settings
                  </Button>
                </CardFooter>
              </Card>
            </ThreeDCard>
          </TabsContent>

          <TabsContent value="account" className="space-y-6">
            <ThreeDCard>

              <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Account Settings</CardTitle>
                  <CardDescription>Manage your account information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue="john.doe@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Input id="currency" defaultValue="USD ($)" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Save Account Settings</Button>
                </CardFooter>
              </Card>
            </ThreeDCard>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <ThreeDCard>
              <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <CardDescription>Configure your budget alerts and notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="budget-alerts">Budget Alerts</Label>
                      <p className="text-xs text-muted-foreground">
                        Receive alerts when you're close to your budget limit
                      </p>
                    </div>
                    <Switch id="budget-alerts" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="weekly-summary">Weekly Summary</Label>
                      <p className="text-xs text-muted-foreground">Get a weekly summary of your expenses</p>
                    </div>
                    <Switch id="weekly-summary" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="unusual-activity">Unusual Activity</Label>
                      <p className="text-xs text-muted-foreground">Get notified about unusual spending patterns</p>
                    </div>
                    <Switch id="unusual-activity" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Save Notification Settings</Button>
                </CardFooter>
              </Card>
            </ThreeDCard>
          </TabsContent>

          <TabsContent value="appearance" className="space-y-6">
            <ThreeDCard>

              <Card className="border border-border/50 bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Appearance Settings</CardTitle>
                  <CardDescription>Customize the look and feel of the app</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="dark-mode">Dark Mode</Label>
                      <p className="text-xs text-muted-foreground">Use dark theme throughout the app</p>
                    </div>
                    <Switch id="dark-mode" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="animations">Animations</Label>
                      <p className="text-xs text-muted-foreground">Enable animations and transitions</p>
                    </div>
                    <Switch id="animations" defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="compact-view">Compact View</Label>
                      <p className="text-xs text-muted-foreground">Use a more compact layout</p>
                    </div>
                    <Switch id="compact-view" />
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Save Appearance Settings</Button>
                </CardFooter>
              </Card>
            </ThreeDCard>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  )
}

