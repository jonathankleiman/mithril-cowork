---
name: costs-outline
description: "Generate costs outlines and bills of costs for Ontario court proceedings. Covers partial indemnity, substantial indemnity, and Small Claims Court cost schedules. Includes tariff calculations, disbursement tracking, and Rule 57 factor analysis. Trigger when user mentions 'costs outline', 'bill of costs', 'costs submission', 'cost consequences', or needs to calculate legal costs for court."
---

# Costs Outline Generator Skill

## Purpose
Prepare costs outlines and bills of costs for Ontario court proceedings following applicable rules and tariffs.

## Cost Scales

### Partial Indemnity (Default — Rule 57.01)
- Standard scale for successful party
- Approximately 60% of actual solicitor-client costs
- Court considers Rule 57.01 factors

### Substantial Indemnity (Rule 57.01(3))
- Approximately 1.5x partial indemnity
- Awarded where:
  - Offer to settle beaten (Rule 49.10)
  - Improper conduct by losing party
  - Special circumstances

### Small Claims Court Costs (Rule 19)
- Representation fee: max 15% of amount claimed
- If claim ≤ $500: max $50
- Reasonable disbursements recoverable
- Penalty for unreasonable behaviour (Rule 19.06)

## Rule 57.01 Factors
When calculating costs, consider:
1. Amount claimed vs. amount recovered
2. Complexity of proceedings
3. Importance of issues
4. Conduct of any party that shortened/lengthened the proceedings
5. Whether any step was improper, vexatious, or unnecessary
6. Party's denial of or refusal to admit anything
7. Any offer to settle (Rule 49)
8. Any other matter relevant to the question of costs

## Output Format

```
COSTS OUTLINE
═══════════════════════════════════════

Court File No.: [Number]
[Style of Cause]

Submitted by: [Party name]
Scale: [Partial / Substantial Indemnity]

────────────────────────────────────────
FEES
────────────────────────────────────────
Item | Description              | Hours | Rate    | Amount
─────┼──────────────────────────┼───────┼─────────┼────────
1    | [Pleadings]              | X.X   | $XXX/hr | $X,XXX
2    | [Motions]                | X.X   | $XXX/hr | $X,XXX
3    | [Discoveries]            | X.X   | $XXX/hr | $X,XXX
4    | [Trial preparation]      | X.X   | $XXX/hr | $X,XXX
5    | [Trial/hearing]          | X.X   | $XXX/hr | $X,XXX
6    | [Correspondence]         | X.X   | $XXX/hr | $X,XXX
                                                    ────────
                                          Subtotal: $XX,XXX

────────────────────────────────────────
DISBURSEMENTS
────────────────────────────────────────
Item | Description              | Amount
─────┼──────────────────────────┼────────
1    | Court filing fees        | $XXX
2    | Process server           | $XXX
3    | Photocopying             | $XXX
4    | Expert reports           | $X,XXX
5    | Transcripts              | $XXX
                                 ────────
                       Subtotal: $X,XXX

HST on fees:                     $X,XXX
HST on taxable disbursements:    $XXX
                                 ────────
TOTAL COSTS CLAIMED:             $XX,XXX

────────────────────────────────────────
RULE 57.01 SUBMISSIONS
────────────────────────────────────────
[Brief analysis of applicable factors supporting the costs claimed]

────────────────────────────────────────
OFFER TO SETTLE HISTORY (Rule 49)
────────────────────────────────────────
[Date and terms of any offers, cost consequences]
```

## Key Rules
- HST (13%) applies to fees and taxable disbursements
- Court filing fees are NOT subject to HST
- Include only reasonable and necessary disbursements
- Expert report costs need court approval if over threshold
- Keep track of all offer to settle dates for cost consequences
