"use client"

import { motion } from "framer-motion"
import { Receipt, Sparkles, ShieldCheck, HelpCircle } from "lucide-react"
import { AnimatedBackground } from "@/components/animated-background"
import { ThreeDCard } from "@/components/three-d-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"


const aboutSections = [
    {
        title: "What is PennyFlow?",
        icon: Receipt,
        description:
            "PennyFlow is your smart expense tracking dashboard. Upload receipts, add expenses manually, and get analytics – all in one place.",
    },
    {
        title: "How it Works",
        icon: Sparkles,
        description:
            "Sign in with Google, upload your receipts, and let our AI extract data for you. Visualize your spending through beautiful charts and keep your finances on track.",
    },
    {
        title: "Privacy First",
        icon: ShieldCheck,
        description:
            "We respect your data. Your receipts and personal info are stored securely in Firebase. Nothing is shared, ever.",
    },
    {
        title: "Need Help?",
        icon: HelpCircle,
        description:
            "Facing issues or have feedback? Reach out to us at support@pennyflow.app or hit us up on Twitter @pennyflowdev.",
    },
]

export default function AboutPage() {
    return (
        <div className="relative min-h-screen flex items-center justify-center p-4 bg-background">
            <AnimatedBackground />
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 max-w-6xl w-full space-y-6"
            >
                <div className="text-center mb-6">
                    <h1 className="text-4xl font-bold text-primary tracking-tight mb-2 font-sf-pro">
                        About PennyFlow
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        A smarter way to manage your spending – powered by AI.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {aboutSections.map((section, idx) => (
                        <ThreeDCard key={idx} className="p-6">
                            <div className="flex items-center mb-4 text-primary">
                                <section.icon className="h-6 w-6 mr-2" />
                                <h2 className="text-xl font-semibold font-sf-pro">
                                    {section.title}
                                </h2>
                            </div>
                            <p className="text-muted-foreground">{section.description}</p>
                        </ThreeDCard>
                    ))}
                </div>
                <div className="absolute top-6 right-6 z-20">
                    <Link href="/login">
                        <Button className="bg-gradient-to-r from-primary to-purple-500 hover:from-primary/90 hover:to-purple-500/90 transition-all duration-300">
                            Login
                        </Button>
                    </Link>
                </div>

            </motion.div>
        </div>
    )
}
