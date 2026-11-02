# 🤝 Contributing to Museum of Failure

Thank you for your interest in contributing to **Museum of Failure**!

Every museum is built through the preservation of stories, the careful organization of information, and the work of people who believe that certain experiences deserve to be remembered.

Museum of Failure follows the same idea.

It is a digital archive dedicated to unsuccessful experiments, abandoned projects, unexpected outcomes, and the lessons that can be learned from them.

Whether you want to improve the website, fix an issue, refine the design, suggest a feature, or help document the stories behind failure, your contribution is welcome.

This guide explains how to contribute while keeping the project organized, consistent, and true to its identity.

---

## 📑 Table of Contents

1. [Before You Contribute](#1-before-you-contribute)
2. [Development Requirements](#2-development-requirements)
3. [Setting Up the Project](#3-setting-up-the-project)
4. [Ways to Contribute](#4-ways-to-contribute)
5. [Contribution Principles](#5-contribution-principles)
6. [Code and Design Guidelines](#6-code-and-design-guidelines)
7. [Contributing Exhibit Ideas and Stories](#7-contributing-exhibit-ideas-and-stories)
8. [Reporting Issues](#8-reporting-issues)
9. [Suggesting Improvements](#9-suggesting-improvements)
10. [Submitting Your Changes](#10-submitting-your-changes)
11. [Pull Request Checklist](#11-pull-request-checklist)
12. [Code of Conduct](#12-code-of-conduct)

---

## 1. Before You Contribute

Before making changes, take some time to understand what Museum of Failure represents.

The project is not intended to make fun of unsuccessful attempts or portray failure as something inherently positive.

Its purpose is to document experiences honestly and explore what can be learned from them.

Contributions should support at least one of the museum's central goals:

- Preserve stories of unsuccessful attempts.
- Make the archive easier to explore.
- Present information clearly and thoughtfully.
- Improve the museum's functionality and accessibility.
- Encourage reflection, curiosity, and learning.

For major changes, it is recommended to discuss your proposal before beginning implementation.

---

## 2. Development Requirements

Before working on the project, make sure you have the following tools:

- **Visual Studio Code** or another code editor.
- **Git** for version control.
- **GitHub Account** for repository collaboration.
- **Modern Web Browser** for testing.
- **Local Development Server** such as the Visual Studio Code Live Server extension.

### Recommended Knowledge

Familiarity with the following technologies is helpful:

- HTML5
- CSS3
- JavaScript
- DOM Manipulation
- Responsive Web Design
- Git and GitHub
- Browser Local Storage

Since Museum of Failure is built as a frontend-focused website, contributors should be comfortable working with the existing HTML, CSS, and JavaScript structure.

---

## 3. Setting Up the Project

Follow these steps to prepare your local environment.

### Step 1: Fork the Repository

Visit the [Museum of Failure GitHub Repository](https://github.com/rheillunio2-byte/Museum-of-Failure) and click **Fork** to create your own copy.

### Step 2: Clone Your Fork

Open your terminal and run:

```bash
git clone https://github.com/YOUR-USERNAME/Museum-of-Failure.git
```

Replace `YOUR-USERNAME` with your GitHub username.

### Step 3: Navigate to the Project Directory

```bash
cd Museum-of-Failure
```

### Step 4: Open the Project in Visual Studio Code

```bash
code .
```

Alternatively, open Visual Studio Code manually and select the project folder.

### Step 5: Run the Website

Museum of Failure uses standard HTML, CSS, and JavaScript files.

You can open `index.html` directly in your browser or use a local development server.

To use Visual Studio Code Live Server:

1. Open the project folder in Visual Studio Code.
2. Locate `index.html`.
3. Right-click the file.
4. Select **Open with Live Server**.
5. Wait for the browser to open the local website.

### Step 6: Create a New Branch

Before making changes, create a separate branch.

For new features:

```bash
git checkout -b feature/your-feature-name
```

For bug fixes:

```bash
git checkout -b fix/your-bug-name
```

For documentation:

```bash
git checkout -b docs/your-documentation-update
```

Examples:

```bash
git checkout -b feature/improve-exhibit-search
git checkout -b fix/mobile-navigation
git checkout -b docs/update-project-readme
```

Keep your work separate from the main branch.

---

## 4. Ways to Contribute

There are several ways to help improve Museum of Failure.

### A. Website Improvements

Contributions to the website's functionality are welcome.

Examples include:

- Improving exhibit browsing.
- Refining category filters.
- Enhancing sorting behavior.
- Improving search functionality.
- Refining exhibit detail dialogs.
- Improving navigation behavior.
- Enhancing the contribution form.
- Improving browser storage handling.

### B. Visual and Interface Improvements

The museum's visual identity is an important part of the experience.

You may contribute by:

- Improving spacing and alignment.
- Refining typography.
- Enhancing responsive behavior.
- Improving transitions and hover interactions.
- Refining navigation and interactive elements.
- Improving readability.
- Making the website more accessible.

**Important:** Visual improvements should preserve the existing editorial museum aesthetic. Avoid replacing the design with a generic dashboard, excessive card layouts, or unrelated visual styles.

### C. Bug Fixes

You can help identify and resolve issues such as:

- Broken navigation.
- Incorrect filtering or sorting.
- Search results not displaying correctly.
- Exhibit dialogs not opening or closing properly.
- Submission form errors.
- Local storage issues.
- Layout problems on smaller screens.
- Unexpected JavaScript behavior.

### D. Documentation

Documentation contributions are equally valuable.

Examples include:

- Correcting inaccurate information.
- Improving installation instructions.
- Updating feature descriptions.
- Adding screenshots.
- Improving README organization.
- Clarifying known limitations.
- Updating contribution instructions.

### E. Museum Content and Exhibit Ideas

You can also suggest ideas for future exhibits and collections.

Examples include:

- Unsuccessful experiments.
- Abandoned products.
- Failed business ideas.
- Discontinued technologies.
- Rejected creative projects.
- Unexpected research outcomes.
- Lessons from personal or community experiences.

When suggesting an exhibit, focus on the story and the lessons behind the outcome rather than simply labeling something as a failure.

---

## 5. Contribution Principles

Every contribution should respect the museum's purpose and identity.

### 1. Preserve the Story

Present information in a way that gives readers enough context to understand what happened.

Avoid reducing a complicated experience to a single negative result.

### 2. Be Accurate and Responsible

Do not invent historical details, statistics, quotations, or claims.

When contributing information about real people, organizations, or events, provide reliable supporting sources whenever possible.

### 3. Focus on Learning

The goal is not to embarrass people or organizations.

Contributions should encourage reflection and explain what can be learned from unsuccessful attempts.

### 4. Respect the Existing Design

Preserve the established visual language of the museum.

Improvements should feel like a natural extension of the current website.

### 5. Keep Changes Focused

Avoid making unrelated modifications in a single contribution.

Smaller, clearly explained changes are easier to review and maintain.

### 6. Maintain Accessibility

Consider visitors using different devices, screen sizes, and input methods.

Make interactive features understandable and usable.

---

## 6. Code and Design Guidelines

Consistency helps maintain the quality of the project.

### HTML Guidelines

- Use semantic HTML elements where appropriate.
- Keep the document structure organized.
- Use meaningful IDs and class names.
- Provide descriptive alternative text for informative images.
- Maintain a logical heading hierarchy.
- Use appropriate labels for form controls.

### CSS Guidelines

- Follow the existing design system.
- Keep selectors organized and understandable.
- Use consistent spacing and typography.
- Preserve responsive behavior.
- Avoid unnecessary overrides.
- Maintain readable color contrast.
- Use transitions and animations thoughtfully.
- Respect reduced-motion preferences.

### JavaScript Guidelines

- Use clear and descriptive variable and function names.
- Keep functions focused on specific responsibilities.
- Avoid unnecessary code duplication.
- Handle invalid input and unexpected behavior.
- Keep DOM interactions organized.
- Avoid unnecessary global variables.
- Remove unused code and debugging statements.
- Preserve existing functionality unless a change is intentional.

### Responsive Design

Any changes to the interface should be checked on different screen sizes.

At minimum, consider:

- Desktop screens.
- Tablet screens.
- Mobile screens.

Ensure that text remains readable, navigation remains usable, and interactive elements do not overlap or become difficult to access.

### Animation and Interaction

Animations should improve the browsing experience rather than distract from the content.

Prefer:

- Smooth transitions.
- Clear hover feedback.
- Predictable dialog behavior.
- Visible keyboard focus.
- Subtle motion.
- Consistent interaction patterns.

Avoid excessive animation, unnecessary visual effects, and interactions that make the website harder to use.

---

## 7. Contributing Exhibit Ideas and Stories

Museum of Failure is built around stories that deserve to be documented.

When proposing a new exhibit, consider including the following information:

### Suggested Exhibit Information

| Field | Description |
|---|---|
| Exhibit Title | A clear and memorable title for the entry. |
| Background | Introduces the project, experiment, or idea. |
| Original Goal | Explains what the attempt was intended to achieve. |
| What Happened | Describes the events and circumstances surrounding the outcome. |
| Result | Explains what ultimately happened. |
| Lessons Learned | Identifies the insights or observations that can be taken from the experience. |
| Category | Identifies the appropriate collection category. |
| Sources | Provides references supporting factual claims, when applicable. |

### Content Guidelines

When preparing an exhibit:

- Use clear and understandable language.
- Provide enough context for readers unfamiliar with the subject.
- Distinguish documented facts from personal interpretation.
- Avoid exaggerating the reasons behind an unsuccessful outcome.
- Include sources for claims about real events.
- Respect the privacy and dignity of individuals.
- Focus on meaningful lessons rather than ridicule.

### Important Note

Submitting an exhibit idea does not automatically mean it will be included in the public collection.

Content should be reviewed for relevance, clarity, accuracy, and suitability before being considered for publication.

---

## 8. Reporting Issues

If you encounter a bug or unexpected behavior, report it through the repository's GitHub Issues section.

A useful issue report should include:

**Title:** A short and descriptive name for the problem.

**Description:** Explain what happened.

**Steps to Reproduce:** Provide the steps needed to encounter the issue.

**Expected Behavior:** Describe what should have happened.

**Actual Behavior:** Explain what happened instead.

**Environment:** Include relevant information such as:

- Operating system.
- Browser.
- Screen size or device.
- Relevant project version or commit.

**Screenshots:** Attach images or recordings when they help explain the issue.

For interface problems, screenshots are especially useful.

For functionality problems, include the relevant interaction or sequence of actions.

---

## 9. Suggesting Improvements

Suggestions are welcome, especially when they improve the museum experience or make the archive more useful.

Before submitting a suggestion:

1. Check whether a similar suggestion already exists.
2. Explain the problem or opportunity.
3. Describe the proposed improvement.
4. Explain how it benefits visitors or maintainers.
5. Include examples or references when useful.

Possible areas for improvement include:

- Exhibit organization.
- Search and filtering.
- Curated exhibition experiences.
- Visitor submissions.
- Accessibility.
- Mobile usability.
- Archive management.
- Content presentation.

For large features, discuss the proposal before beginning implementation.

---

## 10. Submitting Your Changes

After completing your contribution, review and test your changes.

### Step 1: Review Your Changes

```bash
git status
```

### Step 2: Stage Your Files

```bash
git add .
```

Only include files relevant to your contribution.

### Step 3: Commit Your Changes

Use a clear and descriptive commit message.

```bash
git commit -m "Improve exhibit browsing experience"
```

Other examples:

```bash
git commit -m "Fix collection filtering behavior"
git commit -m "Improve mobile navigation"
git commit -m "Refine exhibition detail dialog"
git commit -m "Update museum documentation"
git commit -m "Improve contribution form validation"
```

### Step 4: Push Your Branch

```bash
git push origin feature/your-feature-name
```

Replace the branch name with the one you created.

### Step 5: Open a Pull Request

Visit your fork on GitHub and create a pull request targeting the original Museum of Failure repository.

Provide a clear explanation of your changes and why they should be included.

---

## 11. Pull Request Checklist

Before submitting a pull request, make sure that:

- [ ] The contribution addresses a relevant issue or improvement.
- [ ] The existing museum design and visual identity are preserved.
- [ ] The website remains responsive.
- [ ] Interactive elements work as expected.
- [ ] No existing functionality has been unintentionally broken.
- [ ] Form inputs and user interactions are handled appropriately.
- [ ] New content is accurate and responsibly presented.
- [ ] Relevant documentation has been updated.
- [ ] No unnecessary files or dependencies were added.
- [ ] No private credentials or sensitive information are included.
- [ ] Commit messages are clear and descriptive.

### Recommended Pull Request Description

**Summary**

Briefly explain what you changed.

**Reason for the Change**

Describe the problem or opportunity that motivated the contribution.

**Implementation**

Explain how the changes were made.

**Testing**

Describe how you tested the updated functionality.

**Screenshots**

Include screenshots when the contribution changes the visual appearance or interaction of the website.

Keep pull requests focused and easy to review.

---

## 12. Code of Conduct

Museum of Failure aims to maintain a respectful, welcoming, and collaborative environment.

All contributors are expected to:

- Treat others with respect.
- Provide constructive feedback.
- Respect different perspectives and levels of experience.
- Avoid personal attacks and inappropriate language.
- Keep discussions focused on improving the project.
- Respect the work and contributions of others.
- Be open to feedback and reasonable revisions.

Remember that the museum is built around learning from unsuccessful attempts. The same principle should apply to collaboration: mistakes are opportunities to improve, not reasons to discourage others.

---

## 📄 License

By contributing to Museum of Failure, you agree that your contributions will be made available under the project's **MIT License**.

See the [MIT License](https://github.com/rheillunio2-byte/Museum-of-Failure?tab=MIT-1-ov-file) for the applicable terms and conditions.

---

## 🙏 Thank You for Contributing

Thank you for helping build Museum of Failure.

Every improvement helps preserve the project's purpose, strengthen its archive, and create a better experience for visitors.

Whether you contribute a line of code, a design improvement, a documented story, or a thoughtful suggestion, your work helps make the museum more meaningful.

> **Every failure has a story. Every story has something to teach.**

---

<p align="center">
  <b>Museum of Failure</b>
  <br>
  <i>An archive of what did not work, and what it taught us.</i>
</p>
