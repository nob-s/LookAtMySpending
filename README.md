# LookAtMySpending
*Import, sort, and understand your spending.*

Runs entirely locally. Save and transfer progress via a JSON file across devices.
Built for manual labellers. This app won't auto-categorise your transactions — but if you prefer to label things yourself, it makes that much faster.

## Workflow

1. **Upload CSVs** — import bank statements from one or more accounts (Convert your statement PDF to CSV [here](https://statementsensei.streamlit.app/))
2. **Edit data** — fix or adjust entries directly
3. **Add aliases** — replace long or cryptic bank descriptions with readable names
4. **Group into categories** — organise transactions under your own custom labels
5. **Filter and review** — view by category and date range, or surface uncategorised transactions

## Features

- **Alias bulk-assign** — grouping one transaction by alias automatically applies that category to all transactions sharing the same alias
  - *Example: assign one "public transport" transaction to Transport, and all others with that alias are grouped too*
- **Batch delete** — remove transactions in bulk by month from the History tab
- **Category filters** — isolate transactions by category or find uncategorised ones
- **JSON portability** — download your save file and upload it on any device; no account needed

## Roadmap

- [ ] Add and delete rows for rare CSV discrepancies

*Taking suggestions!*
