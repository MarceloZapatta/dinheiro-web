# Task: Auto-Select Credit Card and Invoice When Creating Transaction

**Task ID**: 005
**Branch**: `feature/auto-select-credit-card-invoice`
**Type**: Feature
**Priority**: High
**Status**: Not Started
**Created**: May 12, 2026
**Target Completion**: May 14, 2026

## Overview

Improve the transaction creation UX by automatically selecting the credit card and invoice when a user changes the transaction type to "Cartão de Crédito" (Credit Card). This reduces manual selection steps and improves workflow efficiency.

## Acceptance Criteria

- [ ] When transaction type changes to "Credit Card", if only one credit card exists, auto-select it
- [ ] When a credit card is selected/auto-selected, automatically select the first open invoice
- [ ] Open invoice = current month AND closing_date is before today
- [ ] If multiple open invoices exist, select the one with newest (latest) closing_date
- [ ] Auto-selection triggers on type dropdown change
- [ ] Auto-selection respects existing user selection (don't override if already selected)
- [ ] No console errors
- [ ] ESLint passing

## Open Invoice Definition

An invoice is considered "open" when:
1. Reference month = current month (from transaction date)
2. `closing_date` < today
3. `is_paid` = false (or not closed)

If multiple open invoices match, select by **newest closing_date** (latest date before today).

## Related Issues & Tasks

- Related to: Task 003 (search on same page), Task 004 (button fix on same page)
- Depends on: None
- Blocks: None

## Technical Details

### Affected Components

- `components/transactions/transaction-modal.tsx` (main edit component)
- `components/ui/credit-cards/invoice-select.tsx` (invoice dropdown)

### Affected Services

- `services/transactions.ts` (might need invoice filtering logic)

### State Management

- Easy Peasy transactions store (`store/transactions.ts`)
- Watch for transaction_type changes
- Watch for account_id (credit card) changes

### Logic Changes

**Invoice Filter Logic**:
```
Invoice is open IF:
  - reference_date month == current month
  - closing_date < today
  - is_paid == false
  
Sort by: closing_date DESC (newest first)
Select: First one
```

## Implementation Plan

### Phase 1: Investigation & Setup

- [ ] Review transaction modal structure
- [ ] Review invoice data model (closing_date, reference_date, is_paid fields)
- [ ] Check current Easy Peasy store implementation
- [ ] Understand transaction type and credit card selection flow

### Phase 2: Core Implementation

- [ ] Add useEffect to watch transaction_type changes
- [ ] When type changes to "Credit Card":
  - [ ] Get all credit cards
  - [ ] If only one, auto-select it
  - [ ] Trigger invoice auto-selection
- [ ] Add logic to fetch open invoices for current month
- [ ] Filter invoices: closing_date < today, is_paid == false
- [ ] Sort by closing_date DESC
- [ ] Auto-select first invoice
- [ ] Handle multiple credit cards (don't auto-select if more than one)

### Phase 3: Testing

- [ ] Manual test: Create transaction, change type to Credit Card
- [ ] Manual test: Verify auto-selection of single credit card
- [ ] Manual test: Verify auto-selection of invoice
- [ ] Manual test: Test with multiple credit cards (no auto-select)
- [ ] Manual test: Test with multiple open invoices (select newest)
- [ ] Manual test: Test with no open invoices (handle gracefully)
- [ ] Manual test: Mobile responsive view
- [ ] ESLint check
- [ ] Browser console clear

### Phase 4: Documentation & Review

- [ ] Merge to main
- [ ] Update task to Complete

## Work Log

### May 12 - Initial Setup

- Created task for auto-select feature
- Clarified behavior: auto-select on type dropdown change
- Clarified invoice selection: newest closing_date if multiple open
- Set priority as High, effort as Medium (4-6 hours)

