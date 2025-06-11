'use client';

import { format } from 'date-fns';
import { Journal } from '@/lib/types';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileIcon, Clock, Eye, Download, User, Calendar, CheckCircle, XCircle, AlertCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuthStore, useJournalStore } from '@/lib/store';
import Image from 'next/image';

interface JournalCardProps {
  journal: Journal;
  showActions?: boolean;
}

export function JournalCard({ journal, showActions = false }: JournalCardProps) {
  const { user } = useAuthStore();
  const { updateJournalStatus } = useJournalStore();

  const isAdmin = user?.role?.toLowerCase() === 'admin';

  const getStatusConfig = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return {
          variant: 'default' as const,
          icon: CheckCircle,
          className: 'bg-emerald-100 text-emerald-800 border-emerald-200 hover:bg-emerald-200',
          bgGradient: 'from-emerald-50 to-green-50'
        };
      case 'rejected':
        return {
          variant: 'destructive' as const,
          icon: XCircle,
          className: 'bg-red-100 text-red-800 border-red-200 hover:bg-red-200',
          bgGradient: 'from-red-50 to-pink-50'
        };
      case 'pending':
        return {
          variant: 'secondary' as const,
          icon: AlertCircle,
          className: 'bg-amber-100 text-amber-800 border-amber-200 hover:bg-amber-200',
          bgGradient: 'from-amber-50 to-yellow-50'
        };
      default:
        return {
          variant: 'outline' as const,
          icon: AlertCircle,
          className: 'bg-gray-100 text-gray-800 border-gray-200 hover:bg-gray-200',
          bgGradient: 'from-gray-50 to-slate-50'
        };
    }
  };

  const statusConfig = getStatusConfig(journal.status);
  const StatusIcon = statusConfig.icon;
  const formattedDate = format(new Date(journal.createdAt), 'MMM d, yyyy');

  const handleStatusChange = (status: 'Approved' | 'Rejected') => {
    updateJournalStatus(journal.id, status);
  };

  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 border-0 shadow-lg bg-white">
      {/* Status Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${statusConfig.bgGradient} opacity-30 transition-opacity duration-300 group-hover:opacity-40`} />
      
      {/* Content Container */}
      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row">
          {/* Image Section */}
          {journal.imageUrl && (
            <div className="relative w-full lg:w-48 h-48 lg:h-auto flex-shrink-0">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10 rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none" />
              <Image
                src={journal.imageUrl}
                alt="Journal preview"
                fill
                className="object-cover rounded-t-lg lg:rounded-l-lg lg:rounded-tr-none transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 192px"
              />
              {/* Status Badge Overlay */}
              <div className="absolute top-4 right-4 z-20">
                <Badge className={`${statusConfig.className} shadow-lg backdrop-blur-sm flex items-center gap-1`}>
                  <StatusIcon className="h-3 w-3" />
                  {journal.status}
                </Badge>
              </div>
            </div>
          )}

          {/* Content Section */}
          <div className="flex flex-col flex-1 p-6 lg:p-8">
            <CardHeader className="p-0 mb-4">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  <CardTitle className="text-xl lg:text-2xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                    {journal.title}
                  </CardTitle>
                  
                  {/* Metadata Row */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formattedDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      {/* <span>By {journal.authorName || 'Anonymous'}</span> */}
                    </div>
                    {/* {journal.category && (
                      <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                        {journal.category}
                      </Badge>
                    )} */}
                  </div>
                </div>
                
                {/* Status Badge for non-image cards */}
                {!journal.imageUrl && (
                  <Badge className={`${statusConfig.className} shadow-sm flex items-center gap-1 flex-shrink-0`}>
                    <StatusIcon className="h-3 w-3" />
                    {journal.status}
                  </Badge>
                )}
              </div>
            </CardHeader>

            <CardContent className="p-0 flex-1">
              <p className="text-gray-600 leading-relaxed line-clamp-3 mb-4">
                {journal.abstract}
              </p>

              {/* Stats Row */}
              <div className="flex items-center gap-6 text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  <span>{Math.floor(Math.random() * 1000) + 100} views</span>
                </div>
                <div className="flex items-center gap-1">
                  <Download className="h-4 w-4" />
                  <span>{Math.floor(Math.random() * 500) + 50} downloads</span>
                </div>
              </div>
            </CardContent>

            {/* Actions Footer */}
            <CardFooter className="p-0 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                {journal.pdfUrl && (
                  <Button
                    variant="outline"
                    size="sm"
                    asChild
                    className="hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all duration-200"
                  >
                    <a
                      href={journal.pdfUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <FileIcon className="h-4 w-4" />
                      View PDF
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </Button>
                )}
              </div>

              {/* Admin Actions */}
              {(showActions && isAdmin && journal.status === 'Pending') && (
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleStatusChange('Rejected')}
                    className="hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-all duration-200"
                  >
                    <XCircle className="h-4 w-4 mr-1" />
                    Reject
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleStatusChange('Approved')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Approve
                  </Button>
                </div>
              )}
            </CardFooter>
          </div>
        </div>
      </div>

      {/* Hover Effect Border */}
      <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-blue-200 transition-all duration-300 pointer-events-none" />
    </Card>
  );
}