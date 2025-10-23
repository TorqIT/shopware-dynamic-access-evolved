# Overview

This is a Shopware plugin that we need to make compatible with Shopware version 6.7. This was originally wrote against Shopware 6.6.

Using the main CLAUDE.md file, you can get insight on how we can view this plugin in a browser, and general project context. For solving most of these issues, we'll be accessing the site in admin watch mode for OrtoPed.

Here is a guide for migrating from 6.6 to 6.7: https://github.com/shopware/shopware/blob/trunk/UPGRADE-6.7.md. Pay special attention to the migration to the new Meteor component library. Also take focus on any other UI/Vue changes we need to address.

Also consider anything important from these related URLS: 
- https://github.com/shopware/shopware/blob/6.7.0.0/CHANGELOG.md  (6.7 Changelog)
- https://github.com/shopware/shopware/blob/trunk/adr/2024-03-21-implementation-of-meteor-component-library.md (Meteor component library overview).
- https://developer.shopware.com/docs/guides/plugins/plugins/administration/ (Documentation on how to develop administration components in the backend)
This plugin is loaded into the Cascade/OrtoPed project as a git submodule. The root to the plugin relative to the workspace is at `src/submodules/TorqDynamicAccessEvolved`.

Can you start by evaluating the code in this plugin, the external URLS and building a work plan? I then want you to add that workplan to the bottom of this document under the `# Upgrade Steps` section. I'll be starting a new context after you build this plan, so include enough detail that a fresh context can start from an informed position. Please create a numbered list, in a logical order, of the steps we need to perform. Each step should be logically commitable to git.

# Upgrade Steps

## Overview of Required Changes

The TorqDynamicAccessEvolved plugin requires several updates to be compatible with Shopware 6.7:

**Vue/Administration Changes:**
- Migrate from `v-model:value` to `v-model` (Vue 3 breaking change)
- Replace deprecated `$listeners` with proper Vue 3 patterns
- Migrate from old `sw-*` components to new Meteor `mt-*` components where applicable
- Update component property bindings for Meteor compatibility

**Build Changes:**
- Project will be running in watch mode. If viewing in watch mode, browser will automatically refresh when files are saved. There is NO NEED to manually run rebuild until we are ready to commit.
- Test all functionality in admin watch mode

**PHP/Backend:**
- composer.json already correctly requires `^6.7.0` ✓
- Event subscriber and DAL usage appears compatible ✓

## Detailed Step-by-Step Plan

### 1. Update v-model bindings from v-model:value to v-model

**Files to modify:**
- `src/Resources/app/administration/src/module/dynamic-access-evolved/page/torq-dynamic-access-evolved-detail/torq-dynamic-access-evolved-detail.html.twig`
- `src/Resources/app/administration/src/module/dynamic-access-evolved/component/torq-dynamic-access-evolved-filter/torq-dynamic-access-evolved-filter.html.twig`

**Changes:** Replace all instances of `v-model:value` with `v-model`. In Shopware 6.7/Vue 3, the Meteor components use `v-model` instead of `v-model:value`.

**Affected components:**
- `sw-text-field` (line 31 in detail template)
- `sw-datepicker` (lines 40, 48 in detail template)
- `sw-switch-field` (lines 57, 86 in detail template)
- `sw-single-select` (line 7 in filter template)
- `sw-button-process` (line 13 in detail template - uses `v-model:processsuccess`)

**Testing:** After changes, verify that all form fields properly bind to the data model in the detail view and can be saved/loaded correctly.

**Commit message:** `feat: migrate v-model bindings to Vue 3 syntax for Shopware 6.7`

---

### 2. Replace $listeners with Vue 3 pattern in component JavaScript files

**Files to modify:**
- `src/Resources/app/administration/src/module/dynamic-access-evolved/component/torq-dynamic-access-evolved-sales-channel-select/index.js`
- `src/Resources/app/administration/src/module/dynamic-access-evolved/component/torq-dynamic-access-evolved-rule-select/index.js`

**Changes:** In Vue 3, `$listeners` has been removed and merged into `$attrs`. Update the computed `listeners()` property and the template usage of `v-on="listeners"` to use `$attrs` instead or remove the pattern entirely if not needed.

