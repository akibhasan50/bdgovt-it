import fs from "node:fs";
import path from "node:path";

// ── parse ────────────────────────────────────────────────────────────────
function splitSections(source) {
  const lines = source.split("\n");
  const raw = [];
  let cur = null;
  let inCode = false;
  for (const line of lines) {
    if (/^```/.test(line)) inCode = !inCode;
    if (!inCode && /^##\s+/.test(line)) {
      if (cur) raw.push(cur);
      cur = { title: line.replace(/^##\s+/, "").trim(), body: [] };
      continue;
    }
    if (cur) cur.body.push(line);
  }
  if (cur) raw.push(cur);
  return raw;
}

function parseQuestions(source) {
  const qs = [];
  for (const sec of splitSections(source)) {
    const parts = sec.body.join("\n").split(/\n(?=\*\*Q\d+:)/);
    for (const part of parts) {
      const header = part.match(/^\*\*Q(\d+):\s*([\s\S]*?)\*\*/);
      if (!header) continue;
      const question = header[2].replace(/\\_/g, "_").replace(/\s+/g, " ").trim();
      const options = [...part.matchAll(/^- \*\*\(([A-E])\)\*\*\s*(.+)$/gm)].map((m) => m[2].trim());
      const answerLine = part.match(/\*\*Answer:\*\*\s*(.+)/);
      const answerRaw = (answerLine?.[1] ?? "").replace(/\*\*/g, "").trim();
      let letter = answerRaw.match(/^\(([A-E])\)/)?.[1];
      if (!letter) letter = answerRaw.match(/\(([A-E])\)/)?.[1];
      if (!letter) letter = answerRaw.match(/^([A-E])(?=[\s.)])/)?.[1];
      const answerIdx = letter ? letter.charCodeAt(0) - 65 : -1;
      const expMatch = part.match(/\*\*Explanation:\*\*\s*([\s\S]*?)(?=\n\s*\n\s*\*\*Q\d+:|\n\s*\n\s*- \*\*\(|$)/);
      const explanation = (expMatch?.[1] ?? "").replace(/\*\*/g, "").replace(/\n+/g, " ").replace(/\s+/g, " ").trim();
      qs.push({ qNo: Number(header[1]), question, options, answerIdx, answerRaw, explanation });
    }
  }
  return qs;
}

// ── keyword rules (en + bn) ──────────────────────────────────────────────
const RULES = {
  "digital-logic-design": [
    "logic gate", "boolean", "k-map", "kmap", "karnaugh", "flip-flop", "flip flop", "latch",
    "multiplexer", "demultiplexer", "decoder", "encoder", "adder", "subtractor", "parity",
    "truth table", "de morgan", "two's complement", "twos complement", "excess-3", "gray code",
    "shift register", "combinational", "sequential circuit", "nand", "xnor", "half adder",
    "full adder", "mod-", "bistable", "oscillator", "rectifier", "diode", "transistor",
    "op-amp", "counter" , "sop", "pos", "universal gate", "xor", "led", "7-segment",
    "লজিক", "বুলিয়ান", "ফ্লিপ", "অ্যাডার", "মাল্টিপ্লেক্সার", "প্যারিটি", "flip", "ট্রানজিস্টর", "ডায়োড", "রেক্টিফায়ার",
    "number system", "octal", "hexadecimal", "binary number", "bcd", "ascii", "boolean algebra",
    "logic operation", "logic expression", "and gate", "or gate", "not gate", "flipflop",
    "don't care", "dont care", "absorption law", "minterm", "maxterm", "canonical", "truth value",
    "বিসিডি", "বাইনারি", "বিট সংখ্যা", "টুস কমপ্লিমেন্ট",
  ],
  "object-oriented-programming": [
    "inheritance", "polymorphism", "encapsulation", "abstraction", "constructor", "destructor",
    "virtual function", "override", "overloading", "operator overloading", "abstract class",
    "friend function", "derived class", "base class", "subclass", "superclass", "interface",
    "instance", "java", "c++", "oop", "multiple inheritance", "diamond", "vtable",
    "ইনহেরিট্যান্স", "পলিমরফিজম", "এনক্যাপসুলেশন", "অ্যাবস্ট্রাকশন", "কনস্ট্রাক্টর", "ক্লাস", "অবজেক্ট",
  ],
  "data-structures": [
    "stack", "queue", "linked list", "linkedlist", "binary tree", "bst", "traversal", "inorder",
    "preorder", "postorder", "postfix", "prefix notation", "avl", "adjacency", "topological",
    "priority queue", "hash table", "hashing", "deque", "node", "tree", "graph", "heap",
    "expression tree", "circular queue", "push", "pop", "singly", "doubly",
    "স্ট্যাক", "কিউ", "লিংকড", "লিস্ট", "গ্রাফ", "হ্যাশ", "হিপ",
  ],
  daa: [
    "algorithm", "big o", "o(n", "o(log", "time complexity", "space complexity", "divide and conquer",
    "dynamic programming", "greedy", "np-complete", "np-hard", "halting", "sorting", "sort",
    "binary search", "recurrence", "amortized", "backtracking", "branch and bound", "quicksort",
    "bubble sort", "merge sort", "insertion sort", "selection sort", "linear search", "complexity",
    "lower bound", "optimal", "greedy method",
    "অ্যালগরিদম", "সর্টিং", "সার্চিং", "জটিলতা",
  ],
  dbms: [
    "database", "er diagram", "entity", "relationship", "normalization", "normal form",
    "functional dependency", "1nf", "2nf", "3nf", "bcnf", "acid", "transaction", "relational model",
    "dbms", "primary key", "foreign key", "candidate key", "view", "schema", "degree of relation",
    "cardinality", "multivalued", "decomposition", "lossless", "join dependency", "concurrency control",
    "ডাটাবেস", "স্বাভাবিকীকরণ", "এনটিটি", "রিলেশন", "প্রাইমারি কী", "ফরেন কী", "ট্রানজাকশন",
  ],
  sql: [
    "sql", "select", "group by", "having", "join", "inner join", "outer join", "trigger",
    "left join", "right join", "aggregate", "avg(", "count(", "sum(", "max(", "min(", "union", "truncate", "drop table",
    "subquery", "dml", "ddl", "index", "query", "tuple", "clause", "order by", "like operator",
    "এসকিউএল", "কোয়েরি", "জয়েন", "সিলেক্ট",
  ],
  "programming-questions": [
    "find output", "what is the output", "output of", "predict the output", "program", "function",
    "pointer", "recursion", "factorial", "fibonacci", "palindrome", "string", "loop", "switch case",
    "call by", "printf", "cout", "cin", "main()", "sizeof", "variable", "data type", "syntax",
    "compile", "compiler", "header file", "array", "strcpy", "strlen", "malloc", "scope",
    "return", "argument", "parameter", "swap", "prime", "grep?" ,
    "আউটপুট", "প্রোগ্রাম", "ফাংশন", "পয়েন্টার", "ভেরিয়েবল", "স্ট্রিং", "লুপ",
    "#include", "stdio", "print(", "python", "pascal", "delphi", "visual basic", "pseudocode",
    "what will print", "code snippet", "block of code",
  ],
  microprocessor: [
    "8085", "8086", "8051", "microprocessor", "opcode", "addressing mode", "instruction cycle",
    "fetch cycle", "interrupt", "registers", "ax", "bx", "dx", "si", "di", "flag register",
    "mnemonic", "assembler", "dma", "bus", "pin", "machine cycle", "t-state", "stack pointer",
    "program counter", "accumulator", "tri-state", "intel", "x86", "segment register",
    "মাইক্রোপ্রসেসর", "ইন্টারাপ্ট", "নির্দেশনা", "অপকোড",
    "machine language", "assembly language", "object code", "executable",
  ],
  "linux-commands": [
    "linux", "unix", "chmod", "chown", "grep", "ls ", "cd ", "mkdir", " pipe", "| ", "shell",
    "awk", "sed", "kill", " ps", "top ", "symlink", "crontab", "sudo", "bash", "terminal",
    "command", "file permission", "rmdir", "cat ", "touch", "mv ", "cp ", "find ", "tar",
    " chmod", " umask", "kernel",
    "লিনাক্স", "ইউনিক্স", "কমান্ড", "শেল", "পারমিশন",
  ],
  "computer-networks": [
    "network", "topology", "osi", "tcp", "udp", "routing", "router", "switch", "vlan", "subnet",
    "dns", "dhcp", "ethernet", "wifi", "wireless", "gateway", "collision domain", "broadcast",
    "arp", "icmp", "ping", "socket", "lan", "wan", "bandwidth", "latency", "throughput",
    "protocol", "packet", "cable", "fiber", "hub", "bridge", "ip address", "ipv4", "ipv6",
    "mac address", "csma", "repeater", "modem", "mpls", "bgp", "ospf", "nat", "vpn",
    "নেটওয়ার্ক", "টোপোলজি", "প্রোটোকল", "প্যাকেট", "ব্যান্ডউইথ", "আইপি", "রাউটার",
    "satellite", "propagation delay", "transmission", "submarine", "telecommunication", "Mbps",
    "5g", "4g", "gsm", "cdma", "frequency", "antenna", "duplex", "optical fiber", "optical fibre",
    "অপটিক্যাল ফাইবার", "guided", "unguided",
  ],
  os: [
    "operating system", "process", "thread", "scheduler", "scheduling", "deadlock", "semaphore",
    "mutex", "mutual exclusion", "paging", "segmentation", "virtual memory", "thrashing",
    "starvation", "fork", "context switch", "kernel", "cpu scheduling", "round robin", "fcfs",
    "sjf", "priority scheduling", "demand paging", "page fault", "reentrancy", "race condition",
    "preempt", "multitasking", "monolithic", "microkernel", "system call",
    "burst time", "gantt", "turnaround", "time quantum", "page replacement", "belady",
    "cache", "hyper-threading", "hyperthreading", "multiprogramming", "logical memory",
    "main memory", "memory hierarchy", "ram", "rom", "swap", "lru", "optimal", "belady",
    "অপারেটিং সিস্টেম", "প্রসেস", "থ্রেড", "শিডিউলার", "ডেডলক", "সিমাফোর", "পেজিং",
  ],
  "data-center": [
    "data center", "datacenter", "server rack", "rack", "ups", "cooling", "hvac", "virtualization",
    "hypervisor", "vmware", "container", "raid", "replication", "fault tolerance", "redundancy",
    "high availability", "blade server", "tia-942", "pdu", "hot aisle", "colocation", "on-premises",
    "storage", "nas", "san", "backup", "disaster recovery", "failover", "compact disk", "cd-rom", "dvd",
    "ডেটা সেন্টার", "সার্ভার", "র‍্যাক", "ভার্চুয়ালাইজেশন", "কুলিং", "ইউপিএস",
  ],
  "software-engineering": [
    "software", "sdlc", "waterfall", "agile", "scrum", "spiral", "requirement", "use case",
    "uml", "testing", "black box", "white box", "unit test", "integration test", "version control",
    "maintenance", "cohesion", "coupling", "refactoring", "prototype model", "rad", "cmmi",
    "quality", "debugging", "feasibility", "srs", "system design", "modular", "structured design",
    "code review", "regression", "agile manifesto", "extreme programming", "devops",
    "সফটওয়্যার", "পরীক্ষা", "টেস্টিং", "রিকোয়ারমেন্ট",
  ],
  "computer-security": [
    "security", "encrypt", "decrypt", "firewall", "antivirus", "malware", "virus", "worm",
    "trojan", "phishing", "hacking", "hacker", "cryptograph", "aes", "rsa", "authentication",
    "authorization", "intrusion", "vulnerability", "spyware", "ransomware", "cyber", "cipher",
    "digital signature", "certificate", "pki", "brute force", "ddos", "dos attack", "ssl",
    "tls", "password", "integrity", "confidentiality", "session hijack",
    "sql injection", "xss", "rootkit", "botnet",
    "নিরাপত্তা", "এনক্রিপশন", "ডিক্রিপশন", "ফায়ারওয়াল", "ভাইরাস", "হ্যাকিং", "পাসওয়ার্ড",
    "cybersecurity", "cyber security", "ict act", "digital certificate", "one time password", "otp",
    "digitally sign", "signature", "attacker", "intercept", "replay", "man-in-the-middle", "impersonat",
  ],
  "cloud-computing": [
    "cloud", "iaas", "paas", "saas", "aws", "azure", "elasticity", "on-demand", "serverless",
    "sla", "private cloud", "public cloud", "hybrid cloud", "multi-tenant", "multitenancy",
    "pay as you go", "cloud storage", "cloud service", "cloud computing", "auto scaling",
    "microservice",
    "ক্লাউড", "ইআস, " ,
  ],
  "ml-ai": [
    "machine learning", "artificial intelligence", "neural network", "deep learning", "dataset",
    "supervised", "unsupervised", "overfitting", "tensorflow", "nlp", "big data", "hadoop",
    "data mining", "perceptron", "reinforcement", "k-means", "clustering", "precision", "recall",
    "regression model", "training data", "test data", "classification model", "decision tree",
    "gradient", "epoch", "chatbot", "expert system", "robotics", "natural language",
    "মেশিন লার্নিং", "কৃত্রিম বুদ্ধিমত্তা", "নিউরাল", "বিগ ডেটা",
  ],
  "web-technologies": [
    "html", "css", "javascript", "browser", "dom", "xml", "json", "url", "php", "ajax",
    "cookie", "session", "web page", "website", "tag", "web server", "http", "https", "ftp",
    "responsive", "bootstrap", "react", "frontend", "backend", "web design", "iframe",
    "attribute", "element", "markdown", "api", "rest",
    "হিটিএমএল", "সিএসএস", "জাভাস্ক্রিপ্ট", "ব্রাউজার", "ওয়েব",
    "search engine", "xslt", "xpath", "file extension", "image file", "video file", "mime",
    "first computer", "www", "website is", "e-commerce", "webcam", "internet",
    "ফাইল এক্সটেনশন", "সার্চ ইঞ্জিন",
  ],
  "theory-of-computation": [
    "automata", "finite automaton", "dfa", "nfa", "pumping lemma", "grammar", "chomsky",
    "turing machine", "decidable", "undecidable", "halting problem", "context free", "cfl",
    "epsilon", "ε-transition", "regular language", "regular expression", "linear bounded",
    "post correspondence", "greibach", "myhill", "moore machine", "mealy",
    "অটোমেটা", "টিউরিং", "ব্যাকার-নরম্যান",
  ],
  "discrete-math": [
    "permutation", "combination", "probability", "binomial", "pigeonhole", "set theory",
    "subset", "venn", "modular", "gcd", "divisibility", "propositional", "predicate logic",
    "counting", "factorial", "graph theory", "euler", "hamiltonian", "relation", "equivalence",
    "symmetric", "transitive", "reflexive", "recurrence relation",
    "গাণিতিক", "সম্ভাবনা", "পারমুটেশন", "কম্বিনেশন", "সেট",
    "binary strings", "bit strings", "in how many ways", "at random", "coin", "dice",
    "contrapositive", "logically equivalent", "truth table",
  ],
};

function esc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
function kwHit(text, kwRaw) {
  const kw = kwRaw.trim();
  if (!kw) return false;
  if (kw.includes(" ")) return text.includes(kw);
  if (/[^\x00-\x7f]/.test(kw)) {
    const left = /[\u0980-\u09ff0-9a-z]/i.test(kw[0]) ? `(^|[^\u0980-\u09ffa-z0-9])` : "";
    const right = /[\u0980-\u09ff0-9a-z]/i.test(kw[kw.length - 1]) ? `([^\u0980-\u09ffa-z0-9]|$)` : "";
    return new RegExp(`${left}${esc(kw)}${right}`, "i").test(text);
  }
  const left = /[a-z0-9]/i.test(kw[0]) ? `(^|[^a-z0-9])` : "";
  const right = /[a-z0-9]/i.test(kw[kw.length - 1]) ? `([^a-z0-9]|$)` : "";
  return new RegExp(`${left}${esc(kw)}${right}`, "i").test(text);
}
const OVERRIDES = {
  "49-bcs-computer-science-2025-mcq:61": "discrete-math",
  "bangladesh-bank-assistant-programmer-2023-mcq:19": "os",
  "bcic-assistant-programmer-2022:13": "web-technologies",
  "bdccl-assistant-manager-transmission-2022:11": "digital-logic-design",
  "bdccl-assistant-manager-transmission-2022:12": "digital-logic-design",
  "bdccl-assistant-manager-transmission-2022:26": "digital-logic-design",
  "bdccl-assistant-manager-transmission-2023-mcq:11": "digital-logic-design",
  "bdccl-assistant-manager-transmission-2023-mcq:12": "digital-logic-design",
  "bdccl-assistant-manager-transmission-2023-mcq:26": "digital-logic-design",
  "bpsc-different-ministry-ame-2022:23": null,
  "bpsc-different-ministry-ame-2022:28": "digital-logic-design",
  "bpsc-different-ministry-ame-2022:36": null,
  "bpsc-different-ministry-ame-2022:52": null,
  "bpsc-different-ministry-ap-2022:7": null,
  "bpsc-different-ministry-ap-2022:24": "data-center",
  "bpsc-different-ministry-ap-2022:47": "web-technologies",
  "breb-assistant-programmer-2023-mcq:14": "digital-logic-design",
  "breb-assistant-programmer-2023-mcq:17": "digital-logic-design",
  "combined-bank-senior-officer-it-2025-mcq:6": "digital-logic-design",
  "combined-bank-senior-officer-it-2025-mcq:8": "os",
  "combined-bank-senior-officer-it-2025-mcq:13": "programming-questions",
  "combined-bank-senior-officer-it-2025-mcq:24": "digital-logic-design",
  "npcbl-executive-trainee-software-2023-mcq:28": "digital-logic-design",
  "pyq-dl:40": "digital-logic-design",
  "pyq-dl:45": "digital-logic-design",
  "pyq-dl:47": "digital-logic-design",
  "rupali-bank-ane-2021-mcq:28": "digital-logic-design",
  "combined-bank-assistant-programmer-2024-mcq:34": "computer-networks",
  "bpsc-different-ministry-ap-2022:54": null,
  "bpsc-different-ministry-ap-2022:77": null,
  "sonali-janata-bank-ada-2021-mcq:44": "web-technologies",
  "combined-bank-officer-it-2026-mcq:2": "computer-security",
  "49-bcs-computer-science-2025-mcq:90": "dbms",
  "combined-bank-senior-officer-it-2024-mcq:67": "digital-logic-design",
  "bpsc-instructor-technical-training-centers-2022:78": null,
  "bcic-assistant-programmer-2022:26": null,
  "49-bcs-computer-science-2025-mcq:39": "daa",
  "49-bcs-computer-science-2025-mcq:50": "daa",
  "bpsc-different-ministry-ap-2022:34": "computer-networks",
  "bdccl-assistant-manager-transmission-2022:25": "computer-networks",
  "bdccl-assistant-manager-transmission-2023-mcq:25": "computer-networks",
  "bangladesh-bank-assistant-programmer-2023-mcq:18": "programming-questions",
  "combined-bank-senior-officer-it-2024-mcq:85": "programming-questions",
  "6-banks-financial-institutions-assistant-programmer-2021-mcq:15": "programming-questions",
  "bangladesh-bank-assistant-maintenance-engineer-2023-mcq:12": "dbms",
  "rupali-bank-ane-2021-mcq:25": "computer-security",
  "combined-bank-senior-officer-it-2024-mcq:59": "ml-ai",
  "combined-bank-assistant-programmer-2024-mcq:12": "ml-ai",
  "bpsc-different-ministry-ame-2022:35": "microprocessor",
  "combined-bank-officer-it-2026-mcq:27": "computer-security",
  "bpsc-different-ministry-ame-2022:38": null,
  "bpsc-different-ministry-ame-2022:31": null,
  "49-bcs-computer-science-2025-mcq:92": "software-engineering",
  "bangladesh-bank-assistant-director-ict-2025-mcq:20": "web-technologies",
  "sonali-janata-bank-ada-2021-mcq:41": "computer-security",
  "sonali-janata-bank-ada-2021-mcq:43": "dbms",
  "sonali-janata-bank-ada-2021-mcq:52": "dbms",
  "breb-assistant-programmer-2023-mcq:11": "ml-ai",
  "combined-bank-officer-it-2026-mcq:48": "web-technologies",
  "sonali-janata-bank-ada-2021-mcq:36": "data-center",
  "combined-bank-senior-officer-it-2025-mcq:16": "data-center",
  "combined-bank-senior-officer-it-2025-mcq:2": "computer-networks",
  "bpsc-different-ministry-ame-2022:33": null,
  "btcl-junior-assistant-manager-2022:1": null,
  "combined-bank-officer-it-2026-mcq:31": "computer-security",
  "breb-assistant-programmer-2023-mcq:4": "data-structures",
  "sonali-janata-bank-ada-2021-mcq:38": "sql",
  "combined-bank-officer-it-2026-mcq:57": "sql",
  "sonali-janata-bank-ada-2021-mcq:56": "sql",
  "bpsc-different-ministry-ap-2022:23": "sql",
  "bpsc-different-ministry-ap-2022:31": null,
  "npcbl-executive-trainee-software-2023-mcq:15": "data-structures",
  "bangladesh-bank-assistant-maintenance-engineer-2023-mcq:21": "computer-networks",
  "combined-bank-senior-officer-it-2025-mcq:23": "os",
  "rupali-bank-ane-2021-mcq:9": "computer-networks",
  "49-bcs-computer-science-2025-mcq:56": "computer-networks",
  "49-bcs-computer-science-2025-mcq:95": "sql",
  "sonali-janata-bank-ada-2021-mcq:22": "dbms",
  "pyq-dl:37": "digital-logic-design",
  "breb-assistant-programmer-2023-mcq:5": null,
  "combined-bank-senior-officer-it-2024-mcq:44": "theory-of-computation",
  "bangladesh-bank-assistant-director-ict-2025-mcq:13": "os",
  "bangladesh-bank-assistant-director-ict-2025-mcq:30": null,
  "49-bcs-computer-science-2025-mcq:96": "daa",
  "49-bcs-computer-science-2025-mcq:38": "os",
  "49-bcs-computer-science-2025-mcq:91": "os",
  "49-bcs-computer-science-2025-mcq:97": "os",
  "49-bcs-computer-science-2025-mcq:80": "daa",
  "49-bcs-computer-science-2025-mcq:18": "discrete-math",
  "bpsc-different-ministry-ame-2022:29": "digital-logic-design",
  "btcl-junior-assistant-manager-2022:13": null,
  "btcl-junior-assistant-manager-2022:44": "web-technologies",
  "combined-bank-senior-officer-it-2024-mcq:70": "digital-logic-design",
  "bangladesh-bank-assistant-maintenance-engineer-2023-mcq:9": "digital-logic-design",
};

function classify(q) {
  const ov = OVERRIDES[`${q.paper}:${q.qNo}`];
  if (ov !== undefined) return { topic: ov, score: 99, alts: [], kws: ["OVERRIDE"], override: true };
  const text = `${q.question} ${q.explanation} ${q.options.join(" ")}`.toLowerCase();
  const scores = {};
  const hits = {};
  for (const [topic, kws] of Object.entries(RULES)) {
    let s = 0;
    const h = [];
    for (const kw of kws) {
      if (kw.endsWith("?")) continue;
      if (kwHit(text, kw.toLowerCase())) { s += kw.includes(" ") ? 2 : 1; h.push(kw); }
    }
    if (s > 0) { scores[topic] = s; hits[topic] = h; }
  }
  const ranked = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  if (ranked.length === 0) return { topic: null, score: 0, alts: [], kws: [] };
  const [best, bestScore] = ranked[0];
  return { topic: best, score: bestScore, kws: hits[best],
    alts: ranked.length > 1 ? ranked.slice(1).filter(([,s]) => s >= bestScore * 0.75).map(([t]) => t) : [] };
}


// ── generate src/lib/data/paper-mcqs.ts ──────────────────────────────────
import { bankPapers } from "./src/lib/data/banks.ts";

const metaBySlug = new Map(bankPapers.map((p) => [p.slug, p]));

const unescapeMdx = (t) =>
  t.replace(/\\([{}<>#$*_.()[\]!|~`])/g, "$1");
