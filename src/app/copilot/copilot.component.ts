import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ComplianceIssue {
  id: number;
  title: string;
  cases: number;
  severity: 'high' | 'medium' | 'low';
  rule: string;
  ruleSource: string;
  documents: { name: string; expected: string; actual: string; highlight: string }[];
  summary: { affectedRecords: number; detail: string };
  actions: { label: string; icon: string }[];
  validation: { label: string; value: string; color: string }[];
}

@Component({
  selector: 'app-copilot',
  imports: [CommonModule],
  templateUrl: './copilot.component.html',
  styleUrl: './copilot.component.scss',
})
export class CopilotComponent {
  activeTab: 'overview' | 'issues' = 'overview';
  selectedIssueId = 1;

  // ── Pipeline state ──
  pipelineRunning = false;
  pipelineComplete = false;
  activeStep = -1;
  showResult = false;
  showComparison = false;
  showEvaluation = false;
  showActions = false;
  findingStatus: 'pending' | 'accepted' | 'rejected' = 'pending';

  pipelineSteps = [
    { label: 'Extract', icon: 'description' },
    { label: 'Match', icon: 'join_inner' },
    { label: 'Detect', icon: 'search' },
    { label: 'Score', icon: 'speed' },
    { label: 'Act', icon: 'bolt' },
  ];

  dataSources = [
    { label: 'Contract (PDF)', icon: 'picture_as_pdf', color: '#f87171' },
    { label: 'Regulation (EU AI Act)', icon: 'gavel', color: '#60a5fa' },
    { label: 'Vendor Data (Excel)', icon: 'table_chart', color: '#4ade80' },
  ];

  evaluation = [
    { label: 'Rule Understanding', value: 88, color: '#60a5fa' },
    { label: 'Violation Detection', value: 91, color: '#f87171' },
    { label: 'Overall Reliability', value: 89, color: '#c084fc' },
  ];

  evalExamples = [
    { expected: 'Invoice deadline: 30 days', detected: '30-day invoice rule detected', match: true },
    { expected: 'Liability cap required', detected: 'Liability cap clause found', match: true },
  ];

