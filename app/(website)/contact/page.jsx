'use client';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Mail, Phone } from "lucide-react";

export default function Contact() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    const formData = new FormData(e.target);
    formData.append("access_key", process.env.CONTACT_FORM_ACCESS_KEY);

    if (!formData.get("firstname") || !formData.get("email") || !formData.get("message")) {
      setErrorMessage("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    const formObject = Object.fromEntries(formData);
    const json = JSON.stringify(formObject);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: json,
      });

      const result = await response.json();

      if (result.success) {
        setSuccessMessage("Thank you! Your message has been sent.");
        e.target.reset();
      } else {
        setErrorMessage("Something went wrong. Please try again later.");
      }
    } catch (error) {
      setErrorMessage("Unable to submit. Check your connection or try again later.");
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl w-full grid md:grid-cols-2 gap-8 bg-white shadow-2xl rounded-2xl border border-gray-200 p-8"
      >
        {/* Contact Form */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Contact Us</h2>
          <p className="text-gray-500 mb-6">We'd love to hear from you!</p>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input name="firstname" placeholder="First Name" required className="p-4 rounded-xl border-gray-300 focus:ring-2 focus:ring-[hsl(19,77%,57%)]" />
            <Input name="lastname" placeholder="Last Name" className="p-4 rounded-xl border-gray-300 focus:ring-2 focus:ring-[hsl(19,77%,57%)]" />
            <Input type="email" name="email" placeholder="Email Address" required className="p-4 rounded-xl border-gray-300 focus:ring-2 focus:ring-[hsl(19,77%,57%)]" />
            <Textarea name="message" placeholder="Your Message" required className="p-4 rounded-xl border-gray-300 focus:ring-2 focus:ring-[hsl(19,77%,57%)]" />
            <Button type="submit" disabled={isSubmitting} className="w-full py-3 rounded-xl text-lg font-semibold transition duration-300 bg-[hsl(19,77%,57%)] hover:bg-[hsl(19,67%,47%)] text-[hsl(60,9.1%,97.8%)]">
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
            {successMessage && <p className="text-green-600 text-center">{successMessage}</p>}
            {errorMessage && <p className="text-red-600 text-center">{errorMessage}</p>}
          </form>
        </div>

        {/* Contact Details */}
        <div className="bg-gray-100 p-6 rounded-2xl flex flex-col justify-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Our Contact Details</h3>
          <div className="flex items-center gap-4 mb-4">
            <MapPin className="text-[hsl(19,77%,57%)]" size={24} />
            <p className="text-gray-700">ENRICH MODULAR FURNITURE 24/39
              MIDC CHIKALTHANA NR Dekson Casting Chhatrapati Sambhajinagar</p>
          </div>
          <div className="flex items-center gap-4 mb-4">
            <Phone className="text-[hsl(19,77%,57%)]" size={24} />
            <p className="text-gray-700">9881734646</p>
          </div>
          <div className="flex items-center gap-4">
            <Mail className="text-[hsl(19,77%,57%)]" size={24} />
            <p className="text-gray-700">sp@enrichfurniture.com</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
