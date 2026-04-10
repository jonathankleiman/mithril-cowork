/**
 * Mithril Legal Tools — Built-in MCP Server
 *
 * Provides legal-specific tools for Ontario law practice:
 * - Limitation period calculation
 * - Court form templates
 * - Legal citation formatting
 * - Conflict check management
 * - Retainer/fee estimation
 *
 * Runs as a standalone stdio process spawned by the MCP client.
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { z } from 'zod';

// ── Constants ────────────────────────────────────────────────────────────────

export const MITHRIL_LEGAL_ID = 'mithril-legal-tools';
export const MITHRIL_LEGAL_NAME = 'mithril-legal-tools';

// Ontario statutory holidays (month is 0-indexed)
function getOntarioHolidays(year: number): Date[] {
  const holidays: Date[] = [
    new Date(year, 0, 1), // New Year's Day
    // Family Day: 3rd Monday of February
    getNthWeekday(year, 1, 1, 3),
    // Good Friday: calculated from Easter
    getGoodFriday(year),
    // Easter Monday
    getEasterMonday(year),
    // Victoria Day: Monday before May 25
    getVictoriaDay(year),
    // Canada Day
    new Date(year, 6, 1),
    // Civic Holiday: 1st Monday of August
    getNthWeekday(year, 7, 1, 1),
    // Labour Day: 1st Monday of September
    getNthWeekday(year, 8, 1, 1),
    // Thanksgiving: 2nd Monday of October
    getNthWeekday(year, 9, 1, 2),
    // Christmas Day
    new Date(year, 11, 25),
    // Boxing Day
    new Date(year, 11, 26),
  ];
  return holidays;
}

function getNthWeekday(year: number, month: number, weekday: number, n: number): Date {
  const first = new Date(year, month, 1);
  let day = 1 + ((weekday - first.getDay() + 7) % 7);
  day += (n - 1) * 7;
  return new Date(year, month, day);
}

function getEasterSunday(year: number): Date {
  // Anonymous Gregorian algorithm
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31) - 1;
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(year, month, day);
}

function getGoodFriday(year: number): Date {
  const easter = getEasterSunday(year);
  return new Date(easter.getTime() - 2 * 24 * 60 * 60 * 1000);
}

function getEasterMonday(year: number): Date {
  const easter = getEasterSunday(year);
  return new Date(easter.getTime() + 1 * 24 * 60 * 60 * 1000);
}

function getVictoriaDay(year: number): Date {
  // Monday before May 25
  const may25 = new Date(year, 4, 25);
  const day = may25.getDay();
  const diff = day === 1 ? 7 : day === 0 ? 1 : day - 1;
  return new Date(year, 4, 25 - diff);
}

function isHolidayOrWeekend(date: Date): boolean {
  const day = date.getDay();
  if (day === 0 || day === 6) return true;

  const holidays = getOntarioHolidays(date.getFullYear());
  return holidays.some(
    (h) => h.getFullYear() === date.getFullYear() && h.getMonth() === date.getMonth() && h.getDate() === date.getDate()
  );
}

function nextBusinessDay(date: Date): Date {
  const result = new Date(date);
  while (isHolidayOrWeekend(result)) {
    result.setDate(result.getDate() + 1);
  }
  return result;
}

function addDaysExcludeFirst(startDate: Date, days: number): Date {
  // Rule 3.01: exclude first day, include last day
  const result = new Date(startDate);
  result.setDate(result.getDate() + days);
  // If last day is holiday/weekend, extend to next business day
  return nextBusinessDay(result);
}

function daysBetween(a: Date, b: Date): number {
  return Math.floor((b.getTime() - a.getTime()) / (24 * 60 * 60 * 1000));
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

// ── Limitation Periods Database ──────────────────────────────────────────────

interface LimitationRule {
  name: string;
  days: number;
  authority: string;
  notes: string;
}

const LIMITATION_PERIODS: Record<string, LimitationRule> = {
  general: {
    name: 'Basic Limitation Period',
    days: 730, // 2 years
    authority: 'Limitations Act, 2002, SO 2002, c 24, s 4',
    notes: 'From date of discovery. Applies to most civil claims including breach of contract, negligence, wrongful dismissal.',
  },
  ultimate: {
    name: 'Ultimate Limitation Period',
    days: 5475, // 15 years
    authority: 'Limitations Act, 2002, SO 2002, c 24, s 15',
    notes: 'Absolute bar regardless of discovery.',
  },
  municipal_notice: {
    name: 'Municipal Notice Requirement',
    days: 10,
    authority: 'Municipal Act, 2001, SO 2001, c 25, s 44(10)',
    notes: 'Written notice to municipality required within 10 days of injury. Claim must still be commenced within 2 years.',
  },
  human_rights: {
    name: 'Human Rights Complaint',
    days: 365, // 1 year
    authority: 'Human Rights Code, RSO 1990, c H.19, s 34(1)',
    notes: 'Application to HRTO must be filed within 1 year of the last incident of discrimination.',
  },
  wsib: {
    name: 'WSIB Appeal',
    days: 180, // 6 months
    authority: 'Workplace Safety and Insurance Act, 1997, SO 1997, c 16, Sched A, s 31',
    notes: '6 months from date of decision to appeal to WSIAT.',
  },
  small_claims_appeal: {
    name: 'Small Claims Court Appeal',
    days: 30,
    authority: 'Courts of Justice Act, RSO 1990, c C.43',
    notes: '30 days from date of judgment to appeal to Divisional Court.',
  },
  superior_appeal: {
    name: 'Superior Court Appeal',
    days: 30,
    authority: 'Rules of Civil Procedure, RRO 1990, Reg 194, r 61.04',
    notes: '30 days from date of order to serve and file notice of appeal.',
  },
  divisional_leave: {
    name: 'Leave to Appeal to Divisional Court',
    days: 15,
    authority: 'Rules of Civil Procedure, RRO 1990, Reg 194, r 61.03.1',
    notes: '15 days from date of order to serve and file motion for leave.',
  },
  tax_objection: {
    name: 'Tax Reassessment Objection',
    days: 90,
    authority: 'Income Tax Act, RSC 1985, c 1 (5th Supp), s 165(1)',
    notes: '90 days from date of notice of assessment/reassessment.',
  },
  cpp_disability: {
    name: 'CPP Disability Reconsideration',
    days: 90,
    authority: 'Canada Pension Plan, RSC 1985, c C-8',
    notes: '90 days from date of decision to request reconsideration.',
  },
  ltb_appeal: {
    name: 'Landlord Tenant Board Appeal',
    days: 30,
    authority: 'Residential Tenancies Act, 2006, SO 2006, c 17, s 210',
    notes: '30 days from date of order to appeal to Divisional Court.',
  },
  defence_filing: {
    name: 'Defence Filing (Ontario)',
    days: 20,
    authority: 'Rules of Civil Procedure, RRO 1990, Reg 194, r 18.01',
    notes: '20 days after service of Statement of Claim (Ontario). 40 days outside Ontario. 60 days outside Canada.',
  },
  defence_small_claims: {
    name: 'Small Claims Defence',
    days: 20,
    authority: 'O. Reg. 258/98, r 9.01(1)',
    notes: '20 days after service of Plaintiff\'s Claim.',
  },
};

// ── Court Filing Fees ────────────────────────────────────────────────────────

const FILING_FEES: Record<string, { infrequent: number; frequent: number; description: string }> = {
  'plaintiff_claim_small_claims': {
    infrequent: 102,
    frequent: 55,
    description: "Plaintiff's Claim (Form 7A) — Small Claims Court",
  },
  'defendant_claim_small_claims': {
    infrequent: 73,
    frequent: 55,
    description: "Defendant's Claim (Form 10A) — Small Claims Court",
  },
  'statement_of_claim_superior': {
    infrequent: 229,
    frequent: 229,
    description: 'Statement of Claim (Form 14A) — Superior Court',
  },
  'notice_of_motion_superior': {
    infrequent: 127,
    frequent: 127,
    description: 'Notice of Motion (Form 37A) — Superior Court',
  },
  'setting_down_trial_superior': {
    infrequent: 810,
    frequent: 810,
    description: 'Setting Action Down for Trial — Superior Court',
  },
};

// ── MCP Server ───────────────────────────────────────────────────────────────

async function main() {
  const server = new McpServer({
    name: MITHRIL_LEGAL_NAME,
    version: '1.0.0',
  });

  // ── Tool 1: Limitation Period Calculator ─────────────────────────────────

  server.tool(
    'calculate_limitation_period',
    `Calculate limitation periods and critical legal deadlines under Ontario law.
Computes exact deadline dates accounting for weekends, statutory holidays, and the Rules of Civil Procedure time computation rules (Rule 3.01).

Supports: general 2-year limitation, ultimate 15-year, municipal notice (10 days), human rights (1 year), WSIB (6 months), court appeals (15-30 days), tax objections (90 days), defence filing deadlines, and more.`,
    {
      event_date: z.string().describe('Date of the triggering event (YYYY-MM-DD format)'),
      claim_type: z
        .enum([
          'general',
          'ultimate',
          'municipal_notice',
          'human_rights',
          'wsib',
          'small_claims_appeal',
          'superior_appeal',
          'divisional_leave',
          'tax_objection',
          'cpp_disability',
          'ltb_appeal',
          'defence_filing',
          'defence_small_claims',
        ])
        .describe('Type of limitation period to calculate'),
      description: z.string().optional().describe('Brief description of the matter for the report'),
    },
    async ({ event_date, claim_type, description }) => {
      const eventDate = new Date(event_date + 'T00:00:00');
      if (isNaN(eventDate.getTime())) {
        return { content: [{ type: 'text' as const, text: 'Error: Invalid date format. Use YYYY-MM-DD.' }] };
      }

      const rule = LIMITATION_PERIODS[claim_type];
      if (!rule) {
        return { content: [{ type: 'text' as const, text: `Error: Unknown claim type "${claim_type}".` }] };
      }

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const deadline = addDaysExcludeFirst(eventDate, rule.days);
      const daysRemaining = daysBetween(today, deadline);

      let urgency: string;
      if (daysRemaining < 0) urgency = 'EXPIRED';
      else if (daysRemaining <= 7) urgency = 'CRITICAL';
      else if (daysRemaining <= 30) urgency = 'URGENT';
      else if (daysRemaining <= 90) urgency = 'UPCOMING';
      else urgency = 'FUTURE';

      // Reminder dates
      const reminder30 = new Date(deadline.getTime() - 30 * 24 * 60 * 60 * 1000);
      const reminder7 = new Date(deadline.getTime() - 7 * 24 * 60 * 60 * 1000);
      const reminder1 = new Date(deadline.getTime() - 1 * 24 * 60 * 60 * 1000);

      const report = `LIMITATION & DEADLINE REPORT
=============================
Prepared: ${formatDate(today)}
Matter: ${description || 'Not specified'}

TRIGGERING EVENT
Date: ${formatDate(eventDate)}
Type: ${rule.name}

CRITICAL DEADLINE
Status: [${urgency}]
Deadline: ${formatDate(deadline)}
Authority: ${rule.authority}
Days Remaining: ${daysRemaining < 0 ? `EXPIRED (${Math.abs(daysRemaining)} days ago)` : `${daysRemaining} days`}
Notes: ${rule.notes}

CALENDAR ALERTS
- ${formatDate(reminder30)}: 30-day warning
- ${formatDate(reminder7)}: 7-day warning (URGENT)
- ${formatDate(reminder1)}: 1-day warning (CRITICAL)

COMPUTATION OF TIME
Per Rules of Civil Procedure, Rule 3.01:
- First day excluded, last day included
- If last day falls on holiday/weekend, extended to next business day
- Calculated deadline accounts for Ontario statutory holidays`;

      return { content: [{ type: 'text' as const, text: report }] };
    }
  );

  // ── Tool 2: Court Filing Fee Lookup ──────────────────────────────────────

  server.tool(
    'lookup_filing_fees',
    `Look up Ontario court filing fees for various court procedures.
Returns current filing fees for Small Claims Court and Superior Court of Justice.`,
    {
      form_type: z
        .enum([
          'plaintiff_claim_small_claims',
          'defendant_claim_small_claims',
          'statement_of_claim_superior',
          'notice_of_motion_superior',
          'setting_down_trial_superior',
          'all',
        ])
        .describe('Type of court filing to look up fees for, or "all" to see all fees'),
    },
    async ({ form_type }) => {
      if (form_type === 'all') {
        const lines = Object.values(FILING_FEES)
          .map(
            (f) =>
              `${f.description}\n  Infrequent claimant: $${f.infrequent}\n  Frequent claimant: $${f.frequent}`
          )
          .join('\n\n');
        return {
          content: [
            {
              type: 'text' as const,
              text: `ONTARIO COURT FILING FEES\n${'='.repeat(40)}\n\n${lines}\n\nNote: Fees current as of 2024. Verify with court office for most current amounts.\nFrequent claimant = 10+ claims/year.`,
            },
          ],
        };
      }

      const fee = FILING_FEES[form_type];
      if (!fee) {
        return { content: [{ type: 'text' as const, text: `Error: Unknown form type "${form_type}".` }] };
      }

      return {
        content: [
          {
            type: 'text' as const,
            text: `${fee.description}\n\nInfrequent claimant: $${fee.infrequent}\nFrequent claimant: $${fee.frequent}\n\nNote: Verify with court office for most current amounts.`,
          },
        ],
      };
    }
  );

  // ── Tool 3: Legal Citation Formatter ─────────────────────────────────────

  server.tool(
    'format_legal_citation',
    `Format a legal citation according to Canadian legal citation standards (McGill Guide / CanLII format).
Supports cases, statutes, and regulations.`,
    {
      type: z.enum(['case', 'statute', 'regulation']).describe('Type of legal source'),
      // Case fields
      case_name: z.string().optional().describe('Case name (e.g., "Smith v Jones")'),
      year: z.string().optional().describe('Year of decision'),
      citation_number: z.string().optional().describe('Neutral citation number (e.g., "2024 ONCA 123")'),
      parallel_cite: z.string().optional().describe('Parallel citation (e.g., "45 OR (3d) 123")'),
      court: z.string().optional().describe('Court abbreviation if not in neutral citation'),
      // Statute fields
      statute_name: z.string().optional().describe('Full name of the statute'),
      jurisdiction: z.string().optional().describe('Jurisdiction code (SO, RSO, SC, RSC)'),
      statute_year: z.string().optional().describe('Year of statute'),
      chapter: z.string().optional().describe('Chapter number'),
      section: z.string().optional().describe('Section reference'),
      // Regulation fields
      regulation_name: z.string().optional().describe('Name of the regulation'),
      reg_number: z.string().optional().describe('Regulation number (e.g., "O. Reg. 258/98")'),
      rule: z.string().optional().describe('Specific rule number'),
    },
    async (params) => {
      let citation = '';

      if (params.type === 'case') {
        const name = params.case_name || 'Unknown v Unknown';
        const neutralCite = params.citation_number || '';
        const parallel = params.parallel_cite ? `, ${params.parallel_cite}` : '';
        const court = params.court ? ` (${params.court})` : '';

        if (neutralCite) {
          citation = `*${name}*, ${neutralCite}${parallel}`;
        } else if (params.year) {
          citation = `*${name}* (${params.year})${parallel}${court}`;
        } else {
          citation = `*${name}*${parallel}${court}`;
        }
      } else if (params.type === 'statute') {
        const name = params.statute_name || 'Unknown Act';
        const juris = params.jurisdiction || 'SO';
        const year = params.statute_year || '';
        const ch = params.chapter ? `, c ${params.chapter}` : '';
        const sec = params.section ? `, s ${params.section}` : '';

        citation = `*${name}*${year ? `, ${juris} ${year}` : ''}${ch}${sec}`;
      } else if (params.type === 'regulation') {
        const name = params.regulation_name || 'Unknown Regulation';
        const regNum = params.reg_number || '';
        const r = params.rule ? `, r ${params.rule}` : '';

        citation = `*${name}*${regNum ? `, ${regNum}` : ''}${r}`;
      }

      return {
        content: [
          {
            type: 'text' as const,
            text: `Formatted Citation:\n${citation}\n\nNote: Verify citation accuracy against original source. AI-generated citations should always be confirmed.`,
          },
        ],
      };
    }
  );

  // ── Tool 4: Conflict Check Helper ────────────────────────────────────────

  server.tool(
    'conflict_check',
    `Prepare a structured conflict check report for a new matter.
Collects and organizes all party names, related entities, and known counsel for conflict database searching.
Does NOT perform the actual database search — outputs a formatted report for manual conflict checking.`,
    {
      client_name: z.string().describe('Full legal name of the client'),
      client_aliases: z.array(z.string()).optional().describe('Other names used by client (maiden name, business name)'),
      opposing_party: z.string().optional().describe('Name of opposing party'),
      opposing_aliases: z.array(z.string()).optional().describe('Other names for opposing party'),
      opposing_counsel: z.string().optional().describe('Name of opposing counsel or firm'),
      related_parties: z.array(z.string()).optional().describe('Other related parties or entities'),
      matter_type: z.string().optional().describe('Type of matter (e.g., employment, small claims)'),
      prior_relationship: z.string().optional().describe('Any prior relationship with Mithril Law'),
    },
    async (params) => {
      const today = new Date();
      const allNames: string[] = [params.client_name];
      if (params.client_aliases) allNames.push(...params.client_aliases);
      if (params.opposing_party) allNames.push(params.opposing_party);
      if (params.opposing_aliases) allNames.push(...params.opposing_aliases);
      if (params.opposing_counsel) allNames.push(params.opposing_counsel);
      if (params.related_parties) allNames.push(...params.related_parties);

      const report = `CONFLICT CHECK REPORT
${'='.repeat(40)}
Prepared: ${formatDate(today)}
Matter Type: ${params.matter_type || 'Not specified'}

CLIENT
Name: ${params.client_name}
${params.client_aliases?.length ? `Aliases: ${params.client_aliases.join(', ')}` : 'Aliases: None provided'}

OPPOSING PARTY
Name: ${params.opposing_party || 'Not yet identified'}
${params.opposing_aliases?.length ? `Aliases: ${params.opposing_aliases.join(', ')}` : 'Aliases: None provided'}

OPPOSING COUNSEL
${params.opposing_counsel || 'Not yet identified'}

RELATED PARTIES / ENTITIES
${params.related_parties?.length ? params.related_parties.map((p) => `- ${p}`).join('\n') : '- None identified'}

PRIOR RELATIONSHIP WITH FIRM
${params.prior_relationship || 'None declared'}

${'─'.repeat(40)}
NAMES TO SEARCH IN CONFLICT DATABASE
${'─'.repeat(40)}
${allNames.map((n, i) => `${i + 1}. ${n}`).join('\n')}

Status: PENDING — Search all names above in firm conflict database.
Checked by: _______________
Date cleared: _______________
Result: [ ] CLEAR  [ ] CONFLICT IDENTIFIED  [ ] REQUIRES REVIEW`;

      return { content: [{ type: 'text' as const, text: report }] };
    }
  );

  // ── Tool 5: Small Claims Jurisdiction Check ──────────────────────────────

  server.tool(
    'small_claims_jurisdiction',
    `Check whether a claim falls within Small Claims Court jurisdiction in Ontario.
Evaluates monetary jurisdiction (currently $35,000) and identifies excluded claim types.`,
    {
      amount: z.number().describe('Total amount of the claim in dollars'),
      claim_description: z.string().describe('Brief description of the nature of the claim'),
      includes_interest: z.boolean().optional().describe('Whether the amount includes pre-judgment interest'),
      involves_real_property: z.boolean().optional().describe('Whether the claim involves title to real property'),
      involves_defamation: z.boolean().optional().describe('Whether the claim involves defamation/libel/slander'),
    },
    async (params) => {
      const limit = 35000;
      const withinMonetary = params.amount <= limit;

      const exclusions: string[] = [];
      if (params.involves_real_property) exclusions.push('Title to or interest in land (CJA s. 96(1))');
      if (params.involves_defamation) exclusions.push('Defamation — may be excluded depending on circumstances');

      const eligible = withinMonetary && exclusions.length === 0;

      const report = `SMALL CLAIMS COURT JURISDICTION CHECK
${'='.repeat(44)}

Claim Amount: $${params.amount.toLocaleString()}
Monetary Limit: $${limit.toLocaleString()}
${params.includes_interest ? 'Note: Amount includes pre-judgment interest — interest does NOT count toward monetary limit.\n' : ''}
Monetary Jurisdiction: ${withinMonetary ? 'WITHIN LIMIT' : `EXCEEDS LIMIT by $${(params.amount - limit).toLocaleString()}`}

${exclusions.length > 0 ? `JURISDICTIONAL EXCLUSIONS IDENTIFIED:\n${exclusions.map((e) => `  - ${e}`).join('\n')}` : 'No jurisdictional exclusions identified.'}

RESULT: ${eligible ? 'ELIGIBLE for Small Claims Court' : 'NOT ELIGIBLE for Small Claims Court'}

${
  !withinMonetary
    ? `OPTIONS:\n1. Abandon the excess to bring within $${limit.toLocaleString()} jurisdiction\n2. Proceed in Superior Court of Justice\n3. Consider whether claim can be split (generally not permitted — see r. 6.02)`
    : `FILING INFO:\nFiling fee: $102 (infrequent claimant) / $55 (frequent claimant)\nForm: Plaintiff's Claim (Form 7A)\nService: Must be served within 6 months of filing`
}

Description: ${params.claim_description}
Authority: Courts of Justice Act, RSO 1990, c C.43, s 23`;

      return { content: [{ type: 'text' as const, text: report }] };
    }
  );

  // ── Tool 6: Service Deadline Calculator ──────────────────────────────────

  server.tool(
    'calculate_service_deadline',
    `Calculate service-related deadlines under Ontario Rules of Civil Procedure.
Accounts for method of service and applicable extensions.`,
    {
      served_date: z.string().describe('Date of service (YYYY-MM-DD format)'),
      service_method: z
        .enum(['personal', 'mail', 'courier', 'fax', 'email', 'substituted'])
        .describe('Method of service used'),
      response_period_days: z
        .number()
        .describe('Base response period in days (e.g., 20 for defence, 30 for appeal)'),
      outside_ontario: z.boolean().optional().describe('Whether the party served is outside Ontario'),
      outside_canada: z.boolean().optional().describe('Whether the party served is outside Canada'),
    },
    async (params) => {
      const servedDate = new Date(params.served_date + 'T00:00:00');
      if (isNaN(servedDate.getTime())) {
        return { content: [{ type: 'text' as const, text: 'Error: Invalid date format. Use YYYY-MM-DD.' }] };
      }

      let baseDays = params.response_period_days;
      let notes: string[] = [];

      // Service method adjustments
      if (params.service_method === 'mail') {
        baseDays += 5;
        notes.push('Added 5 days for service by mail (Rule 16.07)');
      }

      // Jurisdiction adjustments (for defence filing)
      if (params.outside_canada) {
        baseDays = Math.max(baseDays, 60);
        notes.push('60-day minimum for service outside Canada (Rule 18.01)');
      } else if (params.outside_ontario) {
        baseDays = Math.max(baseDays, 40);
        notes.push('40-day minimum for service outside Ontario but within Canada (Rule 18.01)');
      }

      const deadline = addDaysExcludeFirst(servedDate, baseDays);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const remaining = daysBetween(today, deadline);

      const report = `SERVICE DEADLINE CALCULATION
${'='.repeat(40)}

Service Date: ${formatDate(servedDate)}
Service Method: ${params.service_method}
Base Period: ${params.response_period_days} days
${notes.length > 0 ? `\nAdjustments:\n${notes.map((n) => `  - ${n}`).join('\n')}\n` : ''}
Computed Deadline: ${formatDate(deadline)}
Days Remaining: ${remaining < 0 ? `EXPIRED (${Math.abs(remaining)} days ago)` : `${remaining} days`}

Time Computation (Rule 3.01):
- Excluded first day of service
- Included last day
- If last day is a holiday/weekend, extended to next business day

Authority: Rules of Civil Procedure, RRO 1990, Reg 194`;

      return { content: [{ type: 'text' as const, text: report }] };
    }
  );

  // ── Start Server ─────────────────────────────────────────────────────────

  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('[Mithril Legal Tools] MCP server started');
}

main().catch((error) => {
  console.error('[Mithril Legal Tools] Fatal error:', error);
  process.exit(1);
});
