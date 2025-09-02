import React, { useEffect, useState } from "react";
import SparkleButton from "../components/ui/SparkleButton";
import Navigation from "@/components/Navigation";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaIdCard,
  FaCreditCard,
  FaComment,
  FaImage,
  FaCalendarCheck,
  FaUsers,
  FaTag,
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
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    regNo: "",
    mobile: "",
    email: "",
    utrNumber: "",
    paymentScreenshot: null,
    eventChoice: "",
    teamSize: 1,
    teamName: "",
    teamMember1Email: "",
    teamMember2Email: "",
    teamMember3Email: "",
    teamMember4Email: "",
    teamMember5Email: "",
    teamMember1Name: "", // Add this
    teamMember2Name: "", // Add this
    teamMember3Name: "", // Add this
    teamMember4Name: "", // Add this
    teamMember5Name: "", // Add this
    referralCode: "",
  });

  const [popupOpen, setPopupOpen] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupError, setPopupError] = useState(false);
  const [loading, setLoading] = useState(false);

  const teamMembers = [
    { email: "teamMember2Email", name: "teamMember2Name" },
    { email: "teamMember3Email", name: "teamMember3Name" },
    { email: "teamMember4Email", name: "teamMember4Name" },
    { email: "teamMember5Email", name: "teamMember5Name" },
  ];

  function handleInputChange(e) {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const requiredFields = [
      "name",
      "regNo",
      "mobile",
      "email",
      "utrNumber",
      "paymentScreenshot",
      "eventChoice",
    ];

    if (
      formData.eventChoice === "House of Secrets" ||
      formData.eventChoice === "Both Events"
    ) {
      requiredFields.push("teamName");
      if (formData.teamSize > 1) {
        for (let i = 2; i <= formData.teamSize; i++) {
          requiredFields.push(`teamMember${i}Email`);
          requiredFields.push(`teamMember${i}Name`); // Add this
        }
      }
    }

    const isFormValid = requiredFields.every((field) => formData[field]);

    if (!isFormValid) {
      setPopupMessage("Please fill in all required fields.");
      setPopupError(true);
      setPopupOpen(true);
      return;
    }

    setLoading(true);

    const url = import.meta.env.VITE_GOOGLE_SHEETS_API;
    const base64File = formData.paymentScreenshot
      ? await toBase64(formData.paymentScreenshot)
      : "";

    const formPayload = new URLSearchParams();
    formPayload.append("eventChoice", formData.eventChoice);
    formPayload.append("name", formData.name);
    formPayload.append("regNo", formData.regNo);
    formPayload.append("mobile", formData.mobile);
    formPayload.append("email", formData.email);
    formPayload.append("utrNumber", formData.utrNumber);
    formPayload.append("paymentScreenshot", base64File);
    formPayload.append("teamSize", formData.teamSize);
    formPayload.append("teamName", formData.teamName);

    for (let i = 0; i < teamMembers.length; i++) {
      if (i + 2 <= formData.teamSize) {
        formPayload.append(
          teamMembers[i].email,
          formData[teamMembers[i].email]
        );
        formPayload.append(teamMembers[i].name, formData[teamMembers[i].name]); // Add this
      }
    }
    formPayload.append("referralCode", formData.referralCode);

    fetch(url, {
      method: "POST",
      body: formPayload,
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok.");
        }
        return res.text();
      })
      .then((data) => {
        setPopupMessage("Form submitted successfully! " + data);
        setPopupError(false);
        setPopupOpen(true);
        // Reset form fields, including the new name fields
        setFormData({
          name: "",
          regNo: "",
          mobile: "",
          email: "",
          utrNumber: "",
          paymentScreenshot: null,
          eventChoice: "",
          teamSize: 1,
          teamName: "",
          teamMember1Email: "",
          teamMember2Email: "",
          teamMember3Email: "",
          teamMember4Email: "",
          teamMember5Email: "",
          teamMember1Name: "", // Add this
          teamMember2Name: "", // Add this
          teamMember3Name: "", // Add this
          teamMember4Name: "", // Add this
          teamMember5Name: "", // Add this
          referralCode: "",
        });
      })
      .catch((err) => {
        setPopupMessage("Form submission failed. Please try again.");
        setPopupError(true);
        setPopupOpen(true);
        console.error(err);
      })
      .finally(() => setLoading(false));
  }

  function toBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = (error) => reject(error);
    });
  }

  return (
    <>
      <Navigation />
      <div className="area fixed inset-0 -z-10">
        <ul className="circles">
          {Array.from({ length: 10 }).map((_, i) => (
            <li key={i}></li>
          ))}
        </ul>
      </div>

      <Dialog open={popupOpen} onOpenChange={setPopupOpen}>
        <DialogContent className="bg-gray-900 text-white border border-gray-700 p-6 rounded-lg shadow-lg">
          <DialogHeader>
            <DialogTitle
              className={`text-2xl font-bold ${
                popupError ? "text-red-400" : "text-green-400"
              }`}
            >
              {popupError ? "Error" : "Success"}
            </DialogTitle>
            <DialogDescription className="text-gray-300 mt-2 text-base">
              {popupMessage}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mt-6 flex justify-end">
            <Button
              onClick={() => setPopupOpen(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-200"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="min-h-screen flex flex-col items-center justify-start py-16 px-4 sm:px-6 relative z-10">
        <motion.form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl mx-auto space-y-8"
          initial={{ opacity: 0, y: -30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="p-8 md:p-10 rounded-3xl shadow-2xl bg-gray-900/70 backdrop-blur-md border border-gray-700 space-y-8">
            <h2 className="text-4xl font-extrabold text-center text-white mb-6 tracking-wide">
              VITKULT Event Registration
            </h2>

            {/* Event Selection */}
            <div className="border border-gray-700 p-5 rounded-xl bg-gray-800/50">
              <label className="block text-sm font-medium mb-2 flex items-center gap-2 text-gray-200">
                <FaCalendarCheck className="text-purple-400 text-lg" /> Event
                You Wish to register <span className="text-red-500">*</span>
              </label>
              <select
                name="eventChoice"
                value={formData.eventChoice}
                onChange={handleInputChange}
                className="input-glow w-full bg-gray-800/50 text-white p-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-purple-500 transition-all"
              >
                <option value="">Select an event</option>
                <option value="Generative and Agentic AI">
                  Generative and Agentic AI
                </option>
                <option value="House of Secrets">
                  House of Secrets + The Red File
                </option>
                <option value="Both Events">Both The Events</option>
              </select>
            </div>

            {/* Participant Details Section */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white mb-4 border-b border-gray-700 pb-2">
                Participant Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1 flex items-center gap-2 text-gray-200">
                    <FaUser className="text-blue-400" /> Name{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="input-glow w-full bg-gray-800/50 text-white p-3 rounded-lg border border-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 flex items-center gap-2 text-gray-200">
                    <FaIdCard className="text-blue-400" /> Registration Number{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="regNo"
                    value={formData.regNo}
                    onChange={handleInputChange}
                    placeholder="e.g., 23BCExxxxx"
                    className="input-glow w-full bg-gray-800/50 text-white p-3 rounded-lg border border-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 flex items-center gap-2 text-gray-200">
                    <FaPhone className="text-blue-400" /> Mobile Number{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleInputChange}
                    placeholder="e.g., 9876543210"
                    maxLength={10}
                    className="input-glow w-full bg-gray-800/50 text-white p-3 rounded-lg border border-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 flex items-center gap-2 text-gray-200">
                    <FaEnvelope className="text-blue-400" /> Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="input-glow w-full bg-gray-800/50 text-white p-3 rounded-lg border border-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Team Details Section (Conditional Rendering) */}
            {(formData.eventChoice === "House of Secrets" ||
              formData.eventChoice === "Both Events") && (
              <div className="space-y-6 pt-6">
                <h3 className="text-2xl font-bold text-white border-b border-gray-700 pb-2">
                  Team Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium mb-1 flex items-center gap-2 text-gray-200">
                      <FaUsers className="text-blue-400" /> Team Name{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="teamName"
                      value={formData.teamName}
                      onChange={handleInputChange}
                      placeholder="Enter team name"
                      className="input-glow w-full bg-gray-800/50 text-white p-3 rounded-lg border border-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1 flex items-center gap-2 text-gray-200">
                      <FaUsers className="text-blue-400" /> Team Size{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="teamSize"
                      value={formData.teamSize}
                      onChange={handleInputChange}
                      className="input-glow w-full bg-gray-800/50 text-white p-3 rounded-lg border border-gray-700 focus:ring-2 focus:ring-blue-500 transition-all"
                    >
                      {[1, 2, 3, 4, 5].map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Team Member Emails and Names */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Array.from({ length: formData.teamSize - 1 }).map(
                    (_, index) => (
                      <React.Fragment key={index}>
                        <div>
                          <label className="block text-sm font-medium mb-1 flex items-center gap-2 text-gray-200">
                            <FaUser className="text-blue-400" /> Team Member{" "}
                            {index + 2} Name{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            name={`teamMember${index + 2}Name`}
                            value={formData[`teamMember${index + 2}Name`]}
                            onChange={handleInputChange}
                            placeholder={`Enter name for Team Member ${
                              index + 2
                            }`}
                            className="input-glow w-full bg-gray-800/50 text-white p-3 rounded-lg border border-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-1 flex items-center gap-2 text-gray-200">
                            <FaEnvelope className="text-blue-400" /> Team Member{" "}
                            {index + 2} Email{" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            name={`teamMember${index + 2}Email`}
                            value={formData[`teamMember${index + 2}Email`]}
                            onChange={handleInputChange}
                            placeholder={`Enter email for Team Member ${
                              index + 2
                            }`}
                            className="input-glow w-full bg-gray-800/50 text-white p-3 rounded-lg border border-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 transition-all"
                          />
                        </div>
                      </React.Fragment>
                    )
                  )}
                </div>
              </div>
            )}

            {/* Referral Code */}
            <div>
              <label className="block text-sm font-medium mb-1 flex items-center gap-2 text-gray-200">
                <FaTag className="text-blue-400" /> Referral Code{" "}
                <span className="text-gray-400 text-xs">(optional)</span>
              </label>
              <input
                type="text"
                name="referralCode"
                value={formData.referralCode}
                onChange={handleInputChange}
                placeholder="Enter referral code"
                className="input-glow w-full bg-gray-800/50 text-white p-3 rounded-lg border border-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 transition-all"
              />
            </div>

            {/* Payment Details */}
            <div className="pt-6">
              <h3 className="text-2xl font-bold text-white border-b border-gray-700 pb-2">
                Payment Details
              </h3>
              <div className="space-y-6 mt-4">
                <div>
                  <label className="block text-sm font-medium mb-1 flex items-center gap-2 text-gray-200">
                    <FaCreditCard className="text-blue-400" /> Enter UTR Number{" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="utrNumber"
                    value={formData.utrNumber}
                    onChange={handleInputChange}
                    placeholder="Enter UTR Number"
                    className="input-glow w-full bg-gray-800/50 text-white p-3 rounded-lg border border-gray-700 placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1 flex items-center gap-2 text-gray-200">
                    <FaImage className="text-green-400" /> Upload Payment
                    Screenshot <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="file"
                    name="paymentScreenshot"
                    onChange={handleInputChange}
                    accept="image/*"
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600 w-full text-gray-300 mt-2 cursor-pointer transition-colors"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                className="px-8 py-3 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
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