**Specific changes:**
- Remove the `listeners()` computed property
- In templates, replace `v-on="listeners"` with direct event bindings or use `v-bind="$attrs"` if passing all attributes

**Testing:** Verify that the sales channel select and rule select components properly emit events and that parent components can listen to these events.

**Commit message:** `feat: replace Vue 2 $listeners with Vue 3 $attrs pattern`

---

### 3. Migrate sw-text-field to mt-text-field (Meteor Component Library)

**Files to modify:**
- `src/Resources/app/administration/src/module/dynamic-access-evolved/page/torq-dynamic-access-evolved-detail/torq-dynamic-access-evolved-detail.html.twig`

**Changes:** Replace `<sw-text-field>` with `<mt-text-field>` and update any related properties if needed based on Meteor component API.

**Note:** The UPGRADE-6.7.md explicitly mentions that `sw-text-field` is being replaced by Meteor components. Verify property compatibility (most properties should remain the same, but check for any breaking changes in property names).

**Testing:** Verify the name field in the detail view displays correctly, accepts input, validates, and saves properly.

**Commit message:** `feat: migrate sw-text-field to mt-text-field for Meteor compatibility`

---

### 4. Migrate sw-switch-field to mt-switch (Meteor Component Library)

**Files to modify:**
- `src/Resources/app/administration/src/module/dynamic-access-evolved/page/torq-dynamic-access-evolved-detail/torq-dynamic-access-evolved-detail.html.twig`

**Changes:** Replace `<sw-switch-field>` with `<mt-switch>` (or the appropriate Meteor equivalent). Update property names if the Meteor component uses different property conventions.

**Properties to verify:**
- `v-model` binding
- `label` property
- `disabled` property
- `bordered` property (may not exist in Meteor component)

**Testing:** Verify both switch fields (active and canOnlyAccess) toggle correctly and save their state.

**Commit message:** `feat: migrate sw-switch-field to mt-switch for Meteor compatibility`

---

### 5. Investigate and migrate other Shopware components to Meteor equivalents

**Components to research and potentially migrate:**
- `sw-button` → `mt-button` (used extensively)
- `sw-button-process` → Meteor equivalent (if exists)
- `sw-card` → `mt-card`
- `sw-datepicker` → `mt-datepicker`
- `sw-single-select` → `mt-select`
- `sw-entity-listing` → Check if Meteor replacement exists
- `sw-entity-multi-select` → Check if replacement needed
- `sw-entity-many-to-many-select` → Check if replacement needed
- `sw-icon` → Check if `mt-icon` exists
- `sw-page`, `sw-sidebar`, `sw-search-bar` → Check Meteor equivalents

**Process for each component:**
1. Check UPGRADE-6.7.md and Meteor documentation for replacement component
2. If replacement exists, update component name and verify property compatibility
3. Test functionality after each component migration
4. If no replacement exists or component is not deprecated, leave as-is

**Files to modify:**
- `src/Resources/app/administration/src/module/dynamic-access-evolved/page/torq-dynamic-access-evolved-list/torq-dynamic-access-evolved-list.html.twig`
- `src/Resources/app/administration/src/module/dynamic-access-evolved/page/torq-dynamic-access-evolved-detail/torq-dynamic-access-evolved-detail.html.twig`
- `src/Resources/app/administration/src/module/dynamic-access-evolved/component/torq-dynamic-access-evolved-filter/torq-dynamic-access-evolved-filter.html.twig`
- `src/Resources/app/administration/src/module/dynamic-access-evolved/component/torq-dynamic-access-evolved-or-container/torq-dynamic-access-evolved-or-container.html.twig`
- `src/Resources/app/administration/src/module/dynamic-access-evolved/component/torq-dynamic-access-evolved-and-container/torq-dynamic-access-evolved-and-container.html.twig`
- Other component templates as needed

**Testing:** Test each migrated component individually in admin watch mode. Verify all functionality: list view, detail view, create, edit, delete, filtering, etc.

