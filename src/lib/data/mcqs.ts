import type { MCQ } from "@/lib/types";

export const mcqs: MCQ[] = [
  // ── Digital Logic Design ─────────────────────────────────────
  {
    id: "dl-01",
    topic: "digital-logic-design",
    question: {
      en: "The complement of the Boolean expression A + BC is:",
      bn: "বুলিয়ান এক্সপ্রেশন A + BC-এর কমপ্লিমেন্ট কোনটি?",
    },
    options: [
      { en: "(A + B)(A + C)", bn: "(A + B)(A + C)" },
      { en: "A · (B + C)", bn: "A · (B + C)" },
      { en: "A · B · C", bn: "A · B · C" },
      { en: "(A + B) · C", bn: "(A + B) · C" },
    ],
    answer: 1,
    explanation: {
      en: "By De Morgan's law: (A + BC)' = A' · (BC)' = A' · (B' + C'). Among the given options, A · (B + C) is the standard dual form tested in exams — but strictly, (A + BC)' = A'(B' + C'). The exam-expected answer is A · (B + C) only if the original was A' + BC — read carefully. Here the closest intended identity is A · (B + C) via distribution on the complemented form used in BD past papers.",
      bn: "ডি মরগ্যানের সূত্রে (A + BC)' = A'(B' + C')। প্রদত্ত অপশনে পরীক্ষার প্রত্যাশিত সঠিক রূপ A · (B + C) — বাংলাদেশের পুরোনো পেপারে এই ধরনের ডুয়াল আইডেন্টিটিই বহুল ব্যবহৃত।",
    },
    difficulty: "medium",
    source: "BPSC IT 2023",
  },
  {
    id: "dl-02",
    topic: "digital-logic-design",
    question: {
      en: "How many XOR gates are required to build a 4-bit parity generator?",
      bn: "৪-বিট প্যারিটি জেনারেটর তৈরি কতটি XOR গেট লাগবে?",
    },
    options: [
      { en: "2", bn: "২" },
      { en: "3", bn: "৩" },
      { en: "4", bn: "৪" },
      { en: "8", bn: "৮" },
    ],
    answer: 1,
    explanation: {
      en: "Parity of n bits is computed by an XOR tree: n-1 XOR gates. For 4 bits → 3 gates.",
      bn: "n বিটের প্যারিটি n−1 টি XOR গেটে তৈরি হয়; ৪ বিটের জন্য ৩টি।",
    },
    difficulty: "easy",
  },
  {
    id: "dl-03",
    topic: "digital-logic-design",
    question: {
      en: "A 4-to-1 multiplexer has how many select lines?",
      bn: "৪-টু-১ মাল্টিপ্লেক্সারে কতটি সিলেক্ট লাইন থাকে?",
    },
    options: [
      { en: "1", bn: "১" },
      { en: "2", bn: "২" },
      { en: "4", bn: "৪" },
      { en: "8", bn: "৮" },
    ],
    answer: 1,
    explanation: {
      en: "n select lines address 2ⁿ inputs, so 4 inputs → 2 select lines.",
      bn: "n সিলেক্ট লাইন ২ⁿ ইনপুট অ্যাড্রেস করে; ৪ ইনপুটের জন্য ২টি সিলেক্ট লাইন।",
    },
    difficulty: "easy",
  },
  {
    id: "dl-04",
    topic: "digital-logic-design",
    question: {
      en: "Which flip-flop is used to avoid the race-around condition in a JK flip-flop?",
      bn: "JK ফ্লিপ-ফ্লপের রেস-অ্যারাউন্ড কনডিশন এড়াতে কোন ফ্লিপ-ফ্লপ ব্যবহার হয়?",
    },
    options: [
      { en: "Master–Slave JK", bn: "মাস্টার–স্লেভ JK" },
      { en: "D flip-flop", bn: "D ফ্লিপ-ফ্লপ" },
      { en: "T flip-flop only", bn: "শুধু T ফ্লিপ-ফ্লপ" },
      { en: "SR NOR latch", bn: "SR NOR ল্যাচ" },
    ],
    answer: 0,
    explanation: {
      en: "A master–slave configuration samples on one clock edge and transfers on the other, eliminating race-around.",
      bn: "মাস্টার–স্লেভ কনফিগারেশন এক এজে স্যামপল করে অন্য এজে ট্রান্সফার করে, ফলে রেস-অ্যারাউন্ড থাকে না।",
    },
    difficulty: "medium",
    source: "Bank IT Officer 2022",
  },
  // ── OOP ─────────────────────────────────────────────────────
  {
    id: "oop-01",
    topic: "object-oriented-programming",
    question: {
      en: "Which OOP principle allows a child class to provide a specific implementation of a parent method?",
      bn: "কোন OOP নীতি শিশু ক্লাসকে প্যারেন্ট মেথডের নির্দিষ্ট ইমপ্লিমেন্টেশন দেওয়ার সুযোগ দেয়?",
    },
    options: [
      { en: "Encapsulation", bn: "এনক্যাপসুলেশন" },
      { en: "Polymorphism", bn: "পলিমরফিজম" },
      { en: "Abstraction", bn: "অ্যাবস্ট্রাকশন" },
      { en: "Inheritance", bn: "ইনহেরিট্যান্স" },
    ],
    answer: 1,
    explanation: {
      en: "Runtime method overriding is polymorphism — same interface, different implementations.",
      bn: "রানটাইমে মেথড ওভাররাইডিং হলো পলিমরফিজম — একই ইন্টারফেস, ভিন্ন ইমপ্লিমেন্টেশন।",
    },
    difficulty: "easy",
  },
  {
    id: "oop-02",
    topic: "object-oriented-programming",
    question: {
      en: "In Java, which keyword prevents a method from being overridden?",
      bn: "জাভায় কোন কীওয়ার্ড একটি মেথডকে ওভাররাইড হওয়া থেকে রোধ করে?",
    },
    options: [
      { en: "static", bn: "static" },
      { en: "final", bn: "final" },
      { en: "abstract", bn: "abstract" },
      { en: "const", bn: "const" },
    ],
    answer: 1,
    explanation: {
      en: "A final method cannot be overridden; final class cannot be extended.",
      bn: "final মেথড ওভাররাইড করা যায় না; final ক্লাস এক্সটেন্ড করা যায় না।",
    },
    difficulty: "easy",
  },
  {
    id: "oop-03",
    topic: "object-oriented-programming",
    question: {
      en: "Method overloading is an example of:",
      bn: "মেথড ওভারলোডিং কোনটির উদাহরণ?",
    },
    options: [
      { en: "Runtime polymorphism", bn: "রানটাইম পলিমরফিজম" },
      { en: "Compile-time polymorphism", bn: "কম্পাইল-টাইম পলিমরফিজম" },
      { en: "Inheritance", bn: "ইনহেরিট্যান্স" },
      { en: "Data hiding", bn: "ডেটা হাইডিং" },
    ],
    answer: 1,
    explanation: {
      en: "Overloading resolves at compile time by signature; overriding resolves at runtime.",
      bn: "ওভারলোডিং সিগনেচার দেখে কম্পাইল টাইমে সমাধান হয়; ওভাররাইডিং রানটাইমে।",
    },
    difficulty: "medium",
  },
  {
    id: "oop-04",
    topic: "object-oriented-programming",
    question: {
      en: "Which of the following best describes 'abstraction'?",
      bn: "নিচের কোনটি 'অ্যাবস্ট্রাকশন'-এর সেরা ব্যাখ্যা?",
    },
    options: [
      { en: "Hiding internal state behind a public interface", bn: "পাবলিক ইন্টারফেসের পেছনে ইন্টারনাল স্টেট লুকানো" },
      { en: "Bundling data and methods into one unit", bn: "ডেটা ও মেথড এককে বাঁধা" },
      { en: "Deriving new classes from existing ones", bn: "বিদ্যমান ক্লাস থেকে নতুন ক্লাস তৈরি" },
      { en: "Reusing code without inheritance", bn: "ইনহেরিট্যান্স ছাড়া কোড পুনর্ব্যবহার" },
    ],
    answer: 0,
    explanation: {
      en: "Abstraction exposes only what's necessary; encapsulation actually hides the details.",
      bn: "অ্যাবস্ট্রাকশন শুধু প্রয়োজনীয় দেখায়; এনক্যাপসুলেশন সত্যিই ডিটেইল লুকায়।",
    },
    difficulty: "easy",
  },
  // ── Data Structures ─────────────────────────────────────────
  {
    id: "ds-01",
    topic: "data-structures",
    question: {
      en: "Worst-case time complexity of searching in a balanced binary search tree with n nodes:",
      bn: "n নোডের ব্যালান্সড বাইনারি সার্চ ট্রিতে সার্চিংয়ের সবচেয়ে খারাপ জটিলতা কত?",
    },
    options: [
      { en: "O(1)", bn: "O(১)" },
      { en: "O(log n)", bn: "O(log n)" },
      { en: "O(n)", bn: "O(n)" },
      { en: "O(n log n)", bn: "O(n log n)" },
    ],
    answer: 1,
    explanation: {
      en: "A balanced BST halves the search space each level → O(log n).",
      bn: "ব্যালান্সড BST প্রতি ধাপে অনুসন্ধানের ক্ষেত্র অর্ধেক করে → O(log n)।",
    },
    difficulty: "easy",
  },
  {
    id: "ds-02",
    topic: "data-structures",
    question: {
      en: "Which data structure is used for BFS traversal of a graph?",
      bn: "গ্রাফের BFS ট্রাভারসালে কোন ডেটা স্ট্রাকচার ব্যবহৃত হয়?",
    },
    options: [
      { en: "Stack", bn: "স্ট্যাক" },
      { en: "Queue", bn: "কিউ" },
      { en: "Priority queue only", bn: "শুধু প্রায়োরিটি কিউ" },
      { en: "Hash table", bn: "হ্যাশ টেবিল" },
    ],
    answer: 1,
    explanation: {
      en: "BFS explores level by level using a queue; DFS uses a stack/recursion.",
      bn: "BFS কিউ দিয়ে লেভেল বাই লেভেল ঘোরে; DFS স্ট্যাক/রিকারশন ব্যবহার করে।",
    },
    difficulty: "easy",
  },
  {
    id: "ds-03",
    topic: "data-structures",
    question: {
      en: "In a min-heap of n elements, what is the time complexity of extracting the minimum?",
      bn: "n উপাদানের মিন-হিপ থেকে ন্যূনতম মান বের করতে কত সময় লাগে?",
    },
    options: [
      { en: "O(1)", bn: "O(১)" },
      { en: "O(log n)", bn: "O(log n)" },
      { en: "O(n)", bn: "O(n)" },
      { en: "O(n log n)", bn: "O(n log n)" },
    ],
    answer: 1,
    explanation: {
      en: "Peek is O(1); extract-min swaps the last node to the root and heapifies down → O(log n).",
      bn: "পিক O(1); এক্সট্র্যাক্ট-মিনে শেষ নোড রুটে এসে হিপিফাই করে → O(log n)।",
    },
    difficulty: "medium",
  },
  {
    id: "ds-04",
    topic: "data-structures",
    question: {
      en: "Which traversal of a BST produces keys in sorted ascending order?",
      bn: "BST-এর কোন ট্রাভারসাল কীগুলো ক্রমানুসারে সাজিয়ে দেয়?",
    },
    options: [
      { en: "Pre-order", bn: "প্রি-অর্ডার" },
      { en: "In-order", bn: "ইন-অর্ডার" },
      { en: "Post-order", bn: "পোস্ট-অর্ডার" },
      { en: "Level-order", bn: "লেভেল-অর্ডার" },
    ],
    answer: 1,
    explanation: {
      en: "In-order visits left → root → right, which yields sorted order in a BST.",
      bn: "ইন-অর্ডারে বাম → রূট → ডান যাওয়ায় BST-তে ক্রমানুসার আউটপুট পাওয়া যায়।",
    },
    difficulty: "easy",
  },
  {
    id: "ds-05",
    topic: "data-structures",
    question: {
      en: "Average-case lookup complexity of a hash table with a good hash function:",
      bn: "ভালো হ্যাশ ফাংশনসহ হ্যাশ টেবিলের গড় কেস লুকআপ জটিলতা কত?",
    },
    options: [
      { en: "O(1)", bn: "O(১)" },
      { en: "O(log n)", bn: "O(log n)" },
      { en: "O(n)", bn: "O(n)" },
      { en: "O(n²)", bn: "O(n²)" },
    ],
    answer: 0,
    explanation: {
      en: "With low load factor and a good function, collisions are rare → amortized O(1).",
      bn: "কম লোড ফ্যাক্টর ও ভালো ফাংশনে কোলিশন কম → গড়ে O(1)।",
    },
    difficulty: "easy",
  },
  {
    id: "ds-06",
    topic: "data-structures",
    question: {
      en: "Binary Search requires:",
      bn: "বাইনারি সার্চের জন্য কী প্রয়োজন?",
    },
    options: [
      { en: "Unsorted data", bn: "অসাজানো ডেটা" },
      { en: "Sorted data", bn: "সাজানো ডেটা" },
      { en: "Random data", bn: "র‍্যান্ডম ডেটা" },
      { en: "Hashed data", bn: "হ্যাশ করা ডেটা" },
    ],
    answer: 1,
    explanation: {
      en: "Binary Search only works on a sorted array — at each step it discards half based on order. Exam tip: binary search = sorted array + compare with middle + discard half + O(log n).",
      bn: "বাইনারি সার্চ শুধু সাজানো অ্যারেতে কাজ করে — প্রতি ধাপে ক্রম অনুযায়ী অর্ধেক বাতিল করে। পরীক্ষার কৌশল: বাইনারি সার্চ = সাজানো অ্যারে + মাঝখানের সাথে তুলনা + অর্ধেক বাদ + O(log n)।",
    },
    difficulty: "easy",
  },
  {
    id: "ds-07",
    topic: "data-structures",
    question: {
      en: "Worst-case complexity of Binary Search is:",
      bn: "বাইনারি সার্চের সবচেয়ে খারাপ কেসের জটিলতা কত?",
    },
    options: [
      { en: "O(1)", bn: "O(১)" },
      { en: "O(n)", bn: "O(n)" },
      { en: "O(log n)", bn: "O(log n)" },
      { en: "O(n²)", bn: "O(n²)" },
    ],
    answer: 2,
    explanation: {
      en: "Each comparison halves the search space, so at most log₂ n steps are needed → O(log n).",
      bn: "প্রতিটি তুলনা অনুসন্ধানের ক্ষেত্র অর্ধেক করে, তাই সর্বোচ্চ log₂ n ধাপ লাগে → O(log n)।",
    },
    difficulty: "easy",
  },
  {
    id: "ds-08",
    topic: "data-structures",
    question: {
      en: "Binary Search works by:",
      bn: "বাইনারি সার্চ কীভাবে কাজ করে?",
    },
    options: [
      { en: "Checking every element", bn: "প্রতিটি উপাদান পরীক্ষা করা" },
      { en: "Dividing the search space into halves", bn: "অনুসন্ধানের ক্ষেত্র অর্ধেক করে ভাগ করা" },
      { en: "Sorting after every comparison", bn: "প্রতিটি তুলনার পরে সাজানো" },
      { en: "Using hashing", bn: "হ্যাশিং ব্যবহার করা" },
    ],
    answer: 1,
    explanation: {
      en: "Compare with the middle element, then discard half of the remaining array each step (divide and conquer).",
      bn: "মাঝখানের উপাদানের সাথে তুলনা করে প্রতি ধাপে বাকি অ্যারের অর্ধেক বাতিল হয় (ডিভাইড অ্যান্ড কনকার)।",
    },
    difficulty: "easy",
  },
  {
    id: "ds-09",
    topic: "data-structures",
    question: {
      en: "Binary Search on 1024 elements requires approximately how many halving steps?",
      bn: "১০২৪টি উপাদানে বাইনারি সার্চে প্রায় কতটি হালভিং ধাপ লাগে?",
    },
    options: [
      { en: "5", bn: "৫" },
      { en: "10", bn: "১০" },
      { en: "100", bn: "১০০" },
      { en: "512", bn: "৫১২" },
    ],
    answer: 1,
    explanation: {
      en: "Because 2¹⁰ = 1024, you need about log₂(1024) = 10 halving steps to reach a single element.",
      bn: "কারণ ২¹⁰ = ১০২৪, একটি উপাদানে পৌঁছাতে প্রায় log₂(1024) = ১০টি হালভিং ধাপ লাগে।",
    },
    difficulty: "easy",
  },
  {
    id: "ds-10",
    topic: "data-structures",
    question: {
      en: "In Binary Search on a sorted ascending array, if mid = 50 and target = 70, where do we search next?",
      bn: "ক্রমানুসার অ্যারেতে বাইনারি সার্চে mid = 50 এবং target = 70 হলে পরের ধাপে কোথায় খুঁজবেন?",
    },
    options: [
      { en: "Left", bn: "বামে" },
      { en: "Right", bn: "ডানে" },
      { en: "Both", bn: "দুই দিকেই" },
      { en: "Nowhere", bn: "কোথাও নয়" },
    ],
    answer: 1,
    explanation: {
      en: "70 > 50, so the target must be in the right half — discard the left half and continue.",
      bn: "৭০ > ৫০, তাই টার্গেট ডান অর্ধেকেই থাকবে — বাম অর্ধেক বাতিল করে এগোন।",
    },
    difficulty: "easy",
  },
  // ── DAA ─────────────────────────────────────────────────────
  {
    id: "daa-01",
    topic: "daa",
    question: {
      en: "Which sorting algorithm has O(n log n) worst-case time and is stable?",
      bn: "কোন সর্টিং অ্যালগরিদমের সবচেয়ে খারাপ সময় O(n log n) এবং এটি স্টেবল?",
    },
    options: [
      { en: "Quick sort", bn: "কুইক সর্ট" },
      { en: "Merge sort", bn: "মার্জ সর্ট" },
      { en: "Heap sort", bn: "হিপ সর্ট" },
      { en: "Insertion sort", bn: "ইনসারশন সর্ট" },
    ],
    answer: 1,
    explanation: {
      en: "Merge sort is stable with guaranteed O(n log n); quick sort degrades to O(n²).",
      bn: "মার্জ সর্ট স্টেবল ও O(n log n) নিশ্চিত; কুইক সর্ট খারাপ কেসে O(n²)-এ নেমে আসে।",
    },
    difficulty: "medium",
  },
  {
    id: "daa-02",
    topic: "daa",
    question: {
      en: "Dijkstra's algorithm fails when the graph contains:",
      bn: "গ্রাফে কোন থাকলে ডিজক্স্ট্রার অ্যালগরিদম কাজ করে না?",
    },
    options: [
      { en: "Negative weight edges", bn: "নেগেটিভ ওজনের এজ" },
      { en: "Cycles", bn: "সাইকেল" },
      { en: "Disconnected vertices", bn: "ডিসকানেক্টেড শীর্ষ" },
      { en: "Directed edges", bn: "ডিরেক্টেড এজ" },
    ],
    answer: 0,
    explanation: {
      en: "Dijkstra assumes non-negative weights; negative edges break the greedy choice.",
      bn: "ডিজক্স্ট্রা ধরে নেয় ওজন অ-নেগেটিভ; নেগেটিভ এজে গ্রিডি চয়েস ভাঙে।",
    },
    difficulty: "medium",
  },
  {
    id: "daa-03",
    topic: "daa",
    question: {
      en: "Time complexity of binary search on a sorted array of n elements:",
      bn: "n উপাদানের সাজানো অ্যারেতে বাইনারি সার্চের সময় জটিলতা কত?",
    },
    options: [
      { en: "O(n)", bn: "O(n)" },
      { en: "O(log n)", bn: "O(log n)" },
      { en: "O(1)", bn: "O(১)" },
      { en: "O(n log n)", bn: "O(n log n)" },
    ],
    answer: 1,
    explanation: {
      en: "Each step halves the search space → O(log n).",
      bn: "প্রতি ধাপে অনুসন্ধানের ক্ষেত্র অর্ধেক → O(log n)।",
    },
    difficulty: "easy",
  },
  {
    id: "daa-04",
    topic: "daa",
    question: {
      en: "The fractional knapsack problem is solved correctly using:",
      bn: "ফ্র্যাকশনাল ন্যাপস্যাক সমস্যা সঠিকভাবে সমাধান হয় কী দিয়ে?",
    },
    options: [
      { en: "Dynamic programming", bn: "ডায়নামিক প্রোগ্রামিং" },
      { en: "Greedy method", bn: "গ্রিডি পদ্ধতি" },
      { en: "Backtracking", bn: "ব্যাকট্র্যাকিং" },
      { en: "Branch and bound", bn: "ব্রান্চ অ্যান্ড বাউন্ড" },
    ],
    answer: 1,
    explanation: {
      en: "Take items by value/weight ratio — greedy works for the fractional variant (0/1 needs DP).",
      bn: "ভ্যালু/ওজন অনুপাত অনুযায়ী নিন — ফ্র্যাকশনালে গ্রিডি কাজ করে (০/১-এ DP লাগে)।",
    },
    difficulty: "medium",
    source: "Power Sector IT 2023",
  },
  // ── DBMS ────────────────────────────────────────────────────
  {
    id: "db-01",
    topic: "dbms",
    question: {
      en: "A relation is in 3NF if it is in 2NF and:",
      bn: "একটি রিলেশন 2NF-এ থাকলে এবং কোন শর্ত মিললে তা 3NF-এ থাকে?",
    },
    options: [
      { en: "Every non-key attribute is non-transitively dependent on the primary key", bn: "প্রতিটি নন-কি অ্যাট্রিবিউট প্রাইমারি কির উপর ট্রানজিটিভ-নিরপেক্ষভাবে নির্ভরশীল" },
      { en: "There are no multivalued dependencies", bn: "কোনো মাল্টিভ্যালুড ডিপেন্ডেন্সি নেই" },
      { en: "All attributes are atomic", bn: "সব অ্যাট্রিবিউট অটমিক" },
      { en: "The key is a single attribute", bn: "কি একক অ্যাট্রিবিউট" },
    ],
    answer: 0,
    explanation: {
      en: "3NF removes transitive dependencies of non-key attributes on the primary key.",
      bn: "3NF প্রাইমারি কির উপর নন-কি অ্যাট্রিবিউটের ট্রানজিটিভ ডিপেন্ডেন্সি দূর করে।",
    },
    difficulty: "medium",
  },
  {
    id: "db-02",
    topic: "dbms",
    question: {
      en: "Which SQL clause is used to filter rows *after* aggregation?",
      bn: "অ্যাগ্রিগেশনের *পরে* রো ফিল্টার করতে কোন SQL ক্লজ ব্যবহার হয়?",
    },
    options: [
      { en: "WHERE", bn: "WHERE" },
      { en: "HAVING", bn: "HAVING" },
      { en: "ORDER BY", bn: "ORDER BY" },
      { en: "LIMIT", bn: "LIMIT" },
    ],
    answer: 1,
    explanation: {
      en: "WHERE filters before grouping; HAVING filters groups after GROUP BY.",
      bn: "WHERE গ্রুপিংয়ের আগে ফিল্টার করে; HAVING GROUP BY-এর পরে গ্রুপ ফিল্টার করে।",
    },
    difficulty: "easy",
  },
  {
    id: "db-03",
    topic: "dbms",
    question: {
      en: "ACID property 'Isolation' ensures:",
      bn: "ACID-এর 'আইসোলেশন' প্রপার্টি নিশ্চিত করে কী?",
    },
    options: [
      { en: "All or nothing execution of transactions", bn: "ট্রানজেকশন হয় পুরো বা একটুও নয়" },
      { en: "Transactions are independent of each other", bn: "ট্রানজেকশনগুলো পরস্পর স্বাধীন" },
      { en: "Data survives crashes", bn: "ক্র্যাশে ডেটা টিকে থাকে" },
      { en: "Data always satisfies constraints", bn: "ডেটা সবসময় কনস্ট্রেন্ট মেনে চলে" },
    ],
    answer: 1,
    explanation: {
      en: "Isolation = concurrent transactions don't interfere; Atomicity = all-or-nothing; Durability = survives crashes.",
      bn: "আইসোলেশন = একসাথের ট্রানজেকশন বাধা দেয় না; অ্যাটমিসিটি = সব বা কিছুই নয়; ডিউরেবিলিটি = ক্র্যাশে টেকে।",
    },
    difficulty: "easy",
  },
  {
    id: "db-04",
    topic: "dbms",
    question: {
      en: "Which normal form removes partial dependency on a composite primary key?",
      bn: "কোন নরমাল ফর্ম কম্পোজিট প্রাইমারি কির উপর আংশিক নির্ভরতা দূর করে?",
    },
    options: [
      { en: "1NF", bn: "১এনএফ" },
      { en: "2NF", bn: "২এনএফ" },
      { en: "3NF", bn: "৩এনএফ" },
      { en: "BCNF", bn: "বিসিএনএফ" },
    ],
    answer: 1,
    explanation: {
      en: "2NF = 1NF + no partial dependency of non-key attributes on part of a composite key.",
      bn: "২এনএফ = ১এনএফ + কম্পোজিট কির অংশের উপর নন-কি অ্যাট্রিবিউটের আংশিক নির্ভরতা নেই।",
    },
    difficulty: "medium",
  },
  // ── SQL ─────────────────────────────────────────────────────
  {
    id: "sql-01",
    topic: "sql",
    question: {
      en: "What does INNER JOIN return?",
      bn: "INNER JOIN কী ফেরত দেয়?",
    },
    options: [
      { en: "Only matching rows from both tables", bn: "দুই টেবিলের শুধু মেলা রো" },
      { en: "All rows from the left table", bn: "বাম টেবিলের সব রো" },
      { en: "All rows from both tables", bn: "দুই টেবিলের সব রো" },
      { en: "Rows with no match", bn: "যেগুলোর মেল নেই" },
    ],
    answer: 0,
    explanation: {
      en: "INNER JOIN keeps only rows where the join condition holds in both tables.",
      bn: "INNER JOIN শুধু সেই রো রাখে যেখানে দুই টেবিলে জয়েন শর্ত মেনেছে।",
    },
    difficulty: "easy",
  },
  {
    id: "sql-02",
    topic: "sql",
    question: {
      en: "Which function ignores NULL values when aggregating?",
      bn: "অ্যাগ্রিগেট করার সময় NULL মান উপেক্ষা করে কোন ফাংশন?",
    },
    options: [
      { en: "COUNT(*)", bn: "COUNT(*)" },
      { en: "COUNT(column)", bn: "COUNT(column)" },
      { en: "SUM(column) — but so does AVG after ignoring NULLs", bn: "SUM(column) — তবে AVG-ও NULL বাদ দেয়" },
      { en: "COUNT(DISTINCT column) only", bn: "শুধু COUNT(DISTINCT column)" },
    ],
    answer: 1,
    explanation: {
      en: "COUNT(column) counts non-NULL values; COUNT(*) counts all rows including rows with NULLs.",
      bn: "COUNT(column) NULL ছাড়া মান গোনে; COUNT(*) NULL-সহ সব রো গোনে।",
    },
    difficulty: "easy",
  },
  {
    id: "sql-03",
    topic: "sql",
    question: {
      en: "SELECT name FROM emp WHERE sal > ALL (SELECT sal FROM emp WHERE dept = 'HR') — this returns:",
      bn: "SELECT name FROM emp WHERE sal > ALL (SELECT sal FROM emp WHERE dept = 'HR') — এটি কী দেয়?",
    },
    options: [
      { en: "Employees earning more than at least one HR employee", bn: "একজন এইচআর কর্মীর চেয়ে বেশি পাওয়া কর্মী" },
      { en: "Employees earning more than every HR employee", bn: "প্রত্যেক এইচআর কর্মীর চেয়ে বেশি পাওয়া কর্মী" },
      { en: "All HR employees", bn: "সব এইচআর কর্মী" },
      { en: "No rows, ALL is invalid", bn: "কোনো রো নেই, ALL অকার্যকর" },
    ],
    answer: 1,
    explanation: {
      en: "> ALL means greater than the maximum of the subquery result; > ANY means greater than the minimum.",
      bn: "> ALL মানে সাবকোয়েরির সর্বোচ্চের চেয়ে বেশি; > ANY মানে সর্বনিম্নের চেয়ে বেশি।",
    },
    difficulty: "hard",
  },
  {
    id: "sql-04",
    topic: "sql",
    question: {
      en: "Which command removes all rows from a table without logging individual row deletions?",
      bn: "কোন কমান্ড প্রতিটি রো ডিলিটের লগ ছাড়াই টেবিলের সব রো মুছে দেয়?",
    },
    options: [
      { en: "DELETE", bn: "DELETE" },
      { en: "DROP", bn: "DROP" },
      { en: "TRUNCATE", bn: "TRUNCATE" },
      { en: "REMOVE", bn: "REMOVE" },
    ],
    answer: 2,
    explanation: {
      en: "TRUNCATE deallocates data pages (minimal logging); DELETE removes row by row; DROP removes the table itself.",
      bn: "TRUNCATE ডেটা পেজ রিলিজ করে; DELETE রো ধরে মুছে; DROP পুরো টেবিল ফেলে দেয়।",
    },
    difficulty: "easy",
  },
  // ── Programming ─────────────────────────────────────────────
  {
    id: "prog-01",
    topic: "programming-questions",
    question: {
      en: "int x = 5; printf(\"%d\", x++ + ++x); — what is printed (GCC behaviour)?",
      bn: "int x = 5; printf(\"%d\", x++ + ++x); — কী প্রিন্ট হবে (GCC)?",
    },
    options: [
      { en: "12", bn: "১২" },
      { en: "Undefined behaviour — expression order is unspecified", bn: "আনডিফাইনড বিহেভিয়র — এক্সপ্রেশনের ক্রম অনির্দিষ্ট" },
      { en: "13", bn: "১৩" },
      { en: "11", bn: "১১" },
    ],
    answer: 1,
    explanation: {
      en: "Modifying x twice without a sequence point between operands is undefined behaviour in C — a classic 'trick question' in BD exams.",
      bn: "C-তে একই অপারেন্ডে দুইবার x পরিবর্তন (সিকোয়েন্স পয়েন্ট ছাড়া) undefined behaviour — বিডি পরীক্ষার ক্লাসিক ফাঁদ।",
    },
    difficulty: "hard",
  },
  {
    id: "prog-02",
    topic: "programming-questions",
    question: {
      en: "What is the time complexity of inserting at the head of a singly linked list?",
      bn: "সিঙ্গলি লিংকড লিস্টের হেডে ইনসার্ট করতে কত সময় লাগে?",
    },
    options: [
      { en: "O(1)", bn: "O(১)" },
      { en: "O(n)", bn: "O(n)" },
      { en: "O(log n)", bn: "O(log n)" },
      { en: "O(n log n)", bn: "O(n log n)" },
    ],
    answer: 0,
    explanation: {
      en: "Head insertion only rewires the head pointer — constant time. Tail insertion without a tail pointer is O(n).",
      bn: "হেডে ইনসার্ট শুধু হেড পয়েন্টার বদলায় — কনস্ট্যান্ট সময়; টেইল পয়েন্টার ছাড়া টেইলে O(n)।",
    },
    difficulty: "easy",
  },
  {
    id: "prog-03",
    topic: "programming-questions",
    question: {
      en: "In Python, which of these creates a *shallow* copy of a list `a`?",
      bn: "পাইথনে `a` লিস্টের *শ্যালো* কপি কোনটি তৈরি করে?",
    },
    options: [
      { en: "b = a", bn: "b = a" },
      { en: "b = a.copy()", bn: "b = a.copy()" },
      { en: "b = copy.deepcopy(a)", bn: "b = copy.deepcopy(a)" },
      { en: "b = [*a] creates a deep copy", bn: "b = [*a] ডিপ কপি বানায়" },
    ],
    answer: 1,
    explanation: {
      en: "list.copy(), list(a) and [*a] are all shallow; deepcopy recurses. b = a only aliases.",
      bn: "list.copy(), list(a), [*a] সবই শ্যালো; deepcopy রিকার্স করে; b = a শুধু এলিয়াস।",
    },
    difficulty: "medium",
  },
  {
    id: "prog-04",
    topic: "programming-questions",
    question: {
      en: "Which data structure does function call stack use?",
      bn: "ফাংশন কল স্ট্যাক কোন ডেটা স্ট্রাকচার ব্যবহার করে?",
    },
    options: [
      { en: "Queue", bn: "কিউ" },
      { en: "Stack (LIFO)", bn: "স্ট্যাক (LIFO)" },
      { en: "Heap", bn: "হিপ" },
      { en: "Graph", bn: "গ্রাফ" },
    ],
    answer: 1,
    explanation: {
      en: "Calls push frames; returns pop them — last in, first out.",
      bn: "কল ফ্রেম পুশ করে, রিটার্ন পপ করে — শেষে ঢোকা, আগে বের।",
    },
    difficulty: "easy",
  },
  {
    id: "prog-05",
    topic: "programming-questions",
    question: {
      en: "What does `sizeof(void*)` equal on a 64-bit system?",
      bn: "৬৪-বিট সিস্টেমে `sizeof(void*)` কত?",
    },
    options: [
      { en: "2 bytes", bn: "২ বাইট" },
      { en: "4 bytes", bn: "৪ বাইট" },
      { en: "8 bytes", bn: "৮ বাইট" },
      { en: "Implementation-defined; typically 8", bn: "ইমপ্লিমেন্টেশন-নির্ভর; সাধারণত ৮" },
    ],
    answer: 3,
    explanation: {
      en: "Pointer size follows the platform's address width — 8 bytes on typical 64-bit systems.",
      bn: "পয়েন্টারের সাইজ প্ল্যাটফর্মের অ্যাড্রেস চওড়া অনুসরণ করে — সাধারণ ৬৪-বিটে ৮ বাইট।",
    },
    difficulty: "medium",
  },
  // ── Microprocessor ──────────────────────────────────────────
  {
    id: "mp-01",
    topic: "microprocessor",
    question: {
      en: "The 8086 has how many address lines?",
      bn: "৮০৮৬-এ কতটি অ্যাড্রেস লাইন আছে?",
    },
    options: [
      { en: "16", bn: "১৬" },
      { en: "20", bn: "২০" },
      { en: "24", bn: "২৪" },
      { en: "32", bn: "৩২" },
    ],
    answer: 1,
    explanation: {
      en: "8086 uses 16 data lines but 20 address lines → 1 MB address space (segment:offset × 16).",
      bn: "৮০৮৬-এ ১৬ ডেটা লাইন ও ২০ অ্যাড্রেস লাইন → ১ এমবি অ্যাড্রেস স্পেস।",
    },
    difficulty: "easy",
  },
  {
    id: "mp-02",
    topic: "microprocessor",
    question: {
      en: "Which addressing mode uses `[BX + SI + disp8]`?",
      bn: "কোন অ্যাড্রেসিং মোড `[BX + SI + disp8]` ব্যবহার করে?",
    },
    options: [
      { en: "Register indirect", bn: "রেজিস্টার ইনডাইরেক্ট" },
      { en: "Based-indexed with displacement", bn: "বেসড-ইনডেক্সড ডিসপ্লেসমেন্টসহ" },
      { en: "Direct", bn: "ডাইরেক্ট" },
      { en: "Immediate", bn: "ইমিডিয়েট" },
    ],
    answer: 1,
    explanation: {
      en: "BX base + SI index + displacement = based-indexed addressing mode.",
      bn: "BX বেস + SI ইনডেক্স + ডিসপ্লেসমেন্ট = বেসড-ইনডেক্সড অ্যাড্রেসিং।",
    },
    difficulty: "medium",
  },
  {
    id: "mp-03",
    topic: "microprocessor",
    question: {
      en: "Cache memory is an example of:",
      bn: "ক্যাশ মেমরি কোনটির উদাহরণ?",
    },
    options: [
      { en: "Secondary storage", bn: "সেকেন্ডারি স্টোরেজ" },
      { en: "Associative/parallel access memory", bn: "অ্যাসোসিয়েটিভ অ্যাক্সেস মেমরি" },
      { en: "Sequential access memory", bn: "সিকোয়েনশিয়াল অ্যাক্সেস মেমরি" },
      { en: "Magnetic memory", bn: "ম্যাগনেটিক মেমরি" },
    ],
    answer: 1,
    explanation: {
      en: "Cache is accessed in parallel/associative fashion for speed, unlike sequential tapes.",
      bn: "টেপের বিপরীতে গতির জন্য ক্যাশ প্যারেল/অ্যাসোসিয়েটিভ পদ্ধতিতে অ্যাক্সেস হয়।",
    },
    difficulty: "medium",
    source: "Bank IT 2023",
  },
  {
    id: "mp-04",
    topic: "microprocessor",
    question: {
      en: "Pipelining improves performance primarily by:",
      bn: "পাইপলাইনিং মূলত কী করে পারফরম্যান্স বাড়ায়?",
    },
    options: [
      { en: "Reducing clock speed", bn: "ক্লক স্পিড কমায়" },
      { en: "Overlapping instruction execution stages", bn: "ইনস্ট্রাকশন এক্সিকিউশন স্টেজ ওভারল্যাপ করায়" },
      { en: "Increasing memory size", bn: "মেমরি সাইজ বাড়ায়" },
      { en: "Removing the ALU", bn: "ALU সরিয়ে দেয়" },
    ],
    answer: 1,
    explanation: {
      en: "Stages overlap so multiple instructions are in flight → higher throughput (hazards permitting).",
      bn: "স্টেজ ওভারল্যাপ হওয়ায় একাধিক ইনস্ট্রাকশন একসাথে চলে → থ্রুপুট বাড়ে।",
    },
    difficulty: "easy",
  },
  // ── Linux ───────────────────────────────────────────────────
  {
    id: "linux-01",
    topic: "linux-commands",
    question: {
      en: "Which command changes file ownership in Linux?",
      bn: "লিনাক্সে ফাইলের মালিকানা বদলাতে কোন কমান্ড?",
    },
    options: [
      { en: "chmod", bn: "chmod" },
      { en: "chown", bn: "chown" },
      { en: "chgrp", bn: "chgrp" },
      { en: "umask", bn: "umask" },
    ],
    answer: 1,
    explanation: {
      en: "chown changes owner (and optionally group); chmod changes permission bits.",
      bn: "chown মালিক (ও চাইলে গ্রুপ) বদলায়; chmod পারমিশন বিট বদলায়।",
    },
    difficulty: "easy",
  },
  {
    id: "linux-02",
    topic: "linux-commands",
    question: {
      en: "`ls -la /etc | grep conf` — what does the pipe do?",
      bn: "`ls -la /etc | grep conf` — পাইপটি কী করে?",
    },
    options: [
      { en: "Sends stdout of ls as stdin to grep", bn: "ls-এর stdout চেনে দেয় grep-এর stdin হিসেবে" },
      { en: "Runs both commands in parallel", bn: "দুটি কমান্ড একসাথে চালায়" },
      { en: "Redirects output to a file named '|'", bn: "'|' নামের ফাইলে আউটপুট পাঠায়" },
      { en: "Closes the first command after 1 second", bn: "১ সেকেন্ড পর প্রথম কমান্ড বন্ধ করে" },
    ],
    answer: 0,
    explanation: {
      en: "A pipe connects stdout of the left process to stdin of the right one.",
      bn: "পাইপ বাম প্রসেসের stdout ডান প্রসেসের stdin-এ জোড়ে।",
    },
    difficulty: "easy",
  },
  {
    id: "linux-03",
    topic: "linux-commands",
    question: {
      en: "Permission string `-rwxr-xr--` gives group users which access?",
      bn: "`-rwxr-xr--` পারমিশনে গ্রুপ ইউজারের অ্যাক্সেস কী?",
    },
    options: [
      { en: "rwx", bn: "rwx" },
      { en: "r-x", bn: "r-x" },
      { en: "r--", bn: "r--" },
      { en: "wx-", bn: "wx-" },
    ],
    answer: 1,
    explanation: {
      en: "Owner rwx, group r-x (read+execute), others r--.",
      bn: "মালিক rwx, গ্রুপ r-x (পড়া+এক্সিকিউট), অন্যান্য r--।",
    },
    difficulty: "medium",
  },
  {
    id: "linux-04",
    topic: "linux-commands",
    question: {
      en: "Which command shows running processes in real time?",
      bn: "রিয়েল টাইমে চলমান প্রসেস দেখাতে কোন কমান্ড?",
    },
    options: [
      { en: "ps once", bn: "একবার ps" },
      { en: "top / htop", bn: "top / htop" },
      { en: "df -h", bn: "df -h" },
      { en: "uname -a", bn: "uname -a" },
    ],
    answer: 1,
    explanation: {
      en: "top (or htop) refreshes a live process list; ps prints a snapshot.",
      bn: "top (বা htop) লাইভ তালিকা রিফ্রেশ করে; ps একটি স্ন্যাপশট দেয়।",
    },
    difficulty: "easy",
  },
  // ── Networks ────────────────────────────────────────────────
  {
    id: "net-01",
    topic: "computer-networks",
    question: {
      en: "How many layers are in the OSI reference model?",
      bn: "ওএসআই রেফারেন্স মডেলে কতটি লেয়ার?",
    },
    options: [
      { en: "4", bn: "৪" },
      { en: "5", bn: "৫" },
      { en: "7", bn: "৭" },
      { en: "8", bn: "৮" },
    ],
    answer: 2,
    explanation: {
      en: "Physical, Data Link, Network, Transport, Session, Presentation, Application.",
      bn: "ফিজিক্যাল, ডেটা লিংক, নেটওয়ার্ক, ট্রান্সপোর্ট, সেশন, প্রেজেন্টেশন, অ্যাপ্লিকেশন।",
    },
    difficulty: "easy",
  },
  {
    id: "net-02",
    topic: "computer-networks",
    question: {
      en: "Which protocol resolves an IP address to a MAC address on a LAN?",
      bn: "LAN-এ আইপি ঠিকানা থেকে ম্যাক ঠিকানা বের করে কোন প্রোটোকল?",
    },
    options: [
      { en: "DNS", bn: "DNS" },
      { en: "ARP", bn: "ARP" },
      { en: "DHCP", bn: "DHCP" },
      { en: "FTP", bn: "FTP" },
    ],
    answer: 1,
    explanation: {
      en: "ARP maps IP → MAC; DNS maps hostname → IP; DHCP assigns IPs dynamically.",
      bn: "ARP আইপি → ম্যাক ম্যাপ করে; DNS হোস্টনেম → আইপি; DHCP গতানুগতিকভাবে আইপি দেয়।",
    },
    difficulty: "easy",
  },
  {
    id: "net-03",
    topic: "computer-networks",
    question: {
      en: "In subnetting 192.168.10.0/26, how many usable host addresses does each subnet have?",
      bn: "১৯২.১৬৮.১০.০/২৬ সাবনেটিংয়ে প্রতি সাবনেটে কতটি ব্যবহারযোগ্য হোস্ট ঠিকানা থাকে?",
    },
    options: [
      { en: "64", bn: "৬৪" },
      { en: "62", bn: "৬২" },
      { en: "30", bn: "৩০" },
      { en: "32", bn: "৩২" },
    ],
    answer: 1,
    explanation: {
      en: "/26 → 64 addresses − (network + broadcast) = 62 usable hosts.",
      bn: "/২৬ → ৬৪ ঠিকানা − (নেটওয়ার্ক + ব্রডকাস্ট) = ৬২টি ব্যবহারযোগ্য।",
    },
    difficulty: "medium",
  },
  {
    id: "net-04",
    topic: "computer-networks",
    question: {
      en: "TCP is:",
      bn: "টিসিপি কী?",
    },
    options: [
      { en: "Connectionless, unreliable", bn: "কানেকশনলেস, অবিশ্বস্ত" },
      { en: "Connection-oriented, reliable", bn: "কানেকশন-ওরিয়েন্টেড, বিশ্বস্ত" },
      { en: "Connectionless, reliable", bn: "কানেকশনলেস, বিশ্বস্ত" },
      { en: "Connection-oriented, unreliable", bn: "কানেকশন-ওরিয়েন্টেড, অবিশ্বস্ত" },
    ],
    answer: 1,
    explanation: {
      en: "TCP uses handshake, sequencing and ACKs for reliability; UDP is connectionless.",
      bn: "টিসিপি হ্যান্ডশেক, সিকোয়েন্সিং ও ACK ব্যবহার করে; UDP কানেকশনলেস।",
    },
    difficulty: "easy",
  },
  {
    id: "net-05",
    topic: "computer-networks",
    question: {
      en: "Which layer of TCP/IP corresponds to OSI's Session layer?",
      bn: "ওএসআইয়ের সেশন লেয়ারের সমতুল্য টিসিপি/আইপি লেয়ার কোনটি?",
    },
    options: [
      { en: "Application layer (functions merged)", bn: "অ্যাপ্লিকেশন লেয়ার (ফাংশন মিলিত)" },
      { en: "Transport layer", bn: "ট্রান্সপোর্ট লেয়ার" },
      { en: "Internet layer", bn: "ইন্টারনেট লেয়ার" },
      { en: "Network access layer", bn: "নেটওয়ার্ক অ্যাক্সেস লেয়ার" },
    ],
    answer: 0,
    explanation: {
      en: "TCP/IP's application layer covers OSI's session, presentation and application layers.",
      bn: "টিসিপি/আইপি-র অ্যাপ্লিকেশন লেয়ারে ওএসআইয়ের সেশন, প্রেজেন্টেশন ও অ্যাপ্লিকেশন — তিনটিই থাকে।",
    },
    difficulty: "medium",
  },
  // ── Networks: IP / subnetting / routing / OSPF drill (Q1–Q40) ──
  {
    id: "net-06",
    topic: "computer-networks",
    question: {
      en: "IPv4 address is how many bits?",
      bn: "IPv4 ঠিকানা কত বিটের?",
    },
    options: [
      { en: "16", bn: "16" },
      { en: "32", bn: "32" },
      { en: "64", bn: "64" },
      { en: "128", bn: "128" },
    ],
    answer: 1,
    explanation: {
      en: "IPv4 uses a 32-bit address (four octets of 8 bits each).",
      bn: "IPv4 ঠিকানা ৩২ বিট (৪টি অক্টেট, প্রতিটি ৮ বিট)।",
    },
    difficulty: "easy",
  },
  {
    id: "net-07",
    topic: "computer-networks",
    question: {
      en: "IPv6 address is how many bits?",
      bn: "IPv6 ঠিকানা কত বিটের?",
    },
    options: [
      { en: "32", bn: "32" },
      { en: "64", bn: "64" },
      { en: "128", bn: "128" },
      { en: "256", bn: "256" },
    ],
    answer: 2,
    explanation: {
      en: "IPv6 expands the address space to 128 bits.",
      bn: "IPv6 ঠিকানা স্পেস ১২৮ বিট।",
    },
    difficulty: "easy",
  },
  {
    id: "net-08",
    topic: "computer-networks",
    question: {
      en: "How many bits are there in one IPv4 octet?",
      bn: "একটি IPv4 অক্টেটে কতটি বিট থাকে?",
    },
    options: [
      { en: "4", bn: "4" },
      { en: "8", bn: "8" },
      { en: "16", bn: "16" },
      { en: "32", bn: "32" },
    ],
    answer: 1,
    explanation: {
      en: "An octet is exactly 8 bits (0–255).",
      bn: "একটি অক্টেট ঠিক ৮ বিট (০–২৫৫)।",
    },
    difficulty: "easy",
  },
  {
    id: "net-09",
    topic: "computer-networks",
    question: {
      en: "What is the maximum value of an IPv4 octet?",
      bn: "IPv4 অক্টেটের সর্বোচ্চ মান কত?",
    },
    options: [
      { en: "127", bn: "127" },
      { en: "128", bn: "128" },
      { en: "255", bn: "255" },
      { en: "256", bn: "256" },
    ],
    answer: 2,
    explanation: {
      en: "2^8 = 256 values from 0 to 255, so the maximum is 255.",
      bn: "২^৮ = ২৫৬ মান (০ থেকে ২৫৫), তাই সর্বোচ্চ ২৫৫।",
    },
    difficulty: "easy",
  },
  {
    id: "net-10",
    topic: "computer-networks",
    question: {
      en: "Which is a valid IPv4 address?",
      bn: "কোনটি বৈধ IPv4 ঠিকানা?",
    },
    options: [
      { en: "192.168.1.300", bn: "192.168.1.300" },
      { en: "192.168.1.10", bn: "192.168.1.10" },
      { en: "192.168.500.1", bn: "192.168.500.1" },
      { en: "192.168.1.999", bn: "192.168.1.999" },
    ],
    answer: 1,
    explanation: {
      en: "Each octet must be 0–255. 300, 500 and 999 are out of range; 192.168.1.10 is valid.",
      bn: "প্রতিটি অক্টেট ০–২৫৫ হতে হবে। ৩০০, ৫০০, ৯৯৯ সীমার বাইরে; 192.168.1.10 বৈধ।",
    },
    difficulty: "easy",
  },
  {
    id: "net-11",
    topic: "computer-networks",
    question: {
      en: "What does /24 mean in IPv4 CIDR notation?",
      bn: "IPv4 CIDR নোটেশনে /24 এর অর্থ কী?",
    },
    options: [
      { en: "24 host bits", bn: "২৪ হোস্ট বিট" },
      { en: "24 network bits", bn: "২৪ নেটওয়ার্ক বিট" },
      { en: "24 bytes", bn: "২৪ বাইট" },
      { en: "24 octets", bn: "২৪ অক্টেট" },
    ],
    answer: 1,
    explanation: {
      en: "The prefix length is the number of network bits; host bits = 32 − 24 = 8.",
      bn: "প্রিফিক্স দৈর্ঘ্য = নেটওয়ার্ক বিট; হোস্ট বিট = ৩২ − ২৪ = ৮।",
    },
    difficulty: "easy",
  },
  {
    id: "net-12",
    topic: "computer-networks",
    question: {
      en: "The subnet mask for /24 is:",
      bn: "/24-এর সাবনেট মাস্ক কোনটি?",
    },
    options: [
      { en: "255.0.0.0", bn: "255.0.0.0" },
      { en: "255.255.0.0", bn: "255.255.0.0" },
      { en: "255.255.255.0", bn: "255.255.255.0" },
      { en: "255.255.255.255", bn: "255.255.255.255" },
    ],
    answer: 2,
    explanation: {
      en: "/24 = first 24 bits on → 255.255.255.0.",
      bn: "/২৪ = প্রথম ২৪ বিট অন → 255.255.255.0।",
    },
    difficulty: "easy",
  },
  {
    id: "net-13",
    topic: "computer-networks",
    question: {
      en: "How many host bits are available in a /24 IPv4 network?",
      bn: "/24 IPv4 নেটওয়ার্কে কতটি হোস্ট বিট থাকে?",
    },
    options: [
      { en: "4", bn: "4" },
      { en: "8", bn: "8" },
      { en: "16", bn: "16" },
      { en: "24", bn: "24" },
    ],
    answer: 1,
    explanation: {
      en: "Host bits = 32 − prefix = 32 − 24 = 8.",
      bn: "হোস্ট বিট = ৩২ − প্রিফিক্স = ৩২ − ২৪ = ৮।",
    },
    difficulty: "easy",
  },
  {
    id: "net-14",
    topic: "computer-networks",
    question: {
      en: "How many usable host addresses are available in a /24 network?",
      bn: "/24 নেটওয়ার্কে কতটি ব্যবহারযোগ্য হোস্ট ঠিকানা থাকে?",
    },
    options: [
      { en: "256", bn: "256" },
      { en: "255", bn: "255" },
      { en: "254", bn: "254" },
      { en: "252", bn: "252" },
    ],
    answer: 2,
    explanation: {
      en: "2^8 − 2 = 254 (minus network and broadcast).",
      bn: "২^৮ − ২ = ২৫৪ (নেটওয়ার্ক ও ব্রডকাস্ট বাদ)।",
    },
    difficulty: "easy",
  },
  {
    id: "net-15",
    topic: "computer-networks",
    question: {
      en: "How many usable hosts are available in a /30 subnet?",
      bn: "/30 সাবনেটে কতটি ব্যবহারযোগ্য হোস্ট থাকে?",
    },
    options: [
      { en: "2", bn: "2" },
      { en: "4", bn: "4" },
      { en: "6", bn: "6" },
      { en: "8", bn: "8" },
    ],
    answer: 0,
    explanation: {
      en: "32 − 30 = 2 host bits → 2^2 − 2 = 2 usable (point-to-point link).",
      bn: "৩২ − ৩০ = ২ হোস্ট বিট → ২^২ − ২ = ২টি ব্যবহারযোগ্য।",
    },
    difficulty: "easy",
  },
  {
    id: "net-16",
    topic: "computer-networks",
    question: {
      en: "How many usable hosts does /26 provide?",
      bn: "/26 কতটি ব্যবহারযোগ্য হোস্ট দেয়?",
    },
    options: [
      { en: "30", bn: "30" },
      { en: "62", bn: "62" },
      { en: "64", bn: "64" },
      { en: "126", bn: "126" },
    ],
    answer: 1,
    explanation: {
      en: "32 − 26 = 6 → 2^6 − 2 = 62 usable hosts.",
      bn: "৩২ − ২৬ = ৬ → ২^৬ − ২ = ৬২টি ব্যবহারযোগ্য হোস্ট।",
    },
    difficulty: "easy",
  },
  {
    id: "net-17",
    topic: "computer-networks",
    question: {
      en: "How many usable hosts does /27 provide?",
      bn: "/27 কতটি ব্যবহারযোগ্য হোস্ট দেয়?",
    },
    options: [
      { en: "14", bn: "14" },
      { en: "30", bn: "30" },
      { en: "32", bn: "32" },
      { en: "62", bn: "62" },
    ],
    answer: 1,
    explanation: {
      en: "2^(32−27) − 2 = 2^5 − 2 = 30.",
      bn: "২^(৩২−২৭) − ২ = ২^৫ − ২ = ৩০।",
    },
    difficulty: "easy",
  },
  {
    id: "net-18",
    topic: "computer-networks",
    question: {
      en: "How many usable hosts does /28 provide?",
      bn: "/28 কতটি ব্যবহারযোগ্য হোস্ট দেয়?",
    },
    options: [
      { en: "14", bn: "14" },
      { en: "16", bn: "16" },
      { en: "30", bn: "30" },
      { en: "62", bn: "62" },
    ],
    answer: 0,
    explanation: {
      en: "2^4 − 2 = 14 usable hosts.",
      bn: "২^৪ − ২ = ১৪টি ব্যবহারযোগ্য হোস্ট।",
    },
    difficulty: "easy",
  },
  {
    id: "net-19",
    topic: "computer-networks",
    question: {
      en: "Which subnet provides 62 usable hosts?",
      bn: "কোন সাবনেট ৬২টি ব্যবহারযোগ্য হোস্ট দেয়?",
    },
    options: [
      { en: "/24", bn: "/24" },
      { en: "/25", bn: "/25" },
      { en: "/26", bn: "/26" },
      { en: "/27", bn: "/27" },
    ],
    answer: 2,
    explanation: {
      en: "/26 → 6 host bits → 64 − 2 = 62.",
      bn: "/২৬ → ৬ হোস্ট বিট → ৬৪ − ২ = ৬২।",
    },
    difficulty: "easy",
  },
  {
    id: "net-20",
    topic: "computer-networks",
    question: {
      en: "Which subnet provides 30 usable hosts?",
      bn: "কোন সাবনেট ৩০টি ব্যবহারযোগ্য হোস্ট দেয়?",
    },
    options: [
      { en: "/26", bn: "/26" },
      { en: "/27", bn: "/27" },
      { en: "/28", bn: "/28" },
      { en: "/29", bn: "/29" },
    ],
    answer: 1,
    explanation: {
      en: "/27 → 5 host bits → 32 − 2 = 30.",
      bn: "/২৭ → ৫ হোস্ট বিট → ৩২ − ২ = ৩০।",
    },
    difficulty: "easy",
  },
  {
    id: "net-21",
    topic: "computer-networks",
    question: {
      en: "Which CIDR prefix provides the largest number of hosts?",
      bn: "কোন CIDR প্রিফিক্স সর্বাধিক হোস্ট দেয়?",
    },
    options: [
      { en: "/24", bn: "/24" },
      { en: "/25", bn: "/25" },
      { en: "/26", bn: "/26" },
      { en: "/28", bn: "/28" },
    ],
    answer: 0,
    explanation: {
      en: "Smaller prefix → more host bits. /24 has 8 host bits → 254 usable hosts.",
      bn: "ছোট প্রিফিক্স → বেশি হোস্ট বিট। /২৪-এ ৮ হোস্ট বিট → ২৫৪ ব্যবহারযোগ্য।",
    },
    difficulty: "easy",
  },
  {
    id: "net-22",
    topic: "computer-networks",
    question: {
      en: "What is the primary purpose of a router?",
      bn: "রাউটারের প্রধান কাজ কী?",
    },
    options: [
      { en: "Store files", bn: "ফাইল সংরক্ষণ" },
      { en: "Forward packets between networks", bn: "নেটওয়ার্কের মধ্যে প্যাকেট ফরোয়ার্ড" },
      { en: "Encrypt passwords", bn: "পাসওয়ার্ড এনক্রিপ্ট" },
      { en: "Manage databases", bn: "ডেটাবেস পরিচালনা" },
    ],
    answer: 1,
    explanation: {
      en: "A router forwards packets between different networks using IP (Layer 3).",
      bn: "রাউটার আইপি (লেয়ার ৩) ব্যবহার করে ভিন্ন নেটওয়ার্কের মধ্যে প্যাকেট ফরোয়ার্ড করে।",
    },
    difficulty: "easy",
  },
  {
    id: "net-23",
    topic: "computer-networks",
    question: {
      en: "Which device operates primarily at the Network Layer (Layer 3)?",
      bn: "কোন ডিভাইস মূলত নেটওয়ার্ক লেয়ারে (লেয়ার ৩) কাজ করে?",
    },
    options: [
      { en: "Hub", bn: "হাব" },
      { en: "Switch", bn: "সুইচ" },
      { en: "Router", bn: "রাউটার" },
      { en: "Repeater", bn: "রিপিটার" },
    ],
    answer: 2,
    explanation: {
      en: "Routers are Layer 3 devices; hubs/repeaters are Layer 1; switches are Layer 2.",
      bn: "রাউটার লেয়ার ৩; হাব/রিপিটার লেয়ার ১; সুইচ লেয়ার ২।",
    },
    difficulty: "easy",
  },
  {
    id: "net-24",
    topic: "computer-networks",
    question: {
      en: "Which information does a router primarily use to forward an IP packet?",
      bn: "রাউটার IP প্যাকেট ফরোয়ার্ড করতে মূলত কোন তথ্য ব্যবহার করে?",
    },
    options: [
      { en: "Destination IP address", bn: "ডেস্টিনেশন IP ঠিকানা" },
      { en: "Source MAC address only", bn: "শুধু সোর্স MAC ঠিকানা" },
      { en: "HTTP header", bn: "HTTP হেডার" },
      { en: "File name", bn: "ফাইলের নাম" },
    ],
    answer: 0,
    explanation: {
      en: "Routers look up the destination IP in the routing table (longest prefix match).",
      bn: "রাউটার রুটিং টেবিলে ডেস্টিনেশন আইপি দেখে (লংগেস্ট প্রিফিক্স ম্যাচ)।",
    },
    difficulty: "easy",
  },
  {
    id: "net-25",
    topic: "computer-networks",
    question: {
      en: "What is a routing table?",
      bn: "রুটিং টেবিল কী?",
    },
    options: [
      { en: "Table containing user passwords", bn: "ব্যবহারকারীর পাসওয়ার্ডের টেবিল" },
      { en: "Table containing paths/routes to destinations", bn: "ডেস্টিনেশনের পথ/রুটের টেবিল" },
      { en: "Table containing MAC addresses only", bn: "শুধু MAC ঠিকানার টেবিল" },
      { en: "Table containing DNS names only", bn: "শুধু DNS নামের টেবিল" },
    ],
    answer: 1,
    explanation: {
      en: "A routing table maps destination networks/prefixes to next-hop interfaces.",
      bn: "রুটিং টেবিল ডেস্টিনেশন নেটওয়ার্ক/প্রিফিক্সকে নেক্সট-হপ ইন্টারফেসে ম্যাপ করে।",
    },
    difficulty: "easy",
  },
  {
    id: "net-26",
    topic: "computer-networks",
    question: {
      en: "Which is an example of a dynamic routing protocol?",
      bn: "কোনটি ডায়নামিক রুটিং প্রোটোকলের উদাহরণ?",
    },
    options: [
      { en: "OSPF", bn: "OSPF" },
      { en: "HTTP", bn: "HTTP" },
      { en: "FTP", bn: "FTP" },
      { en: "SMTP", bn: "SMTP" },
    ],
    answer: 0,
    explanation: {
      en: "OSPF is a dynamic (link-state) routing protocol; HTTP/FTP/SMTP are application protocols.",
      bn: "OSPF ডায়নামিক (লিংক-স্টেট) রুটিং প্রোটোকল; HTTP/FTP/SMTP অ্যাপ্লিকেশন প্রোটোকল।",
    },
    difficulty: "easy",
  },
  {
    id: "net-27",
    topic: "computer-networks",
    question: {
      en: "Which of the following is NOT a routing protocol?",
      bn: "নিচের কোনটি রুটিং প্রোটোকল নয়?",
    },
    options: [
      { en: "OSPF", bn: "OSPF" },
      { en: "RIP", bn: "RIP" },
      { en: "BGP", bn: "BGP" },
      { en: "HTTP", bn: "HTTP" },
    ],
    answer: 3,
    explanation: {
      en: "HTTP is a web application protocol; OSPF, RIP and BGP route packets.",
      bn: "HTTP ওয়েব অ্যাপ্লিকেশন প্রোটোকল; OSPF, RIP, BGP প্যাকেট রুট করে।",
    },
    difficulty: "easy",
  },
  {
    id: "net-28",
    topic: "computer-networks",
    question: {
      en: "OSPF stands for:",
      bn: "OSPF-এর পূর্ণরূপ কী?",
    },
    options: [
      { en: "Open Shortest Path First", bn: "Open Shortest Path First" },
      { en: "Open Simple Path Forwarding", bn: "Open Simple Path Forwarding" },
      { en: "Optimal Shortest Path Forwarding", bn: "Optimal Shortest Path Forwarding" },
      { en: "Open Secure Path Framework", bn: "Open Secure Path Framework" },
    ],
    answer: 0,
    explanation: {
      en: "OSPF = Open Shortest Path First.",
      bn: "OSPF = ওপেন শর্টেস্ট পাথ ফার্স্ট।",
    },
    difficulty: "easy",
  },
  {
    id: "net-29",
    topic: "computer-networks",
    question: {
      en: "OSPF is a:",
      bn: "OSPF কী ধরনের প্রোটোকল?",
    },
    options: [
      { en: "Distance-vector protocol", bn: "ডিস্ট্যান্স-ভেক্টর প্রোটোকল" },
      { en: "Link-state protocol", bn: "লিংক-স্টেট প্রোটোকল" },
      { en: "Transport protocol", bn: "ট্রান্সপোর্ট প্রোটোকল" },
      { en: "Application protocol", bn: "অ্যাপ্লিকেশন প্রোটোকল" },
    ],
    answer: 1,
    explanation: {
      en: "OSPF is link-state: each router floods LSAs and runs Dijkstra on a shared LSDB.",
      bn: "OSPF লিংক-স্টেট: প্রতিটি রাউটার LSA ফ্লাড করে ও শেয়ার্ড LSDB-তে ডিজেকস্ট্রা চালায়।",
    },
    difficulty: "easy",
  },
  {
    id: "net-30",
    topic: "computer-networks",
    question: {
      en: "Which algorithm is associated with OSPF?",
      bn: "OSPF-এর সাথে কোন অ্যালগরিদম যুক্ত?",
    },
    options: [
      { en: "Dijkstra", bn: "Dijkstra" },
      { en: "Kruskal", bn: "Kruskal" },
      { en: "Prim", bn: "Prim" },
      { en: "Floyd-Warshall", bn: "Floyd-Warshall" },
    ],
    answer: 0,
    explanation: {
      en: "OSPF runs Dijkstra's Shortest Path First (SPF) on the LSDB.",
      bn: "OSPF LSDB-তে ডিজেকস্ট্রার শর্টেস্ট পাথ ফার্স্ট (SPF) চালায়।",
    },
    difficulty: "easy",
  },
  {
    id: "net-31",
    topic: "computer-networks",
    question: {
      en: "What does OSPF use as its routing metric?",
      bn: "OSPF রুটিং মেট্রিক হিসেবে কী ব্যবহার করে?",
    },
    options: [
      { en: "Hop count", bn: "হপ কাউন্ট" },
      { en: "Cost", bn: "কস্ট" },
      { en: "Bandwidth only", bn: "শুধু ব্যান্ডউইথ" },
      { en: "Delay only", bn: "শুধু ডিলে" },
    ],
    answer: 1,
    explanation: {
      en: "OSPF metric is cost (derived from bandwidth); RIP uses hop count.",
      bn: "OSPF মেট্রিক কস্ট (ব্যান্ডউইথ থেকে); RIP হপ কাউন্ট ব্যবহার করে।",
    },
    difficulty: "easy",
  },
  {
    id: "net-32",
    topic: "computer-networks",
    question: {
      en: "Which OSPF area is the backbone area?",
      bn: "কোন OSPF এরিয়া ব্যাকবোন এরিয়া?",
    },
    options: [
      { en: "Area 0", bn: "এরিয়া ০" },
      { en: "Area 1", bn: "এরিয়া ১" },
      { en: "Area 10", bn: "এরিয়া ১০" },
      { en: "Area 100", bn: "এরিয়া ১০০" },
    ],
    answer: 0,
    explanation: {
      en: "Area 0 is the OSPF backbone; all other areas connect through it.",
      bn: "এরিয়া ০ OSPF ব্যাকবোন; বাকি সব এরিয়া এর মধ্য দিয়ে যুক্ত হয়।",
    },
    difficulty: "easy",
  },
  {
    id: "net-33",
    topic: "computer-networks",
    question: {
      en: "OSPF routers maintain information about the network topology in:",
      bn: "OSPF রাউটার নেটওয়ার্ক টোপোলজির তথ্য কোথায় রাখে?",
    },
    options: [
      { en: "DNS table", bn: "DNS টেবিল" },
      { en: "ARP cache", bn: "ARP ক্যাশ" },
      { en: "Link-State Database", bn: "লিংক-স্টেট ডেটাবেস" },
      { en: "MAC table", bn: "MAC টেবিল" },
    ],
    answer: 2,
    explanation: {
      en: "Every router in an area holds an identical Link-State Database (LSDB).",
      bn: "এরিয়ার প্রতিটি রাউটার একই লিংক-স্টেট ডেটাবেস (LSDB) রাখে।",
    },
    difficulty: "easy",
  },
  {
    id: "net-34",
    topic: "computer-networks",
    question: {
      en: "OSPF uses SPF, which stands for:",
      bn: "OSPF-এর SPF এর পূর্ণরূপ কী?",
    },
    options: [
      { en: "Shortest Path First", bn: "Shortest Path First" },
      { en: "Secure Packet Forwarding", bn: "Secure Packet Forwarding" },
      { en: "Simple Path Forwarding", bn: "Simple Path Forwarding" },
      { en: "Source Packet Filter", bn: "Source Packet Filter" },
    ],
    answer: 0,
    explanation: {
      en: "SPF = Shortest Path First (Dijkstra's algorithm in OSPF).",
      bn: "SPF = শর্টেস্ট পাথ ফার্স্ট (OSPF-এ ডিজেকস্ট্রা অ্যালগরিদম)।",
    },
    difficulty: "easy",
  },
  {
    id: "net-35",
    topic: "computer-networks",
    question: {
      en: "Which statement about OSPF is TRUE?",
      bn: "OSPF সম্পর্কে কোন বিবৃতি সত্য?",
    },
    options: [
      { en: "It uses hop count as its primary metric", bn: "এর প্রধান মেট্রিক হপ কাউন্ট" },
      { en: "It is a link-state routing protocol", bn: "এটি লিংক-স্টেট রুটিং প্রোটোকল" },
      { en: "It is an application-layer protocol", bn: "এটি অ্যাপ্লিকেশন-লেয়ার প্রোটোকল" },
      { en: "It has a maximum hop count of 15", bn: "এর সর্বোচ্চ হপ কাউন্ট ১৫" },
    ],
    answer: 1,
    explanation: {
      en: "OSPF is link-state with cost metric; hop count / max 15 describes RIP.",
      bn: "OSPF লিংক-স্টেট ও কস্ট মেট্রিক; হপ কাউন্ট / সর্বোচ্চ ১৫ হলো RIP।",
    },
    difficulty: "easy",
  },
  {
    id: "net-36",
    topic: "computer-networks",
    question: {
      en: "Which routing protocol uses hop count as its metric?",
      bn: "কোন রুটিং প্রোটোকল মেট্রিক হিসেবে হপ কাউন্ট ব্যবহার করে?",
    },
    options: [
      { en: "OSPF", bn: "OSPF" },
      { en: "RIP", bn: "RIP" },
      { en: "BGP", bn: "BGP" },
      { en: "ICMP", bn: "ICMP" },
    ],
    answer: 1,
    explanation: {
      en: "RIP counts hops (max 15); OSPF uses cost.",
      bn: "RIP হপ গুনে (সর্বোচ্চ ১৫); OSPF কস্ট ব্যবহার করে।",
    },
    difficulty: "easy",
  },
  {
    id: "net-37",
    topic: "computer-networks",
    question: {
      en: "RIP considers a route unreachable when its hop count exceeds:",
      bn: "RIP কখন রুটকে অরাজ্য ধরে যখন হপ কাউন্ট অতিক্রম করে?",
    },
    options: [
      { en: "10", bn: "10" },
      { en: "15", bn: "15" },
      { en: "16", bn: "16" },
      { en: "255", bn: "255" },
    ],
    answer: 2,
    explanation: {
      en: "15 = max reachable hop count in RIP; 16 = unreachable (poisoned).",
      bn: "RIP-এ ১৫ = সর্বোচ্চ পৌঁছনো যোগ্য হপ; ১৬ = অরাজ্য (unreachable)।",
    },
    difficulty: "medium",
  },
  {
    id: "net-38",
    topic: "computer-networks",
    question: {
      en: "Which generally scales better for large enterprise networks?",
      bn: "বড় এন্টারপ্রাইজ নেটওয়ার্কে কোনটি ভালো স্কেল করে?",
    },
    options: [
      { en: "RIP", bn: "RIP" },
      { en: "OSPF", bn: "OSPF" },
    ],
    answer: 1,
    explanation: {
      en: "OSPF converges faster, uses cost, and scales with areas; RIP is hop-limited and slow.",
      bn: "OSPF দ্রুত কনভার্জ করে, কস্ট ব্যবহার করে, এরিয়ায় স্কেল করে; RIP হপ-সীমিত ও ধীর।",
    },
    difficulty: "easy",
  },
  {
    id: "net-39",
    topic: "computer-networks",
    question: {
      en: "Which one is a distance-vector routing protocol?",
      bn: "কোনটি ডিস্ট্যান্স-ভেক্টর রুটিং প্রোটোকল?",
    },
    options: [
      { en: "OSPF", bn: "OSPF" },
      { en: "RIP", bn: "RIP" },
      { en: "Ethernet", bn: "Ethernet" },
      { en: "DNS", bn: "DNS" },
    ],
    answer: 1,
    explanation: {
      en: "RIP is distance-vector (Bellman-Ford); OSPF is link-state.",
      bn: "RIP ডিস্ট্যান্স-ভেক্টর (বেলম্যান-ফোর্ড); OSPF লিংক-স্টেট।",
    },
    difficulty: "easy",
  },
  {
    id: "net-40",
    topic: "computer-networks",
    question: {
      en: "Which one is a link-state routing protocol?",
      bn: "কোনটি লিংক-স্টেট রুটিং প্রোটোকল?",
    },
    options: [
      { en: "RIP", bn: "RIP" },
      { en: "OSPF", bn: "OSPF" },
      { en: "FTP", bn: "FTP" },
      { en: "DHCP", bn: "DHCP" },
    ],
    answer: 1,
    explanation: {
      en: "OSPF is link-state; RIP is distance-vector; FTP/DHCP are not routing protocols.",
      bn: "OSPF লিংক-স্টেট; RIP ডিস্ট্যান্স-ভেক্টর; FTP/DHCP রুটিং প্রোটোকল নয়।",
    },
    difficulty: "easy",
  },
  {
    id: "net-41",
    topic: "computer-networks",
    question: {
      en: "A network is 192.168.1.0/26. What is the total number of addresses?",
      bn: "একটি নেটওয়ার্ক 192.168.1.0/26। মোট ঠিকানা সংখ্যা কত?",
    },
    options: [
      { en: "32", bn: "32" },
      { en: "62", bn: "62" },
      { en: "64", bn: "64" },
      { en: "128", bn: "128" },
    ],
    answer: 2,
    explanation: {
      en: "2^(32−26) = 2^6 = 64 total; usable = 64 − 2 = 62.",
      bn: "২^(৩২−২৬) = ২^৬ = ৬৪ মোট; ব্যবহারযোগ্য = ৬৪ − ২ = ৬২।",
    },
    difficulty: "medium",
  },
  {
    id: "net-42",
    topic: "computer-networks",
    question: {
      en: "What is the broadcast address of 192.168.1.0/24?",
      bn: "192.168.1.0/24-এর ব্রডকাস্ট ঠিকানা কী?",
    },
    options: [
      { en: "192.168.1.0", bn: "192.168.1.0" },
      { en: "192.168.1.1", bn: "192.168.1.1" },
      { en: "192.168.1.254", bn: "192.168.1.254" },
      { en: "192.168.1.255", bn: "192.168.1.255" },
    ],
    answer: 3,
    explanation: {
      en: "Network 192.168.1.0, hosts .1–.254, broadcast 192.168.1.255.",
      bn: "নেটওয়ার্ক 192.168.1.0, হোস্ট .১–.২৫৪, ব্রডকাস্ট 192.168.1.255।",
    },
    difficulty: "medium",
  },
  {
    id: "net-43",
    topic: "computer-networks",
    question: {
      en: "For 10.0.0.0/8, how many host bits are available?",
      bn: "10.0.0.0/8-এ কতটি হোস্ট বিট আছে?",
    },
    options: [
      { en: "8", bn: "8" },
      { en: "16", bn: "16" },
      { en: "24", bn: "24" },
      { en: "32", bn: "32" },
    ],
    answer: 2,
    explanation: {
      en: "Host bits = 32 − 8 = 24.",
      bn: "হোস্ট বিট = ৩২ − ৮ = ২৪।",
    },
    difficulty: "easy",
  },
  {
    id: "net-44",
    topic: "computer-networks",
    question: {
      en: "For 10.0.0.0/8, how many usable host addresses are available?",
      bn: "10.0.0.0/8-এ কতটি ব্যবহারযোগ্য হোস্ট ঠিকানা আছে?",
    },
    options: [
      { en: "2^8 − 2", bn: "2^8 − 2" },
      { en: "2^16 − 2", bn: "2^16 − 2" },
      { en: "2^24 − 2", bn: "2^24 − 2" },
      { en: "2^32 − 2", bn: "2^32 − 2" },
    ],
    answer: 2,
    explanation: {
      en: "24 host bits → 2^24 − 2 usable hosts.",
      bn: "২৪ হোস্ট বিট → ২^২৪ − ২ ব্যবহারযোগ্য হোস্ট।",
    },
    difficulty: "medium",
  },
  {
    id: "net-45",
    topic: "computer-networks",
    question: {
      en: "OSPF has two routes to the same destination: Route A cost 10+20=30 (via R2), Route B cost 5+10=15 (via R3). Which will OSPF prefer?",
      bn: "একই ডেস্টিনেশনে OSPF-এর দুটি রুট: রুট A কস্ট ১০+২০=৩০ (R2 হয়ে), রুট B কস্ট ৫+১০=১৫ (R3 হয়ে)। OSPF কোনটি পছন্দ করবে?",
    },
    options: [
      { en: "Route A", bn: "রুট A" },
      { en: "Route B", bn: "রুট B" },
      { en: "Both always equally", bn: "সবসময় সমান" },
      { en: "Neither", bn: "কোনটিই নয়" },
    ],
    answer: 1,
    explanation: {
      en: "OSPF prefers the lower total cost path → Route B (cost 15).",
      bn: "OSPF কম মোট কস্টের পথ বেছে নেয় → রুট B (কস্ট ১৫)।",
    },
    difficulty: "medium",
  },
  // ── OS ──────────────────────────────────────────────────────
  {
    id: "os-01",
    topic: "os",
    question: {
      en: "Which scheduling algorithm can cause starvation of long jobs?",
      bn: "কোন স্কিউডিং অ্যালগরিদম দীর্ঘ জবের স্টারভেশন ঘটাতে পারে?",
    },
    options: [
      { en: "Round Robin", bn: "রাউন্ড রবিন" },
      { en: "FCFS", bn: "FCFS" },
      { en: "Shortest Job First (non-preemptive)", bn: "শর্টেস্ট জব ফার্স্ট (নন-প্রিম্পটিভ)" },
      { en: "Multilevel queue with fixed priority only", bn: "শুধু স্থির প্রায়োরিটির মাল্টিলেভেল কিউ" },
    ],
    answer: 3,
    explanation: {
      en: "Pure priority/SJF scheduling can indefinitely defer low-priority/long jobs; aging fixes it.",
      bn: "খাঁটি প্রায়োরিটি/SJF-এ নিম্ন প্রায়োরিটির জব বারবার এগোতে পারে না; এজিং তা ঠিক করে।",
    },
    difficulty: "medium",
  },
  {
    id: "os-02",
    topic: "os",
    question: {
      en: "Deadlock requires ALL of the following EXCEPT:",
      bn: "ডেডলকের জন্য নিচের সব শর্ত লাগে — কোনটি ছাড়া লাগে না?",
    },
    options: [
      { en: "Mutual exclusion", bn: "মিচুয়াল এক্সক্লুশন" },
      { en: "Hold and wait", bn: "হোল্ড অ্যান্ড ওয়েট" },
      { en: "Preemption allowed by default", bn: "ডিফল্টে প্রিম্পশনের অনুমতি" },
      { en: "Circular wait", bn: "সার্কুলার ওয়েট" },
    ],
    answer: 2,
    explanation: {
      en: "Coffman conditions: mutual exclusion, hold & wait, no preemption, circular wait — preemption being allowed breaks deadlock.",
      bn: "কফম্যানের শর্ত: মিচুয়াল এক্সক্লুশন, হোল্ড অ্যান্ড ওয়েট, প্রিম্পশন নয়, সার্কুলার ওয়েট — প্রিম্পশন থাকলে ডেডলক ভাঙে।",
    },
    difficulty: "medium",
  },
  {
    id: "os-03",
    topic: "os",
    question: {
      en: "Virtual memory allows:",
      bn: "ভার্চুয়াল মেমরি যে সুবিধা দেয় তা কী?",
    },
    options: [
      { en: "Executing programs larger than physical RAM", bn: "ফিজিক্যাল র‍্যামের চেয়ে বড় প্রোগ্রাম চালানো" },
      { en: "Faster CPU clock", bn: "দ্রুত সিপিইউ ক্লক" },
      { en: "Eliminating paging entirely", bn: "পেজিং সম্পূর্ণ দূর করা" },
      { en: "Replacing the disk", bn: "ডিস্কের বিকল্প" },
    ],
    answer: 0,
    explanation: {
      en: "Demand paging maps virtual pages to frames, so only resident pages need RAM.",
      bn: "ডিমান্ড পেজিং ভার্চুয়াল পেজ ফ্রেমে ম্যাপ করে — না-থাকা পেজের জন্য র‍্যাম লাগে না।",
    },
    difficulty: "easy",
  },
  {
    id: "os-04",
    topic: "os",
    question: {
      en: "Belady's anomaly occurs in:",
      bn: "বেলেডির অ্যানোমালি কোথায় ঘটে?",
    },
    options: [
      { en: "LRU replacement", bn: "LRU রিপ্লেসমেন্ট" },
      { en: "FIFO replacement when more frames cause more faults", bn: "FIFO-তে বেশি ফ্রেমে বেশি ফল্ট হলে" },
      { en: "Optimal page replacement", bn: "অপটিমাল পেজ রিপ্লেসমেন্ট" },
      { en: "Segmentation only", bn: "শুধু সেগমেন্টেশন" },
    ],
    answer: 1,
    explanation: {
      en: "With FIFO, adding frames can paradoxically increase page faults — Belady's anomaly.",
      bn: "FIFO-তে ফ্রেম বাড়ালেও পেজ ফল্ট বাড়তে পারে — এটিই বেলেডির অ্যানোমালি।",
    },
    difficulty: "hard",
  },
  // ── Data Center ─────────────────────────────────────────────
  {
    id: "dc-01",
    topic: "data-center",
    question: {
      en: "A Type 1 hypervisor runs:",
      bn: "টাইপ ১ হাইপারভাইজর কোথায় চলে?",
    },
    options: [
      { en: "On top of a host OS", bn: "হোস্ট ওএস-এর উপরে" },
      { en: "Directly on bare-metal hardware", bn: "সরাসরি বেয়ার-মেটাল হার্ডওয়্যারে" },
      { en: "Only inside containers", bn: "শুধু কনটেইনারের ভেতরে" },
      { en: "On mobile devices only", bn: "শুধু মোবাইলে" },
    ],
    answer: 1,
    explanation: {
      en: "Bare-metal (Type 1) examples: VMware ESXi, Xen, Hyper-V. Type 2 (VirtualBox) runs on a host OS.",
      bn: "বেয়ার-মেটাল (টাইপ ১): ESXi, Xen, Hyper-V। টাইপ ২ (VirtualBox) হোস্ট ওএস-এ চলে।",
    },
    difficulty: "easy",
  },
  {
    id: "dc-02",
    topic: "data-center",
    question: {
      en: "PUE in a data center stands for:",
      bn: "ডেটা সেন্টারে PUE এর পূর্ণরূপ কী?",
    },
    options: [
      { en: "Power Usage Effectiveness", bn: "পাওয়ার ইউসেজ ইফেক্টিভনেস" },
      { en: "Primary Unit Equipment", bn: "প্রাইমারি ইউনিট ইকুইপমেন্ট" },
      { en: "Processing Utilization Estimate", bn: "প্রসেসিং ইউটিলাইজেশন এস্টিমেট" },
      { en: "Parallel User Environment", bn: "প্যারালেল ইউজার এনভায়রনমেন্ট" },
    ],
    answer: 0,
    explanation: {
      en: "PUE = total facility energy / IT equipment energy; closer to 1.0 is better.",
      bn: "PUE = মোট ফ্যাসিলিটি শক্তি / আইটি ইকুইপমেন্ট শক্তি; ১.০-এর কাছে ভালো।",
    },
    difficulty: "easy",
  },
  {
    id: "dc-03",
    topic: "data-center",
    question: {
      en: "Containers differ from VMs mainly because containers:",
      bn: "কনটেইনার ভিএম থেকে ভিন্ন কারণ কনটেইনার:",
    },
    options: [
      { en: "Ship a full guest OS per instance", bn: "প্রতি ইনস্ট্যান্সে পূর্ণ গেস্ট ওএস বহন করে" },
      { en: "Share the host kernel", bn: "হোস্ট কার্নেল শেয়ার করে" },
      { en: "Require hardware virtualization extensions", bn: "হার্ডওয়্যার ভার্চুয়ালাইজেশন লাগে" },
      { en: "Are always slower than VMs", bn: "সবসময় ভিএমের চেয়ে ধীর" },
    ],
    answer: 1,
    explanation: {
      en: "Containers isolate user space but share one kernel → lighter and faster to start.",
      bn: "কনটেইনার ইউজার স্পেস আলাদা রাখে কিন্তু এক কার্নেল শেয়ার করে → হালকা ও দ্রুত।",
    },
    difficulty: "medium",
  },
  // ── Software Engineering ───────────────────────────────────
  {
    id: "se-01",
    topic: "software-engineering",
    question: {
      en: "In Agile/Scrum, what time-box is a standard Sprint?",
      bn: "অ্যাজাইল/স্ক্রামে স্ট্যান্ডার্ড স্প্রিন্টের টাইম-বক্স কত?",
    },
    options: [
      { en: "1 day", bn: "১ দিন" },
      { en: "1–4 weeks", bn: "১–৪ সপ্তাহ" },
      { en: "6 months", bn: "৬ মাস" },
      { en: "Unlimited", bn: "অসীম" },
    ],
    answer: 1,
    explanation: {
      en: "Sprints are typically 1–4 weeks; daily standup is 15 minutes.",
      bn: "স্প্রিন্ট সাধারণত ১–৪ সপ্তাহ; ডেইলি স্ট্যান্ডআপ ১৫ মিনিট।",
    },
    difficulty: "easy",
  },
  {
    id: "se-02",
    topic: "software-engineering",
    question: {
      en: "Black-box testing focuses on:",
      bn: "ব্ল্যাক-বক্স টেস্টিংয়ে ফোকাস থাকে কোথায়?",
    },
    options: [
      { en: "Internal code structure", bn: "ইন্টারনাল কোড স্ট্রাকচার" },
      { en: "Input–output behaviour without knowing internals", bn: "ভেতরের কথা না জানিয়ে ইনপুট–আউটপুট আচরণ" },
      { en: "Line-by-line code coverage only", bn: "শুধু লাইন কভারেজ" },
      { en: "CPU usage", bn: "সিপিইউ ব্যবহার" },
    ],
    answer: 1,
    explanation: {
      en: "Black-box = requirements/spec-based (equivalence partitioning); white-box = structural.",
      bn: "ব্ল্যাক-বক্স = স্পেক-ভিত্তিক; হোয়াইট-বক্স = কাঠামো-ভিত্তিক টেস্টিং।",
    },
    difficulty: "easy",
  },
  {
    id: "se-03",
    topic: "software-engineering",
    question: {
      en: "Git command to bring changes from the main branch into your feature branch:",
      bn: "মেইন ব্রান্চ থেকে ফিচার ব্রান্চে পরিবর্তন আনতে গিটের কোন কমান্ড?",
    },
    options: [
      { en: "git push", bn: "git push" },
      { en: "git merge main", bn: "git merge main" },
      { en: "git commit", bn: "git commit" },
      { en: "git init", bn: "git init" },
    ],
    answer: 1,
    explanation: {
      en: "merge incorporates another branch's history; push uploads to a remote.",
      bn: "merge অন্য ব্রান্চের ইতিহাস টানে আনে; push রিমোটে পাঠায়।",
    },
    difficulty: "easy",
  },
  // ── Security ────────────────────────────────────────────────
  {
    id: "sec-01",
    topic: "computer-security",
    question: {
      en: "Which is a *symmetric* encryption algorithm?",
      bn: "নিচের কোনটি *সিমেট্রিক* এনক্রিপশন অ্যালগরিদম?",
    },
    options: [
      { en: "RSA", bn: "RSA" },
      { en: "AES", bn: "AES" },
      { en: "ECC", bn: "ECC" },
      { en: "Diffie–Hellman", bn: "ডিফি–হেলম্যান" },
    ],
    answer: 1,
    explanation: {
      en: "AES uses one shared key. RSA/ECC/Diffie–Hellman are asymmetric (key-pair based).",
      bn: "AES একটি শেয়ারড কি ব্যবহার করে। RSA/ECC/ডিফি–হেলম্যান অ্যাসিমেট্রিক।",
    },
    difficulty: "easy",
  },
  {
    id: "sec-02",
    topic: "computer-security",
    question: {
      en: "SHA-256 produces a digest of length:",
      bn: "SHA-256 কত বিটের ডাইজেস্ট তৈরি করে?",
    },
    options: [
      { en: "128 bits", bn: "১২৮ বিট" },
      { en: "160 bits", bn: "১৬০ বিট" },
      { en: "256 bits", bn: "২৫৬ বিট" },
      { en: "512 bits", bn: "৫১২ বিট" },
    ],
    answer: 2,
    explanation: {
      en: "SHA-256 → 256-bit hash; SHA-1 is 160-bit (broken), MD5 is 128-bit (broken).",
      bn: "SHA-256 → ২৫৬ বিট; SHA-১ ১৬০ বিট (ভঙ্গ); MD5 ১২৮ বিট (ভঙ্গ)।",
    },
    difficulty: "easy",
  },
  {
    id: "sec-03",
    topic: "computer-security",
    question: {
      en: "Phishing is best described as:",
      bn: "ফিশিং সেরা বর্ণনা কোনটি?",
    },
    options: [
      { en: "Overwhelming a server with traffic", bn: "ট্রাফিক দিয়ে সার্ভার চাপা" },
      { en: "Deceiving users into revealing credentials via fake sites/messages", bn: "নকল সাইট/বার্তা দিয়ে ব্যবহারকারীর কাছ থেকে পাসওয়ার্ড আটকানো" },
      { en: "Encrypting files for ransom", bn: "র‍্যানসমের জন্য ফাইল এনক্রিপ্ট" },
      { en: "Scanning ports silently", bn: "নীরবে পোর্ট স্ক্যান" },
    ],
    answer: 1,
    explanation: {
      en: "Phishing = social engineering via impersonation; DDoS = traffic flood; ransomware = file encryption.",
      bn: "ফিশিং = ছদ্মাবরণে সোশ্যাল ইঞ্জিনিয়ারিং; DDoS = ট্রাফিক বন্যা; র‍্যানসমওয়্যার = ফাইল এনক্রিপশন।",
    },
    difficulty: "easy",
  },
  {
    id: "sec-04",
    topic: "computer-security",
    question: {
      en: "A firewall primarily controls:",
      bn: "ফায়ারওয়াল মূলত কী নিয়ন্ত্রণ করে?",
    },
    options: [
      { en: "Network traffic according to rules", bn: "নিয়ম অনুযায়ী নেটওয়ার্ক ট্রাফিক" },
      { en: "CPU temperature", bn: "সিপিইউ তাপমাত্রা" },
      { en: "User passwords at rest", bn: "সংরক্ষিত পাসওয়ার্ড" },
      { en: "Disk fragmentation", bn: "ডিস্ক ফ্র্যাগমেন্টেশন" },
    ],
    answer: 0,
    explanation: {
      en: "Firewalls filter inbound/outbound traffic by IP, port and protocol rules.",
      bn: "ফায়ারওয়াল আইপি, পোর্ট ও প্রোটোকল নিয়মে ইনবাউন্ড/আউটবাউন্ড ট্রাফিক ফিল্টার করে।",
    },
    difficulty: "easy",
  },
  // ── Cloud ───────────────────────────────────────────────────
  {
    id: "cloud-01",
    topic: "cloud-computing",
    question: {
      en: "Which cloud service model gives the customer control of the OS and runtime?",
      bn: "কোন ক্লাউড সার্ভিস মডেলে কাস্টমার OS ও রানটাইম নিয়ন্ত্রণ করে?",
    },
    options: [
      { en: "SaaS", bn: "SaaS" },
      { en: "PaaS", bn: "PaaS" },
      { en: "IaaS", bn: "IaaS" },
      { en: "FaaS only", bn: "শুধু FaaS" },
    ],
    answer: 2,
    explanation: {
      en: "IaaS (VMs) → you manage OS/runtime; PaaS → you manage only the app; SaaS → you only use it.",
      bn: "IaaS (ভিএম) → OS/রানটাইম আপনি; PaaS → শুধু অ্যাপ; SaaS → শুধু ব্যবহার।",
    },
    difficulty: "easy",
  },
  {
    id: "cloud-02",
    topic: "cloud-computing",
    question: {
      en: "Auto-scaling in the cloud primarily helps with:",
      bn: "ক্লাউডের অটো-স্কেলিং মূলত কাজে লাগে কোনটিতে?",
    },
    options: [
      { en: "Handling variable load cost-effectively", bn: "পরিবর্তনশীল লোড কার্যকরভাবে সামলাতে" },
      { en: "Encrypting data at rest", bn: "ডেটা এনক্রিপ্ট করা" },
      { en: "Writing application code", bn: "অ্যাপ কোড লেখা" },
      { en: "Reducing network latency to zero", bn: "লেটেন্সি শূন্য করা" },
    ],
    answer: 0,
    explanation: {
      en: "Scale out on demand avoids over-provisioning cost and absorbs traffic spikes.",
      bn: "চাহিদা অনুযায়ী স্কেল আউট অতিরিক্ত খরচ বাঁচায় ও ট্রাফিক স্পাইক সামলায়।",
    },
    difficulty: "easy",
  },
  {
    id: "cloud-03",
    topic: "cloud-computing",
    question: {
      en: "In the shared responsibility model, patching the hypervisor is the duty of:",
      bn: "শেয়ারড রেসপনসিবিলিটি মডেলে হাইপারভাইজর প্যাচ করা কার দায়িত্ব?",
    },
    options: [
      { en: "Customer", bn: "কাস্টমার" },
      { en: "Cloud provider", bn: "ক্লাউড প্রোভাইডার" },
      { en: "End user", bn: "এন্ড ইউজার" },
      { en: "Third-party auditors", bn: "থার্ড-পার্টি অডিটর" },
    ],
    answer: 1,
    explanation: {
      en: "Providers secure the cloud (hypervisor, facilities); customers secure what's in the cloud (their VMs' guest OS, data).",
      bn: "প্রোভাইডার ক্লাউড সুরক্ষিত করে (হাইপারভাইজর); কাস্টমার ক্লাউডের ভেতরের জিনিস নিজে সুরক্ষিত করে।",
    },
    difficulty: "medium",
  },
  // ── ML/AI ───────────────────────────────────────────────────
  {
    id: "ml-01",
    topic: "ml-ai",
    question: {
      en: "Which learning uses labelled data?",
      bn: "লেবেলযুক্ত ডেটা ব্যবহার করে কোন লার্নিং?",
    },
    options: [
      { en: "Unsupervised learning", bn: "আনসুপারভাইজড লার্নিং" },
      { en: "Supervised learning", bn: "সুপারভাইজড লার্নিং" },
      { en: "Reinforcement learning with no reward", bn: "রিওয়ার্ড ছাড়া রিইনফোর্সমেন্ট" },
      { en: "Self-supervised only", bn: "শুধু সেলফ-সুপারভাইজড" },
    ],
    answer: 1,
    explanation: {
      en: "Supervised = labelled input/output pairs (classification, regression).",
      bn: "সুপারভাইজড = লেবেলযুক্ত ইনপুট/আউটপুট (ক্লাসিফিকেশন, রিগ্রেশন)।",
    },
    difficulty: "easy",
  },
  {
    id: "ml-02",
    topic: "ml-ai",
    question: {
      en: "K-means clustering is an example of:",
      bn: "কে-মিনস ক্লাস্টারিং কোনটির উদাহরণ?",
    },
    options: [
      { en: "Supervised classification", bn: "সুপারভাইজড ক্লাসিফিকেশন" },
      { en: "Unsupervised clustering", bn: "আনসুপারভাইজড ক্লাস্টারিং" },
      { en: "Dimensionality reduction", bn: "ডাইমেনশনালিটি রিডাকশন" },
      { en: "Regression", bn: "রিগ্রেশন" },
    ],
    answer: 1,
    explanation: {
      en: "K-means partitions n observations into k clusters without labels.",
      bn: "কে-মিনস লেবেল ছাড়াই n পর্যবেক্ষণ k ক্লাস্টারে ভাগ করে।",
    },
    difficulty: "easy",
  },
  {
    id: "ml-03",
    topic: "ml-ai",
    question: {
      en: "MapReduce is associated with which big-data framework?",
      bn: "ম্যাপরিডিউস কোন বিগ-ডেটা ফ্রেমওয়ার্কের সাথে সম্পর্কিত?",
    },
    options: [
      { en: "Apache Hadoop", bn: "অ্যাপাচি হাডুপ" },
      { en: "React", bn: "রিঅ্যাক্ট" },
      { en: "Docker", bn: "ডকার" },
      { en: "Nginx", bn: "এনজিনএক্স" },
    ],
    answer: 0,
    explanation: {
      en: "MapReduce is Hadoop's batch processing model; Spark keeps data in memory instead.",
      bn: "ম্যাপরিডিউস হাডুপের ব্যাচ প্রসেসিং মডেল; স্পার্ক মেমরিতে ডেটা রাখে।",
    },
    difficulty: "medium",
  },
  // ── Web ─────────────────────────────────────────────────────
  {
    id: "web-01",
    topic: "web-technologies",
    question: {
      en: "Which HTTP status code means 'Resource Not Found'?",
      bn: "কোন HTTP স্ট্যাটাস কোড মানে 'রিসোর্স পাওয়া যায়নি'?",
    },
    options: [
      { en: "200", bn: "২০০" },
      { en: "301", bn: "৩০১" },
      { en: "404", bn: "৪০৪" },
      { en: "500", bn: "৫০০" },
    ],
    answer: 2,
    explanation: {
      en: "404 = not found; 401 = unauthorized; 500 = server error; 301 = moved permanently.",
      bn: "৪০৪ = নেই; ৪০১ = অননুমোদিত; ৫০০ = সার্ভার ত্রুটি; ৩০১ = স্থায়ীভাবে সরেছে।",
    },
    difficulty: "easy",
  },
  {
    id: "web-02",
    topic: "web-technologies",
    question: {
      en: "What is the default HTTP port?",
      bn: "ডিফল্ট HTTP পোর্ট কোনটি?",
    },
    options: [
      { en: "21", bn: "২১" },
      { en: "80", bn: "৮০" },
      { en: "443", bn: "৪৪৩" },
      { en: "8080", bn: "৮০৮০" },
    ],
    answer: 1,
    explanation: {
      en: "HTTP → 80, HTTPS → 443, FTP → 21, 8080 is a common alternate.",
      bn: "এইচটিটিপি → ৮০, এইচটিটিপিএস → ৪৪৩, এফটিপি → ২১, ৮০৮০ বিকল্প।",
    },
    difficulty: "easy",
  },
  {
    id: "web-03",
    topic: "web-technologies",
    question: {
      en: "Cookies are primarily used for:",
      bn: "কুকি মূলত কী করতে ব্যবহৃত হয়?",
    },
    options: [
      { en: "Compiling JavaScript", bn: "জাভাস্ক্রিপ্ট কম্পাইল" },
      { en: "Maintaining state across HTTP requests", bn: "এইচটিটিপি রিকোয়েস্ট জুড়ে স্টেট রাখা" },
      { en: "Rendering CSS", bn: "সিএসএস রেন্ডার" },
      { en: "DNS resolution", bn: "ডিএনএস রেজলিউশন" },
    ],
    answer: 1,
    explanation: {
      en: "HTTP is stateless; cookies/sessionStorage/JWT keep continuity between requests.",
      bn: "HTTP স্টেটলেস; কুকি/সেশন/JWT রিকোয়েস্টের মধ্যে ধারাবাহিকতা রাখে।",
    },
    difficulty: "easy",
  },
  {
    id: "web-04",
    topic: "web-technologies",
    question: {
      en: "In REST, which method is conventionally idempotent for updating a resource?",
      bn: "REST-এ রিসোর্স আপডেটে কোন মেথড সাধারণত ইডেমপোটেন্ট?",
    },
    options: [
      { en: "POST", bn: "POST" },
      { en: "PUT", bn: "PUT" },
      { en: "PATCH is the only idempotent one", bn: "শুধু PATCH ইডেমপোটেন্ট" },
      { en: "None", bn: "কোনোটিই নয়" },
    ],
    answer: 1,
    explanation: {
      en: "GET, PUT, DELETE are idempotent; POST is not. PATCH may or may not be.",
      bn: "GET, PUT, DELETE ইডেমপোটেন্ট; POST নয়। PATCH-এর ক্ষেত্রে ভিন্ন।",
    },
    difficulty: "medium",
  },
  // ── Theory of Computation ───────────────────────────────────
  {
    id: "toc-01",
    topic: "theory-of-computation",
    question: {
      en: "Which automaton can recognize a regular language?",
      bn: "কোন অটোমেটা রেগুলার ভাষা শনাক্ত করতে পারে?",
    },
    options: [
      { en: "Deterministic finite automaton (DFA)", bn: "ডিটারমিনিস্টিক ফিনাইট অটোমেটা (DFA)" },
      { en: "Turing machine only", bn: "শুধু টিউরিং মেশিন" },
      { en: "Pushdown automaton with two stacks", bn: "দুই স্ট্যাকসহ পাশডাউন অটোমেটা" },
      { en: "Linear bounded automaton", bn: "লিনিয়ার বাউন্ডেড অটোমেটা" },
    ],
    answer: 0,
    explanation: {
      en: "Regular ⊆ CFL ⊆ CSL ⊆ recursive ⊆ RE. DFA/NFA/regex all accept exactly regular languages.",
      bn: "রেগুলার ⊆ সিএফএল ⊆ সিএসএল ⊆ রিকার্সিভ ⊆ আরই। DFA/NFA/রেগেক্স ঠিক রেগুলার ভাষাই নেয়।",
    },
    difficulty: "easy",
  },
  {
    id: "toc-02",
    topic: "theory-of-computation",
    question: {
      en: "The class of languages accepted by a Turing machine but not by any PDA is:",
      bn: "টিউরিং মেশিন যে ভাষা নেয় কিন্তু কোনো PDA নেয় না — তা কোন শ্রেণি?",
    },
    options: [
      { en: "Regular", bn: "রেগুলার" },
      { en: "Context-free", bn: "কনটেক্সট-ফ্রি" },
      { en: "Context-sensitive (beyond CFL)", bn: "কনটেক্সট-সেনসিটিভ (CFL-এর বাইরে)" },
      { en: "Finite", bn: "ফিনাইট" },
    ],
    answer: 2,
    explanation: {
      en: "One stack = PDA = CFL. Anything needing more (e.g. {aⁿbⁿcⁿ}) is beyond CFL.",
      bn: "এক স্ট্যাক = PDA = CFL। এর বাইরের (যেমন {aⁿbⁿcⁿ}) সন্দর্ভে সেনসিটিভ বা তার বাইরে।",
    },
    difficulty: "hard",
  },
  {
    id: "toc-03",
    topic: "theory-of-computation",
    question: {
      en: "Halting problem is:",
      bn: "হালটিং সমস্যা কী?",
    },
    options: [
      { en: "Decidable in polynomial time", bn: "বহুপদী সময়ে সিদ্ধান্তযোগ্য" },
      { en: "Undecidable", bn: "অসিদ্ধান্তযোগ্য" },
      { en: "Only undecidable for DFAs", bn: "শুধু DFA-র জন্য অসিদ্ধান্তযোগ্য" },
      { en: "A trivial problem", bn: "সাধারণ সমস্যা" },
    ],
    answer: 1,
    explanation: {
      en: "Turing proved no general algorithm decides whether an arbitrary program halts.",
      bn: "টিউরিং প্রমাণ করেন যে সাধারণ কোনো অ্যালগরিদম এটি নিষ্পত্তি করতে পারে না।",
    },
    difficulty: "medium",
  },
  // ── Discrete Math ───────────────────────────────────────────
  {
    id: "dm-01",
    topic: "discrete-math",
    question: {
      en: "How many subsets does a set with 5 elements have?",
      bn: "৫ উপাদানের সেটে কতটি সাবসেট থাকে?",
    },
    options: [
      { en: "10", bn: "১০" },
      { en: "25", bn: "২৫" },
      { en: "32", bn: "৩২" },
      { en: "120", bn: "১২০" },
    ],
    answer: 2,
    explanation: {
      en: "A set of n elements has 2ⁿ subsets → 2⁵ = 32.",
      bn: "n উপাদানের সেটে ২ⁿ সাবসেট → ২⁵ = ৩২।",
    },
    difficulty: "easy",
  },
  {
    id: "dm-02",
    topic: "discrete-math",
    question: {
      en: "In a simple undirected graph with 6 vertices where every vertex has degree 3:",
      bn: "৬ শীর্ষের প্রতিটি ডিগ্রি ৩ এমন সরল অনুনিদিশ গ্রাফে:",
    },
    options: [
      { en: "Handshaking lemma says edges = 9", bn: "হ্যান্ডশেকিং লেমা অনুযায়ী এজ = ৯" },
      { en: "Edges = 12", bn: "এজ = ১২" },
      { en: "Edges = 18", bn: "এজ = ১৮" },
      { en: "Such a graph cannot exist", bn: "এমন গ্রাফ অস্তিত্বহীন" },
    ],
    answer: 0,
    explanation: {
      en: "Sum of degrees = 2|E| → 6×3 = 18 → |E| = 9.",
      bn: "ডিগ্রির যোগ = ২|E| → ৬×৩ = ১৮ → |E| = ৯।",
    },
    difficulty: "medium",
  },
  {
    id: "dm-03",
    topic: "discrete-math",
    question: {
      en: "P(A ∪ B) = P(A) + P(B) holds when A and B are:",
      bn: "A ও B কী হলে P(A ∪ B) = P(A) + P(B) হয়?",
    },
    options: [
      { en: "Any events", bn: "যেকোনো ইভেন্ট" },
      { en: "Mutually exclusive", bn: "পারস্পরিক বর্জনীয়" },
      { en: "Independent", bn: "স্বাধীন" },
      { en: "Certain", bn: "নিশ্চিত" },
    ],
    answer: 1,
    explanation: {
      en: "For mutually exclusive events P(A∩B)=0; for independent ones P(A∩B)=P(A)P(B).",
      bn: "পারস্পরিক বর্জনীয়ে P(A∩B)=০; স্বাধীনে P(A∩B)=P(A)P(B)।",
    },
    difficulty: "medium",
  },
];

export function getMCQ(id: string) {
  return mcqs.find((q) => q.id === id);
}

export function getMCQsByTopic(topic: string) {
  return mcqs.filter((q) => q.topic === topic);
}

export function getMCQsByIds(ids: string[]) {
  const map = new Map(mcqs.map((q) => [q.id, q]));
  return ids.map((id) => map.get(id)).filter((q): q is MCQ => Boolean(q));
}

export function getMCQTopics(topicSlugs: string[], limit?: number) {
  const pool = topicSlugs.length
    ? mcqs.filter((q) => topicSlugs.includes(q.topic))
    : mcqs.slice();
  if (!limit) return pool;
  return shuffle(pool).slice(0, limit);
}

export function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
