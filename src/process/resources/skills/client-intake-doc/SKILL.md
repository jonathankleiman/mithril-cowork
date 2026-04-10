---
name: client-intake-doc
description: "Conduct structured client intake interviews and generate comprehensive matter summaries. Guides through contact collection, matter classification, conflict check preparation, and preliminary assessment. Outputs formatted intake documents ready for file opening. Trigger when user mentions 'new client', 'intake', 'onboarding', 'open a file', 'new matter', or needs to collect and organize client information."
---

# Client Intake Documentation Skill

## Purpose
Conduct structured intake interviews and generate formatted client matter summaries for file opening.

## Interview Flow

### Phase 1: Contact Information
Collect:
- Full legal name (as on government-issued ID)
- Any other names used (maiden name, business name)
- Date of birth
- Home address (full with postal code)
- Phone number(s) — cell, home, work
- Email address
- Preferred contact method and time
- Preferred language for communications
- Referral source (how they found Mithril Law)

### Phase 2: Matter Classification
Determine practice area:
- Small Claims Court (disputes ≤ $35,000)
- Employment Law (termination, harassment, ESA)
- Intellectual Property (trademark, copyright, patents)
- Criminal Law (summary, indictable, hybrid)
- Immigration (IRB, refugee, appeals)
- Administrative (CCB, tribunals)
- Corporate/Commercial (incorporation, contracts)
- Real Estate
- Family Law
- Other (classify and note)

### Phase 3: Matter-Specific Details

**For all matters:**
- Brief description of the issue
- Date(s) of key events
- Opposing party information (name, contact if known)
- Opposing counsel (if known)
- Relevant documents available
- Any court dates or deadlines pending
- Previous legal advice obtained
- Desired outcome

**Employment-specific:**
- Employer name, industry, size
- Position, title, start date
- Compensation (salary, bonus, benefits, pension)
- Date of termination/event
- Reason given
- Written employment contract?
- Working notice or pay in lieu received?
- Mitigation efforts
- ESA minimums paid?

**Small Claims-specific:**
- Amount in dispute (verify ≤ $35,000)
- Written agreement/contract?
- Communication history
- Evidence available
- Previous demands made?

**Criminal-specific:**
- Charges or anticipated charges
- Date of arrest/incident
- Bail conditions
- Court date and location
- Prior record?
- Statement given to police?

### Phase 4: Conflict Check Data
Collect for conflict database search:
- All party names (individuals and corporations)
- Related parties or entities
- Known lawyers/firms on other side
- Any prior relationship with Mithril Law

### Phase 5: Financial Assessment
- Legal Aid eligibility screening
- Fee arrangement discussion (flat, hourly, contingency)
- Ability to pay / payment plan needed

## Output: Client Matter Summary

```
╔══════════════════════════════════════════╗
║      CLIENT MATTER SUMMARY               ║
║      MITHRIL LAW                         ║
╚══════════════════════════════════════════╝

Opened:    [Date]
Matter #:  [YYYY-####]
Lawyer:    [Assigned lawyer]

────────────────────────────────────────────
CLIENT INFORMATION
────────────────────────────────────────────
Name:       [Full Legal Name]
DOB:        [Date of Birth]
Address:    [Full Address]
Phone:      [Phone Number(s)]
Email:      [Email]
Language:   [Preferred Language]
Referral:   [Source]

────────────────────────────────────────────
MATTER DETAILS
────────────────────────────────────────────
Area:        [Practice Area]
Sub-type:    [Specific Matter Type]
Court:       [Court/Tribunal if applicable]

SUMMARY OF FACTS
[Chronological narrative — objective tone]

KEY DATES
• [Date] — [Event]
• [Date] — [Limitation expires]

────────────────────────────────────────────
OPPOSING PARTY
────────────────────────────────────────────
Name:        [Name]
Address:     [If known]
Counsel:     [If known]

────────────────────────────────────────────
DOCUMENTS RECEIVED
────────────────────────────────────────────
☐ [Document 1]
☐ [Document 2]

────────────────────────────────────────────
CONFLICT CHECK
────────────────────────────────────────────
Status:      [Pending/Clear/Conflict]
Checked:     [Names searched]
Result:      [Outcome]

────────────────────────────────────────────
PRELIMINARY ASSESSMENT
────────────────────────────────────────────
Strengths:   [Key strengths of client's position]
Weaknesses:  [Key risks or weaknesses]
Recommendation: [Suggested course of action]

────────────────────────────────────────────
FEE ARRANGEMENT
────────────────────────────────────────────
Type:        [Flat/Hourly/Contingency]
Amount:      [$ amount or rate]
Retainer:    [$ initial retainer]
Legal Aid:   [Eligible/Not eligible/TBD]

────────────────────────────────────────────
NEXT STEPS
────────────────────────────────────────────
1. [Action item — responsible party — deadline]
2. [Action item — responsible party — deadline]
3. [Action item — responsible party — deadline]

────────────────────────────────────────────
NOTES
────────────────────────────────────────────
[Any additional observations or flags]
```

## Quality Standards
- Use objective, neutral language in fact summaries
- Flag urgent items (approaching limitations, upcoming court dates)
- Note Legal Aid eligibility if applicable
- Include ALL information needed for conflict check
- Identify missing information that needs follow-up