const clean = (t) =>
  unescapeMdx(t)
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\*\*/g, "")
    .replace(/\s+/g, " ")
    .trim();
const norm = (t) =>
  clean(t).toLowerCase().replace(/[^a-z0-9\u0980-\u09ff]+/g, " ").trim();
const loc = (s) => JSON.stringify({ en: s, bn: s });

const dir = "content/banks";
const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
const allParsed = [];
const formIds = [];
for (const f of files) {
  const source = fs.readFileSync(path.join(dir, f), "utf8");
  const slug = f.replace(/\.mdx$/, "");
  for (const q of parseQuestions(source)) {
    if (q.options.length >= 4) {
      formIds.push(`paper-${slug}-q${q.qNo}`);
      if (q.answerIdx >= 0 && q.answerIdx < q.options.length) {
        allParsed.push({ ...q, paper: slug, topic: classify({ ...q, paper: slug }).topic });
      }
    }
  }
}

const moved = allParsed.filter((q) => q.topic); // IT MCQs -> /practice
const kept = allParsed.filter((q) => !q.topic); // non-IT MCQs -> stay in Written

// dedupe moved by normalized question text; prefer the copy with an explanation
const byNorm = new Map();
for (const q of moved) {
  const k = norm(q.question);
  const prev = byNorm.get(k);
  if (!prev || (!prev.explanation && q.explanation)) byNorm.set(k, q);
}
const unique = [...byNorm.values()];

