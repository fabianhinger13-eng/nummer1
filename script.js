const challenges = [
  {
    title: "Summe in einem Array",
    difficulty: "Leicht",
    description: "Implementiere solve(arr), sodass die Summe aller Zahlen im Array zurückgegeben wird.",
    starter: "function solve(arr) {\n  // TODO\n}\n",
    hint: "Nutze reduce oder eine for-Schleife.",
    tests: [
      { input: [[1, 2, 3, 4]], expected: 10 },
      { input: [[5, -2, 7]], expected: 10 }
    ]
  },
  {
    title: "String umdrehen",
    difficulty: "Leicht",
    description: "Implementiere solve(text), sodass der String rückwärts zurückgegeben wird.",
    starter: "function solve(text) {\n  // TODO\n}\n",
    hint: "split('') + reverse() + join('').",
    tests: [
      { input: ["code"], expected: "edoc" },
      { input: ["Level"], expected: "leveL" }
    ]
  },
  {
    title: "Eindeutige Werte",
    difficulty: "Mittel",
    description: "Implementiere solve(arr), sodass jedes Element nur einmal vorkommt (in Reihenfolge des ersten Auftretens).",
    starter: "function solve(arr) {\n  // TODO\n}\n",
    hint: "Set kann helfen.",
    tests: [
      { input: [[1, 1, 2, 2, 3]], expected: [1, 2, 3] },
      { input: [["a", "b", "a", "c"]], expected: ["a", "b", "c"] }
    ]
  },
  {
    title: "Fibonacci n-ter Wert",
    difficulty: "Mittel",
    description: "Implementiere solve(n), sodass die n-te Fibonacci-Zahl zurückgegeben wird (0->0, 1->1).",
    starter: "function solve(n) {\n  // TODO\n}\n",
    hint: "Iterativ ist effizienter als naive Rekursion.",
    tests: [
      { input: [0], expected: 0 },
      { input: [7], expected: 13 },
      { input: [10], expected: 55 }
    ]
  },
  {
    title: "Anagramm-Check",
    difficulty: "Schwer",
    description: "Implementiere solve(a, b), return true wenn beide Strings Anagramme sind (ohne Leerzeichen, case-insensitive).",
    starter: "function solve(a, b) {\n  // TODO\n}\n",
    hint: "Normalisieren, sortieren, vergleichen.",
    tests: [
      { input: ["Dormitory", "Dirty room"], expected: true },
      { input: ["hello", "world"], expected: false }
    ]
  }
];

const quizQuestions = [
  {
    q: "Wofür steht DRY?",
    a: ["Do Repeat Yourself", "Don't Repeat Yourself", "Data Rules Yield"],
    correct: 1
  },
  {
    q: "Welche Methode erstellt ein neues Array mit gefilterten Elementen?",
    a: ["map", "filter", "reduce"],
    correct: 1
  },
  {
    q: "Welche Komplexität hat binäre Suche auf sortiertem Array?",
    a: ["O(n)", "O(log n)", "O(n²)"],
    correct: 1
  }
];

const bugs = [
  {
    code: "if (user.loggedIn = true) { showDashboard(); }",
    options: ["= durch === ersetzen", "if darf nur mit Zahlen genutzt werden", "showDashboard muss return haben"],
    correct: 0
  },
  {
    code: "const items = [1,2,3];\nitems.map(item => { item * 2; });",
    options: ["map gibt nichts zurück, return fehlt", "items darf kein Array sein", "map braucht zwei Parameter"],
    correct: 0
  },
  {
    code: "const points = 10;\npoints += 5;",
    options: ["const kann nicht neu zugewiesen werden", "+= existiert nicht", "10 ist keine Zahl"],
    correct: 0
  }
];

const complexityRounds = [
  {
    q: "Du durchläufst ein Array genau einmal mit einer Schleife. Komplexität?",
    options: ["O(1)", "O(n)", "O(n²)"],
    correct: 1
  },
  {
    q: "Zwei verschachtelte Schleifen über n Elemente. Komplexität?",
    options: ["O(n)", "O(log n)", "O(n²)"],
    correct: 2
  },
  {
    q: "Direkter Zugriff auf arr[5]. Komplexität?",
    options: ["O(1)", "O(n)", "O(n log n)"],
    correct: 0
  }
];

