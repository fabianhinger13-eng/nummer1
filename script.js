const exercisesByGroup = {
  Brust: [
    { name: 'Bankdrücken', tip: 'Ellbogen stabil, Schulterblätter hinten halten.' },
    { name: 'Schrägbank Kurzhantel', tip: 'Langsam ablassen, explosiv drücken.' },
    { name: 'Kabel-Flys', tip: 'Brustspannung halten, nicht schwingen.' }
  ],
  Rücken: [
    { name: 'Klimmzüge', tip: 'Volle Streckung, Brust zur Stange.' },
    { name: 'Rudern Maschine', tip: 'Aus dem Rücken ziehen, nicht nur aus den Armen.' },
    { name: 'Latziehen', tip: 'Stange zur oberen Brust führen.' }
  ],
  Beine: [
    { name: 'Kniebeuge', tip: 'Core anspannen, Knie sauber führen.' },
    { name: 'Beinpresse', tip: 'Kontrollierte Tiefe, Fersen fest.' },
    { name: 'Rumänisches Kreuzheben', tip: 'Rücken neutral, Hüfte nach hinten.' }
  ],
  Schultern: [
    { name: 'Schulterdrücken', tip: 'Keine Hohlkreuz-Position erzwingen.' },
    { name: 'Seitheben', tip: 'Leicht gebeugte Arme, kontrolliert heben.' },
    { name: 'Face Pulls', tip: 'Zur Stirn ziehen und Schulterblatt aktivieren.' }
  ],
  Arme: [
    { name: 'Bizeps-Curls', tip: 'Ellbogen nah am Körper halten.' },
    { name: 'Trizeps Pushdown', tip: 'Am Ende komplett strecken.' },
    { name: 'Hammer Curls', tip: 'Neutraler Griff, kein Schwung.' }
  ]
};

const groupSelect = document.getElementById('muscleGroup');
const exerciseSelect = document.getElementById('exercise');
const exerciseInfo = document.getElementById('exerciseInfo');
const setForm = document.getElementById('setForm');
const historyBody = document.getElementById('history');
const saveHint = document.getElementById('saveHint');

function getStorage() {
  return JSON.parse(localStorage.getItem('gym-history') || '[]');
}

function setStorage(entries) {
  localStorage.setItem('gym-history', JSON.stringify(entries));
}

function renderGroups() {
  Object.keys(exercisesByGroup).forEach((group) => {
    const option = document.createElement('option');
    option.value = group;
    option.textContent = group;
    groupSelect.append(option);
  });
}

function renderExercises() {
  const selectedGroup = groupSelect.value;
  const list = exercisesByGroup[selectedGroup];
  exerciseSelect.innerHTML = '';

  list.forEach((exercise) => {
    const option = document.createElement('option');
    option.value = exercise.name;
    option.textContent = exercise.name;
    exerciseSelect.append(option);
  });

  renderExerciseInfo();
}

function renderExerciseInfo() {
  const selectedGroup = groupSelect.value;
  const selectedExercise = exerciseSelect.value;
  const data = exercisesByGroup[selectedGroup].find((item) => item.name === selectedExercise);

  exerciseInfo.innerHTML = `
    <h2>Vorschlag für ${selectedGroup}</h2>
    <p><strong>${data.name}</strong></p>
    <p>Tipp: ${data.tip}</p>
  `;
}

function renderHistory() {
  const entries = getStorage();
  historyBody.innerHTML = '';

  entries
    .slice()
    .reverse()
    .forEach((entry) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${entry.date}</td>
        <td>${entry.group}</td>
        <td>${entry.exercise}</td>
        <td>${entry.weight} kg</td>
        <td>${entry.reps}</td>
        <td>${entry.sets}</td>
      `;
      historyBody.append(tr);
    });
}

groupSelect.addEventListener('change', renderExercises);
exerciseSelect.addEventListener('change', renderExerciseInfo);

setForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const weight = document.getElementById('weight').value;
  const reps = document.getElementById('reps').value;
  const sets = document.getElementById('sets').value;

  const entry = {
    date: new Date().toLocaleDateString('de-DE'),
    group: groupSelect.value,
    exercise: exerciseSelect.value,
    weight,
    reps,
    sets
  };

  const entries = getStorage();
  entries.push(entry);
  setStorage(entries);

  renderHistory();
  setForm.reset();
  saveHint.textContent = 'Gespeichert! Daten sind lokal im Browser gespeichert.';
});

renderGroups();
renderExercises();
renderHistory();
