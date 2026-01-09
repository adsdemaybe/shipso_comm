import React, { useState } from 'react';
import { 
  CheckCircle, 
  Search, 
  Sparkles, 
  History, 
  FileText,
  BrainCircuit,
  AlertCircle,
  Briefcase,
  Filter,
  ListFilter,
  Send
} from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { ScrollArea } from '../ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { TaskCard, TaskProps } from './TaskCard';
import { DocumentCard, DocumentResult } from './DocumentCard';
import { Separator } from '../ui/separator';
import { Progress } from '../ui/progress';

interface RightSidebarProps {
  chatId: string;
  tasks: TaskProps[];
  onApproveTask: (id: string) => void;
  onRejectTask: (id: string) => void;
  onUnapproveTask: (id: string) => void;
}

const MOCK_DOCS: DocumentResult[] = [
  {
    id: 'd1',
    title: 'TSMC Commercial Invoice #INV-2023-001',
    source: 'drive',
    date: 'Oct 24, 2023',
    summary: 'Commercial invoice containing 500 units of chipset A7. Total value $50,000.',
    confidence: 98,
    author: 'Finance Dept'
  },
  {
    id: 'd2',
    title: 'RE: Shipment Delay Notification',
    source: 'gmail',
    date: 'Oct 22, 2023',
    summary: 'Email thread discussing the 2-day delay due to port congestion in Taipei.',
    confidence: 85,
    author: 'Sarah Chen'
  },
  {
    id: 'd3',
    title: 'Customs Duty Calculation Worksheet',
    source: 'onedrive',
    date: 'Oct 20, 2023',
    summary: 'Spreadsheet with detailed HTS codes and estimated duties for Q4 shipments.',
    confidence: 92,
    author: 'Brokerage Team'
  }
];

const STAKEHOLDER_INFO: Record<string, any> = {
  'c1': {
    name: 'Global Freight Forwarders Ltd.',
    license: 'FF-99281-US',
    reliability: '98%',
    riskScore: 'Low Risk',
    riskColor: 'text-green-600 bg-green-50',
    riskDesc: 'AI evaluates operational data, communication patterns, and document completeness to predict disruptions.',
    riskQuote: '"The carrier was delayed 22% of the time this quarter → risk score adjusts for their reliability rating."',
    perfScore: 85,
    perfDesc: 'Based on completeness, accuracy, and timeliness.',
    perfQuote: '"Exporter repeatedly sends incomplete documents → Performance Score decreases."',
    avgResponse: '24 mins',
    activeShipments: 12
  },
  'c2': {
    name: 'TSMC Supply Chain',
    license: 'SUP-7782-TW',
    reliability: '94%',
    riskScore: 'Medium Risk',
    riskColor: 'text-amber-600 bg-amber-50',
    riskDesc: 'Recent production delays impacting reliability metrics.',
    riskQuote: '"Production line B reported 48hr delay due to raw material shortage."',
    perfScore: 92,
    perfDesc: 'High technical accuracy in documentation and product specs.',
    perfQuote: '"Technical specifications match PO requirements 100% of the time."',
    avgResponse: '2 hrs',
    activeShipments: 5
  },
  'c3': {
    name: 'Bay Area Customs',
    license: 'CB-1129-US',
    reliability: '99%',
    riskScore: 'Low Risk',
    riskColor: 'text-green-600 bg-green-50',
    riskDesc: 'Consistently meets filing deadlines with minimal corrections.',
    riskQuote: '"Entry summary filed 48hrs prior to arrival consistently."',
    perfScore: 96,
    perfDesc: 'Excellent compliance record and rapid processing.',
    perfQuote: '"Zero penalties or liquidation damages in trailing 12 months."',
    avgResponse: '1 hr',
    activeShipments: 8
  },
  'internal-procurement': {
    name: 'Internal Procurement',
    license: 'INT-DEPT-01',
    reliability: 'N/A',
    riskScore: 'Internal',
    riskColor: 'text-blue-600 bg-blue-50',
    riskDesc: 'Internal department metrics.',
    riskQuote: '"Spending is within Q4 budget limits."',
    perfScore: 100,
    perfDesc: 'Internal response SLAs met.',
    perfQuote: '"All POs approved within 24h window."',
    avgResponse: '15 mins',
    activeShipments: 45
  },
  'internal-logistics': {
    name: 'Logistics Operations',
    license: 'INT-DEPT-02',
    reliability: 'N/A',
    riskScore: 'Internal',
    riskColor: 'text-blue-600 bg-blue-50',
    riskDesc: 'Internal logistics coordination.',
    riskQuote: '"Warehouse capacity at 85% utilization."',
    perfScore: 98,
    perfDesc: 'On-time delivery performance.',
    perfQuote: '"Last mile delivery success rate at 99.5%."',
    avgResponse: '10 mins',
    activeShipments: 128
  }
};

