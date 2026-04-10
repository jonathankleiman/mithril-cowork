---
name: retainer-agreement
description: "Generate retainer agreements (engagement letters) compliant with Law Society of Ontario requirements. Covers flat fee, hourly, contingency, and hybrid fee arrangements. Includes required LSO disclosures, trust account provisions, scope of services, and withdrawal terms. Trigger when user mentions 'retainer', 'engagement letter', 'fee agreement', 'client agreement', or needs to formalize a lawyer-client relationship."
---

# Retainer Agreement Drafting Skill

## Purpose
Generate LSO-compliant retainer agreements that clearly define the lawyer-client relationship, scope of services, and fee arrangements.

## LSO Requirements (By-Law 7.1)

Every retainer agreement MUST include:

1. **Scope of Services** — What legal services will be provided (and exclusions)
2. **Fees and Disbursements** — Fee structure, rates, estimated total
3. **Billing Practices** — How and when bills will be rendered
4. **Payment Terms** — When payment is due, consequences of non-payment
5. **Trust Account** — How retainer funds will be held and applied
6. **Right to Assessment** — Client's right to have bills reviewed by Assessment Officer
7. **Termination/Withdrawal** — How either party can end the relationship
8. **File Retention** — How long files will be kept after matter closes
9. **Conflicts of Interest** — Disclosure of any potential conflicts

## Fee Structures

### Flat Fee
```
Total Fee: $[amount] + HST
Due: [payment schedule]
Includes: [specific services]
Does NOT include: [exclusions — disbursements, court fees, etc.]
```

### Hourly Rate
```
Rate: $[amount]/hour + HST
[Junior associate rate if applicable]
[Paralegal/clerk rate if applicable]
Billing increments: [0.1 hour / 6-minute minimum]
Estimated range: $[low] - $[high]
```

### Contingency Fee
```
Percentage: [X]% of recovery
Applicable to: [types of recovery — settlement, judgment, etc.]
No recovery = no fee (but client responsible for disbursements)
Must comply with Solicitors Act, s. 28.1
```

## Required Clauses

### Trust Account
> Retainer funds will be deposited into our trust account and applied against fees and disbursements as they are incurred. You will receive a trust statement showing all deposits and withdrawals.

### Right to Assessment
> You have the right to have our accounts reviewed and assessed by an Assessment Officer of the Superior Court of Justice. There are time limits for requesting an assessment. Please ask if you would like more information.

### Withdrawal
> We reserve the right to withdraw from representation if: (a) you fail to pay accounts when due; (b) you fail to provide instructions; (c) there is a breakdown in the lawyer-client relationship; (d) you engage in dishonest or illegal conduct; or (e) continued representation would be unethical. Reasonable notice will be provided.

### Confidentiality
> All communications between us are protected by solicitor-client privilege. We will not disclose your information without your consent, except as required by law or professional obligations.

## Output Format
Generate a complete retainer agreement with:
- Professional letterhead placeholder
- Full party identification
- All required LSO provisions
- Fee schedule with HST
- Signature blocks for lawyer and client
- Date fields
