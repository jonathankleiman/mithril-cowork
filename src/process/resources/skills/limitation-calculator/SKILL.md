---
name: limitation-calculator
description: "Calculate limitation periods and critical legal deadlines under Ontario law. Covers the Limitations Act 2002, special limitation periods, discovery rules, tolling provisions, and court-specific timelines. Generates comprehensive deadline reports with calendar recommendations. Trigger when user mentions 'limitation period', 'deadline', 'how long do I have to file', 'statute of limitations', 'time limit', or needs to calculate any legal deadline."
---

# Limitation Period Calculator Skill

## Purpose
Calculate all applicable limitation periods and legal deadlines, generating a comprehensive deadline report with calendar recommendations.

## Ontario Limitations Act, 2002

### Basic Limitation — 2 Years (s. 4)
From date of discovery. Applies to:
- Breach of contract
- Negligence / tort
- Wrongful dismissal
- Property damage
- Consumer claims
- Most civil claims

### Discovery Rule (s. 5)
Claim discovered on the EARLIER of:
1. Day person first knew:
   - Injury/loss/damage occurred
   - Was caused by act/omission of the defendant
   - A proceeding would be an appropriate means to remedy
2. Day a reasonable person would have known the above

### Ultimate Limitation — 15 Years (s. 15)
Absolute bar regardless of discovery.

### No Limitation Period (s. 16)
- Sexual assault
- Certain environmental claims
- Proceedings by the Crown
- Declared by another statute

### Suspension/Tolling
- Minority: suspended until person turns 18 (s. 6)
- Incapacity: suspended during incapacity (s. 7)
- Attempted resolution: suspended during some ADR (s. 11)
- Acknowledgment: resets basic limitation (s. 13)
- Partial payment: resets basic limitation for debt (s. 13(6))

## Special Limitation Periods

| Type | Period | Start Date | Authority |
|------|--------|------------|-----------|
| Municipal (slip/fall) | 10 days written notice + 2 years | Date of injury | Municipal Act, s. 44 |
| Human rights complaint | 1 year | Date of discrimination | Human Rights Code, s. 34 |
| WSIB | 6 months | Date of decision | WSIA, s. 31 |
| Small Claims appeal | 30 days | Date of judgment | CJA |
| Superior Court appeal | 30 days | Date of order | RCP r. 61.04 |
| Leave to appeal to Divisional Court | 15 days | Date of order | RCP r. 61.03.1 |
| Tax reassessment objection | 90 days | Date of notice | ITA, s. 165(1) |
| CPP disability | 90 days of reconsideration | Date of decision | CPP Act |
| LTB (landlord/tenant) | 30 days to appeal | Date of order | RTA, s. 210 |

## Computation of Time

Per Rules of Civil Procedure, r. 3.01:
- Exclude first day, include last day
- If last day is holiday/weekend → next business day
- "At least X days" means clear days (exclude both)
- Ontario statutory holidays: New Year's, Family Day, Good Friday, Easter Monday, Victoria Day, Canada Day, Civic Holiday, Labour Day, Thanksgiving, Christmas, Boxing Day

## Output Format

Generate a structured deadline report:

```
LIMITATION & DEADLINE REPORT
=============================
Prepared: [Date]
Matter: [Description]

TRIGGERING EVENT
Date: [Date]
Description: [What happened]

CRITICAL DEADLINES
[In chronological order, color-coded by urgency]

1. [EXPIRED/URGENT/UPCOMING/FUTURE] — [Date]
   Deadline: [Description]
   Authority: [Statute, s. X]
   Days Remaining: [X days / EXPIRED]
   Action Required: [Specific action]

CALENDAR ALERTS
- [Date]: [Description] (X days before [deadline])
- [Date]: [Description] (X days before [deadline])

TOLLING CONSIDERATIONS
- [Any applicable suspension/tolling provisions]

ASSUMPTIONS & CAVEATS
- [List any assumptions made]
- [Note: dates calculated from stated facts; verify all dates]
```

## Critical Rules
1. Always err on the SHORTER deadline
2. Flag expired or near-expired limitations prominently
3. Note the discovery rule when applicable
4. Check for special notice requirements (e.g., municipal claims)
5. Include at least 2 advance reminder dates per deadline
6. Note if Crown or municipality is a party (special rules apply)
