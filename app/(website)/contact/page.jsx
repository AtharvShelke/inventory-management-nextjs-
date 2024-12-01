'use client';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Contact() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Track if form is being submitted

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return; // Prevent multiple submissions

    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    const formData = new FormData(e.target);
    formData.append("access_key", "d58af696-1dca-478f-abe3-4a94d0151469");

    // Basic Validation
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
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      const result = await response.json();

      if (result.success) {
        setSuccessMessage("Thank you! Your message has been sent.");
        e.target.reset(); // Reset the form after successful submission
      } else {
        setErrorMessage("Something went wrong. Please try again later.");
      }
    } catch (error) {
      setErrorMessage("Unable to submit your request. Please check your internet connection or try again later.");
      console.error("Error submitting the form:", error);
    } finally {
      setIsSubmitting(false); // Reset submitting state regardless of success/failure
    }
  };

  return (
    <div className="pb-14">
      {/* Background image for heading */}
      <div className="relative bg-cover bg-center h-64 flex items-center justify-center" style={{ backgroundImage: 'url(/image/backgroundproject.jpg)' }}>
        <div className="absolute inset-0 bg-black opacity-50"></div> {/* Optional overlay for better text visibility */}
        <div className="relative text-center z-10">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
            Contact Sales
          </h2>
          <p className="mt-2 text-lg leading-8 text-white">
            Feel free to ask anything
          </p>
        </div>
      </div>

      {/* Contact Form */}
      <form className="mx-auto mt-16 max-w-xl sm:mt-20" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6">
          <div className="mt-2.5">
            <Input type="text" name="firstname" id="firstname" placeholder="First name" required />
          </div>
          <div className="mt-2.5">
            <Input type="text" name="lastname" id="lastname" placeholder="Last name" />
          </div>
          <div className="mt-2.5">
            <Input type="email" name="email" id="email" placeholder="Email Address" required />
          </div>
          <div className="mt-2.5">
            <Textarea name="message" placeholder="Message" required />
          </div>
          <Button type="submit" disabled={isSubmitting}>Send</Button>
        </div>
        {successMessage && (
          <p className="mt-4 text-green-600">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="mt-4 text-red-600">{errorMessage}</p>
        )}
      </form>
    </div>
  );
}
