// Insights page copy -- short-form thought-leadership pieces reflecting
// Qamira's own point of view (methodology, positioning), not third-party
// or client-specific claims. Expand this list as real articles are written.

export const insightsHero = {
  eyebrow: "Point of view",
  title: "Perspectives on performance, process, and AI-native execution.",
  lede: "Our thinking on why most transformation programs fail before the technology is even chosen -- and what we do differently.",
};

export type Article = {
  slug: string;
  category: string;
  title: string;
  summary: string;
  datePublished: string;
  body: string[];
};

export const articles: Article[] = [
  {
    slug: "dashboard-is-the-last-deliverable",
    category: "Strategy",
    title: "The dashboard is the last deliverable, not the first.",
    summary:
      "Why starting an engagement with “build us a dashboard” almost guarantees you'll measure the wrong thing beautifully -- and what to ask instead.",
    datePublished: "2026-07-30",
    body: [
      "Almost every engagement that starts with \"we need a dashboard\" ends up being about something else entirely. Not because the request was wrong, but because a dashboard answers a question, and most leadership teams asking for one haven't actually agreed on the question yet.",
      "Here's the pattern: three people on the same leadership team each think the dashboard should answer a different thing. The CFO wants a margin view. The head of sales wants pipeline velocity. Operations wants a bottleneck heatmap. All three are legitimate. None of them were discussed before someone opened a ticket for \"a dashboard.\" What gets built is whichever version the loudest voice in the room described first -- and it's usually wrong for at least two of the three people who'll actually use it.",
      "A dashboard is a rendering of a decision that's already been made about what matters and how it's measured. If that decision hasn't been made -- if the business hasn't agreed which handful of numbers actually run the company -- then no amount of chart polish fixes the underlying problem. You get a beautiful answer to a question nobody quite asked.",
      "This is why, in our QBPES™ process, KPI architecture is a downstream deliverable, not the opening move. Before we touch a visualization tool, we go through the actual decision rights: who owns this number, what threshold triggers action, what happens when it's breached. That conversation surfaces disagreements a dashboard would otherwise paper over with a clean-looking chart. Once those are resolved, the dashboard build itself is almost mechanical -- the hard part was never the software.",
      "The tell that you're heading into this trap: if you can't say, in one sentence, what decision a proposed dashboard is meant to drive, you're not ready to build it yet. That's not a reason to stall -- it's exactly the diagnostic conversation worth having first.",
    ],
  },
  {
    slug: "ai-accelerant-not-ai-first",
    category: "AI",
    title: "AI Accelerant, not AI-first: a different reading of \"AI-native.\"",
    summary:
      "Most firms use AI-native to mean technology-first. We mean the opposite: AI is what executes a business decision already made, at a speed no team can match manually.",
    datePublished: "2026-07-30",
    body: [
      "\"AI-native\" gets used two very different ways, and the difference matters more than the branding around it suggests.",
      "The more common usage: AI-native as technology-first -- start with the model, the agent framework, the vendor stack, and go looking for a business problem it can be pointed at. This is how a lot of automation projects end up solving a real technical problem attached to the wrong business priority. The team ships something, it works, and it moves a metric nobody in the leadership room was actually losing sleep over.",
      "Our reading inverts the order. In our execution hierarchy -- Strategy Foundation, Process Structure, People Capability, AI Accelerant -- AI sits last, deliberately. Every recommendation starts with profitability, revenue growth, or cost, never a tool. Process gets redesigned to remove waste and friction before anything is automated. People's skills and capacity get matched to the new process before new tools arrive. Only then does AI get introduced, as the layer that executes the redesigned process at a speed and scale no team could match manually.",
      "This ordering isn't caution for its own sake. Skip a layer and AI ends up accelerating the wrong problem -- automating a broken process just makes the mess move faster. An AI agent bolted onto an undiagnosed workflow doesn't fix the workflow; it just executes the same mistake with more confidence and less friction to slow it down.",
      "So when we say AI-native, we mean the firm is built assuming AI will eventually execute most of what a redesigned process calls for -- not that AI is the first thing on the table. It's the accelerant, not the ignition source. The distinction sounds semantic until you watch what happens to a project that gets the order backwards.",
    ],
  },
  {
    slug: "divergence-is-a-finding",
    category: "Process",
    title: "Divergence is a finding, not a data quality problem.",
    summary:
      "When executives, managers, and frontline staff give three different answers to the same question, that gap is usually the actual diagnosis.",
    datePublished: "2026-07-30",
    body: [
      "Ask a leadership team, their managers, and the people actually doing the work the same simple question -- \"how does this process work?\" -- and you'll usually get three different, internally consistent answers. The instinct is to treat that as noise: someone's out of date, someone misunderstood the question, someone's answer needs to be \"corrected\" to match the org chart's official version.",
      "That instinct is almost always wrong. Divergence between what leadership believes happens, what managers think they've implemented, and what frontline staff actually do day to day isn't a data quality problem to clean up before the real diagnosis starts -- it usually is the diagnosis.",
      "Consider what each version tells you. Leadership's answer describes intent -- what the process was designed to do. The manager's answer describes what got communicated and how it was interpreted locally. The frontline answer describes what actually happens under real constraints: incomplete information, time pressure, a workaround nobody escalated because it quietly worked well enough. The gap between those three tells you exactly where communication, incentives, or system design broke down -- and it tells you more precisely than any single \"official\" answer would have.",
      "This is why our discovery work at Qamira deliberately interviews across all three levels rather than accepting a single authoritative account of how something works. A process map built only from what leadership believes is a map of the org chart's aspirations, not the business. A process map built only from frontline behavior misses why the workaround exists in the first place.",
      "The practical implication: if you're mapping a process and everyone agrees immediately, be suspicious -- either the question was too vague to disagree on, or you haven't reached the people who'd actually surface the divergence. The disagreement is where the useful information lives.",
    ],
  },
  {
    slug: "most-common-finding-in-every-data-audit",
    category: "Data",
    title: "The most common finding in every data audit we run.",
    summary:
      "The same metric, calculated three different ways in three different systems -- and why that single fact usually explains half of an executive team's disagreements.",
    datePublished: "2026-07-30",
    body: [
      "If there's one finding that shows up in nearly every data and technology audit we run, it's this: the same metric exists in three different systems, calculated three different ways, and nobody in the room realized that until we put all three side by side.",
      "\"Revenue\" sounds like it should be unambiguous. In practice, the finance system's revenue figure includes different adjustments than the CRM's forecast-to-actuals view, which itself differs from whatever number the operations dashboard was built against a year ago by someone who's since left the company. Each version was correct for the purpose it was originally built for. None of them were reconciled against each other, because reconciling them was never anyone's explicit job.",
      "This single fact -- not a lack of data, not bad tooling, just unreconciled definitions -- explains an outsized share of the disagreements that show up in executive meetings. Two people can look at genuinely different numbers, both be right by their own system's logic, and spend half a meeting arguing about a discrepancy that was never actually a disagreement about the business -- it was a disagreement about which spreadsheet's math to trust.",
      "The fix isn't a bigger BI tool. It's a single source of truth for the handful of metrics that actually run the business, with one agreed definition, one owner, and one system of record -- everything else references that, rather than recalculating it independently. This is deliberately positioned as the last deliverable of a diagnosis in our process, not the first request taken at face value: building a rationalized analytics foundation before you've agreed which numbers matter and how they're defined just gives you a faster way to disagree.",
      "If your leadership team has ever spent a meeting debating whose number is right instead of what to do about it, that's usually not a data quality problem. It's a definition problem wearing a data quality costume.",
    ],
  },
  {
    slug: "why-we-score-ai-readiness-first",
    category: "Governance",
    title: "Why we score AI readiness before we recommend automation.",
    summary:
      "Why some automation candidates get built immediately, some get flagged for later, and some get an explicit, documented no.",
    datePublished: "2026-07-30",
    body: [
      "Not every repetitive task should be automated, and the fastest way to lose a client's trust is to recommend automating one that shouldn't be. So before any AI-automation recommendation reaches a client, it gets scored against our Cognitive Transformation Matrix -- two axes, automation suitability and business impact -- and the resulting quadrant determines what we're actually allowed to recommend.",
      "Suitability isn't a gut call -- it's assessed against a documented internal rubric, not a single vibe-check question. We don't publish the rubric itself, for the same reason a lender doesn't publish its exact credit-scoring model: the value is in applying it consistently across hundreds of judgment calls, not in the document itself. What matters to a client is that the discipline is real, and that it sometimes says no.",
      "The output is a straightforward map: quick wins get built now, promising-but-not-ready candidates get flagged as roadmap work, low-impact tasks get left alone regardless of how easy they'd be to automate, and anything that depends on judgment a model can't reliably reconstruct gets an explicit, documented do-not-automate recommendation -- never a vague \"maybe later.\"",
      "That last category is the one that matters most, because it's the one a purely technology-first vendor has the least incentive to name. If your business model is billing for automation builds, there's a structural pull toward finding a way to automate everything, including the things that shouldn't be. Naming the things we won't automate, and why, is part of what keeps a recommendation trustworthy rather than just technically impressive.",
      "This is also why a completed current-state assessment and a stated root cause come before any automation recommendation in our process -- an agent never gets proposed as a fix for a process nobody has actually diagnosed yet.",
    ],
  },
  {
    slug: "what-breaks-first-scaling-headcount-before-process",
    category: "Growth",
    title: "What breaks first when a startup scales headcount before process.",
    summary:
      "It's rarely the process itself -- it's decision rights quietly staying with the founder long after the org chart says otherwise.",
    datePublished: "2026-07-30",
    body: [
      "A founder-led company that scales headcount quickly after a funding round almost always hits the same wall, and it's rarely the process documentation everyone assumes is missing. It's decision rights.",
      "Here's the shape of it: the org chart says a department head now owns pricing exceptions, or hiring approvals, or vendor selection. In practice, everyone -- including the department head -- still routes the actual decision through the founder, because that's how it worked when the company was ten people and it never got explicitly renegotiated when the company became sixty. The new manager has the title and the reporting line, but not the decision, and everyone quietly knows it.",
      "This doesn't look like a crisis. It looks like slowness. Decisions queue up waiting for the one person who's now approving things across a dozen departments instead of three. New managers get quietly undermined -- their team learns to route around them for anything that matters, which then reads to leadership as \"this hire isn't stepping up,\" when the real problem is that stepping up was never actually made possible.",
      "The org chart is a hiring plan, not a decision-rights transfer. Redrawing the boxes doesn't move the authority; only an explicit conversation about who decides what, and a founder actually letting a wrong-but-reasonable decision stand without overriding it, does that. This is exactly the gap our Target Operating Model work is built to catch in a growth-stage engagement -- not just documenting who reports to whom, but confirming whether the authority implied by that reporting line has actually been exercised, or just assumed.",
      "The practical test: pick five decisions your org chart says a given manager owns, and ask them honestly whether they've made each of those decisions unilaterally in the last month, or routed it up first \"just to check.\" If it's mostly the second, your structure scaled faster than your decision rights did -- and that's a fixable, specific problem, not a vague culture issue.",
    ],
  },
];