**Commit message(s):** Create separate commits for each major component migration, e.g., `feat: migrate sw-button to mt-button`, `feat: migrate sw-card to mt-card`, etc.

---

### 6. Update v-model:processsuccess binding for sw-button-process

**File to modify:**
- `src/Resources/app/administration/src/module/dynamic-access-evolved/page/torq-dynamic-access-evolved-detail/torq-dynamic-access-evolved-detail.html.twig`

**Changes:** The `sw-button-process` component uses `v-model:processsuccess`. Research if this needs to change to `v-model` or a different syntax in 6.7. Also check if `sw-button-process` is being replaced by a Meteor component.

**Testing:** Verify the save button shows loading state, success state, and handles errors correctly.

**Commit message:** `feat: update button-process component for Shopware 6.7 compatibility`

---

### 7. Build and test administration in watch mode

**Testing checklist:**
1. Open OrtoPed site in admin watch mode: http://ortoped.localhost.torq:5433
2. Navigate to the Dynamic Access Evolved module
3. Test List View:
   - Verify list displays correctly
   - Test search functionality
   - Test sorting
   - Test pagination
4. Test Create:
   - Click "Add" button
   - Fill in form fields
   - Verify all components render correctly
   - Save new rule
5. Test Edit:
   - Open existing rule
   - Modify fields
   - Verify changes save correctly
6. Test Filters:
   - Add product filters
   - Add category filters
   - Add manufacturer filters
   - Verify OR/AND logic works
7. Test Rule Assignment:
   - Assign customer rules
   - Assign sales channels
8. Test Delete:
   - Delete a rule
   - Verify it's removed from list

---

### 8. Review and fix any console errors or warnings

**Process:**
1. Open browser console while testing in admin watch mode
2. Note any deprecation warnings about components or patterns
3. Note any errors in functionality
4. Address each warning/error:
   - Component deprecations → migrate to Meteor
   - Vue 3 pattern warnings → update code patterns
   - API changes → update method calls

**Files to potentially modify:** Any files based on console warnings

**Testing:** Re-test all functionality, verify console is clean (or only has acceptable warnings)

**Commit message:** `fix: resolve console warnings and errors for Shopware 6.7`

---

### 9. Update PHP code if needed based on testing

**Potential changes:**
- Review EntityRepository type hints if TypeScript/PHPStan shows issues
- Update any deprecated DAL methods if found during testing
- Review event subscriber for any event signature changes

**Files to potentially modify:**
- `src/Subscriber/DynamicAccessEvolvedSubscriber.php`
- `src/Entity/**/*.php`
- `src/Core/Content/Product/SalesChannel/*.php`

**Testing:**
- Test that product filtering works correctly on the storefront
- Verify rules are properly applied based on customer and sales channel
- Test date range filtering (validFrom/validUntil)

**Commit message:** `fix: update PHP code for Shopware 6.7 DAL compatibility` (if needed)

---

### 10. Final end-to-end testing and documentation

**Testing:**
1. Fresh install/reinstall of plugin in 6.7 environment
2. Full CRUD workflow
3. Rule application on storefront
4. Performance testing with multiple rules
5. Edge cases (empty rules, complex filter combinations, etc.)

**Documentation updates:**
- Update README.md if it contains version-specific information
- Note any breaking changes in behavior
- Document new component usage if significantly different

**Files to potentially modify:**
- `README.md`
- Any inline code comments that reference old patterns

**Commit message:** `docs: update documentation for Shopware 6.7 compatibility`

---

## Summary

This upgrade plan addresses the main compatibility issues between Shopware 6.6 and 6.7:

1. **Vue 3 syntax changes** (v-model, $listeners)
2. **Meteor Component Library migration** (sw-* → mt-* components)
3. **Administration asset rebuilding**
4. **Comprehensive testing**

Each step is designed to be independently committable to git, allowing for incremental progress and easier debugging if issues arise. The plan prioritizes changes that are most likely to cause breaking changes (Vue 3 syntax) before moving to component migrations (which may or may not break depending on component compatibility).

The testing strategy emphasizes admin watch mode usage as specified in the project's CLAUDE.md, allowing for real-time feedback during development.