const perTopic = {};
for (const q of unique) perTopic[q.topic] = (perTopic[q.topic] ?? 0) + 1;

const entries = unique.map((q) => {
  const meta = metaBySlug.get(q.paper);
  const source = meta ? `${meta.exam} · ${meta.year}` : q.paper;
  return [
    "  {",
    `    id: ${JSON.stringify(`paper-${q.paper}-q${q.qNo}`)},`,
    `    topic: ${JSON.stringify(q.topic)},`,
    `    question: ${loc(clean(q.question))},`,
    `    options: [${q.options.map((o) => loc(clean(o))).join(", ")}],`,
    `    answer: ${q.answerIdx},`,
    `    explanation: ${loc(clean(q.explanation))},`,
    '    difficulty: "medium",',
    `    source: ${JSON.stringify(source)},`,
    "  },",
  ].join("\n");
});

const movedIds = moved.map((q) => `paper-${q.paper}-q${q.qNo}`);
const idList = (ids) => `[${ids.map((i) => JSON.stringify(i)).join(", ")}]`;

const out = `// AUTO-GENERATED by \`node build-paper-mcqs.mjs\` — do not edit by hand.
// MCQ-form questions lifted out of content/banks/*.mdx and topic-classified.
// Re-run the script after editing bank content.
import type { MCQ } from "@/lib/types";

export const paperMcqs: MCQ[] = [
${entries.join("\n")}
];

/** Paper questions that moved into the MCQ section — skip them in Written Q&A tables. */
export const movedPaperQIds = new Set<string>(${idList(movedIds)});

/** Every MCQ-form question in paper content (moved + non-IT ones that stay in Written). */
export const mcqFormPaperQIds = new Set<string>(${idList(formIds)});
`;
fs.writeFileSync("src/lib/data/paper-mcqs.ts", out);

console.log("\n── generation ──");
console.log("parsed MCQ-form:", allParsed.length, "| moved (IT):", moved.length, "| kept (non-IT):", kept.length);
console.log("unique after dedupe:", unique.length, "| dropped dups:", moved.length - unique.length);
console.log("per-topic:");
for (const [t, n] of Object.entries(perTopic).sort((a, b) => b[1] - a[1])) console.log(`  ${t}: ${n}`);
console.log("wrote src/lib/data/paper-mcqs.ts", (out.length / 1024).toFixed(0) + " KB");