const typingPrompts = [
  "for (let i = 0; i < arr.length; i++) { total += arr[i]; }",
  "const unique = [...new Set(values)];",
  "if (error) { console.error(error.message); }"
];

const achievements = [
  { key: "firstSolve", label: "🎯 Erste Challenge gelöst", unlocked: false },
  { key: "threeSolve", label: "🔥 3 Challenges gelöst", unlocked: false },
  { key: "streak5", label: "⚡ 5er-Streak erreicht", unlocked: false },
  { key: "score120", label: "🏆 120 Punkte erreicht", unlocked: false }
];

const storageKey = "codecraft-arena-v2";

const state = {
  solved: 0,
  score: 0,
  streak: 0,
  challengeIndex: 0,
  quizIndex: 0,
  bugIndex: 0,
  complexityIndex: 0,
  typingStart: 0,
  solvedChallengeIndices: []
};

const $ = (id) => document.getElementById(id);
const ui = {
  statSolved: $("statSolved"),
  statScore: $("statScore"),
  statStreak: $("statStreak"),
  statLevel: $("statLevel"),
  challengeSelect: $("challengeSelect"),
  challengeTitle: $("challengeTitle"),
  challengeDescription: $("challengeDescription"),
  challengeDifficulty: $("challengeDifficulty"),
  challengeTests: $("challengeTests"),
  codeInput: $("codeInput"),
  feedback: $("feedback"),
  quizQuestion: $("quizQuestion"),
  quizAnswers: $("quizAnswers"),
  quizResult: $("quizResult"),
  typingPrompt: $("typingPrompt"),
  typingInput: $("typingInput"),
  typingFeedback: $("typingFeedback"),
  bugCode: $("bugCode"),
  bugOptions: $("bugOptions"),
  bugFeedback: $("bugFeedback"),
  complexityQuestion: $("complexityQuestion"),
  complexityOptions: $("complexityOptions"),
  complexityFeedback: $("complexityFeedback"),
  achievementList: $("achievementList")
};

function levelFromScore(score) {
  if (score >= 250) return "Legend";
  if (score >= 160) return "Pro";
  if (score >= 90) return "Advanced";
  if (score >= 40) return "Learner";
  return "Rookie";
}

function deepEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

function setFeedback(text, ok = null) {
  ui.feedback.textContent = text;
  ui.feedback.style.borderColor = ok === true ? "rgba(73, 232, 142, 0.65)" : ok === false ? "rgba(255, 126, 145, 0.65)" : "rgba(255,255,255,0.12)";
}

function saveProgress() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function loadProgress() {
  const raw = localStorage.getItem(storageKey);
  if (!raw) return;
  try {
    const data = JSON.parse(raw);
    Object.assign(state, data);
    state.challengeIndex = Math.min(state.challengeIndex || 0, challenges.length - 1);
  } catch {
    localStorage.removeItem(storageKey);
  }
}

function refreshStats() {
  ui.statSolved.textContent = state.solved;
  ui.statScore.textContent = state.score;
  ui.statStreak.textContent = state.streak;
  ui.statLevel.textContent = levelFromScore(state.score);
}

function renderAchievements() {
  achievements.forEach((a) => {
    if (a.key === "firstSolve" && state.solved >= 1) a.unlocked = true;
    if (a.key === "threeSolve" && state.solved >= 3) a.unlocked = true;
    if (a.key === "streak5" && state.streak >= 5) a.unlocked = true;
    if (a.key === "score120" && state.score >= 120) a.unlocked = true;
  });

  ui.achievementList.innerHTML = "";
  achievements.forEach((a) => {
    const li = document.createElement("li");
    li.textContent = a.unlocked ? `✅ ${a.label}` : `⬜ ${a.label}`;
    if (a.unlocked) li.classList.add("achievement--done");
    ui.achievementList.appendChild(li);
  });
}

