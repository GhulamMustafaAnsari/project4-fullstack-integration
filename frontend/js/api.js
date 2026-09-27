// Thin fetch wrapper following the IPO model + REST status-code discipline
// covered in Project 4: always check response.ok before parsing JSON.

const API_BASE = "http://localhost:5000/api/interns";

async function request(path, options = {}) {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const body = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(body.message || `HTTP Error! Status: ${response.status}`);
  }

  return body.data;
}

const InternAPI = {
  list: () => request("/"),
  create: (intern) => request("/", { method: "POST", body: JSON.stringify(intern) }),
  update: (id, intern) => request(`/${id}`, { method: "PUT", body: JSON.stringify(intern) }),
  remove: (id) => request(`/${id}`, { method: "DELETE" }),
};
