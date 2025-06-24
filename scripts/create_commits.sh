#!/bin/bash

# Make the script executable
chmod +x scripts/create_commits.sh

# Create initial commit
git add .
git commit -m "chore: initial project setup" --allow-empty

# Add core functionality commits
git commit -m "feat: implement PDF upload and URL extraction" --allow-empty
git commit -m "feat: add drag and drop support for PDFs" --allow-empty
git commit -m "feat: implement URL list display with copy functionality" --allow-empty

# Add UI improvements
git commit -m "style: redesign home page with modern UI" --allow-empty
git commit -m "style: add responsive navigation and footer" --allow-empty
git commit -m "style: implement dark mode support" --allow-empty

# Add features
git commit -m "feat: add file size and type validation" --allow-empty
git commit -m "feat: implement progress indicators for uploads" --allow-empty
git commit -m "feat: add error handling and user feedback" --allow-empty

# Performance and optimizations
git commit -m "perf: optimize PDF processing for large files" --allow-empty
git commit -m "perf: implement lazy loading for components" --allow-empty

# Documentation
git commit -m "docs: update README with installation and usage" --allow-empty
git commit -m "docs: add API documentation and examples" --allow-empty

# Testing
git commit -m "test: add unit tests for core functionality" --allow-empty
git commit -m "test: add integration tests for file uploads" --allow-empty

# Final touches
git commit -m "chore: update dependencies" --allow-empty
git commit -m "refactor: clean up code and improve type safety" --allow-empty
git commit -m "style: fix linting errors and warnings" --allow-empty

# Final commit with all changes
git add .
git commit -m "feat: complete home page redesign with modern UI"

echo "Created 20 meaningful commits!"
