import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { toast } from 'sonner'
import { 
  Users, 
  Download, 
  Trash2, 
  UserPlus, 
  UserMinus, 
  Eye, 
  Search,
  Filter,
  Calendar,
  CreditCard,
  FileText
} from 'lucide-react'
import Navigation from '@/components/Navigation'

interface HackathonSubmission {
  id: string
  team_name: string
  team_leader: {
    name: string
    registrationNumber: string
    email: string
  }
  team_members: Array<{
    name: string
    registrationNumber: string
    email: string
  }>
  problem_statement_id: number
  ppt_file_url: string
  ppt_file_name: string
  additional_info: string
  transaction_number: string
  registration_fee: number
  team_size: number
  user_id: string
  user_email: string
  status: string
  created_at: string
}

interface AdminUser {
  id: string
  email: string
  role: string
  added_by: string
  added_at: string
}

const AdminDashboard: React.FC = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  
  const [submissions, setSubmissions] = useState<HackathonSubmission[]>([])
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showAdminManagement, setShowAdminManagement] = useState(false)
  const [newAdminEmail, setNewAdminEmail] = useState('')
  const [isSuperAdmin, setIsSuperAdmin] = useState(false)

  const problemStatements = {
    1: "AI-Powered Healthcare Diagnostics",
    2: "Smart Agriculture Solutions", 
    3: "Sustainable Energy Management",
    4: "Educational Content Personalization",
    5: "Financial Fraud Detection"
  }

  useEffect(() => {
    if (!user) {
      toast.error('Please login to access admin dashboard')
      navigate('/login')
      return
    }

    // Special bypass for super admin
    if (user.email === 'nithin.23mim10111@vitbhopal.ac.in') {
      setIsSuperAdmin(true)
      loadSubmissions()
      loadAdminUsers()
      return
    }

    checkAdminAccess()
    // Note: loadSubmissions and loadAdminUsers are now called from checkAdminAccess
    // to ensure they're only called after admin access is confirmed
  }, [user, navigate])

  const checkAdminAccess = async () => {
    try {
      // First check if user is logged in
      if (!user) {
        toast.error('Please login to access admin dashboard')
        navigate('/login')
        return
      }

      // Check if user is admin by querying the admin_users table
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', user.email)
        .single()

      if (error) {
        console.error('Error checking admin access:', error)
        // If table doesn't exist or other error, check if user is super admin
        if (user.email === 'nithin.23mim10111@vitbhopal.ac.in') {
          setIsSuperAdmin(true)
          loadSubmissions()
          loadAdminUsers()
          return
        }
        toast.error('Access denied. Admin privileges required.')
        navigate('/')
        return
      }

      if (data) {
        setIsSuperAdmin(user.email === 'nithin.23mim10111@vitbhopal.ac.in')
        loadSubmissions()
        loadAdminUsers()
      } else {
        toast.error('Access denied. Admin privileges required.')
        navigate('/')
      }
    } catch (error) {
      console.error('Error checking admin access:', error)
      // If there's an error, check if user is super admin
      if (user?.email === 'nithin.23mim10111@vitbhopal.ac.in') {
        setIsSuperAdmin(true)
        loadSubmissions()
        loadAdminUsers()
        return
      }
      toast.error('Error checking admin access')
      navigate('/')
    }
  }

  const loadSubmissions = async () => {
    try {
      console.log('Loading submissions for user:', user?.email)
      
      // Load active submissions (submitted and approved)
      const { data: activeSubmissions, error: activeError } = await supabase
        .from('hackathon_submissions')
        .select('*')
        .order('created_at', { ascending: false })

      if (activeError) {
        console.error('Error loading active submissions:', activeError)
        toast.error('Error loading submissions: ' + (activeError.message || ''))
        return
      }

      // Load rejected submissions
      const { data: rejectedSubmissions, error: rejectedError } = await supabase
        .from('rejected_submissions')
        .select('*')
        .order('created_at', { ascending: false })

      // If rejected submissions table doesn't exist, that's okay - just use active submissions
      let allSubmissions = activeSubmissions || []
      
      if (!rejectedError && rejectedSubmissions) {
        // Combine active and rejected submissions
        allSubmissions = [...(activeSubmissions || []), ...(rejectedSubmissions || [])]
        console.log('Loaded rejected submissions:', rejectedSubmissions.length)
      } else if (rejectedError) {
        console.log('Rejected submissions table not found or error:', rejectedError.message)
      }

      // Sort all submissions by created_at
      allSubmissions.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

      console.log('Successfully loaded total submissions:', allSubmissions.length)
      console.log('Active submissions:', (activeSubmissions || []).length)
      console.log('Rejected submissions:', (rejectedSubmissions || []).length)
      
      setSubmissions(allSubmissions)
    } catch (error) {
      console.error('Error loading submissions:', error)
      toast.error('Error loading submissions')
    } finally {
      setIsLoading(false)
    }
  }

  const loadAdminUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .order('added_at', { ascending: false })

      if (error) {
        console.error('Error loading admin users:', error)
        return
      }

      setAdminUsers(data || [])
    } catch (error) {
      console.error('Error loading admin users:', error)
    }
  }

  const addAdminUser = async () => {
    if (!newAdminEmail.trim()) {
      toast.error('Please enter an email address')
      return
    }

    // Validate that email ends with @vitbhopal.ac.in
    if (!newAdminEmail.trim().endsWith('@vitbhopal.ac.in')) {
      toast.error('Email must end with @vitbhopal.ac.in')
      return
    }

    try {
      const { error } = await supabase
        .from('admin_users')
        .insert({
          email: newAdminEmail.trim(),
          role: 'admin',
          added_by: user?.email || 'unknown',
          added_at: new Date().toISOString()
        })

      if (error) {
        console.error('Error adding admin user:', error)
        toast.error('Error adding admin user: ' + (error.message || ''))
        return
      }

      toast.success('Admin user added successfully')
      setNewAdminEmail('')
      loadAdminUsers()
    } catch (error) {
      console.error('Error adding admin user:', error)
      toast.error('Error adding admin user: ' + (error.message || error))
    }
  }

  const removeAdminUser = async (adminId: string, adminEmail: string) => {
    if (adminEmail === 'nithin.23mim10111@vitbhopal.ac.in') {
      toast.error('Cannot remove super admin')
      return
    }

    try {
      const { error } = await supabase
        .from('admin_users')
        .delete()
        .eq('id', adminId)

      if (error) {
        console.error('Error removing admin user:', error)
        toast.error('Error removing admin user')
        return
      }

      toast.success('Admin user removed successfully')
      loadAdminUsers()
    } catch (error) {
      console.error('Error removing admin user:', error)
      toast.error('Error removing admin user')
    }
  }

  const downloadFile = async (fileUrl: string, fileName: string) => {
    try {
      const response = await fetch(fileUrl)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = fileName
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Error downloading file:', error)
      toast.error('Error downloading file')
    }
  }

  const approveSubmission = async (submissionId: string) => {
    try {
      const { error } = await supabase
        .from('hackathon_submissions')
        .update({ status: 'approved' })
        .eq('id', submissionId)

      if (error) {
        console.error('Error approving submission:', error)
        toast.error('Error approving submission')
        return
      }

      toast.success('Submission approved successfully')
      loadSubmissions()
    } catch (error) {
      console.error('Error approving submission:', error)
      toast.error('Error approving submission')
    }
  }

  const rejectSubmission = async (submissionId: string) => {
    // Check if user is defined
    if (!user || !user.email) {
      toast.error('User not authenticated. Please login again.')
      return
    }

    try {
      // First, get the submission details
      const { data: submission, error: fetchError } = await supabase
        .from('hackathon_submissions')
        .select('*')
        .eq('id', submissionId)
        .single()

      if (fetchError) {
        console.error('Error fetching submission:', fetchError)
        toast.error('Error rejecting submission: ' + (fetchError.message || ''))
        return
      }

      // Insert into rejected_submissions table
      const { error: insertError } = await supabase
        .from('rejected_submissions')
        .insert({
          ...submission,
          status: 'rejected', // Ensure status is set to rejected
          rejected_by: user.email,
          rejected_at: new Date().toISOString()
        })

      if (insertError) {
        console.error('Error inserting into rejected_submissions:', insertError)
        toast.error('Error rejecting submission: ' + (insertError.message || ''))
        return
      }

      // Delete from hackathon_submissions table
      const { error: deleteError } = await supabase
        .from('hackathon_submissions')
        .delete()
        .eq('id', submissionId)

      if (deleteError) {
        console.error('Error deleting submission:', deleteError)
        toast.error('Error rejecting submission: ' + (deleteError.message || ''))
        return
      }

      toast.success('Submission rejected and moved to rejected list')
      loadSubmissions()
    } catch (error) {
      console.error('Error rejecting submission:', error)
      toast.error('Error rejecting submission: ' + (error.message || error))
    }
  }

  const filteredSubmissions = submissions.filter(submission => {
    const matchesSearch = submission.team_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.team_leader.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.team_leader.email.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || submission.status === filterStatus
    
    return matchesSearch && matchesStatus
  })

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8 pt-24">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-electric mb-2">Admin Dashboard</h1>
            <p className="text-muted-foreground">Manage hackathon submissions and admin users</p>
          </div>
          
          {isSuperAdmin && (
            <Button
              onClick={() => setShowAdminManagement(!showAdminManagement)}
              variant="outline"
              className="flex items-center gap-2"
            >
              {showAdminManagement ? <UserMinus className="h-4 w-4" /> : <UserPlus className="h-4 w-4" />}
              {showAdminManagement ? 'Hide Admin Management' : 'Admin Management'}
            </Button>
          )}
        </div>

        {/* Admin Management Section */}
        {showAdminManagement && isSuperAdmin && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Admin User Management
              </CardTitle>
              <CardDescription>
                Add or remove admin users. Only super admin can manage other admins.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <Label htmlFor="newAdminEmail">New Admin Email</Label>
                    <Input
                      id="newAdminEmail"
                      type="email"
                      value={newAdminEmail}
                      onChange={(e) => setNewAdminEmail(e.target.value)}
                      placeholder="Enter email address"
                    />
                  </div>
                  <Button onClick={addAdminUser} className="mt-6">
                    Add Admin
                  </Button>
                </div>

                <div className="space-y-2">
                  <h4 className="font-semibold">Current Admin Users</h4>
                  <div className="max-h-60 overflow-y-auto pr-2 space-y-2 scrollbar-glow">
                    {adminUsers.map((admin) => (
                      <div key={admin.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <p className="font-medium">{admin.email}</p>
                          <p className="text-sm text-muted-foreground">
                            Added by {admin.added_by} on {new Date(admin.added_at).toLocaleDateString()}
                          </p>
                        </div>
                        {admin.email !== 'nithin.23mim10111@vitbhopal.ac.in' && (
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => removeAdminUser(admin.id, admin.email)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Statistics Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Dashboard Overview
            </CardTitle>
            <CardDescription>
              Quick overview of all hackathon submissions and statistics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-blue-100 rounded-full">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-blue-600">{submissions.length}</p>
                <p className="text-sm text-muted-foreground">Total Submissions</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-yellow-100 rounded-full">
                  <Calendar className="h-6 w-6 text-yellow-600" />
                </div>
                <p className="text-2xl font-bold text-yellow-600">
                  {submissions.filter(s => s.status === 'submitted').length}
                </p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-green-100 rounded-full">
                  <FileText className="h-6 w-6 text-green-600" />
                </div>
                <p className="text-2xl font-bold text-green-600">
                  {submissions.filter(s => s.status === 'approved').length}
                </p>
                <p className="text-sm text-muted-foreground">Approved</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-red-100 rounded-full">
                  <FileText className="h-6 w-6 text-red-600" />
                </div>
                <p className="text-2xl font-bold text-red-600">
                  {submissions.filter(s => s.status === 'rejected').length}
                </p>
                <p className="text-sm text-muted-foreground">Rejected</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 pt-6 border-t">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-purple-100 rounded-full">
                  <CreditCard className="h-6 w-6 text-purple-600" />
                </div>
                <p className="text-2xl font-bold text-purple-600">
                  ₹{submissions.reduce((sum, sub) => sum + sub.registration_fee, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Total Revenue</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-2 bg-orange-100 rounded-full">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <p className="text-2xl font-bold text-orange-600">
                  {submissions.reduce((sum, sub) => sum + sub.team_size, 0)}
                </p>
                <p className="text-sm text-muted-foreground">Total Participants</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Label htmlFor="search">Search</Label>
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="search"
                    placeholder="Search by team name, leader name, or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
                             <div>
                 <Label htmlFor="status">Status</Label>
                 <select
                   id="status"
                   value={filterStatus}
                   onChange={(e) => setFilterStatus(e.target.value)}
                   className="w-full p-2 border border-input rounded-md bg-background text-foreground"
                 >
                   <option value="all">All Status</option>
                   <option value="submitted">Submitted</option>
                   <option value="approved">Approved</option>
                   <option value="rejected">Rejected</option>
                 </select>
               </div>
            </div>
          </CardContent>
        </Card>

        {/* Submissions List */}
        {isLoading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Loading submissions...</p>
          </div>
        ) : (
          <div className="max-h-[800px] overflow-y-auto pr-2 space-y-4 scrollbar-glow">
            {filteredSubmissions.map((submission) => (
              <Card key={submission.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{submission.team_name}</CardTitle>
                      <CardDescription>
                        Submitted by {submission.team_leader.name} ({submission.team_leader.email})
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        submission.status === 'submitted' ? 'bg-blue-100 text-blue-800' :
                        submission.status === 'approved' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {submission.status}
                      </span>
                      {submission.ppt_file_url && submission.ppt_file_url !== 'test-url' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => downloadFile(submission.ppt_file_url, submission.ppt_file_name)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">Team Details</h4>
                      <p><strong>Size:</strong> {submission.team_size} members</p>
                      <p><strong>Fee:</strong> ₹{submission.registration_fee}</p>
                      <p><strong>Problem:</strong> {problemStatements[submission.problem_statement_id as keyof typeof problemStatements]}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Team Leader</h4>
                      <p><strong>Name:</strong> {submission.team_leader.name}</p>
                      <p><strong>Reg No:</strong> {submission.team_leader.registrationNumber}</p>
                      <p><strong>Email:</strong> {submission.team_leader.email}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Team Members</h4>
                      {submission.team_members.filter(m => m.name.trim()).map((member, index) => (
                        <div key={index} className="mb-1">
                          <p className="text-sm">{member.name} ({member.email})</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {submission.additional_info && (
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">Additional Information</h4>
                      <p className="text-sm text-muted-foreground">{submission.additional_info}</p>
                    </div>
                  )}
                  
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex justify-between items-center">
                      <div className="text-sm text-muted-foreground">
                        <span>Transaction: {submission.transaction_number}</span>
                        <span className="ml-4">Submitted: {new Date(submission.created_at).toLocaleString()}</span>
                      </div>
                      {submission.status === 'submitted' && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => approveSubmission(submission.id)}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => rejectSubmission(submission.id)}
                          >
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {filteredSubmissions.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No submissions found</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default AdminDashboard