function populateChallengeSelect() {
  ui.challengeSelect.innerHTML = "";
  challenges.forEach((ch, index) => {
    const done = state.solvedChallengeIndices.includes(index) ? "✓ " : "";
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = `${done}${index + 1}. ${ch.title} (${ch.difficulty})`;
    ui.challengeSelect.appendChild(option);
  });
}

function renderChallenge(index) {
  state.challengeIndex = index;
  const ch = challenges[index];
  ui.challengeTitle.textContent = ch.title;
  ui.challengeDescription.textContent = ch.description;
  ui.challengeDifficulty.textContent = `Schwierigkeit: ${ch.difficulty}`;
  ui.challengeTests.innerHTML = "";
  ch.tests.forEach((test, i) => {
    const li = document.createElement("li");
    li.textContent = `Test ${i + 1}: solve(${JSON.stringify(test.input).slice(1, -1)}) ➜ ${JSON.stringify(test.expected)}`;
    ui.challengeTests.appendChild(li);
  });

  ui.challengeSelect.value = String(index);
  ui.codeInput.value = ch.starter;
  setFeedback("Schreibe deine Lösung in solve(...), dann auf 'Code testen' klicken.");
}

function blockedCode(userCode) {
  const blacklist = ["window", "document", "localStorage", "fetch", "XMLHttpRequest", "eval(", "Function("];
  const lower = userCode.toLowerCase();
  return blacklist.find((token) => lower.includes(token.toLowerCase()));
}

function runChallenge() {
  const ch = challenges[state.challengeIndex];
  const userCode = ui.codeInput.value;

  const blocked = blockedCode(userCode);
  if (blocked) {
    state.streak = 0;
    setFeedback(`⚠️ Dieser Ausdruck ist in der Challenge-Umgebung nicht erlaubt: ${blocked}`, false);
    refreshStats();
    saveProgress();
    return;
  }

  let solveFn;
  try {
    const factory = new Function(`"use strict";\n${userCode}\nif (typeof solve !== 'function') { throw new Error('Bitte definiere solve(...) als Funktion.'); }\nreturn solve;`);
    solveFn = factory();
  } catch (error) {
    state.streak = 0;
    setFeedback(`❌ Syntax-/Code-Fehler:\n${error.message}`, false);
    refreshStats();
    saveProgress();
    return;
  }

  const failedTests = [];
  ch.tests.forEach((test, i) => {
    try {
      const got = solveFn(...test.input);
      if (!deepEqual(got, test.expected)) {
        failedTests.push(`Test ${i + 1} fehlgeschlagen: erwartet ${JSON.stringify(test.expected)}, erhalten ${JSON.stringify(got)}`);
      }
    } catch (error) {
      failedTests.push(`Test ${i + 1} mit Fehler abgebrochen: ${error.message}`);
    }
  });

  if (failedTests.length === 0) {
    const firstSolveThisChallenge = !state.solvedChallengeIndices.includes(state.challengeIndex);
    if (firstSolveThisChallenge) {
      state.solved += 1;
      state.solvedChallengeIndices.push(state.challengeIndex);
      state.score += 20;
    } else {
      state.score += 5;
    }

    state.streak += 1;
    setFeedback(`✅ Stark! Alle Tests bestanden. ${firstSolveThisChallenge ? "+20 Punkte" : "+5 Punkte (Re-Solve Bonus)"}`, true);
    populateChallengeSelect();
  } else {
    state.streak = 0;
    setFeedback(`❌ Noch nicht ganz:\n- ${failedTests.join("\n- ")}`, false);
  }

  refreshStats();
  renderAchievements();
  saveProgress();
}

