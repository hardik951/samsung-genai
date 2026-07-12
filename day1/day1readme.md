# Day 1 — Introduction to GenAI
**Samsung GenAI Program · SRM Kattankulathur · 13 July 2026**

---

## One-Time Setup — Do This First (Day 1 Only)

> You only fork and clone once. From Day 2 onwards, skip this section.

### Step 1 — Fork the trainer's repo
1. Go to the repo URL on the projector
2. Click **Fork** → **Create fork**
3. You now have your own copy at `https://github.com/YOUR-USERNAME/samsung-genai`

### Step 2 — Clone to your laptop
Open **Git Bash** (Windows Start → type Git Bash → Enter):
```bash
git clone https://github.com/YOUR-USERNAME/samsung-genai.git
cd samsung-genai
```

### Step 3 — Verify your AI accounts
Make sure you can log in to all three before starting Lab 1:
- ChatGPT → [chat.openai.com](https://chat.openai.com) — use **GPT-4o**
- Claude → [claude.ai](https://claude.ai) — use **Claude Sonnet**
- Gemini → [gemini.google.com](https://gemini.google.com) — use **Gemini 1.5 Pro**

---

## Today's Labs

| Lab | Type | Scored |
|---|---|---|
| Lab 1 — Tool Setup & Pipeline Test | Individual | No |
| Lab 2 — Next Word Prediction | Team (4 students) | Contributes to Diamond |
| Lab 3 — Model Face-Off | Individual | Yes — Silver / Gold / Diamond |

---

## Lab 1 — Tool Setup & Pipeline Test
**Not scored · ~30 minutes**

**What you do:**
- Verify all 3 AI accounts are working
- Fork and clone the repo (Steps 1–2 above)
- Edit `submissions/checkin.json` — change `student_name` and `github` fields only
- Push it → your name appears as a green tick on the live dashboard

**You are done when:** Your name shows green on the dashboard on the projector.

**Lab URL:** Trainer will share on projector

---

## Lab 2 — Next Word Prediction
**Team activity · ~45 minutes + 20 min Gradio Showdown**

**What you do:**
- Trainer announces 10 teams (4 students each) — find your team
- Team Lead opens the notebook in Google Colab (link on projector)
- Choose ONE model: `SmolLM2-360M-Instruct` / `distilgpt2` / `Qwen2.5-0.5B`
- Complete all 8 Missions in the notebook
- Run `demo.launch(share=True)` → copy your `gradio.live` URL
- Present your demo to the class (2 min per team — Gradio Showdown)

**Note your Gradio URL** — you will need it when filling day1.json after Lab 3.

**What earns Diamond:** Your `lab2_gradio_url` must be in day1.json AND you caught the hallucination in Lab 3.

**Lab URL:** Trainer will share Colab link on projector

---

## Lab 3 — Model Face-Off
**Individual · ~60 minutes**

**What you do:**
- Open Lab 3 from the URL on the projector
- Run 3 prompts (P1, P2, P3) in ChatGPT, Claude, and Gemini — same prompt, all three models
- **P3 has a trap** — one or more models may hallucinate. Find it, verify it, note which model and what it said wrongly.
- Fill in your observations per prompt
- Complete the submission (see below)

**What earns each badge:**

| Badge | Condition checked in day1.json |
|---|---|
| 🥈 Silver | `student_name` filled + `p1_winner` filled |
| 🥇 Gold | `hallucination_found: true` |
| 💎 Diamond | Gold + `lab2_gradio_url` contains `gradio.live` |

> The dashboard calculates your badge automatically. You do not choose it yourself.

**Lab URL:** Trainer will share on projector

---

## Submitting Day 1

> One JSON file covers both Lab 2 and Lab 3. One push at the end of the day.

### Step 1 — Copy the JSON template
In Lab 3, click **Copy JSON Template** at the bottom of the page.

### Step 2 — Open Notepad and paste
Press **Windows key** → type **Notepad** → Enter → paste (Ctrl+V)

### Step 3 — Fill in your answers

```json
{
  "day": 1,
  "student_name": "Your Full Name",
  "github": "your-github-username",

  "lab2_team": "Team Alpha",
  "lab2_model_used": "SmolLM2-360M-Instruct",
  "lab2_gradio_url": "https://xxxx.gradio.live",

  "lab": "model_face_off",
  "p1_winner": "chatgpt",
  "p1_observation": "What stood out comparing models on Prompt 1",
  "p2_winner": "claude",
  "p2_observation": "What stood out comparing models on Prompt 2",
  "p3_winner": "gemini",
  "p3_observation": "What stood out comparing models on Prompt 3",
  "hallucination_found": false,
  "hallucination_detail": "Model | What it stated | What is actually correct",
  "overall_winner": "chatgpt",
  "biggest_surprise": "One sentence on what surprised you most",
  "stretch_done": false,
  "stretch_prompt": "",
  "stretch_observation": "",
  "submitted_at": ""
}
```

> **If you caught a hallucination:** set `"hallucination_found": true` and fill `hallucination_detail`.

### Step 4 — Save as day1.json
**File → Save As**
- Navigate to: `samsung-genai` → `submissions` folder
- File name: `day1.json`
- Save as type: **All Files** ← critical, do not skip this
- Click Save

> ⚠️ If you leave "Save as type" as Text Documents, the file saves as `day1.json.txt` and will NOT work.

### Step 5 — Push to GitHub
In File Explorer, open the `samsung-genai` folder → right-click empty space → **Git Bash Here**

```bash
git add submissions/day1.json
git commit -m "Day 1 submission - YOUR NAME"
git push origin main
```

Replace `YOUR NAME` with your actual name in the commit message.

### Step 6 — Confirm on dashboard
Your badge (Silver / Gold / Diamond) appears on the live dashboard within 30 seconds.

---

## Quick Reference

| Item | Details |
|---|---|
| Submission file | `submissions/day1.json` |
| JSON template | Copy JSON Template button in Lab 3 |
| Git push | `git push origin main` |
| Dashboard | URL on projector |
| Gold requires | `"hallucination_found": true` in day1.json |
| Diamond requires | Gold + `"lab2_gradio_url"` filled with your gradio.live URL |

---

## How Every Day Works (Days 2–5)

The structure is the same every day:

1. Open that day's lab from the URL on the projector
2. Complete the labs
3. Copy JSON template from the last lab → fill answers → save as `submissions/day2.json` (day3, day4, day5)
4. Push once at end of day

```bash
git add submissions/dayN.json
git commit -m "Day N submission - YOUR NAME"
git push origin main
```

> You do **not** need to fork again. You do **not** need to pull the trainer's repo. Just push your submissions file each day.
