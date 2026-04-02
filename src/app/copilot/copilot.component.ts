import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Step = 'upload' | 'rules' | 'analysis' | 'escalation' | 'evaluation';

interface Rule {
  id: string;
  title: string;
  source: string;
  description: string;
  active: boolean;
}

interface Flag {
  id: number;
  title: string;
  ruleId: string;
  severity: 'high' | 'medium' | 'low';
  issue: string;
  contractRef: string;
  regulationRef: string;
  confidence: number;
  feedback: 'pending' | 'agreed' | 'dismissed' | 'neutral';
  escalate: boolean;
}

interface AuditEntry { time: string; text: string; }

@Component({
  selector: 'app-copilot',
  imports: [CommonModule, FormsModule],
  templateUrl: './copilot.component.html',
  styleUrl: './copilot.component.scss',
})
export class CopilotComponent {
  currentStep: Step = 'upload';
  steps: { key: Step; label: string }[] = [
    { key: 'upload', label: 'Upload' },
    { key: 'rules', label: 'Rules' },
    { key: 'analysis', label: 'Analysis' },
    { key: 'escalation', label: 'Escalation' },
    { key: 'evaluation', label: 'Evaluation' },
  ];

  // Upload
  fileUploaded = false;
  fileName = '';
  dragOver = false;

  // Rules
  rulesGenerating = false;
  rulesGenerated = false;
  rules: Rule[] = [
    { id: 'DORA-1', title: 'ICT Risk Management', source: 'DORA Art. 5', description: 'Entity must have ICT risk management framework', active: true },
    { id: 'DORA-2', title: 'Third-Party Risk Monitoring', source: 'DORA Art. 28', description: 'Obligations for outsourcing to third-party ICT providers', active: true },
    { id: 'DORA-3', title: 'Incident Reporting', source: 'DORA Art. 19', description: 'Major ICT incidents must be reported to authorities', active: true },
    { id: 'EUAI-1', title: 'High-Risk AI Classification', source: 'EU AI Act Art. 6', description: 'Systems in Annex III are classified as high-risk', active: true },
    { id: 'EUAI-2', title: 'Data Governance', source: 'EU AI Act Art. 10', description: 'Training data must meet quality and governance criteria', active: true },
    { id: 'EUAI-3', title: 'Record Retention', source: 'EU AI Act Art. 12', description: 'Automatic logging for high-risk AI systems', active: false },
  ];

  // Contract text
  contractClauses = [
    { num: 1, text: 'This Agreement is entered into between Her Majesty\'s Government ("Client") and Acme AI Solutions Ltd ("Vendor") for the provision of artificial intelligence services.', highlight: '' },
    { num: 2, text: 'The Vendor shall deliver the AI platform as described in Schedule 1, including all training data, model documentation, and deployment support.', highlight: '' },
    { num: 3, text: 'Data will be stored for a period of 12 months following contract termination, after which all records will be permanently deleted.', highlight: 'warning' },
    { num: 4, text: 'The Vendor shall not be required to disclose the methodology, training data sources, or algorithmic decision-making processes used in the AI system.', highlight: 'violation' },
    { num: 5, text: 'Payment terms: Net 60 days from invoice date. Late payments incur 2% monthly interest.', highlight: '' },
    { num: 6, text: 'In the event of a security incident, the Vendor will notify the Client within 30 business days of discovery.', highlight: 'violation' },
    { num: 7, text: 'The agreement is governed by the laws of England and Wales.', highlight: '' },
    { num: 8, text: 'No explicit reference to ICT risk management framework or operational resilience testing requirements.', highlight: 'warning' },
    { num: 9, text: 'Term: 36 months from the Effective Date, with automatic renewal unless terminated with 90 days written notice.', highlight: '' },
  ];

