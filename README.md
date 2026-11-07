# daily-teams

[daily.teams.admin.news](https://daily.teams.admin.news): a readable daily
record of what changed across Microsoft Teams admin documentation.

This repository holds the product: its configuration, its assets, and its
generated site. The generator, the workflows' steps and the test suite live in
[merill/dailynews-engine](https://github.com/merill/dailynews-engine).

## What it tracks

[`merill/teams-docs-mirror`](https://github.com/merill/teams-docs-mirror):
every Teams admin page on Microsoft Learn, rebuilt as Markdown by
[learn-mirror](https://github.com/merill/learn-mirror) four times a day. The
source, `MicrosoftDocs/OfficeDocs-SkypeForBusiness-pr`, is not public, so the
mirror's history is the only change history there is. It begins on 4 November
2026; the first commit is the initial import, and the archive starts the day
after.

The source folder is `Teams/`, but every page publishes at
`microsoftteams/<path>`. The test suite checks that route against every URL the
crawl fetched; none differ except in case, which Learn ignores.

Most articles sit flat in `Teams/`, with subfolders for `rooms/`, `devices/`,
`phones/`, `privacy/`, reports and live events. Products are classified from the
folder where there is one and from the file name otherwise (`aa-cq-*`,
`direct-routing-*`, `meeting-*`, `cqd-*`, `upgrade-*`, ...). Pages about admin
roles, policy assignment, adoption, PowerShell and government clouds stay under
Microsoft Teams.

## v1 has no email

`email: { enabled: false }`. The site is the whole product for now.

## Working on it

```bash
npm run engine:link     # links ../dailynews-engine into node_modules
npm run docs:clone      # clones the mirror into teams-docs/
npm test
TZ=UTC npm run build:site
npm run dev
```

`TZ=UTC` matters: without it every date bucket shifts.

## Deploying

Cloudflare Pages, connected to this repository: production branch `main`, no
build command, output directory `website`. Repository secrets: `OPENAI_API_KEY`
(summaries); optionally `DISCORD_WEBHOOK_URL` and `HEALTHCHECKS_PING_URL`.
