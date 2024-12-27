'use client';
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

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
        e.target.reset();
      } else {
        setErrorMessage("Something went wrong. Please try again later.");
      }
    } catch (error) {
      setErrorMessage("Unable to submit your request. Please check your internet connection or try again later.");
      console.error("Error submitting the form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pb-14 bg-gray-50 py-16">
      <form 
        className="mx-auto mt-16 max-w-3xl p-8 bg-white shadow-xl rounded-xl border border-gray-100" 
        onSubmit={handleSubmit}
      >
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">Contact Us</h2>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6">
          <div className="mt-4">
            <Input 
              type="text" 
              name="firstname" 
              id="firstname" 
              placeholder="First Name" 
              required 
              className="border border-gray-300 rounded-lg p-4 w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>
          <div className="mt-4">
            <Input 
              type="text" 
              name="lastname" 
              id="lastname" 
              placeholder="Last Name" 
              className="border border-gray-300 rounded-lg p-4 w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>
          <div className="mt-4">
            <Input 
              type="email" 
              name="email" 
              id="email" 
              placeholder="Email Address" 
              required 
              className="border border-gray-300 rounded-lg p-4 w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>
          <div className="mt-4">
            <Textarea 
              name="message" 
              placeholder="Your Message" 
              required 
              className="border border-gray-300 rounded-lg p-4 w-full text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            />
          </div>
          <Button 
            type="submit" 
            disabled={isSubmitting} 
            className="mt-6  text-white p-4 rounded-lg text-lg font-semibold w-full  focus:outline-none transition duration-200 disabled:bg-gray-300"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </div>

        {successMessage && (
          <p className="mt-4 text-green-600 text-lg font-medium">{successMessage}</p>
        )}
        {errorMessage && (
          <p className="mt-4 text-red-600 text-lg font-medium">{errorMessage}</p>
        )}
      </form>
    </div>
  );
}
