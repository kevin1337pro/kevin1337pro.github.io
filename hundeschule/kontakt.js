(() => {
  const form = document.querySelector("#trainingsnotiz");
  if (!form) return;

  const fields = document.querySelector("#note-fields");
  const topic = document.querySelector("#thema");
  const observation = document.querySelector("#situation");
  const goal = document.querySelector("#ziel");
  const status = document.querySelector("#download-status");
  const requestedTopic = new URLSearchParams(window.location.search).get("thema");

  if ([...topic.options].some((option) => option.value === requestedTopic)) {
    topic.value = requestedTopic;
  }
  fields.disabled = false;

  observation.addEventListener("input", () => observation.setCustomValidity(""));
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const text = observation.value.trim();
    if (!text) {
      observation.setCustomValidity("Beschreibe bitte kurz eine Beobachtung.");
      observation.reportValidity();
      return;
    }

    const lines = ["Meine Trainingsnotiz", "", "Thema", topic.value, "", "Meine Beobachtung", text];
    if (goal.value.trim()) lines.push("", "Mein Wunsch", goal.value.trim());
    const data = new Blob(["\uFEFF", lines.join("\r\n"), "\r\n"], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(data);
    const link = document.createElement("a");
    link.href = url;
    link.download = "hundeschule-trainingsnotiz.txt";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 60000);
    status.textContent = "Deine Textdatei ist bereit. Du findest sie je nach Browser in den Downloads oder im Speicherdialog.";
  });
})();
