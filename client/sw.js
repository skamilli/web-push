self.addEventListener("push", (event) => {
  const data = event.data.json();
  console.log("push recieved");
  self.registration.showNotification(data.title, {
    body: "push test",
  });
});
