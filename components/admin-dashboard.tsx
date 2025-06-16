'use client';

import { useState, useTransition } from 'react';
import { Plus, Edit, Trash2, Eye, Check, X, FileText, Book, Users, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

interface AdminDashboardProps {
  journals: any[];
  articles: any[];
}

export function AdminDashboard({ journals: initialJournals, articles: initialArticles }: AdminDashboardProps) {
  const [journals, setJournals] = useState(initialJournals);
  const [articles, setArticles] = useState(initialArticles);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  // Journal form state
  const [journalForm, setJournalForm] = useState({
    id: '',
    name: '',
    slug: '',
    description: '',
    issn: ''
  });

  // Volume form state
  const [volumeForm, setVolumeForm] = useState({
    id: '',
    number: '',
    year: '',
    journalId: ''
  });

  // Issue form state
  const [issueForm, setIssueForm] = useState({
    id: '',
    number: '',
    title: '',
    month: '',
    volumeId: ''
  });

  const [openDialogs, setOpenDialogs] = useState({
    journal: false,
    volume: false,
    issue: false
  });

  const resetForms = () => {
    setJournalForm({ id: '', name: '', slug: '', description: '', issn: '' });
    setVolumeForm({ id: '', number: '', year: '', journalId: '' });
    setIssueForm({ id: '', number: '', title: '', month: '', volumeId: '' });
  };

  const handleJournalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        console.log(journalForm)
        const method = journalForm.id ? 'PUT' : 'POST';
        const response = await fetch('/api/admin/journals', {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(journalForm)
        });

        if (response.ok) {
          const data = response.json()
          // console.log(data)

          toast.success(`Journal ${journalForm.id ? 'updated' : 'created'} successfully`);
          setOpenDialogs(prev => ({ ...prev, journal: false }));
          resetForms();
          router.refresh();
        } else {
          toast.error('Failed to save journal');
        }
      } catch (error) {
        toast.error('An error occurred');
      }
    });
  };

  const handleVolumeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const method = volumeForm.id ? 'PUT' : 'POST';
        const response = await fetch('/api/admin/volumes', {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(volumeForm)
        });

        if (response.ok) {
          toast.success(`Volume ${volumeForm.id ? 'updated' : 'created'} successfully`);
          setOpenDialogs(prev => ({ ...prev, volume: false }));
          resetForms();
          router.refresh();
        } else {
          toast.error('Failed to save volume');
        }
      } catch (error) {
        toast.error('An error occurred');
      }
    });
  };

  const handleIssueSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startTransition(async () => {
      try {
        const method = issueForm.id ? 'PUT' : 'POST';
        const response = await fetch('/api/admin/issues', {
          method,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(issueForm)
        });

        if (response.ok) {
          toast.success(`Issue ${issueForm.id ? 'updated' : 'created'} successfully`);
          setOpenDialogs(prev => ({ ...prev, issue: false }));
          resetForms();
          router.refresh();
        } else {
          toast.error('Failed to save issue');
        }
      } catch (error) {
        toast.error('An error occurred');
      }
    });
  };

  const handleDelete = async (type: 'journal' | 'volume' | 'issue', id: string) => {
    startTransition(async () => {
      try {
        const response = await fetch(`/api/admin/${type}s?id=${id}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully`);
          router.refresh();
        } else {
          toast.error(`Failed to delete ${type}`);
        }
      } catch (error) {
        toast.error('An error occurred');
      }
    });
  };

  const handleArticleStatusChange = async (articleId: string, status: string, paymentVerified?: boolean) => {
    startTransition(async () => {
      try {
        const response = await fetch('/api/admin/articles', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: articleId, status, paymentVerified })
        });

        if (response.ok) {
          toast.success('Article status updated successfully');
          router.refresh();
        } else {
          toast.error('Failed to update article status');
        }
      } catch (error) {
        toast.error('An error occurred');
      }
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DRAFT': return 'bg-gray-100 text-gray-800';
      case 'SUBMITTED': return 'bg-blue-100 text-blue-800';
      case 'UNDER_REVIEW': return 'bg-yellow-100 text-yellow-800';
      case 'APPROVED': return 'bg-green-100 text-green-800';
      case 'REJECTED': return 'bg-red-100 text-red-800';
      case 'PUBLISHED': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const stats = {
    totalJournals: journals.length,
    totalVolumes: journals.reduce((acc, j) => acc + j.volumes.length, 0),
    totalIssues: journals.reduce((acc, j) => acc + j.volumes.reduce((vacc: number, v: any) => vacc + v.issues.length, 0), 0),
    totalArticles: articles.length,
    pendingArticles: articles.filter(a => a.status === 'SUBMITTED' || a.status === 'UNDER_REVIEW').length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">Admin Dashboard</h1>
            <p className="text-slate-600 mt-2">Manage journals, volumes, issues, and article submissions</p>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Total Journals</CardTitle>
              <Book className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalJournals}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Total Volumes</CardTitle>
              <Calendar className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalVolumes}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Total Issues</CardTitle>
              <FileText className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalIssues}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Total Articles</CardTitle>
              <Users className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalArticles}</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium opacity-90">Pending Review</CardTitle>
              <Eye className="h-4 w-4 opacity-90" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.pendingArticles}</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="journals" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="journals">Journals</TabsTrigger>
            <TabsTrigger value="volumes">Volumes</TabsTrigger>
            <TabsTrigger value="issues">Issues</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
          </TabsList>

          {/* Journals Tab */}
          <TabsContent value="journals" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Journals Management</h2>
              <Dialog open={openDialogs.journal} onOpenChange={(open) => {
                setOpenDialogs(prev => ({ ...prev, journal: open }));
                if (!open) resetForms();
              }}>
                <DialogTrigger asChild>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Journal
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>{journalForm.id ? 'Edit Journal' : 'Create New Journal'}</DialogTitle>
                    <DialogDescription>
                      {journalForm.id ? 'Update journal information' : 'Add a new journal to the system'}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleJournalSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Journal Name</Label>
                        <Input
                          id="name"
                          value={journalForm.name}
                          onChange={(e) => setJournalForm(prev => ({ ...prev, name: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="slug">Slug</Label>
                        <Input
                          id="slug"
                          value={journalForm.slug}
                          onChange={(e) => setJournalForm(prev => ({ ...prev, slug: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="issn">ISSN</Label>
                      <Input
                        id="issn"
                        value={journalForm.issn}
                        onChange={(e) => setJournalForm(prev => ({ ...prev, issn: e.target.value }))}
                      />
                    </div>
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        value={journalForm.description}
                        onChange={(e) => setJournalForm(prev => ({ ...prev, description: e.target.value }))}
                        rows={3}
                      />
                    </div>
                    <DialogFooter>
                      <Button type="submit" disabled={isPending}>
                        {isPending ? 'Saving...' : journalForm.id ? 'Update Journal' : 'Create Journal'}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-6">
              {journals.map((journal) => (
                <Card key={journal.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl">{journal.name}</CardTitle>
                        <CardDescription className="mt-1">
                          ISSN: {journal.issn || 'Not assigned'} | Slug: {journal.slug}
                        </CardDescription>
                        {journal.description && (
                          <p className="text-sm text-slate-600 mt-2">{journal.description}</p>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setJournalForm({
                              id: journal.id,
                              name: journal.name,
                              slug: journal.slug,
                              description: journal.description || '',
                              issn: journal.issn || ''
                            });
                            setOpenDialogs(prev => ({ ...prev, journal: true }));
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Journal</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{journal.name}"? This will also delete all associated volumes, issues, and articles. This action cannot be undone.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete('journal', journal.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-4 text-sm text-slate-600">
                      <span>{journal.volumes.length} volumes</span>
                      <span>{journal.volumes.reduce((acc: number, v: any) => acc + v.issues.length, 0)} issues</span>
                      <span>{journal.volumes.reduce((acc: number, v: any) => acc + v.issues.reduce((iacc: number, i: any) => iacc + i.articles.length, 0), 0)} articles</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Volumes Tab */}
          <TabsContent value="volumes" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Volumes Management</h2>
              <Dialog open={openDialogs.volume} onOpenChange={(open) => {
                setOpenDialogs(prev => ({ ...prev, volume: open }));
                if (!open) resetForms();
              }}>
                <DialogTrigger asChild>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Volume
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{volumeForm.id ? 'Edit Volume' : 'Create New Volume'}</DialogTitle>
                    <DialogDescription>
                      {volumeForm.id ? 'Update volume information' : 'Add a new volume to a journal'}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleVolumeSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="journal-select">Journal</Label>
                      <Select
                        value={volumeForm.journalId}
                        onValueChange={(value) => setVolumeForm(prev => ({ ...prev, journalId: value }))}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a journal" />
                        </SelectTrigger>
                        <SelectContent>
                          {journals.map((journal) => (
                            <SelectItem key={journal.id} value={journal.id}>
                              {journal.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="volume-number">Volume Number</Label>
                        <Input
                          id="volume-number"
                          type="number"
                          value={volumeForm.number}
                          onChange={(e) => setVolumeForm(prev => ({ ...prev, number: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="volume-year">Year</Label>
                        <Input
                          id="volume-year"
                          type="number"
                          value={volumeForm.year}
                          onChange={(e) => setVolumeForm(prev => ({ ...prev, year: e.target.value }))}
                          required
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" disabled={isPending}>
                        {isPending ? 'Saving...' : volumeForm.id ? 'Update Volume' : 'Create Volume'}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {journals.map((journal) =>
                journal.volumes.map((volume: any) => (
                  <Card key={volume.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">
                            {journal.name} - Volume {volume.number} ({volume.year})
                          </CardTitle>
                          <CardDescription>
                            {volume.issues.length} issues
                          </CardDescription>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setVolumeForm({
                                id: volume.id,
                                number: volume.number.toString(),
                                year: volume.year.toString(),
                                journalId: journal.id
                              });
                              setOpenDialogs(prev => ({ ...prev, volume: true }));
                            }}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Volume</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete Volume {volume.number}? This will also delete all associated issues and articles.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                  onClick={() => handleDelete('volume', volume.id)}
                                  className="bg-red-600 hover:bg-red-700"
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </div>
                    </CardHeader>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>

          {/* Issues Tab */}
          <TabsContent value="issues" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Issues Management</h2>
              <Dialog open={openDialogs.issue} onOpenChange={(open) => {
                setOpenDialogs(prev => ({ ...prev, issue: open }));
                if (!open) resetForms();
              }}>
                <DialogTrigger asChild>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="w-4 h-4 mr-2" />
                    Create Issue
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{issueForm.id ? 'Edit Issue' : 'Create New Issue'}</DialogTitle>
                    <DialogDescription>
                      {issueForm.id ? 'Update issue information' : 'Add a new issue to a volume'}
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleIssueSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="volume-select">Volume</Label>
                      <Select
                        value={issueForm.volumeId}
                        onValueChange={(value) => setIssueForm(prev => ({ ...prev, volumeId: value }))}
                        required
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a volume" />
                        </SelectTrigger>
                        <SelectContent>
                          {journals.map((journal) =>
                            journal.volumes.map((volume: any) => (
                              <SelectItem key={volume.id} value={volume.id}>
                                {journal.name} - Volume {volume.number} ({volume.year})
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="issue-number">Issue Number</Label>
                        <Input
                          id="issue-number"
                          type="number"
                          value={issueForm.number}
                          onChange={(e) => setIssueForm(prev => ({ ...prev, number: e.target.value }))}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="issue-month">Month</Label>
                        <Input
                          id="issue-month"
                          type="number"
                          min="1"
                          max="12"
                          value={issueForm.month}
                          onChange={(e) => setIssueForm(prev => ({ ...prev, month: e.target.value }))}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="issue-title">Title (Optional)</Label>
                      <Input
                        id="issue-title"
                        value={issueForm.title}
                        onChange={(e) => setIssueForm(prev => ({ ...prev, title: e.target.value }))}
                      />
                    </div>
                    <DialogFooter>
                      <Button type="submit" disabled={isPending}>
                        {isPending ? 'Saving...' : issueForm.id ? 'Update Issue' : 'Create Issue'}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {journals.map((journal) =>
                journal.volumes.map((volume: any) =>
                  volume.issues.map((issue: any) => (
                    <Card key={issue.id} className="hover:shadow-md transition-shadow">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <div>
                            <CardTitle className="text-lg">
                              {journal.name} - Volume {volume.number}, Issue {issue.number}
                            </CardTitle>
                            <CardDescription>
                              {issue.title && `${issue.title} • `}
                              {issue.month && `Month ${issue.month} • `}
                              {issue.articles.length} articles
                            </CardDescription>
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {
                                setIssueForm({
                                  id: issue.id,
                                  number: issue.number.toString(),
                                  title: issue.title || '',
                                  month: issue.month?.toString() || '',
                                  volumeId: volume.id
                                });
                                setOpenDialogs(prev => ({ ...prev, issue: true }));
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>Delete Issue</AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete Issue {issue.number}? This will also delete all associated articles.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete('issue', issue.id)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))
                )
              )}
            </div>
          </TabsContent>

          {/* Articles Tab */}
          <TabsContent value="articles" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Articles Management</h2>
              <div className="text-sm text-slate-600">
                {stats.pendingArticles} articles pending review
              </div>
            </div>

            <div className="grid gap-4">
              {articles.map((article) => (
                <Card key={article.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-2">{article?.title}</CardTitle>
                        <div className="space-y-1 text-sm text-slate-600">
                          <p><strong>Authors:</strong> {article?.authors}</p>
                          <p><strong>Publisher:</strong> {article?.publisher.name} ({article.publisher.email})</p>
                          <p><strong>Journal:</strong> {article?.issue?.volume?.journal?.name}</p>
                          <p><strong>Volume/Issue:</strong> Vol. {article?.issue?.volume?.number}, Issue {article?.issue?.number}</p>
                          <p><strong>Submitted:</strong> {new Date(article?.createdAt).toLocaleDateString()}</p>
                          {article.abstract && (
                            <p><strong>Abstract:</strong> {article.abstract.substring(0, 200)}...</p>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2 ml-4">
                        <Badge className={getStatusColor(article.status)}>
                          {article.status.replace('_', ' ')}
                        </Badge>
                        {article.paymentProof && (
                          <Badge variant={article.paymentVerified ? 'default' : 'secondary'}>
                            Payment {article.paymentVerified ? 'Verified' : 'Pending'}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {article.fileUrl && (
                        <Button size="sm" variant="outline" asChild>
                          <a href={article.fileUrl} target="_blank" rel="noopener noreferrer">
                            <FileText className="w-4 h-4 mr-1" />
                            View PDF
                          </a>
                        </Button>
                      )}
                      {article.paymentProof && (
                        <Button size="sm" variant="outline" asChild>
                          <a href={article.paymentProof} target="_blank" rel="noopener noreferrer">
                            <Eye className="w-4 h-4 mr-1" />
                            View Payment
                          </a>
                        </Button>
                      )}

                      {['SUBMITTED', 'UNDER_REVIEW'].includes(article.status) && (
                        <>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => handleArticleStatusChange(article.id, 'APPROVED')}
                            disabled={isPending}
                          >
                            <Check className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleArticleStatusChange(article.id, 'REJECTED')}
                            disabled={isPending}
                          >
                            <X className="w-4 h-4 mr-1" />
                            Reject
                          </Button>
                        </>
                      )}

                      {article.status === 'APPROVED' && (
                        <Button
                          size="sm"
                          className="bg-purple-600 hover:bg-purple-700"
                          onClick={() => handleArticleStatusChange(article.id, 'PUBLISHED')}
                          disabled={isPending}
                        >
                          <FileText className="w-4 h-4 mr-1" />
                          Publish
                        </Button>
                      )}

                      {article.paymentProof && !article.paymentVerified && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleArticleStatusChange(article.id, article.status, true)}
                          disabled={isPending}
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Verify Payment
                        </Button>
                      )}

                      <Select
                        value={article.status}
                        onValueChange={(status) => handleArticleStatusChange(article.id, status)}
                      >
                        <SelectTrigger className="w-40">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="DRAFT">Draft</SelectItem>
                          <SelectItem value="SUBMITTED">Submitted</SelectItem>
                          <SelectItem value="UNDER_REVIEW">Under Review</SelectItem>
                          <SelectItem value="APPROVED">Approved</SelectItem>
                          <SelectItem value="REJECTED">Rejected</SelectItem>
                          <SelectItem value="PUBLISHED">Published</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}