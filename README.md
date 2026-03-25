## Adding New Content

https://ro-ly.github.io/QA-Knowledge-DB/

1. Create a new folder in `src/data/` for your category
2. Add JSON files with this structure:
```json
{
  "title": "Question title",
  "tags": ["tag1", "tag2"],
  "answer": "Answer with ```code blocks```",
  "category": "Category name",
  "subcategory": "Category name"
}
```

## Deployment

The app is automatically deployed to GitHub Pages using the workflow in `.github/workflows/deploy.yml`. Changes pushed to the `main` branch will trigger a new deployment.

## Notes

- The current implementation uses the all-questions.json flat JSON,
which should be not modified as it's Base package of questions