  // Flags
  flags: Flag[] = [
    {
      id: 1, title: 'Missing Transparency Clause', ruleId: 'EUAI-1', severity: 'high',
      issue: 'Vendor explicitly refuses to disclose AI methodology — violates transparency requirements for high-risk AI systems.',
      contractRef: '§4: "shall not be required to disclose the methodology..."',
      regulationRef: '"Providers of high-risk AI systems shall ensure transparency..."',
      confidence: 94, feedback: 'pending', escalate: true,
    },
    {
      id: 2, title: 'Late Incident Reporting', ruleId: 'DORA-3', severity: 'high',
      issue: '30 business days notification window far exceeds DORA\'s "without undue delay" requirement.',
      contractRef: '§6: "notify the Client within 30 business days"',
      regulationRef: '"shall report major ICT-related incidents without undue delay"',
      confidence: 91, feedback: 'pending', escalate: true,
    },
    {
      id: 3, title: 'Insufficient Data Retention', ruleId: 'EUAI-2', severity: 'medium',
      issue: '12-month retention may not meet regulatory minimum for AI training data records.',
      contractRef: '§3: "stored for a period of 12 months"',
      regulationRef: '"Training data records shall be maintained for the operational lifetime of the system"',
      confidence: 76, feedback: 'pending', escalate: true,
    },
    {
      id: 4, title: 'No ICT Risk Framework', ruleId: 'DORA-1', severity: 'low',
      issue: 'No explicit reference to operational resilience testing or ICT risk framework.',
      contractRef: '§8: No reference found',
      regulationRef: '"Financial entities shall have in place an ICT risk management framework"',
      confidence: 62, feedback: 'pending', escalate: false,
    },
  ];

  // Escalation
  escalationTeam = 'Procurement — Mike Chen';
  contractId = 'GOV-UK-2024-AI-001';
  escalationComment = '';
  escalationSent = false;

  auditTrail: AuditEntry[] = [
    { time: '14:32', text: 'Contract uploaded by I. Wight' },
    { time: '14:33', text: 'DORA + EU AI Act selected as regulatory sources' },
    { time: '14:33', text: '6 compliance rules generated, 1 disabled by user' },
    { time: '14:34', text: 'Analysis complete — 4 findings flagged' },
    { time: '14:35', text: 'User agreed with Flag 1, 2, 3. Dismissed Flag 4.' },
    { time: '14:36', text: 'Escalation initiated to Legal / Compliance Team' },
  ];

  // Evaluation
  evalMetrics = {
    accuracy: '4.2', total: 5, findings: 12, agreed: 8, dismissed: 3,
  };
  comparisonTable = [
    { metric: 'True violations found', pipeline: '8 / 10', baseline: '5 / 10' },
    { metric: 'False positives', pipeline: '3', baseline: '7' },
    { metric: 'Missed violations', pipeline: '2', baseline: '5' },
    { metric: 'Precision', pipeline: '73%', baseline: '42%' },
  ];
  perRuleAccuracy = [
    { rule: 'DORA-3 Incident Reporting', correct: 5, total: 5, color: '#4ade80' },
    { rule: 'EUAI-1 AI Classification', correct: 4, total: 5, color: '#4ade80' },
    { rule: 'EUAI-2 Data Governance', correct: 2, total: 3, color: '#facc15' },
    { rule: 'DORA-1 ICT Risk Mgmt', correct: 1, total: 4, color: '#f87171' },
    { rule: 'DORA-2 Third-Party Risk', correct: 3, total: 4, color: '#4ade80' },
  ];

  // Computed
  get activeRuleCount(): number { return this.rules.filter(r => r.active).length; }
  get escalatableFlags(): Flag[] { return this.flags.filter(f => f.escalate && f.feedback !== 'dismissed'); }
  get totalRisk(): string {
    const count = this.escalatableFlags.length;
    return '€' + (count * 7).toLocaleString() + ',000,000';
  }
  get stepIndex(): number { return this.steps.findIndex(s => s.key === this.currentStep); }

  // Methods
  goTo(step: Step) { this.currentStep = step; }
  nextStep() {
    const i = this.stepIndex;
    if (i < this.steps.length - 1) this.currentStep = this.steps[i + 1].key;
  }

  onFileDrop(e: DragEvent) {
    e.preventDefault();
    this.dragOver = false;
    this.fileName = 'GOV-UK-2024-AI-001.pdf';
    this.fileUploaded = true;
  }
  onDragOver(e: DragEvent) { e.preventDefault(); this.dragOver = true; }
  onDragLeave() { this.dragOver = false; }
  onFileSelect() {
    this.fileName = 'GOV-UK-2024-AI-001.pdf';
    this.fileUploaded = true;
  }

  generateRules() {
    this.rulesGenerating = true;
    setTimeout(() => { this.rulesGenerating = false; this.rulesGenerated = true; }, 2000);
  }

  setFeedback(flag: Flag, fb: 'agreed' | 'dismissed' | 'neutral') {
    flag.feedback = fb;
    if (fb === 'dismissed') flag.escalate = false;
  }

  sendEscalation() { this.escalationSent = true; }

  barWidth(correct: number, total: number): number { return (correct / total) * 100; }
  grayWidth(correct: number, total: number): number { return ((total - correct) / total) * 100; }
}