function renderQuiz() {
  const q = quizQuestions[state.quizIndex % quizQuestions.length];
  ui.quizQuestion.textContent = q.q;
  ui.quizAnswers.innerHTML = "";

  q.a.forEach((answer, idx) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.addEventListener("click", () => {
      if (idx === q.correct) {
        ui.quizResult.textContent = "✅ Richtig! +6 Punkte";
        state.score += 6;
        state.streak += 1;
      } else {
        ui.quizResult.textContent = "❌ Knapp daneben. Nächste Runde!";
        state.streak = 0;
      }
      state.quizIndex += 1;
      refreshStats();
      renderAchievements();
      saveProgress();
      setTimeout(renderQuiz, 700);
    });
    ui.quizAnswers.appendChild(button);
  });
}

function renderBugHunter() {
  const bug = bugs[state.bugIndex % bugs.length];
  ui.bugCode.textContent = bug.code;
  ui.bugOptions.innerHTML = "";

  bug.options.forEach((option, idx) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.addEventListener("click", () => {
      if (idx === bug.correct) {
        ui.bugFeedback.textContent = "✅ Exakt! +8 Punkte";
        state.score += 8;
        state.streak += 1;
      } else {
        ui.bugFeedback.textContent = "❌ Noch nicht korrekt analysiert.";
        state.streak = 0;
      }
      state.bugIndex += 1;
      refreshStats();
      renderAchievements();
      saveProgress();
      setTimeout(renderBugHunter, 800);
    });
    ui.bugOptions.appendChild(button);
  });
}

function renderComplexityRush() {
  const round = complexityRounds[state.complexityIndex % complexityRounds.length];
  ui.complexityQuestion.textContent = round.q;
  ui.complexityOptions.innerHTML = "";

  round.options.forEach((option, idx) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.addEventListener("click", () => {
      if (idx === round.correct) {
        ui.complexityFeedback.textContent = "✅ Nice! +7 Punkte";
        state.score += 7;
        state.streak += 1;
      } else {
        ui.complexityFeedback.textContent = "❌ Nicht ganz. Complexity nochmal ansehen.";
        state.streak = 0;
      }
      state.complexityIndex += 1;
      refreshStats();
      renderAchievements();
      saveProgress();
      setTimeout(renderComplexityRush, 700);
    });
    ui.complexityOptions.appendChild(button);
  });
}

function nextTypingPrompt() {
  const prompt = typingPrompts[Math.floor(Math.random() * typingPrompts.length)];
  ui.typingPrompt.textContent = prompt;
  ui.typingInput.value = "";
  state.typingStart = performance.now();
}

function onTypingInput() {
  const target = ui.typingPrompt.textContent;
  if (ui.typingInput.value === target) {
    const elapsed = (performance.now() - state.typingStart) / 1000;
    const points = Math.max(4, Math.round(18 - elapsed));
    ui.typingFeedback.textContent = `✅ Perfekt in ${elapsed.toFixed(2)}s · +${points} Punkte`;
    state.score += points;
    state.streak += 1;
    refreshStats();
    renderAchievements();
    saveProgress();
    setTimeout(nextTypingPrompt, 600);
  }
}

function nextChallenge() {
  const next = (state.challengeIndex + 1) % challenges.length;
  renderChallenge(next);
}

function resetChallengeCode() {
  ui.codeInput.value = challenges[state.challengeIndex].starter;
  setFeedback("Code wurde zurückgesetzt.");
}

function showHint() {
  const ch = challenges[state.challengeIndex];
  setFeedback(`💡 Hint: ${ch.hint}`);
  state.streak = 0;
  refreshStats();
  renderAchievements();
  saveProgress();
}

function bindEvents() {
  $("runCodeBtn").addEventListener("click", runChallenge);
  $("showSolutionBtn").addEventListener("click", showHint);
  $("resetCodeBtn").addEventListener("click", resetChallengeCode);
  $("nextChallengeBtn").addEventListener("click", nextChallenge);
  ui.challengeSelect.addEventListener("change", (e) => renderChallenge(Number(e.target.value)));
  ui.typingInput.addEventListener("input", onTypingInput);
}

function init() {
  loadProgress();
  populateChallengeSelect();
  renderChallenge(state.challengeIndex);
  renderQuiz();
  renderBugHunter();
  renderComplexityRush();
  nextTypingPrompt();
  refreshStats();
  renderAchievements();
  bindEvents();
}

init();
