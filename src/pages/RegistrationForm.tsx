import React, { useState } from "react";
import SparkleButton from "../components/ui/SparkleButton";
import Navigation from "@/components/Navigation";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaCreditCard,
  FaComment,
} from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import "./AnimatedBackground.css";
import "./glow.css";

function RegistrationForm() {
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupError, setPopupError] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const name = form[0].value.trim();
    const email = form[1].value.trim();
    const phone = form[2].value.trim();
    const regNo = form[3].value.trim();
    const txnId = form[4].value.trim();
    const feedback = form[5].value.trim();

    if (!name || !email || !phone || !regNo || !txnId) {
      setPopupMessage("Please fill in all required fields.");
      setPopupError(true);
      setPopupOpen(true);
      return;
    }

    setLoading(true);

    const url = import.meta.env.VITE_GOOGLE_SHEETS_API;
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `Name=${name}&Email=${email}&PhoneNumber=${phone}&RegistrationNumber=${regNo}&TransactionID=${txnId}&Feedback=${feedback}`,
    })
      .then((res) => res.text())
      .then((data) => {
        setPopupMessage("Form submitted successfully! " + data);
        setPopupError(false);
        setPopupOpen(true);
        form.reset();
      })
      .catch((err) => {
        setPopupMessage("Form submission failed. Please try again.");
        setPopupError(true);
        setPopupOpen(true);
        console.error(err);
      })
      .finally(() => setLoading(false));
  }

  return (
    <>
      <Navigation />

      <div className="area">
        <ul className="circles">
          {Array.from({ length: 10 }).map((_, i) => (
            <li key={i}></li>
          ))}
        </ul>
      </div>

      <Dialog open={popupOpen} onOpenChange={setPopupOpen}>
        <DialogContent className="bg-gray-900 text-white border border-gray-700">
          <DialogHeader>
            <DialogTitle
              className={popupError ? "text-red-400" : "text-green-400"}
            >
              {popupError ? "Error" : "Success"}
            </DialogTitle>
            <DialogDescription className="text-gray-300 mt-2">
              {popupMessage}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              onClick={() => setPopupOpen(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="min-h-screen flex items-center justify-center text-gray-100 p-4 sm:p-6 mt-[10vh] relative z-10">
        <motion.form
          onSubmit={handleSubmit}
          className="w-full max-w-lg mx-auto"
          initial={{ opacity: 0, y: -30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="p-8 rounded-2xl shadow-2xl bg-gray-900/70 backdrop-blur-md border border-gray-700 space-y-6">
            <h2 className="text-3xl font-bold text-center text-white mb-6">
              Event Registration
            </h2>

            <div>
              <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                <FaUser className="text-blue-400" /> Name
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="input-glow w-full bg-gray-800/50 text-white p-3 rounded-lg border border-gray-700 placeholder:text-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                <FaEnvelope className="text-blue-400" /> Email
                <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="input-glow w-full bg-gray-800/50 text-white p-3 rounded-lg border border-gray-700 placeholder:text-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                <FaPhone className="text-blue-400" /> Phone Number
                <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                placeholder="Enter phone number"
                maxLength={10}
                className="input-glow w-full bg-gray-800/50 text-white p-3 rounded-lg border border-gray-700 placeholder:text-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                <FaIdCard className="text-blue-400" /> Registration Number
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter registration number(23BCExxxxx)"
                className="input-glow w-full bg-gray-800/50 text-white p-3 rounded-lg border border-gray-700 placeholder:text-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                <FaCreditCard className="text-blue-400" /> Transaction ID
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter transaction ID"
                className="input-glow w-full bg-gray-800/50 text-white p-3 rounded-lg border border-gray-700 placeholder:text-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1 flex items-center gap-2">
                <FaComment className="text-blue-400" /> Feedback
                <span className="text-gray-400 text-xs">(optional)</span>
              </label>
              <textarea
                placeholder="Write your feedback here..."
                rows={4}
                className="input-glow w-full bg-gray-800/50 text-white p-3 rounded-lg border border-gray-700 placeholder:text-gray-500"
              />
            </div>

            <div className="mt-4 flex justify-center">
              <button
                type="submit"
                className="px-6 py-2 flex items-center justify-center disabled:opacity-50"
                disabled={loading}
              >
                {loading ? (
                  <div className="inline-flex items-center gap-2 text-green-400 font-semibold">
                    <span className="relative">
                      Registering
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-green-400/70 to-transparent animate-[sweep_1.4s_ease-in-out_infinite]" />
                    </span>
                    <span className="inline-flex gap-1.5">
                      <span className="size-1.5 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.6)] animate-[dot_1.2s_ease-in-out_infinite, hue_3.6s_linear_infinite]" />
                      <span className="size-1.5 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.6)] animate-[dot_1.2s_ease-in-out_infinite_150ms, hue_3.6s_linear_infinite_150ms]" />
                      <span className="size-1.5 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.6)] animate-[dot_1.2s_ease-in-out_infinite_300ms, hue_3.6s_linear_infinite_300ms]" />
                    </span>
                  </div>
                ) : (
                  <SparkleButton />
                )}
              </button>
            </div>
          </div>
        </motion.form>
      </div>
    </>
  );
}

export default RegistrationForm;