export function RightSidebar({ chatId, tasks, onApproveTask, onRejectTask, onUnapproveTask }: RightSidebarProps) {
  const [activeTab, setActiveTab] = useState('tasks');
  const [filterType, setFilterType] = useState('all');
  const [viewScope, setViewScope] = useState<'current' | 'all'>('current');

  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<DocumentResult[]>([]);

  const info = STAKEHOLDER_INFO[chatId] || STAKEHOLDER_INFO['c1'];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    // Simulate AI search delay
    setTimeout(() => {
      setSearchResults(MOCK_DOCS);
      setIsSearching(false);
    }, 800);
  };

  let filteredTasks = tasks;
  
  if (viewScope === 'current') {
    filteredTasks = filteredTasks.filter(t => t.chatId === chatId);
  }

  if (filterType !== 'all') {
    filteredTasks = filteredTasks.filter(t => t.type === filterType);
  }

  // Separate tasks by status and requester
  const sentTasks = filteredTasks.filter(t => t.requestedBy === 'Me');
  const incomingTasks = filteredTasks.filter(t => t.requestedBy !== 'Me');

  const pendingTasks = incomingTasks.filter(t => t.status === 'pending');
  const approvedTasks = incomingTasks.filter(t => t.status === 'approved');

  return (
    <div className="h-full flex flex-col bg-slate-50">
      <div className="p-4 border-b border-slate-200 bg-white">
        <h3 className="font-semibold text-slate-900 flex items-center gap-2">
          <BrainCircuit className="text-black" size={20} />
          Intelligence Panel
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          AI-driven insights & task automation
        </p>
      </div>

      <Tabs defaultValue="tasks" className="flex-1 flex flex-col min-h-0">
        <div className="px-4 pt-4 bg-white border-b border-slate-200">
          <TabsList className="w-full grid grid-cols-3 mb-4">
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="knowledge">Knowledge</TabsTrigger>
            <TabsTrigger value="info">Info</TabsTrigger>
          </TabsList>
        </div>

        {/* Tasks Tab (Vibe Coding Interface) */}
        <TabsContent value="tasks" className="flex-1 flex flex-col overflow-hidden p-0 m-0 data-[state=inactive]:hidden">
          
          {/* Filters */}
          <div className="px-4 py-3 border-b border-slate-100 flex gap-2 bg-white/50">
             <Select value={filterType} onValueChange={setFilterType}>
               <SelectTrigger className="h-8 text-xs w-[110px] bg-white border-slate-200">
                 <SelectValue placeholder="Type" />
               </SelectTrigger>
               <SelectContent>
                 <SelectItem value="all">All Types</SelectItem>
                 <SelectItem value="approval">Approvals</SelectItem>
                 <SelectItem value="upload">Uploads</SelectItem>
                 <SelectItem value="signature">Signatures</SelectItem>
                 <SelectItem value="review">Reviews</SelectItem>
               </SelectContent>
             </Select>
             
             <div className="flex bg-slate-100 rounded-md p-1 h-8 flex-1">
               <button 
                 onClick={() => setViewScope('current')}
                 className={`flex-1 text-[10px] font-medium rounded-sm transition-all ${viewScope === 'current' ? 'bg-white shadow-sm text-black' : 'text-slate-500 hover:text-slate-700'}`}
               >
                 Current Chat
               </button>
               <button 
                 onClick={() => setViewScope('all')}
                 className={`flex-1 text-[10px] font-medium rounded-sm transition-all ${viewScope === 'all' ? 'bg-white shadow-sm text-black' : 'text-slate-500 hover:text-slate-700'}`}
               >
                 All Tasks
               </button>
             </div>
          </div>

          <ScrollArea className="flex-1 h-px">
            <div className="p-4 space-y-6">
              
              {/* Sent Requests */}
              {sentTasks.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Send size={14} /> Sent Requests
                  </h4>
                  <div className="space-y-3">
                    {sentTasks.map(task => (
                      <TaskCard 
                        key={task.id} 
                        task={task} 
                      />
                    ))}
                  </div>
                  <Separator className="mt-6" />
                </div>
              )}

              {/* Pending Actions */}
              <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <AlertCircle size={14} /> Pending Actions
                </h4>
                {pendingTasks.length > 0 ? (
                  <div className="space-y-3">
                    {pendingTasks.map(task => (
                      <TaskCard 
                        key={task.id} 
                        task={task} 
                        onApprove={() => onApproveTask(task.id)} 
                        onReject={() => onRejectTask(task.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-slate-400 text-sm">
                    No pending tasks found
                  </div>
                )}
              </div>

              {/* Approved / In Progress */}
              {approvedTasks.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <h4 className="text-xs font-semibold text-green-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                      <Briefcase size={14} /> Ready for Work
                    </h4>
                    <div className="space-y-3">
                      {approvedTasks.map(task => (
                        <TaskCard 
                          key={task.id} 
                          task={task} 
                          onUnapprove={() => onUnapproveTask(task.id)}
                        />
                      ))}
                    </div>
                  </div>
                </>
              )}

              <Separator />

              {/* History */}
              <div>
                <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <History size={14} /> Recent Activity
                </h4>
                <div className="space-y-3 opacity-60">
                   <TaskCard 
                      task={{
                        id: 't-old',
                        title: 'Approve Freight Quote',
                        description: 'Maersk Spot Rate: $3,200',
                        type: 'approval',
                        status: 'approved',
                        context: 'Completed Yesterday'
                      }} 
                    />
                </div>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Knowledge Tab (AI Chatbot) */}
        <TabsContent value="knowledge" className="flex-1 flex flex-col overflow-hidden p-0 m-0 data-[state=inactive]:hidden">
          <div className="p-4 bg-white border-b border-slate-200">
             <form onSubmit={handleSearch} className="relative">
                <Input 
                  placeholder="Ask AI about documents, invoices..." 
                  className="pl-9 pr-9 focus-visible:ring-black"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-2.5 text-slate-400" size={16} />
                <Button 
                  type="submit" 
                  size="icon" 
                  variant="ghost" 
                  className="absolute right-1 top-1 h-7 w-7 text-black hover:bg-slate-100"
                >
                  <Sparkles size={14} />
                </Button>
             </form>
          </div>
          
          <ScrollArea className="flex-1 bg-slate-50/50 h-px">
             <div className="p-4">
                {isSearching ? (
                  <div className="flex flex-col items-center justify-center py-10 text-slate-400 space-y-3">
                    <Sparkles className="animate-spin text-black" size={24} />
                    <span className="text-xs">Searching across platforms...</span>
                  </div>
                ) : searchResults.length > 0 ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                       <h4 className="text-xs font-semibold text-slate-500">
                         Found {searchResults.length} relevant documents
                       </h4>
                       <span className="text-[10px] text-black bg-slate-100 px-2 py-1 rounded-full">
                         0.4s search time
                       </span>
                    </div>
                    {searchResults.map(doc => (
                      <DocumentCard key={doc.id} doc={doc} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 text-slate-400 px-8">
                    <FileText size={32} className="mx-auto mb-3 opacity-20" />
                    <p className="text-sm mb-1">Cross-Platform Memory</p>
                    <p className="text-xs opacity-70">
                      Ask me to find invoices, emails, or files from Drive, Slack, and Outlook.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2 justify-center">
                       <Button variant="outline" size="sm" className="text-xs h-7 bg-white" onClick={() => {
                         setSearchQuery("Show me the invoice from TSMC");
                         handleSearch({ preventDefault: () => {} } as any);
                       }}>
                         "Show TSMC Invoice"
                       </Button>
                       <Button variant="outline" size="sm" className="text-xs h-7 bg-white" onClick={() => {
                         setSearchQuery("Latest tracking update");
                         handleSearch({ preventDefault: () => {} } as any);
                       }}>
                         "Latest tracking?"
                       </Button>
                    </div>
                  </div>
                )}
             </div>
          </ScrollArea>
        </TabsContent>

        {/* Info Tab */}
        <TabsContent value="info" className="flex-1 overflow-hidden p-0 m-0 data-[state=inactive]:hidden">
          <ScrollArea className="h-full p-4">
             <div className="space-y-6">
                <div>
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">
                    Stakeholder Info
                  </h4>
                  <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm">
                    <div className="font-medium text-slate-900">{info.name}</div>
                    <div className="text-xs text-slate-500 mt-1">License: {info.license}</div>
                    <div className="mt-4 space-y-4 text-sm text-slate-600">
                       <div className="flex justify-between border-b border-slate-100 pb-2">
                         <span>Reliability Score</span>
                         <span className="text-green-600 font-medium">{info.reliability}</span>
                       </div>
                       
                       {/* Risk Score */}
                       <div className="space-y-2 border-b border-slate-100 pb-4">
                         <div className="flex justify-between items-center">
                           <span className="font-medium text-slate-900">Risk Score (WOP)</span>
                           <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${info.riskColor}`}>
                             {info.riskScore}
                           </span>
                         </div>
                         <p className="text-xs text-slate-500 leading-relaxed">
                           {info.riskDesc}
                         </p>
                         <div className="text-xs text-slate-500 italic mt-1 bg-slate-50 p-2 rounded">
                           {info.riskQuote}
                         </div>
                       </div>

                       {/* Performance Score */}
                       <div className="space-y-2">
                         <div className="flex justify-between items-center">
                           <span className="font-medium text-slate-900">Performance Score</span>
                           <span className="text-xs font-medium">{info.perfScore}/100</span>
                         </div>
                         <Progress value={info.perfScore} className="h-2" />
                         <p className="text-xs text-slate-500 leading-relaxed mt-1">
                           {info.perfDesc}
                         </p>
                         <div className="text-xs text-slate-500 italic mt-1 bg-slate-50 p-2 rounded">
                           {info.perfQuote}
                         </div>
                       </div>

                       <div className="flex justify-between border-t border-slate-100 pt-2">
                         <span>Avg. Response</span>
                         <span>{info.avgResponse}</span>
                       </div>
                       <div className="flex justify-between">
                         <span>Active Shipments</span>
                         <span>{info.activeShipments}</span>
                       </div>
                    </div>
                  </div>
                </div>
             </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
