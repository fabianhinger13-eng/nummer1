 (cd "$(git rev-parse --show-toplevel)" && git apply --3way <<'EOF' 
diff --git a/index.html b/index.html
new file mode 100644
index 0000000000000000000000000000000000000000..ca93073b26be0bb3193038f48bb0294cc7446766
--- /dev/null
+++ b/index.html
@@ -0,0 +1,152 @@
+<!DOCTYPE html>
+<html lang="de">
+  <head>
+    <meta charset="UTF-8" />
+    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
+    <title>CodeCraft Arena 2.0 – Programmieren lernen wie ein Game</title>
+    <meta
+      name="description"
+      content="Interaktive Lernplattform für Programmieren mit Coding-Challenges, Quiz, Minigames, XP-System und Lernfortschritt."
+    />
+    <link rel="stylesheet" href="styles.css" />
+  </head>
+  <body>
+    <header class="hero">
+      <div class="hero__content panel">
+        <p class="tag">Build · Learn · Play</p>
+        <h1>CodeCraft Arena 2.0</h1>
+        <p>
+          Die bessere Coding-Website: strukturiertes Lernen, echtes Feedback, Level-System
+          und kurze Minigames, damit du täglich dranbleibst.
+        </p>
+        <div class="hero__cta">
+          <a class="button" href="#uebungen">Mit Challenge starten</a>
+          <button id="resetProgressBtn" class="ghost">Fortschritt zurücksetzen</button>
+        </div>
+      </div>
+
+      <aside class="hero__stats panel" aria-label="Fortschrittsübersicht">
+        <div class="stat"><strong id="levelCount">1</strong><span>Level</span></div>
+        <div class="stat"><strong id="xpCount">0</strong><span>XP</span></div>
+        <div class="stat"><strong id="solvedCount">0</strong><span>Gelöst</span></div>
+        <div class="stat"><strong id="streakCount">0</strong><span>Streak</span></div>
+      </aside>
+    </header>
+
+    <main>
+      <section class="card" id="progress">
+        <div class="section-title">
+          <h2>Dein Lernfortschritt</h2>
+          <p id="progressLabel">0 / 120 XP zum nächsten Level</p>
+        </div>
+        <div class="progress-wrap" role="progressbar" aria-valuemin="0" aria-valuemax="120" aria-valuenow="0">
+          <div id="xpBar" class="progress-fill"></div>
+        </div>
+        <div id="badgeList" class="chips" aria-live="polite"></div>
+      </section>
+
+      <section id="roadmap" class="card">
+        <div class="section-title">
+          <h2>Lernpfad mit Fokus</h2>
+          <p>Arbeite den Pfad in Reihenfolge durch, um Grundlagen und Praxis zu kombinieren.</p>
+        </div>
+        <div class="roadmap-grid" id="roadmapGrid"></div>
+      </section>
+
+      <section id="uebungen" class="card">
+        <div class="section-title">
+          <h2>Smart Coding Challenges</h2>
+          <p>Jede Aufgabe hat Schwierigkeit, Tests und direktes Ergebnis-Feedback.</p>
+        </div>
+
+        <div class="challenge-toolbar">
+          <label>
+            Schwierigkeit
+            <select id="difficultyFilter">
+              <option value="all">Alle</option>
+              <option value="easy">Leicht</option>
+              <option value="medium">Mittel</option>
+              <option value="hard">Schwer</option>
+            </select>
+          </label>
+
+          <label>
+            Aufgabe
+            <select id="challengeSelect"></select>
+          </label>
+        </div>
+
+        <article class="challenge-meta panel-soft">
+          <h3 id="challengeTitle"></h3>
+          <p id="challengeDescription"></p>
+          <ul id="challengeTests" class="test-list"></ul>
+        </article>
+
+        <label for="codeInput">Dein JavaScript-Code</label>
+        <textarea id="codeInput" rows="9" spellcheck="false"></textarea>
+
+        <div class="actions">
+          <button id="runCodeBtn">Tests ausführen</button>
+          <button id="showSolutionBtn" class="ghost">Hinweis / Lösungsidee</button>
+          <button id="nextChallengeBtn" class="ghost">Nächste Aufgabe</button>
+        </div>
+
+        <pre id="feedback" aria-live="polite"></pre>
+      </section>
+
+      <section id="daily" class="card">
+        <div class="section-title">
+          <h2>Daily Mission</h2>
+          <p>3 kleine Tagesziele für konstanten Fortschritt.</p>
+        </div>
+        <ul id="dailyMissionList" class="daily-list"></ul>
+      </section>
+
+      <section id="quiz" class="card">
+        <div class="section-title">
+          <h2>Quick Quiz</h2>
+          <p>Kurze Fragen für Theorie-Reflexe.</p>
+        </div>
+        <p id="quizQuestion"></p>
+        <div id="quizAnswers" class="quiz-grid"></div>
+        <p id="quizResult"></p>
+      </section>
+
+      <section id="minigames" class="card minigames">
+        <div class="section-title">
+          <h2>Minigames</h2>
+          <p>Motivations-Boost zwischen den Aufgaben.</p>
+        </div>
+
+        <article class="game-block panel-soft">
+          <h3>⚡ Speed-Typer</h3>
+          <code id="typingPrompt"></code>
+          <input id="typingInput" type="text" placeholder="Code exakt eintippen…" />
+          <p id="typingFeedback"></p>
+        </article>
+
+        <article class="game-block panel-soft">
+          <h3>🐞 Bug Hunter</h3>
+          <code id="bugCode"></code>
+          <div id="bugOptions" class="quiz-grid"></div>
+          <p id="bugFeedback"></p>
+        </article>
+
+        <article class="game-block panel-soft">
+          <h3>🧠 Pattern Memory</h3>
+          <p>Merke dir die Zahlenfolge und gib sie ein.</p>
+          <p id="memoryPrompt" class="memory-prompt">-</p>
+          <input id="memoryInput" type="text" placeholder="z. B. 3-1-4" />
+          <button id="memoryCheckBtn">Prüfen</button>
+          <p id="memoryFeedback"></p>
+        </article>
+      </section>
+    </main>
+
+    <footer>
+      <p>CodeCraft Arena 2.0 – Mehr Struktur, mehr Motivation, mehr Lernfortschritt.</p>
+    </footer>
+
+    <script src="script.js"></script>
+  </body>
+</html>
diff --git a/script.js b/script.js
new file mode 100644
index 0000000000000000000000000000000000000000..e22615f8b25075eb669a0295e70955f49f3f146f
--- /dev/null
+++ b/script.js
@@ -0,0 +1,470 @@
+const XP_PER_LEVEL = 120;
+
+const roadmapSteps = [
+  "Syntax-Basics",
+  "Funktionen & Scope",
+  "Arrays & Objects",
+  "Algorithmen",
+  "Debugging",
+  "Mini-Projekte"
+];
+
+const challenges = [
+  {
+    id: "sum",
+    difficulty: "easy",
+    title: "Summe berechnen",
+    description: "Implementiere add(a, b), damit beide Zahlen addiert werden.",
+    starter: "function add(a, b) {\n  // TODO\n}\n\nreturn add(9, 8);",
+    hint: "Nutze den + Operator und return.",
+    tests: [
+      "add(9, 8) sollte 17 ergeben",
+      "add(-1, 2) sollte 1 ergeben"
+    ],
+    validate: (fnResult, userFn) => fnResult === 17 && userFn("add", -1, 2) === 1
+  },
+  {
+    id: "palindrome",
+    difficulty: "medium",
+    title: "Palindrome prüfen",
+    description: "Schreibe isPalindrome(text), das true für z. B. 'level' liefert.",
+    starter:
+      "function isPalindrome(text) {\n  // TODO\n}\n\nreturn isPalindrome('level');",
+    hint: "Vergleiche String und umgedrehte Version (split/reverse/join).",
+    tests: ["isPalindrome('level') => true", "isPalindrome('code') => false"],
+    validate: (fnResult, userFn) => fnResult === true && userFn("isPalindrome", "code") === false
+  },
+  {
+    id: "array-average",
+    difficulty: "medium",
+    title: "Array-Durchschnitt",
+    description: "Erstelle avg(nums), das den Durchschnitt eines Zahlenarrays zurückgibt.",
+    starter:
+      "function avg(nums) {\n  // TODO\n}\n\nreturn avg([2, 4, 6, 8]);",
+    hint: "Nutze reduce und teile durch nums.length.",
+    tests: ["avg([2,4,6,8]) => 5", "avg([10,20]) => 15"],
+    validate: (fnResult, userFn) => fnResult === 5 && userFn("avg", [10, 20]) === 15
+  },
+  {
+    id: "frequency-map",
+    difficulty: "hard",
+    title: "Häufigkeit zählen",
+    description:
+      "Schreibe countLetters(word), das ein Objekt mit Zeichenhäufigkeiten zurückgibt.",
+    starter:
+      "function countLetters(word) {\n  // TODO\n}\n\nreturn countLetters('banana');",
+    hint: "Iteriere über jeden Buchstaben und erhöhe den Zähler im Objekt.",
+    tests: ["countLetters('banana').a => 3", "countLetters('aba').b => 1"],
+    validate: (fnResult, userFn) => fnResult?.a === 3 && userFn("countLetters", "aba")?.b === 1
+  }
+];
+
+const quizzes = [
+  {
+    q: "Welche Methode erzeugt ein neues Array basierend auf jedem Element?",
+    options: ["map", "find", "forEach"],
+    answer: 0
+  },
+  {
+    q: "Welche Laufzeit hat lineare Suche im Worst Case?",
+    options: ["O(1)", "O(log n)", "O(n)"],
+    answer: 2
+  },
+  {
+    q: "Was ist immutable?",
+    options: ["Nicht veränderbar", "Nur lesbar im Browser", "Immer ein Number-Typ"],
+    answer: 0
+  }
+];
+
+const bugs = [
+  {
+    code: "if (score => 10) { unlock(); }",
+    options: ["=> muss >= sein", "unlock() ist falsch geschrieben", "if darf hier nicht stehen"],
+    answer: 0
+  },
+  {
+    code: "const total = prices.reduce((acc, n) => acc + n);",
+    options: ["reduce braucht Startwert oder abgesichertes Array", "prices muss String sein", "const ist verboten"],
+    answer: 0
+  }
+];
+
+const typingPrompts = [
+  "const sum = nums.reduce((a, n) => a + n, 0);",
+  "for (const item of list) { console.log(item); }",
+  "if (!user) return 'Bitte einloggen';"
+];
+
+const state = {
+  solved: 0,
+  xp: 0,
+  streak: 0,
+  level: 1,
+  challengeIndex: 0,
+  quizIndex: 0,
+  bugIndex: 0,
+  typingStart: 0,
+  memorySequence: [],
+  solvedChallengeIds: new Set(),
+  doneDaily: new Set()
+};
+
+const els = {
+  levelCount: document.getElementById("levelCount"),
+  xpCount: document.getElementById("xpCount"),
+  solvedCount: document.getElementById("solvedCount"),
+  streakCount: document.getElementById("streakCount"),
+  progressLabel: document.getElementById("progressLabel"),
+  xpBar: document.getElementById("xpBar"),
+  badgeList: document.getElementById("badgeList"),
+  roadmapGrid: document.getElementById("roadmapGrid"),
+  difficultyFilter: document.getElementById("difficultyFilter"),
+  challengeSelect: document.getElementById("challengeSelect"),
+  challengeTitle: document.getElementById("challengeTitle"),
+  challengeDescription: document.getElementById("challengeDescription"),
+  challengeTests: document.getElementById("challengeTests"),
+  codeInput: document.getElementById("codeInput"),
+  feedback: document.getElementById("feedback"),
+  dailyMissionList: document.getElementById("dailyMissionList"),
+  quizQuestion: document.getElementById("quizQuestion"),
+  quizAnswers: document.getElementById("quizAnswers"),
+  quizResult: document.getElementById("quizResult"),
+  bugCode: document.getElementById("bugCode"),
+  bugOptions: document.getElementById("bugOptions"),
+  bugFeedback: document.getElementById("bugFeedback"),
+  typingPrompt: document.getElementById("typingPrompt"),
+  typingInput: document.getElementById("typingInput"),
+  typingFeedback: document.getElementById("typingFeedback"),
+  memoryPrompt: document.getElementById("memoryPrompt"),
+  memoryInput: document.getElementById("memoryInput"),
+  memoryFeedback: document.getElementById("memoryFeedback")
+};
+
+function saveState() {
+  const serializable = {
+    solved: state.solved,
+    xp: state.xp,
+    streak: state.streak,
+    level: state.level,
+    solvedChallengeIds: [...state.solvedChallengeIds],
+    doneDaily: [...state.doneDaily]
+  };
+  localStorage.setItem("codecraft-arena-state-v2", JSON.stringify(serializable));
+}
+
+function loadState() {
+  const raw = localStorage.getItem("codecraft-arena-state-v2");
+  if (!raw) return;
+  try {
+    const parsed = JSON.parse(raw);
+    state.solved = parsed.solved ?? 0;
+    state.xp = parsed.xp ?? 0;
+    state.streak = parsed.streak ?? 0;
+    state.level = parsed.level ?? 1;
+    state.solvedChallengeIds = new Set(parsed.solvedChallengeIds ?? []);
+    state.doneDaily = new Set(parsed.doneDaily ?? []);
+  } catch {
+    localStorage.removeItem("codecraft-arena-state-v2");
+  }
+}
+
+function addXP(amount) {
+  state.xp += amount;
+  state.level = Math.max(1, Math.floor(state.xp / XP_PER_LEVEL) + 1);
+}
+
+function updateUIStats() {
+  els.levelCount.textContent = state.level;
+  els.xpCount.textContent = state.xp;
+  els.solvedCount.textContent = state.solved;
+  els.streakCount.textContent = state.streak;
+
+  const currentLevelXP = state.xp % XP_PER_LEVEL;
+  els.progressLabel.textContent = `${currentLevelXP} / ${XP_PER_LEVEL} XP zum nächsten Level`;
+  els.xpBar.style.width = `${(currentLevelXP / XP_PER_LEVEL) * 100}%`;
+
+  renderBadges();
+  renderDailyMissions();
+  saveState();
+}
+
+function renderBadges() {
+  const badges = [];
+  if (state.solved >= 1) badges.push("🥉 Erste Challenge");
+  if (state.solved >= 3) badges.push("🥈 3 Challenges gelöst");
+  if (state.solved >= 6) badges.push("🥇 Challenge-Master");
+  if (state.streak >= 4) badges.push("🔥 Streak x4");
+  if (state.level >= 3) badges.push("🚀 Level 3 erreicht");
+  els.badgeList.innerHTML = badges.length ? badges.map((b) => `<span>${b}</span>`).join("") : "<span>Noch keine Badges – leg los!</span>";
+}
+
+function renderRoadmap() {
+  els.roadmapGrid.innerHTML = roadmapSteps
+    .map((step, i) => `<article class="roadmap-step"><strong>${i + 1}.</strong> ${step}</article>`)
+    .join("");
+}
+
+function getFilteredChallenges() {
+  const diff = els.difficultyFilter.value;
+  return diff === "all" ? challenges : challenges.filter((c) => c.difficulty === diff);
+}
+
+function renderChallengeSelect() {
+  const filtered = getFilteredChallenges();
+  els.challengeSelect.innerHTML = "";
+  filtered.forEach((challenge, index) => {
+    const opt = document.createElement("option");
+    opt.value = String(index);
+    opt.textContent = `[${challenge.difficulty.toUpperCase()}] ${challenge.title}`;
+    els.challengeSelect.appendChild(opt);
+  });
+
+  state.challengeIndex = 0;
+  renderChallenge();
+}
+
+function getCurrentChallenge() {
+  const filtered = getFilteredChallenges();
+  return filtered[state.challengeIndex] ?? filtered[0];
+}
+
+function renderChallenge() {
+  const challenge = getCurrentChallenge();
+  if (!challenge) {
+    els.challengeTitle.textContent = "Keine Aufgabe gefunden";
+    els.challengeDescription.textContent = "Bitte Filter ändern.";
+    els.challengeTests.innerHTML = "";
+    return;
+  }
+
+  els.challengeTitle.textContent = challenge.title;
+  els.challengeDescription.textContent = challenge.description;
+  els.challengeTests.innerHTML = challenge.tests.map((t) => `<li>${t}</li>`).join("");
+  els.codeInput.value = challenge.starter;
+  els.feedback.textContent = "";
+}
+
+function getUserFunction(script) {
+  return (fnName, ...args) => {
+    const userFunc = new Function(
+      "args",
+      `'use strict';\n${script}\nif (typeof ${fnName} !== 'function') { throw new Error('Funktion ${fnName} fehlt.'); }\nreturn ${fnName}.apply(null, args);`
+    );
+    return userFunc(args);
+  };
+}
+
+function checkDailyMissions(type) {
+  const rules = {
+    challenge: "challenge_done",
+    quiz: "quiz_done",
+    minigame: "minigame_done"
+  };
+  const key = rules[type];
+  if (key && !state.doneDaily.has(key)) {
+    state.doneDaily.add(key);
+    addXP(10);
+    els.feedback.textContent += "\n🎯 Daily Mission erfüllt! +10 XP";
+  }
+}
+
+function runChallenge() {
+  const challenge = getCurrentChallenge();
+  if (!challenge) return;
+
+  const source = els.codeInput.value;
+  try {
+    const runner = new Function(`'use strict';\n${source}`);
+    const fnResult = runner();
+    const userFn = getUserFunction(source);
+    const passed = challenge.validate(fnResult, userFn);
+
+    if (passed) {
+      const firstTime = !state.solvedChallengeIds.has(challenge.id);
+      if (firstTime) {
+        state.solvedChallengeIds.add(challenge.id);
+        state.solved += 1;
+        addXP(challenge.difficulty === "hard" ? 35 : challenge.difficulty === "medium" ? 25 : 18);
+      }
+      state.streak += 1;
+      checkDailyMissions("challenge");
+      els.feedback.textContent = `✅ Bestanden! ${firstTime ? "Neue Aufgabe gelöst." : "Schon gelöst, aber sauber!"}`;
+      els.feedback.className = "success";
+    } else {
+      state.streak = 0;
+      els.feedback.textContent = `❌ Tests fehlgeschlagen. Ergebnis: ${JSON.stringify(fnResult)}`;
+      els.feedback.className = "error";
+    }
+  } catch (error) {
+    state.streak = 0;
+    els.feedback.textContent = `⚠️ Fehler: ${error.message}`;
+    els.feedback.className = "warning";
+  }
+
+  updateUIStats();
+}
+
+function showHint() {
+  const challenge = getCurrentChallenge();
+  if (!challenge) return;
+  els.feedback.textContent = `💡 Hinweis: ${challenge.hint}`;
+  els.feedback.className = "warning";
+}
+
+function nextChallenge() {
+  const filtered = getFilteredChallenges();
+  if (!filtered.length) return;
+  state.challengeIndex = (state.challengeIndex + 1) % filtered.length;
+  els.challengeSelect.value = String(state.challengeIndex);
+  renderChallenge();
+}
+
+function renderDailyMissions() {
+  const missions = [
+    ["challenge_done", "Löse 1 Coding-Challenge"],
+    ["quiz_done", "Beantworte 1 Quizfrage richtig"],
+    ["minigame_done", "Gewinne 1 Minigame-Runde"]
+  ];
+
+  els.dailyMissionList.innerHTML = missions
+    .map(([id, text]) => {
+      const done = state.doneDaily.has(id);
+      return `<li>${done ? "✅" : "⬜"} ${text}</li>`;
+    })
+    .join("");
+}
+
+function renderQuiz() {
+  const quiz = quizzes[state.quizIndex % quizzes.length];
+  els.quizQuestion.textContent = quiz.q;
+  els.quizAnswers.innerHTML = "";
+  quiz.options.forEach((option, idx) => {
+    const btn = document.createElement("button");
+    btn.textContent = option;
+    btn.addEventListener("click", () => {
+      if (idx === quiz.answer) {
+        els.quizResult.textContent = "✅ Richtig! +8 XP";
+        addXP(8);
+        state.streak += 1;
+        checkDailyMissions("quiz");
+      } else {
+        els.quizResult.textContent = "❌ Nicht richtig – nächste Frage!";
+        state.streak = 0;
+      }
+      state.quizIndex += 1;
+      updateUIStats();
+      setTimeout(renderQuiz, 600);
+    });
+    els.quizAnswers.appendChild(btn);
+  });
+}
+
+function renderBugHunter() {
+  const bug = bugs[state.bugIndex % bugs.length];
+  els.bugCode.textContent = bug.code;
+  els.bugOptions.innerHTML = "";
+  bug.options.forEach((option, idx) => {
+    const btn = document.createElement("button");
+    btn.textContent = option;
+    btn.addEventListener("click", () => {
+      if (idx === bug.answer) {
+        els.bugFeedback.textContent = "✅ Korrekt erkannt! +9 XP";
+        addXP(9);
+        state.streak += 1;
+        checkDailyMissions("minigame");
+      } else {
+        els.bugFeedback.textContent = "❌ Fast. Achte auf Operatoren/Syntax.";
+        state.streak = 0;
+      }
+      state.bugIndex += 1;
+      updateUIStats();
+      setTimeout(renderBugHunter, 700);
+    });
+    els.bugOptions.appendChild(btn);
+  });
+}
+
+function nextTypingPrompt() {
+  const prompt = typingPrompts[Math.floor(Math.random() * typingPrompts.length)];
+  els.typingPrompt.textContent = prompt;
+  els.typingInput.value = "";
+  state.typingStart = performance.now();
+}
+
+function setupTypingGame() {
+  nextTypingPrompt();
+  els.typingInput.addEventListener("input", () => {
+    if (els.typingInput.value === els.typingPrompt.textContent) {
+      const sec = (performance.now() - state.typingStart) / 1000;
+      const xp = Math.max(5, Math.round(16 - sec));
+      addXP(xp);
+      state.streak += 1;
+      checkDailyMissions("minigame");
+      els.typingFeedback.textContent = `✅ ${sec.toFixed(2)}s · +${xp} XP`;
+      updateUIStats();
+      setTimeout(nextTypingPrompt, 600);
+    }
+  });
+}
+
+function newMemorySequence() {
+  const len = Math.min(6, 3 + Math.floor(state.level / 2));
+  state.memorySequence = Array.from({ length: len }, () => Math.floor(Math.random() * 10));
+  els.memoryPrompt.textContent = state.memorySequence.join("-");
+  setTimeout(() => {
+    els.memoryPrompt.textContent = "Jetzt eingeben…";
+  }, 1400);
+}
+
+function setupMemoryGame() {
+  newMemorySequence();
+  document.getElementById("memoryCheckBtn").addEventListener("click", () => {
+    const input = els.memoryInput.value.replace(/\s+/g, "");
+    const target = state.memorySequence.join("-");
+    if (input === target) {
+      const xp = 12;
+      addXP(xp);
+      state.streak += 1;
+      checkDailyMissions("minigame");
+      els.memoryFeedback.textContent = `✅ Perfekt gemerkt! +${xp} XP`;
+    } else {
+      state.streak = 0;
+      els.memoryFeedback.textContent = `❌ Richtig wäre: ${target}`;
+    }
+    els.memoryInput.value = "";
+    updateUIStats();
+    setTimeout(newMemorySequence, 700);
+  });
+}
+
+function bindEvents() {
+  document.getElementById("runCodeBtn").addEventListener("click", runChallenge);
+  document.getElementById("showSolutionBtn").addEventListener("click", showHint);
+  document.getElementById("nextChallengeBtn").addEventListener("click", nextChallenge);
+
+  els.difficultyFilter.addEventListener("change", renderChallengeSelect);
+  els.challengeSelect.addEventListener("change", (event) => {
+    state.challengeIndex = Number(event.target.value);
+    renderChallenge();
+  });
+
+  document.getElementById("resetProgressBtn").addEventListener("click", () => {
+    localStorage.removeItem("codecraft-arena-state-v2");
+    window.location.reload();
+  });
+}
+
+function init() {
+  loadState();
+  renderRoadmap();
+  renderChallengeSelect();
+  renderQuiz();
+  renderBugHunter();
+  setupTypingGame();
+  setupMemoryGame();
+  bindEvents();
+  updateUIStats();
+}
+
+init();
diff --git a/styles.css b/styles.css
new file mode 100644
index 0000000000000000000000000000000000000000..d08aa1570c7363a472da84a51e054ae1590e5cf6
--- /dev/null
+++ b/styles.css
@@ -0,0 +1,281 @@
+:root {
+  --bg: #060a19;
+  --panel: #121933;
+  --panel-soft: #182246;
+  --text: #ebf1ff;
+  --muted: #9bacd9;
+  --accent: #5be7ff;
+  --accent-2: #9bff8c;
+  --warn: #ffd36f;
+  --danger: #ff768d;
+  --radius: 16px;
+  --shadow: 0 16px 34px rgba(0, 0, 0, 0.35);
+}
+
+* {
+  box-sizing: border-box;
+}
+
+body {
+  margin: 0;
+  font-family: Inter, "Segoe UI", Roboto, sans-serif;
+  color: var(--text);
+  background: radial-gradient(circle at 5% 0%, #23326a 0, #0e1631 35%, var(--bg) 70%);
+  line-height: 1.55;
+}
+
+h1,
+h2,
+h3,
+p {
+  margin-top: 0;
+}
+
+.hero,
+main,
+footer {
+  max-width: 1120px;
+  margin-inline: auto;
+  padding-inline: 1rem;
+}
+
+.hero {
+  display: grid;
+  grid-template-columns: 2fr 1fr;
+  gap: 1rem;
+  margin-top: 1.5rem;
+}
+
+.panel,
+.card {
+  background: linear-gradient(160deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.01));
+  border: 1px solid rgba(255, 255, 255, 0.08);
+  border-radius: var(--radius);
+  box-shadow: var(--shadow);
+}
+
+.panel {
+  padding: 1.5rem;
+}
+
+.panel-soft {
+  background: var(--panel-soft);
+  border: 1px solid rgba(255, 255, 255, 0.09);
+  border-radius: 12px;
+  padding: 1rem;
+}
+
+.tag {
+  font-size: 0.8rem;
+  text-transform: uppercase;
+  letter-spacing: 0.11em;
+  color: var(--accent);
+}
+
+h1 {
+  font-size: clamp(2rem, 3vw, 3rem);
+  line-height: 1.15;
+}
+
+.hero__cta {
+  display: flex;
+  gap: 0.7rem;
+  flex-wrap: wrap;
+}
+
+.hero__stats {
+  display: grid;
+  gap: 0.6rem;
+  align-content: start;
+}
+
+.stat {
+  background: var(--panel-soft);
+  border-radius: 10px;
+  padding: 0.8rem;
+  display: flex;
+  flex-direction: column;
+}
+
+.stat strong {
+  color: var(--accent-2);
+  font-size: 1.7rem;
+}
+
+main {
+  display: grid;
+  gap: 1rem;
+  margin-top: 1rem;
+}
+
+.card {
+  padding: 1.2rem;
+}
+
+.section-title {
+  display: flex;
+  justify-content: space-between;
+  gap: 1rem;
+  flex-wrap: wrap;
+}
+
+.progress-wrap {
+  width: 100%;
+  height: 14px;
+  background: #0d142f;
+  border-radius: 999px;
+  overflow: hidden;
+  border: 1px solid rgba(255, 255, 255, 0.12);
+}
+
+.progress-fill {
+  height: 100%;
+  width: 0;
+  border-radius: inherit;
+  background: linear-gradient(120deg, var(--accent), var(--accent-2));
+  transition: width 220ms ease;
+}
+
+.chips {
+  margin-top: 0.8rem;
+  display: flex;
+  flex-wrap: wrap;
+  gap: 0.55rem;
+}
+
+.chips span {
+  background: var(--panel-soft);
+  border: 1px solid rgba(255, 255, 255, 0.09);
+  border-radius: 999px;
+  padding: 0.35rem 0.75rem;
+  font-size: 0.86rem;
+}
+
+.roadmap-grid {
+  display: grid;
+  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
+  gap: 0.6rem;
+}
+
+.roadmap-step {
+  background: var(--panel-soft);
+  border-radius: 10px;
+  padding: 0.8rem;
+  border: 1px solid rgba(255, 255, 255, 0.08);
+}
+
+.challenge-toolbar {
+  display: grid;
+  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
+  gap: 0.8rem;
+}
+
+select,
+textarea,
+input,
+button {
+  font: inherit;
+}
+
+select,
+textarea,
+input {
+  width: 100%;
+  margin-top: 0.35rem;
+  background: #0d1430;
+  border: 1px solid rgba(255, 255, 255, 0.18);
+  border-radius: 10px;
+  color: var(--text);
+  padding: 0.7rem;
+}
+
+button,
+.button {
+  border: none;
+  border-radius: 10px;
+  padding: 0.68rem 1rem;
+  background: linear-gradient(120deg, var(--accent), #79ffd0);
+  color: #00202b;
+  font-weight: 700;
+  text-decoration: none;
+  cursor: pointer;
+}
+
+button.ghost {
+  background: transparent;
+  color: var(--text);
+  border: 1px solid rgba(255, 255, 255, 0.22);
+}
+
+.actions {
+  margin-top: 0.6rem;
+  display: flex;
+  flex-wrap: wrap;
+  gap: 0.55rem;
+}
+
+.test-list,
+.daily-list {
+  margin: 0.4rem 0 0;
+  padding-left: 1rem;
+  color: var(--muted);
+}
+
+pre,
+#quizResult,
+#typingFeedback,
+#bugFeedback,
+#memoryFeedback,
+.memory-prompt {
+  margin-top: 0.6rem;
+  background: #0d1430;
+  border: 1px solid rgba(255, 255, 255, 0.12);
+  border-radius: 10px;
+  padding: 0.7rem;
+  min-height: 46px;
+  white-space: pre-wrap;
+}
+
+.quiz-grid {
+  display: grid;
+  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
+  gap: 0.5rem;
+}
+
+.minigames {
+  display: grid;
+  gap: 0.8rem;
+}
+
+.game-block code {
+  display: block;
+  margin: 0.5rem 0;
+  background: #0d1430;
+  border-radius: 8px;
+  padding: 0.65rem;
+  color: #a5e9ff;
+}
+
+.success {
+  color: var(--accent-2);
+}
+
+.warning {
+  color: var(--warn);
+}
+
+.error {
+  color: var(--danger);
+}
+
+footer {
+  text-align: center;
+  color: var(--muted);
+  margin: 1.1rem auto 2rem;
+}
+
+@media (max-width: 900px) {
+  .hero {
+    grid-template-columns: 1fr;
+  }
+}
 
EOF
)
