const form = document.getElementById("form-create");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  fetch("/create", {
    method: "POST",
    body: JSON.stringify({
      name: document.getElementById("name").value || null,
      code: document.getElementById("code").value || null,
      category: document.getElementById("category").value || null,
      price: parseFloat(document.getElementById("price").value),
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      const success = document.getElementById("success");
      if (data.error) {
        if (data.error.name === "ZodError") {
          if (Array.isArray(data.error.issues)) {
            data.error.issues.forEach((issue) => {
              const errorElement = document.getElementById(
                `${issue.path[0]}-error`
              );
              if (errorElement) {
                errorElement.textContent = issue.message;
              }
            });
          }
          return;
        }
        const errorElement = document.getElementById(`error`);
        if (errorElement) {
          errorElement.textContent = data.error;
          errorElement.classList.remove("hidden");
        }
        return;
      }
      if (success) {
        const field = ["name", "code", "category", "price"];
        field.forEach((element) => {
          const errorElement = document.getElementById(`${element}-error`);
          if (errorElement) {
            errorElement.textContent = "";
          }
        });
        success.classList.remove("hidden");
        setTimeout(() => {
          success.classList.add("hidden");
          window.location.href = "/";
        }, 1000);
      }
    })
    .catch((error) => {
      console.log(error);
    });
});
