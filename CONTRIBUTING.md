# Contributing to TunaResQ

First off, thank you for considering contributing to TunaResQ! It's people like you that make TunaResQ such a great tool for connecting those in need with those who can help.

## Getting Started

### Issues

- **Issue Tracker**: We use GitHub issues to track public bugs and feature requests. Report a bug or suggest a feature by [opening a new issue](https://github.com/kipkirui88/tunaresq_fe/issues/new/choose).
  
- **Issue Templates**: Please use the appropriate issue template when creating a new issue:
  - Bug Report
  - Feature Request
  - Documentation Improvement

- **Before Submitting an Issue**:
  - Check if the issue has already been reported.
  - For bugs, provide a clear title and description, steps to reproduce, expected behavior, and actual behavior.
  - For features, clearly describe the proposed functionality and its value.

### Pull Requests

- **Pull Request Template**: When creating a pull request, please use the provided template to ensure all necessary information is included.

- **Before Submitting a Pull Request**:
  - Ensure there's an issue describing the problem you're solving or feature you're adding.
  - Reference the issue in your pull request.

### Forking the Repository

1. Go to the [TunaResQ repository](https://github.com/kipkirui88/tunaresq_fe) on GitHub.
2. Click the "Fork" button in the top-right corner.
3. Select your GitHub account to create the fork under.

### Cloning Your Fork

```bash
git clone https://github.com/kipkirui88/tunaresq_fe.git
cd tunaresq_fe
```

### Creating a Branch

Create a new branch for your changes. Use a descriptive name that reflects the purpose of your changes.

```shellscript
# Ensure you're on the main branch and up-to-date
git checkout main
git pull upstream main

# Create a new branch from upstream’s main branch
git checkout -b branch-name upstream/main
```

Branch naming convention: `type/description`

Examples:

- `feature/add-donation-form`
- `fix/header-responsive-issue`
- `docs/update-readme`


### Making Changes

1. Make your changes to the codebase.
2. Test your changes thoroughly.


### Committing Your Changes

```shellscript
# Add your changes
git add .

# Commit your changes with a descriptive message
git commit -m "type: descriptive message"
```

Commit message convention: `type: description`

Examples:

- `feat: add donation form component`
- `fix: resolve header responsive issue`
- `docs: update README with new setup instructions`

### Pushing Your Changes

```shellscript
git push origin branch-name
```

### Creating a Pull Request

1. Go to your fork on GitHub.
2. Click the "Compare & pull request" button next to your branch.
3. Fill out the pull request template with all necessary information.
4. Click "Create pull request".


## Pull Request Process

1. **Initial Check**: Automated checks will run on your PR to ensure it meets basic requirements.
2. **Code Review**: At least one maintainer will review your code and provide feedback.
3. **Addressing Feedback**: Make any requested changes and push them to your branch.
4. **Approval**: Once approved, a maintainer will merge your PR.


### PR Review Process

1. **Reviewers**: Each PR requires at least one review from a maintainer.
2. **Review Criteria**:
    1. Code quality and adherence to guidelines
    2. Readability and Documentation
    3. Functionality
3. **Review Timeframe**: Maintainers aim to review PRs within 3 business days.


### After Your PR is Merged

1. Update your local repository:


```shellscript
git checkout main
git pull upstream main
```

2. Delete your branch:


```shellscript
git branch -d branch-name
```

3. Update your fork:


```shellscript
git push origin main
git push --delete origin branch-name
```

### Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```plaintext
type(scope): description

[optional body]

[optional footer(s)]
```

Types:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation changes
- `style`: Changes that do not affect the meaning of the code (formatting, etc.)
- `refactor`: Code changes that neither fix a bug nor add a feature
- `perf`: Performance improvements
- `test`: Adding or correcting tests
- `chore`: Changes to the build process or auxiliary tools


### Branch Naming

Format: `type/description`

Types:

- `feature`: New functionality
- `fix`: Bug fixes
- `docs`: Documentation changes
- `refactor`: Code refactoring
- `test`: Test-related changes
- `chore`: Maintenance tasks


## Documentation

- Update documentation to reflect your changes.
- Document new features, APIs, and important changes.
- Use clear, concise language and provide examples where appropriate.


### Getting Help

If you need help with your contribution:

1. Check the documentation
2. Search existing issues and discussions
3. Ask in the WhatsApp channel
4. Create a "question" issue if none of the above helps

---

Thank you for contributing to TunaResQ! Your efforts help us build a platform that makes a real difference in people's lives.
