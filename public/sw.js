self.addEventListener("push", (event) => {
  const data = event.data ? event.data.json() : {};

  event.waitUntil(
    self.registration.showNotification(data.title || "💈 Ny bokning", {
      body: data.body || "Du har en ny bokning",
      icon: "/icon.png",
    })
  );
});