---
name: case-brief
description: "Generate concise case briefs from court decisions. Extracts key facts, issues, holdings, ratios, and analysis in standard briefing format. Supports both quick briefs (1-page) and detailed briefs with dissent analysis. Trigger when user mentions 'brief this case', 'case brief', 'summarize decision', or provides a case citation to analyze."
---

# Case Brief Generator Skill

## Purpose
Generate structured case briefs in standard Canadian legal briefing format, extracting the essential elements for legal research and court preparation.

## Brief Formats

### Quick Brief (1 page)
```
CASE BRIEF
══════════════════════════════════════

Citation: [Full neutral citation]
Court: [Court name and level]
Judge(s): [Name(s)]
Date: [Date of decision]

FACTS (3-5 sentences)
[Material facts only — what happened]

ISSUE(S)
1. [Legal question the court had to decide]

HOLDING
[Court's answer to each issue — yes/no + brief reason]

RATIO DECIDENDI
[The legal principle established — the binding part]

KEY TAKEAWAY
[One sentence: why this case matters for our client/matter]
```

### Detailed Brief (2-4 pages)
```
DETAILED CASE BRIEF
══════════════════════════════════════

Citation: [Full citation with parallel cites]
Court: [Full court name]
Coram: [Panel composition]
Date: [Date]
Counsel: [Counsel names if relevant]

PROCEDURAL HISTORY
[How the case got to this court]

FACTS
[Detailed chronological facts]
[Distinguish admitted facts from disputed facts]

ISSUE(S)
[Numbered, precisely stated]

ARGUMENTS
Appellant/Plaintiff:
- [Key arguments]

Respondent/Defendant:
- [Key arguments]

ANALYSIS & REASONING
[Court's analysis organized by issue]
[Key paragraphs referenced by number]

HOLDING & DISPOSITION
[Decision + any orders made]

RATIO DECIDENDI
[Binding legal principle(s)]

OBITER DICTA
[Important non-binding observations]

DISSENT (if applicable)
[Dissenting judge(s) and their reasoning]

SIGNIFICANCE
- [How this changes/confirms the law]
- [Implications for future cases]
- [Relevance to our practice areas]
```

## Analysis Standards
1. Always identify the RATIO — the binding legal principle
2. Distinguish ratio from obiter dicta
3. Note the court level (binding vs. persuasive authority)
4. Flag if the case has been overruled, distinguished, or followed
5. Use paragraph numbers for pinpoint references
6. Note any concurring or dissenting opinions
7. Identify the standard of review if appellate decision
