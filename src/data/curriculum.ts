import type { CurriculumPart, Difficulty, Exercise, Lesson, MiniProject } from "../types/curriculum";

type PartSeed = {
  partNumber: number;
  title: string;
  description: string;
  difficulty: Difficulty;
  estimatedTime: string;
  outcomes: string[];
  skills: string[];
  whatYouWillBuild: string[];
  realBusinessUseCase: string;
  commonBeginnerTrap: string;
  focus: string;
  practicalExample: string;
  code?: string;
};

type DeepDiveGuide = {
  plainEnglish: string;
  whyItMatters: string;
  keyIdeas: string[];
  implementationSteps: string[];
  workflowExample: string;
  practicePlan: string;
  mistakes: string[];
  debugging: string[];
  portfolio: string;
  code?: string;
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const section = (
  heading: string,
  content: string,
  extras: Partial<Lesson["sections"][number]> = {},
): Lesson["sections"][number] => ({
  heading,
  content,
  ...extras,
});

function createExercise(partId: string, title: string, description: string): Exercise {
  return {
    id: `${partId}-exercise`,
    title,
    description,
    difficulty: "Medium",
  };
}

function createMiniProject(partId: string, title: string, description: string, deliverables: string[]): MiniProject {
  return {
    id: `${partId}-mini-project`,
    title,
    description,
    deliverables,
  };
}

function getDeepDiveGuide(seed: PartSeed): DeepDiveGuide {
  return (
    deepDiveGuides[seed.partNumber] ?? {
      plainEnglish: `${seed.focus} means learning how this part of an automation system works in real business life. Keep the language simple: what comes in, what decision happens, what goes out, who sees it, and what happens if something fails.`,
      whyItMatters: seed.realBusinessUseCase,
      keyIdeas: seed.skills.map((skill) => `${skill}: understand what it does, where it fits in a workflow, and how it can fail.`),
      implementationSteps: [
        "Write the business problem in one sentence.",
        "Draw the workflow from trigger to final result.",
        "List the data the workflow needs.",
        "Choose which steps should be code, no-code tools, AI, or human approval.",
        "Add logs, retries, and a simple dashboard view.",
      ],
      workflowExample:
        "Trigger -> validate data -> make a decision -> update the right system -> notify a human -> store a log -> show status in a dashboard.",
      practicePlan: `Build ${seed.whatYouWillBuild[0].toLowerCase()} as a small project. Keep it simple, but include the happy path, one failure path, and a README that explains the business value.`,
      mistakes: [
        "Trying to build everything at once.",
        "Skipping validation because the demo data looks clean.",
        "Forgetting that a real business needs logs and recovery steps.",
      ],
      debugging: [
        "Check the raw input first.",
        "Check the normalized data next.",
        "Check the external API response before blaming the AI step.",
      ],
      portfolio: `Document this part by showing the before workflow, the automated workflow, screenshots, important code, failure handling, and the business result.`,
      code: seed.code,
    }
  );
}

function createStandardLessons(seed: PartSeed): Lesson[] {
  const partId = `part-${seed.partNumber}`;
  const baseSlug = slugify(seed.title);
  const guide = getDeepDiveGuide(seed);

  return [
    {
      id: `${partId}-${baseSlug}-concepts`,
      title: `${seed.title}: Concepts and Business Value`,
      summary: `Learn the core ideas behind ${seed.focus.toLowerCase()} and why clients care about this capability.`,
      exerciseId: `${partId}-exercise`,
      miniProjectId: `${partId}-mini-project`,
      sections: [
        section(
          "Simple explanation",
          guide.plainEnglish,
          {
            analogy:
              "Think of a business as a busy operations room. Good automation is the set of labels, handoffs, checklists, and alert systems that helps the room move faster without losing accountability.",
            businessUseCase: seed.realBusinessUseCase,
          },
        ),
        section(
          "Why it matters in business automation",
          guide.whyItMatters,
          {
            workflowExample: guide.workflowExample,
          },
        ),
        section(
          "Key ideas you must understand",
          guide.keyIdeas.map((idea, index) => `${index + 1}. ${idea}`).join("\n\n"),
          {
            mentalModel:
              "Do not memorize tool names. Understand the job each piece does in the workflow.",
          },
        ),
        section(
          "Short summary",
          `${seed.title} is career-relevant because it helps you build systems a real team can trust. You should leave this part able to explain the topic in plain English, draw the workflow, build a small version, debug it, and describe the business value.`,
        ),
      ],
    },
    {
      id: `${partId}-${baseSlug}-implementation`,
      title: `${seed.title}: Implementation Workflow`,
      summary: `Turn ${seed.focus.toLowerCase()} into a practical workflow with inputs, business rules, AI steps, integrations, and logs.`,
      exerciseId: `${partId}-exercise`,
      miniProjectId: `${partId}-mini-project`,
      sections: [
        section(
          "Practical example",
          seed.practicalExample,
          {
            businessUseCase: seed.realBusinessUseCase,
            workflowExample: guide.workflowExample,
            code:
              guide.code ??
              seed.code ??
              `type AutomationStep = {
  name: string;
  input: string;
  output: string;
  failureMode: string;
};

const workflow: AutomationStep[] = [
  {
    name: "validate-input",
    input: "raw business event",
    output: "trusted payload",
    failureMode: "missing required field",
  },
  {
    name: "run-decision",
    input: "trusted payload",
    output: "recommended action",
    failureMode: "invalid AI or rules output",
  },
];`,
          },
        ),
        section(
          "How to design the workflow before coding",
          guide.implementationSteps.map((step, index) => `${index + 1}. ${step}`).join("\n\n"),
          {
            beginnerMistakes: guide.mistakes,
          },
        ),
        section(
          "How to test your implementation",
          "Create at least five test cases: a normal success case, missing data, duplicate event, external API failure, and an AI output that violates the expected schema. A career-ready engineer proves that the workflow survives bad inputs and service failures, not just a polished demo.",
          {
            debuggingTips: guide.debugging,
          },
        ),
        section(
          "Try this now",
          guide.practicePlan,
        ),
      ],
    },
    {
      id: `${partId}-${baseSlug}-production-career`,
      title: `${seed.title}: Production, Safety, and Portfolio Readiness`,
      summary: `Learn how to make ${seed.focus.toLowerCase()} reliable enough for real teams and explain it as career-building work.`,
      exerciseId: `${partId}-exercise`,
      miniProjectId: `${partId}-mini-project`,
      sections: [
        section(
          "Production mindset",
          `A production automation is a system people rely on when they are busy. For ${seed.focus.toLowerCase()}, production readiness means clear ownership, repeatable deployment, failure visibility, safe retries, and a way to explain what happened after the fact. If the business cannot trust the system, the automation becomes another source of chaos.`,
          {
            businessUseCase:
              "A sales, support, operations, or admin team should be able to see whether the automation succeeded, what it changed, and what needs human review.",
          },
        ),
        section(
          "Common beginner trap",
          seed.commonBeginnerTrap,
          {
            beginnerMistakes: [
              "Building a demo that cannot be replayed with realistic data.",
              "Treating logs as optional instead of part of the user experience for operators.",
              "Using AI output as truth instead of a recommendation that must pass validation.",
            ],
            debuggingTips: [
              "When debugging, ask which stage failed: trigger, validation, AI, external API, database, notification, or UI.",
              "Keep one example payload that should succeed and one that should fail safely.",
              "Write down what a non-technical operator should do when the workflow fails.",
            ],
          },
        ),
        section(
          "Portfolio framing",
          guide.portfolio,
          {
            mentalModel:
              "A portfolio project is not just code. It is proof that you can understand a business process, design a system, ship it, test it, and explain the value.",
          },
        ),
        section(
          "Mini-project guidance",
          `Build ${seed.whatYouWillBuild.join(", ")} as a small but complete proof of skill. Keep the first version simple, but include the professional pieces: clear data shape, success path, failure path, logs, and a README section explaining the business value.`,
        ),
      ],
    },
  ];
}

function createPart(seed: PartSeed, lessons?: Lesson[], exercises?: Exercise[], miniProjects?: MiniProject[]): CurriculumPart {
  const partId = `part-${seed.partNumber}`;
  return {
    id: partId,
    partNumber: seed.partNumber,
    title: seed.title,
    description: seed.description,
    difficulty: seed.difficulty,
    estimatedTime: seed.estimatedTime,
    outcomes: seed.outcomes,
    skills: seed.skills,
    whatYouWillBuild: seed.whatYouWillBuild,
    realBusinessUseCase: seed.realBusinessUseCase,
    commonBeginnerTrap: seed.commonBeginnerTrap,
    lessons: lessons ?? createStandardLessons(seed),
    exercises:
      exercises ??
      [
        createExercise(
          partId,
          `Map a ${seed.title.toLowerCase()} workflow`,
          `Write a trigger-to-result workflow for ${seed.realBusinessUseCase.toLowerCase()} and mark where validation, AI, human review, logging, and retries belong.`,
        ),
      ],
    miniProjects:
      miniProjects ??
      [
        createMiniProject(partId, `Build a ${seed.title.toLowerCase()} prototype`, seed.practicalExample, [
          "Workflow diagram",
          "Input and output schema",
          "Failure-handling notes",
          "Short client-facing explanation",
        ]),
      ],
  };
}

const part1Id = "part-1";
const part2Id = "part-2";
const part3Id = "part-3";

const partOneLessons: Lesson[] = [
  {
    id: "part-1-ai-automation-engineer-role",
    title: "What an AI Automation Engineer Actually Builds",
    summary: "Understand the role, what businesses pay for, and how automation consulting differs from just writing code.",
    exerciseId: `${part1Id}-exercise`,
    miniProjectId: `${part1Id}-mini-project`,
    sections: [
      section(
        "Simple explanation",
        "An AI Automation Engineer designs business systems that use software, AI models, workflow tools, databases, and integrations to reduce manual work. The job is not only building chatbots. It is turning repeated business processes into traceable workflows that can run reliably with the right human oversight.",
        {
          analogy:
            "Imagine a restaurant with a host, waiter, chef, cashier, and manager. Automation connects those jobs: taking the order, checking the menu, sending it to the kitchen, updating the bill, and alerting a person when something is unusual.",
          businessUseCase:
            "A real estate company gets Facebook leads and wants instant qualification, CRM updates, rep assignment, and Slack alerts before the lead goes cold.",
        },
      ),
      section(
        "Role differences",
        "An AI engineer focuses on models and AI behavior. A backend engineer focuses on APIs, data, services, and reliability. An automation engineer connects tools and workflows. An AI Automation Engineer combines the practical parts of all three to solve business workflows end-to-end.",
        {
          workflowExample:
            "Lead form -> webhook -> backend validation -> AI qualification -> CRM contact -> Slack alert -> sales task -> audit log.",
          beginnerMistakes: [
            "Thinking every project needs a complex AI agent.",
            "Ignoring the business process and jumping straight to tools.",
            "Building a chatbot when the business really needs a workflow with clear handoffs.",
          ],
          mentalModel:
            "You are a process architect first, then a developer. Code and AI are tools for producing a measurable business result.",
        },
      ),
      section(
        "What businesses pay for",
        "Businesses pay for faster response times, fewer missed leads, cleaner CRM data, reduced admin work, better reporting, and reliable follow-up. They care less about the tool name and more about whether the system saves time, increases revenue, reduces chaos, or improves customer experience.",
        {
          businessUseCase:
            "A clinic wants patients to request appointments, answer qualification questions, get a confirmed slot, receive reminders, and have staff notified only when human judgment is required.",
          debuggingTips: [
            "When a client says automation is broken, ask which business outcome failed first.",
            "Trace the workflow from trigger to final record before editing prompts or code.",
          ],
        },
      ),
      section(
        "Summary",
        "The AI Automation Engineer role sits between business operations, backend systems, AI integrations, and workflow tools. Your value grows when you can choose simple workflows where they are enough and use agents only when flexible decision-making is truly needed.",
      ),
    ],
  },
  {
    id: "part-1-workflows-vs-agents",
    title: "Workflow Automation vs Chatbots, Assistants, and Agents",
    summary: "Learn when to use deterministic workflows and when agentic behavior is worth the added risk.",
    exerciseId: `${part1Id}-exercise`,
    miniProjectId: `${part1Id}-mini-project`,
    sections: [
      section(
        "Simple explanation",
        "A workflow follows known steps. A chatbot has a conversation. An assistant helps users complete tasks. An AI agent can choose tools and decide next actions within boundaries. Most business automation should start as a workflow because workflows are easier to test, debug, and explain.",
        {
          analogy:
            "A workflow is a checklist. A chatbot is a receptionist conversation. An assistant is a trained teammate with a job description. An agent is a teammate that can choose which approved tools to use.",
          businessUseCase:
            "Lead routing should usually be a workflow: score lead, match rules, assign owner, notify rep. A sales research assistant may need agent behavior because it searches, summarizes, and decides what information is relevant.",
        },
      ),
      section(
        "Practical example",
        "For a school onboarding system, use a workflow to send welcome emails, create student records, assign forms, and remind staff. Add an assistant only where students ask variable questions. Add an agent only when it needs controlled tool access, such as checking enrollment state or creating support tickets.",
        {
          workflowExample:
            "Enrollment form -> validate student data -> create student record -> send welcome email -> schedule orientation -> notify admin -> log onboarding status.",
          beginnerMistakes: [
            "Using an agent where a rules-based workflow is more reliable.",
            "Letting a chatbot promise actions it cannot actually perform.",
            "Skipping approval for actions that affect money, scheduling, or customer records.",
          ],
        },
      ),
      section(
        "Mental model",
        "Use workflows for predictable process, assistants for guided interaction, and agents for bounded tool choice. The more freedom the AI has, the more validation, logging, and human review you need.",
      ),
    ],
  },
  {
    id: "part-1-consultant-thinking",
    title: "Think Like an Automation Consultant",
    summary: "Turn vague business pain into a scoped, buildable automation system.",
    exerciseId: `${part1Id}-exercise`,
    miniProjectId: `${part1Id}-mini-project`,
    sections: [
      section(
        "Simple explanation",
        "Consultant thinking means asking what currently happens, where time is lost, what can go wrong, who approves decisions, and how success will be measured. You are mapping the business before choosing tools.",
        {
          businessUseCase:
            "A small business wants CRM reminders. The deeper problem may be missed follow-ups, unclear ownership, no source tracking, and no escalation when reps do not respond.",
          workflowExample:
            "Discovery call -> process map -> pain ranking -> system design -> prototype -> test with real cases -> deploy with monitoring.",
        },
      ),
      section(
        "Questions to ask",
        "Ask what triggers the process, what data is required, who owns the result, what tools already exist, what failure looks like, and what should require human approval.",
        {
          beginnerMistakes: [
            "Accepting tool requests without diagnosing the process.",
            "Automating a broken workflow without cleaning the data model.",
            "Forgetting to define a measurable before-and-after outcome.",
          ],
          mentalModel:
            "Every automation is a promise: when this happens, the system will do that, unless these exceptions require a human.",
        },
      ),
    ],
  },
];

const partTwoLessons: Lesson[] = [
  {
    id: "part-2-python-for-automation",
    title: "Python Foundations for Automation",
    summary: "Use Python functions, files, environment variables, APIs, error handling, logging, and retries in practical automation scripts.",
    exerciseId: `${part2Id}-exercise`,
    miniProjectId: `${part2Id}-mini-project`,
    sections: [
      section(
        "Simple explanation",
        "Python is excellent for backend automation because it is readable, has strong API libraries, and works well for scripts, webhooks, data cleanup, background jobs, and AI integrations.",
        {
          analogy:
            "Python is like a workshop bench: you can quickly build a small tool, test it, and later attach it to a larger production line.",
          businessUseCase:
            "Read leads from a CSV, normalize phone numbers, call an AI API to classify intent, and send clean records to a CRM.",
        },
      ),
      section(
        "Practical API script",
        "A good automation script loads secrets from environment variables, validates input, calls external APIs, retries failures carefully, and logs enough information to debug issues later.",
        {
          code: `import os
import time
import requests

CRM_URL = "https://api.example-crm.com/contacts"
API_KEY = os.environ["CRM_API_KEY"]

def create_contact(lead: dict) -> dict:
    payload = {
        "name": lead["name"].strip(),
        "email": lead["email"].lower(),
        "source": lead.get("source", "website"),
    }
    for attempt in range(3):
        response = requests.post(
            CRM_URL,
            json=payload,
            headers={"Authorization": f"Bearer {API_KEY}"},
            timeout=10,
        )
        if response.status_code < 500:
            response.raise_for_status()
            return response.json()
        time.sleep(2 ** attempt)
    raise RuntimeError("CRM contact creation failed after retries")`,
          beginnerMistakes: [
            "Hardcoding API keys in source code.",
            "Retrying every error, including validation errors that will never succeed.",
            "Printing sensitive customer data into logs.",
          ],
          debuggingTips: [
            "Log request IDs and external status codes.",
            "Separate data validation errors from network or server errors.",
            "Test with a fake CRM endpoint before touching real customer data.",
          ],
        },
      ),
      section(
        "Mental model",
        "Python automation is glue plus guardrails: it moves data between systems, but it must also protect the business from malformed data, downtime, and repeated failures.",
      ),
    ],
  },
  {
    id: "part-2-javascript-for-automation",
    title: "JavaScript and Frontend Automation Interfaces",
    summary: "Use JavaScript, fetch, async/await, JSON, forms, and dashboard concepts to trigger and monitor automations.",
    exerciseId: `${part2Id}-exercise`,
    miniProjectId: `${part2Id}-mini-project`,
    sections: [
      section(
        "Simple explanation",
        "JavaScript powers the frontend side of automation systems: forms that submit leads, buttons that trigger workflows, dashboards that show CRM data, and interfaces where humans approve AI actions.",
        {
          businessUseCase:
            "A sales manager opens a dashboard, reviews an AI-generated email draft, clicks approve, and the backend sends the message while logging the approval.",
        },
      ),
      section(
        "Practical fetch example",
        "Use async/await to send structured JSON to a backend. The frontend should show loading, success, and failure states rather than silently failing.",
        {
          code: `async function submitLead(formData) {
  const response = await fetch("/api/leads", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error(\`Lead submission failed: \${response.status}\`);
  }

  return response.json();
}`,
          beginnerMistakes: [
            "Assuming every API response is successful.",
            "Sending unvalidated form data directly into automation workflows.",
            "Hiding errors from users and support teams.",
          ],
          debuggingTips: [
            "Use browser dev tools Network tab to inspect request body and status code.",
            "Check CORS, content type, and backend validation messages.",
          ],
        },
      ),
    ],
  },
  {
    id: "part-2-backend-service-basics",
    title: "Small Backend Services and Background Jobs",
    summary: "Understand webhook receivers, queues, logging, and batch processing for reliable automation.",
    exerciseId: `${part2Id}-exercise`,
    miniProjectId: `${part2Id}-mini-project`,
    sections: [
      section(
        "Simple explanation",
        "A backend service receives requests, validates data, calls internal services, stores records, and starts background work. Long-running automations should often move to a worker so the user or webhook sender gets a fast response.",
        {
          workflowExample:
            "Webhook receiver -> validate signature -> save event -> enqueue job -> return 200 -> worker processes CRM and Slack actions.",
          mentalModel:
            "Web requests should acknowledge quickly; workers should do slow, retryable work.",
        },
      ),
    ],
  },
];

const partThreeLessons: Lesson[] = [
  {
    id: "part-3-api-http-json-basics",
    title: "APIs, HTTP Methods, and JSON",
    summary: "Learn how systems communicate through URLs, methods, headers, bodies, parameters, status codes, and JSON payloads.",
    exerciseId: `${part3Id}-exercise`,
    miniProjectId: `${part3Id}-mini-project`,
    sections: [
      section(
        "Simple explanation",
        "An API is a contract that lets one system ask another system to do something or return data. HTTP is the delivery method. JSON is the structured format most automation systems use to send and receive information.",
        {
          analogy:
            "An API is a restaurant waiter, HTTP methods are the type of request, and JSON is the order form with clear fields.",
          businessUseCase:
            "A website form sends a POST request to your backend. Your backend sends another POST request to a CRM and a Slack message to the sales channel.",
        },
      ),
      section(
        "Methods and status codes",
        "GET reads data, POST creates or triggers something, PUT replaces, PATCH updates part of a record, and DELETE removes. Status codes tell you whether the request succeeded, failed validation, lacked permission, hit a rate limit, or crashed server-side.",
        {
          beginnerMistakes: [
            "Using POST for everything without understanding API documentation.",
            "Ignoring 429 rate limits and accidentally hammering an API.",
            "Treating all non-200 responses as the same kind of failure.",
          ],
          debuggingTips: [
            "Record method, URL, headers, body, and response status.",
            "Check whether the API expects query parameters, path parameters, or JSON body fields.",
          ],
        },
      ),
    ],
  },
  {
    id: "part-3-webhooks-and-retries",
    title: "Webhooks, Retries, and Duplicate Events",
    summary: "Understand webhooks as event notifications and learn how to secure, replay, and deduplicate them.",
    exerciseId: `${part3Id}-exercise`,
    miniProjectId: `${part3Id}-mini-project`,
    sections: [
      section(
        "Simple explanation",
        "A webhook is a system knocking on your door when something happened. Instead of your app constantly asking for updates, the source system sends an event to your URL.",
        {
          analogy:
            "An API call is asking the office clerk for information. A webhook is a doorbell that rings when a package arrives.",
          workflowExample:
            "Form submitted -> form tool sends webhook -> backend verifies signature -> stores event ID -> processes lead -> returns success.",
        },
      ),
      section(
        "Secure webhook receiver",
        "Webhook handlers should verify signatures when available, reject malformed payloads, store event IDs, and process duplicate deliveries safely.",
        {
          code: `const seenEvents = new Set();

function handleWebhook(event) {
  if (seenEvents.has(event.id)) {
    return { status: "duplicate_ignored" };
  }

  seenEvents.add(event.id);
  // Save event, enqueue work, and return quickly.
  return { status: "accepted" };
}`,
          beginnerMistakes: [
            "Creating duplicate CRM contacts when the same webhook is retried.",
            "Doing slow AI calls before returning a webhook response.",
            "Accepting unsigned webhooks for sensitive workflows.",
          ],
          debuggingTips: [
            "Use Webhook.site or a RequestBin-style tool to inspect real payloads.",
            "Test duplicate delivery intentionally.",
            "Store raw payloads for debugging when privacy rules allow it.",
          ],
        },
      ),
    ],
  },
  {
    id: "part-3-reading-api-docs",
    title: "Reading API Documentation Like an Integrator",
    summary: "Learn how to turn docs into working integrations with authentication, pagination, rate limits, and field mapping.",
    exerciseId: `${part3Id}-exercise`,
    miniProjectId: `${part3Id}-mini-project`,
    sections: [
      section(
        "Simple explanation",
        "API documentation tells you the base URL, endpoints, authentication, required fields, error shapes, pagination model, and rate limits. Read docs with a workflow in mind, not as a random reference.",
        {
          businessUseCase:
            "To sync CRM contacts, you need to know how to search for existing contacts, create missing contacts, update fields, handle duplicates, and page through results.",
          mentalModel:
            "API docs become useful when you translate them into a sequence: authenticate, read, decide, write, verify, log.",
        },
      ),
    ],
  },
];

const project26Projects: MiniProject[] = [
  {
    id: "project-ai-lead-qualification-system",
    title: "AI Lead Qualification System",
    businessProblem: "Sales teams lose leads because qualification and follow-up happen too slowly.",
    description:
      "Receive leads from a form, score them with AI, save them to a database, alert Slack for hot leads, and create or update a CRM contact.",
    requiredSkills: ["Webhooks", "AI scoring", "Database design", "CRM API", "Slack integration"],
    deliverables: ["Business requirements", "Database schema", "Webhook API", "AI scoring prompt", "Slack alert", "Testing plan"],
  },
  {
    id: "project-ai-appointment-setter",
    title: "AI Appointment Setter",
    businessProblem: "Leads want booking help outside office hours and staff lose time qualifying poor-fit calls.",
    description:
      "Build a chatbot-style booking flow that qualifies leads, checks availability, books appointments, sends confirmations, updates CRM, and notifies sales.",
    requiredSkills: ["Conversation state", "Calendar APIs", "Timezones", "CRM updates", "Human handoff"],
    deliverables: ["Booking workflow", "Availability rules", "Confirmation flow", "CRM update design", "Safety checklist"],
  },
  {
    id: "project-crm-automation-system",
    title: "CRM Automation System",
    businessProblem: "CRM data becomes stale when reps forget tasks, notes, and pipeline updates.",
    description:
      "Sync contacts, update pipeline stages, create tasks, summarize notes, and send follow-up reminders with retryable backend jobs.",
    requiredSkills: ["Backend services", "Queues", "CRM modeling", "Idempotency", "Audit logs"],
    deliverables: ["Contact sync design", "Task automation", "Note summary prompt", "Failure recovery plan"],
  },
  {
    id: "project-ai-outreach-assistant",
    title: "AI Outreach Assistant",
    businessProblem: "Teams need personalized outreach but must avoid spam and uncontrolled AI sending.",
    description:
      "Generate personalized outreach drafts from lead data, require human approval, send messages, track replies, and update CRM status.",
    requiredSkills: ["Prompt templates", "Approval workflows", "Email APIs", "Reply classification", "Compliance"],
    deliverables: ["Draft generator", "Approval queue", "Opt-out rules", "Reply classifier", "CRM status updates"],
  },
  {
    id: "project-internal-ai-dashboard",
    title: "Internal AI Dashboard",
    businessProblem: "Managers cannot see lead quality, failed automations, appointments, and sales activity in one place.",
    description:
      "Build a dashboard showing leads, AI scores, workflow status, failed jobs, appointments, and sales activity with filters and manual override tools.",
    requiredSkills: ["React", "Tables", "Charts", "API integration", "Admin UX"],
    deliverables: ["Dashboard pages", "Filters", "Failure view", "Manual override design", "Role-aware layout"],
  },
  {
    id: "project-slack-ai-operations-assistant",
    title: "Slack AI Operations Assistant",
    businessProblem: "Teams need operational answers and workflow triggers without opening multiple tools.",
    description:
      "Build a Slack bot that answers business questions, looks up leads, summarizes CRM activity, triggers workflows, and asks for approvals.",
    requiredSkills: ["Slack apps", "Tool calling", "Approvals", "CRM lookup", "Observability"],
    deliverables: ["Slash command", "Lead lookup tool", "Approval buttons", "Audit log", "Safety rules"],
  },
  {
    id: "project-rag-customer-support-chatbot",
    title: "RAG Customer Support Chatbot",
    businessProblem: "Support teams answer repeated questions while customers need accurate company-specific answers.",
    description:
      "Answer customer questions from company documents, refuse unknown answers, show sources, create tickets, and escalate to humans.",
    requiredSkills: ["RAG", "Embeddings", "Vector search", "Citations", "Support workflow"],
    deliverables: ["Document pipeline", "Retriever", "Grounded answer prompt", "Ticket escalation", "Evaluation set"],
  },
  {
    id: "project-end-to-end-ai-sales-automation",
    title: "End-to-End AI Sales Automation System",
    businessProblem: "Sales operations are fragmented across forms, CRM, calendar, Slack, outreach, and reports.",
    description:
      "Combine lead capture, AI qualification, CRM sync, appointment setting, Slack notifications, follow-up automation, dashboard reporting, and failure monitoring.",
    requiredSkills: ["System architecture", "AI integrations", "Workflow automation", "Deployment", "Monitoring"],
    deliverables: ["Architecture diagram", "Core workflows", "Dashboard", "Error handling", "Deployment plan", "Portfolio case study"],
  },
];

const seeds: PartSeed[] = [
  {
    partNumber: 1,
    title: "AI Automation Engineering Foundations",
    description: "Understand the role, business value, workflow thinking, AI agents, and where code meets no-code automation.",
    difficulty: "Beginner",
    estimatedTime: "6-8 hours",
    outcomes: ["Explain the AI automation engineer role", "Map business problems to automation opportunities", "Choose workflows vs agents"],
    skills: ["Automation consulting", "Workflow design", "Business process mapping", "Tool selection"],
    whatYouWillBuild: ["Lead follow-up workflow map", "Workflow vs agent decision checklist", "Automation discovery notes"],
    realBusinessUseCase: "A business receives Facebook leads and wants instant follow-up, CRM updates, and reminders.",
    commonBeginnerTrap: "Building an AI chatbot before understanding the business process.",
    focus: "AI automation foundations",
    practicalExample: "Design a lead intake workflow that validates form data, scores urgency, updates CRM, and notifies the right person.",
  },
  {
    partNumber: 2,
    title: "Core Programming Skills for AI Automation",
    description: "Learn the Python and JavaScript skills needed for APIs, dashboards, webhooks, files, retries, and backend services.",
    difficulty: "Beginner",
    estimatedTime: "12-16 hours",
    outcomes: ["Write automation scripts", "Call APIs safely", "Build frontend forms and small backend flows"],
    skills: ["Python", "JavaScript", "Async programming", "Error handling", "Logging"],
    whatYouWillBuild: ["CSV lead processor", "Webhook trigger button", "Small backend automation service"],
    realBusinessUseCase: "A company wants to import a CSV of leads, enrich it, and push clean records into a CRM.",
    commonBeginnerTrap: "Writing scripts that work once but fail silently in real business use.",
    focus: "programming foundations",
    practicalExample: "Create a script that reads leads in batches, calls an API, retries temporary failures, and logs results.",
  },
  {
    partNumber: 3,
    title: "APIs, HTTP, JSON, and Webhooks",
    description: "Master the integration language behind CRMs, Slack, email tools, calendars, payment systems, AI APIs, and dashboards.",
    difficulty: "Beginner",
    estimatedTime: "10-14 hours",
    outcomes: ["Read API documentation", "Send and receive webhooks", "Debug failed integrations"],
    skills: ["HTTP", "JSON", "Webhooks", "Authentication", "API testing"],
    whatYouWillBuild: ["Webhook receiver design", "CRM API request", "Duplicate event handling plan"],
    realBusinessUseCase: "A form submission should create a CRM contact, send Slack alerts, and store the event history.",
    commonBeginnerTrap: "Treating API calls and webhooks as the same thing.",
    focus: "API integration",
    practicalExample: "Receive a webhook, verify it, deduplicate it, store the event, and call a CRM API.",
  },
  {
    partNumber: 4,
    title: "Databases for AI Automation",
    description: "Design PostgreSQL, Redis, Airtable, Sheets, and Notion data models for traceable automation systems.",
    difficulty: "Beginner",
    estimatedTime: "10-12 hours",
    outcomes: ["Design automation schemas", "Prevent duplicate records", "Store conversation and job history"],
    skills: ["SQL", "PostgreSQL", "Schema design", "Audit logs", "Data validation"],
    whatYouWillBuild: ["Lead routing schema", "Conversation history table", "Failed jobs table"],
    realBusinessUseCase: "A sales workflow needs reliable tables for leads, assignments, CRM sync status, and failed jobs.",
    commonBeginnerTrap: "Using spreadsheets as a permanent database when relationships and traceability matter.",
    focus: "database design",
    practicalExample: "Model users, leads, appointments, messages, tasks, events, audit logs, and CRM sync records.",
    code: `CREATE TABLE leads (
  id uuid PRIMARY KEY,
  email text NOT NULL,
  source text NOT NULL,
  ai_score integer CHECK (ai_score BETWEEN 0 AND 100),
  assigned_rep_id uuid,
  created_at timestamptz NOT NULL DEFAULT now()
);`,
  },
  {
    partNumber: 5,
    title: "Backend Logic for Automation Systems",
    description: "Build reliable routes, services, repositories, workers, schedulers, queues, auth, and multi-tenant admin workflows.",
    difficulty: "Intermediate",
    estimatedTime: "12-16 hours",
    outcomes: ["Design backend workflows", "Handle retries and idempotency", "Separate routes from business logic"],
    skills: ["FastAPI", "Services", "Workers", "Queues", "RBAC"],
    whatYouWillBuild: ["Lead intake backend", "Slack notification worker", "CRM sync service"],
    realBusinessUseCase: "A new lead must be validated, scored, saved, assigned, sent to CRM, and logged.",
    commonBeginnerTrap: "Putting all automation logic directly inside route handlers.",
    focus: "backend architecture",
    practicalExample: "Receive a lead webhook, enqueue a scoring job, update CRM, and log every external system response.",
  },
  {
    partNumber: 6,
    title: "Debugging for AI Automation Engineers",
    description: "Learn a debugging process for logs, stack traces, APIs, webhooks, databases, prompts, CRMs, and scheduled jobs.",
    difficulty: "Beginner",
    estimatedTime: "8-10 hours",
    outcomes: ["Trace failures end-to-end", "Read API errors", "Debug prompt and CRM mapping issues"],
    skills: ["Logs", "Postman", "curl", "Browser dev tools", "Execution history"],
    whatYouWillBuild: ["Debug checklist", "Failure replay log", "Webhook test plan"],
    realBusinessUseCase: "Slack alerts stopped sending after a CRM field mapping changed.",
    commonBeginnerTrap: "Changing code before reproducing the exact failing input.",
    focus: "debugging discipline",
    practicalExample: "Debug a webhook that fires in the form tool but never creates the CRM contact.",
  },
  {
    partNumber: 7,
    title: "OpenAI API, Claude API, and AI Provider Basics",
    description: "Use AI APIs, model parameters, structured output, tool calling, embeddings, moderation, vision, audio, cost, and rate limits.",
    difficulty: "Intermediate",
    estimatedTime: "10-14 hours",
    outcomes: ["Call AI providers safely", "Choose models by task", "Control output formats and cost"],
    skills: ["AI APIs", "Structured outputs", "Embeddings", "Model selection", "Cost control"],
    whatYouWillBuild: ["Lead qualification assistant", "CRM note summarizer", "AI data extractor"],
    realBusinessUseCase: "A sales team wants AI to summarize calls and extract next steps into CRM fields.",
    commonBeginnerTrap: "Letting unstructured AI responses drive business logic.",
    focus: "AI provider integration",
    practicalExample: "Ask an AI model to return validated JSON for lead score, buying intent, urgency, and recommended follow-up.",
  },
  {
    partNumber: 8,
    title: "Prompt Engineering for Business Automation",
    description: "Design prompts, templates, variables, guardrails, structured JSON, testing, versioning, security, and evaluation.",
    difficulty: "Intermediate",
    estimatedTime: "8-12 hours",
    outcomes: ["Write business prompts", "Validate AI outputs", "Improve prompts with test cases"],
    skills: ["Prompt templates", "Few-shot examples", "JSON outputs", "Prompt evaluation"],
    whatYouWillBuild: ["Lead scoring prompt", "Reply classifier prompt", "Prompt test sheet"],
    realBusinessUseCase: "Classify customer replies as positive, negative, neutral, support issue, or unsubscribe.",
    commonBeginnerTrap: "Writing vague prompts with no schema, examples, or failure behavior.",
    focus: "prompt engineering",
    practicalExample: "Compare a weak lead scoring prompt to a structured prompt with criteria, examples, and a JSON schema.",
  },
  {
    partNumber: 9,
    title: "AI Agents and Tool Calling",
    description: "Design safe agents that choose tools, validate inputs, handle failures, use memory, and keep humans in the loop.",
    difficulty: "Advanced",
    estimatedTime: "12-16 hours",
    outcomes: ["Explain agent architecture", "Design safe tool calls", "Know when agents are a bad fit"],
    skills: ["Tool calling", "Agent safety", "Planning loops", "Observability"],
    whatYouWillBuild: ["CRM assistant tool map", "Approval-gated sales agent", "Agent safety checklist"],
    realBusinessUseCase: "A Slack assistant looks up CRM contacts, summarizes activity, and asks approval before updating records.",
    commonBeginnerTrap: "Giving an agent broad tools without validation, permissions, or audit logs.",
    focus: "AI agent design",
    practicalExample: "Build a tool list for contact lookup, calendar availability, email draft creation, and Slack notification.",
  },
  {
    partNumber: 10,
    title: "n8n, Make, Zapier, and GoHighLevel",
    description: "Use no-code and low-code automation platforms with credentials, triggers, nodes, filters, routers, workflows, and APIs.",
    difficulty: "Intermediate",
    estimatedTime: "14-18 hours",
    outcomes: ["Choose automation platforms", "Connect tools to custom backends", "Design error workflows"],
    skills: ["n8n", "Make", "Zapier", "GoHighLevel", "HTTP nodes"],
    whatYouWillBuild: ["n8n AI lead scoring flow", "Make router scenario", "GoHighLevel nurture workflow"],
    realBusinessUseCase: "An agency wants GHL lead nurture plus a custom AI scoring backend and Slack alerts.",
    commonBeginnerTrap: "Forcing no-code tools to do complex backend jobs they cannot reliably own.",
    focus: "automation platforms",
    practicalExample: "Compare n8n, Make, Zapier, and GoHighLevel for cost, flexibility, reliability, and client handoff.",
  },
  {
    partNumber: 11,
    title: "CRM Automation",
    description: "Automate contacts, deals, pipelines, notes, tags, custom fields, routing, reporting, cleanup, and follow-up reminders.",
    difficulty: "Intermediate",
    estimatedTime: "10-14 hours",
    outcomes: ["Model CRM concepts", "Avoid duplicate contacts", "Automate lead and deal workflows"],
    skills: ["CRM hygiene", "Lead scoring", "Pipeline updates", "Activity logs"],
    whatYouWillBuild: ["Lead capture to CRM flow", "CRM cleanup workflow", "Daily sales report"],
    realBusinessUseCase: "A business wants GoHighLevel or HubSpot-style CRM automation without duplicate contacts or bad field mappings.",
    commonBeginnerTrap: "Updating CRM fields without source tracking, opt-out checks, or audit logs.",
    focus: "CRM automation",
    practicalExample: "Create or update contacts, summarize notes, assign sales tasks, and alert reps for hot leads.",
  },
  {
    partNumber: 12,
    title: "Lead Routing Systems",
    description: "Build assignment systems using scoring, rules, round-robin, territory, availability, priority, SLAs, and escalation.",
    difficulty: "Intermediate",
    estimatedTime: "10-12 hours",
    outcomes: ["Design routing rules", "Track ownership and response time", "Escalate stale hot leads"],
    skills: ["Lead scoring", "Round-robin", "SLA timers", "Slack alerts"],
    whatYouWillBuild: ["Lead assignment workflow", "AI scoring prompt", "SLA escalation plan"],
    realBusinessUseCase: "A sales team wants hot leads assigned to available reps with response-time tracking.",
    commonBeginnerTrap: "Assigning leads without storing why the assignment happened.",
    focus: "lead routing",
    practicalExample: "Normalize a lead, score it with AI, apply assignment rules, notify a rep, and escalate after SLA breach.",
  },
  {
    partNumber: 13,
    title: "AI Appointment Setters",
    description: "Build appointment flows with qualification, calendars, availability, timezones, rescheduling, reminders, and CRM updates.",
    difficulty: "Advanced",
    estimatedTime: "12-16 hours",
    outcomes: ["Design booking state", "Avoid double bookings", "Handle reschedules and cancellations"],
    skills: ["Calendar APIs", "Conversation state", "Timezones", "Confirmation flows"],
    whatYouWillBuild: ["AI booking flow", "Timezone confirmation checklist", "Calendar safety rules"],
    realBusinessUseCase: "A clinic wants AI appointment booking that confirms timezone and never invents availability.",
    commonBeginnerTrap: "Letting AI promise a slot before checking the real calendar.",
    focus: "AI appointment setting",
    practicalExample: "Qualify a lead, fetch slots, suggest options, confirm date and timezone, create event, and update CRM.",
  },
  {
    partNumber: 14,
    title: "Outreach Automation and AI Sales Systems",
    description: "Create responsible outreach systems with personalization, sequences, reply classification, approvals, opt-outs, and CRM updates.",
    difficulty: "Advanced",
    estimatedTime: "12-16 hours",
    outcomes: ["Design outreach sequences", "Respect opt-outs", "Classify replies and update CRM"],
    skills: ["Cold email", "Reply classification", "Human approval", "Compliance"],
    whatYouWillBuild: ["Personalized first-line generator", "Approval queue", "Reply classifier"],
    realBusinessUseCase: "A team wants AI-personalized email drafts with human approval before sending.",
    commonBeginnerTrap: "Automating spam instead of building respectful, reviewable outreach.",
    focus: "outreach automation",
    practicalExample: "Generate outreach drafts, wait for approval, send messages, classify replies, and schedule follow-ups.",
  },
  {
    partNumber: 15,
    title: "Slack, Email, Calendar, and Internal Tool Integrations",
    description: "Connect Slack, Gmail, Calendar, Sheets, Airtable, Notion, CRMs, payment tools, forms, and dashboards.",
    difficulty: "Intermediate",
    estimatedTime: "10-14 hours",
    outcomes: ["Build Slack approvals", "Send transactional emails", "Create calendar events"],
    skills: ["Slack apps", "Email APIs", "Calendar APIs", "Internal tools"],
    whatYouWillBuild: ["Slack hot lead alert", "Approval button workflow", "Daily sales report"],
    realBusinessUseCase: "A manager approves AI-generated sales emails from Slack before they are sent.",
    commonBeginnerTrap: "Treating Slack notifications as enough without handling approvals, failures, and permissions.",
    focus: "internal integrations",
    practicalExample: "Send Slack alerts, receive interactive approval, call backend, send email, and log the decision.",
  },
  {
    partNumber: 16,
    title: "Internal Dashboards",
    description: "Build admin panels with metrics, tables, filters, charts, audit logs, failed jobs, CRM sync views, and manual overrides.",
    difficulty: "Intermediate",
    estimatedTime: "12-16 hours",
    outcomes: ["Design dashboard UX", "Expose workflow status", "Build manual override tools"],
    skills: ["React", "Tables", "Filters", "Charts", "Admin UX"],
    whatYouWillBuild: ["Lead dashboard", "Failed automation view", "Appointment dashboard"],
    realBusinessUseCase: "Operations needs one screen for leads, scores, failed jobs, appointments, and sales activity.",
    commonBeginnerTrap: "Showing pretty metrics without the ability to diagnose or fix failed workflows.",
    focus: "internal dashboard design",
    practicalExample: "Create a dashboard with searchable leads, AI scores, workflow status, failure reasons, and retry actions.",
  },
  {
    partNumber: 17,
    title: "Workflow Automation Architecture",
    description: "Structure triggers, validation, AI decisions, business rules, external APIs, notifications, approvals, errors, and reporting.",
    difficulty: "Intermediate",
    estimatedTime: "8-12 hours",
    outcomes: ["Draw workflow diagrams", "Implement each workflow stage", "Design recovery paths"],
    skills: ["System design", "Workflow diagrams", "Retries", "Monitoring"],
    whatYouWillBuild: ["Lead scoring workflow diagram", "Human approval workflow", "Failed-job recovery flow"],
    realBusinessUseCase: "A lead form should flow through validation, AI scoring, CRM sync, Slack notification, task creation, and logs.",
    commonBeginnerTrap: "Skipping the diagram and discovering missing steps during implementation.",
    focus: "workflow architecture",
    practicalExample: "Draw and implement: Lead Form -> Webhook -> Backend -> Validate -> AI Score -> CRM -> Slack -> Task -> Log.",
  },
  {
    partNumber: 18,
    title: "AI Chatbots and Business Assistants",
    description: "Build chatbots and assistants with state, memory, escalation, intent detection, profile data, safety rules, and analytics.",
    difficulty: "Advanced",
    estimatedTime: "12-16 hours",
    outcomes: ["Design chatbot architecture", "Handle human handoff", "Connect chat to business systems"],
    skills: ["Chat state", "Intent detection", "Human escalation", "Chat analytics"],
    whatYouWillBuild: ["FAQ chatbot", "Lead capture chatbot", "CRM assistant"],
    realBusinessUseCase: "A website chatbot captures leads, answers questions, books calls, and escalates complex cases.",
    commonBeginnerTrap: "Letting a chatbot answer outside company policy or promise unsupported actions.",
    focus: "business chatbot architecture",
    practicalExample: "Connect frontend chat widget, backend API, AI provider, database, CRM, and human handoff queue.",
  },
  {
    partNumber: 19,
    title: "RAG for Business Automation",
    description: "Use documents, chunking, embeddings, vector databases, retrieval, context injection, citations, and permissions.",
    difficulty: "Advanced",
    estimatedTime: "12-16 hours",
    outcomes: ["Explain RAG", "Build a retrieval pipeline", "Reduce hallucinations with citations"],
    skills: ["Embeddings", "Vector search", "Chunking", "Citations", "Knowledge bases"],
    whatYouWillBuild: ["Document ingestion pipeline", "Support knowledge assistant", "Source citation UI"],
    realBusinessUseCase: "A support chatbot answers only from company documents and creates tickets when it does not know.",
    commonBeginnerTrap: "Stuffing entire documents into prompts instead of retrieving relevant chunks.",
    focus: "retrieval augmented generation",
    practicalExample: "Upload docs, extract text, chunk content, embed chunks, retrieve matches, answer with sources.",
  },
  {
    partNumber: 20,
    title: "AI Memory Systems",
    description: "Design short-term, long-term, profile, business-object, semantic, episodic, and user-controlled memory safely.",
    difficulty: "Advanced",
    estimatedTime: "8-12 hours",
    outcomes: ["Differentiate memory from database and RAG", "Decide what to store", "Design privacy-aware memory"],
    skills: ["Conversation history", "Profile memory", "Memory retrieval", "Privacy"],
    whatYouWillBuild: ["Customer preference memory", "Lead status memory", "Memory expiration policy"],
    realBusinessUseCase: "An appointment setter remembers a lead's previous booking attempt and preferred time window.",
    commonBeginnerTrap: "Saving everything forever without user control, privacy rules, or expiration.",
    focus: "AI memory design",
    practicalExample: "Store lead preferences, retrieve relevant history, update memory after confirmed facts, and expire stale notes.",
  },
  {
    partNumber: 21,
    title: "Model Selection and Cost Control",
    description: "Choose models by task, estimate cost, use caching, fallbacks, batching, small models, embeddings, and rate-limit strategies.",
    difficulty: "Intermediate",
    estimatedTime: "8-10 hours",
    outcomes: ["Estimate AI costs", "Route tasks to the right model", "Reduce latency and token waste"],
    skills: ["Cost-per-token", "Caching", "Fallbacks", "Batching", "Latency"],
    whatYouWillBuild: ["Model routing matrix", "Cost estimate sheet", "Fallback strategy"],
    realBusinessUseCase: "Use a cheap model for reply classification and a stronger model for complex sales reasoning.",
    commonBeginnerTrap: "Sending every task to the most expensive model with oversized prompts.",
    focus: "AI cost control",
    practicalExample: "Estimate daily cost for 1,000 lead classifications, 100 summaries, and 20 complex sales analyses.",
  },
  {
    partNumber: 22,
    title: "Security and Safety for AI Automation",
    description: "Protect API keys, webhooks, data, prompts, tools, approvals, audit logs, rate limits, validations, and sensitive actions.",
    difficulty: "Advanced",
    estimatedTime: "10-14 hours",
    outcomes: ["Secure automations", "Prevent unsafe AI actions", "Design approval and audit flows"],
    skills: ["Secrets management", "Webhook security", "RBAC", "Prompt injection defense"],
    whatYouWillBuild: ["Safety checklist", "Webhook signature plan", "Human approval policy"],
    realBusinessUseCase: "AI should draft a refund response but never issue refunds without human approval.",
    commonBeginnerTrap: "Trusting AI output because it sounds confident.",
    focus: "security and safety",
    practicalExample: "Validate AI output before CRM updates and require approval before sending payments, emails, or bookings.",
  },
  {
    partNumber: 23,
    title: "Testing AI Automation Systems",
    description: "Test units, integrations, webhooks, prompts, JSON schemas, retries, duplicates, CRM sync, bookings, dashboards, and regressions.",
    difficulty: "Intermediate",
    estimatedTime: "10-14 hours",
    outcomes: ["Write automation tests", "Mock external APIs", "Evaluate prompt outputs"],
    skills: ["Unit tests", "Integration tests", "Webhook tests", "Prompt regression"],
    whatYouWillBuild: ["Webhook duplicate test", "AI JSON schema test", "Appointment double-booking test"],
    realBusinessUseCase: "A duplicate webhook should not create two CRM contacts or send two follow-up emails.",
    commonBeginnerTrap: "Testing only the success path and ignoring external API failures.",
    focus: "testing strategy",
    practicalExample: "Mock a failed CRM API call, assert retry behavior, and verify the failed job is visible in the dashboard.",
  },
  {
    partNumber: 24,
    title: "Deployment and Operations",
    description: "Deploy frontend, backend, database, workers, cron jobs, n8n, Docker, secrets, logs, monitoring, alerts, backups, and CI/CD.",
    difficulty: "Advanced",
    estimatedTime: "12-16 hours",
    outcomes: ["Prepare production systems", "Deploy full-stack automations", "Monitor and recover failures"],
    skills: ["Docker", "CI/CD", "Monitoring", "Backups", "Rollbacks"],
    whatYouWillBuild: ["Deployment checklist", "Docker Compose plan", "Monitoring and alerting plan"],
    realBusinessUseCase: "A FastAPI backend, React dashboard, PostgreSQL database, Redis worker, and n8n instance need production deployment.",
    commonBeginnerTrap: "Deploying without logs, backups, health checks, or rollback steps.",
    focus: "deployment operations",
    practicalExample: "Move from local dev to production with environment secrets, HTTPS, domains, workers, cron, and error tracking.",
  },
  {
    partNumber: 25,
    title: "Sales Automation Experience",
    description: "Understand funnels, lead capture, qualification, follow-up, appointment setting, pipelines, reporting, attribution, and sales outcomes.",
    difficulty: "Intermediate",
    estimatedTime: "8-12 hours",
    outcomes: ["Speak sales operations language", "Design business-value automation", "Measure revenue impact"],
    skills: ["Sales funnel", "Speed-to-lead", "Pipeline stages", "CRM hygiene"],
    whatYouWillBuild: ["Sales workflow map", "Speed-to-lead automation", "Pipeline reporting view"],
    realBusinessUseCase: "A business owner wants more booked calls, faster follow-up, fewer missed opportunities, and better reporting.",
    commonBeginnerTrap: "Talking about technology instead of the sales outcome the owner cares about.",
    focus: "sales automation strategy",
    practicalExample: "Build an AI sales system that qualifies leads, books calls, updates CRM, reports conversion, and reduces admin work.",
  },
  {
    partNumber: 26,
    title: "Full Real-World Projects",
    description: "Build complete portfolio projects with requirements, system design, schemas, workflows, APIs, prompts, testing, deployment, and client explanations.",
    difficulty: "Project",
    estimatedTime: "40-60 hours",
    outcomes: ["Build portfolio-ready systems", "Explain business value", "Ship complete automation projects"],
    skills: ["Project architecture", "Portfolio writing", "Deployment planning", "Client communication"],
    whatYouWillBuild: ["Eight practical AI automation portfolio projects", "Case study outlines", "Deployment plans"],
    realBusinessUseCase: "A client wants an end-to-end AI sales automation system with lead capture, CRM, calendar, Slack, and dashboard reporting.",
    commonBeginnerTrap: "Building demos that look good but lack failure handling, testing, and business explanation.",
    focus: "real-world project delivery",
    practicalExample: "Select one project, write requirements, design the system, implement the core workflow, test it, and document the business value.",
  },
  {
    partNumber: 27,
    title: "Portfolio and Client Readiness",
    description: "Document projects, create READMEs, demo videos, case studies, workflow maps, scopes, pricing, handoffs, and reusable templates.",
    difficulty: "Project",
    estimatedTime: "8-12 hours",
    outcomes: ["Present project value", "Scope client work", "Avoid overpromising"],
    skills: ["README writing", "Case studies", "Client discovery", "Project scoping"],
    whatYouWillBuild: ["Portfolio README", "Client discovery questionnaire", "Case study template"],
    realBusinessUseCase: "Explain a lead routing system as a business result: faster follow-up, cleaner CRM data, and fewer missed opportunities.",
    commonBeginnerTrap: "Showing code without explaining the before-and-after workflow and measurable value.",
    focus: "portfolio readiness",
    practicalExample: "Write a case study for an AI lead routing system that reduced manual follow-up and improved sales response time.",
  },
];

const deepDiveGuides: Record<number, DeepDiveGuide> = {
  4: {
    plainEnglish:
      "A database is the memory of an automation system. It stores leads, users, conversations, appointments, tasks, failed jobs, and every important event. If the database is messy, the automation becomes messy too. Good database design helps you know what happened, when it happened, who owns it, and what should happen next.",
    whyItMatters:
      "Businesses need automations they can trust. A lead routing system needs to know if a lead already exists, who owns it, whether the CRM sync worked, and what failed. PostgreSQL is good for structured business records. Redis is useful for fast temporary data, queues, and locks. Airtable, Google Sheets, and Notion can work for early prototypes, but they become risky when relationships, permissions, and audit history matter.",
    keyIdeas: [
      "Tables store one kind of thing, like leads, appointments, messages, or jobs.",
      "Primary keys identify one record. Foreign keys connect records, such as a lead assigned to a sales rep.",
      "Indexes help the database find records quickly, but too many indexes can slow writes.",
      "Audit logs show what changed and why. They are very important for debugging automation.",
      "Failed jobs should be stored, not hidden. A visible failed job can be retried or reviewed.",
    ],
    implementationSteps: [
      "List the real business objects first: leads, users, messages, appointments, tasks, CRM sync records, and workflow events.",
      "Give each object a table with clear fields and timestamps.",
      "Decide which records must be unique, such as one contact per email per workspace.",
      "Add status fields for workflows, such as pending, processing, succeeded, failed, or needs_review.",
      "Add audit tables for actions the automation takes, especially CRM updates, AI decisions, and notifications.",
      "Write migrations so the schema can change safely over time.",
    ],
    workflowExample:
      "Lead form -> leads table -> AI score stored on lead -> assignment stored in lead_assignments -> CRM sync stored in crm_sync_events -> Slack alert stored in workflow_events -> failed API call stored in failed_jobs.",
    practicePlan:
      "Design a database schema for an AI appointment setter. Include leads, conversations, messages, appointments, calendar sync status, reminders, and audit logs. Write the fields in plain English before writing SQL.",
    mistakes: [
      "Putting everything into one huge table.",
      "Using email as the only identity when phone number, CRM ID, or workspace ID also matters.",
      "Not storing raw webhook event IDs, which makes duplicate handling hard.",
      "Ignoring timezones when storing appointment data.",
    ],
    debugging: [
      "Check whether the record exists before checking the automation code.",
      "Look for duplicate records with the same email, phone, or external CRM ID.",
      "Inspect timestamps and timezone conversions.",
      "Check failed_jobs and workflow_events before retrying manually.",
    ],
    portfolio:
      "Show your schema diagram, explain why each table exists, include a migration file, and demonstrate how the system avoids duplicate leads and stores failed automation runs.",
  },
  5: {
    plainEnglish:
      "Backend logic is the brain and control room of an automation system. It receives requests, checks data, applies rules, calls AI, talks to CRMs or Slack, saves records, and starts background jobs. A strong backend keeps the workflow reliable even when users send bad data or an external API fails.",
    whyItMatters:
      "No-code tools are useful, but many serious automations need backend logic. A backend can validate data, protect secrets, run retries, enforce permissions, store audit logs, and handle complex business rules. This is what turns a fragile demo into a system a business can run every day.",
    keyIdeas: [
      "Routes receive requests. Services contain business logic. Repositories read and write database records.",
      "Workers handle slow or retryable tasks, such as AI calls, CRM sync, email sending, and report generation.",
      "Queues let the system process work in the background instead of blocking the user.",
      "Idempotency means the same event can run twice without creating duplicate damage.",
      "Authentication proves who the user is. Authorization decides what that user can do.",
    ],
    implementationSteps: [
      "Create a route for the incoming event, such as a new lead webhook.",
      "Validate the payload and reject missing or unsafe fields.",
      "Save the event before doing slow work.",
      "Enqueue background jobs for AI scoring, CRM sync, Slack notification, and follow-up tasks.",
      "Use service functions so each step has one job and can be tested.",
      "Store every external request result so support can debug failures later.",
    ],
    workflowExample:
      "POST /webhooks/leads -> validate payload -> save lead -> enqueue score_lead -> worker calls AI -> worker updates CRM -> worker sends Slack alert -> workflow_events table records each step.",
    practicePlan:
      "Write a FastAPI-style service design for lead intake. Do not code the full app yet. Write the route, service names, worker jobs, database tables, and retry rules.",
    mistakes: [
      "Putting every step inside one route handler.",
      "Returning success before saving enough information to retry later.",
      "Calling external APIs without timeouts.",
      "Letting a duplicate webhook create duplicate contacts or duplicate emails.",
    ],
    debugging: [
      "Check whether the request reached the route.",
      "Check validation errors before checking AI or CRM logic.",
      "Look at worker logs separately from web server logs.",
      "Compare the saved event payload with the payload sent to the external API.",
    ],
    portfolio:
      "Show a clean backend structure with routes, services, repositories, workers, and tests. Explain how your backend survives duplicate webhooks, failed CRM calls, and invalid AI output.",
  },
  6: {
    plainEnglish:
      "Debugging means finding where reality stopped matching your expectation. In automation, a failure can happen in many places: form, webhook, backend, database, AI response, CRM API, Slack, calendar, or scheduler. You debug by following the data step by step instead of guessing.",
    whyItMatters:
      "Businesses will call you when automations break. The best engineers are calm because they have a process. They know how to read logs, replay events, inspect payloads, compare expected and actual outputs, and explain the cause in simple language.",
    keyIdeas: [
      "A log is a written record of what the system did.",
      "A stack trace shows where code crashed.",
      "An API error tells you whether the issue is authentication, validation, rate limit, permissions, or server failure.",
      "A silent failure is dangerous because the business thinks work happened when it did not.",
      "Debugging AI means checking prompts, input data, expected output format, and validation rules.",
    ],
    implementationSteps: [
      "Write the expected workflow before debugging.",
      "Find the last step that definitely worked.",
      "Inspect the exact input at the failing step.",
      "Check logs, status codes, IDs, and timestamps.",
      "Reproduce the failure with the same payload.",
      "Fix the smallest cause, then add a test or log so it is easier next time.",
    ],
    workflowExample:
      "Webhook not firing -> check form tool delivery log -> check endpoint URL -> check server access log -> check signature verification -> check database event record -> check worker queue.",
    practicePlan:
      "Create a debugging checklist for a CRM contact not being created. Include checks for webhook delivery, backend validation, duplicate detection, CRM authentication, required fields, and logs.",
    mistakes: [
      "Changing code before reproducing the issue.",
      "Only checking the frontend when the failure happened in a worker.",
      "Ignoring timezone and duplicate-record problems.",
      "Not saving failed AI outputs for inspection.",
    ],
    debugging: [
      "Use request IDs to follow one event across services.",
      "Use Postman or curl to test the API outside the frontend.",
      "Use Webhook.site or ngrok to see what a webhook really sends.",
      "Check rate-limit and auth errors before rewriting business logic.",
    ],
    portfolio:
      "Include a failure analysis section in your projects. Show one broken workflow, the logs you inspected, the root cause, and the fix. This makes you look like an engineer who can maintain production systems.",
  },
  7: {
    plainEnglish:
      "AI APIs let your software send text, images, audio, or structured data to an AI model and receive an answer. You are not training a model from scratch. You are connecting a model to a business workflow and controlling how it behaves.",
    whyItMatters:
      "AI providers are useful for tasks like summarizing calls, extracting fields, classifying replies, drafting emails, answering support questions, and scoring leads. The skill is not just calling the API. The skill is choosing the right model, protecting API keys, controlling output, managing cost, and handling bad responses.",
    keyIdeas: [
      "A system prompt sets the model's role and rules.",
      "A user prompt contains the task and input data.",
      "Temperature controls randomness. Lower temperature is better for predictable business output.",
      "Structured output and JSON mode help turn AI text into data your code can validate.",
      "Embeddings turn text into numbers so you can search by meaning.",
      "Streaming shows partial output as it is generated, useful for chat interfaces.",
    ],
    implementationSteps: [
      "Choose the task: classify, extract, summarize, draft, answer, or decide.",
      "Choose the smallest reliable model for the task.",
      "Write a prompt with role, context, rules, examples, and output schema.",
      "Validate the response before using it.",
      "Track token usage, latency, and failures.",
      "Fallback to human review when confidence is low or action risk is high.",
    ],
    workflowExample:
      "New sales call transcript -> AI summarizes pain points -> AI extracts next steps -> backend validates JSON -> CRM note is saved -> sales rep gets a Slack summary.",
    practicePlan:
      "Design an AI lead qualification request. Define the input fields, model choice, system prompt, output JSON schema, validation rules, and what happens if the output is invalid.",
    mistakes: [
      "Sending sensitive data without thinking about privacy.",
      "Using expensive models for simple classification.",
      "Trusting AI output without schema validation.",
      "Exposing API keys in frontend code.",
    ],
    debugging: [
      "Log prompt version, model name, and response validation errors.",
      "Keep sample inputs that should produce known outputs.",
      "Check whether the issue is prompt wording, missing context, model choice, or bad input data.",
      "Reject invalid JSON and retry with a repair prompt only when safe.",
    ],
    portfolio:
      "Show one AI integration that returns structured output and one that requires human approval. Include cost estimates, validation rules, and examples of safe failure handling.",
  },
  8: {
    plainEnglish:
      "Prompt engineering is the skill of giving an AI model clear instructions. A good prompt tells the AI its role, the business context, the rules, what not to do, the expected format, and examples of good answers.",
    whyItMatters:
      "Business automations need predictable AI output. A vague prompt may sound good once, then fail with real customer data. A strong prompt can classify replies, score leads, extract fields, draft emails, summarize calls, and create tasks in a way your code can validate.",
    keyIdeas: [
      "System prompts define behavior and boundaries.",
      "Few-shot examples show the model what good output looks like.",
      "Prompt variables insert real data, such as lead name, industry, CRM stage, or conversation history.",
      "Prompt versioning lets you know which prompt produced which result.",
      "Prompt evaluation means testing prompts against many realistic examples.",
    ],
    implementationSteps: [
      "Write the business task in one sentence.",
      "List what the AI should know and what it must not do.",
      "Define the exact output shape, preferably JSON for automation.",
      "Add examples for edge cases.",
      "Test the prompt with easy, messy, and adversarial inputs.",
      "Store prompt version and evaluation notes.",
    ],
    workflowExample:
      "Incoming email reply -> prompt classifies as positive, negative, neutral, support, or unsubscribe -> backend validates class -> CRM status updates -> human is notified for positive replies.",
    practicePlan:
      "Write a lead scoring prompt with criteria for budget, urgency, fit, authority, and need. Add three examples and a JSON output schema.",
    mistakes: [
      "Asking the AI to be helpful without giving business rules.",
      "Mixing instructions and user data in a confusing way.",
      "Not telling the model what to do when data is missing.",
      "Changing prompts without tracking versions.",
    ],
    debugging: [
      "Compare bad output against the prompt line by line.",
      "Add examples for the failure case instead of making the prompt longer blindly.",
      "Check whether dynamic variables are empty or malformed.",
      "Use validation errors to improve the prompt.",
    ],
    portfolio:
      "Include prompt files in your project. Show the bad prompt, the improved prompt, test examples, and the output validation logic.",
  },
  9: {
    plainEnglish:
      "An AI agent is an AI system that can choose actions using approved tools. A chatbot only talks. An agent can decide to search a database, check a calendar, draft an email, or ask for human approval. This power is useful, but it must be controlled.",
    whyItMatters:
      "Agents can help with flexible tasks like CRM lookup, sales research, support triage, appointment help, and internal operations. But agents are not always the answer. If the steps are predictable, a workflow is safer and easier to debug.",
    keyIdeas: [
      "A tool is a function the agent can call, such as search_contact or check_availability.",
      "Tool names and descriptions must be clear so the AI knows when to use them.",
      "Tool inputs must be validated before the tool runs.",
      "Agent memory can help, but it can also create privacy and accuracy risks.",
      "Human approval is needed for risky actions like sending emails, changing CRM fields, refunds, and bookings.",
    ],
    implementationSteps: [
      "Decide whether this should be a workflow or an agent.",
      "List the exact tools the agent can use.",
      "Give each tool a narrow purpose and strict input schema.",
      "Add permission checks before tools touch business systems.",
      "Log every tool call and tool result.",
      "Stop the agent after a clear limit so it cannot loop forever.",
    ],
    workflowExample:
      "Slack question -> agent identifies intent -> calls CRM lookup tool -> summarizes result -> asks approval before updating CRM -> logs tool calls.",
    practicePlan:
      "Design a CRM assistant agent. List five tools, their input schemas, their safety rules, and which tools require human approval.",
    mistakes: [
      "Giving an agent broad access to email, CRM, and calendar without approval rules.",
      "Letting the agent call tools with unvalidated data.",
      "Using an agent where a simple deterministic workflow is better.",
      "Not logging tool calls.",
    ],
    debugging: [
      "Check the agent's chosen tool and why it chose it.",
      "Inspect the exact tool input.",
      "Check whether the tool failed or the model misunderstood the result.",
      "Add limits for max steps, max retries, and approval-required actions.",
    ],
    portfolio:
      "Build a small agent with two safe read-only tools and one approval-gated write tool. Explain why each tool exists and how you prevent unsafe actions.",
  },
  10: {
    plainEnglish:
      "No-code and low-code automation tools help you connect apps without writing every line of code. n8n, Make, Zapier, and GoHighLevel are useful because many businesses already use them. Your job is to know when these tools are enough and when custom code is needed.",
    whyItMatters:
      "Many client projects need speed, not a large custom app. A workflow tool can connect forms, CRM, Slack, email, sheets, and AI quickly. But workflow tools can become hard to maintain when logic is complex, data must be secure, or many retries and tests are needed.",
    keyIdeas: [
      "n8n is strong for flexible workflows, HTTP requests, code nodes, self-hosting, and developer-style automation.",
      "Make is strong for visual scenarios, routers, filters, iterators, and many app integrations.",
      "Zapier is simple and popular but can become limited for complex branching or custom logic.",
      "GoHighLevel is a CRM and marketing platform used heavily by agencies.",
      "A custom backend can work beside these tools when logic, security, or reliability needs more control.",
    ],
    implementationSteps: [
      "Start with the business workflow, not the platform.",
      "Choose no-code for simple triggers, app connections, and quick client handoff.",
      "Choose custom code for complex validation, database control, multi-tenant logic, and advanced AI behavior.",
      "Use HTTP webhooks to connect workflow tools to your backend.",
      "Add error paths and execution history checks.",
      "Document credentials and ownership clearly.",
    ],
    workflowExample:
      "Tally form -> n8n webhook -> HTTP request to custom AI scoring backend -> CRM update -> Slack hot lead alert -> error workflow if CRM fails.",
    practicePlan:
      "Design the same lead scoring workflow in n8n and as a custom backend. Write the tradeoffs for speed, cost, reliability, debugging, and client handoff.",
    mistakes: [
      "Using a no-code tool as a hidden database for serious business data.",
      "Putting secrets in unsafe places.",
      "Ignoring error workflows and execution history.",
      "Creating a workflow so complex nobody can maintain it.",
    ],
    debugging: [
      "Check execution history first.",
      "Inspect data mapping between nodes.",
      "Check credentials and API limits.",
      "Replay failed executions with the same input.",
    ],
    portfolio:
      "Show one project where a no-code tool handles app connections and your backend handles the sensitive AI/business logic. This shows good judgment.",
  },
  11: {
    plainEnglish:
      "A CRM is where a business tracks relationships with leads, customers, companies, deals, notes, tasks, and follow-ups. CRM automation keeps that system updated so sales teams do not lose opportunities or waste time on manual admin work.",
    whyItMatters:
      "Many businesses have leads but poor follow-up. CRM automation improves speed-to-lead, lead assignment, pipeline visibility, reminders, reporting, and customer history. A clean CRM makes every other automation easier.",
    keyIdeas: [
      "Contacts are people. Companies are organizations. Deals or opportunities are possible sales.",
      "Pipelines show where a lead is in the sales process.",
      "Tags and custom fields help segment leads, but too many unplanned fields create chaos.",
      "Duplicate detection protects the CRM from messy records.",
      "Activity logs show calls, emails, notes, tasks, and automation actions.",
    ],
    implementationSteps: [
      "Map the CRM objects before writing automation.",
      "Decide what makes a contact unique.",
      "Normalize lead source, phone, email, and opt-out status.",
      "Create or update contacts safely instead of always creating new ones.",
      "Log every automated CRM change.",
      "Notify humans for hot leads or risky updates.",
    ],
    workflowExample:
      "New website lead -> search CRM by email and phone -> create or update contact -> add source tag -> AI scores lead -> create opportunity -> assign rep -> create follow-up task.",
    practicePlan:
      "Design a CRM cleanup workflow. Include duplicate rules, field mapping, source tracking, opt-out handling, and a report of records that need human review.",
    mistakes: [
      "Creating duplicate contacts.",
      "Mapping fields incorrectly.",
      "Ignoring opt-out status.",
      "Not storing the source of a lead.",
    ],
    debugging: [
      "Search by CRM ID, email, and phone.",
      "Check field mapping names and data types.",
      "Look at CRM activity logs.",
      "Check whether automation changed the wrong lifecycle stage.",
    ],
    portfolio:
      "Build a CRM automation demo that shows before and after: messy manual follow-up versus clean contact creation, assignment, reminders, and activity logs.",
  },
  12: {
    plainEnglish:
      "Lead routing is deciding who should handle a new lead. A good routing system looks at lead quality, location, product interest, rep availability, territory, priority, and response-time rules.",
    whyItMatters:
      "Fast follow-up can decide whether a business wins or loses a customer. Lead routing makes sure hot leads reach the right person quickly and that no lead sits forgotten in a CRM.",
    keyIdeas: [
      "Lead scoring measures how valuable or urgent a lead is.",
      "Round-robin routing spreads leads evenly across reps.",
      "Territory routing assigns leads by location.",
      "Availability routing avoids assigning leads to unavailable reps.",
      "SLA timers track how quickly the team responds.",
    ],
    implementationSteps: [
      "Receive the lead and normalize contact data.",
      "Check for duplicates and existing ownership.",
      "Score the lead using rules or AI.",
      "Apply assignment rules in a clear order.",
      "Save why the assignment happened.",
      "Notify the rep and escalate if the SLA is missed.",
    ],
    workflowExample:
      "Lead form -> normalize email and phone -> AI score -> check territory -> assign available rep -> Slack alert -> CRM owner update -> follow-up task -> SLA timer.",
    practicePlan:
      "Write routing rules for a sales team with three reps, two territories, one senior closer, and a 10-minute SLA for hot leads.",
    mistakes: [
      "Assigning leads without saving the rule that made the decision.",
      "Ignoring rep availability.",
      "Letting duplicate leads bounce between owners.",
      "Not escalating missed follow-up.",
    ],
    debugging: [
      "Check the lead score input.",
      "Check rule order.",
      "Check rep availability at the time of assignment.",
      "Check CRM owner update response.",
    ],
    portfolio:
      "Show a lead routing simulator where different lead inputs produce different assignments, with a visible explanation for each decision.",
  },
  13: {
    plainEnglish:
      "An AI appointment setter helps a lead book a meeting. It asks questions, checks if the lead is qualified, checks real calendar availability, suggests times, confirms timezone, books the event, sends reminders, and updates the CRM.",
    whyItMatters:
      "Appointment setting is valuable because booked calls can turn into revenue. But it is risky because wrong times, fake availability, or timezone mistakes create a bad customer experience.",
    keyIdeas: [
      "The AI must never invent availability.",
      "The system needs conversation state so it knows what has already been asked.",
      "Timezone confirmation is required before booking.",
      "Booking should happen only after the user confirms the exact date and time.",
      "Reschedules and cancellations need their own workflows.",
    ],
    implementationSteps: [
      "Collect lead name, contact info, goal, and qualification answers.",
      "Check real calendar availability through an API.",
      "Offer a small set of valid time slots.",
      "Ask the lead to confirm one slot and timezone.",
      "Create the calendar event and store the booking state.",
      "Update CRM and notify the sales team.",
    ],
    workflowExample:
      "Lead chat -> ask qualification questions -> fetch calendar slots -> suggest three times -> confirm timezone -> book event -> send confirmation -> CRM update -> Slack notification.",
    practicePlan:
      "Design the booking state machine for an appointment setter. Include states for qualifying, showing slots, confirming, booked, rescheduling, cancelled, and human_handoff.",
    mistakes: [
      "Booking before final confirmation.",
      "Forgetting timezone.",
      "Letting AI say a time is available without checking the calendar.",
      "Not handling reschedule and cancel requests.",
    ],
    debugging: [
      "Check stored conversation state.",
      "Check calendar API timezone fields.",
      "Check whether the slot was still available at booking time.",
      "Check duplicate booking prevention.",
    ],
    portfolio:
      "Build a booking demo that shows qualification, slot selection, confirmation, CRM update, and safe handling when the user asks for a time that is unavailable.",
  },
  14: {
    plainEnglish:
      "Outreach automation helps a business contact leads through email, LinkedIn, SMS, or other channels. AI can help personalize messages and classify replies, but humans should stay in control when messages could affect reputation or compliance.",
    whyItMatters:
      "Good outreach can create opportunities. Bad outreach becomes spam. A professional automation engineer builds systems that respect opt-outs, avoid fake personalization, use approval steps, and track replies cleanly.",
    keyIdeas: [
      "Segmentation means grouping leads by fit, industry, need, or behavior.",
      "Personalization should be based on real data, not fake compliments.",
      "Sequences schedule follow-ups over time.",
      "Reply classification helps decide next action.",
      "Opt-out handling is not optional.",
    ],
    implementationSteps: [
      "Import or collect leads with source and consent information.",
      "Clean and segment the list.",
      "Generate drafts with AI using real lead data.",
      "Require human approval before sending.",
      "Send messages through an email or SMS provider.",
      "Classify replies and update CRM.",
    ],
    workflowExample:
      "Lead list -> enrichment -> AI first-line draft -> human approval -> email sent -> reply received -> AI classification -> CRM stage update -> meeting booking prompt.",
    practicePlan:
      "Design an outreach assistant that generates drafts but cannot send without approval. Include opt-out rules, approval status, and reply classification.",
    mistakes: [
      "Automating spam.",
      "Ignoring unsubscribe or opt-out requests.",
      "Sending AI messages without review.",
      "Using fake personalization that damages trust.",
    ],
    debugging: [
      "Check lead source and consent fields.",
      "Check the prompt variables used in the draft.",
      "Check send logs and bounce reports.",
      "Check reply classification examples.",
    ],
    portfolio:
      "Show a responsible outreach system with approval gates, opt-out handling, reply classification, and CRM updates. Explain what you chose not to automate.",
  },
  15: {
    plainEnglish:
      "Business tools like Slack, email, calendar, Sheets, Airtable, Notion, CRMs, and payment systems are where teams already work. Integration means connecting your automation to those tools in a useful and safe way.",
    whyItMatters:
      "An automation that only works inside your app is often less useful than one that reaches the team where they already are. Slack alerts, approval buttons, calendar events, email confirmations, and dashboard updates make the system part of daily work.",
    keyIdeas: [
      "Slack webhooks send simple messages. Slack apps can use slash commands, buttons, and bot tokens.",
      "Email APIs send transactional or outreach messages.",
      "Calendar APIs check availability and create events.",
      "Sheets and Airtable are useful for simple data workflows but need guardrails.",
      "Payment tools can trigger follow-up workflows for failed or successful payments.",
    ],
    implementationSteps: [
      "Decide which tool owns each part of the workflow.",
      "Create credentials safely and store them in environment variables.",
      "Send small test requests before building the full automation.",
      "Use clear message formatting so humans understand what happened.",
      "Add approval steps for risky actions.",
      "Log every tool call and response.",
    ],
    workflowExample:
      "Hot lead scored -> Slack alert with lead summary -> manager clicks approve -> backend sends email -> calendar booking link sent -> CRM note saved.",
    practicePlan:
      "Design a Slack approval workflow for AI-generated emails. Include message fields, approval button, backend callback, email send step, and audit log.",
    mistakes: [
      "Putting secrets in frontend code.",
      "Sending noisy Slack alerts nobody reads.",
      "Not checking calendar timezone rules.",
      "Treating a sent email as successful without checking provider response.",
    ],
    debugging: [
      "Check token scopes and app permissions.",
      "Check webhook URLs and callback URLs.",
      "Check provider response IDs.",
      "Check whether the user clicked approval before the action ran.",
    ],
    portfolio:
      "Show one workflow that connects at least three tools, such as Slack, email, CRM, and calendar. Include screenshots of the human approval step.",
  },
  16: {
    plainEnglish:
      "An internal dashboard is a private tool for a team. It shows data, workflow status, failed automations, leads, appointments, conversations, and actions humans can take. A good dashboard helps operators understand and fix the system.",
    whyItMatters:
      "Businesses do not only need automations to run. They need to see what happened. Dashboards make automations manageable by showing progress, errors, metrics, and manual override options.",
    keyIdeas: [
      "Tables are useful for records like leads, jobs, appointments, and messages.",
      "Filters help users find the records that matter.",
      "Audit logs explain who or what changed data.",
      "Failed-job views let humans retry or investigate automation problems.",
      "Role-based access protects sensitive actions.",
    ],
    implementationSteps: [
      "Choose the main jobs the user must do on the dashboard.",
      "Show the most important metrics first.",
      "Build tables with search, filters, and clear status labels.",
      "Add detail pages for records that need investigation.",
      "Add manual override actions carefully.",
      "Show logs and errors in plain English.",
    ],
    workflowExample:
      "Manager opens dashboard -> filters hot leads -> sees AI score and assigned rep -> opens failed CRM sync -> retries after fixing missing field -> audit log records action.",
    practicePlan:
      "Design a lead dashboard with columns, filters, statuses, row actions, and a failed automation panel.",
    mistakes: [
      "Making a pretty dashboard that cannot help users fix problems.",
      "Showing too many metrics without clear actions.",
      "Hiding failure reasons.",
      "Ignoring mobile layout for managers checking quickly.",
    ],
    debugging: [
      "Check API responses for empty or incorrect data.",
      "Check filter logic.",
      "Check permissions for actions.",
      "Check whether failed jobs have human-readable errors.",
    ],
    portfolio:
      "Build an internal dashboard that shows workflow status and failed jobs. Employers and clients love seeing that you understand operations, not just automation triggers.",
  },
  17: {
    plainEnglish:
      "Workflow architecture is the blueprint of an automation. It shows the trigger, input data, validation, processing, AI decision, business rules, external API calls, database updates, notifications, approvals, error handling, retries, logs, and reports.",
    whyItMatters:
      "A workflow diagram helps you build the right thing before writing code. It also helps clients understand what will happen and where humans stay in control.",
    keyIdeas: [
      "A trigger starts the workflow.",
      "Validation protects the system from bad data.",
      "Business rules handle known decisions.",
      "AI helps with flexible decisions, but output must be checked.",
      "Error handling and logs make the workflow maintainable.",
    ],
    implementationSteps: [
      "Draw the workflow in text first.",
      "Mark which steps are automatic and which require approval.",
      "Mark each external system.",
      "Add failure branches for important steps.",
      "Decide what gets stored in the database.",
      "Turn the diagram into routes, services, workers, and dashboards.",
    ],
    workflowExample:
      "Lead Form -> Webhook -> Backend -> Validate Data -> AI Score Lead -> Save to Database -> Send to CRM -> Notify Slack -> Create Follow-up Task -> Log Result.",
    practicePlan:
      "Draw a workflow for support ticket triage. Include customer message, AI classification, priority rules, ticket creation, Slack notification, and failed ticket recovery.",
    mistakes: [
      "Drawing only the happy path.",
      "Forgetting where data is stored.",
      "Not adding human approval for risky steps.",
      "Building before the client confirms the workflow.",
    ],
    debugging: [
      "Use the diagram to locate the failed step.",
      "Check whether the input to the failed step is correct.",
      "Check whether the failure branch exists.",
      "Update the diagram when the real system changes.",
    ],
    portfolio:
      "Include workflow diagrams in every project README. They make your work easier to understand and show that you can design systems before coding.",
  },
  18: {
    plainEnglish:
      "A chatbot is a conversation interface. A business assistant is a chatbot connected to business data, tools, rules, and handoff paths. The chatbot should not only answer; it should guide users safely through a useful workflow.",
    whyItMatters:
      "Businesses use chatbots for support, sales, lead capture, appointment booking, internal help, and CRM assistance. A good chatbot reduces repetitive work while handing off to humans when needed.",
    keyIdeas: [
      "Rule-based chatbots follow fixed paths.",
      "AI chatbots can answer more flexible questions.",
      "Conversation state tracks what has already happened.",
      "Memory and profile data can help, but they must be used safely.",
      "Human escalation is required when confidence is low or risk is high.",
    ],
    implementationSteps: [
      "Define the chatbot job clearly.",
      "Decide what knowledge it can use.",
      "Store messages and conversation state.",
      "Add guardrails for what it should not answer.",
      "Connect tools like CRM lookup, ticket creation, or booking only when safe.",
      "Add handoff to a human.",
    ],
    workflowExample:
      "Website visitor asks question -> chatbot checks FAQ/RAG -> captures lead info -> qualifies need -> offers booking -> escalates if user asks billing or legal question.",
    practicePlan:
      "Design a lead capture chatbot. Include required questions, fallback responses, CRM update, and human handoff conditions.",
    mistakes: [
      "Letting the bot answer questions outside company knowledge.",
      "Not storing conversation history.",
      "Making handoff hard to reach.",
      "Confusing chatbot conversation with backend workflow reliability.",
    ],
    debugging: [
      "Check the exact conversation history sent to the AI.",
      "Check state transitions.",
      "Check whether the bot had the right knowledge.",
      "Review fallback and handoff triggers.",
    ],
    portfolio:
      "Build a chatbot that does one business job well, such as lead capture or support triage. Show conversation state, database records, and handoff behavior.",
  },
  19: {
    plainEnglish:
      "RAG means Retrieval Augmented Generation. In simple words, the system searches your business documents first, then gives the AI only the most relevant pieces so it can answer with company-specific knowledge.",
    whyItMatters:
      "AI models do not automatically know a company's policies, pricing, onboarding steps, or support docs. RAG helps chatbots and assistants answer from real company knowledge instead of guessing.",
    keyIdeas: [
      "Documents are split into chunks so they can be searched.",
      "Embeddings turn chunks into numbers that represent meaning.",
      "A vector database stores those embeddings.",
      "Retrieval finds chunks related to the user's question.",
      "The answer should cite sources and say it does not know when the documents do not contain the answer.",
    ],
    implementationSteps: [
      "Upload or collect documents.",
      "Extract clean text.",
      "Split text into chunks with useful size and overlap.",
      "Create embeddings for each chunk.",
      "Store chunks and metadata in a vector database.",
      "Retrieve relevant chunks and ask AI to answer only from that context.",
    ],
    workflowExample:
      "Customer question -> embed question -> search vector database -> retrieve policy chunks -> AI answers with sources -> create support ticket if answer is unknown.",
    practicePlan:
      "Design a RAG support bot for a small SaaS. Include document types, chunking rules, metadata, retrieval flow, answer rules, and unknown-answer behavior.",
    mistakes: [
      "Uploading messy documents and expecting good answers.",
      "Using chunks that are too large or too small.",
      "Letting AI answer without retrieved context.",
      "Ignoring document permissions.",
    ],
    debugging: [
      "Check whether the right chunks were retrieved.",
      "Check chunk text quality.",
      "Check metadata filters.",
      "Check whether the prompt tells AI to refuse unknown answers.",
    ],
    portfolio:
      "Build a RAG chatbot with visible source references and an I do not know path. This proves you can reduce hallucination risk in business assistants.",
  },
  20: {
    plainEnglish:
      "AI memory means saving useful information from past interactions so the system can use it later. Memory is not magic. It is stored data with rules about what to keep, when to retrieve it, when to update it, and when to delete it.",
    whyItMatters:
      "Memory can make assistants feel more helpful. A sales assistant may remember lead status. An appointment setter may remember a preferred time window. But careless memory can create privacy, accuracy, and trust problems.",
    keyIdeas: [
      "Short-term memory is recent conversation context.",
      "Long-term memory stores facts for later use.",
      "Profile memory stores stable user preferences.",
      "Business object memory stores facts about leads, tickets, appointments, or deals.",
      "Memory must be editable, explainable, and safe.",
    ],
    implementationSteps: [
      "Decide what kind of memory the system needs.",
      "Define what must never be stored.",
      "Store memory with source, timestamp, and confidence.",
      "Retrieve only memory relevant to the current task.",
      "Let users or admins update or delete memory.",
      "Expire stale memory when it may no longer be true.",
    ],
    workflowExample:
      "Lead says they prefer morning calls -> assistant stores preference -> next booking flow retrieves preference -> suggests morning slots -> updates memory after confirmed appointment.",
    practicePlan:
      "Design memory rules for a CRM assistant. Include what to store, what not to store, who can see it, how long it lasts, and how it is updated.",
    mistakes: [
      "Saving everything.",
      "Treating old memory as always true.",
      "Mixing personal memory with business records.",
      "Not giving users control.",
    ],
    debugging: [
      "Check what memory was retrieved.",
      "Check when it was stored and why.",
      "Check whether newer facts should replace older memory.",
      "Check privacy rules before showing memory to another user.",
    ],
    portfolio:
      "Show a small assistant that remembers one useful business preference safely, with visible memory source and an option to update or clear it.",
  },
  21: {
    plainEnglish:
      "Model selection means choosing the right AI model for the job. Cost control means making sure the system can run without wasting money. You do not need the most powerful model for every task.",
    whyItMatters:
      "Clients care about monthly cost, speed, reliability, and output quality. A profitable automation uses strong models where needed and cheaper methods where possible.",
    keyIdeas: [
      "Use smaller models for simple classification and extraction.",
      "Use stronger models for complex reasoning, planning, or high-value writing.",
      "Embeddings are often better than chat models for search.",
      "Caching saves money when users ask the same thing repeatedly.",
      "Batch processing can reduce overhead for large jobs.",
    ],
    implementationSteps: [
      "List every AI task in the workflow.",
      "Estimate input and output tokens for each task.",
      "Choose a model for each task based on quality, cost, and latency.",
      "Add caching for repeated inputs.",
      "Add fallback behavior if a model fails or rate limits.",
      "Track usage per customer or workflow.",
    ],
    workflowExample:
      "Cheap model classifies 1,000 replies -> strong model writes 50 high-value personalized drafts -> embeddings power document search -> dashboard reports daily AI cost.",
    practicePlan:
      "Create a cost estimate for 1,000 lead classifications, 100 CRM note summaries, and 20 complex sales email drafts.",
    mistakes: [
      "Using the most expensive model for simple tasks.",
      "Ignoring output token cost.",
      "Forgetting rate limits.",
      "Not tracking usage per client.",
    ],
    debugging: [
      "Log model name and token usage.",
      "Check whether prompts include unnecessary history.",
      "Check cache hit rate.",
      "Compare output quality across models with the same test set.",
    ],
    portfolio:
      "Include a model routing table and cost estimate in your AI projects. This shows you can build systems that are not only smart, but affordable.",
  },
  22: {
    plainEnglish:
      "Security and safety mean protecting data, secrets, users, and business systems from mistakes or abuse. AI automation can send emails, update CRMs, book meetings, or trigger workflows, so you must design limits.",
    whyItMatters:
      "One unsafe automation can send the wrong message, leak private data, corrupt CRM records, or book the wrong appointment. Businesses need AI systems with guardrails, approvals, audit logs, and permission checks.",
    keyIdeas: [
      "API keys belong in environment variables, not frontend code.",
      "Webhook signatures prove an event really came from the expected service.",
      "Role-based access controls who can see and do things.",
      "Prompt injection is when a user tries to override system rules.",
      "Human approval is required for risky or irreversible actions.",
    ],
    implementationSteps: [
      "List sensitive data and sensitive actions.",
      "Move all secrets to environment variables or a secret manager.",
      "Verify webhooks where possible.",
      "Validate every input and AI output.",
      "Require approval for emails, refunds, bookings, and important CRM changes.",
      "Store audit logs for important actions.",
    ],
    workflowExample:
      "AI drafts refund response -> backend checks policy -> manager approves in Slack -> refund tool runs -> audit log stores approver, time, amount, and reason.",
    practicePlan:
      "Write a safety checklist for an AI appointment setter. Include timezone, confirmation, calendar check, CRM update validation, and human handoff rules.",
    mistakes: [
      "Trusting AI because it sounds confident.",
      "Sending actions directly from AI output.",
      "Exposing API keys.",
      "Ignoring prompt injection attempts.",
    ],
    debugging: [
      "Check permission checks before tool calls.",
      "Check audit logs for who approved an action.",
      "Check webhook signature failures.",
      "Test prompt injection examples intentionally.",
    ],
    portfolio:
      "Show approval flows, audit logs, validation code, and examples of unsafe requests being refused. Safety is a serious career differentiator.",
  },
  23: {
    plainEnglish:
      "Testing means proving your automation works before a real business depends on it. AI systems need normal tests plus tests for messy inputs, failed APIs, duplicate webhooks, invalid AI output, and prompt regressions.",
    whyItMatters:
      "Automation failures can affect customers, sales, and operations. Testing gives you confidence and protects the business from hidden problems.",
    keyIdeas: [
      "Unit tests check small functions.",
      "Integration tests check multiple parts working together.",
      "End-to-end tests check the full user flow.",
      "Mocking lets you test external APIs without calling real services.",
      "Golden examples are saved test cases for prompts and AI outputs.",
    ],
    implementationSteps: [
      "Write tests for validation and business rules first.",
      "Mock AI and external APIs.",
      "Test duplicate webhook handling.",
      "Test failed CRM or Slack calls.",
      "Test invalid AI JSON.",
      "Add regression examples when bugs are found.",
    ],
    workflowExample:
      "Duplicate webhook test -> same event sent twice -> database should have one contact -> Slack alert should be sent once -> audit log should show duplicate ignored.",
    practicePlan:
      "Write a test plan for an appointment setter. Include double booking, timezone mismatch, invalid email, unavailable slot, and CRM update failure.",
    mistakes: [
      "Only testing the happy path.",
      "Calling real external APIs in every test.",
      "Not testing AI output validation.",
      "Ignoring duplicate events.",
    ],
    debugging: [
      "Turn bugs into regression tests.",
      "Use fixed test data for prompts.",
      "Mock slow or flaky services.",
      "Check test logs when failures are intermittent.",
    ],
    portfolio:
      "Add a tests section to your README. Show what failure cases you handle. This signals professional engineering discipline.",
  },
  24: {
    plainEnglish:
      "Deployment means putting your app where users can access it. Operations means keeping it healthy after deployment. Local code is only the beginning. Production needs secrets, logs, monitoring, backups, HTTPS, workers, and rollback plans.",
    whyItMatters:
      "A client does not benefit from a project that only runs on your laptop. They need the frontend, backend, database, workers, scheduled jobs, and automation tools running reliably.",
    keyIdeas: [
      "Docker packages an app with the environment it needs.",
      "Environment variables keep config separate from code.",
      "Workers run background jobs.",
      "Monitoring tells you when something breaks.",
      "Backups protect business data.",
      "CI/CD helps deploy changes safely.",
    ],
    implementationSteps: [
      "Write local setup instructions.",
      "Create production environment variables.",
      "Deploy frontend and backend.",
      "Deploy database, queue, workers, and schedulers if needed.",
      "Add logging, error tracking, health checks, and alerts.",
      "Document rollback and backup steps.",
    ],
    workflowExample:
      "GitHub push -> CI runs tests -> build Docker image -> deploy backend -> deploy worker -> run migrations -> frontend build deploys -> health check passes.",
    practicePlan:
      "Write a production checklist for a FastAPI backend, PostgreSQL database, Redis worker, React dashboard, and n8n instance.",
    mistakes: [
      "Deploying without environment variables documented.",
      "No logs or alerts.",
      "No database backups.",
      "No rollback plan.",
    ],
    debugging: [
      "Check deployment logs first.",
      "Check environment variables.",
      "Check health endpoints.",
      "Check worker status separately from web server status.",
    ],
    portfolio:
      "Include deployment instructions and a production checklist. A deployed project is much stronger than a local-only demo.",
  },
  25: {
    plainEnglish:
      "Sales automation is using systems to help a business turn leads into customers. It includes lead capture, qualification, scoring, follow-up, booking, CRM updates, pipeline tracking, and reporting.",
    whyItMatters:
      "Many businesses pay for automation because they want more booked calls, faster follow-up, fewer missed leads, and better sales visibility. Knowing sales language helps you build what owners actually care about.",
    keyIdeas: [
      "Speed-to-lead means how fast a business contacts a new lead.",
      "Qualification decides whether a lead is a good fit.",
      "Lead nurture means follow-up over time.",
      "Pipeline stages show where deals are in the sales process.",
      "Attribution helps the business know where leads came from.",
    ],
    implementationSteps: [
      "Map the sales funnel from lead source to closed deal.",
      "Find manual delays and missed follow-ups.",
      "Automate capture, qualification, routing, and reminders.",
      "Keep humans involved for high-value conversations.",
      "Track response time, booked calls, no-shows, and close rate.",
      "Report results in a dashboard.",
    ],
    workflowExample:
      "Ad lead -> instant SMS/email -> AI qualification -> hot lead alert -> calendar booking -> CRM opportunity -> follow-up reminders -> sales dashboard.",
    practicePlan:
      "Interview an imaginary business owner. Write the questions you would ask about leads, response time, CRM, follow-up, booking, and reporting.",
    mistakes: [
      "Talking only about AI instead of revenue outcomes.",
      "Automating follow-up without respecting opt-outs.",
      "Ignoring sales reps' actual workflow.",
      "Not measuring conversion impact.",
    ],
    debugging: [
      "Check where leads are dropping out.",
      "Check response time data.",
      "Check CRM stage updates.",
      "Compare automation logs with sales outcomes.",
    ],
    portfolio:
      "Frame your sales automation projects around business outcomes: faster response, more booked calls, cleaner CRM data, and better reporting.",
  },
  26: {
    plainEnglish:
      "Real-world projects turn the curriculum into proof. A project should not be a toy. It should start with a business problem, define requirements, design the system, build the workflow, handle failure, test behavior, deploy, and explain the value.",
    whyItMatters:
      "Clients and employers trust evidence. A polished project with a clear business case, working demo, architecture diagram, tests, and README is stronger than a list of courses.",
    keyIdeas: [
      "Requirements explain what the system must do.",
      "System design explains the parts and how they connect.",
      "Database schema explains what data is stored.",
      "Prompt design explains how AI is controlled.",
      "Testing and deployment show the project is serious.",
    ],
    implementationSteps: [
      "Pick one business problem.",
      "Write user stories and requirements.",
      "Draw the workflow and architecture.",
      "Build the smallest useful version.",
      "Add logs, failures, and tests.",
      "Write a README and portfolio case study.",
    ],
    workflowExample:
      "AI lead qualification project -> form receives lead -> backend validates -> AI scores -> database stores lead -> CRM updates -> Slack alerts -> failed jobs are visible -> README explains business value.",
    practicePlan:
      "Choose one of the eight projects. Write the business problem, requirements, schema, workflow, API design, AI prompt, testing plan, deployment plan, and portfolio explanation before coding.",
    mistakes: [
      "Building a UI without the core automation working.",
      "Skipping failure handling.",
      "Not explaining the business value.",
      "Trying to build all eight projects at once.",
    ],
    debugging: [
      "Test each project step separately.",
      "Use fake external APIs first.",
      "Log every important workflow event.",
      "Keep a known demo dataset.",
    ],
    portfolio:
      "Make each project a case study. Show the business problem, the workflow, screenshots, architecture, code highlights, tests, deployment, and what you would improve next.",
  },
  27: {
    plainEnglish:
      "Portfolio and client readiness means presenting your skills in a way people can trust. You need READMEs, demos, case studies, workflow diagrams, scope estimates, discovery questions, and honest explanations of what your systems can and cannot do.",
    whyItMatters:
      "Getting hired or winning clients is not only about coding. People need to understand the business value, the reliability of your work, and whether you can communicate clearly.",
    keyIdeas: [
      "A README explains how the project works and how to run it.",
      "A case study explains the before and after business process.",
      "A demo video shows the workflow in action.",
      "Discovery questions help you understand a client before building.",
      "Scope control prevents overpromising.",
    ],
    implementationSteps: [
      "Document every portfolio project with problem, solution, architecture, setup, and demo steps.",
      "Write a short business-value summary.",
      "Create a workflow diagram.",
      "Record a short demo video or screenshot walkthrough.",
      "Prepare discovery questions for client calls.",
      "Write maintenance and handoff notes.",
    ],
    workflowExample:
      "Client asks for AI automation -> discovery questions -> workflow map -> scope proposal -> build small version -> test with real examples -> deploy -> handoff docs -> maintenance plan.",
    practicePlan:
      "Write a case study for an AI lead routing system. Include the business problem, workflow, tools used, failure handling, measurable value, and how you would explain it in a client meeting.",
    mistakes: [
      "Showing code without explaining business value.",
      "Overpromising what AI can safely do.",
      "Not asking enough discovery questions.",
      "Leaving clients without handoff instructions.",
    ],
    debugging: [
      "If a client is confused, simplify the workflow explanation.",
      "If scope is growing, return to the original business goal.",
      "If the demo fails, use logs and a known test dataset.",
      "If pricing is unclear, break the project into phases.",
    ],
    portfolio:
      "Your portfolio should make a reviewer think: this person can understand a business problem, design an automation, build it, deploy it, debug it, and explain it clearly.",
  },
};

export const curriculum: CurriculumPart[] = seeds.map((seed) => {
  if (seed.partNumber === 1) {
    return createPart(seed, partOneLessons);
  }

  if (seed.partNumber === 2) {
    return createPart(seed, partTwoLessons);
  }

  if (seed.partNumber === 3) {
    return createPart(seed, partThreeLessons);
  }

  if (seed.partNumber === 26) {
    return createPart(seed, undefined, undefined, project26Projects);
  }

  return createPart(seed);
});
