# Task: Fix Button Nesting and Hydration Mismatch on Transactions Page

**Task ID**: 004
**Branch**: `fix/button-nesting-hydration`
**Type**: Bug Fix
**Priority**: High
**Status**: Not Started
**Created**: May 12, 2026
**Target Completion**: May 12, 2026

## Overview

Fix a critical hydration mismatch and icon rendering issue caused by nested button elements in the Transactions page. The PopoverTrigger button is nested inside a Button component, creating invalid HTML and causing React hydration warnings. The Plus icon also doesn't render because of this structural issue.

## Root Cause

In `app/(authenticated)/transactions/page.tsx`, line ~89:
```jsx
<PopoverTrigger>
  <Button asChild>
    <Plus />
  </Button>
</PopoverTrigger>
```

This creates **invalid HTML nesting** (button inside button) because:
- PopoverTrigger renders as a `<button>` element
- Button component wraps it in another button element
- This violates HTML rules and causes hydration mismatches

## Acceptance Criteria

- [ ] No hydration mismatch warning in console
- [ ] Plus button icon displays correctly
- [ ] Button still triggers Popover menu
- [ ] Code follows valid HTML structure (no nested buttons)
- [ ] ESLint passing
- [ ] No console errors

## Related Issues & Tasks

- Caused by: PopoverTrigger + Button nesting
- Relates to: Task 003 (search feature on same page)
- Depends on: None
- Blocks: None

## Technical Details

### Affected Components

- `app/(authenticated)/transactions/page.tsx` (Popover section)

### Affected Services

- None

### Root Cause Analysis

Invalid HTML nesting:
- PopoverTrigger automatically renders as `<button>`
- Wrapping it in `<Button>` creates button-inside-button
- React hydration fails because server renders invalid HTML differently
- Icon doesn't show because of render issues

## Implementation Plan

### Phase 1: Investigation

- [ ] Verify the button nesting issue in code
- [ ] Check PopoverTrigger rendered output
- [ ] Understand Shadcn Button `asChild` prop behavior

### Phase 2: Core Implementation

- [ ] Remove inner `<Button asChild>` wrapper
- [ ] Use `<PopoverTrigger asChild>` instead
- [ ] Wrap Plus icon directly in PopoverTrigger
- [ ] Test button functionality and icon rendering

### Phase 3: Testing

- [ ] Manual test: Verify no hydration warnings
- [ ] Manual test: Plus button icon renders
- [ ] Manual test: Popover menu opens/closes correctly
- [ ] Manual test: Button styles consistent with design
- [ ] ESLint check
- [ ] Browser console clear

### Phase 4: Documentation & Review

- [ ] Merge to main
- [ ] Update task to Complete

## Code Changes (Expected)

**Before** (Invalid):
```jsx
<PopoverTrigger>
  <Button asChild>
    <Plus />
  </Button>
</PopoverTrigger>
```

**After** (Valid):
```jsx
<PopoverTrigger asChild>
  <Button>
    <Plus />
  </Button>
</PopoverTrigger>
```

Or simpler:
```jsx
<PopoverTrigger asChild>
  <Button variant="ghost" size="icon">
    <Plus />
  </Button>
</PopoverTrigger>
```

## Work Log

### May 12 - Investigation & Planning

- Created task for button nesting hydration issue
- Root cause identified: nested button elements in PopoverTrigger
- Affects: Transactions page plus button
- Priority: High (hydration mismatch + missing icon)

