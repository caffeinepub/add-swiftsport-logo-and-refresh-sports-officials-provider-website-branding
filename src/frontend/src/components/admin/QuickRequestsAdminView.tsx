import { useGetAllRefereeRequests } from '@/hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Check, AlertCircle, Loader2, Mail, Phone, User } from 'lucide-react';
import { useState } from 'react';
import type { RefereeBookingRequest } from '@/backend';

export function QuickRequestsAdminView() {
  const { data: requests, isLoading, error } = useGetAllRefereeRequests();
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyEmailDetails = async (request: RefereeBookingRequest, index: number) => {
    const emailContent = `To: swiftsports1512@gmail.com
Subject: Referee Request from ${request.name}

Contact Information:
Name: ${request.name}
Email: ${request.email}
Phone: ${request.phone}

Request Details:
${request.message}`;

    try {
      await navigator.clipboard.writeText(emailContent);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (isLoading) {
    return (
      <section id="admin-requests" className="py-20 bg-muted/30">
        <div className="container">
          <div className="mx-auto max-w-6xl">
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <Loader2 className="animate-spin" size={20} />
              <span>Loading requests...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const isUnauthorized = errorMessage.includes('Unauthorized') || errorMessage.includes('Only admins');

    return (
      <section id="admin-requests" className="py-20 bg-muted/30">
        <div className="container">
          <div className="mx-auto max-w-6xl">
            <Card className="border-destructive/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-destructive">
                  <AlertCircle size={24} />
                  {isUnauthorized ? 'Access Denied' : 'Error Loading Requests'}
                </CardTitle>
                <CardDescription>
                  {isUnauthorized 
                    ? 'You do not have permission to view this section. Only administrators can access stored requests.'
                    : 'Failed to load requests. Please try again later or contact support.'}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="admin-requests" className="py-20 bg-muted/30">
      <div className="container">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8">
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-2">
              Requests Review
            </h2>
            <p className="text-muted-foreground">
              All submitted referee requests. Click to copy email-ready details.
            </p>
          </div>

          {!requests || requests.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No requests submitted yet.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {requests.map((request, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1 flex-1">
                        <CardTitle className="flex items-center gap-2">
                          <User size={20} className="text-primary" />
                          {request.name}
                        </CardTitle>
                        <CardDescription className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Mail size={14} />
                            <a href={`mailto:${request.email}`} className="hover:underline">
                              {request.email}
                            </a>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone size={14} />
                            <a href={`tel:${request.phone}`} className="hover:underline">
                              {request.phone}
                            </a>
                          </div>
                        </CardDescription>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyEmailDetails(request, index)}
                        className="flex-shrink-0"
                      >
                        {copiedIndex === index ? (
                          <>
                            <Check size={16} className="mr-2" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy size={16} className="mr-2" />
                            Copy Email Details
                          </>
                        )}
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-lg bg-muted p-4">
                      <h4 className="font-semibold text-sm mb-2">Request Details:</h4>
                      <pre className="text-sm whitespace-pre-wrap font-mono text-muted-foreground">
                        {request.message}
                      </pre>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
