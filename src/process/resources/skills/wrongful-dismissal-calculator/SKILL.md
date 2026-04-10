---
name: wrongful-dismissal-calculator
description: "Calculate reasonable notice periods for wrongful dismissal claims using the Bardal factors framework. Covers ESA minimums, common law notice, severance pay, and mitigation analysis. Generates structured entitlement reports. Trigger when user mentions 'wrongful dismissal', 'termination', 'notice period', 'severance', 'Bardal factors', or needs to estimate termination entitlements."
---

# Wrongful Dismissal Calculator Skill

## Purpose
Calculate reasonable notice periods and termination entitlements for Ontario wrongful dismissal matters using the Bardal factors framework and ESA minimums.

## Bardal Factors (*Bardal v Globe & Mail Ltd*, 1960)
1. **Age** of the employee at termination
2. **Length of service** (years of continuous employment)
3. **Character of employment** (seniority, specialization, management level)
4. **Availability of similar employment** (market conditions, industry)

## ESA Minimums (*Employment Standards Act, 2000*)

### Notice of Termination (s. 57)
| Service Length | Minimum Notice |
|----------------|---------------|
| 3 months – 1 year | 1 week |
| 1 – 3 years | 2 weeks |
| 3 – 4 years | 3 weeks |
| 4 – 5 years | 4 weeks |
| 5 – 6 years | 5 weeks |
| 6 – 7 years | 6 weeks |
| 7 – 8 years | 7 weeks |
| 8+ years | 8 weeks |

### Severance Pay (s. 64) — If Eligible
**Eligibility**: 5+ years of service AND employer payroll ≥ $2.5M
**Amount**: 1 week per year of service (max 26 weeks)

## Common Law Notice Ranges (Case Law Guidelines)

| Service | Junior/Entry | Mid-Level | Senior/Executive |
|---------|-------------|-----------|-----------------|
| < 2 yrs | 1–3 months | 2–4 months | 3–6 months |
| 2–5 yrs | 2–6 months | 4–8 months | 6–12 months |
| 5–10 yrs | 4–8 months | 6–12 months | 10–16 months |
| 10–15 yrs | 6–12 months | 10–16 months | 14–20 months |
| 15–20 yrs | 10–16 months | 14–20 months | 18–24 months |
| 20+ yrs | 14–20 months | 18–24 months | 20–26 months |

**Upper limit**: Generally capped at 24 months (*Lowndes v Summit Ford*, 2006 CanLII 14).
Exceptional circumstances can exceed 24 months (*Dawe v The Equitable Life Insurance Company*, 2019 ONCA 512).

## Output Format

```
WRONGFUL DISMISSAL ENTITLEMENT ESTIMATE
════════════════════════════════════════

Employee: [Name]
Employer: [Company Name]
Position: [Title]
Date of Hire: [Date]
Date of Termination: [Date]
Service: [X years, Y months]
Age at Termination: [XX]

────────────────────────────────────────
BARDAL FACTORS ANALYSIS
────────────────────────────────────────

1. AGE: [Age] — [Impact: younger employees may find
   work more easily; older employees face more difficulty]

2. SERVICE: [X years] — [Long service favours longer notice]

3. CHARACTER: [Position level, specialization, management
   responsibilities, industry] — [Impact analysis]

4. AVAILABILITY: [Current market conditions for this role,
   industry trends, geographic considerations]

────────────────────────────────────────
ESA MINIMUM ENTITLEMENTS
────────────────────────────────────────
Notice (s. 57):       [X] weeks
Severance (s. 64):    [X] weeks (if eligible) or N/A
                      ──────────
ESA Total:            [X] weeks ([$ amount])

────────────────────────────────────────
COMMON LAW ESTIMATE
────────────────────────────────────────
Low estimate:         [X] months ([$ amount])
Mid estimate:         [X] months ([$ amount])
High estimate:        [X] months ([$ amount])

Damages include:
- Base salary: $[X]/month x [X] months = $[X]
- Benefits continuation value: ~$[X]/month
- Bonus (avg): $[X]/year prorated
- Pension contributions: $[X]/month
- Car allowance/other: $[X]/month
                                ──────────
Estimated Total (mid): $[XX,XXX]

────────────────────────────────────────
AMOUNTS RECEIVED / OFFERED
────────────────────────────────────────
Working notice:       [X weeks / None]
Pay in lieu (ESA):    $[X,XXX]
Severance pay:        $[X,XXX]
Total received:       $[X,XXX]

SHORTFALL (mid estimate): $[XX,XXX]

────────────────────────────────────────
MITIGATION
────────────────────────────────────────
[Employee's duty to mitigate — steps taken, prospects]
[Note: employer bears burden of proving failure to mitigate]
[Mitigation earnings may reduce damages]

────────────────────────────────────────
KEY AUTHORITIES
────────────────────────────────────────
• *Bardal v Globe & Mail Ltd* (1960), 24 DLR (2d) 140
• [Additional relevant cases based on facts]

────────────────────────────────────────
RECOMMENDATION
────────────────────────────────────────
[Recommended course of action and settlement range]
```

## Important Notes
- ESA minimums are a FLOOR — common law notice is almost always higher
- ESA notice and severance are SEPARATE entitlements
- Benefits must continue during ESA notice period
- Employment contract may limit entitlements to ESA minimums (if enforceable — see *Waksdale v Swegon*, 2020 ONCA 391)
- Constructive dismissal analysis requires different framework
- Moral/aggravated damages may apply (*Honda Canada Inc v Keays*, 2008 SCC 39)
- Punitive damages in exceptional cases (*Boucher v Wal-Mart Canada Corp*, 2014 ONCA 419)
