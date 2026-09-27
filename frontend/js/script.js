const internGrid = document.getElementById("internGrid");
const emptyState = document.getElementById("emptyState");
const loadingState = document.getElementById("loadingState");
const searchInput = document.getElementById("searchInput");
const toast = document.getElementById("toast");
const apiStatus = document.getElementById("apiStatus");

const modal = document.getElementById("internModal");
const modalTitle = document.getElementById("modalTitle");
const addInternBtn = document.getElementById("addInternBtn");
const cancelBtn = document.getElementById("cancelBtn");
const internForm = document.getElementById("internForm");
const internIdField = document.getElementById("internId");

let interns = [];

function initials(name) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function showToast(message, type = "success") {
  toast.textContent = message;
  toast.className = `toast ${type}`;
  toast.hidden = false;
  setTimeout(() => {
    toast.hidden = true;
  }, 3000);
}

function renderInterns(list) {
  internGrid.innerHTML = "";
  emptyState.hidden = list.length !== 0;

  list.forEach((intern) => {
    const card = document.createElement("div");
    card.className = "intern-card";
    card.innerHTML = `
      <div class="avatar">${initials(intern.name)}</div>
      <h3>${intern.name}</h3>
      <p>${intern.role}</p>
      <p>${intern.email}</p>
      <div class="card-actions">
        <button class="btn-secondary" data-action="edit" data-id="${intern._id}">Edit</button>
        <button class="btn-danger" data-action="delete" data-id="${intern._id}">Delete</button>
      </div>
    `;
    internGrid.appendChild(card);
  });
}

function applyFilter() {
  const term = searchInput.value.toLowerCase();
  const filtered = interns.filter(
    (i) => i.name.toLowerCase().includes(term) || i.role.toLowerCase().includes(term)
  );
  renderInterns(filtered);
}

async function loadInterns() {
  loadingState.hidden = false;
  try {
    interns = await InternAPI.list();
    apiStatus.textContent = "Connected to backend API";
    applyFilter();
  } catch (err) {
    apiStatus.textContent = "Could not reach backend API — is the server running?";
    showToast(err.message, "error");
  } finally {
    loadingState.hidden = true;
  }
}

function openModal(intern = null) {
  if (intern) {
    modalTitle.textContent = "Edit Intern";
    internIdField.value = intern._id;
    document.getElementById("internName").value = intern.name;
    document.getElementById("internRole").value = intern.role;
    document.getElementById("internEmail").value = intern.email;
  } else {
    modalTitle.textContent = "Add New Intern";
    internForm.reset();
    internIdField.value = "";
  }
  modal.hidden = false;
}

addInternBtn.addEventListener("click", () => openModal());

cancelBtn.addEventListener("click", () => {
  modal.hidden = true;
  internForm.reset();
});

searchInput.addEventListener("input", applyFilter);

internForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const payload = {
    name: document.getElementById("internName").value.trim(),
    role: document.getElementById("internRole").value.trim(),
    email: document.getElementById("internEmail").value.trim(),
  };
  const id = internIdField.value;

  try {
    if (id) {
      await InternAPI.update(id, payload);
      showToast("Intern updated successfully");
    } else {
      await InternAPI.create(payload);
      showToast("Intern added successfully");
    }
    modal.hidden = true;
    internForm.reset();
    await loadInterns();
  } catch (err) {
    showToast(err.message, "error");
  }
});

internGrid.addEventListener("click", async (e) => {
  const btn = e.target.closest("button");
  if (!btn) return;

  const id = btn.dataset.id;
  const intern = interns.find((i) => i._id === id);

  if (btn.dataset.action === "edit") {
    openModal(intern);
  }

  if (btn.dataset.action === "delete") {
    if (!confirm(`Delete ${intern.name}?`)) return;
    try {
      await InternAPI.remove(id);
      showToast("Intern deleted");
      await loadInterns();
    } catch (err) {
      showToast(err.message, "error");
    }
  }
});

loadInterns();