  // ── Issues data ──
  issues: ComplianceIssue[] = [
    {
      id: 1,
      title: 'Missing Invoice',
      cases: 3,
      severity: 'high',
      rule: 'Invoices must be issued within 30 days of service delivery',
      ruleSource: 'EU AI Act — Art. 9, §3',
      documents: [
        { name: 'PO-2024-0871.pdf', expected: 'Invoice issued within 30 days', actual: 'Invoice issued after 45 days', highlight: '45 days' },
        { name: 'PO-2024-0903.pdf', expected: 'Invoice issued within 30 days', actual: 'No invoice found on record', highlight: 'No invoice found' },
        { name: 'PO-2024-0917.pdf', expected: 'Invoice issued within 30 days', actual: 'Invoice issued after 62 days', highlight: '62 days' },
      ],
      summary: { affectedRecords: 3, detail: 'Average delay: 22 days past policy threshold' },
      actions: [
        { label: 'Notify compliance team', icon: 'mail' },
        { label: 'Request missing documents', icon: 'upload_file' },
        { label: 'Export report', icon: 'download' },
      ],
      validation: [
        { label: 'Confidence', value: '92%', color: '#4ade80' },
        { label: 'Rules Checked', value: '10', color: '#60a5fa' },
        { label: 'Violations', value: '3', color: '#f87171' },
        { label: 'Coverage', value: 'High', color: '#c084fc' },
      ],
    },
    {
      id: 2,
      title: 'Late Payment (>30 days)',
      cases: 5,
      severity: 'medium',
      rule: 'All vendor payments must be processed within 30 days of invoice receipt',
      ruleSource: 'Procurement Policy §7.1',
      documents: [
        { name: 'INV-8834.pdf', expected: 'Payment within 30 days', actual: 'Payment processed after 47 days', highlight: '47 days' },
        { name: 'INV-8901.pdf', expected: 'Payment within 30 days', actual: 'Payment processed after 38 days', highlight: '38 days' },
        { name: 'INV-8956.pdf', expected: 'Payment within 30 days', actual: 'Payment still pending (52 days)', highlight: 'still pending' },
      ],
      summary: { affectedRecords: 5, detail: 'Average delay: 12 days past payment deadline' },
      actions: [
        { label: 'Notify finance team', icon: 'mail' },
        { label: 'Escalate to AP manager', icon: 'priority_high' },
        { label: 'Export report', icon: 'download' },
      ],
      validation: [
        { label: 'Confidence', value: '88%', color: '#4ade80' },
        { label: 'Rules Checked', value: '10', color: '#60a5fa' },
        { label: 'Violations', value: '5', color: '#f87171' },
        { label: 'Coverage', value: 'High', color: '#c084fc' },
      ],
    },
    {
      id: 3,
      title: 'Contract Clause Missing',
      cases: 2,
      severity: 'medium',
      rule: 'All vendor contracts must include a termination clause and liability cap',
      ruleSource: 'Legal Compliance Framework §2.5',
      documents: [
        { name: 'Contract-Vendor-A.docx', expected: 'Termination clause present', actual: 'No termination clause found in document', highlight: 'No termination clause' },
        { name: 'Contract-Vendor-C.docx', expected: 'Liability cap defined', actual: 'Liability section references "unlimited"', highlight: '"unlimited"' },
      ],
      summary: { affectedRecords: 2, detail: 'Critical legal exposure in active vendor contracts' },
      actions: [
        { label: 'Notify legal team', icon: 'gavel' },
        { label: 'Request contract amendment', icon: 'edit_document' },
        { label: 'Export report', icon: 'download' },
      ],
      validation: [
        { label: 'Confidence', value: '95%', color: '#4ade80' },
        { label: 'Rules Checked', value: '10', color: '#60a5fa' },
        { label: 'Violations', value: '2', color: '#f87171' },
        { label: 'Coverage', value: 'Medium', color: '#facc15' },
      ],
    },
  ];

  // ── Getters ──
  get selectedIssue(): ComplianceIssue {
    return this.issues.find(i => i.id === this.selectedIssueId) ?? this.issues[0];
  }
  get highCount(): number { return this.issues.filter(i => i.severity === 'high').length; }
  get mediumCount(): number { return this.issues.filter(i => i.severity === 'medium').length; }
  get totalCases(): number { return this.issues.reduce((s, i) => s + i.cases, 0); }

  // ── Methods ──
  selectIssue(id: number) { this.selectedIssueId = id; }

  highlightText(text: string, highlight: string): string {
    if (!highlight) return text;
    return text.replace(highlight, `<mark class="violation-hl">${highlight}</mark>`);
  }

  switchToIssues() { this.activeTab = 'issues'; }

  acceptFinding() { this.findingStatus = 'accepted'; }
  rejectFinding() { this.findingStatus = 'rejected'; }

  runAnalysis() {
    if (this.pipelineRunning) return;
    this.pipelineRunning = true;
    this.pipelineComplete = false;
    this.activeStep = -1;
    this.showResult = false;
    this.showComparison = false;
    this.showEvaluation = false;
    this.showActions = false;
    this.findingStatus = 'pending';

    const stepDelay = 600;
    this.pipelineSteps.forEach((_, i) => {
      setTimeout(() => { this.activeStep = i; }, stepDelay * (i + 1));
    });

    const total = stepDelay * (this.pipelineSteps.length + 1);
    setTimeout(() => { this.showResult = true; }, total);
    setTimeout(() => { this.showComparison = true; }, total + 300);
    setTimeout(() => { this.showActions = true; }, total + 500);
    setTimeout(() => {
      this.showEvaluation = true;
      this.pipelineComplete = true;
      this.pipelineRunning = false;
    }, total + 700);
  }
}
