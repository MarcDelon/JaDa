"use client"

import type React from "react"

import { useState } from "react"
import Navigation from "@/components/navigation"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Message envoyé:", formData)
    alert("Merci! Votre message a été envoyé avec succès.")
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">Nous Contacter</h1>
          <p className="text-xl text-muted-foreground">Nous sommes là pour vous aider</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {/* Contact Info */}
          <div className="text-center p-8 border border-border">
            <Mail size={40} className="mx-auto mb-4 text-accent" />
            <h3 className="text-xl font-bold mb-2">E-mail</h3>
            <p className="text-muted-foreground">contact@jada.fr</p>
          </div>

          <div className="text-center p-8 border border-border">
            <Phone size={40} className="mx-auto mb-4 text-accent" />
            <h3 className="text-xl font-bold mb-2">Téléphone</h3>
            <p className="text-muted-foreground">+33 (0) 1 23 45 67 89</p>
          </div>

          <div className="text-center p-8 border border-border">
            <MapPin size={40} className="mx-auto mb-4 text-accent" />
            <h3 className="text-xl font-bold mb-2">Adresse</h3>
            <p className="text-muted-foreground">
              123 Rue de la Mode
              <br />
              75001 Paris, France
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="max-w-2xl mx-auto border border-border p-8">
          <h2 className="text-3xl font-bold mb-8">Envoyez-nous un message</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Nom</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Votre nom"
                  required
                  className="w-full px-4 py-3 border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">E-mail</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="vous@exemple.com"
                  required
                  className="w-full px-4 py-3 border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Sujet</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Sujet de votre message"
                required
                className="w-full px-4 py-3 border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Votre message..."
                rows={6}
                required
                className="w-full px-4 py-3 border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-foreground text-background font-bold flex items-center justify-center gap-2 hover:opacity-90 transition"
            >
              <Send size={20} />
              Envoyer
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
