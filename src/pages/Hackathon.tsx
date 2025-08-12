import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'
import { Users, Calendar, MapPin, Trophy, Upload, ExternalLink, ArrowLeft, CheckCircle, CreditCard } from 'lucide-react'
import Navigation from '@/components/Navigation'

interface TeamMember {
  name: string
  registrationNumber: string
  email: string
}

interface ProblemStatement {
  id: number
  title: string
  description: string
}

const Hackathon: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  
  const [teamName, setTeamName] = useState('')
  const [teamLeader, setTeamLeader] = useState<TeamMember>({
    name: '',
    registrationNumber: '',
    email: ''
  })
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { name: '', registrationNumber: '', email: '' },
    { name: '', registrationNumber: '', email: '' },
    { name: '', registrationNumber: '', email: '' },
    { name: '', registrationNumber: '', email: '' }
  ])
  const [selectedProblem, setSelectedProblem] = useState<number | null>(null)
  const [pptFile, setPptFile] = useState<File | null>(null)
  const [additionalInfo, setAdditionalInfo] = useState('')
  const [transactionNumber, setTransactionNumber] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const problemStatements: ProblemStatement[] = [
    {
      id: 1,
      title: "AI-Powered Healthcare Diagnostics",
      description: "Develop an AI system that can analyze medical images and provide preliminary diagnostic suggestions for common diseases."
    },
    {
      id: 2,
      title: "Smart Agriculture Solutions",
      description: "Create an AI-driven platform that helps farmers optimize crop yields through predictive analytics and automated monitoring."
    },
    {
      id: 3,
      title: "Sustainable Energy Management",
      description: "Build an AI system for intelligent energy consumption optimization in smart cities and buildings."
    },
    {
      id: 4,
      title: "Educational Content Personalization",
      description: "Develop an AI platform that personalizes educational content based on individual learning patterns and preferences."
    },
    {
      id: 5,
      title: "Financial Fraud Detection",
      description: "Create an AI system for real-time detection of fraudulent transactions in banking and financial services."
    }
  ]

  // Calculate team size and fee
  const activeTeamMembers = teamMembers.filter(member => 
    member.name.trim() && member.registrationNumber.trim() && member.email.trim()
  ).length + 1 // +1 for team leader

  const isFullTeam = activeTeamMembers === 5
  const registrationFee = isFullTeam ? 400 : activeTeamMembers * 100

  useEffect(() => {
    if (!user) {
      toast.error('Please login to register for the hackathon')
      navigate('/login')
      return
    }
  }, [user, navigate])

  // Show loading or redirect if user is not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Redirecting to login...</p>
        </div>
      </div>
    )
  }

  const handleTeamMemberChange = (index: number, field: keyof TeamMember, value: string) => {
    const updatedMembers = [...teamMembers]
    updatedMembers[index] = { ...updatedMembers[index], [field]: value }
    setTeamMembers(updatedMembers)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type === 'application/vnd.ms-powerpoint' || 
          file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation') {
        setPptFile(file)
      } else {
        toast.error('Please upload a PowerPoint file (.ppt or .pptx)')
      }
    }
  }

  const validateForm = async () => {
    if (!teamName.trim()) {
      toast.error('Team name is required')
      return false
    }
    if (!teamLeader.name.trim() || !teamLeader.registrationNumber.trim() || !teamLeader.email.trim()) {
      toast.error('Team leader information is incomplete')
      return false
    }
    
    // Check minimum 2 members requirement
    if (activeTeamMembers < 2) {
      toast.error('Minimum 2 team members required (including team leader)')
      return false
    }
    
    // Validate email formats and uniqueness for team members
    const allEmails = [teamLeader.email, ...teamMembers.map(m => m.email).filter(email => email.trim())]
    
    // Check for duplicate emails
    const emailCounts = allEmails.reduce((acc, email) => {
      acc[email] = (acc[email] || 0) + 1
      return acc
    }, {} as Record<string, number>)
    
    const duplicateEmails = Object.keys(emailCounts).filter(email => emailCounts[email] > 1)
    
    if (duplicateEmails.length > 0) {
      toast.error(`Duplicate email addresses found: ${duplicateEmails.join(', ')}. Each team member must have a unique email.`)
      return false
    }
    
    // Simple email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    const invalidEmails = allEmails.filter(email => !emailRegex.test(email))
    
    if (invalidEmails.length > 0) {
      toast.error(`Please enter valid email addresses for: ${invalidEmails.join(', ')}`)
      return false
    }
    
    // For now, skip the authenticated user check as it requires admin privileges
    // This can be implemented later with a proper backend API
    // All emails are already validated for format and uniqueness
    
    if (!selectedProblem) {
      toast.error('Please select a problem statement')
      return false
    }
    if (!pptFile) {
      toast.error('Please upload your presentation file')
      return false
    }
    if (!transactionNumber.trim()) {
      toast.error('Please enter the transaction number')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const isValid = await validateForm()
    if (!isValid) return

    setIsLoading(true)

    try {
      let pptFileUrl = ''
      let pptFileName = ''

      // Upload file if provided
      if (pptFile) {
        const fileName = `${user.id}/${Date.now()}_${pptFile.name}`
        
        const { error: uploadError } = await supabase.storage
          .from('hackathon01')
          .upload(fileName, pptFile)

        if (uploadError) {
          console.error('Error uploading file:', uploadError)
          toast.error('Error uploading file: ' + uploadError.message)
          return
        }

        // Get the public URL
        const { data: urlData } = supabase.storage
          .from('hackathon01')
          .getPublicUrl(fileName)

        pptFileUrl = urlData.publicUrl
        pptFileName = pptFile.name
      }
      
      // Save submission to database
      const { error: dbError } = await supabase
        .from('hackathon_submissions')
        .insert({
          team_name: teamName,
          team_leader: teamLeader,
          team_members: teamMembers,
          problem_statement_id: selectedProblem,
          ppt_file_url: pptFileUrl,
          ppt_file_name: pptFileName,
          additional_info: additionalInfo,
          transaction_number: transactionNumber,
          registration_fee: registrationFee,
          team_size: activeTeamMembers,
          user_id: user.id,
          user_email: user.email,
          status: 'submitted'
        })

      if (dbError) {
        console.error('Database error details:', dbError)
        toast.error('Error saving submission: ' + dbError.message)
        return
      }

      setIsSubmitted(true)
      toast.success('Hackathon registration submitted successfully!')
    } catch (error) {
      console.error('Unexpected error:', error)
      toast.error('An unexpected error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  if (!user) {
    return null
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="text-center max-w-md mx-auto">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Registration Successful!</h1>
            <p className="text-muted-foreground mb-6">
              Your team has been registered for the Agentic AI Hackathon 2025. You will receive further instructions via email.
            </p>
            <Button
              onClick={() => navigate('/')}
              className="bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-electric mb-4">Agentic AI Hackathon 2025</h1>
          <p className="text-xl text-muted-foreground mb-6">Code the Future</p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-8">
            <Card className="text-center">
              <CardContent className="p-4">
                <Calendar className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="font-semibold">Sunday 14 September, 2025</p>
                <p className="text-sm text-muted-foreground">09:00 AM - 09:00 PM (24 Hours)</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-4">
                <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="font-semibold">VIT Bhopal Main Campus</p>
                <p className="text-sm text-muted-foreground">Bhopal, Madhya Pradesh</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-4">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="font-semibold">400 Max Participants</p>
                <p className="text-sm text-muted-foreground">Min 2, Max 5 members</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-4">
                <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
                <p className="font-semibold">Prize Pool: ₹10,000</p>
                <p className="text-sm text-muted-foreground">Exciting rewards</p>
              </CardContent>
            </Card>
          </div>

          <div className="mb-8">
            <a
              href={import.meta.env.VITE_HACKATHON_APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 text-primary hover:text-primary-glow transition-colors duration-200 font-medium"
            >
              <ExternalLink className="h-4 w-4" />
              <span>View Detailed Problem Statements</span>
            </a>
          </div>
        </div>

        {/* Registration Form */}
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-electric">Team Registration Form</CardTitle>
            <CardDescription>
              Fill in your team details and select a problem statement to work on
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Team Info */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="teamName">Team Name *</Label>
                  <Input
                    id="teamName"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="Enter your team name"
                    required
                  />
                </div>
              </div>

              {/* Team Size and Fee Info */}
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-semibold text-foreground">Team Size: {activeTeamMembers} members</h4>
                      <p className="text-sm text-muted-foreground">
                        {activeTeamMembers} team members
                      </p>
                    </div>
                    <div className="text-right">
                      <h4 className="font-semibold text-primary">Registration Fee: ₹{registrationFee}</h4>
                      <p className="text-sm text-muted-foreground">
                        {isFullTeam ? 'Full team discount applied' : `₹100 × ${activeTeamMembers} members`}
                      </p>
                    </div>
                  </div>
                  {activeTeamMembers < 2 && (
                    <p className="text-sm text-red-600 mt-2">
                      ⚠️ Minimum 2 team members required (including team leader)
                    </p>
                  )}
                  {activeTeamMembers < 5 && activeTeamMembers >= 2 && (
                    <p className="text-sm text-blue-600 mt-2">
                      💡 Add more members to get the full team discount (₹400 for 5 members)
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Team Leader */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Team Leader</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Name *</Label>
                    <Input
                      value={teamLeader.name}
                      onChange={(e) => setTeamLeader({ ...teamLeader, name: e.target.value })}
                      placeholder="Team leader name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Registration Number *</Label>
                    <Input
                      value={teamLeader.registrationNumber}
                      onChange={(e) => setTeamLeader({ ...teamLeader, registrationNumber: e.target.value })}
                      placeholder="e.g., 23MIM10111"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Email *</Label>
                    <Input
                      type="email"
                      value={teamLeader.email}
                      onChange={(e) => setTeamLeader({ ...teamLeader, email: e.target.value })}
                      placeholder="team.leader@vitbhopal.ac.in"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Team Members */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Team Members (Optional - Max 4 additional members)</h3>
                                 <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                   <p className="text-sm text-blue-800">
                     <strong>Important:</strong> All team members must have unique email addresses. 
                     Each team member must have a different email address. You can add up to 4 additional team members (maximum 5 total including team leader).
                   </p>
                 </div>
                {teamMembers.map((member, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input
                        value={member.name}
                        onChange={(e) => handleTeamMemberChange(index, 'name', e.target.value)}
                        placeholder={`Member ${index + 1} name`}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Registration Number</Label>
                      <Input
                        value={member.registrationNumber}
                        onChange={(e) => handleTeamMemberChange(index, 'registrationNumber', e.target.value)}
                        placeholder="e.g., 23MIM10112"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input
                        type="email"
                        value={member.email}
                        onChange={(e) => handleTeamMemberChange(index, 'email', e.target.value)}
                        placeholder="member@vitbhopal.ac.in"
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Information *
                </h3>
                <Card className="bg-green-50 border-green-200">
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Registration Fee:</span>
                        <span className="font-bold text-green-600">₹{registrationFee}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>• ₹100 per team member</p>
                        <p>• ₹400 for full team (5 members)</p>
                        <p>• Payment via UPI/Net Banking/Bank Transfer</p>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-sm font-medium text-blue-800">UPI ID for Payment:</p>
                        <p className="text-lg font-bold text-blue-900">vitkultclub@indianbk</p>
                        <p className="text-xs text-blue-700 mt-1">Please use this UPI ID for payment and provide the transaction number below</p>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg p-3 mt-3 text-center">
                        <p className="text-sm font-medium text-gray-800 mb-2">Scan QR Code for Payment:</p>
                        <img src="/indian_bank_qr.png" alt="Indian Bank QR Code" className="mx-auto h-48 w-48" />
                        <p className="text-xs text-gray-600 mt-2">Scan this QR code with any UPI app to make payment</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="space-y-2">
                  <Label htmlFor="transactionNumber">Transaction Number *</Label>
                  <Input
                    id="transactionNumber"
                    value={transactionNumber}
                    onChange={(e) => setTransactionNumber(e.target.value)}
                    placeholder="Enter your payment transaction number"
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Please provide the transaction number from your payment confirmation
                  </p>
                </div>
              </div>

              {/* Problem Statement Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Select Problem Statement *</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {problemStatements.map((problem) => (
                    <Card
                      key={problem.id}
                      className={`cursor-pointer transition-all duration-200 ${
                        selectedProblem === problem.id
                          ? 'border-primary bg-primary/5'
                          : 'hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedProblem(problem.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start space-x-3">
                          <input
                            type="radio"
                            name="problemStatement"
                            value={problem.id}
                            checked={selectedProblem === problem.id}
                            onChange={() => setSelectedProblem(problem.id)}
                            className="w-4 h-4 mt-1 rounded-full border-2 border-muted-foreground text-primary focus:ring-primary focus:ring-offset-0 focus:ring-2"
                          />
                          <div>
                            <h4 className="font-semibold text-foreground mb-2">{problem.title}</h4>
                            <p className="text-sm text-muted-foreground">{problem.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* File Upload */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Upload Presentation *</h3>
                <div className="space-y-2">
                  <Label htmlFor="pptFile">PowerPoint Presentation (.ppt/.pptx)</Label>
                  <Input
                    id="pptFile"
                    type="file"
                    accept=".ppt,.pptx"
                    onChange={handleFileChange}
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Upload your team's presentation explaining your approach to the selected problem
                  </p>
                </div>
              </div>

              {/* Additional Information */}
              <div className="space-y-2">
                <Label htmlFor="additionalInfo">Additional Information</Label>
                <Textarea
                  id="additionalInfo"
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  placeholder="Any additional details about your team or approach..."
                  rows={4}
                />
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading || activeTeamMembers < 2}
                className="w-full h-12 bg-gradient-to-r from-primary to-primary-glow hover:from-primary-glow hover:to-primary text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                    <span>Submitting Registration...</span>
                  </div>
                ) : (
                  <span>Submit Registration</span>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Hackathon
