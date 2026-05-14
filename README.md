# Cloud Resume Challenge — Laura Tyler

A personal portfolio and resume site built as part of the [Cloud Resume Challenge (AWS)](https://cloudresumechallenge.dev/docs/the-challenge/aws/).

The goal: showcase professional skills while learning AWS, IaC, and serverless architecture hands-on.

---
## Challenge Progress
* [ ] AWS Certification (In Progress)
* [x] HTML
* [x] CSS
* [x] Static Website
* [x] HTTPS
* [x] DNS
* [x] JavaScript - Here is where I went off path by adding React to the project
* [x] Database
* [ ] API
* [ ] Python
* [ ] Tests
* [x] Infrastructure as Code
* [x] Source Control
* [x] CI/CD Frontend
* [ ] CI/CD Backend
* [ ] Blog Post

---

## Live Site

Deployed to AWS S3 with CloudFront + custom domain. Pushes to `main` trigger automatic deployment via GitHub Actions (OIDC, no hardcoded credentials).

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 19, TypeScript, Vite 6, React Router v7 |
| Styling | Plain CSS with CSS variables |
| Deployment | AWS S3 + GitHub Actions |
| Backend | AWS Lambda (Node.js 18), DynamoDB, API Gateway v2 |
| IaC | Terraform (~> AWS 5.92) |

---

## Local Setup

**Prerequisites:** Node.js 18+, npm

> **Note:** The frontend lives in `app/` — running `npm run dev` from the repo root won't work (the root `index.html` now points to `app/src/main.tsx` but Vite is not configured at the root level anymore).

```bash
# 1. Clone the repo
git clone <your-repo-url>
cd cloud-resume-challenge/app

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```