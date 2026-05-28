# Task: Fix Transaction Value Formatting in Edit Modal

**Task ID**: 006
**Branch**: `fix/transaction-value-formatting`
**Type**: Bug Fix
**Priority**: High
**Status**: Not Started
**Created**: May 12, 2026
**Target Completion**: May 12, 2026

## Overview

Fix transaction value formatting in the edit modal. When loading a transaction for editing, the value field displays without proper currency formatting and thousands separators (e.g., shows `1000,00` instead of `R$ 1.000,00`). The value formats correctly once the user edits it, indicating the issue is in the initial display/loading.

## Root Cause

The transaction modal loads the initial value from `transactionEdit.valor` but doesn't apply the `formatMoney` helper function. The NumberInput component displays the raw numeric value instead of the formatted display.

## Acceptance Criteria

- [ ] Transaction value displays with correct Brazilian format: `R$ 1.000,00`
- [ ] Currency symbol (R$) shows on load
- [ ] Thousands separators display correctly
- [ ] Works for all transaction types
- [ ] Edit functionality still works correctly
- [ ] Form submission uses correct numeric value
- [ ] No console errors
- [ ] ESLint passing

## Related Issues & Tasks

- Related to: All transaction editing workflows
- Depends on: None
- Blocks: None

## Technical Details

### Affected Components

- `components/transactions/transaction-modal.tsx` (form initialization)
- `components/ui/number-input.tsx` (display formatting)

### Affected Services

- None (display/formatting only)

### Root Cause Analysis

In `transaction-modal.tsx`:
- When form resets with `transactionEdit` data, it sets `valor: transactionEdit.valor`
- This is a raw numeric value: `1000.5`
- The NumberInput displays it as-is without formatting
- Once user types/changes it, the formatting logic kicks in

**Solution**: 
- Apply `formatMoney` or display formatting when showing the value
- OR: Create a display value that's formatted, while keeping the numeric value separate

## Implementation Plan

### Phase 1: Investigation

- [ ] Review NumberInput component implementation
- [ ] Check how value is loaded in transaction modal form
- [ ] Verify formatMoney function behavior
- [ ] Understand form value vs display value pattern

### Phase 2: Core Implementation

- [ ] Determine best approach: format display vs. format on load
- [ ] Update form initialization to show formatted value
- [ ] Ensure numeric value is still correct for submission
- [ ] Handle both create and edit modes
- [ ] Test with different currency formats

### Phase 3: Testing

- [ ] Manual test: Edit transaction with 4-digit value
- [ ] Manual test: Edit transaction with decimal places
- [ ] Manual test: Verify currency symbol displays
- [ ] Manual test: Verify thousands separator displays
- [ ] Manual test: Submit form and verify value is saved correctly
- [ ] Manual test: All transaction types (expense, income, transfer, credit card)
- [ ] Manual test: Mobile responsive
- [ ] ESLint check
- [ ] Browser console clear

### Phase 4: Documentation & Review

- [ ] Merge to main
- [ ] Update task to Complete

## Expected Changes

**Before** (in modal form):
```
Valor: [1000,00]  ← Missing R$ and thousands separator
```

**After** (in modal form):
```
Valor: [R$ 1.000,00]  ← Properly formatted
```

## Work Log

### May 12 - Initial Setup

- Created task for value formatting issue
- Clarified issue: Shows `1000,00` instead of `R$ 1.000,00`
- Affects: All transaction edits
- Priority: High (data integrity + UX)
- Root cause: Missing formatMoney in edit modal form initialization

